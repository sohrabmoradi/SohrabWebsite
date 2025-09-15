// backend/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "db",
  database: process.env.PGDATABASE || "mydb",
  password: process.env.PGPASSWORD || "password",
  port: process.env.PGPORT || 5432,
});

module.exports = pool;
