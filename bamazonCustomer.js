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
// give customer a list of selections 
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
//products loaded after customer made selection
function loadProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}
//function to add to cart
function addToCart() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) {
            throw err;
        }
        inquirer.prompt([{
                    type: "input",
                    name: "item_id",
                    message: "Select the Item ID you would like to buy"
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you would like to buy?"
                }
            ])
            .then(function(answers) {
                connection.query("SELECT * FROM product WHERE item_id = ?", [answers.item_id], function(err, result) {
                    if (err) {
                        throw err;
                    }
                    var amount = result[0].stock_quantity;
                    if (answers.quantity > amount) {
                        console.log("Sorry, we are out of stock!")
                    }
                })
            });
    });
}