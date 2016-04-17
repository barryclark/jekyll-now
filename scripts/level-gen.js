(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class BlockListDecorator {
	constructor(config) {
		this.config_ = config;
	}

	decorate(blockTypeList) {
		let spriteTypeList = [];
		let sections = this.generateSections(blockTypeList);
		sections.forEach((section) => {
			spriteTypeList = spriteTypeList.concat(this.processSection(section));
		})
		return spriteTypeList;
	}

	generateSections(fullList) {
		let lastType = null;
		let currentSection = null;
		let sections = [];

		fullList.forEach((currentBlockType) => {
			if (currentBlockType !== lastType) {
				if (currentSection !== null) {
					sections.push(currentSection);
				}
				currentSection = [];
			}
			currentSection.push(currentBlockType);
			lastType = currentBlockType;
		});
		if (currentSection !== null) {
			sections.push(currentSection);
		}
		return sections;
	}

	processSection(section) {
		// - if empty section, return array of 0s
		// - build a sprite type section
		// - if length is 1, use single
		// - otherwise fill with continuous, adjust edges
		if (!section.length) {
			return [];
		}

		let sprites = [];
		let blockType = section[0];

		if (section.length == 1) {
			sprites[0] = this.config_.SPRITE_TYPES[blockType][4];
		} else {
			// Can't seem to use Array.fill in phantomjs
			for(let i = 0, l = section.length; i < l; i++) {
				if (i == 0) {
					sprites[i] = this.config_.SPRITE_TYPES[blockType][2];
				} else if (i == l - 1) {
					sprites[i] = this.config_.SPRITE_TYPES[blockType][3];
				} else {
					sprites[i] = this.config_.SPRITE_TYPES[blockType][1];
				}
			}
		}
		return sprites;
	}
}

module.exports = BlockListDecorator;
},{}],2:[function(require,module,exports){
class Generator {
	/**
	 * This class manages a transitioner object.
	 */
	constructor(size, transitioner) {
		this.steps_ = 0;
		this.size_ = size;
		this.transitioner_ = transitioner;
	}

	step() {
		if (this.steps_ < this.size_) {
			this.steps_++;
			return this.transitioner_.transition();
		}
	}

	getAll() {
		let values = [];
		while (this.steps_ < this.size_) {
			values.push(this.transitioner_.transition());
			this.steps_++;
		}
		return values;
	}

	reset(state) {
		this.transitioner_.setState(state);
		this.steps_ = 0;
	}
}

module.exports = Generator;
},{}],3:[function(require,module,exports){
class HorizontalListRenderer {
	constructor(spriteList, srcCanvasEl, destCtx, verticalPosition, blockWidth, blockHeight) {
		this.spriteList_ = spriteList;
		this.srcCanvasEl_ = srcCanvasEl;
		this.destCtx_ = destCtx;
		this.verticalPosition_ = verticalPosition;
		this.blockWidth_ = blockWidth;
		this.blockHeight_ = blockHeight;
	}

	render() {
		this.destCtx_.translate(0, this.verticalPosition_);
		let positionX = 0;
		this.spriteList_.forEach((spriteId) => {
			this.destCtx_.drawImage(
				this.srcCanvasEl_,
				spriteId * this.blockWidth_, 0,
				this.blockWidth_, this.blockHeight_, 
				positionX, 0,
				this.blockWidth_, this.blockHeight_
			);
			positionX += this.blockWidth_;
		});
	}
}

module.exports = HorizontalListRenderer;
},{}],4:[function(require,module,exports){
let BlockListDecorator = require('./block-list-decorator');
let Generator = require('./generator');
let HorizontalListRenderer = require('./horizontal-list-renderer');
let Transitioner = require('./transitioner');
let WorldConfig = require('./world-config');

let parentEl = document.getElementById("level-gen-container") || document.body;
let imgEl = document.createElement("img");
imgEl.addEventListener("load", () => {
	const BLOCK_WIDTH = 32;
	const BLOCK_HEIGHT = 32;
	const BLOCK_COUNT_H = Math.ceil(parentEl.clientWidth / BLOCK_WIDTH);
	const BLOCK_COUNT_V = 3;
	const VERTICAL_POSITION = (BLOCK_COUNT_V - 1) * BLOCK_HEIGHT;

	let initialState = WorldConfig.BLOCK_TYPES.PLATFORM;
	let transitioner = new Transitioner(
		WorldConfig.TRANSITIONS,
		initialState
	);
	let generator = new Generator(BLOCK_COUNT_H, transitioner);
	let blockTypeList = generator.getAll();

	let decorator = new BlockListDecorator(WorldConfig);
	let spriteTypeList = decorator.decorate(blockTypeList);

	let spriteCanvasEl = document.createElement("canvas");
	spriteCanvasEl.width = imgEl.width;
	spriteCanvasEl.height = imgEl.height;
	let spriteCtx = spriteCanvasEl.getContext("2d");
	spriteCtx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);

	let renderCanvasEl = document.createElement("canvas");
	renderCanvasEl.width = BLOCK_WIDTH * BLOCK_COUNT_H;
	renderCanvasEl.height = BLOCK_HEIGHT * BLOCK_COUNT_V;
	let renderCtx = renderCanvasEl.getContext("2d");
	renderCtx.fillStyle = "#2c7bff";
	renderCtx.fillRect(0, 0, renderCanvasEl.width, renderCanvasEl.height);
	parentEl.appendChild(renderCanvasEl);

	let horizontalListRenderer = new HorizontalListRenderer(
		spriteTypeList, spriteCanvasEl, renderCtx, VERTICAL_POSITION,
		BLOCK_WIDTH, BLOCK_HEIGHT);
	horizontalListRenderer.render();
})
imgEl.src = parentEl.getAttribute("data-level-gen-sprite");





// TODO: break up a canvas element into the right amount of blocks
// pull up a sprite sheet, and render accordingly.

// TODO: remove the different types of grass from the block type list
// and start making distinctions later in a second pass, so we can
// vary the types of things we render.
},{"./block-list-decorator":1,"./generator":2,"./horizontal-list-renderer":3,"./transitioner":5,"./world-config":6}],5:[function(require,module,exports){
class Transitioner {
	/**
	 * This object handles transitions through Markov chains defined in its
	 * constructor arguments.
	 */
	constructor(transitions, initialState, randomObj) {
		this.transitions_ = transitions;
		this.currentState_ = initialState;
		this.randomObj_ = randomObj || Math;
	}

	transition() {
		let possibleTransitions = this.transitions_[this.currentState_];
		let randomValue = this.randomObj_.random();

		let lowerLimit = 0;
		let highLimit = 0;

		for(let destination in possibleTransitions) {
			let width = possibleTransitions[destination];
			lowerLimit = highLimit;
			highLimit = highLimit + width;

			if (lowerLimit <= randomValue && randomValue < highLimit) {
				this.currentState_ = destination;
				return parseInt(destination, 10);
			}
		}
		throw Error("Did not return any value");
	}

	setState(state) {
		this.currentState_ = state;
	}
}

module.exports = Transitioner;
},{}],6:[function(require,module,exports){
// How blocks behave.
let blockTypes = {
	EMPTY: 0,
	PLATFORM: 1,
	PIPE: 2,
	DANGER: 3
};

let positionTypes = {
	EMPTY: 0,
	CONTINUOUS: 1,
	LEFT_EDGE: 2,
	RIGHT_EDGE: 3,
	SINGLE: 4
};

let spriteTypes = {
	// EMPTY
	0: {
		// CONTINUOUS
		1: 0,
		// LEFT_EDGE
		2: 0,
		// RIGHT_EDGE
		3: 0,
		// SINGLE
		4: 0		
	},
	// PLATFORM
	1: {
		// CONTINUOUS
		1: 1,
		// LEFT_EDGE
		2: 2,
		// RIGHT_EDGE
		3: 3,
		// SINGLE
		4: 4
	},
	// PIPE
	2: {
		// CONTINUOUS
		1: 5,
		// LEFT_EDGE
		2: 5,
		// RIGHT_EDGE
		3: 5,
		// SINGLE
		4: 5
	},
	// DANGER
	3: {
		// CONTINUOUS
		1: 6,
		// LEFT_EDGE
		2: 6,
		// RIGHT_EDGE
		3: 6,
		// SINGLE
		4: 6
	}
};

// Markov chain definitions.
let transitions = {
	// EMPTY
	0: {
		// EMPTY
		0: .1,
		// PLATFORM
		1: .9
	},
	1: {
		// EMPTY
		0: .15,
		// PLATFORM
		1: .65,
		// PIPE
		2: .1,
		// DANGER
		3: .1
	},
	// PIPE
	2: {
		// PIPE 
		1: .6,
		// DANGER
		3: .4
	},
	// DANGER
	3: {
		// PLATFORM
		1: .8,
		// DANGER
		3: .2
	}
};

module.exports = {
	BLOCK_TYPES: blockTypes,
	POSITION_TYPES: positionTypes,
	SPRITE_TYPES : spriteTypes,
	TRANSITIONS: transitions
};
},{}]},{},[4]);
