import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { schemaStatements } from "../src/db/schema-sql";

const target = resolve(process.cwd(), "src/db/schema-sql.ts");

test("generated DDL is non-empty and idempotent", () => {
  assert.ok(schemaStatements.length > 0, "expected at least one DDL statement");
  for (const statement of schemaStatements) {
    assert.match(
      statement,
      /^CREATE (UNIQUE )?(TABLE|INDEX) IF NOT EXISTS /,
      `statement is not idempotent and would fail on a warm instance:\n${statement}`,
    );
  }
  const tables = schemaStatements.filter((statement) => /^CREATE TABLE/.test(statement));
  for (const table of ["teams", "projects", "milestones", "mentors", "matches", "audit_log"]) {
    assert.ok(tables.some((statement) => statement.includes(`\`${table}\``)), `missing table ${table}`);
  }
});

test("src/db/schema-sql.ts is in sync with src/db/schema.ts", () => {
  const before = readFileSync(target, "utf8");
  try {
    execFileSync("node", ["scripts/generate-schema-sql.mjs"], { cwd: process.cwd(), stdio: "pipe" });
    const after = readFileSync(target, "utf8");
    assert.equal(
      after,
      before,
      "src/db/schema-sql.ts is stale — the Drizzle schema changed but the compiled DDL " +
        "did not. Run `npm run db:schema-sql` and commit the result.",
    );
  } finally {
    writeFileSync(target, before);
  }
});
