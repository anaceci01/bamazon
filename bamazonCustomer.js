// --------------- mysql connection  ---------------- //
const mysql = require ("mysql");
const inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "rot",
    password: "Sonora83",
    database: "bamazon_db"
});