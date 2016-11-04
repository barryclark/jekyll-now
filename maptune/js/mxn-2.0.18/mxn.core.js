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
(function(){

/**
 * @exports mxn.util.$m as $m
 */
var $m = mxn.util.$m;

/**
 * Initialise our provider. This function should only be called 
 * from within mapstraction code, not exposed as part of the API.
 * @private
 */
var init = function() {
	this.invoker.go('init', [ this.currentElement, this.api ]);
	this.applyOptions();
};

/**
 * Mapstraction instantiates a map with some API choice into the HTML element given
 * @name mxn.Mapstraction
 * @constructor
 * @param {String} element The HTML element to replace with a map
 * @param {String} api The API to use, one of 'google', 'googlev3', 'yahoo', 'microsoft', 'openstreetmap', 'multimap', 'map24', 'openlayers', 'mapquest'. If omitted, first loaded provider implementation is used.
 * @param {Bool} debug optional parameter to turn on debug support - this uses alert panels for unsupported actions
 * @exports Mapstraction as mxn.Mapstraction
 */
var Mapstraction = mxn.Mapstraction = function(element, api, debug) {
	if (!api){
		api = mxn.util.getAvailableProviders()[0];
	}
	
	/**
	 * The name of the active API.
	 * @name mxn.Mapstraction#api
	 * @type {String}
	 */
	this.api = api;
		
	this.maps = {};
	
	/**
	 * The DOM element containing the map.
	 * @name mxn.Mapstraction#currentElement
	 * @property
	 * @type {DOMElement}
	 */
	this.currentElement = $m(element);
	
	this.eventListeners = [];
	
	/**
	 * The array of all layers that have been added to the map.
	 */
	this.tileLayers = [];	
		
	/**
	 * The markers currently loaded.
	 * @name mxn.Mapstraction#markers
	 * @property
	 * @type {Array}
	 */
	this.markers = [];
		
	/**
	 * The polylines currently loaded.
	 * @name mxn.Mapstraction#polylines
	 * @property
	 * @type {Array}
	 */
	this.polylines = [];
	
	this.images = [];
	this.controls = [];	
	this.loaded = {};
	this.onload = {};
    //this.loaded[api] = true; // FIXME does this need to be true? -ajturner
	this.onload[api] = [];
	
	/**
	 * The original element value passed to the constructor.
	 * @name mxn.Mapstraction#element
	 * @property
	 * @type {String|DOMElement}
	 */
	this.element = element;
	
	/**
	 * Options defaults.
	 * @name mxn.Mapstraction#options
	 * @property {Object}
	 */
	this.options = {
		enableScrollWheelZoom: true,
		enableDragging: true
	};
	
	this.addControlsArgs = {};
	
	// set up our invoker for calling API methods
	this.invoker = new mxn.Invoker(this, 'Mapstraction', function(){ return this.api; });
	
	// Adding our events
	mxn.addEvents(this, [
		
		/**
		 * Map has loaded
		 * @name mxn.Mapstraction#load
		 * @event
		 */
		'load',
		
		/**
		 * Map is clicked {location: LatLonPoint}
		 * @name mxn.Mapstraction#click
		 * @event
		 */
		'click',
		
		/**
		 * Map is panned
		 * @name mxn.Mapstraction#endPan
		 * @event
		 */
		'endPan',
		
		/**
		 * Zoom is changed
		 * @name mxn.Mapstraction#changeZoom
		 * @event
		 */
		'changeZoom',
		
		/**
		 * Marker is added {marker: Marker}
		 * @name mxn.Mapstraction#markerAdded
		 * @event
		 */
		'markerAdded',
		
		/**
		 * Marker is removed {marker: Marker}
		 * @name mxn.Mapstraction#markerRemoved
		 * @event
		 */
		'markerRemoved',
		
		/**
		 * Polyline is added {polyline: Polyline}
		 * @name mxn.Mapstraction#polylineAdded
		 * @event
		 */
		'polylineAdded',
		
		/**
		 * Polyline is removed {polyline: Polyline}
		 * @name mxn.Mapstraction#polylineRemoved
		 * @event
		 */
		'polylineRemoved'
	]);
	
	// finally initialize our proper API map
	init.apply(this);
};

// Map type constants
Mapstraction.ROAD = 1;
Mapstraction.SATELLITE = 2;
Mapstraction.HYBRID = 3;
Mapstraction.PHYSICAL = 4;

// methods that have no implementation in mapstraction core
mxn.addProxyMethods(Mapstraction, [ 
	/**
	 * Adds a large map panning control and zoom buttons to the map
	 * @name mxn.Mapstraction#addLargeControls
	 * @function
	 */
	'addLargeControls',
		
	/**
	 * Adds a map type control to the map (streets, aerial imagery etc)
	 * @name mxn.Mapstraction#addMapTypeControls
	 * @function
	 */
	'addMapTypeControls', 
	
	/**
	 * Adds a GeoRSS or KML overlay to the map
	 *  some flavors of GeoRSS and KML are not supported by some of the Map providers
	 * @name mxn.Mapstraction#addOverlay
	 * @function
	 * @param {String} url GeoRSS or KML feed URL
	 * @param {Boolean} autoCenterAndZoom Set true to auto center and zoom after the feed is loaded
	 */
	'addOverlay', 
	
	/**
	 * Adds a small map panning control and zoom buttons to the map
	 * @name mxn.Mapstraction#addSmallControls
	 * @function
	 */
	'addSmallControls', 
	
	/**
	 * Applies the current option settings
	 * @name mxn.Mapstraction#applyOptions
	 * @function
	 */
	'applyOptions',
	
	/**
	 * Gets the BoundingBox of the map
	 * @name mxn.Mapstraction#getBounds
	 * @function
	 * @returns {BoundingBox} The bounding box for the current map state
	 */
	'getBounds', 
	
	/**
	 * Gets the central point of the map
	 * @name mxn.Mapstraction#getCenter
	 * @function
	 * @returns {LatLonPoint} The center point of the map
	 */
	'getCenter', 
	
	/**
	 * Gets the imagery type for the map.
	 * The type can be one of:
	 *  mxn.Mapstraction.ROAD
	 *  mxn.Mapstraction.SATELLITE
	 *  mxn.Mapstraction.HYBRID
	 *  mxn.Mapstraction.PHYSICAL
	 * @name mxn.Mapstraction#getMapType
	 * @function
	 * @returns {Number} 
	 */
	'getMapType', 

	/**
	 * Returns a ratio to turn distance into pixels based on current projection
	 * @name mxn.Mapstraction#getPixelRatio
	 * @function
	 * @returns {Float} ratio
	 */
	'getPixelRatio', 
	
	/**
	 * Returns the zoom level of the map
	 * @name mxn.Mapstraction#getZoom
	 * @function
	 * @returns {Integer} The zoom level of the map
	 */
	'getZoom', 
	
	/**
	 * Returns the best zoom level for bounds given
	 * @name mxn.Mapstraction#getZoomLevelForBoundingBox
	 * @function
	 * @param {BoundingBox} bbox The bounds to fit
	 * @returns {Integer} The closest zoom level that contains the bounding box
	 */
	'getZoomLevelForBoundingBox', 
	
	/**
	 * Displays the coordinates of the cursor in the HTML element
	 * @name mxn.Mapstraction#mousePosition
	 * @function
	 * @param {String} element ID of the HTML element to display the coordinates in
	 */
	'mousePosition',
	
	/**
	 * Resize the current map to the specified width and height
	 * (since it is actually on a child div of the mapElement passed
	 * as argument to the Mapstraction constructor, the resizing of this
	 * mapElement may have no effect on the size of the actual map)
	 * @name mxn.Mapstraction#resizeTo
	 * @function
	 * @param {Integer} width The width the map should be.
	 * @param {Integer} height The width the map should be.
	 */
	'resizeTo', 
	
	/**
	 * Sets the map to the appropriate location and zoom for a given BoundingBox
	 * @name mxn.Mapstraction#setBounds
	 * @function
	 * @param {BoundingBox} bounds The bounding box you want the map to show
	 */
	'setBounds', 
	
	/**
	 * setCenter sets the central point of the map
	 * @name mxn.Mapstraction#setCenter
	 * @function
	 * @param {LatLonPoint} point The point at which to center the map
	 * @param {Object} options Optional parameters
	 * @param {Boolean} options.pan Whether the map should move to the locations using a pan or just jump straight there
	 */
	'setCenter', 
	
	/**
	 * Centers the map to some place and zoom level
	 * @name mxn.Mapstraction#setCenterAndZoom
	 * @function
	 * @param {LatLonPoint} point Where the center of the map should be
	 * @param {Integer} zoom The zoom level where 0 is all the way out.
	 */
	'setCenterAndZoom', 
	
	/**
	 * Sets the imagery type for the map
	 * The type can be one of:
	 *  mxn.Mapstraction.ROAD
	 *  mxn.Mapstraction.SATELLITE
	 *  mxn.Mapstraction.HYBRID
	 *  mxn.Mapstraction.PHYSICAL
	 * @name mxn.Mapstraction#setMapType
	 * @function
	 * @param {Number} type 
	 */
	'setMapType', 
	
	/**
	 * Sets the zoom level for the map
	 * MS doesn't seem to do zoom=0, and Gg's sat goes closer than it's maps, and MS's sat goes closer than Y!'s
	 * TODO: Mapstraction.prototype.getZoomLevels or something.
	 * @name mxn.Mapstraction#setZoom
	 * @function
	 * @param {Number} zoom The (native to the map) level zoom the map to.
	 */
	'setZoom',
	
	/**
	 * Turns a Tile Layer on or off
	 * @name mxn.Mapstraction#toggleTileLayer
	 * @function
	 * @param {tile_url} url of the tile layer that was created.
	 */
	'toggleTileLayer',

	'openBubble',
	'closeBubble'
		
]);

/**
 * Sets the current options to those specified in oOpts and applies them
 * @param {Object} oOpts Hash of options to set
 */
Mapstraction.prototype.setOptions = function(oOpts){
	mxn.util.merge(this.options, oOpts);
	this.applyOptions();
};

/**
 * Sets an option and applies it.
 * @param {String} sOptName Option name
 * @param vVal Option value
 */
Mapstraction.prototype.setOption = function(sOptName, vVal){
	this.options[sOptName] = vVal;
	this.applyOptions();
};

/**
 * Enable scroll wheel zooming
 * @deprecated Use setOption instead.
 */
Mapstraction.prototype.enableScrollWheelZoom = function() {
	this.setOption('enableScrollWheelZoom', true);
};

/**
 * Enable/disable dragging of the map
 * @param {Boolean} on
 * @deprecated Use setOption instead.
 */
Mapstraction.prototype.dragging = function(on) {
	this.setOption('enableDragging', on);
};

/**
 * Change the current api on the fly
 * @param {String} api The API to swap to
 * @param element
 */
Mapstraction.prototype.swap = function(element,api) {
	if (this.api === api) {
		return;
	}

	var center = this.getCenter();
	var zoom = this.getZoom();

	this.currentElement.style.visibility = 'hidden';
	this.currentElement.style.display = 'none';

	this.currentElement = $m(element);
	this.currentElement.style.visibility = 'visible';
	this.currentElement.style.display = 'block';

	this.api = api;
	this.onload[api] = [];
	
	if (this.maps[this.api] === undefined) {	
		init.apply(this);

		for (var i = 0; i < this.markers.length; i++) {
			this.addMarker(this.markers[i], true);
		}

		for (var j = 0; j < this.polylines.length; j++) {
			this.addPolyline( this.polylines[j], true);
		}

		this.setCenterAndZoom(center,zoom);		
	}
	else {

		//sync the view
		this.setCenterAndZoom(center,zoom);

		//TODO synchronize the markers and polylines too
		// (any overlays created after api instantiation are not sync'd)
	}

	this.addControls(this.addControlsArgs);

};

/**
 * Returns the loaded state of a Map Provider
 * @param {String} api Optional API to query for. If not specified, returns state of the originally created API
 */
Mapstraction.prototype.isLoaded = function(api){
	if (api === null) {
		api = this.api;
	}
	return this.loaded[api];
};

/**
 * Set the debugging on or off - shows alert panels for functions that don't exist in Mapstraction
 * @param {Boolean} debug true to turn on debugging, false to turn it off
 */
Mapstraction.prototype.setDebug = function(debug){
	if(debug !== null) {
		this.debug = debug;
	}
	return this.debug;
};

/**
 * Set the api call deferment on or off - When it's on, mxn.invoke will queue up provider API calls until
 * runDeferred is called, at which time everything in the queue will be run in the order it was added. 
 * @param {Boolean} set deferred to true to turn on deferment
 */
Mapstraction.prototype.setDefer = function(deferred){
	this.loaded[this.api] = !deferred;
};

/**
 * Run any queued provider API calls for the methods defined in the provider's implementation.
 * For example, if defferable in mxn.[provider].core.js is set to {getCenter: true, setCenter: true}
 * then any calls to map.setCenter or map.getCenter will be queued up in this.onload. When the provider's
 * implementation loads the map, it calls this.runDeferred and any queued calls will be run.
 */
Mapstraction.prototype.runDeferred = function(){
	while(this.onload[this.api].length > 0) {  
		this.onload[this.api].shift().apply(this); //run deferred calls
	}
};

/////////////////////////
//
// Event Handling
//
// FIXME need to consolidate some of these handlers...
//
///////////////////////////

// Click handler attached to native API
Mapstraction.prototype.clickHandler = function(lat, lon, me) {
	this.callEventListeners('click', {
		location: new LatLonPoint(lat, lon)
	});
};

// Move and zoom handler attached to native API
Mapstraction.prototype.moveendHandler = function(me) {
	this.callEventListeners('moveend', {});
};

/**
 * Add a listener for an event.
 * @param {String} type Event type to attach listener to
 * @param {Function} func Callback function
 * @param {Object} caller Callback object
 */
Mapstraction.prototype.addEventListener = function() {
	var listener = {};
	listener.event_type = arguments[0];
	listener.callback_function = arguments[1];

	// added the calling object so we can retain scope of callback function
	if(arguments.length == 3) {
		listener.back_compat_mode = false;
		listener.callback_object = arguments[2];
	}
	else {
		listener.back_compat_mode = true;
		listener.callback_object = null;
	}
	this.eventListeners.push(listener);
};

/**
 * Call listeners for a particular event.
 * @param {String} sEventType Call listeners of this event type
 * @param {Object} oEventArgs Event args object to pass back to the callback
 */
Mapstraction.prototype.callEventListeners = function(sEventType, oEventArgs) {
	oEventArgs.source = this;
	for(var i = 0; i < this.eventListeners.length; i++) {
		var evLi = this.eventListeners[i];
		if(evLi.event_type == sEventType) {
			// only two cases for this, click and move
			if(evLi.back_compat_mode) {
				if(evLi.event_type == 'click') {
					evLi.callback_function(oEventArgs.location);
				}
				else {
					evLi.callback_function();
				}
			}
			else {
				var scope = evLi.callback_object || this;
				evLi.callback_function.call(scope, oEventArgs);
			}
		}
	}
};


////////////////////
//
// map manipulation
//
/////////////////////


/**
 * addControls adds controls to the map. You specify which controls to add in
 * the associative array that is the only argument.
 * addControls can be called multiple time, with different args, to dynamically change controls.
 *
 * args = {
 *	 pan:	  true,
 *	 zoom:	 'large' || 'small',
 *	 overview: true,
 *	 scale:	true,
 *	 map_type: true,
 * }
 * @param {array} args Which controls to switch on
 */
Mapstraction.prototype.addControls = function( args ) {
	this.addControlsArgs = args;
	this.invoker.go('addControls', arguments);
};

/**
 * Adds a marker pin to the map
 * @param {Marker} marker The marker to add
 * @param {Boolean} old If true, doesn't add this marker to the markers array. Used by the "swap" method
 */
Mapstraction.prototype.addMarker = function(marker, old) {
	marker.mapstraction = this;
	marker.api = this.api;
	marker.location.api = this.api;
	marker.map = this.maps[this.api]; 
	var propMarker = this.invoker.go('addMarker', arguments);
	marker.setChild(propMarker);
	if (!old) {
		this.markers.push(marker);
	}
	this.markerAdded.fire({'marker': marker});
};

/**
 * addMarkerWithData will addData to the marker, then add it to the map
 * @param {Marker} marker The marker to add
 * @param {Object} data A data has to add
 */
Mapstraction.prototype.addMarkerWithData = function(marker, data) {
	marker.addData(data);
	this.addMarker(marker);
};

/**
 * addPolylineWithData will addData to the polyline, then add it to the map
 * @param {Polyline} polyline The polyline to add
 * @param {Object} data A data has to add
 */
Mapstraction.prototype.addPolylineWithData = function(polyline, data) {
	polyline.addData(data);
	this.addPolyline(polyline);
};

/**
 * removeMarker removes a Marker from the map
 * @param {Marker} marker The marker to remove
 */
Mapstraction.prototype.removeMarker = function(marker) {	
	var current_marker;
	for(var i = 0; i < this.markers.length; i++){
		current_marker = this.markers[i];
		if(marker == current_marker) {
			this.invoker.go('removeMarker', arguments);
			marker.onmap = false;
			this.markers.splice(i, 1);
			this.markerRemoved.fire({'marker': marker});
			break;
		}
	}
};

/**
 * removeAllMarkers removes all the Markers on a map
 */
Mapstraction.prototype.removeAllMarkers = function() {
	var current_marker;
	while(this.markers.length > 0) {
		current_marker = this.markers.pop();
		this.invoker.go('removeMarker', [current_marker]);
	}
};

/**
 * Declutter the markers on the map, group together overlapping markers.
 * @param {Object} opts Declutter options
 */
Mapstraction.prototype.declutterMarkers = function(opts) {
	if(this.loaded[this.api] === false) {
		var me = this;
		this.onload[this.api].push( function() {
			me.declutterMarkers(opts);
		} );
		return;
	}

	var map = this.maps[this.api];

	switch(this.api)
	{
		//	case 'yahoo':
		//
		//	  break;
		//	case 'google':
		//
		//	  break;
		//	case 'openstreetmap':
		//
		//	  break;
		//	case 'microsoft':
		//
		//	  break;
		//	case 'openlayers':
		//
		//	  break;
		case 'multimap':
			/*
			 * Multimap supports quite a lot of decluttering options such as whether
			 * to use an accurate of fast declutter algorithm and what icon to use to
			 * represent a cluster. Using all this would mean abstracting all the enums
			 * etc so we're only implementing the group name function at the moment.
			 */
			map.declutterGroup(opts.groupName);
			break;
		//	case 'mapquest':
		//
		//	  break;
		//	case 'map24':
		//
		//	  break;
		case '  dummy':
			break;
		default:
			if(this.debug) {
				alert(this.api + ' not supported by Mapstraction.declutterMarkers');
			}
	}
};

/**
 * Add a polyline to the map
 * @param {Polyline} polyline The Polyline to add to the map
 * @param {Boolean} old If true replaces an existing Polyline
 */
Mapstraction.prototype.addPolyline = function(polyline, old) {
	polyline.api = this.api;
	polyline.map = this.maps[this.api];
	var propPoly = this.invoker.go('addPolyline', arguments);
	polyline.setChild(propPoly);
	if(!old) {
		this.polylines.push(polyline);
	}
	this.polylineAdded.fire({'polyline': polyline});
};

// Private remove implementation
var removePolylineImpl = function(polyline) {
	this.invoker.go('removePolyline', arguments);
	polyline.onmap = false;
	this.polylineRemoved.fire({'polyline': polyline});
};

/**
 * Remove the polyline from the map
 * @param {Polyline} polyline The Polyline to remove from the map
 */
Mapstraction.prototype.removePolyline = function(polyline) {
	var current_polyline;
	for(var i = 0; i < this.polylines.length; i++){
		current_polyline = this.polylines[i];
		if(polyline == current_polyline) {
			this.polylines.splice(i, 1);
			removePolylineImpl.call(this, polyline);
			break;
		}
	}
};

/**
 * Removes all polylines from the map
 */
Mapstraction.prototype.removeAllPolylines = function() {
	var current_polyline;
	while(this.polylines.length > 0) {
		current_polyline = this.polylines.pop();
		removePolylineImpl.call(this, current_polyline);
	}
};

var collectPoints = function(bMarkers, bPolylines, predicate) {
	var points = [];
	
	if (bMarkers) {	
		for (var i = 0; i < this.markers.length; i++) {
			var mark = this.markers[i];
			if (!predicate || predicate(mark)) {
				points.push(mark.location);
			}
		}
	}
	
	if (bPolylines) {
		for(i = 0; i < this.polylines.length; i++) {
			var poly = this.polylines[i];
			if (!predicate || predicate(poly)) {
				for (var j = 0; j < poly.points.length; j++) {
					points.push(poly.points[j]);
				}
			}
		}
	}
	
	return points;
};

/**
 * Sets the center and zoom of the map to the smallest bounding box
 * containing all markers and polylines
 */
Mapstraction.prototype.autoCenterAndZoom = function() {
	var points = collectPoints.call(this, true, true);
	
	this.centerAndZoomOnPoints(points);
};

/**
 * centerAndZoomOnPoints sets the center and zoom of the map from an array of points
 *
 * This is useful if you don't want to have to add markers to the map
 */
Mapstraction.prototype.centerAndZoomOnPoints = function(points) {
	var bounds = new BoundingBox(90, 180, -90, -180);

	for (var i = 0, len = points.length; i < len; i++) {
		bounds.extend(points[i]);
	}

	this.setBounds(bounds);
};

/**
 * Sets the center and zoom of the map to the smallest bounding box
 * containing all visible markers and polylines
 * will only include markers and polylines with an attribute of "visible"
 */
Mapstraction.prototype.visibleCenterAndZoom = function() {
	var predicate = function(obj) {
		return obj.getAttribute("visible");
	};
	var points = collectPoints.call(this, true, true, predicate);
	
	this.centerAndZoomOnPoints(points);
};

/**
 * Automatically sets center and zoom level to show all polylines
 * @param {Number} padding Optional number of kilometers to pad around polyline
 */
Mapstraction.prototype.polylineCenterAndZoom = function(padding) {
	padding = padding || 0;
	
	var points = collectPoints.call(this, false, true);
	
	if (padding > 0) {
		var padPoints = [];
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			
			var kmInOneDegreeLat = point.latConv();
			var kmInOneDegreeLon = point.lonConv();
			
			var latPad = padding / kmInOneDegreeLat;
			var lonPad = padding / kmInOneDegreeLon;

			var ne = new LatLonPoint(point.lat + latPad, point.lon + lonPad);
			var sw = new LatLonPoint(point.lat - latPad, point.lon - lonPad);
			
			padPoints.push(ne, sw);			
		}
		points = points.concat(padPoints);
	}
	
	this.centerAndZoomOnPoints(points);
};

/**
 * addImageOverlay layers an georeferenced image over the map
 * @param {id} unique DOM identifier
 * @param {src} url of image
 * @param {opacity} opacity 0-100
 * @param {west} west boundary
 * @param {south} south boundary
 * @param {east} east boundary
 * @param {north} north boundary
 */
Mapstraction.prototype.addImageOverlay = function(id, src, opacity, west, south, east, north) {
	
	var b = document.createElement("img");
	b.style.display = 'block';
	b.setAttribute('id',id);
	b.setAttribute('src',src);
	b.style.position = 'absolute';
	b.style.zIndex = 1;
	b.setAttribute('west',west);
	b.setAttribute('south',south);
	b.setAttribute('east',east);
	b.setAttribute('north',north);
	
	var oContext = {
		imgElm: b
	};
	
	this.invoker.go('addImageOverlay', arguments, { context: oContext });
};

Mapstraction.prototype.setImageOpacity = function(id, opacity) {
	if (opacity < 0) {
		opacity = 0;
	}
	if (opacity >= 100) {
		opacity = 100;
	}
	var c = opacity / 100;
	var d = document.getElementById(id);
	if(typeof(d.style.filter)=='string'){
		d.style.filter='alpha(opacity:'+opacity+')';
	}
	if(typeof(d.style.KHTMLOpacity)=='string'){
		d.style.KHTMLOpacity=c;
	}
	if(typeof(d.style.MozOpacity)=='string'){
		d.style.MozOpacity=c;
	}
	if(typeof(d.style.opacity)=='string'){
		d.style.opacity=c;
	}
};

Mapstraction.prototype.setImagePosition = function(id) {
	var imgElement = document.getElementById(id);
	var oContext = {
		latLng: { 
			top: imgElement.getAttribute('north'),
			left: imgElement.getAttribute('west'),
			bottom: imgElement.getAttribute('south'),
			right: imgElement.getAttribute('east')
		},
		pixels: { top: 0, right: 0, bottom: 0, left: 0 }
	};
	
	this.invoker.go('setImagePosition', arguments, { context: oContext });

	imgElement.style.top = oContext.pixels.top.toString() + 'px';
	imgElement.style.left = oContext.pixels.left.toString() + 'px';
	imgElement.style.width = (oContext.pixels.right - oContext.pixels.left).toString() + 'px';
	imgElement.style.height = (oContext.pixels.bottom - oContext.pixels.top).toString() + 'px';
};

Mapstraction.prototype.addJSON = function(json) {
	var features;
	if (typeof(json) == "string") {
		features = eval('(' + json + ')');
	} else {
		features = json;
	}
	features = features.features;
	var map = this.maps[this.api];
	var html = "";
	var item;
	var polyline;
	var marker;
	var markers = [];

	if(features.type == "FeatureCollection") {
		this.addJSON(features.features);
	}

	for (var i = 0; i < features.length; i++) {
		item = features[i];
		switch(item.geometry.type) {
			case "Point":
				html = "<strong>" + item.title + "</strong><p>" + item.description + "</p>";
				marker = new Marker(new LatLonPoint(item.geometry.coordinates[1],item.geometry.coordinates[0]));
				markers.push(marker);
				this.addMarkerWithData(marker,{
					infoBubble : html,
					label : item.title,
					date : "new Date(\""+item.date+"\")",
					iconShadow : item.icon_shadow,
					marker : item.id,
					iconShadowSize : item.icon_shadow_size,
					icon : item.icon,
					iconSize : item.icon_size,
					category : item.source_id,
					draggable : false,
					hover : false
				});
				break;
			case "Polygon":
				var points = [];
				polyline = new Polyline(points);
				mapstraction.addPolylineWithData(polyline,{
					fillColor : item.poly_color,
					date : "new Date(\""+item.date+"\")",
					category : item.source_id,
					width : item.line_width,
					opacity : item.line_opacity,
					color : item.line_color,
					polygon : true
				});
				markers.push(polyline);
				break;
			default:
		}
	}
	return markers;
};

/**
 * Adds a Tile Layer to the map
 *
 * Requires providing a parameterized tile url. Use {Z}, {X}, and {Y} to specify where the parameters
 *  should go in the URL.
 *
 * For example, the OpenStreetMap tiles are:
 *  m.addTileLayer("http://tile.openstreetmap.org/{Z}/{X}/{Y}.png", 1.0, "OSM", 1, 19, true);
 *
 * @param {tile_url} template url of the tiles.
 * @param {opacity} opacity of the tile layer - 0 is transparent, 1 is opaque. (default=0.6)
 * @param {copyright_text} copyright text to use for the tile layer. (default=Mapstraction)
 * @param {min_zoom} Minimum (furtherest out) zoom level that tiles are available (default=1)
 * @param {max_zoom} Maximum (closest) zoom level that the tiles are available (default=18)
 * @param {map_type} Should the tile layer be a selectable map type in the layers palette (default=false)
 */
Mapstraction.prototype.addTileLayer = function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
	if(!tile_url) {
		return;
	}
	
	opacity = opacity || 0.6;
	copyright_text = copyright_text || "Mapstraction";
	min_zoom = min_zoom || 1;
	max_zoom = max_zoom || 18;
	map_type = map_type || false;

	return this.invoker.go('addTileLayer', [ tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type] );
};

