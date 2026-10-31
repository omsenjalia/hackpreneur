import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";

const count = (db: Database.Database, table: string) => {
  const result = db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as { count: number };
  return Number(result.count);
};

test("demo seed uses synthetic records, preserves workspace rows, and is safe to rerun", () => {
  const directory = mkdtempSync(join(tmpdir(), "hackpreneur-demo-seed-"));
  const filename = join(directory, "demo.sqlite");
  let openDb: Database.Database | undefined;
  const runSeed = () => {
    const result = spawnSync("npm", ["run", "db:seed"], {
      cwd: process.cwd(),
      env: { ...process.env, DB_FILE_NAME: filename },
      encoding: "utf8",
    });
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  };

  try {
    runSeed();
    const firstDb = new Database(filename);
    openDb = firstDb;
    firstDb.pragma("foreign_keys = ON");
    const expected = { teams: 12, projects: 12, mentors: 16, needs: 24, milestones: 24, consents: 8, readiness_checks: 6, feedback: 6, matches: 6, audit_log: 5 };
    for (const [table, total] of Object.entries(expected)) assert.equal(count(firstDb, table), total, `${table} count`);

    const projectTitles = firstDb.prepare("SELECT title FROM projects").all() as { title: string }[];
    assert.ok(projectTitles.every(({ title }) => title.startsWith("DEMO:")));
    const mentorNames = firstDb.prepare("SELECT name FROM mentors").all() as { name: string }[];
    assert.ok(mentorNames.every(({ name }) => name.startsWith("Demo Mentor ")));
    const statuses = (firstDb.prepare("SELECT DISTINCT status FROM milestones").all() as { status: string }[]).map(({ status }) => status);
    assert.deepEqual(new Set(statuses), new Set(["todo", "doing", "done"]));
    assert.ok((firstDb.prepare("SELECT COUNT(*) AS count FROM milestones WHERE status = 'done' AND progress_claim = 'verified'").get() as { count: number }).count > 0);
    assert.ok((firstDb.prepare("SELECT COUNT(*) AS count FROM milestones WHERE status = 'done' AND progress_claim = 'self_reported'").get() as { count: number }).count > 0);
    assert.equal((firstDb.prepare("PRAGMA foreign_key_check").all() as unknown[]).length, 0);
    const invalidMatches = firstDb.prepare(`
      SELECT COUNT(*) AS count FROM matches AS m
      JOIN projects AS p ON p.id = m.project_id
      LEFT JOIN consents AS c ON c.project_id = p.id AND c.scope = 'share_profile' AND c.granted = 1
      WHERE p.visibility = 'private' OR c.id IS NULL
    `).get() as { count: number };
    assert.equal(invalidMatches.count, 0, "seeded matches require visible projects with granted consent");

    firstDb.prepare("INSERT INTO teams (id, name, hackathon) VALUES (?, ?, ?)").run("workspace-team-kept", "Workspace-owned team", "Local workspace");
    firstDb.prepare("UPDATE projects SET title = ? WHERE id = ?").run("Locally edited demo title", "demo-project-01");
    const countsBeforeRerun: Record<string, number> = {};
    for (const table of Object.keys(expected)) countsBeforeRerun[table] = count(firstDb, table);
    firstDb.close();
    openDb = undefined;

    runSeed();
    const secondDb = new Database(filename);
    openDb = secondDb;
    for (const [table, total] of Object.entries(countsBeforeRerun)) assert.equal(count(secondDb, table), total, `${table} count after rerun`);
    assert.equal((secondDb.prepare("SELECT name FROM teams WHERE id = ?").get("workspace-team-kept") as { name: string }).name, "Workspace-owned team");
    assert.equal((secondDb.prepare("SELECT title FROM projects WHERE id = ?").get("demo-project-01") as { title: string }).title, "Locally edited demo title");
    secondDb.close();
    openDb = undefined;
  } finally {
    openDb?.close();
    rmSync(directory, { recursive: true, force: true });
  }
});
