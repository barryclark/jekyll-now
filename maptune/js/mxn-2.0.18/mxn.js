/*
MAPSTRACTION   v2.0.18   http://www.mapstraction.com

Copyright (c) 2012 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// Auto-load scripts
//
// specify which map providers to load by using
// <script src="mxn.js?(provider1,provider2,[module1,module2])" ...
// in your HTML
//
// for each provider mxn.provider.module.js and mxn.module.js will be loaded
// module 'core' is always loaded
//
// NOTE: if you call without providers
// <script src="mxn.js" ...
// no scripts will be loaded at all and it is then up to you to load the scripts independently
(function() {
	var providers = null;
	var modules = 'core';
	var scriptBase;
	var scripts = document.getElementsByTagName('script');

	// Determine which scripts we need to load	
	for (var i = 0; i < scripts.length; i++) {
		var match = scripts[i].src.replace(/%20/g , '').match(/^(.*?)mxn\.js(\?\(\[?(.*?)\]?\))?$/);
		if (match !== null) {
			scriptBase = match[1];
			if (match[3]) {
				var settings = match[3].split(',[');
				providers = settings[0].replace(']' , '');
				if (settings[1]) {
					modules += ',' + settings[1];
				}
			}
			break;
	   }
	}
	
	if (providers === null || providers == 'none') {
		return; // Bail out if no auto-load has been found
	}
	providers = providers.replace(/ /g, '').split(',');
	modules = modules.replace(/ /g, '').split(',');

	// Actually load the scripts
	var scriptTagStart = '<script type="text/javascript" src="' + scriptBase + 'mxn.';
	var scriptTagEnd = '.js"></script>';
	var scriptsAry = [];
	for (i = 0; i < modules.length; i++) {
		scriptsAry.push(scriptTagStart + modules[i] + scriptTagEnd);
		for (var j = 0; j < providers.length; j++) {
			scriptsAry.push(scriptTagStart + providers[j] + '.' + modules[i] + scriptTagEnd);
		}
	}
	document.write(scriptsAry.join(''));
})();

(function(){

// holds all our implementing functions
var apis = {};

// Our special private methods
/**
 * Calls the API specific implementation of a particular method.
 * Deferrable: If the API implmentation includes a deferable hash such as { getCenter: true, setCenter: true},
 * then the methods calls mentioned with in it will be queued until runDeferred is called.
 *   
 * @private
 */
var invoke = function(sApiId, sObjName, sFnName, oScope, args){
	if(!hasImplementation(sApiId, sObjName, sFnName)) {
		throw 'Method ' + sFnName + ' of object ' + sObjName + ' is not supported by API ' + sApiId + '. Are you missing a script tag?';
	}
	if(typeof(apis[sApiId][sObjName].deferrable) != 'undefined' && apis[sApiId][sObjName].deferrable[sFnName] === true) {
		mxn.deferUntilLoaded.call(oScope, function() {return apis[sApiId][sObjName][sFnName].apply(oScope, args);} );
	} 
	else {
		return apis[sApiId][sObjName][sFnName].apply(oScope, args);
	} 
};
	
/**
 * Determines whether the specified API provides an implementation for the 
 * specified object and function name.
 * @private
 */
var hasImplementation = function(sApiId, sObjName, sFnName){
	if(typeof(apis[sApiId]) == 'undefined') {
		throw 'API ' + sApiId + ' not loaded. Are you missing a script tag?';
	}
	if(typeof(apis[sApiId][sObjName]) == 'undefined') {
		throw 'Object definition ' + sObjName + ' in API ' + sApiId + ' not loaded. Are you missing a script tag?'; 
	}
	return typeof(apis[sApiId][sObjName][sFnName]) == 'function';
};

/**
 * @name mxn
 * @namespace
 */
