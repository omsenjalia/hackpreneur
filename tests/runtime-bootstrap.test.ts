import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * These exercise `src/db/index.ts` for real, in a child process, because its
 * behaviour is decided at import time from the environment: path resolution,
 * the read-only fallback, runtime schema creation, and demo seeding. A test
 * that re-implemented that logic would prove nothing.
 */
const dbModule = pathToFileURL(resolve(process.cwd(), "src/db/index.ts")).href;
// An absolute URL, not the bare "tsx": the read-only test runs the child from a
// foreign cwd, where a bare specifier would not resolve. `createRequire`
// rather than `import.meta.resolve`, which tsx does not shim in CJS output.
const require_ = createRequire(import.meta.url);
const tsxLoader = pathToFileURL(require_.resolve("tsx")).href;

const probe = `
  import(${JSON.stringify(dbModule)}).then((mod) => {
    const count = (table) => mod.db.$client.prepare(\`SELECT COUNT(*) AS n FROM \${table}\`).get().n;
    console.log(JSON.stringify({
      file: mod.databaseFile,
      ephemeral: mod.isEphemeralDatabase,
      projects: count("projects"),
      mentors: count("mentors"),
      milestones: count("milestones"),
    }));
  }).catch((error) => {
    console.log(JSON.stringify({ error: String(error && error.message ? error.message : error) }));
  });
`;

type Boot = {
  file?: string;
  ephemeral?: boolean;
  projects?: number;
  mentors?: number;
  milestones?: number;
  error?: string;
};

/** Import src/db in a fresh process. Pass `null` to unset an inherited var. */
function boot(env: Record<string, string | null> = {}, cwd = process.cwd()): Boot {
  const childEnv: NodeJS.ProcessEnv = {
    ...process.env,
    // tsx discovers tsconfig.json by walking up from cwd, so a child booted
    // from a foreign cwd loses the "@/*" alias that src/db/demo-data.ts uses.
    TSX_TSCONFIG_PATH: resolve(process.cwd(), "tsconfig.json"),
  };
  for (const [key, value] of Object.entries(env)) {
    if (value === null) delete childEnv[key];
    else childEnv[key] = value;
  }
  const result = spawnSync(
    // `server-only` throws unless resolved under the react-server condition,
    // which maps it to its empty entry — exactly what Next.js does for a
    // Server Component. Reproduce that so the probe imports the real module.
    "node",
    ["--conditions=react-server", "--import", tsxLoader, "--input-type=module", "-e", probe],
    {
      cwd,
      env: childEnv,
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const line = result.stdout.trim().split("\n").pop() ?? "";
  assert.ok(line.startsWith("{"), `probe printed no JSON: ${result.stdout}\n${result.stderr}`);
  return JSON.parse(line) as Boot;
}

test("a cold database gets its schema at runtime, with no drizzle-kit and no prestart hook", () => {
  const directory = mkdtempSync(join(tmpdir(), "hackpreneur-boot-"));
  const filename = join(directory, "cold.sqlite");
  try {
    assert.equal(existsSync(filename), false);
    const result = boot({ DB_FILE_NAME: filename });
    assert.equal(result.error, undefined);
    assert.equal(result.file, filename);
    assert.equal(result.ephemeral, false);
    assert.equal(existsSync(filename), true, "the database file should have been created");
    // An explicit local database keeps the documented "starts empty" behaviour.
    assert.equal(result.projects, 0);
    assert.equal(result.mentors, 0);
    assert.equal(result.milestones, 0);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("SEED_DEMO_DATA populates a cold database on first boot only", () => {
  const directory = mkdtempSync(join(tmpdir(), "hackpreneur-boot-"));
  const filename = join(directory, "seeded.sqlite");
  const env = { DB_FILE_NAME: filename, SEED_DEMO_DATA: "true" };
  try {
    const first = boot(env);
    assert.equal(first.error, undefined);
    assert.equal(first.projects, 12);
    assert.equal(first.mentors, 16);
    assert.ok((first.milestones ?? 0) > 0, "expected demo milestones");

    // A warm database must not be seeded again.
    const second = boot(env);
    assert.equal(second.projects, 12);
    assert.equal(second.mentors, 16);
    assert.equal(second.milestones, first.milestones);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("a read-only working directory falls back to the OS temp directory and seeds", () => {
  // The Vercel case: cwd (/var/task) is read-only, so mkdirSync on ./data
  // throws EACCES. Previously that killed the route module at import time and
  // every page returned a blank 500.
  const readOnly = mkdtempSync(join(tmpdir(), "hackpreneur-ro-"));
  const isolatedTmp = mkdtempSync(join(tmpdir(), "hackpreneur-tmp-"));
  try {
    chmodSync(readOnly, 0o555);
    const result = boot({ DB_FILE_NAME: null, TMPDIR: isolatedTmp }, readOnly);

    assert.equal(result.error, undefined, `expected a clean boot, got: ${result.error}`);
    assert.equal(result.ephemeral, true);
    assert.ok(result.file?.startsWith(isolatedTmp), `expected a temp path, got ${result.file}`);
    // A deployed instance boots onto an empty database, so it seeds the demo workspace.
    assert.equal(result.projects, 12);
    assert.equal(result.mentors, 16);
  } finally {
    chmodSync(readOnly, 0o755);
    rmSync(readOnly, { recursive: true, force: true });
    rmSync(isolatedTmp, { recursive: true, force: true });
  }
});

test("an explicit DB_FILE_NAME that cannot be opened fails loudly instead of relocating", () => {
  // Not /proc: mkdirSync("/proc/...") blocks indefinitely, which would hang the suite.
  const result = boot({ DB_FILE_NAME: "/sys/nope/hackpreneur.db" });
  assert.ok(result.error, "expected an error rather than a silent relocation");
  assert.match(result.error!, /could not open a SQLite database/i);
  assert.match(result.error!, /DB_FILE_NAME/);
});
