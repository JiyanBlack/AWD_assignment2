
var Hashes = require('jshashes');
var MD5 = new Hashes.MD5;
var mongoose = require('mongoose');
var secureKey = "today is a nice day";
var database = require("../util/dataBaseHandle.js");
var consoleLog = require('../util/consoleLog.js');
var User = mongoose.model('User');
var Userprofile = mongoose.model('Userprofile');
var Message = mongoose.model('Message');
var path = require('path');
var staticPath = path.join(__dirname, '../static');
var profile = require('../controllers/profile.js');
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


  app.get('/', function (req, res) {
    res.sendFile(staticPath + "/index.html");

  });
  app.get(/\/(index\.html)?$/, function (req, res) {
    res.sendFile(staticPath + "/index.html");

  });
  app.get('/register(.html)?', function (req, res) {
    res.sendFile(staticPath + "/register.html");
  });

  /*function used for development needs*/
  app.get('/endsession', function (req, res) {
    req.session.destroy();
    res.send("session cleared");
  });

  app.get('/login(.html)?', function (req, res) {
    res.sendFile(staticPath + "/login.html");
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
        res.send({ success: "login", userid: user.userID });
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
        new Userprofile({
          userid: userID,
          description: req.body.description,
          interests: Array(71).fill(0)
        }).save((err, doc) => { if (err) return console.log(err) });
        profile.addUserCache(userID, req.body.name);
        new User({
          userName: req.body.name,
          password: req.body.password,
          userID: userID,
          friends: [],
        }).save((err, doc) => { if (err) return console.log(err) });
        req.session.userID = userID;
        req.session.userName = req.body.name;
        res.send({ success: "registered", userid: userID });
        // console.log("registered password",req.body.password);
      }
    });

  });

  app.get('/user_approved_chatApp', userAuth, function (req, res) {
    res.sendFile(staticPath + "/chatPage.html");
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