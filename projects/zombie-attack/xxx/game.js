function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
 	var guessInput = document.getElementById("guessInput");
 	guessInput.onkeypress = handleKeyPress;
 	model.generateZombieLocations();
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}



function handleFireButton() {
// code to get the value from the form
var guessInput = document.getElementById("guessInput");
var guess = (guessInput.value).toUpperCase();
controller.processGuess(guess);
guessInput.value = "";
}

window.onload = init;

// start of controller object
var controller = {
	guesses: 0,
	
	processGuess: function(guess){
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.zombiesKilled === model.numZombies) {
				view.displayMessage("You killed all the zombies, in " + this.guesses + " hits");
			}
		}
	},

	parseGuess: function(guess) {
		var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
		
		if (guess === null || guess.length !== 2) {
			alert("Oops, please enter a letter and a number on the board."); }
		else {
			
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);
			
			if (isNaN(column) || (isNaN(row))) {
				alert("Oops, that isn't on the board."); } 
			else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
				alert("Oops, that's off the board!"); }
			else {
				return row + column;
			}
		}
		return null;

	}
	
};
// end of controller object

// start of view object
var view = {

	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.style.visibility = "visible";
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},
	
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');		
	}

};
// end of view object

// start of model object
var model =  {
	boardSize: 7,
	numZombies: 3,
	zombieLength: 3,
	zombiesKilled: 0,
	zombies: [
		{ locations: [0,0,0], hits: ["", "", ""] },
		{ locations: [0,0,0], hits: ["", "", ""] },
		{ locations: [0,0,0], hits: ["", "", ""] }
	],

	fire: function(guess){
		for(var i=0; i < this.numZombies; i++) {			
			var zombie = this.zombies[i];
			var locations = zombie.locations;
			var index = locations.indexOf(guess);
			if (index >= 0) {
				zombie.hits[index] = "hit";
				console.log(zombie);
				view.displayHit(guess);
				view.displayMessage("It is a HIT!");
				console.log(this.isDead(zombie));
				if (this.isDead(zombie)) {
				 	view.displayMessage("You killed a group of ZOMBIES");
				 	this.zombiesKilled++;
				}
				return true;

			}
		};
		view.displayMessage("You MISSED!");
		view.displayMiss(guess);
		return false;
	},

	isDead: function(zombie) {
		for (var i = 0; i < this.zombieLength; i++) {
			if (zombie.hits[i] !== "hit") {
				return false;
			}
		};
		return true;
	},

	generateZombieLocations: function(){
		var locations;
		for (var i = 0; i < this.numZombies; i++) {
			do {
				locations = this.generateZombie();
			}
			while (this.collision(locations));
			
			this.zombies[i].locations = locations;
		}
	},

	generateZombie: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.zombieLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.zombieLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newZombieLocations = [];
		for (var i = 0; i < this.zombieLength; i++) {
			if (direction === 1) {
				newZombieLocations.push(row + "" + (col + i));
			} else {
				newZombieLocations.push((row + i) + "" + col);
			}
		}
		console.log(newZombieLocations);
		return newZombieLocations;
	},


	collision: function(locations) {
		for (var i = 0; i < this.numZombies; i++) {
			var zombie = model.zombies[i];
			for (var j = 0; j < locations.length; j++) {
				if (zombie.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}



};
// end of model object
console.log(model.zombies);
//controller.processGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");