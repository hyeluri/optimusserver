module.exports = function (app) {
  var trello = require('../actions/trello');
  var failed     = require('../util/failed');

  app.route('/tasks')
  .get(function (req, res) {
    trello.openTasks()
    .then(function (tasks) {
      var resData = {
        data: tasks,
        text: 'Here are your open tasks.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  })

  .post(function (req, res) {
    trello.createTaskByListName(req.body.listName,req.body.taskName)
    .then(function (task) {
      var resData = {
        data: {list:req.body.listName, task:req.body.taskName},
        text: 'I\'ve recorded your task. Here it is for the record.'
      };
      res.send(200, resData);
    })
    .catch(function (err) {
      failed.sendLie(res, err);
    });

  });
};