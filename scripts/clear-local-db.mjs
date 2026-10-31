import { rmSync } from "node:fs";
import { resolve } from "node:path";

if (!process.argv.includes("--confirm")) {
  console.error("This permanently removes the local SQLite database and its records. Stop the app, then rerun with --confirm to continue.");
  process.exit(1);
}

const filename = resolve(process.env.DB_FILE_NAME ?? "./data/hackpreneur.db");
for (const suffix of ["", "-wal", "-shm"]) {
  rmSync(`${filename}${suffix}`, { force: true });
}
console.log(`Removed local database: ${filename}`);
