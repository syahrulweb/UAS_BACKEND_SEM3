const mysql = require('mysql2');

// konfigurasi database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_covid_api',
});

module.exports = db.promise();
