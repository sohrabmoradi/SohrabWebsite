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
  console.error("❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables.");
  process.exit(1);
}

console.log("✅ Supabase URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running 🚀");
});

// POST new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, food } = req.body;

    if (!name || !food) {
      console.warn("⚠️ Missing name or food:", req.body);
      return res.status(400).json({ error: "Missing 'name' or 'food' in request body." });
    }

    console.log("📥 Inserting user:", { name, food });

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, food }])
      .select(); // 👈 ensures inserted row is returned

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Inserted:", data);
    res.json({ message: "User added", data });
  } catch (err) {
    console.error("💥 Server crash on POST /api/users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("❌ Supabase fetch error:", error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("💥 Server crash on GET /api/users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Cloud Run / Docker requires listening on process.env.PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
