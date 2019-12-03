// MySql connection //
var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sonora83",
    database: "bamazon"
});
//connection initialized with server and displays Manager Nav
connection.connect(function(err) {
    if (err) throw err;
    managerNavigation();
    //console.log("there is a connection");
})

function managerNavigation() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    })
}