/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
 
var Game = (function(){ 

    var app = {}; 

    // Publics 
    var app = {
        buttons: {
            newGame: document.querySelector('.btn-new'),
            rollDice: document.querySelector('.btn-roll'),
            hold: document.querySelector('.btn-hold')
        },
        p1: {
            name: document.getElementById('name-0'),
            score: document.getElementById('score-0'),
            current: document.getElementById('current-0')
        },
        p2: {
            name: document.getElementById('name-1'),
            score: document.getElementById('score-1'),
            current: document.getElementById('current-1')
        },
        dice: document.querySelector('.dice')
    }
    app.scores = [0,0];
    app.activePlayer = 0;
    app.roundScore = 0;

    app.getRandom = function(min, max) {
        // Inclusive of each end
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    
    app.init = function(){
        _attachListeners();
        console.log('iniited');
        app.dice.style.display = 'none';
        app.p1.score.innerHTML = '0';
        app.p2.score.innerHTML = '0';
        app.p1.current.innerHTML = '0';
        app.p2.current.innerHTML = '0';
    }

    function _attachListeners(){ 
        // Attach listeners 
        // app.buttons.newGame.addEventListener('click', _handleClick)
         app.buttons.rollDice.addEventListener('click', _rollDice)
         app.buttons.hold.addEventListener('click', _hold)
    }

    function _hold(){
        let roundscore = app.roundScore;
        
        // apply current score to app state
        app.scores[app.activePlayer] += app.roundScore;
        document.getElementById(`score-${app.activePlayer}`).textContent = app.scores[app.activePlayer];
         // Set next player
         app.activePlayer = (app.activePlayer == 0) ? 1 : 0;
    }

    function _applyScore(score){
        console.log(app.roundScore);

    }

    function _rollDice(){
        // get random number
        var roll = app.getRandom(1,6); 
        // Display result
        app.dice.src = `images/dice-${roll}.png`;
        app.dice.style.display = 'block';
        console.log(roll);
        console.log(app.roundScore);
        // Update round score if not a 1
        if ( roll !== 1 ) {
           // add the score 
             app.roundScore += roll;
             document.getElementById('current-'+ app.activePlayer).textContent = app.roundScore;
         } else {
             // Reset roundscore
            app.roundScore = 0;
            // Give score to the player
            document.getElementById(`current-${app.activePlayer}`).textContent = app.roundScore;
            // Remove marker
            document.querySelector(`.player-${app.activePlayer}-panel`).classList.remove('active');
            // Set next player
            app.activePlayer = (app.activePlayer == 0) ? 1 : 0;
            // Mark next player
            document.querySelector(`.player-${app.activePlayer}-panel`).classList.add('active');
          }
    }
    // Return public method
    return app;

}());

Game.init();
console.log(Game)