const mongoose = require('mongoose');
var topMatchSchema = new mongoose.Schema({
    userid: { type: String, require: true },
    rankMark: { type: Number, require: true }
});

var profileSchema = new mongoose.Schema({
    userid: { type: String, require: true, unique: true },
    interests: { type: [Number], required: false },
    description: { type: String, require: false },
    viewed: { type: [String], require: false },
    topMatch: { type: [mongoose.Schema.topMatchSchema], require: false },
});

mongoose.model('Userprofile', profileSchema, 'userprofiles');