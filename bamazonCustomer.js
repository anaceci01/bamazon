<<<<<<< HEAD
// MySql Connection and Inquirer Import
var mysql = require ("mysql");
=======
var mysql = require("mysql");
>>>>>>> 5c6fd1bae0eb1a80045ec24af64cbe7059534f9d
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

<<<<<<< HEAD
//     })
// }
=======
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
<<<<<<< HEAD
}
=======
    port:3306,
    user:"root",
<<<<<<< HEAD
    password:
})
=======
    passord:
})
>>>>>>> 44d27ea8c10d3eda1eb89abc60d2bccda0b23c3d
>>>>>>> refs/remotes/origin/master
=======
}
>>>>>>> 5c6fd1bae0eb1a80045ec24af64cbe7059534f9d
>>>>>>> 8d09f673bca384c38443efd6a4d640d07fcbf89e