var mxn = window.mxn = /** @lends mxn */ {
	
	/**
	 * Registers a set of provider specific implementation functions.
	 * @function
	 * @param {String} sApiId The API ID to register implementing functions for.
	 * @param {Object} oApiImpl An object containing the API implementation.
	 */
	register: function(sApiId, oApiImpl){
		if(!apis.hasOwnProperty(sApiId)){
			apis[sApiId] = {};
		}
		mxn.util.merge(apis[sApiId], oApiImpl);
	},		
	
	/**
	 * Adds a list of named proxy methods to the prototype of a 
	 * specified constructor function.
	 * @function
	 * @param {Function} func Constructor function to add methods to
	 * @param {Array} aryMethods Array of method names to create
	 * @param {Boolean} bWithApiArg Optional. Whether the proxy methods will use an API argument
	 */
	addProxyMethods: function(func, aryMethods, bWithApiArg){
		for(var i = 0; i < aryMethods.length; i++) {
			var sMethodName = aryMethods[i];
			if(bWithApiArg){
				func.prototype[sMethodName] = new Function('return this.invoker.go(\'' + sMethodName + '\', arguments, { overrideApi: true } );');
			}
			else {
				func.prototype[sMethodName] = new Function('return this.invoker.go(\'' + sMethodName + '\', arguments);');
			}
		}
	},
	
	checkLoad: function(funcDetails){
		if(this.loaded[this.api] === false) {
			var scope = this;
			this.onload[this.api].push( function() { funcDetails.callee.apply(scope, funcDetails); } );
			return true;
		}
		return false;
	},
	
	deferUntilLoaded: function(fnCall) {
		if(this.loaded[this.api] === false) {
			var scope = this;
			this.onload[this.api].push( fnCall );
		} else {
			fnCall.call(this);
		}
	},

	/**
	 * Bulk add some named events to an object.
	 * @function
	 * @param {Object} oEvtSrc The event source object.
	 * @param {String[]} aEvtNames Event names to add.
	 */
	addEvents: function(oEvtSrc, aEvtNames){
		for(var i = 0; i < aEvtNames.length; i++){
			var sEvtName = aEvtNames[i];
			if(sEvtName in oEvtSrc){
				throw 'Event or method ' + sEvtName + ' already declared.';
			}
			oEvtSrc[sEvtName] = new mxn.Event(sEvtName, oEvtSrc);
		}
	}
	
};

/**
 * Instantiates a new Event 
 * @constructor
 * @param {String} sEvtName The name of the event.
 * @param {Object} oEvtSource The source object of the event.
 */
mxn.Event = function(sEvtName, oEvtSource){
	var handlers = [];
	if(!sEvtName){
		throw 'Event name must be provided';
	}
	/**
	 * Add a handler to the Event.
	 * @param {Function} fn The handler function.
	 * @param {Object} ctx The context of the handler function.
	 */
	this.addHandler = function(fn, ctx){
		handlers.push({context: ctx, handler: fn});
	};
	/**
	 * Remove a handler from the Event.
	 * @param {Function} fn The handler function.
	 * @param {Object} ctx The context of the handler function.
	 */
	this.removeHandler = function(fn, ctx){
		for(var i = 0; i < handlers.length; i++){
			if(handlers[i].handler == fn && handlers[i].context == ctx){
				handlers.splice(i, 1);
			}
		}
	};
	/**
	 * Remove all handlers from the Event.
	 */
	this.removeAllHandlers = function(){
		handlers = [];
	};
	/**
	 * Fires the Event.
	 * @param {Object} oEvtArgs Event arguments object to be passed to the handlers.
	 */
	this.fire = function(oEvtArgs){
		var args = [sEvtName, oEvtSource, oEvtArgs];
		for(var i = 0; i < handlers.length; i++){
			handlers[i].handler.apply(handlers[i].context, args);
		}
	};
};

/**
 * Creates a new Invoker, a class which helps with on-the-fly 
 * invocation of the correct API methods.
 * @constructor
 * @param {Object} aobj The core object whose methods will make cals to go()
 * @param {String} asClassName The name of the Mapstraction class to be invoked, normally the same name as aobj's constructor function
 * @param {Function} afnApiIdGetter The function on object aobj which will return the active API ID
 */
mxn.Invoker = function(aobj, asClassName, afnApiIdGetter){
	var obj = aobj;
	var sClassName = asClassName;
	var fnApiIdGetter = afnApiIdGetter;
	var defOpts = { 
		overrideApi: false, // {Boolean} API ID is overridden by value in first argument
		context: null, // {Object} Local vars can be passed from the body of the method to the API method within this object
		fallback: null // {Function} If an API implementation doesn't exist this function is run instead
	};
	
	/**
	 * Invoke the API implementation of a specific method.
	 * @param {String} sMethodName The method name to invoke
	 * @param {Array} args Arguments to pass on
	 * @param {Object} oOptions Optional. Extra options for invocation
	 * @param {Boolean} oOptions.overrideApi When true the first argument is used as the API ID.
	 * @param {Object} oOptions.context A context object for passing extra information on to the provider implementation.
	 * @param {Function} oOptions.fallback A fallback function to run if the provider implementation is missing.
	 */
	this.go = function(sMethodName, args, oOptions){
		
		// make sure args is an array
		args = typeof(args) != 'undefined' ? Array.prototype.slice.apply(args) : [];
		
		if(typeof(oOptions) == 'undefined'){
			oOptions = defOpts;
		}
						
		var sApiId;
		if(oOptions.overrideApi){
			sApiId = args.shift();
		}
		else {
			sApiId = fnApiIdGetter.apply(obj);
		}
		
		if(typeof(sApiId) != 'string'){
			throw 'API ID not available.';
		}
		
		if(typeof(oOptions.context) != 'undefined' && oOptions.context !== null){
			args.push(oOptions.context);
		}
		
		if(typeof(oOptions.fallback) == 'function' && !hasImplementation(sApiId, sClassName, sMethodName)){
			// we've got no implementation but have got a fallback function
			return oOptions.fallback.apply(obj, args);
		}
		else {				
			return invoke(sApiId, sClassName, sMethodName, obj, args);
		}
		
	};
	
};

