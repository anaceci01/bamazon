DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
price DOUBLE NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

CREATE TABLE department (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR (50) NOT NULL,
PRIMARY KEY (department_id)
)


