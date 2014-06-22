var router     = require('express').Router();
var Freshbooks = require('./lib/freshbooks');
var Promise    = require('bluebird');
var moment     = require('moment');

var API_URL      = 'https://test2070.freshbooks.com/api/2.1/xml-in';
var API_TOKEN    = 'cf9e04fd52b2df76fc9288496daf5940';
var CATEGORY_IDS = {
  'personal': 285228
};

var freshbooks = new Freshbooks(API_URL, API_TOKEN);
var expenseClient = new freshbooks.Expense();

var expenseManager = {};


//returns an array of expense objects 
expenseManager.list = function () {
//   <!--Filter by date range (Optional) -->  
//   <date_from>2009-10-31</date_from>  
//   <date_to>2010-2-28</date_to>  
  var options = {};
  var listExpenseAsync = Promise.promisify(expenseClient.list.bind(expenseClient));
  return listExpenseAsync(options);
};

//create an expense given amount and note/name, returns the created expense
expenseManager.create = function (amount, notes) {
  var date = moment().format('YYYY-MM-DD');
  var options = {};
  options.staff_id    = 1;
  options.category_id = CATEGORY_IDS.personal;
  options.date = date;
  options.amount = amount;
  options.notes = notes;

  var createExpenseAsync = Promise.promisify(expenseClient.create.bind(expenseClient));

  return createExpenseAsync(options);
};

// expenseManager.create(49.99, "Printer Toner")
// .then(function(data){
//   console.log(data);
// });


module.exports = {
  expense: expenseManager
};
