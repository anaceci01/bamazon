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

connection.connect(function(err) {
    if (err) throw err;
    custSelection();
});

function custSelection() {
    console.log('--------------------------------')
    inquirer
        .prompt({
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ["Shop", "View Cart", "Checkout", "Quit"]
        })
        .then(function(answers) {
            if (answers.selection === "Shop") {
                loadProducts(),
                    addToCart();
            } else if (answers.selection === "View Cart") {
                viewCart();
            } else if (answers.selection === "Checkout") {
                checkout();
            } else if (answers.selection === "Quit") {
                exitOut();
            } else {
                connection.end();
            }
        });
}

function loadProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}