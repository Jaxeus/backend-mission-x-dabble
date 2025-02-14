//  ===== Imports ===== //
const express = require('express');
require('dotenv').config();
// Get the client
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// ===== CONNECTING TO THE DATABASE ===== //
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//  ===== ENDPOINTS ===== //
app.get('/', (req, res) => {
  pool.query('SELECT * FROM project', (err, result) => {
    if (err) {
      // ~ Handle the error
      console.error('Database error:', err);
      return res.status(500).json({
        errorMessage: 'An error occurred while fetching data from the database',
        error: err,
      });
    } else {
      // ~ If query is successful, send the result
      res.send(result);
    }
  });
});

// ===== LISTENING AT PORT 4000 ===== //
const PORT = process.env.PORT | 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