/**
 * @namespace
 */
mxn.util = {
			
	/**
	 * Merges properties of one object into another recursively.
	 * @param {Object} oRecv The object receiveing properties
	 * @param {Object} oGive The object donating properties
	 */
	merge: function(oRecv, oGive){
		for (var sPropName in oGive){
			if (oGive.hasOwnProperty(sPropName)) {
				if(!oRecv.hasOwnProperty(sPropName) || typeof(oRecv[sPropName]) !== 'object' || typeof(oGive[sPropName]) !== 'object'){
					oRecv[sPropName] = oGive[sPropName];
				}
				else {
					mxn.util.merge(oRecv[sPropName], oGive[sPropName]);
				}
			}
		}
	},
	
	/**
	 * $m, the dollar function, elegantising getElementById()
	 * @return An HTML element or array of HTML elements
	 */
	$m: function() {
		var elements = [];
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof(element) == 'string') {
				element = document.getElementById(element);
			}
			if (arguments.length == 1) {
				return element;
			}
			elements.push(element);
		}
		return elements;
	},

	/**
	 * loadScript is a JSON data fetcher
	 * @param {String} src URL to JSON file
	 * @param {Function} callback Callback function
	 */
	loadScript: function(src, callback) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		if (callback) {
			if(script.addEventListener){
				script.addEventListener('load', callback, true);
			}
			else if(script.attachEvent){
				var done = false;
				script.attachEvent("onreadystatechange",function(){
					if ( !done && document.readyState === "complete" ) {
						done = true;
						callback();
					}
				});
			}			
		}
		var h = document.getElementsByTagName('head')[0];
		h.appendChild( script );
		return;
	},

	/**
	 *
	 * @param {Object} point
	 * @param {Object} level
	 */
	convertLatLonXY_Yahoo: function(point, level) { //Mercator
		var size = 1 << (26 - level);
		var pixel_per_degree = size / 360.0;
		var pixel_per_radian = size / (2 * Math.PI);
		var origin = new YCoordPoint(size / 2 , size / 2);
		var answer = new YCoordPoint();
		answer.x = Math.floor(origin.x + point.lon * pixel_per_degree);
		var sin = Math.sin(point.lat * Math.PI / 180.0);
		answer.y = Math.floor(origin.y + 0.5 * Math.log((1 + sin) / (1 - sin)) * -pixel_per_radian);
		return answer;
	},

	/**
	 * Load a stylesheet from a remote file.
	 * @param {String} href URL to the CSS file
	 */
	loadStyle: function(href) {
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = href;
		document.getElementsByTagName('head')[0].appendChild(link);
		return;
	},

	/**
	 * getStyle provides cross-browser access to css
	 * @param {Object} el HTML Element
	 * @param {String} prop Style property name
	 */
	getStyle: function(el, prop) {
		var y;
		if (el.currentStyle) {
			y = el.currentStyle[prop];
		}
		else if (window.getComputedStyle) {
			y = window.getComputedStyle( el, '').getPropertyValue(prop);
		}
		return y;
	},

	/**
	 * Convert longitude to metres
	 * http://www.uwgb.edu/dutchs/UsefulData/UTMFormulas.HTM
	 * "A degree of longitude at the equator is 111.2km... For other latitudes,
	 * multiply by cos(lat)"
	 * assumes the earth is a sphere but good enough for our purposes
	 * @param {Float} lon
	 * @param {Float} lat
	 */
	lonToMetres: function(lon, lat) {
		return lon * (111200 * Math.cos(lat * (Math.PI / 180)));
	},

	/**
	 * Convert metres to longitude
	 * @param {Object} m
	 * @param {Object} lat
	 */
	metresToLon: function(m, lat) {
		return m / (111200 * Math.cos(lat * (Math.PI / 180)));
	},

	/**
	 * Convert kilometres to miles
	 * @param {Float} km
	 * @returns {Float} miles
	 */
	KMToMiles: function(km) {
		return km / 1.609344;
	},

	/**
	 * Convert miles to kilometres
	 * @param {Float} miles
	 * @returns {Float} km
	 */
	milesToKM: function(miles) {
		return miles * 1.609344;
	},

	// stuff to convert google zoom levels to/from degrees
	// assumes zoom 0 = 256 pixels = 360 degrees
	//		 zoom 1 = 256 pixels = 180 degrees
	// etc.

	/**
	 *
	 * @param {Object} pixels
	 * @param {Object} zoom
	 */
	getDegreesFromGoogleZoomLevel: function(pixels, zoom) {
		return (360 * pixels) / (Math.pow(2, zoom + 8));
	},

	/**
	 *
	 * @param {Object} pixels
	 * @param {Object} degrees
	 */
	getGoogleZoomLevelFromDegrees: function(pixels, degrees) {
		return mxn.util.logN((360 * pixels) / degrees, 2) - 8;
	},

	/**
	 *
	 * @param {Object} number
	 * @param {Object} base
	 */
	logN: function(number, base) {
		return Math.log(number) / Math.log(base);
	},
			
	/**
	 * Returns array of loaded provider apis
	 * @returns {Array} providers
	 */
	getAvailableProviders : function () {
		var providers = [];
		for (var propertyName in apis){
			if (apis.hasOwnProperty(propertyName)) {
				providers.push(propertyName);
			}
		}
		return providers;
	},
	
	/**
	 * Formats a string, inserting values of subsequent parameters at specified 
	 * locations. e.g. stringFormat('{0} {1}', 'hello', 'world');
	 */
	stringFormat: function(strIn){
		var replaceRegEx = /\{\d+\}/g;
		var args = Array.prototype.slice.apply(arguments);
		args.shift();
		return strIn.replace(replaceRegEx, function(strVal){
			var num = strVal.slice(1, -1);
			return args[num];
		});
	},
	
	/**
	 * Traverses an object graph using a series of map functions provided as arguments 
	 * 2 to n. Map functions are only called if the working object is not undefined/null.
	 * For usage see mxn.google.geocoder.js.
	 */
	traverse: function(start) {
		var args = Array.prototype.slice.apply(arguments);
		args.shift();
		var working = start;
		while(typeof(working) != 'undefined' && working !== null && args.length > 0){
			var op = args.shift();
			working = op(working);
		}
	}
};

