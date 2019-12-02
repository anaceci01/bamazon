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
        //prompt customer what he would like to do
        inquirer.prompt([{
                    type: "input",
                    name: "item_id",
                    message: "Select the Item ID you would like to buy"
                },
                // prompt amount desired
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you would like to buy?"
                }
            ])
            //connect selection with database to update changes
            .then(function(answers) {
                connection.query("SELECT * FROM product WHERE item_id = ?", [answers.item_id], function(err, result) {
                    if (err) {
                        throw err;
                    }
                    var quantity = result[0].stock_quantity;
                    var itemPrice = result[0].price;
                    var product_sales = result[0].product_sales;
                    if (answers.quantity > quantity) {
                        console.log("Sorry, we are out of stock!")
                    } else {
                        connection.query("UPDATE product SET ? WHERE item_id = ?", [{
                            stock_quantity: quantity - answers.quantity,
                            product_sales: product_sales + (itemPrice * answers.quantity)
                        }, answers.item_id], function(err, result) {
                            if (err) {
                                throw err;
                            }
                            console.log(result);
                        })
                    }

                })
            });
    });
}