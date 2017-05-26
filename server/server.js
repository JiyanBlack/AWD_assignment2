var express = require('express');
var path = require('path');
var sessionMiddleware = require('./models/db.js');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(require('cookie-parser')());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/routers.js")(app);
require("./controllers/socketControllers.js")(io, sessionMiddleware);

http.listen(3000, function () {
    console.log('Start on port 3000...');
})