var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sonora83",
    database: "bamazon_db"
});

connection.connect(function(err, res) {
    if (err) {
        throw err;
    }
    connection.query("SELECT * FROM PRODUCT", function(err, result) {
        if (err) {
            throw err;
        }
        inquirer
            .prompt([{
                type: "input",
                message: "this is our first question",
                name: "first",
            }])
            .then(function(answers) {
                console.log("Bamazon customer loaded")
                console.log(answers);
            });

    });

    // function loadProducts() {
    //     var query = "SELECT * FROM products";
    //     connection.query(query, function(err, res) {
    //         if (err) {
    //             throw (err);
    //         }
    //         console.log(res)
    // askUser() to ask customers to chose an item
})







// function askUser() {
//     // use inquirer package 
//     inquirer.prompt({

//     })
// }