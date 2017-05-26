var express = require('express');
var path = require('path');
var session = require('express-session');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
require('./models/db.js');
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(session);
var sessionMiddleware = session(
    {
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            touchAfter: 24 * 3600
        }),
        resave: false,
        saveUninitialized: false,
        secret: "keyboard cat",
        cookie: { maxAge: 3600000, httpOnly: false, Path: "/" }, //session expires in one hour
    });
app.use(sessionMiddleware);


require("./routes/routers.js")(app);
require("./controllers/socketControllers.js")(io, sessionMiddleware);

http.listen(3000, function () {
    console.log('Start on port 3000...');
})