module.exports = function (app) {
  var freshbooks = require('../actions/freshbooks');
  var failed     = require('../util/failed');

  app.route('/expenses')

  .get(function (req, res) {
    freshbooks.expense.list()
    .then(function (expenses) {
      var resData = {
        data: expenses[0],
        text: 'Here is the trend of your expenses over time'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  })

  .post(function (req, res) {
    freshbooks.expense.create(req.body.amount, req.body.notes)
    .then(function (expense) {
      var resData = {
        data: expense,
        text: 'I\'ve recorded your expense.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  });
};
