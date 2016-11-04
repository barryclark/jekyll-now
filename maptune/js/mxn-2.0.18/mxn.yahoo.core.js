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
mxn.register('yahoo', {	

Mapstraction: {
	
	init: function(element,api) {		
		var me = this;
		if (YMap) {
			this.maps[api] = new YMap(element);

			YEvent.Capture(this.maps[api], EventsList.MouseClick, function(event,location) {
				me.clickHandler(location.Lat, location.Lon, location, me);
				me.click.fire({'location': new mxn.LatLonPoint(location.Lat, location.Lon)});
			});
			YEvent.Capture(this.maps[api], EventsList.changeZoom, function() {
				me.moveendHandler(me);
				me.changeZoom.fire();
			});
			YEvent.Capture(this.maps[api], EventsList.endPan, function() {
				me.moveendHandler(me);
				me.endPan.fire();
			});
			YEvent.Capture(this.maps[api], EventsList.endAutoPan, function() {
				me.endPan.fire();
			});
			
			this.loaded[api] = true;
			me.load.fire();
		}
		else {
			alert(api + ' map script not imported');
		}  
	},
	
	applyOptions: function(){
		
		/*
		if (this.options.enableDragging) {
			map.enableDragMap();
		} else {
			map.disableDragMap();
		}
		*/
		
	},

	resizeTo: function(width, height){	
		this.maps[this.api].resizeTo(new YSize(width,height));
	},

	addControls: function( args ) {
		var map = this.maps[this.api];
		
		if (args.pan) {
			map.addPanControl();
		}
		else {
			// Yahoo doesn't check the pan control is there before trying to remove it
			// so throws an exception :(
			map.addPanControl();
			map.removePanControl();
		}
		
		if (args.zoom == 'large') {
			map.addZoomLong();
		}
		else if ( args.zoom == 'small' ) {
			map.addZoomShort();
		}
		else {
			map.removeZoomScale();
		}
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		map.addPanControl();
		map.addZoomShort();
		this.addControlsArgs.pan = true;
		this.addControlsArgs.zoom = 'small';
	},

	addLargeControls: function() {
		var map = this.maps[this.api];
		map.addPanControl();
		map.addZoomLong();
		this.addControlsArgs.pan = true;  // keep the controls in case of swap
		this.addControlsArgs.zoom = 'large';
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];
		map.addTypeControl();
	},

	dragging: function(on) {
		var map = this.maps[this.api];
		if (on) {
			map.enableDragMap();
		} else {
			map.disableDragMap();
		}
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		
		var yzoom = 18 - zoom; // maybe?
		map.drawZoomAndCenter(pt,yzoom);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var pin = marker.toProprietary(this.api);
		map.addOverlay(pin);
		YEvent.Capture(pin, EventsList.MouseClick, function() {
			marker.click.fire();
		});
		YEvent.Capture(pin, EventsList.openSmartWindow, function() {
			marker.openInfoBubble.fire();
		});
		YEvent.Capture(pin, EventsList.closeSmartWindow, function() {
			marker.closeInfoBubble.fire();
		});
		return pin;
	},

	removeMarker: function(marker) {
		var map = this.maps[this.api];
		map.removeOverlay(marker.proprietary_marker);
	},
	
	declutterMarkers: function(opts) {
		throw 'Not supported';
	},

	addPolyline: function(polyline, old) {
		var map = this.maps[this.api];
		var pl = polyline.toProprietary(this.api);
		map.addOverlay(pl);
		return pl;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
		map.removeOverlay(polyline.proprietary_polyline);
	},
	
	getCenter: function() {
		var map = this.maps[this.api];
		var pt = map.getCenterLatLon();
		var point = new mxn.LatLonPoint(pt.Lat, pt.Lon);
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.panToLatLon(pt);
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		var yzoom = 18 - zoom; // maybe?
		map.setZoomLevel(yzoom);		  
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		return 18 - map.getZoomLevel();
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		throw 'Not implemented';
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
		
		switch(type) {
			case mxn.Mapstraction.ROAD:
				map.setMapType(YAHOO_MAP_REG);
				break;
			case mxn.Mapstraction.SATELLITE:
				map.setMapType(YAHOO_MAP_SAT);
				break;
			case mxn.Mapstraction.HYBRID:
				map.setMapType(YAHOO_MAP_HYB);
				break;
			default:
				map.setMapType(YAHOO_MAP_REG);
		}
	},

	getMapType: function() {
		var map = this.maps[this.api];
		var type = map.getCurrentMapType();
		switch(type) {
			case YAHOO_MAP_REG:
				return mxn.Mapstraction.ROAD;
			case YAHOO_MAP_SAT:
				return mxn.Mapstraction.SATELLITE;
			case YAHOO_MAP_HYB:
				return mxn.Mapstraction.HYBRID;
			default:
				return null;
		}
	},

	getBounds: function () {
		var map = this.maps[this.api];
		var ybox = map.getBoundsLatLon();
		return new mxn.BoundingBox(ybox.LatMin, ybox.LonMin, ybox.LatMax, ybox.LonMax);
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
						
		if(sw.lon > ne.lon) {
			sw.lon -= 360;
		}
		var center = new YGeoPoint((sw.lat + ne.lat)/2, (ne.lon + sw.lon)/2);
		
		var container = map.getContainerSize();
		for(var zoom = 1 ; zoom <= 17 ; zoom++){
			var sw_pix = mxn.util.convertLatLonXY_Yahoo(sw,zoom);
			var ne_pix = mxn.util.convertLatLonXY_Yahoo(ne,zoom);
			if(sw_pix.x > ne_pix.x) {
				sw_pix.x -= (1 << (26 - zoom)); //earth circumference in pixel
			}
			if(Math.abs(ne_pix.x - sw_pix.x) <= container.width &&
				Math.abs(ne_pix.y - sw_pix.y) <= container.height){
				map.drawZoomAndCenter(center, zoom); //Call drawZoomAndCenter here: OK if called multiple times anyway
				break;
			}
		}		
	},
	
	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		throw 'Not implemented';
	},

	setImagePosition: function(id) {
	   throw 'Not implemented';
	},	
	
	addOverlay: function(url, autoCenterAndZoom) {
		var map = this.maps[this.api];
		map.addOverlay(new YGeoRSS(url));
	},
	
	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom) {
		throw 'Not implemented';
	},

	toggleTileLayer: function(tile_url) {
		throw 'Not implemented';
	},
	
	getPixelRatio: function() {
		throw 'Not implemented';	
	},
	
	mousePosition: function(element) {
		throw 'Not implemented';
	}
	
},