/**
 * addFilter adds a marker filter
 * @param {field} name of attribute to filter on
 * @param {operator} presently only "ge" or "le"
 * @param {value} the value to compare against
 */
Mapstraction.prototype.addFilter = function(field, operator, value) {
	if (!this.filters) {
		this.filters = [];
	}
	this.filters.push( [field, operator, value] );
};

/**
 * Remove the specified filter
 * @param {Object} field
 * @param {Object} operator
 * @param {Object} value
 */
Mapstraction.prototype.removeFilter = function(field, operator, value) {
	if (!this.filters) {
		return;
	}

	var del;
	for (var f=0; f<this.filters.length; f++) {
		if (this.filters[f][0] == field &&
			(! operator || (this.filters[f][1] == operator && this.filters[f][2] == value))) {
			this.filters.splice(f,1);
			f--; //array size decreased
		}
	}
};

/**
 * Delete the current filter if present; otherwise add it
 * @param {Object} field
 * @param {Object} operator
 * @param {Object} value
 */
Mapstraction.prototype.toggleFilter = function(field, operator, value) {
	if (!this.filters) {
		this.filters = [];
	}

	var found = false;
	for (var f = 0; f < this.filters.length; f++) {
		if (this.filters[f][0] == field && this.filters[f][1] == operator && this.filters[f][2] == value) {
			this.filters.splice(f,1);
			f--; //array size decreased
			found = true;
		}
	}

	if (! found) {
		this.addFilter(field, operator, value);
	}
};

