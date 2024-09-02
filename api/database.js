import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPath = 'emails.db';

export const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

await db.run(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL
  )
`);
