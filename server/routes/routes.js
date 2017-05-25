const express = require('express');
const router = express.Router();
var profile = require('../controllers/profile.js');



function registerIO(io) {
    io.on('connection', (socket) => {
        console.log('user connected!');

        socket.on('addOneView', (jsonstr) => {
            profile.addOneView(jsonstr, (result) => {
                console.log('update viewed: ' + jsonstr);
            })
        })

        socket.on('addOneFriend', (jsonstr) => {
            profile.addOneFriend(jsonstr, (result) => {
                console.log('add friend: ' + jsonstr);
            });
        });

        socket.on('getTopMatch', (userid) => {
            profile.getTopMatch(userid, (result) => {
                console.log('send "topMatch" for ' + userid);
                socket.emit('receiveTopMatch', JSON.stringify(result));
            });
        });

        socket.on('getProfile', (userid) => {
            profile.getProfile(userid, (result) => {
                console.log('send "getProfile" for ' + userid);
                socket.emit('receiveProfile', JSON.stringify(result));
            });
        });

        socket.on('getInterests', (userid) => {
            try {
                profile.getInterests(userid, (result) => {
                    console.log('send "getInterests" for ' + userid);
                    socket.emit('receiveInterests', JSON.stringify(result));
                });
            } catch (e) {
                console.log(e);
            }
        });

        socket.on('updateMatch', (matchResult) => {
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