/**
 * removeAllFilters
 */
Mapstraction.prototype.removeAllFilters = function() {
	this.filters = [];
};

/**
 * doFilter executes all filters added since last call
 * Now supports a callback function for when a marker is shown or hidden
 * @param {Function} showCallback
 * @param {Function} hideCallback
 * @returns {Int} count of visible markers
 */
Mapstraction.prototype.doFilter = function(showCallback, hideCallback) {
	var map = this.maps[this.api];
	var visibleCount = 0;
	var f;
	if (this.filters) {
		switch (this.api) {
			case 'multimap':
				/* TODO polylines aren't filtered in multimap */
				var mmfilters = [];
				for (f=0; f<this.filters.length; f++) {
					mmfilters.push( new MMSearchFilter( this.filters[f][0], this.filters[f][1], this.filters[f][2] ));
				}
				map.setMarkerFilters( mmfilters );
				map.redrawMap();
				break;
			case '  dummy':
				break;
			default:
				var vis;
				for (var m=0; m<this.markers.length; m++) {
					vis = true;
					for (f = 0; f < this.filters.length; f++) {
						if (! this.applyFilter(this.markers[m], this.filters[f])) {
							vis = false;
						}
					}
					if (vis) {
						visibleCount ++;
						if (showCallback){
							showCallback(this.markers[m]);
						}
						else {
							this.markers[m].show();
						}
					} 
					else { 
						if (hideCallback){
							hideCallback(this.markers[m]);
						}
						else {
							this.markers[m].hide();
						}
					}

					this.markers[m].setAttribute("visible", vis);
				}
				break;
		}
	}
	return visibleCount;
};

