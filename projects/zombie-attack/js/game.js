 // Design Basic Game Solo Challenge

// This is a solo challenge

// Yet another zombie attack Javascript Game
// Your mission description: Save your city from zombies.
// Overall mission: Your city is under attack by Zombies and your mission is to kill them all. To play the game please visit:
// http://timurcatakli.github.io/projects/zombie-attack

// Goals: Kill as many zombies as possible
// Characters: Zombies & you as the Zombie Hunter
// Objects: zombies - fire ammo
// Functions: Simply enter a row letter and a column number (e.g. A0) and press FIRE. You have unlimited ammo and time. Also some tips for you. Zombies like to wander in groups of three. And the console if your best friend.

// Pseudocode
// USE MVC model to create Model, View, Controller Objects
// SET initial values
// 	Board Size - Number of Zombies - Zombie Group Length - Zombies Killed - Zombie Locations
// ARRANGE zombies on the board
// AVOID collusion
// CREATE Fire and isDead functions
// KEEP track of Fires as guesses
// DISPLAY Hit or Miss message for each fire
// DISPLAY success message when all zombies are dead.

// Initial Code

// function init() {
// 	var fireButton = document.getElementById("fireButton");
// 	fireButton.onclick = handleFireButton;
//  	var guessInput = document.getElementById("guessInput");
//  	guessInput.onkeypress = handleKeyPress;
//  	model.generateZombieLocations();
// }

// function handleKeyPress(e) {
// 	var fireButton = document.getElementById("fireButton");
// 	if (e.keyCode === 13) {
// 		fireButton.click();
// 		return false;
// 	}
// }

// function handleFireButton() {
// // code to get the value from the form
// var guessInput = document.getElementById("guessInput");
// var guess = (guessInput.value).toUpperCase();
// controller.processGuess(guess);
// guessInput.value = "";
// }

// window.onload = init;

// // start of controller object
// var controller = {
// 	guesses: 0,
	
// 	processGuess: function(guess){
// 		var location = this.parseGuess(guess);
// 		if (location) {
// 			this.guesses++;
// 			var hit = model.fire(location);
// 			if (hit && model.zombiesKilled === model.numZombies) {
// 				view.displayMessage("You killed all the zombies, in " + this.guesses + " hits");
// 			}
// 		}
// 	},

// 	parseGuess: function(guess) {
// 		var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
		
// 		if (guess === null || guess.length !== 2) {
// 			alert("Oops, please enter a letter and a number on the board."); }
// 		else {
			
// 			firstChar = guess.charAt(0);
// 			var row = alphabet.indexOf(firstChar);
// 			var column = guess.charAt(1);
			
// 			if (isNaN(column) || (isNaN(row))) {
// 				alert("Oops, that isn't on the board."); } 
// 			else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
// 				alert("Oops, that's off the board!"); }
// 			else {
// 				return row + column;
// 			}
// 		}
// 		return null;

// 	}
	
// };
// // end of controller object

// // start of view object
// var view = {

// 	displayMessage: function(msg) {
// 		var messageArea = document.getElementById("messageArea");
// 		messageArea.style.visibility = "visible";
// 		messageArea.innerHTML = msg;
// 	},

// 	displayHit: function(location) {
// 		var cell = document.getElementById(location);
// 		cell.setAttribute('class', 'hit');
// 	},
	
// 	displayMiss: function(location) {
// 		var cell = document.getElementById(location);
// 		cell.setAttribute('class', 'miss');		
// 	}

// };
// // end of view object

// // start of model object
// var model =  {
// 	boardSize: 7,
// 	numZombies: 3,
// 	zombieLength: 3,
// 	zombiesKilled: 0,
// 	zombies: [
// 		{ locations: [0,0,0], hits: ["", "", ""] },
// 		{ locations: [0,0,0], hits: ["", "", ""] },
// 		{ locations: [0,0,0], hits: ["", "", ""] }
// 	],

// 	fire: function(guess){
// 		for(var i=0; i < this.numZombies; i++) {			
// 			var zombie = this.zombies[i];
// 			var locations = zombie.locations;
// 			var index = locations.indexOf(guess);
// 			if (index >= 0) {
// 				zombie.hits[index] = "hit";
// 				console.log(zombie);
// 				view.displayHit(guess);
// 				view.displayMessage("It is a HIT!");
// 				console.log(this.isDead(zombie));
// 				if (this.isDead(zombie)) {
// 				 	view.displayMessage("You killed a group of ZOMBIES");
// 				 	this.zombiesKilled++;
// 				}
// 				return true;

// 			}
// 		};
// 		view.displayMessage("You MISSED!");
// 		view.displayMiss(guess);
// 		return false;
// 	},

// 	isDead: function(zombie) {
// 		for (var i = 0; i < this.zombieLength; i++) {
// 			if (zombie.hits[i] !== "hit") {
// 				return false;
// 			}
// 		};
// 		return true;
// 	},

// 	generateZombieLocations: function(){
// 		var locations;
// 		for (var i = 0; i < this.numZombies; i++) {
// 			do {
// 				locations = this.generateZombie();
// 			}
// 			while (this.collision(locations));
			
// 			this.zombies[i].locations = locations;
// 		}
// 	},

// 	generateZombie: function() {
// 		var direction = Math.floor(Math.random() * 2);
// 		var row, col;

// 		if (direction === 1) { // horizontal
// 			row = Math.floor(Math.random() * this.boardSize);
// 			col = Math.floor(Math.random() * (this.boardSize - this.zombieLength + 1));
// 		} else { // vertical
// 			row = Math.floor(Math.random() * (this.boardSize - this.zombieLength + 1));
// 			col = Math.floor(Math.random() * this.boardSize);
// 		}

// 		var newZombieLocations = [];
// 		for (var i = 0; i < this.zombieLength; i++) {
// 			if (direction === 1) {
// 				newZombieLocations.push(row + "" + (col + i));
// 			} else {
// 				newZombieLocations.push((row + i) + "" + col);
// 			}
// 		}
// 		console.log(newZombieLocations);
// 		return newZombieLocations;
// 	},


// 	collision: function(locations) {
// 		for (var i = 0; i < this.numZombies; i++) {
// 			var zombie = model.zombies[i];
// 			for (var j = 0; j < locations.length; j++) {
// 				if (zombie.locations.indexOf(locations[j]) >= 0) {
// 					return true;
// 				}
// 			}
// 		}
// 		return false;
// 	}



// };
// end of model object







// Refactored Code

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



// Reflection
//
// What was the most difficult part of this challenge?
// Hardest part of the project is to stick to MVP plan. You complete one feature and something else comes up to your mind and suddenly you have hundreds of lines of code which makes it very time consuming to refactor. Also I ended up writing lots more code in JS than compared to Ruby which made it hard to refactor.

// What did you learn about creating objects and functions that interact with one another?



// Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work?
// I liked creating and invoking event handlers (call backs) in order to reflect the code to the page. That was fun. I also gained experience in creating objects and keeping track of the commas for each property.

// How can you access and manipulate properties of objects?
//
//
//
//
//
//
//