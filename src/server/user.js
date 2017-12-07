var cfg = require('../../config.json');
var Vector = require('./vector.js');

class User{
	constructor(x,y,id,heartBeat){
		this.position = new Vector(x,y);
		this.id = id;
		this.lastHeartbeat = heartBeat;
		this.pressedKeys = [];
	}
}

User.collisionRadius = cfg.userCollisionRadius;

module.exports = User;