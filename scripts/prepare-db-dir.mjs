import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
const filename = process.env.DB_FILE_NAME ?? "./data/hackpreneur.db";
mkdirSync(dirname(filename), { recursive: true });
