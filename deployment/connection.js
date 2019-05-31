var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  {connection = mysql.createConnection(process.env.JAWSDB_URL);}
else {
  connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "example_db"
  });
}

connection.connect();
module.exports = connection;
}
