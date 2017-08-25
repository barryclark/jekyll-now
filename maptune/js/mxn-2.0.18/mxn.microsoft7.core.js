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
mxn.register('microsoft7', {

Mapstraction: {
	init: function(element, api) {
		var me = this;
		
		if (!Microsoft || !Microsoft.Maps) {
			throw api + ' map script not imported';
		}
		this.maps[api] = new Microsoft.Maps.Map(element, { credentials: microsoft_key } );
		//Add Click Event
		element.addEventListener('contextmenu', function(evt) { evt.preventDefault(); });
		Microsoft.Maps.Events.addHandler(this.maps[api], 'rightclick', function(event) {
			var map = me.maps[me.api];
			var _x = event.getX();
			var _y = event.getY();
			var pixel = new Microsoft.Maps.Point(_x, _y);
			var ll = map.tryPixelToLocation(pixel);
			var _event = {
					'location': new mxn.LatLonPoint(ll.latitude, ll.longitude),
					'position': {x:_x, y:_y},
					'button': 'right'
				};
			me.click.fire(_event);
		});
		Microsoft.Maps.Events.addHandler(this.maps[api], 'click', function(event){
			var map = me.maps[me.api];
			event.originalEvent.preventDefault();
			if (event.targetType == 'pushpin') {
				event.target.mapstraction_marker.click.fire();
			}
			else {
				var _x = event.getX();
				var _y = event.getY();
				var pixel = new Microsoft.Maps.Point(_x, _y);
				var ll = map.tryPixelToLocation(pixel);
				var _event = {
					'location': new mxn.LatLonPoint(ll.latitude, ll.longitude),
					'position': {x:_x, y:_y},
					'button': event.isSecondary ? 'right' : 'left'
				};
				me.click.fire(_event);
			}
		});
		Microsoft.Maps.Events.addHandler(this.maps[api], 'viewchangeend', function(event){
			me.changeZoom.fire();
		});
		Microsoft.Maps.Events.addHandler(this.maps[api], 'viewchangeend', function(event){
			me.endPan.fire();
		});
		Microsoft.Maps.Events.addHandler(this.maps[api], 'viewchange', function(event){
			me.endPan.fire();
		});
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
		
		var myOptions = [];
		if (!this.options.enableDragging) {
			myOptions.disablePanning = true;
		} 
		if (!this.options.enableScrollWheelZoom) {
			myOptions.disableZooming = true;
		} 
		// map.setOptions(myOptions);
		// TODO: Add provider code
	},

	resizeTo: function(width, height){	
		var map = this.maps[this.api];
		map.setOptions(height,width);
	},

	addControls: function( args ) {
		var map = this.maps[this.api];
	
		// TODO: Add provider code
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	addLargeControls: function() {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);	

		// Get the existing options.
		var options = {};
		options.zoom = zoom;
		options.center = pt;
		
		map.setView(options);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var pin = marker.toProprietary(this.api);
		
		map.entities.push(pin);
		
		
		return pin;
	},

	removeMarker: function(marker) {
		var map = this.maps[this.api];
		if (marker.proprietary_marker) {
			map.entities.remove(marker.proprietary_marker);
		}
	},
	
	declutterMarkers: function(opts) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	addPolyline: function(polyline, old) {
		var map = this.maps[this.api];
		var pl = polyline.toProprietary(this.api);
		
		map.entities.push(pl);
				
		return pl;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
		
		if (polyline.proprietary_polyline) {
			map.entities.remove(polyline.proprietary_polyline);
		}
	},
	
	getCenter: function() {
		var point;
		var map = this.maps[this.api];
		// Get the existing options.
		var options = map.getOptions();
		point = new mxn.LatLonPoint(options.center.latitude,options.center.longitude);
		
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
	 
		// Get the existing options.
		var msOptions = map.getOptions();
		msOptions.center = pt;
		msOptions.bounds = null;
		map.setView(msOptions);
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		// Get the existing options.
		var options = map.getOptions();
		options.zoom = zoom;
		map.setView(options);
		
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		var zoom;
		
		var options = map.getOptions();
		zoom = options.zoom;
		// TODO: Add provider code
		
		return zoom;
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast();
		var sw = bbox.getSouthWest();
		var zoom;
		
		// TODO: Add provider code
		
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
		var options = map.getOptions();
		
		switch (type) {
			case mxn.Mapstraction.ROAD:
				options.mapTypeId = Microsoft.Maps.MapTypeId.road;
				
				break;
			case mxn.Mapstraction.SATELLITE:
				options.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
				break;
			case mxn.Mapstraction.HYBRID:
				options.mapTypeId = Microsoft.Maps.MapTypeId.birdseye;
				break;
			default:
				options.mapTypeId = Microsoft.Maps.MapTypeId.road;
		}

		map.setView(options);	 
	},

	getMapType: function() {
		var map = this.maps[this.api];
		var options = map.getOptions();
		switch (options.mapTypeId) {
			case Microsoft.Maps.MapTypeId.road:
				return mxn.Mapstraction.ROAD;
			case Microsoft.Maps.MapTypeId.aerial:
				return mxn.Mapstraction.SATELLITE;
			case Microsoft.Maps.MapTypeId.birdseye:
				return mxn.Mapstraction.HYBRID;
			default:
				return mxn.Mapstraction.ROAD;
		}

	},

	getBounds: function () {
		var map = this.maps[this.api];
		var options = map.getOptions();
		// TODO: Add provider code
		var nw = options.bounds.getNorthwest;
		var se = options.bounds.getSoutheast;
		return new mxn.BoundingBox(se.latitude,nw.longitude	,nw.latitude	, se.longitude );
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var viewRect = Microsoft.Maps.LocationRect.fromCorners(new Microsoft.Maps.Location(sw.lat,ne.lon), new Microsoft.Maps.Location(ne.at,sw.lon));
		var options = map.getOptions();
		options.bounds = viewRect;
		options.center = null;
		map.setView(options);
		
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	setImagePosition: function(id, oContext) {
		var map = this.maps[this.api];
		var topLeftPoint; var bottomRightPoint;

		// TODO: Add provider code

		//oContext.pixels.top = ...;
		//oContext.pixels.left = ...;
		//oContext.pixels.bottom = ...;
		//oContext.pixels.right = ...;
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
		
	},

	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	toggleTileLayer: function(tile_url) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	getPixelRatio: function() {
		var map = this.maps[this.api];

		// TODO: Add provider code	
	},
	
	mousePosition: function(element) {
		var map = this.maps[this.api];

		// TODO: Add provider code	
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new Microsoft.Maps.Location(this.lat, this.lon);
	},

	fromProprietary: function(mPoint) {
		this.lat = mPoint.latitude;
		this.lon = mPoint.longitude;
	}
	
},

Marker: {
	
	toProprietary: function() {
		var options = {};
		if (this.draggable)
		{
			options.draggable = true;
		}
		var ax = 0;	// anchor x 
		var ay = 0;	// anchor y

		if (this.iconAnchor) {
			ax = this.iconAnchor[0];
			ay = this.iconAnchor[1];
		}
		var mAnchorPoint = new Microsoft.Maps.Point(ax,ay);
		if (this.iconUrl) {
			options.icon = this.iconUrl;
			options.height = this.iconSize[1];
			options.width = this.iconSize[0];
			options.anchor = mAnchorPoint;
		}
		if (this.label)
		{
			options.text = this.label;
		}
		var mmarker = new Microsoft.Maps.Pushpin(this.location.toProprietary('microsoft7'), options); 

		if (this.infoBubble){
			var event_action = "click";
			if (this.hover) {
				event_action = "mouseover";
			}
			Microsoft.Maps.Events.addHandler(mmarker, event_action, function() {
				mmarker.mapstraction_marker.openBubble();
			});
			Microsoft.Maps.Events.addHandler(map, 'viewchange', function () {
				mmarker.mapstraction_marker.closeBubble();
			});
		}
		return mmarker;
	},

	openBubble: function() {		
		var infowindow = new Microsoft.Maps.InfoBox({
			description: this.infoBubble
		});
		
		this.events.openInfoBubble.fire({'marker': this});
		this.map.entities.push(infowindow);
		infowindow.setOptions({visible: true});
		this.proprietary_infowindow = infowindow; // Save so we can close it later
	},
	closeBubble: function() {
		if (!this.map) {
			throw 'Marker must be added to map in order to display infobox';
		}
		if (!this.proprietary_infowindow) {
			return;
		}
		this.proprietary_infowindow.setOptions({visible:false});
		this.map.entities.remove(this.proprietary_infowindow);
	},
	hide: function() {
		this.proprietary_marker.setOptions({visible: false});
	},

	show: function() {
		this.proprietary_marker.setOptions({visible: true});
	},

	update: function() {
		var loc = this.proprietary_marker.getLocation();
		var point = new mxn.LatLonPoint(loc.latitude, loc.longitude);
		this.location = point;
	}
	
},

Polyline: {

	toProprietary: function() {
		var points = [];
		for (var i = 0, length = this.points.length; i < length; i++) {
			points.push(this.points[i].toProprietary(this.api));
		}
		
		var strokeColor = Microsoft.Maps.Color.fromHex(this.color);
		strokeColor.a = this.opacity * 255;
		var fillColor = Microsoft.Maps.Color.fromHex(this.fillColor);
		fillColor.a = this.fillOpacity * 255;
		
		var polyOptions = {
			strokeColor: _strokeColor,
			strokeThickness: this.width
		};

		if (this.closed) {
			polyOptions.fillColor = _fillColor;
			points.push(this.points[0].toProprietary(this.api));
			return new Microsoft.Maps.Polygon(points, polyOptions);
		}
		else {
			console.log("Rendering PolyLine");
			return new Microsoft.Maps.Polyline(points, polyOptions);
		}

	},
	
	show: function() {
		this.proprietary_polyline.setOptions({visible:true});
	},

	hide: function() {
		this.proprietary_polyline.setOptions({visible:false});
	}	
}

});