require('../models/db.js');
const mongoose = require('mongoose');
var Userprofile = mongoose.model('Userprofile');
var User = mongoose.model('User');
var calculateMark = require('../models/calculateMark.js');

// cache user name and interests to speed response 
var userprofileCache = {};
var userNameCache = {};

module.exports.addOneView = function (jsonstr, cb) {
    var obj = JSON.parse(jsonstr);
    var userid = obj.userid;
    var target = obj.target;
    if (!userid || !target) return;
    Userprofile.findOne({ userid: target }, { viewed: 1 }).exec((err, result) => {
        if (err) console.log(err);
        if (!result.viewed) return;

        var viewedSet = new Set(result.viewed);
        viewedSet.add(userid);
        var viewed = Array.from(viewedSet);

        Userprofile.update({ userid: target }, { viewed: viewed }).exec((err, result) => {
            if (err) console.log(err);
            cb(result);
        }).catch((e) => console.log(e));

    }).catch((e) => console.log(e));
}

module.exports.addOneFriend = function (jsonstr, cb) {
    var obj = JSON.parse(jsonstr);
    var userid = obj.from;
    var target = obj.target;
    if (!userid || !target) return;
    User.findOne({ userID: userid }, { friends: 1 }).exec((err, result) => {
        if (err) console.log(err);
        var friendSet = new Set(result.friends);
        friendSet.add(target);
        var friendList = Array.from(friendSet);
        User.update({ userID: userid }, { friends: friendList }).exec((err, result) => {
            if (err) console.log(err);
            cb(result);
        }).catch((e) => console.log(e));
    }).catch((e) => console.log(e));
}

module.exports.getTopMatch = function (userid, cb) {
    if (!userid) return;
    Userprofile.findOne({ userid: userid }, { topMatch: 1 }).exec((err, result) => {
        if (err) return console.log(err);
        cb(generateTopMatchList(result.topMatch));
    });
}

module.exports.getInterests = function (userid, cb) {
    if (!userid) return;
    Userprofile.findOne({ userid: userid }, { interests: 1 }).exec((err, result) => {
        if (err) return console.log(err);
        cb(result.interests);
    }).catch((e) => console.log(e));
}

module.exports.getProfile = function (userid, cb) {
    if (!userid) return;
    var result = {
        name: '',
        userid: userid,
        friends: [],
        viewed: []
    };
    User.findOne({ userID: userid }).exec((err, userinfo) => {
        if (err) console.log(err);
        // console.log(userinfo);
        for (let i = 0; i < userinfo.friends.length; i++) {
            let friendId = userinfo.friends[i];
            result.friends.push({ name: userNameCache[friendId], userid: userinfo.friends[i] });
        }
        result.name = userNameCache[userid];
        Userprofile.findOne({ userid: userid }, {}).exec((err, viewed) => {
            result.viewed = viewed.viewed.map((oneid) => { return { userid: oneid, name: userNameCache[oneid] } });
            result.viewed = result.viewed.reverse().slice(0, 10);
            // console.log(result);
            cb(result);
        }).catch((e) => console.log(e));
    }).catch((e) => console.log(e));
}



module.exports.updateMatch = function (matchResult, cb) {
    var jsonResult = JSON.parse(matchResult);
    var userid = jsonResult.userid;
    var interests = jsonResult.interests;
    if (!userid || !interests) return;

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
    });
    cb(generateTopMatchList(result));
}

function generateTopMatchList(topMatch) {
    for (let i = 0; i < topMatch.length; i++) {
        topMatch[i]['name'] = userNameCache[topMatch[i].userid];
    }
    return topMatch;
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