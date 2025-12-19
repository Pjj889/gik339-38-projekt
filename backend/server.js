//grudläggande
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");


//get
app.get("/movies", (req, res) => {
  db.all("SELECT * FROM movies", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


//post
app.post("/movies", (req, res) => {
  const { title, genre, rating } = req.body;

  db.run(
    "INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)",
    [title, genre, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie created" });
    }
  );
});

//put
app.post("/movies", (req, res) => {
  const { title, genre, rating } = req.body;

  db.run(
    "INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)",
    [title, genre, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie created" });
    }
  );
});


//delete
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM movies WHERE id=?", id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Movie deleted" });
  });
});


//starta server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
