const express = require('express');
const router = express.Router();
var profile = require('../controllers/profile.js');



function registerIO(io) {
    io.on('connection', function (socket) {
        console.log('user connected!');

        socket.on('getProfile', function (userid) {
            profile.getProfile(userid, (result) => {
                console.log('Receive "getProfile" for ' + userid);
                socket.emit('receiveProfile', JSON.stringify(result));
            });
        });

        socket.on('getInterests', function (userid) {
            try {
                profile.getInterests(userid, (result) => {
                    console.log('Receive "getInterests" for ' + userid);
                    socket.emit('receiveInterests', JSON.stringify(result));
                });
            } catch (e) {
                console.log(e);
            }
        });

        socket.on('updateMatch', function (matchResult) {
            try {
                profile.updateMatch(matchResult, (result) => {
                    socket.emit('updateMatchSuccess', JSON.stringify(result));
                })
            } catch (e) {
                console.log(e);
            }
        });
    });
}

module.exports.router = router;
module.exports.registerIO = registerIO;