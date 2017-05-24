require('../models/db.js');
const mongoose = require('mongoose');
var userprofile = mongoose.model('Userprofile');
// userid: { type: String, require: true, unique: true },
// interests: { type: [Number], required: true },
// description: { type: String, require: false },
// viewed: { type: [String], require: false },
// topMatch: { type: [String], require: false },

module.exports.getInterests = function(userid, cb) {
    userprofile.findOne({ userid: userid }, { interests: 1 }).exec(function(err, result) {
        if (err) return console.log(err);
        else {
            cb(result.interests);
        }
    });
}

module.exports.updateMatch = function(matchResult, cb) {
    var jsonResult = JSON.parse(matchResult);
    var userid = jsonResult.userid;
    var interests = jsonResult.interests;
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
            cb(result);
        });
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