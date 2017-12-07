var cfg = require('../../config.json');
var Vector = require('./vector.js');

class User{
	constructor(x,y,id,heartBeat){
		this.position = new Vector(x,y);
		this.id = id;
		this.lastHeartbeat = heartBeat;
		this.pressedKeys = [];
		this.serialize = this.serialize.bind(this);
	}
	serialize(){
		return {
			x:this.position.x,
			y:this.position.y,
			id:this.id,
			lastHeartbeat: this.lastHeartbeat
		}
	}
}

User.collisionRadius = cfg.userCollisionRadius;

module.exports = User;