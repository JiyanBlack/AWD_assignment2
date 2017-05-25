var mongoose = require('mongoose');
//var Schema = mongoose.Schame;

var userNamePass = mongoose.Schema(
    {
        namePassHash: String,
    }

);

var messagesSechma = mongoose.Schema(
    {
        fromID: String,
        toID: String,
        time: { type: Date, default: Date.now },
        content: String,
        beenRead: { type: Boolean, default: false },
    }

);


var userSchema = mongoose.Schema({
    userName: String,
    password: String,
    userID: String,
    friends: [String],

});

var userIDSchema = mongoose.Schema({
    userID: Number
});

var Messages = mongoose.model('Messages', messagesSechma, 'messages');
var UserID = mongoose.model('UserID', userIDSchema);
var User = mongoose.model('User', userSchema, 'users');
var UserNamePass = mongoose.model('UserNamePass', userNamePass);
