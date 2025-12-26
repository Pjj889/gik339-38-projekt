const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Databas
const db = new sqlite3.Database("./database.db");

// READ ALL movies
app.get("/movies", (req, res) => {
  db.all("SELECT * FROM movies", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ ONE movie
app.get("/movies/:id", (req, res) => {
  db.get("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Movie not found" });
    res.json(row);
  });
});

// CREATE movie
app.post("/movies", (req, res) => {
  const { title, genre, rating } = req.body;
  db.run(
    "INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)",
    [title, genre, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Movie created" });
    }
  );
});

// UPDATE movie
app.put("/movies/:id", (req, res) => {
  const { title, genre, rating } = req.body;
  db.run(
    "UPDATE movies SET title = ?, genre = ?, rating = ? WHERE id = ?",
    [title, genre, rating, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes, message: "Movie updated" });
    }
  );
});

// DELETE movie
app.delete("/movies/:id", (req, res) => {
  db.run("DELETE FROM movies WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes, message: "Movie deleted" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