Mapstraction.prototype.applyFilter = function(o, f) {
	var vis = true;
	switch (f[1]) {
		case 'ge':
			if (o.getAttribute( f[0] ) < f[2]) {
				vis = false;
			}
			break;
		case 'le':
			if (o.getAttribute( f[0] ) > f[2]) {
				vis = false;
			}
			break;
		case 'eq':
			if (o.getAttribute( f[0] ) == f[2]) {
				vis = false;
			}
			break;
	}

	return vis;
};

/**
 * getAttributeExtremes returns the minimum/maximum of "field" from all markers
 * @param {field} name of "field" to query
 * @returns {array} of minimum/maximum
 */
Mapstraction.prototype.getAttributeExtremes = function(field) {
	var min;
	var max;
	for (var m=0; m<this.markers.length; m++) {
		if (! min || min > this.markers[m].getAttribute(field)) {
			min = this.markers[m].getAttribute(field);
		}
		if (! max || max < this.markers[m].getAttribute(field)) {
			max = this.markers[m].getAttribute(field);
		}
	}
	for (var p=0; m<this.polylines.length; m++) {
		if (! min || min > this.polylines[p].getAttribute(field)) {
			min = this.polylines[p].getAttribute(field);
		}
		if (! max || max < this.polylines[p].getAttribute(field)) {
			max = this.polylines[p].getAttribute(field);
		}
	}

	return [min, max];
};

