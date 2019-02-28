const mysql = require("mysql");
              // Loads env file containing database login information.
              require('dotenv').load();
// Don't use this, we are going to use connection pooling.
//const conn = mysql.createConnection({});


const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  //port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

module.exports = conn;