const inquirer = require('inquirer');
const mysql = require('mysql');
const colors = require('colors');
const Table = require('cli-table');
const ProgressBar = require('progress');
const choiceArray = [];
var selection = 0;
var query;
var userAmount;
var itemId;
var stock;
let price;

function progressBar(callback) {
  var bar = new ProgressBar(':bar', { total: 7 });
  var timer = setInterval(function () {
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
      if (callback) {
        callback();
      }
    }
  }, 100);
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err
  console.log("connected as id " + connection.threadId);
  showProducts();
});

// ===== Show products in table =========
function showProducts() {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    console.log('\n' + 'WELCOME TO SPICE BAZAAR!'.white);

    var table = new Table({
    head: ['ID #', 'Name', 'Price'],
    colWidths: [10, 15, 10]
    });

table.push(
[res[0].item_id, res[0].product_name, '$' + res[0].price],
[res[1].item_id, res[1].product_name, '$' + res[1].price],
[res[2].item_id, res[2].product_name, '$' + res[2].price],
[res[3].item_id, res[3].product_name, '$' + res[3].price],
[res[4].item_id, res[4].product_name, '$' + res[4].price],
[res[5].item_id, res[5].product_name, '$' + res[5].price],
[res[6].item_id, res[6].product_name, '$' + res[6].price],
[res[7].item_id, res[7].product_name, '$' + res[7].price],
[res[8].item_id, res[8].product_name, '$' + res[8].price],
[res[9].item_id, res[9].product_name, '$' + res[9].price]
);

    console.log(table.toString());
    chooseItem();
  });
}

// ====== User selects what they want to buy ======
// ================================================
function chooseItem(input) {
  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, {item_id: input}, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'input',
          message: 'What would you like to buy? (use "ID #")'.grey,
          validate: function (input) {
            if (isNaN(input) === false) {
              return true;
            }
              return false;
          }
        },
        {
          name: 'amount',
          type: 'input',
          message: 'How many would you like to buy?'.grey
        }
      ]).then(answer => {
        //console.log(answer.choice);
        desired = answer.choice;
        //invalidId(answer.choice);
        checkQuantity(answer.choice, answer.amount);

      });
  });
}

// ====== Function to check quantity of selected item ======
// =========================================================
function checkQuantity(item, userAmount) {
  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, { item_id: item }, (err, res) => {
    if (err) throw err;
    if(!res[0]) {
      console.log('Not a valid option.' + '\n');
      notReady();
      return;
    }
    if (res[0].stock_quantity > userAmount) {
      inquirer
      .prompt([
        {
          name: 'total',
          type: 'list',
          message: 'Your total is: '.red + '$' + res[0].price * userAmount + '. ' +  'Are you ready to purchase?'.red,
          choices: ['Yes', 'No']
        }
      ]).then(answer => {
        if (answer.total === 'Yes') {
          progressBar(() => {
            console.log('Purchase complete.' + '\n' + 'Thank you for shopping with us!');
          });
          connection.end();
        } else {
          notReady();
        }
      });
    } else {
      console.log('\n' + 'Only ' + stock + ' of that item available.' + '\n');
      notReady();
    }
  });
}

// ====== Function if user isn't ready to purchase ============
// ============================================================
function notReady() {
  inquirer
  .prompt([
    {
      name: 'end',
      type: 'list',
      message: 'What would you like to do?'.grey,
      choices: ['End program', 'Restart']
    }
  ]).then(answer => {
    if (answer.end === 'Restart') {
      showProducts();
    } else {
      console.log('Come back again!');
      connection.end();
    }
  });
}

// ====== Function if user selects invalid item ID ============
// ============================================================
function invalidId(choice) {
  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, {item_id: choice}, (err, res) => {
    if (err) {
      console.log('test');
    }
    // console.log(choice);
    // console.log(res[0].item_id);
    //Need help here
    // if (choice !== res[0].item_id) {
    //   console.log('ok');

  });
}
