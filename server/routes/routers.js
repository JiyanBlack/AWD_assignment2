require('../models/db.js');
var Hashes = require('jshashes');
var MD5 = new Hashes.MD5;
var mongoose = require('mongoose');
var secureKey = "today is a nice day";
var database = require("../util/dataBaseHandle.js");
var consoleLog = require('../util/consoleLog.js');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
module.exports = function (app) {

  var userAuth = function (req, res, next) {

    if (req.session.userID)
      return next();
    else
      return res.redirect("/login");
  }

  var userCheckIn = function (req, res, next) {

    if (req.session.userID)
      return res.redirect("/user_approved_chatApp");
    else
      return next();
  }
  var dataBaseErrorHandle = function (res) {
    res.send({ "error": "DataBase Error Occured, Please Try Again Later" });
  }
  var userErrorHandle = function (res, msg) {
    res.send({ "error": msg });
  }


  app.get('/', userCheckIn, function (req, res) {
    res.sendFile(__dirname + "../static/index.html");

  });
  app.get(/\/(index\.html)?$/, userCheckIn, function (req, res) {
    res.sendFile(__dirname + "../static/index.html");

  });
  app.get('/register(.html)?', userCheckIn, function (req, res) {
    res.sendFile(__dirname + "../static/register.html");
  });

  /*function used for development needs*/
  app.get('/endsession', function (req, res) {
    req.session.destroy();
    res.send("session cleared");
  });

  app.get('/login(.html)?', userCheckIn, function (req, res) {

    res.sendFile(__dirname + "/public/static/login.html");
    //consoleLog(req.session);

  });
  app.post('/user_login', function (req, res) {
    var userPass = req.body.password;
    console.log("pass", req.body.password);
    var query = database.checkUser({ password: userPass });

    query.exec(function (err, user) {
      if (err) return dataBaseErrorHandle(res);
      if (user) {
        req.session.userID = user.userID;
        req.session.userName = user.userName;  //may be need to change
        res.send({ "success": "login" });
        //console.log("logged in successful");
      }
      else
        userErrorHandle(res, "Wrong User Name Or Password,redirecting!");
      //res.send({"error":});
      //res.send("");

    });
  });
  app.post('/register_newUser', function (req, res) {
    //console.log("credentials",req.body.name,req.body.password);
    //res.sendFile(__dirname + "/public/static/login.html");
    if (!req.body.name || !req.body.password)
      return res.send({});
    var userID = MD5.hex(secureKey + req.body.password);
    var query = database.checkUser({ userName: req.body.name });
    query.exec(function (err, user) {

      if (err) return dataBaseErrorHandle(res);
      if (user)
        userErrorHandle(res, "User has been registered before, please login directly!");

      else {

        new User({
          userName: req.body.name,
          password: req.body.password,
          userID: userID,
          friends: [],
        }).save((err, doc) => { if (err) return dataBaseErrorHandle(res) });

        req.session.userID = userID;
        req.session.userName = req.body.name;
        res.send({ "success": "registered" });


        // console.log("registered password",req.body.password);
      }
    });

  });


  app.get('/user_approved_chatApp', userAuth, function (req, res) {
    res.sendFile(__dirname + "/public/static/chatPage.html");

  });



  app.use(function (req, res) {

    res.status(404);
    res.send('404 error');
  });


  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('500 server error');
  });





}