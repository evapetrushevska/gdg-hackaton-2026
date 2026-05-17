require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const axios = require("axios");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;
const FLASK_API = process.env.FLASK_API || "http://localhost:5001";

// Optional frontend origin for production.
// For now, if FRONTEND_URL is not set, it allows all origins.
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

// -------------------------
// MIDDLEWARE
// -------------------------

app.use(
  cors({
    origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
  })
);

app.use(express.json());

// -------------------------
// OPTIONAL POSTGRESQL CONNECTION
// -------------------------

const hasDatabaseConfig =
  process.env.DB_USER &&
  process.env.DB_HOST &&
  process.env.DB_NAME &&
  process.env.DB_PASSWORD &&
  process.env.DB_PORT;

let pool = null;

if (hasDatabaseConfig) {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl:
      process.env.DB_SSL === "true"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to PostgreSQL:", err.message);
      return;
    }

    console.log("Successfully connected to PostgreSQL");
    release();
  });
} else {
  console.log(
    "Database environment variables are missing. Database routes will be disabled."
  );
}

// -------------------------
// BASIC ROUTES
// -------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Express backend is running",
    flask_api: FLASK_API,
    database_enabled: Boolean(pool),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "express-backend",
    port: PORT,
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "Server is running",
    flask_api: FLASK_API,
    database_enabled: Boolean(pool),
  });
});

// -------------------------
// TEST DB ROUTE
// -------------------------

app.get("/api/data", async (req, res) => {
  if (!pool) {
    return res.status(503).json({
      error: "Database is not configured",
      details:
        "DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, and DB_PORT must be set as environment variables.",
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM tmdb_movie_details_clean LIMIT 10"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("DB query error:", err.message);

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
      flask_api: FLASK_API,
    });
  }
});

app.post("/recommend/test/blended", async (req, res) => {
  try {
    const users = req.body.users || ["user1", "user2", "user3"];

    const response = await axios.post(`${FLASK_API}/recommend/test/blended`, {
      users: users,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Blended test recommendation error:", error.message);

    res.status(500).json({
      error: "Failed to get test blended recommendations",
      details: error.message,
      flask_api: FLASK_API,
    });
  }
});

app.get("/movies/test/user/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const response = await axios.get(`${FLASK_API}/movies/test/user/${userName}`);

    res.json(response.data);
  } catch (error) {
    console.error("User movie database error:", error.message);

    res.status(500).json({
      error: "Failed to get user movie database",
      details: error.message,
      flask_api: FLASK_API,
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
      flask_api: FLASK_API,
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
      flask_api: FLASK_API,
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
      flask_api: FLASK_API,
    });
  }
});

// -------------------------
// START SERVER
// -------------------------

app.listen(PORT, () => {
  console.log(`Express backend running on port ${PORT}`);
  console.log(`Using Flask recommender API at ${FLASK_API}`);
});

// -------------------------
// GRACEFUL SHUTDOWN
// -------------------------

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing server.");

  if (pool) {
    await pool.end();
    console.log("PostgreSQL pool closed.");
  }

  process.exit(0);
});