/**
 * getMap returns the native map object that mapstraction is talking to
 * @returns the native map object mapstraction is using
 */
Mapstraction.prototype.getMap = function() {
	// FIXME in an ideal world this shouldn't exist right?
	return this.maps[this.api];
};


//////////////////////////////
//
//   LatLonPoint
//
/////////////////////////////

/**
 * LatLonPoint is a point containing a latitude and longitude with helper methods
 * @name mxn.LatLonPoint
 * @constructor
 * @param {double} lat is the latitude
 * @param {double} lon is the longitude
 * @exports LatLonPoint as mxn.LatLonPoint
 */
var LatLonPoint = mxn.LatLonPoint = function(lat, lon) {	
	this.lat = Number(lat); // force to be numeric
	this.lon = Number(lon);
	this.lng = this.lon; // lets be lon/lng agnostic
	
	this.invoker = new mxn.Invoker(this, 'LatLonPoint');		
};

mxn.addProxyMethods(LatLonPoint, [ 
	/**
	 * Retrieve the lat and lon values from a proprietary point.
	 * @name mxn.LatLonPoint#fromProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary point.
	 * @param {Object} point The proprietary point.
	 */
	'fromProprietary',
	
	/**
	 * Converts the current LatLonPoint to a proprietary one for the API specified by apiId.
	 * @name mxn.LatLonPoint#toProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary point.
	 * @returns A proprietary point.
	 */
	'toProprietary'
], true);

