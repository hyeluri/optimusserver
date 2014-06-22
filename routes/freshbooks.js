module.exports = function (app) {
  var freshbooks = require('../actions/freshbooks');
  var failed     = require('../util/failed');

  app.route('/expenses')

  .get(function (req, res) {
    console.log("req",req);

    freshbooks.expense.list()
    .then(function (expenses) {
      var resData = {
        data: expenses[0],
        text: 'Here are your recent expenses.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  })

  .post(function (req, res) {

    freshbooks.expense.create(req.body)
    .then(function (expense) {
      var resData = {
        data: expense,
        text: 'I\'ve recorded your expense. Here it is for the record.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  });
};
