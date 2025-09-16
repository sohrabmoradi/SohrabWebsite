import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Allow frontend access (local + deployed)
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-cloudrun-url"] // replace with deployed frontend URL
}));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables.");
  process.exit(1);
}

console.log("✅ Supabase URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Health check
app.get("/", (req, res) => res.send("✅ Backend is running 🚀"));

// POST new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, food } = req.body;
    if (!name || !food) return res.status(400).json({ error: "Missing 'name' or 'food'." });

    const { data, error } = await supabase.from("users").insert([{ name, food }]).select();
    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: "User added", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
