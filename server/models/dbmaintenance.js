require('./db.js');
const mongoose = require('mongoose');
var userprofile = mongoose.model('Userprofile');
var calculateMark = require('./calculateMark.js');
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

function randomViewed() {
    var threshold = 0.01;
    var result = [];
    for (let i = 0; i < 1000; i++) {
        if (Math.random() < threshold) result.push(i.toString());
    }
    return result;
}

function generateRandomViewed() {
    for (let i = 0; i < 1000; i++) {
        userprofile.update({ userid: i.toString() }, { viewed: randomViewed() }).exec(() => {
            console.log(i + ' finished!');
        });
    }
}

function updateRank() {

    var userResult = {};

    var query = userprofile.find({}, { 'userid': 1, 'interests': 1 });
    var promise = query.exec();

    promise.then(function (docs) {
        for (let id in docs) {
            let content = docs[id];
            userResult[id] = content.interests;
        }
        // console.log(userResult);
        for (let i = 0; i < 1000; i++) {
            var userid = i.toString();
            var markResult = [];
            // console.log(userid);
            for (let id in userResult) {
                if (id != userid)
                    markResult.push({ userid: id, rankMark: calculateMark(userResult[userid], userResult[id]) });
            }
            // console.log(markResult);
            markResult.sort((a, b) => { return b.rankMark - a.rankMark });
            var result = markResult.slice(0, 10);
            // console.log(result);
            console.log('update match for ' + userid);
            userprofile.update({ userid: userid }, { topMatch: result }, function (err, rank) {
                if (err) return console.log(err);
            });
        }
    });

}

function generateRandomMatch(userid, interests) {
    userid = userid.toString();
    var userResult = {};
    var markResult = [];
    var query = userprofile.find({}, { 'userid': 1, 'interests': 1 });
    var promise = query.exec();

    promise.then(function (docs) {
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
        userprofile.update({ userid: userid }, { topMatch: result, interests: interests }, function (err, rank) {
            if (err) return console.log(err);
            console.log('update match for ' + userid);
            updateMatch(Number(userid) + 1, getRandomArray());
        });
    });
}
updateRank()