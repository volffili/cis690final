import ClientSocketCommunicator from './client_socket_communicator.js';
import ClientGame from './client_game.js';
import Menu from './menu.js';

var clientGame = new ClientGame();
var communicator;
var menu = new Menu();

function startGame() {

  document.getElementById('startMenuWrapper').style.maxHeight = '0px';
  document.getElementById('gameAreaWrapper').style.opacity = 1;

	communicator = new ClientSocketCommunicator(clientGame,menu.getPlayerName(),window.innerWidth,window.innerHeight);  
}

window.onload = function() {
    menu.listen(startGame);
};
