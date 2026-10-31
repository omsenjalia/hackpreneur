import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import * as schema from "../src/db/schema";
import { seedDemoData } from "../src/db/seed-demo";

const filename = resolve(process.env.DB_FILE_NAME ?? "./data/hackpreneur.db");
mkdirSync(dirname(filename), { recursive: true });
const sqlite = new Database(filename);
sqlite.pragma("foreign_keys = ON");

try {
  const db = drizzle({ client: sqlite, schema });
  const seeded = seedDemoData(db);
  console.log(`Synthetic demo data is ready: ${seeded.projects.length} projects, ${seeded.mentors.length} mentor profiles, ${seeded.milestones.length} milestones.`);
  console.log("Safe to rerun: demo records use stable DEMO IDs and are never used to overwrite existing rows.");
} finally {
  sqlite.close();
}
