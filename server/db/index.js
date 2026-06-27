const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

console.log(`Connecting to SQLite database at: ${config.databasePath}`);

const db = new sqlite3.Database(config.databasePath, (err) => {
  if (err) {
    console.error('❌ Error opening SQLite database:', err);
  } else {
    console.log('✅ SQLite database connected successfully');
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON;', (pragmaErr) => {
      if (pragmaErr) {
        console.error('Failed to enable PRAGMA foreign_keys:', pragmaErr);
      } else {
        console.log('✅ Enabled PRAGMA foreign_keys');
      }
    });
  }
});

// Promise wrappers
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const exec = (sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  db,
  run,
  get,
  all,
  exec
};
