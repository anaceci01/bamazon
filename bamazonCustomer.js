<<<<<<< HEAD
var mysql = require("mysql");
=======
// MySql Connection and Inquirer Import
var mysql = require ("mysql");
>>>>>>> 44d27ea8c10d3eda1eb89abc60d2bccda0b23c3d
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
<<<<<<< HEAD
    port: 3306,
    user: "root",
    password: "Sonora83",
    database: "bamazon_db"
});

//array of items in customer's cart
let cartArr = [];

connection.connect(function(err) {
    if (err) throw err;
    loadProducts();
});

function loadProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw (err);
        table.log(res)
            // askUser() to ask customers to chose an item
    })
}

function askUser() {
    // use inquirer package 
    inquirer.promp({

    })
}
=======
    port:3306,
    user:"root",
    passord:
})
>>>>>>> 44d27ea8c10d3eda1eb89abc60d2bccda0b23c3d
