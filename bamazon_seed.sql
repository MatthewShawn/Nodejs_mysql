SELECT * FROM bamazon.products;
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Box", "Square Things", 0.99, 5280);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Beds", "Square Things", 999.99, 3500);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Balloons", "Round Things", 1.28, 5000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Baboons", "Animal Things", 3350.28, 50);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Bananas", "Food Things", 0.28, 10000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Beer", "Food Things", 10.79, 10000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Beans", "Food Things", 1.45, 10000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Beets", "Food Things", 1.99, 20000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Balls", "Round Things", 15.67, 20000);
INSERT INTO bamazon.products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Hamsters", "Animal Things", 5.67, 200);

UPDATE products SET stock_quantity = stock_quantity - 4 WHERE item_id = 10 AND stock_quantity >0;
