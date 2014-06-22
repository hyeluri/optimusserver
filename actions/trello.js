var Trello = require("node-trello");
var Promise = require("bluebird");
var _ = require("underscore");

var trello = Promise.promisifyAll(new Trello("ca91d6e6ecb68c343dd04faf87a95f9d", "b821007d0d1125bc93b472e44408eb2314b3497b499a7d6c332d81f54203589e"));

var TaskManager = {};

//Returns an obj array of all open cards/tasks currently assigned to you
TaskManager.openTasks = function(){
  return trello.getAsync("/1/members/me", { cards: "open" })
  .then(function(data) {
    return data.cards;
  });
};
//Returns an obj array of all open task boards you have access to
TaskManager.openBoards = function(){
  return trello.getAsync("/1/members/me", { boards: "open" })
  .then(function(data) {
    return data.boards;
  });
};
//Returns an obj array of all open task lists you have access to
TaskManager.openLists = function(){
  return TaskManager.openBoards()
  .then(function(boards){
    var promises = [];
    _.each(_.pluck(boards, "id"), function(boardId){
      promises.push(trello.getAsync("/1/boards/"+boardId, {lists:"open"}));
    });
    return Promise.all(promises);
  })
  .then(function(boards){
    var lists = [];
    _.each(boards, function(item){
      lists = lists.concat(item.lists);
    });
    return lists;
  });
};
//Creates a task on given listId
TaskManager.createTaskByListId = function(listId, taskName){
  return trello.postAsync("/1/cards", {idList:listId, name: taskName, due:null, urlSource:null});
};
//Creates a task on given listName
TaskManager.createTaskByListName = function(listName, taskName){
  console.log("trello",listName,taskName);
  return TaskManager.openLists()
  .then(function(lists){
    var foundListId;
    _.each(lists, function(item){
      if(item.name.toUpperCase() === listName.toUpperCase()){
        foundListId = item.id;
      }
    });
    if(foundListId){
      console.log("found list:", foundListId);
      return TaskManager.createTaskByListId(foundListId, taskName);
    }else{
      return {
        status:"List Not Found"
      };
    }
  });
};



// TaskManager.openTasks()
// .then(function(names){
//   console.log(names);
// });
// TaskManager.createTaskByListName("intermediate", "Test Task")
// .then(function(data){
//   console.log(data);
// });


module.exports = TaskManager;