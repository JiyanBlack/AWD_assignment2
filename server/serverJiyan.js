var express = require('express');
var path = require('path');
var routes = require('./routes/routes.js');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var router = routes.router;
routes.registerIO(io);

app.use(express.static(path.join(__dirname, 'static')));
app.use('/', router);


http.listen(3000, function() {
    console.log('Start on port 3000...');
})