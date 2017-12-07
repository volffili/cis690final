//SINGLETON
var cfg = require('../../config.json');
var User = require('./user.js');

class GameMap{
	constructor(gameArea){
		//this specifies how fast will the are grow with each player
		//for example 0.25 means it enlarges by 0.25 of the original area
		this.enlargmentSpeed = 0.25;

		this.startingGameArea = gameArea;
		this.borderRadius = Math.sqrt(gameArea/Math.PI);

		this.users = [];
	}

	resizeGame(numOfUsers){
    var tmpArea = this.startingGameArea+numOfUsers*this.startingGameArea*this.enlargmentSpeed;
    this.borderRadius = Math.sqrt(tmpArea/Math.PI);
	}

	getNumberOfUsers(){
		return this.users.length;
	}

}

/*The constructor is called only once this way - behaves like singleton*/
var singletonHackGameMap = new GameMap(cfg.startingGameArea);
module.exports = singletonHackGameMap;