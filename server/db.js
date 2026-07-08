const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'data.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  // ensure new columns exist (safe migration)
  db.all(`PRAGMA table_info(users)`, (err, rows) => {
    if (err) return;
    const cols = rows.map(r => r.name);
    const ensure = (colDef, colName) => {
      if (!cols.includes(colName)) {
        db.run(`ALTER TABLE users ADD COLUMN ${colDef}`);
      }
    };
    ensure("email_confirmed INTEGER DEFAULT 0", 'email_confirmed');
    ensure("confirm_token TEXT", 'confirm_token');
    ensure("reset_token TEXT", 'reset_token');
    ensure("reset_expires INTEGER", 'reset_expires');
  });
});

module.exports = db;
