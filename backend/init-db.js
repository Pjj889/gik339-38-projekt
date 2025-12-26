const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    genre TEXT,
    rating REAL
  )
`, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table 'movies' created or already exists.");
  }
  db.close();
});
