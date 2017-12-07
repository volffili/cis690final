//import io from /socket.io/socket.io-client is done via a script in index.html
import ClientPlayer from './client_player.js';

export default class ClientSocketCommunicator{

	setupSocket(){
    this.socket.on('welcome', function (playerSettings) {
    	console.log(playerSettings);
    	/*this.game.player = new ClientPlayer(name,playClass);
        //initial player configuration
        player = playerSettings;
        player.name = global.playerName;
        player.screenWidth = global.screenWidth;
        player.screenHeight = global.screenHeight;
        player.target = window.canvas.target;
        player.speed = 0;
        player.radius = 20;
        player.hue = shipColor;
        player.type = shipType;*/
        //global.player = player;
        //window.chat.player = player;
        //socket.emit('gotit', player);
        //window.chat.addSystemLine('Type <b>-help</b> for a list of commands.');
	   //canvas.focus();
    });
	}

	constructor(clientGame,playerName,screenWidth,screenHeight){

        var basicInfo = {
            playerName: playerName,
            screenWidth: screenWidth,
            screenHeight: screenHeight
        };

		this.game = clientGame;
        this.socket = io();
        this.setupSocket();
        this.socket.emit('respawn',basicInfo);    
	}

}