LatLonPoint: {
	
	toProprietary: function() {
		return new YGeoPoint(this.lat,this.lon);
	},

	fromProprietary: function(yahooPoint) {
		this.lat = yahooPoint.Lat;
		this.lon = yahooPoint.Lon;
	}
	
},

Marker: {
	
	toProprietary: function() {
		var ymarker, size;
		var infoBubble, event_action, infoDiv, div;
		
		if(this.iconSize) {
			size = new YSize(this.iconSize[0], this.iconSize[1]);
		}
		if(this.iconUrl) {
			if(this.iconSize){
				ymarker = new YMarker(this.location.toProprietary('yahoo'), new YImage(this.iconUrl, size));
			}
			else {
				ymarker = new YMarker(this.location.toProprietary('yahoo'), new YImage(this.iconUrl));
			}
		}
		else {
			if(this.iconSize) {
				ymarker = new YMarker(this.location.toProprietary('yahoo'), null, size);
			}
			else {
				ymarker = new YMarker(this.location.toProprietary('yahoo'));
			}
		}

		if(this.labelText) {
			ymarker.addLabel(this.labelText);
		}

		if(this.infoBubble) {
			infoBubble = this.infoBubble;
			if(this.hover) {
				event_action = EventsList.MouseOver;
			}
			else {
				event_action = EventsList.MouseClick;
			}
			YEvent.Capture(ymarker, event_action, function() {
				ymarker.openSmartWindow(infoBubble);
			});

		}

		if(this.infoDiv) {
			infoDiv = this.infoDiv;
			div = this.div;
			if(this.hover) {
				event_action = EventsList.MouseOver;
			}
			else {
				event_action = EventsList.MouseClick;
			}
			YEvent.Capture(ymarker, event_action, function() {
				document.getElementById(div).innerHTML = infoDiv;
			});
		}

		return ymarker;
	},

	openBubble: function() {
		var ypin = this.proprietary_marker;
		ypin.openSmartWindow(this.infoBubble);
	},
	
	closeBubble: function() {
		var ypin = this.proprietary_marker;
		ypin.closeSmartWindow();
	},

	hide: function() {
		this.proprietary_marker.hide();
	},

	show: function() {
		this.proprietary_marker.unhide();
	},

	update: function() {
		throw 'Not implemented';
	}
	
},

Polyline: {

	toProprietary: function() {		
		var ypolyline;
		var ypoints = [];
		for (var i = 0, length = this.points.length ; i< length; i++){
			ypoints.push(this.points[i].toProprietary('yahoo'));
		}
		ypolyline = new YPolyline(ypoints,this.color,this.width,this.opacity);
		return ypolyline;
	},
	
	show: function() {
		throw 'Not implemented';
	},

	hide: function() {
		throw 'Not implemented';
	}
	
}

});