/**
 * Class for converting between HTML and RGB integer color formats.
 * Accepts either a HTML color string argument or three integers for R, G and B.
 * @constructor
 */
mxn.util.Color = function() {
	if(arguments.length == 3) {
		this.red = arguments[0];
		this.green = arguments[1];
		this.blue = arguments[2];
	}
	else if(arguments.length == 1) {
		this.setHexColor(arguments[0]);
	}
};

mxn.util.Color.prototype.reHex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Set the color from the supplied HTML hex string.
 * @param {String} strHexColor A HTML hex color string e.g. '#00FF88'.
 */
mxn.util.Color.prototype.setHexColor = function(strHexColor) {
	var match = strHexColor.match(this.reHex);
	if(match) {
		// grab the code - strips off the preceding # if there is one
		strHexColor = match[1];
	}
	else {
		throw 'Invalid HEX color format, expected #000, 000, #000000 or 000000';
	}
	// if a three character hex code was provided, double up the values
	if(strHexColor.length == 3) {
		strHexColor = strHexColor.replace(/\w/g, function(str){return str.concat(str);});
	}
	this.red = parseInt(strHexColor.substr(0,2), 16);
	this.green = parseInt(strHexColor.substr(2,2), 16);
	this.blue = parseInt(strHexColor.substr(4,2), 16);
};

/**
 * Retrieve the color value as an HTML hex string.
 * @returns {String} Format '#00FF88'.
 */
mxn.util.Color.prototype.getHexColor = function() {
	var rgb = this.blue | (this.green << 8) | (this.red << 16);
	var hexString = rgb.toString(16).toUpperCase();
	if(hexString.length <  6){
		hexString = '0' + hexString;
	}
	return '#' + hexString;
};
	
})();