/**
 * toString returns a string represntation of a point
 * @returns a string like '51.23, -0.123'
 * @type String
 */
LatLonPoint.prototype.toString = function() {
	return this.lat + ', ' + this.lon;
};

/**
 * distance returns the distance in kilometers between two points
 * @param {LatLonPoint} otherPoint The other point to measure the distance from to this one
 * @returns the distance between the points in kilometers
 * @type double
 */
LatLonPoint.prototype.distance = function(otherPoint) {
	// Uses Haversine formula from http://www.movable-type.co.uk
	var rads = Math.PI / 180;
	var diffLat = (this.lat-otherPoint.lat) * rads;
	var diffLon = (this.lon-otherPoint.lon) * rads; 
	var a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
		Math.cos(this.lat*rads) * Math.cos(otherPoint.lat*rads) * 
		Math.sin(diffLon/2) * Math.sin(diffLon/2); 
	return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 6371; // Earth's mean radius in km
};

/**
 * equals tests if this point is the same as some other one
 * @param {LatLonPoint} otherPoint The other point to test with
 * @returns true or false
 * @type boolean
 */
LatLonPoint.prototype.equals = function(otherPoint) {
	return this.lat == otherPoint.lat && this.lon == otherPoint.lon;
};

/**
 * Returns latitude conversion based on current projection
 * @returns {Float} conversion
 */
LatLonPoint.prototype.latConv = function() {
	return this.distance(new LatLonPoint(this.lat + 0.1, this.lon))*10;
};

/**
 * Returns longitude conversion based on current projection
 * @returns {Float} conversion
 */
LatLonPoint.prototype.lonConv = function() {
	return this.distance(new LatLonPoint(this.lat, this.lon + 0.1))*10;
};


//////////////////////////
//
//  BoundingBox
//
//////////////////////////

/**
 * BoundingBox creates a new bounding box object
 * @name mxn.BoundingBox
 * @constructor
 * @param {double} swlat the latitude of the south-west point
 * @param {double} swlon the longitude of the south-west point
 * @param {double} nelat the latitude of the north-east point
 * @param {double} nelon the longitude of the north-east point
 * @exports BoundingBox as mxn.BoundingBox
 */
var BoundingBox = mxn.BoundingBox = function(swlat, swlon, nelat, nelon) {
	//FIXME throw error if box bigger than world
	this.sw = new LatLonPoint(swlat, swlon);
	this.ne = new LatLonPoint(nelat, nelon);
};

/**
 * getSouthWest returns a LatLonPoint of the south-west point of the bounding box
 * @returns the south-west point of the bounding box
 * @type LatLonPoint
 */
BoundingBox.prototype.getSouthWest = function() {
	return this.sw;
};

/**
 * getNorthEast returns a LatLonPoint of the north-east point of the bounding box
 * @returns the north-east point of the bounding box
 * @type LatLonPoint
 */
BoundingBox.prototype.getNorthEast = function() {
	return this.ne;
};

/**
 * isEmpty finds if this bounding box has zero area
 * @returns whether the north-east and south-west points of the bounding box are the same point
 * @type boolean
 */
BoundingBox.prototype.isEmpty = function() {
	return this.ne == this.sw; // is this right? FIXME
};

/**
 * contains finds whether a given point is within a bounding box
 * @param {LatLonPoint} point the point to test with
 * @returns whether point is within this bounding box
 * @type boolean
 */
BoundingBox.prototype.contains = function(point){
	return point.lat >= this.sw.lat && point.lat <= this.ne.lat && point.lon >= this.sw.lon && point.lon <= this.ne.lon;
};

/**
 * toSpan returns a LatLonPoint with the lat and lon as the height and width of the bounding box
 * @returns a LatLonPoint containing the height and width of this bounding box
 * @type LatLonPoint
 */
BoundingBox.prototype.toSpan = function() {
	return new LatLonPoint( Math.abs(this.sw.lat - this.ne.lat), Math.abs(this.sw.lon - this.ne.lon) );
};



/**
 * extend extends the bounding box to include the new point
 */
BoundingBox.prototype.extend = function(point) {
	if (this.sw.lat > point.lat) {
		this.sw.lat = point.lat;
	}
	if (this.sw.lon > point.lon) {
		this.sw.lon = point.lon;
	}
	if (this.ne.lat < point.lat) {
		this.ne.lat = point.lat;
	}
	if (this.ne.lon < point.lon) {
		this.ne.lon = point.lon;
	}
	return;
};

//////////////////////////////
//
//  Marker
//
///////////////////////////////

/**
 * Marker create's a new marker pin
 * @name mxn.Marker
 * @constructor
 * @param {LatLonPoint} point the point on the map where the marker should go
 * @exports Marker as mxn.Marker
 */
var Marker = mxn.Marker = function(point) {
	this.api = null;
	this.location = point;
	this.onmap = false;
	this.proprietary_marker = false;
	this.attributes = [];
	this.invoker = new mxn.Invoker(this, 'Marker', function(){return this.api;});
	mxn.addEvents(this, [ 
		'openInfoBubble',	// Info bubble opened
		'closeInfoBubble', 	// Info bubble closed
		'click',			// Marker clicked
		'mouseover',		// Marker onmouseover
		'mouseout'			// Marker onmouseout
	]);
};

