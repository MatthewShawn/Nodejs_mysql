// Load the NPM Package inquirer and mysql
var inquirer = require("inquirer");
var mysql = require("mysql");
var dbjson;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "P1zz@P@rty",
    database: "bamazon"
});

function makeInquiry() {

    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "What is the id of the product you would like to buy?",
                name: "productname"
            },
            // Here we create a basic password-protected text prompt.
            {
                type: "input",
                //  Ooo, it would be nice to put in the name of the item they just requested!
                // That would be another prompt on the response, I think.
                message: "How many of those would you like?",
                name: "productquantity"
            },
            // Here we ask the user to confirm.
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])
        .then(function(inquirerResponse) {
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            itemSelectedIndex = -1;
            console.log("dbjson.length: " + dbjson.length);
            console.log("Inquiry product id: " + inquirerResponse.productname);
            console.log("dbjson zero item id: " + dbjson[0].item_id);
            if (inquirerResponse.confirm) {
                for (var i = 0; i < dbjson.length; i++) {
                    if (parseInt(dbjson[i].item_id) === parseInt(inquirerResponse.productname)) {
                        itemSelectedIndex = i;
                    }
                }
                if (itemSelectedIndex === -1) {
                    // console.log("big trouble"); 
                    console.log("You have attempted to purchase a non-existent item.");
                    console.log("Returning to original questions.");
                    makeInquiry();
                }
                console.log("\nYou ordered " + inquirerResponse.productquantity +
                    " items of " + dbjson[itemSelectedIndex].product_name + "...processing...\n");
                processPurchase(itemSelectedIndex, inquirerResponse.productquantity);
                return;
            } else {
                console.log("\nThat's okay, " + inquirerResponse.productname + " may still be here when you want it.\n");
            }

            connection.end();
        });
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    listAndInquire();

});


function processPurchase(index, numOf) {
    // Using the already loaded json, determine if the purchase is valid
    // calculate the price and update the actual database.
    // at the end run listAndInquire to show updated numbers allow it to refresh
    // the local json.
    // Remember that the db call could still FAIL, because a different user
    // could have purchased all the items listed.
    console.log("Validating purchase quantities...\n");
    if (numOf <= dbjson[index].stock_quantity) {
        console.log("There exists enough stock to fufill the purchase...");
    } else {
        console.log("Sorry, but that product has only " + dbjson[index].stock_quantity +
            " items left.  Purchase aborted.\n");
        listAndInquire();
        return;
    }
    console.log("Submitting purchase...");
    // example code: update yourTableName set yourColumnName = yourColumnName - 1 where yourColumnName > 0;
    var dbjsonItemId = parseInt(dbjson[index].item_id);
    var query = connection.query(
        "UPDATE products SET stock_quantity = stock_quantity-" + numOf +
        " WHERE item_id = " + dbjsonItemId + " AND stock_quantity-" + numOf +
        " >= 0", //[{
        /*        stock_quantity: stock_quantity - numOf
            },
            {
                item_id: dbjson[index].item_id
            }
        ],*/
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            console.log("You purchased " + numOf + " " + dbjson[index].product_name +
                " at $" + dbjson[index].price + ", for a total cost of $" +
                numOf * dbjson[index].price);
            // Call listAndInquire AFTER the UPDATE completes
            listAndInquire();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
    //listAndInquire(); // temporary position, I think.
}

function listAndInquire() {
    connection.query("SELECT * FROM products ORDER BY department_name", function(err, res) {
        if (err) throw err;
        //console.log(res);
        dbjson = res;
        console.log("\n\nid | product | price | department | quantity available\n")
        var department = res[0].department_name;
        for (var i = 0; i < res.length; i++) {
            if (department !== res[i].department_name) {
                console.log("------------------------");
                department = res[i].department_name;
            }
            console.log(res[i].item_id + " | " + res[i].product_name + " | " +
                "$" + res[i].price + " | " + res[i].department_name +
                " | " + res[i].stock_quantity);
        }
        console.log("\n");
        makeInquiry();
    });
}