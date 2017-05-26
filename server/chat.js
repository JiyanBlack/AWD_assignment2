
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var bodyParser = require('body-parser');
var dataDir = __dirname + '/data';
var sessionMiddleware = require('./sessionMiddleware');

var User = require('./userModule.js');
app.use(require('cookie-parser')());
app.use(sessionMiddleware);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routers.js")(app);
require("./ServerSocketController.js")(io, app);


http.listen(3000, function () {
  console.log('listening on *:3000');
});
