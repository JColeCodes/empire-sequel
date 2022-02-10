const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER, // MySQL username
        password: process.env.DB_PASSWORD, // MySQL password
        database: process.env.DB_NAME
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = db;