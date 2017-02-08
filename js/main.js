/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// Helper vars and functions.
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	// From https://davidwalsh.name/javascript-debounce-function.
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	// Creates a sorted array of random numbers between minVal and maxVal with a length = size.
	function createRandIntOrderedArray(minVal, maxVal, size) {
		var arr = [];
		for(var i=0; i<size; ++i) {
			arr.push(anime.random(minVal, maxVal));
		}
		arr.sort(function(a, b){ return a-b });
		return arr;
	}
	// Checks if an object is empty.
	function isObjEmpty(obj) {
		return Object.getOwnPropertyNames(obj).length > 0;
	}
	// Concatenate JS objs.
	// From http://stackoverflow.com/a/2454315.
	function collect() {
		var ret = {};
		var len = arguments.length;
		for (var i=0; i<len; i++) {
			for (var p in arguments[i]) {
				if (arguments[i].hasOwnProperty(p)) {
					ret[p] = arguments[i][p];
				}
			}
		}
		return ret;
	}
	// Check if clip-path is supported. From http://stackoverflow.com/a/30041538.
	function areClipPathShapesSupported() {
		var base = 'clipPath',
			prefixes = [ 'webkit', 'moz', 'ms', 'o' ],
			properties = [ base ],
			testElement = document.createElement( 'testelement' ),
			attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

		// Push the prefixed properties into the array of properties.
		for ( var i = 0, l = prefixes.length; i < l; i++ ) {
			var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 ); // remember to capitalize!
			properties.push( prefixedProperty );
		}

		// Interate over the properties and see if they pass two tests.
		for ( var i = 0, l = properties.length; i < l; i++ ) {
			var property = properties[i];

			// First, they need to even support clip-path (IE <= 11 does not)...
			if ( testElement.style[property] === '' ) {

				// Second, we need to see what happens when we try to create a CSS shape...
				testElement.style[property] = attribute;
				if ( testElement.style[property] !== '' ) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Segmenter obj.
	 */
	function Segmenter(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		// Preload main image.
		var self = this;
		imagesLoaded(this.el, { background: true }, function() {
			self._init();
			self._initEvents();
			self.options.onReady();
		});
	}

	Segmenter.prototype.options = {
		// Number of pieces.
		pieces: 4, 
		// Show pieces already styled.
		renderOnLoad: false,
		// Add an element for the shadow.
		shadows: true,
		// Animations for the shadow (valid properties: opacity, translateX, translateY).
		shadowsAnimation: {
			opacity: 1,
			// translateX: 20,
			// translateY: 20
		},
		// Parrallax effect for the pieces.
		parallax: false,
		// Movements for the parallax effect.
		parallaxMovement: {min: 10, max: 40},
		// Animation for the pieces (valid properties: duration, easing, delay, opacity, translate[XYZ]).
		animation: {
			duration: 1500,
			easing: 'easeOutQuad',
			delay: 0, // Delay increment per piece.
			// opacity: 0.5,
			translateZ: {min: 10, max: 65}, // We can also use an integer for a specific value.
			// translateX: {min: -100, max: 100}, // We can also use an integer for a specific value.
			// translateY: {min: -100, max: 100} // We can also use an integer for a specific value.
		},
		// Callbacks
		onReady: function() { return false; },
		onAnimationComplete: function() { return false; },
		onAnimationStart: function() { return false; },
		// The positions of the pieces in percentage values. 
		// We can also use random values by setting options.positions to "random".
		positions: [
			{top: 80, left: 10, width: 30, height: 20},
			{top: 2, left: 2, width: 40, height: 40},
			{top: 30, left: 60, width: 30, height: 60},
			{top: 10, left: 20, width: 50, height: 60}
		]
	};

	/**
	 * Init!
	 */
	Segmenter.prototype._init = function() {
		// The dimensions of the main element.
		this.dimensions = {
			width: this.el.offsetWidth,
			height: this.el.offsetHeight
		};
		
		// The source of the main image.
		var background = this.el.style.backgroundImage;
		this.imgsrc = background.replace('url(','').replace(')','').replace(/\"/gi, "");;
		
		// Create the layout.
		this._layout();

		var self = this;
		this.pieces = [].slice.call(this.el.querySelectorAll('.segmenter__piece-wrap'));
		this.pieces.forEach(function(piece, pos) {
			// Bugfix for Chrome. The translateZ needs an initial value otherwise the animation will not work. (this seems to be a anime.js bug - let´s wait for the next version..)
			piece.style.WebkitTransform = piece.style.transform = 'translateZ(0.0001px)';

			// If we want to render the different pieces on load then:
			if( self.options.renderOnLoad ) {
				self._renderPiece(piece);
			}
		});
		// Flag to indicate the pieces are already rendered/styled either on load or after the animation.
		if( this.options.renderOnLoad ) {
			this.active = true;
		}
	};

	/**
	 * Creates the layout.
	 */
	Segmenter.prototype._layout = function() {
		// clip-path support
		var clipPath = areClipPathShapesSupported();

		var segBgEl = document.createElement('div');
		segBgEl.className = 'segmenter__background';
		segBgEl.style.backgroundImage = 'url(' + this.imgsrc + ')';

		var segPieces = document.createElement('div'),
			segPiecesHTML = '',
			positionsTotal = this.options.positions.length;

		segPieces.className = 'segmenter__pieces';

		for(var i = 0, len = this.options.pieces; i < len; ++i) {
			if( this.options.parallax ) {
				segPiecesHTML += '<div class="segmenter__piece-parallax">';
			}

			segPiecesHTML += '<div class="segmenter__piece-wrap">';
			
			var top, left, width, height, clipTop, clipLeft, clipRight, clipBottom,
				pos = i <= positionsTotal - 1 ? i : 0,
				isRandom = this.options.positions === 'random';

			top = isRandom ? anime.random(0,100) : this.options.positions[pos].top;
			left = isRandom ? anime.random(0,100) : this.options.positions[pos].left;
			width = isRandom ? anime.random(0,100) : this.options.positions[pos].width;
			height = isRandom ? anime.random(0,100) : this.options.positions[pos].height;
			
			if( !clipPath ) {
				clipTop = isRandom ? top/100 * this.dimensions.height : this.options.positions[pos].top/100 * this.dimensions.height;
				clipLeft = isRandom ? left/100 * this.dimensions.width : this.options.positions[pos].left/100 * this.dimensions.width;
				clipRight = isRandom ? width/100 * this.dimensions.width + clipLeft : this.options.positions[pos].width/100 * this.dimensions.width + clipLeft;
				clipBottom = isRandom ? height/100 * this.dimensions.height + clipTop : this.options.positions[pos].height/100 * this.dimensions.height + clipTop;
			}

			if( this.options.shadows ) {
				segPiecesHTML += '<div class="segmenter__shadow" style="top: ' + top + '%; left: ' + left + '%; width: ' + width + '%; height: ' + height + '%"></div>';		
			}

			segPiecesHTML += clipPath ?
							'<div class="segmenter__piece" style="background-image: url(' + this.imgsrc + '); -webkit-clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%); clip-path: polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%)"></div>' :
							'<div class="segmenter__piece" style="background-image: url(' + this.imgsrc + '); clip: rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)"></div>';

			segPiecesHTML += '</div>'
			if( this.options.parallax ) {
				segPiecesHTML += '</div>';
			}
		}

		segPieces.innerHTML = segPiecesHTML;

		this.el.innerHTML = '';
		this.el.appendChild(segBgEl);
		this.el.appendChild(segPieces);
	};

	/**
	 * Renders/Styles a piece with the options that are passed in the initialization.
	 */
	Segmenter.prototype._renderPiece = function(piece) {
		var idx = this.pieces.indexOf(piece);

		if( self.options.animation.translateZ != undefined ) {
			if( typeof self.options.animation.translateZ === 'object' ) {
				var randArr = createRandIntOrderedArray(self.options.animation.translateZ.min, self.options.animation.translateZ.max, self.options.pieces);
				piece.style.transform = piece.style.WebkitTransform = 'translateZ(' + randArr[idx] + 'px)';
			}
			else {
				piece.style.transform = piece.style.WebkitTransform = 'translateZ(' + self.options.animation.translateZ + 'px)';
			}
		}
		if( self.options.animation.translateY != undefined ) {
			if( typeof self.options.animation.translateY === 'object' ) {
				var randArr = createRandIntOrderedArray(self.options.animation.translateY.min, self.options.animation.translateY.max, self.options.pieces);
				piece.style.transform = piece.style.WebkitTransform = 'translateY(' + randArr[idx] + 'px)';
			}
			else {
				piece.style.transform = piece.style.WebkitTransform = 'translateY(' + self.options.animation.translateY + 'px)';
			}
		}
		if( self.options.animation.translateX != undefined ) {
			if( typeof self.options.animation.translateX === 'object' ) {
				var randArr = createRandIntOrderedArray(self.options.animation.translateX.min, self.options.animation.translateX.max, self.options.pieces);
				piece.style.transform = piece.style.WebkitTransform = 'translateX(' + randArr[idx] + 'px)';
			}
			else {
				piece.style.transform = piece.style.WebkitTransform = 'translateX(' + self.options.animation.translateX + 'px)';
			}
		}
		if( self.options.animation.opacity != undefined ) {
			piece.style.opacity = self.options.animation.opacity;
		}

		if( self.options.shadows && isObjEmpty(self.options.shadowsAnimation) ) {
			var shadowEl = piece.querySelector('.segmenter__shadow');
			shadowEl.style.opacity = self.options.shadowsAnimation.opacity != undefined ? self.options.shadowsAnimation.opacity : 0;
			shadowEl.style.transform = shadowEl.style.WebkitTransform = 'translateX(' + (self.options.shadowsAnimation.translateX != undefined ? self.options.shadowsAnimation.translateX : 0) + 'px) translateY(' + (self.options.shadowsAnimation.translateY != undefined ? self.options.shadowsAnimation.translateY : 0) + 'px)';
		}
	};

	/**
	 * Animates the pieces with the options passed (with anime.js).
	 */
	Segmenter.prototype.animate = function() {
		if( this.active ) {
			return false;
		}
		this.active = true;

		var self = this,
			animProps = {
				targets: this.pieces,
				duration: this.options.animation.duration,
				delay: function(el, index) { return (self.options.pieces - index - 1) * self.options.animation.delay; },
				easing: this.options.animation.easing,
				begin: this.options.onAnimationStart,
				complete: this.options.onAnimationComplete
			};
		
		if( this.options.animation.translateZ != undefined ) {
			var randArr = createRandIntOrderedArray(this.options.animation.translateZ.min, this.options.animation.translateZ.max, this.options.pieces);
			animProps.translateZ = typeof this.options.animation.translateZ === 'object' ? function(el, index) {
				return randArr[index];
			} : this.options.animation.translateZ;
		}
		if( this.options.animation.translateX != undefined ) {
			animProps.translateX = typeof this.options.animation.translateX === 'object' ? function(el, index) {
				return anime.random(self.options.animation.translateX.min, self.options.animation.translateX.max);
			} : this.options.animation.translateX;
		}
		if( this.options.animation.translateY != undefined ) {
			animProps.translateY = typeof this.options.animation.translateY === 'object' ? function(el, index) {
				return anime.random(self.options.animation.translateY.min, self.options.animation.translateY.max);
			} : this.options.animation.translateY;
		}
		if( this.options.animation.opacity != undefined ) {
			animProps.opacity = this.options.animation.opacity;
		}

		anime(animProps);

		// Also animate the shadow element.
		if( this.options.shadows && isObjEmpty(this.options.shadowsAnimation) ) {
			anime(collect({
				targets: this.el.querySelectorAll('.segmenter__shadow'),
				duration: this.options.animation.duration,
				delay: function(el, index) { return (self.options.pieces - index - 1) * self.options.animation.delay; },
				easing: this.options.animation.easing
			}, this.options.shadowsAnimation));
		}
	};

	/**
	 * Init/Bind events.
	 */
	Segmenter.prototype._initEvents = function() {
		var self = this;
		
		// Window resize.
		this.debounceResize = debounce(function(ev) {
			var positionsTotal = self.options.positions.length;

			// Recalculate dimensions.
			self.dimensions = {
				width: self.el.offsetWidth,
				height: self.el.offsetHeight
			};

			// Recalculate clip values..
			// todo: DRY
			// todo: If random is true then save the initial values. Should not recalculate for this case.
			self.pieces.forEach(function(piece, position) {
				var clipTop, clipLeft, clipRight, clipBottom,
					segmenterPiece = piece.querySelector('.segmenter__piece');

				if( self.options.positions === 'random' ) {
					var randT = anime.random(0,100), randL = anime.random(0,100), randW = anime.random(0,100), randH = anime.random(0,100);
					clipTop = randT/100 * self.dimensions.height;
					clipLeft = randL/100 * self.dimensions.width;
					clipRight = randW/100 * self.dimensions.width + clipLeft;
					clipBottom = randH/100 * self.dimensions.height + clipTop;
				}
				else {
					var pos = position <= positionsTotal - 1 ? position : 0;
					clipTop = self.options.positions[pos].top/100 * self.dimensions.height;
					clipLeft = self.options.positions[pos].left/100 * self.dimensions.width;
					clipRight = self.options.positions[pos].width/100 * self.dimensions.width + clipLeft;
					clipBottom = self.options.positions[pos].height/100 * self.dimensions.height + clipTop;
				}

				segmenterPiece.style.clip = 'rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)';
			});
		}, 10);
		window.addEventListener('resize', this.debounceResize);
		
		// Mousemove and Deviceorientation:
		if( this.options.parallax ) {
			var arrRand = createRandIntOrderedArray(this.options.parallaxMovement.min, this.options.parallaxMovement.max, this.options.pieces);
			this.pieces.forEach(function(piece, pos) {
				piece.setAttribute('data-parallax-translation', typeof self.options.parallaxMovement === 'object' ? arrRand[pos] : self.options.parallaxMovement );
			});
			this.mousemove = function(ev) {
				if( !self.active ) {
					return false;
				}
				requestAnimationFrame(function() {
					self.pieces.forEach(function(piece) {
						var t = piece.getAttribute('data-parallax-translation'),
							transX = t/(self.dimensions.width)*ev.clientX - t/2,
							transY = t/(self.dimensions.height)*ev.clientY - t/2;

						piece.parentNode.style.transform = piece.parentNode.style.WebkitTransform = 'translate3d(' + transX + 'px,' + transY + 'px,0)';
					});
				});
			};
			window.addEventListener('mousemove', this.mousemove);

			this.handleOrientation = function() {
				if( !self.active ) {
					return false;
				}
				var y = event.gamma;
				// To make computation easier we shift the range of x and y to [0,180]
				y += 90;
				
				requestAnimationFrame(function() {
					self.pieces.forEach(function(piece) {
						var t = piece.getAttribute('data-parallax-translation'),
							transX = t/(self.dimensions.width)*y - t/2,
							transY = t/(self.dimensions.height)*y - t/2;

						piece.parentNode.style.transform = piece.parentNode.style.WebkitTransform = 'translate3d(' + transX + 'px,' + transY + 'px,0)';
					});
				});
			}
			window.addEventListener('deviceorientation', this.handleOrientation);
		}
	};

	window.Segmenter = Segmenter;

})(window);

