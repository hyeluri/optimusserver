module.exports = function (app) {
  var zendesk = require('../actions/zendesk');
  var failed     = require('../util/failed');

  app.route('/zendesk')
  .get(function (req, res) {
    console.log("req",req);

    zendesk.openTickets()
    .then(function (tickets) {
      var resData = {
        data: tickets,
        text: 'Here are all your open tickets.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });
  });

  app.route('/zendesk/:daysOld')
  .get(function (req, res) {
    console.log("req",req);

    zendesk.openTicketsOlderThanXDays(req.params.daysOld)
    .then(function (tickets) {
      var resData = {
        data: tickets,
        text: 'Here are all your open tickets older than '+req.params.daysOld+' days.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });
  });

};
