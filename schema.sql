CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id int NOT NULL,
  product_name varchar(20) NOT NULL,
  department_name varchar(30) NOT NULL,
  price decimal(10,2) NOT NULL,
  stock_quantity int(20) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (303, 'Saffron', 'Middle East', 12.00, 25);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (103, 'Ras el Hanout', 'Morocco', 150.00, 3);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (101, 'Berbere', 'Ethiopia', 8.75, 50);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (302, 'Cajun', 'Southern USA', 3.00, 60);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (104, 'Jamaican Jerk', 'Caribbean', 3.00, 73);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (201, 'Adobo', 'Caribbean', 4.00, 47);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (202, 'Açaí Berry', 'Brazil', 7.50, 190);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (203, 'Dendê Oil', 'Brazil', 12.20, 20);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (301, 'Curry', 'India', 1.00, 100);

INSERT INTO products (item_id, product_name, region, price, stock_quantity)
VALUES (102, 'Garam Masala', 'India', 5.00, 48);
