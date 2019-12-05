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
    custSelection();
});
// //////////////////////////////////////////////////////////////////////////////////////////////
// Customer Selection
// //////////////////////////////////////////////////////////////////////////////////////////////

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
                process.exit();
            } else {
                connection.end();
            }
        });
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// Products loaded after selection
// //////////////////////////////////////////////////////////////////////////////////////////////

function loadProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// Function Add to Cart
// //////////////////////////////////////////////////////////////////////////////////////////////
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
                            console.log(custSelection());
                        })
                        cartArray.push(result[0].product_name);
                    }
                })
            });
    });
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// View Cart Function
// //////////////////////////////////////////////////////////////////////////////////////////////
function viewCart() {
    console.log('--------------------------------')
    console.table(cartArray);
    console.log(custSelection());
};
// //////////////////////////////////////////////////////////////////////////////////////////////
// Checkout Function
// //////////////////////////////////////////////////////////////////////////////////////////////
function checkout() {
    let totalPrice = cartArray.reduce(function(prev, cur) {
        return prev + cur.price;
    }, 0);
    inquirer
        .prompt({
            name: "confirm",
            type: "confirm",
            message: "Will this complete your order?"
        })
        .then(function(answers) {
            if (answers.confirm) {
                console.log("Thank you for your purchase");
                cartArray = [];
                custSelection();
            } else {
                addToCart();
            }
        })
}
// //////////////////////////////////////////////////////////////////////////////////////////////
// Quit Function
// //////////////////////////////////////////////////////////////////////////////////////////////
function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
        // Log a message and exit the current node process
        console.log("Goodbye!");
        process.exit(0);
    }
}