mxn.addProxyMethods(Marker, [ 
	/**
	 * Retrieve the settings from a proprietary marker.
	 * @name mxn.Marker#fromProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary point.
	 * @param {Object} marker The proprietary marker.
	 */
	'fromProprietary',
	
	/**
	 * Hide the marker.
	 * @name mxn.Marker#hide
	 * @function
	 */
	'hide',
	
	/**
	 * Open the marker's info bubble.
	 * @name mxn.Marker#openBubble
	 * @function
	 */
	'openBubble',
	
	/**
	 * Closes the marker's info bubble.
	 * @name mxn.Marker#closeBubble
	 * @function
	 */
	'closeBubble',
	
	/**
	 * Show the marker.
	 * @name mxn.Marker#show
	 * @function
	 */
	'show',
	
	/**
	 * Converts the current Marker to a proprietary one for the API specified by apiId.
	 * @name mxn.Marker#toProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary marker.
	 * @returns A proprietary marker.
	 */
	'toProprietary',
	
	/**
	 * Updates the Marker with the location of the attached proprietary marker on the map.
	 * @name mxn.Marker#update
	 * @function
	 */
	'update'
]);

Marker.prototype.setChild = function(some_proprietary_marker) {
	this.proprietary_marker = some_proprietary_marker;
	some_proprietary_marker.mapstraction_marker = this;
	this.onmap = true;
};

Marker.prototype.setLabel = function(labelText) {
	this.labelText = labelText;
};

/**
 * addData conviniently set a hash of options on a marker
 * @param {Object} options An object literal hash of key value pairs. Keys are: label, infoBubble, icon, iconShadow, infoDiv, draggable, hover, hoverIcon, openBubble, groupName.
 */
Marker.prototype.addData = function(options){
	for(var sOptKey in options) {
		if(options.hasOwnProperty(sOptKey)){
			switch(sOptKey) {
				case 'label':
					this.setLabel(options.label);
					break;
				case 'infoBubble':
					this.setInfoBubble(options.infoBubble);
					break;
				case 'icon':
					if(options.iconSize && options.iconAnchor) {
						this.setIcon(options.icon, options.iconSize, options.iconAnchor);
					}
					else if(options.iconSize) {
						this.setIcon(options.icon, options.iconSize);
					}
					else {
						this.setIcon(options.icon);
					}
					break;
				case 'iconShadow':
					if(options.iconShadowSize) {
						this.setShadowIcon(options.iconShadow, [ options.iconShadowSize[0], options.iconShadowSize[1] ]);
					}
					else {
						this.setIcon(options.iconShadow);
					}
					break;
				case 'infoDiv':
					this.setInfoDiv(options.infoDiv[0],options.infoDiv[1]);
					break;
				case 'draggable':
					this.setDraggable(options.draggable);
					break;
				case 'hover':
					this.setHover(options.hover);
					this.setHoverIcon(options.hoverIcon);
					break;
				case 'hoverIcon':
					this.setHoverIcon(options.hoverIcon);
					break;
				case 'openBubble':
					this.openBubble();
					break;
				case 'closeBubble':
					this.closeBubble();
					break;
				case 'groupName':
					this.setGroupName(options.groupName);
					break;
				default:
					// don't have a specific action for this bit of
					// data so set a named attribute
					this.setAttribute(sOptKey, options[sOptKey]);
					break;
			}
		}
	}
};

/**
 * Sets the html/text content for a bubble popup for a marker
 * @param {String} infoBubble the html/text you want displayed
 */
Marker.prototype.setInfoBubble = function(infoBubble) {
	this.infoBubble = infoBubble;
};

/**
 * Sets the text and the id of the div element where to the information
 * useful for putting information in a div outside of the map
 * @param {String} infoDiv the html/text you want displayed
 * @param {String} div the element id to use for displaying the text/html
 */
Marker.prototype.setInfoDiv = function(infoDiv,div){
	this.infoDiv = infoDiv;
	this.div = div;
};

/**
 * Sets the icon for a marker
 * @param {String} iconUrl The URL of the image you want to be the icon
 */
Marker.prototype.setIcon = function(iconUrl, iconSize, iconAnchor) {
	this.iconUrl = iconUrl;
	if(iconSize) {
		this.iconSize = iconSize;
	}
	if(iconAnchor) {
		this.iconAnchor = iconAnchor;
	}
};

/**
 * Sets the size of the icon for a marker
 * @param {Array} iconSize The array size in pixels of the marker image: [ width, height ]
 */
Marker.prototype.setIconSize = function(iconSize){
	if(iconSize) {
		this.iconSize = iconSize;
	}
};

/**
 * Sets the anchor point for a marker
 * @param {Array} iconAnchor The array offset in pixels of the anchor point from top left: [ right, down ]
 */
Marker.prototype.setIconAnchor = function(iconAnchor){
	if(iconAnchor) {
		this.iconAnchor = iconAnchor;
	}
};

/**
 * Sets the icon for a marker
 * @param {String} iconUrl The URL of the image you want to be the icon
 */
Marker.prototype.setShadowIcon = function(iconShadowUrl, iconShadowSize){
	this.iconShadowUrl = iconShadowUrl;
	if(iconShadowSize) {
		this.iconShadowSize = iconShadowSize;
	}
};

Marker.prototype.setHoverIcon = function(hoverIconUrl){
	this.hoverIconUrl = hoverIconUrl;
};

/**
 * Sets the draggable state of the marker
 * @param {Bool} draggable set to true if marker should be draggable by the user
 */
Marker.prototype.setDraggable = function(draggable) {
	this.draggable = draggable;
};

/**
 * Sets that the marker info is displayed on hover
 * @param {Boolean} hover set to true if marker should display info on hover
 */
Marker.prototype.setHover = function(hover) {
	this.hover = hover;
};

/**
 * Markers are grouped up by this name. declutterGroup makes use of this.
 */
Marker.prototype.setGroupName = function(sGrpName) {
	this.groupName = sGrpName;
};

/**
 * Set an arbitrary key/value pair on a marker
 * @param {String} key
 * @param value
 */
Marker.prototype.setAttribute = function(key,value) {
	this.attributes[key] = value;
};

/**
 * getAttribute: gets the value of "key"
 * @param {String} key
 * @returns value
 */
Marker.prototype.getAttribute = function(key) {
	return this.attributes[key];
};


///////////////
// Polyline ///
///////////////

/**
 * Instantiates a new Polyline.
 * @name mxn.Polyline
 * @constructor
 * @param {Point[]} points Points that make up the Polyline.
 * @exports Polyline as mxn.Polyline
 */
