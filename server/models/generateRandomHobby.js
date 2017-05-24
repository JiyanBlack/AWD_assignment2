require('../models/db.js');
const mongoose = require('mongoose');
var userprofile = mongoose.model('Userprofile');

function getRandomArray() {
    var threshold = (Math.random() + 1) * 0.1;
    var result = [];
    for (var i = 0; i < 71; i++) {
        if (Math.random() < threshold)
            result.push(1);
        else
            result.push(0);
    }
    return result;
}

function updateMatch(userid, interests) {
    userid = userid.toString();
    var userResult = {};
    var markResult = [];
    var query = userprofile.find({}, { 'userid': 1, 'interests': 1 });
    var promise = query.exec();

    promise.then(function(docs) {
        for (let id in docs) {
            let content = docs[id];
            userResult[id] = content.interests;
        }
        for (let id in userResult) {
            markResult.push({ userid: id, rankMark: calculateMark(interests, userResult[id]) });
        }
        delete userResult;
        // sort the result
        markResult.sort((a, b) => { return b.rankMark - a.rankMark });
        var result = markResult.slice(0, 10);
        userprofile.update({ userid: userid }, { topMatch: result, interests: interests }, function(err, rank) {
            if (err) return console.log(err);
            console.log('update match for ' + userid);
            updateMatch(Number(userid) + 1, getRandomArray());
        });
    });
}

updateMatch(1, getRandomArray());