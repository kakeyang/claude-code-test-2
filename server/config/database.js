const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'trello_clone',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;