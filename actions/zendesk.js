var zendesk = require('node-zendesk');
var Promise = require('bluebird');
var moment = require("moment");

var client = zendesk.createClient({
  username:  'babaganoosh223@gmail.com',
  token:     '1yD7KM93xq1Eke36N9Mu7Nlkrbyr2OH9Mr7H6v5w',
  remoteUri: 'https://optimus2.zendesk.com/api/v2/',
  oauth: false
});

var ServiceManager = {};

//returns array of open ticket objects
ServiceManager.openTickets = function(){
  return new Promise(function(resolve){
    client.search.queryAll("status<solved", function (err, req, result) {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result);
    });
  });
};
//returns array of open ticket objects older than given date
ServiceManager.openTicketsOlderThanXDays = function(days){
  var date = moment().subtract('days', days).format('YYYY-MM-DD');
  console.log("DATE:", date);
  return new Promise(function(resolve){
    client.search.query("status<solved created<"+date, function (err, req, result) {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result);
    });
  });
};

// ServiceManager.openTicketsOlderThanXDays(1)
// .then(function(data){
//   console.log(data);
// });
module.exports = ServiceManager;