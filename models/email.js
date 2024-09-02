import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class Email {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }

  static async create(email) {
    const db = await open({
      filename: 'emails.db',
      driver: sqlite3.Database
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);

    await db.run('INSERT INTO emails (email) VALUES (?)', [email]);
    await db.close();
  }

  static async getAllEmails() {
    const db = await open({
      filename: 'emails.db',
      driver: sqlite3.Database
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);

    const emails = await db.all('SELECT * FROM emails');
    await db.close();
    return emails;
  }

  static async getEmailsByPage(page, limit) {
    const offset = (page - 1) * limit;

    const db = await open({
      filename: 'emails.db',
      driver: sqlite3.Database
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);

    const emails = await db.all('SELECT * FROM emails LIMIT ? OFFSET ?', [limit, offset]);
    await db.close();
    return emails;
  }

  static async countEmails() {
    const db = await open({
      filename: 'emails.db',
      driver: sqlite3.Database
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);

    const result = await db.get('SELECT COUNT(*) as count FROM emails');
    await db.close();
    return result.count;
  }

  // Delete an email by its ID
  static async deleteEmailById(id) {
    const db = await open({
      filename: 'emails.db',
      driver: sqlite3.Database
    });

    await db.run('DELETE FROM emails WHERE id = ?', [id]);
    await db.close();
  }
}

export default Email;

