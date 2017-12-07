'use strict';

var cfg = require('../../config.json');
var util = require('./server_util.js');
var gameMap = require('./game_map.js');
var User = require('./user.js');

class SocketCommunicator{

	initConnection(socket){
    console.log('Connection established with: ',socket.id);
	}

	respawn(socket,basicInfo){

    var position = util.uniformPosition(gameMap.getNumberOfUsers(),User.collisionRadius,gameMap.borderRadius);
    var newPlayer = new User(position.x,position.y,socket.id,new Date().getTime());

		var index = util.findIndex(gameMap.users, socket.id);
    if (index > -1){
	    users.splice(index, 1);
    }

    console.log('Create new player with id  : ',socket.id);

    socket.emit('welcome', newPlayer.serialize());
    console.log('[INFO] User ' + basicInfo.name + ' respawned!');
    console.log("[INFO] This user's screen width is: " + basicInfo.screenWidth);
    console.log("[INFO] His user's screen height is: " + basicInfo.screenHeight);
  }

	handleConnection(socket){
		this.initConnection(socket);

		var self=this;
    socket.on('respawn', function(basicInfo){
    	self.respawn(socket,basicInfo);
    });

	}

	constructor(io){
		this.respawn = this.respawn.bind(this);
		this.initConnection = this.initConnection.bind(this);
		this.handleConnection = this.handleConnection.bind(this);
		
		this.io = io;
		this.io.on('connection',this.handleConnection);
	}
}

module.exports = SocketCommunicator;