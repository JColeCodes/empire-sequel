const express = require('express');
const mysql = require('mysql2');
const db = require('./db/connection');
const questions = require('./utils/questions');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // Run questions from utils/questions.js
        questions();
    });
});