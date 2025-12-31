import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
export const db = new Database(path.join(dataDir, "db.sqlite"));
db.exec(`
CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  title TEXT,
  artist TEXT,
  filename TEXT,
  mime TEXT,
  size_bytes INTEGER,
  created_at INTEGER
);
`);
