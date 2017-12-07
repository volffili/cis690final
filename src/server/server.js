'use strict';
var cfg = require('../../config.json');

/*****************************************
*				  SERVE THE STATIC PAGE	  			 *
******************************************/
var express = require('express');
var app = express();

var http = require('http').Server(app);

//make the client folder public
app.use(express.static(__dirname + '/../client'));

//ip config
var ipaddress = process.env.IP || cfg.host;
var serverport = process.env.PORT || cfg.port;

http.listen( serverport, ipaddress, function() {
    console.log('[DEBUG] Listening on ' + ipaddress + ':' + serverport);
});
/*****************************************
*				  GAME LOGIC VARIABLES	  			 *
******************************************/
//collisions
var SAT = require('sat');
var util = require('./server_util.js');

var gameMap = require('./game_map.js');

var leaderboard = [];
var leaderboardChanged = false;
/*****************************************
*				  SOCKET COMMUNICATION	  			 *
******************************************/
//communicating with the client
var io = require('socket.io')(http);
var SocketCommunicator = require('./socket_communicator.js');
var socketCommunicator = new SocketCommunicator(io);