var Polyline = mxn.Polyline = function(points) {
	this.api = null;
	this.points = points;
	this.attributes = [];
	this.onmap = false;
	this.proprietary_polyline = false;
	this.pllID = "mspll-"+new Date().getTime()+'-'+(Math.floor(Math.random()*Math.pow(2,16)));
	this.invoker = new mxn.Invoker(this, 'Polyline', function(){return this.api;});
	mxn.addEvents(this, [ 
		'openInfoBubble',	// Info bubble opened
		'closeInfoBubble', 	// Info bubble closed
		'click',			// Marker clicked
		'mouseover',		// Marker onmouseover
		'mouseout'			// Marker onmouseout
	]);
};

mxn.addProxyMethods(Polyline, [ 

	/**
	 * Retrieve the settings from a proprietary polyline.
	 * @name mxn.Polyline#fromProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary polyline.
	 * @param {Object} polyline The proprietary polyline.
	 */
	'fromProprietary', 
	
	/**
	 * Hide the polyline.
	 * @name mxn.Polyline#hide
	 * @function
	 */
	'hide',
	
	/**
	 * Show the polyline.
	 * @name mxn.Polyline#show
	 * @function
	 */
	'show',
	
	/**
	 * Converts the current Polyline to a proprietary one for the API specified by apiId.
	 * @name mxn.Polyline#toProprietary
	 * @function
	 * @param {String} apiId The API ID of the proprietary polyline.
	 * @returns A proprietary polyline.
	 */
	'toProprietary',
	
	/**
	 * Updates the Polyline with the path of the attached proprietary polyline on the map.
	 * @name mxn.Polyline#update
	 * @function
	 */
	'update',

		/**
	 * Open the marker's info bubble.
	 * @name mxn.Marker#openBubble
	 * @function
	 */
	'openBubble',
	
	/**
	 * Closes the marker's info bubble.
	 * @name mxn.Marker#closeBubble
	 * @function
	 */
	'closeBubble'

]);

/**
 * addData conviniently set a hash of options on a polyline
 * @param {Object} options An object literal hash of key value pairs. Keys are: color, width, opacity, closed, fillColor.
 */
Polyline.prototype.addData = function(options){
	for(var sOpt in options) {
		if(options.hasOwnProperty(sOpt)){
			switch(sOpt) {
				case 'color':
					this.setColor(options.color);
					break;
				case 'width':
					this.setWidth(options.width);
					break;
				case 'opacity':
					this.setOpacity(options.opacity);
					break;
				case 'closed':
					this.setClosed(options.closed);
					break;
				case 'fillColor':
					this.setFillColor(options.fillColor);
					break;
				case 'fillOpacity':
					this.setFillOpacity(options.fillOpacity);
					break;
				default:
					this.setAttribute(sOpt, options[sOpt]);
					break;
			}
		}
	}
};

Polyline.prototype.setChild = function(some_proprietary_polyline) {
	this.proprietary_polyline = some_proprietary_polyline;
	this.onmap = true;
};

/**
 * in the form: #RRGGBB
 * Note map24 insists on upper case, so we convert it.
 */
Polyline.prototype.setColor = function(color){
	this.color = (color.length==7 && color[0]=="#") ? color.toUpperCase() : color;
};

/**
 * Stroke width of the polyline
 * @param {Integer} width
 */
Polyline.prototype.setWidth = function(width){
	this.width = width;
};

/**
 * A float between 0.0 and 1.0
 * @param {Float} opacity
 */
Polyline.prototype.setOpacity = function(opacity){
	this.opacity = opacity;
};

/**
 * Marks the polyline as a closed polygon
 * @param {Boolean} bClosed
 */
Polyline.prototype.setClosed = function(bClosed){
	this.closed = bClosed;
};

/**
 * Fill color for a closed polyline as HTML color value e.g. #RRGGBB
 * @param {String} sFillColor HTML color value #RRGGBB
 */
Polyline.prototype.setFillColor = function(sFillColor) {
	this.fillColor = sFillColor;
};

/**
 * Fill color for a closed polyline as HTML color value e.g. #RRGGBB
 * @param {String} sFillColor HTML color value #RRGGBB
 */
Polyline.prototype.setFillOpacity = function(sFillOpacity) {
	this.fillOpacity = sFillOpacity;
};

/**
 * Set an arbitrary key/value pair on a polyline
 * @param {String} key
 * @param value
 */
Polyline.prototype.setAttribute = function(key,value) {
	this.attributes[key] = value;
};

/**
 * Gets the value of "key"
 * @param {String} key
 * @returns value
 */
Polyline.prototype.getAttribute = function(key) {
	return this.attributes[key];
};

/**
 * Sets the html/text content for a bubble popup for a marker
 * @param {String} infoBubble the html/text you want displayed
 */
Polyline.prototype.setInfoBubble = function(infoBubble) {
	this.infoBubble = infoBubble;
};

/**
 * Simplifies a polyline, averaging and reducing the points
 * @param {Number} tolerance (1.0 is a good starting point)
 */
Polyline.prototype.simplify = function(tolerance) {
	var reduced = [];

	// First point
	reduced[0] = this.points[0];

	var markerPoint = 0;

	for (var i = 1; i < this.points.length-1; i++){
		if (this.points[i].distance(this.points[markerPoint]) >= tolerance)
		{
			reduced[reduced.length] = this.points[i];
			markerPoint = i;
		}
	}

	// Last point
	reduced[reduced.length] = this.points[this.points.length-1];

	// Revert
	this.points = reduced;
};

///////////////
// Radius	//
///////////////

/**
 * Creates a new radius object for drawing circles around a point, does a lot of initial calculation to increase load time
 * @name mxn.Radius
 * @constructor
 * @param {LatLonPoint} center LatLonPoint of the radius
 * @param {Number} quality Number of points that comprise the approximated circle (20 is a good starting point)
 * @exports Radius as mxn.Radius
 */
var Radius = mxn.Radius = function(center, quality) {
	this.center = center;
	var latConv = center.latConv();
	var lonConv = center.lonConv();

	// Create Radian conversion constant
	var rad = Math.PI / 180;
	this.calcs = [];

	for(var i = 0; i < 360; i += quality){
		this.calcs.push([Math.cos(i * rad) / latConv, Math.sin(i * rad) / lonConv]);
	}
};

/**
 * Returns polyline of a circle around the point based on new radius
 * @param {Radius} radius
 * @param {Color} color
 * @returns {Polyline} Polyline
 */
Radius.prototype.getPolyline = function(radius, color) {
	var points = [];

	for(var i = 0; i < this.calcs.length; i++){
		var point = new LatLonPoint(
			this.center.lat + (radius * this.calcs[i][0]),
			this.center.lon + (radius * this.calcs[i][1])
		);
		points.push(point);
	}
	
	// Add first point
	points.push(points[0]);

	var line = new Polyline(points);
	line.setColor(color);

	return line;
};


})();
