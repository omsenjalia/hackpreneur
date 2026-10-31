import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const filename = process.env.DB_FILE_NAME ?? "./data/hackpreneur.db";
mkdirSync(dirname(filename),{recursive:true});
const sqlite = new Database(filename);
sqlite.pragma("foreign_keys = ON");
export const db = drizzle({client:sqlite,schema});
