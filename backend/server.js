// backend/server.js
import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(bodyParser.json());

// Connect to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// POST new user
app.post("/api/users", async (req, res) => {
  const { name, food } = req.body;
  if (!name || !food) {
    return res.status(400).json({ error: "Missing 'name' or 'food' in request body." });
  }

  const { data, error } = await supabase.from("users").insert([{ name, food }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET all users
app.get("/api/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Cloud Run requires listening on process.env.PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
