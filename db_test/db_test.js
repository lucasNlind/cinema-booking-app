var express = require("express");
var mysql      = require('mysql');
require('dotenv').config();
var app = express();
app.use(express.logger());

var connection = mysql.createConnection({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
});

connection.connect();

app.get('/', function(request, response) {
  connection.query('SELECT * from t_users', function(err, rows, fields) {
      if (err) {
        console.log('error: ', err);
        throw err;
      }
      response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});