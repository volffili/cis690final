'use strict';

var cfg = require('../../config.json');
var util = require('./server_util.js');
var gameMap = require('./game_map.js');
var User = require('./user.js');

class SocketCommunicator{

	initUser(){
    console.log('A user connected!');

    var position = util.uniformPosition(gameMap.getNumberOfUsers(),User.collisionRadius,gameMap.borderRadius);
    console.log(position);

    var newPlayer = new User(position.x,position.y,this.socket.id,new Date().getTime());
	}


	handleConnection(socket){
		this.socket = socket;
		this.initUser();
    this.socket.on('respawn', this.respawn); 
	}

	respawn(){
    console.log('[INFO] User respawned!');
  }

	constructor(io){
		this.handleConnection = this.handleConnection.bind(this);

		this.io = io;
		this.io.on('connection',this.handleConnection);
	}
}

module.exports = SocketCommunicator;