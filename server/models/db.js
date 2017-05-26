// mlab link: mongodb://zhanglejiyan:2333@ds149501.mlab.com:49501/hobbymatching
const mongoose = require('mongoose');
const dbURI = 'mongodb://zhanglejiyan:2333@ds149501.mlab.com:49501/hobbymatching';
mongoose.connect(dbURI);

var session = require('express-session');
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
        cookie: { maxAge: 3600000, httpOnly: true, Path: "/" }, //session expires in one hour
    });



const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Mongoose connected to Mlab!');
});

conn.on('error', (error) => {
    console.log('Mongoose connection error: ' + error);
});

conn.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

var shutDown = function (msg, cb) {
    mongoose.connection.close(() => {
        console.log("Mongoose disconnected through " + msg);
        cb();
    });
}

process.once('SIGUSR2', () => {
    shutDown('nodemon restart', () => { process.kill(process.pid, 'SIGUSR2') });
});

process.on('SIGINT', () => {
    shutDown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    shutDown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./profile.js');
require('./userModel.js');

module.exports = sessionMiddleware;