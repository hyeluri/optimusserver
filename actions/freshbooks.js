var router     = require('express').Router();
var Freshbooks = require('./lib/freshbooks');
var Promise    = require('bluebird');

var API_URL      = 'https://test2070.freshbooks.com/api/2.1/xml-in';
var API_TOKEN    = 'cf9e04fd52b2df76fc9288496daf5940';
var CATEGORY_IDS = {
  'personal': 285228
};

var freshbooks = new Freshbooks(API_URL, API_TOKEN);
var expenseClient = new freshbooks.Expense();

var expenseManager = {};
expenseManager.list = function (options) {
  options = options || {};

  var listExpenseAsync = Promise.promisify(expenseClient.list.bind(expenseClient));
  return listExpenseAsync(options);
};

expenseManager.create = function (data) {
  data.staff_id    = data.staff_id    || 1;
  data.category_id = data.category_id || CATEGORY_IDS.personal;

  var createExpenseAsync = Promise.promisify(expenseClient.create.bind(expenseClient));

  return createExpenseAsync(data);
};

module.exports = {
  expense: expenseManager
};
