import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { auditLog, consents, feedback, matches, mentors, milestones, needs, projects, readinessChecks, teams } from "./schema";
import { buildDemoData } from "./demo-data";

type DemoDatabase = BetterSQLite3Database<typeof schema>;

/** Add clearly synthetic demo rows without clearing or replacing workspace records. */
export function seedDemoData(db: DemoDatabase, now = new Date()) {
  const data = buildDemoData(now);
  db.transaction((tx) => {
    tx.insert(teams).values(data.teams).onConflictDoNothing().run();
    tx.insert(mentors).values(data.mentors).onConflictDoNothing().run();
    tx.insert(projects).values(data.projects).onConflictDoNothing().run();
    tx.insert(needs).values(data.needs).onConflictDoNothing().run();
    tx.insert(milestones).values(data.milestones).onConflictDoNothing().run();
    tx.insert(consents).values(data.consents).onConflictDoNothing().run();
    tx.insert(readinessChecks).values(data.readinessChecks).onConflictDoNothing().run();
    tx.insert(feedback).values(data.feedback).onConflictDoNothing().run();
    tx.insert(matches).values(data.matches).onConflictDoNothing().run();
    tx.insert(auditLog).values(data.auditLog).onConflictDoNothing().run();
  });
  return data;
}
