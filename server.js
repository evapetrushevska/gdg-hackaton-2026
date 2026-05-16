require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { spawn } = require('child_process'); // For calling Python ML scripts

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false // Set to true if you configured SSL on your Google Cloud VM
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Successfully connected to PostgreSQL on Google Cloud VM');
    release();
});

// --- API ROUTES ---

// 1. Basic Route: Fetch data from DB
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tmdb_movie_details_clean LIMIT 10');
        res.json(result.rows);
    } catch (err) {
        console.error('DB query error:', err);
        res.status(500).json({ error: 'Database query error', details: err.message });
    }
});

// 2. ML Route: Trigger Machine Learning Prediction
app.post('/api/predict', async (req, res) => {
    const inputData = req.body.features; // Data sent from frontend

    // Example: Calling a Python script for ML prediction
    const pythonProcess = spawn('python3', ['predict_model.py', JSON.stringify(inputData)]);

    pythonProcess.stdout.on('data', (data) => {
        const prediction = data.toString();
        res.json({ prediction: prediction.trim() });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`ML Script Error: ${data}`);
        res.status(500).json({ error: 'Inference failed' });
    });
});

// 3. Status Route
app.get('/status', (req, res) => {
    res.send({ status: 'Server is running', database: 'Connected' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});