// //////////////////////////////////////////////////////////////////////////////////////////////
// MySql Connection
// //////////////////////////////////////////////////////////////////////////////////////////////
var mysql = require("mysql");
var inquirer = require("inquirer");
var cartArray = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sonora83",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    managerNav();
});
// //////////////////////////////////////////////////////////////////////////////////////////////
// Customer Selection
// //////////////////////////////////////////////////////////////////////////////////////////////

function managerNav() {
    console.log('--------------------------------')
    inquirer
        .prompt({
            type: "list",
            name: "navigate",
            message: "Please make a selection",
            choices: ["Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        })
        .then(function(answers) {
            if (answers.navigate === "Products for Sale") {
                loadProducts();
            } else if (answers.navigate === "View Low Inventory") {
                lowInventory();
            } else if (answers.navigate === "Add to Inventory") {
                addInventory();
            } else if (answers.navigate === "Add New Product") {
                addProduct();
            } else if (answers.navigate === "Exit") {
                process.exit();
            } else {
                connection.end();
            }
        });
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// Options Load Products for Manager
// //////////////////////////////////////////////////////////////////////////////////////////////
function loadProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// Options View Low Inventory for Manager
// //////////////////////////////////////////////////////////////////////////////////////////////
function lowInventory() {
    connection.query("SELECT * FROM product WHERE stock_quantity <= 3", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}