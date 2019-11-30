var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sonora83",
    database: "bamazon"
});

connection.connect(function(err, res) {
    if (err) {
        throw err;
    }
    loadProducts();
});

function loadProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptItem(res);
    });

    function promptItem(inventory) {
        inquirer
            .prompt([{
                type: "input",
                message: "Select the ID of the product you would like to buy",
                name: "select",
            }, ])
            .then(function(answers) {
                console.log("Bamazon customer loaded")
                console.log(answers);
            });
    };

    // function loadProducts() {
    //     var query = "SELECT * FROM products";
    //     connection.query(query, function(err, res) {
    //         if (err) {
    //             throw (err);
    //         }
    //         console.log(res)
    // askUser() to ask customers to chose an item








    // function askUser() {
    //     // use inquirer package 
    //     inquirer.prompt({

    // function loadProducts() {
    //     var query = "SELECT * FROM products";
    //     connection.query(query, function(err, res) {
    //         if (err) throw (err);
    //         table.log(res)
    //             // askUser() to ask customers to chose an item
    //     })
    //