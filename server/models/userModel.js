var mongoose = require('mongoose');
//var Schema = mongoose.Schame;
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

mongoose.model('Message', messagesSechma, 'messages');
mongoose.model('User', userSchema, 'users');
