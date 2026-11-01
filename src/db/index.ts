import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { schemaStatements } from "./schema-sql";
import { seedDemoData } from "./seed-demo";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";

const DEFAULT_DB = "./data/hackpreneur.db";

/**
 * Opens the workspace database, creating the schema if it is missing.
 *
 * Two host realities drive this:
 *
 * 1. `drizzle-kit push` is wired into `predev` / `prestart`, and serverless
 *    hosts run neither — they invoke their own server entrypoint. The schema
 *    therefore has to be applied at runtime from the compiled DDL in
 *    `schema-sql.ts`, or every route fails with "no such table: projects".
 *
 * 2. The default `./data` directory is only writable on a machine. Vercel's
 *    `/var/task` is read-only, so `mkdirSync` there throws EACCES at import
 *    time and the whole route module dies before any page can render — which
 *    surfaces as a blank 500 rather than a message. Falling back to the OS
 *    temp directory keeps the app serving.
 *
 * Set `DB_FILE_NAME` to pin an exact path. That is an explicit instruction, so
 * it is honoured or it fails loudly — it never silently relocates.
 */
function openDatabase() {
  const configured = process.env.DB_FILE_NAME?.trim();
  const attempts = configured
    ? [{ filename: resolve(configured), ephemeral: false }]
    : [
        { filename: resolve(DEFAULT_DB), ephemeral: false },
        { filename: resolve(tmpdir(), "hackpreneur", basename(DEFAULT_DB)), ephemeral: true },
      ];

  const failures: string[] = [];
  for (const attempt of attempts) {
    try {
      mkdirSync(dirname(attempt.filename), { recursive: true });
      const sqlite = new Database(attempt.filename);
      sqlite.pragma("foreign_keys = ON");
      return { ...attempt, sqlite };
    } catch (error) {
      failures.push(`${attempt.filename} (${describe(error)})`);
    }
  }

  throw new Error(
    "HACKPRENEUR could not open a SQLite database. Tried: " +
      failures.join("; ") +
      ". Set DB_FILE_NAME to a writable path (on serverless hosts only /tmp is writable).",
  );
}

function describe(error: unknown) {
  if (error instanceof Error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code ? `${code}: ${error.message}` : error.message;
  }
  return String(error);
}

const { sqlite, filename, ephemeral } = openDatabase();
export const db = drizzle({ client: sqlite, schema });

const alreadyInitialised = sqlite
  .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'projects'")
  .get();

// Every statement is `CREATE ... IF NOT EXISTS`, so re-running on a warm
// instance is a no-op and a fresh instance gets its tables before first query.
for (const statement of schemaStatements) sqlite.exec(statement);

/**
 * A deployed instance boots onto an empty temp database and would otherwise
 * show an empty workspace, so seed the clearly-synthetic demo records there.
 * Local runs keep their documented behaviour of starting empty; opt in with
 * `npm run db:seed` or `SEED_DEMO_DATA=true`.
 */
const wantsDemoData = ephemeral || process.env.SEED_DEMO_DATA === "true";
if (!alreadyInitialised && wantsDemoData) seedDemoData(db);

export const databaseFile = filename;
export const isEphemeralDatabase = ephemeral;
