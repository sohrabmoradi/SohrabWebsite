// backend/server.js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Save user
app.post("/api/users", async (req, res) => {
  const { name, food } = req.body;
  if (!name || !food) return res.status(400).json({ message: "Name and food required" });

  try {
    const result = await pool.query(
      "INSERT INTO users (name, food) VALUES ($1, $2) RETURNING *",
      [name, food]
    );
    res.json({ message: `${result.rows[0].name} likes ${result.rows[0].food}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
