//import io from /socket.io/socket.io-client is done via a script in index.html

export default class ClientSocketCommunicator{

	setupSocket(){
		
	}

	constructor(){
    this.socket = io();
    this.setupSocket(this.socket);
    this.socket.emit('respawn');    
	}

}