require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const FLASK_API = process.env.FLASK_API || "http://localhost:5001";

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: false,
});

// Test DB Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    return;
  }

  console.log("Successfully connected to PostgreSQL");
  release();
});

// -------------------------
// BASIC ROUTES
// -------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Express backend is running",
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "Server is running",
    flask_api: FLASK_API,
  });
});

// Test DB route
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tmdb_movie_details_clean LIMIT 10"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("DB query error:", err);

    res.status(500).json({
      error: "Database query error",
      details: err.message,
    });
  }
});

// -------------------------
// TEST RECOMMENDATION ROUTES
// These use local user_data folders in Flask/Python.
// No database needed.
// -------------------------

app.get("/recommend/test/personal/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const response = await axios.get(
      `${FLASK_API}/recommend/test/personal/${userName}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Personal test recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get test personal recommendations",
      details: error.message,
    });
  }
});

app.post("/recommend/test/blended", async (req, res) => {
  try {
    const users = req.body.users || ["user1", "user2", "user3"];

    const response = await axios.post(
      `${FLASK_API}/recommend/test/blended`,
      {
        users: users,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Blended test recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get test blended recommendations",
      details: error.message,
    });
  }
});

app.get("/movies/test/user/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const response = await axios.get(
      `${FLASK_API}/movies/test/user/${userName}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("User movie database error:", error.message);

    res.status(500).json({
      error: "Failed to get user movie database",
      details: error.message,
    });
  }
});

// -------------------------
// REAL APP-STYLE ROUTES
// These will be used later with database user IDs.
// For now, they expect watched/watchlist data in the request body.
// -------------------------

app.post("/recommend/personal", async (req, res) => {
  try {
    const response = await axios.post(
      `${FLASK_API}/recommend/personal`,
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("Personal recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get personal recommendations",
      details: error.message,
    });
  }
});

app.post("/recommend/blended", async (req, res) => {
  try {
    const response = await axios.post(
      `${FLASK_API}/recommend/blended`,
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("Blended recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get blended recommendations",
      details: error.message,
    });
  }
});

app.post("/recommend/opposite/personal", async (req, res) => {
  try {
    const response = await axios.post(
      `${FLASK_API}/recommend/opposite/personal`,
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("Opposite personal recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get opposite personal recommendations",
      details: error.message,
    });
  }
});

// -------------------------
// START SERVER
// -------------------------

app.listen(port, () => {
  console.log(`Express backend running at http://localhost:${port}`);
  console.log(`Using Flask recommender API at ${FLASK_API}`);
});