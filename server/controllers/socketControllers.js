const mongoose = require('mongoose');
var Userprofile = mongoose.model('Userprofile');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var database = require("../util/dataBaseHandle.js");
var consoleLog = require('../util/consoleLog.js');

var profile = require('./profile.js');

function jsonfy(obj) {
  return JSON.stringify(obj);
}

function dataBaseError(socket) {
  socket.emit("error", "Database Error, Please Try Again Later");
}
function unexpectedError(socket, msg) {
  socket.emit("error", msg);
}

const clientMap = {};

module.exports = function (io, sessionMiddleware) {

  io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  var socketAuth = function socketAuth(socket, next) {
    //return next();
    if (socket.request.session.userID)
      return next();
    else
      return next(new Error('Not Authenticated'));
  };

  // io.use(socketAuth);  //authenticate all io sockets

  /* check friend login status*/
  io.on('connection', function (socket) {
    socket.emit('check!');
    var userID = socket.request.session.userID;
    console.log("socketid,", socket.id);
    clientMap[userID] = socket.id;
    // console.log("brodcasting");
    socket.broadcast.emit("checkFriendLogIn", userID);
    socket.emit("userInfo", {
      userName: socket.request.session.userName,
      userID: userID,
    });

    socket.on('addOneView', (jsonstr) => {
      profile.addOneView(jsonstr, (result) => {
        console.log('update viewed: ' + jsonstr);
      });
    });

    socket.on('addOneFriend', (jsonstr) => {
      profile.addOneFriend(jsonstr, (result) => {
        console.log('add friend: ' + jsonstr);
      });
    });

    socket.on('getTopMatch', (userid) => {
      profile.getTopMatch(userid, (result) => {
        console.log('send "topMatch" for ' + userid);
        socket.emit('receiveTopMatch', JSON.stringify(result));
      });
    });

    socket.on('getProfile', (userid) => {
      console.log('1111');
      profile.getProfile(userid, (result) => {
        console.log('send "getProfile" for ' + userid);
        socket.emit('receiveProfile', JSON.stringify(result));
      });
    });

    socket.on('getInterests', (userid) => {
      try {
        profile.getInterests(userid, (result) => {
          console.log('send "getInterests" for ' + userid);
          socket.emit('receiveInterests', JSON.stringify(result));
        });
      } catch (e) {
        console.log(e);
      }
    });

    socket.on('updateMatch', (matchResult) => {
      try {
        profile.updateMatch(matchResult, (result) => {
          socket.emit('updateMatchSuccess', JSON.stringify(result));
        })
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("loadMessagefriends", (msg) => {
      var userID = socket.request.session.userID;
      var query = database.checkUser({ userID: userID });
      query.exec(function (err, user) {
        if (err)
          return dataBaseError(socket);
        if (user) {
          console.log("user found");
          //    user.save((err,doc)=>{if (err) errHandle(err)});
          var friendList = user.friends;
          console.log("he has friends:" + friendList);
          // console.log("friendlist"+friendList);
          User.find({ userID: { $in: friendList } }, function (err, friends) {
            //  consoleLog(friends)
            if (err)
              return dataBaseError(socket);
            if (friends != []) {
              var foundFriends = friends.map((friend) => {

                return {
                  friendID: friend.userID,
                  friendName: friend.userName,
                  friendOnline: clientMap[friend.userID] ? true : false,
                }
                //[friend.userID,friend.userName,friend.online];
              });
              //console.log("found following friends");
              //consoleLog(foundFriends);
              socket.emit("syncFriends", foundFriends);
            }
            else {
              socket.emit("syncFriends", []);
              //console.log("syncFriends","");
            }
          });
          Message.find({ toID: user.userID, beenRead: false }, function (err, messages) {
            if (err)
              return dataBaseError(socket);
            if (messages) {
              socket.emit("syncMessages", messages);
            }
            else
              socket.emit("syncMessages", []);
          });
          // socket.emit("loggedin","user logged in");
          // res.send(jsonfy({success:"true"+user.userName}));
        }
        else
          return unexpectedError(socket, "Unexpected Problem Occured");
      });
    });


    socket.on("sendMessage", (data) => {
      var userID = socket.request.session.userID;
      //console.log("prepare to send message");
      var targetID = clientMap[data.toID];
      data.fromID = userID;
      if (targetID) {
        // var newData=JSON.parse(JSON.stringify(data));
        data.beenRead = true;
        new Message(data).save((err, doc) => {
          if (err) return dataBaseError(socket);
          data.time = doc.time;
          // console.log("time is",doc.time);
          try {
            io.sockets.sockets[targetID].emit("newMessage", data);
          }
          catch (err) {
            return unexpectedError(socket, "Unexpected Problem Occured, Message Not Sent");
            //socket.emit("error","message not sending" );
          }
          socket.emit("newMessage", data);
        });
      }
      else
        new Message(data).save((err, doc) => {
          if (err) return dataBaseError(socket);
          data.time = doc.time;
          socket.emit("newMessage", data);
        });
    });

    socket.on("refreshUnread", (friendID) => {
      var userID = socket.request.session.userID;
      Message.find({ fromID: friendID, toID: userID }, function (err, messages) {  //the sender clear the storage that sent from the friend
        if (err)
          return dataBaseError(socket);
        if (messages) {
          //consoleLog(messages);
          messages.forEach(function (message) {
            message["beenRead"] = true;
            message.save((err) => { if (err) return dataBaseError(socket); })
          });
          // console.log("messages updated" );
        }
        //console.log("no message found");
      });
    });

    socket.on("disconnect", () => {
      socket.emit("userlogged off", "user logged off");
      var userID = "";
      for (var id in clientMap) {
        if (clientMap[id] == socket.id) {
          delete clientMap[id];
          //console.log(userID,"offline");
          socket.broadcast.emit("checkFriendOffLine", id);
          break;
        }
      }
    });
  });

}