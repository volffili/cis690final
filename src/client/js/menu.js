import constants from './../shared_config.js';

export default class Menu{
    static validNick(val) {
        var regex = /^\w*$/;
        return regex.exec(val) !== null;
    }

    getPlayerName(){
        return this.playerNameInput.value.replace(/(<([^>]+)>)/ig, '').substring(0,25);
    }

    constructor(){
        this.playerNameInput = document.getElementById('playerNameInput');
        this.btn = document.getElementById('startButton');
        this.nickErrorText = document.getElementById('input-error-id');
        this.instructions = document.getElementById('instructions');
        this.listen = this.listen.bind(this);
    }

    listen(startGameFunc){

        var self = this;
        var startGameIfValidNick = function () {
            // Checks if the nick is valid.
            if (Menu.validNick(self.playerNameInput.value)) {
                self.nickErrorText.style.opacity = 0;
                startGameFunc();
            } else {
                self.nickErrorText.style.opacity = 1;
            }
        }

        this.btn.onclick = function () {
            // Checks if the nick is valid.
            startGameIfValidNick();
        };

        this.playerNameInput.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;

            if (key === constants.KEY_ENTER) {
                startGameIfValidNick();
            }
        });        
    }

}


