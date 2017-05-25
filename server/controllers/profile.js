require('../models/db.js');
const mongoose = require('mongoose');
var Userprofile = mongoose.model('Userprofile');
var User = mongoose.model('User');

// cache user name and interests to speed response 
var userprofileCache = {};
var userNameCache = {};


module.exports.getInterests = function (userid, cb) {
    Userprofile.findOne({ userid: userid }, { interests: 1 }).exec(function (err, result) {
        if (err) return console.log(err);
        cb(result.interests);
    }).catch((e) => console.log(e));
}

module.exports.getProfile = function (userid, cb) {
    try {
        console.log(userid);
        var result = {
            name: '',
            userid: userid,
            friends: [],
            viewed: []
        };
        User.findOne({ userID: userid }).exec((err, userinfo) => {
            if (err) console.log(err);
            console.log(userinfo);
            for (let i = 0; i < userinfo.friends.length; i++) {
                let friendId = userinfo.friends[i];
                result.friends.push({ name: userNameCache[friendId], userid: userinfo.friends[i] });
            }
            result.name = userNameCache[userid];
            Userprofile.findOne({ userid: userid }, {}).exec((err, viewed) => {
                result.viewed = viewed.viewed.map((oneid) => { return { userid: oneid, name: userNameCache[oneid] } });
                console.log(result);
                cb(result);
            }).catch((e) => console.log(e));
        }).catch((e) => console.log(e));
    } catch (e) {
        console.log(e);
    }
}


module.exports.updateMatch = function (matchResult, cb) {
    var jsonResult = JSON.parse(matchResult);
    var userid = jsonResult.userid;
    var interests = jsonResult.interests;
    userid = userid.toString();
    var markResult = [];
    userprofileCache[userid] = interests;
    for (let id in userprofileCache) {
        if (id != userid)
            markResult.push({ userid: id, rankMark: calculateMark(interests, userprofileCache[id]) });
    }

    markResult.sort((a, b) => { return b.rankMark - a.rankMark });
    var result = markResult.slice(0, 10);
    Userprofile.update({ userid: userid }, { topMatch: result, interests: interests }, function (err, rank) {
        if (err) return console.log(err);
        console.log('update match for ' + userid);
        cb(result);
    });
}

function calculateMark(arr1, arr2) {
    var mark = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] == arr2[i]) {
            if (arr1[i] == 0)
                mark += 1;
            else
                mark += 10;
        }
    }
    return mark;
}


Userprofile.find({}, { 'userid': 1, 'interests': 1 }).exec().then(function (docs) {
    for (let id in docs) {
        let content = docs[id];
        userprofileCache[id] = content.interests;
    }
    console.log('cache interests array...');
});

User.find({}, { 'userID': 1, 'userName': 1 }).exec((err, docs) => {
    if (err) console.log(err);
    for (let id in docs) {
        let content = docs[id];
        userNameCache[id] = content.userName;
    }
    // console.log(userNameCache);
    console.log('cache user collection...');
});