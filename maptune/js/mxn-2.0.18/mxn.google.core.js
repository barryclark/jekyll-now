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
mxn.register('google', {	

Mapstraction: {
	
	init: function(element,api) {		
		var me = this;
		if (GMap2) {
			if (GBrowserIsCompatible()) {
				this.maps[api] = new GMap2(element);

				GEvent.addListener(this.maps[api], 'click', function(marker,location) {
					
					if ( marker && marker.mapstraction_marker ) {
						marker.mapstraction_marker.click.fire();
					}
					else if ( location ) {
						me.click.fire({'location': new mxn.LatLonPoint(location.y, location.x)});
					}
					
					// If the user puts their own Google markers directly on the map
					// then there is no location and this event should not fire.
					if ( location ) {
						me.clickHandler(location.y,location.x,location,me);
					}
				});

				GEvent.addListener(this.maps[api], 'moveend', function() {
					me.moveendHandler(me);
					me.endPan.fire();
				});
				
				GEvent.addListener(this.maps[api], 'zoomend', function() {
					me.changeZoom.fire();
				});
				
				this.loaded[api] = true;
				me.load.fire();
			}
			else {
				alert('browser not compatible with Google Maps');
			}
		}
		else {
			alert(api + ' map script not imported');
		}	  
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
		
		if(this.options.enableScrollWheelZoom){
			map.enableContinuousZoom();
			map.enableScrollWheelZoom();
		}
		
		if (this.options.enableDragging) {
			map.enableDragging();
		} else {
			map.disableDragging();
		}
		
	},

	resizeTo: function(width, height){	
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
		this.maps[this.api].checkResize(); 
	},

	addControls: function( args ) {
		var map = this.maps[this.api];
	
		// remove old controls
		if (this.controls) {
			while ((ctl = this.controls.pop())) {
				// Google specific method
				map.removeControl(ctl);
			}
		} 
		else {
  			this.controls = [];
		}
		c = this.controls;
 
		// Google has a combined zoom and pan control.
		if (args.zoom || args.pan) {
			if (args.zoom == 'large'){ 
				this.addLargeControls();
			} else {
				this.addSmallControls();
			}
		}

		if (args.scale) {
			this.controls.unshift(new GScaleControl());
			map.addControl(this.controls[0]);
			this.addControlsArgs.scale = true;
		}
		
		if (args.overview) {
			c.unshift(new GOverviewMapControl()); 
			map.addControl(c[0]);
			this.addControlsArgs.overview = true;
		}
		if (args.map_type) {
 			this.addMapTypeControls();
		} 
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		this.controls.unshift(new GSmallMapControl());
		map.addControl(this.controls[0]);
		this.addControlsArgs.zoom = 'small';
		this.addControlsArgs.pan = true;
	},

	addLargeControls: function() {
		var map = this.maps[this.api];				
		this.controls.unshift(new GLargeMapControl());
		map.addControl(this.controls[0]);
		this.addControlsArgs.zoom = 'large';
		this.addControlsArgs.pan = true;
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];
		this.controls.unshift(new GMapTypeControl());
		map.addControl(this.controls[0]);
		this.addControlsArgs.map_type = true;
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.setCenter(pt, zoom); 
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var gpin = marker.toProprietary(this.api);
		map.addOverlay(gpin);
		
		GEvent.addListener(gpin, 'infowindowopen', function() {
			marker.openInfoBubble.fire();
		});
		GEvent.addListener(gpin, 'infowindowclose', function() {
			marker.closeInfoBubble.fire();
		});		
		return gpin;
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
		gpolyline = polyline.toProprietary(this.api);
		map.addOverlay(gpolyline);
		return gpolyline;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
		map.removeOverlay(polyline.proprietary_polyline);
	},

	getCenter: function() {
		var map = this.maps[this.api];
		var pt = map.getCenter();
		var point = new mxn.LatLonPoint(pt.lat(),pt.lng());
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		if(options && options.pan) { 
			map.panTo(pt); 
		}
		else { 
			map.setCenter(pt);
		}
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		map.setZoom(zoom);			  
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		return map.getZoom();
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast();
		var sw = bbox.getSouthWest();
		var gbox = new GLatLngBounds( sw.toProprietary(this.api), ne.toProprietary(this.api) );
		var zoom = map.getBoundsZoomLevel( gbox );
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
		switch(type) {
			case mxn.Mapstraction.ROAD:
				map.setMapType(G_NORMAL_MAP);
				break;
			case mxn.Mapstraction.SATELLITE:
				map.setMapType(G_SATELLITE_MAP);
				break;
			case mxn.Mapstraction.HYBRID:
				map.setMapType(G_HYBRID_MAP);
				break;
			case mxn.Mapstraction.PHYSICAL:
				map.setMapType(G_PHYSICAL_MAP);
				break;
			default:
				map.setMapType(type || G_NORMAL_MAP);
		}	 
	},

	getMapType: function() {
		var map = this.maps[this.api];
		var type = map.getCurrentMapType();
		switch(type) {
			case G_NORMAL_MAP:
				return mxn.Mapstraction.ROAD;
			case G_SATELLITE_MAP:
				return mxn.Mapstraction.SATELLITE;
			case G_HYBRID_MAP:
				return mxn.Mapstraction.HYBRID;
			case G_PHYSICAL_MAP:
				return mxn.Mapstraction.PHYSICAL;
			default:
				return null;
		}
	},

	getBounds: function () {
		var map = this.maps[this.api];
		var ne, sw, nw, se;
		var gbox = map.getBounds();
		sw = gbox.getSouthWest();
		ne = gbox.getNorthEast();
		return new mxn.BoundingBox(sw.lat(), sw.lng(), ne.lat(), ne.lng());
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var gbounds = new GLatLngBounds(new GLatLng(sw.lat,sw.lon),new GLatLng(ne.lat,ne.lon));
		map.setCenter(gbounds.getCenter(), map.getBoundsZoomLevel(gbounds)); 
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		var map = this.maps[this.api];
		map.getPane(G_MAP_MAP_PANE).appendChild(oContext.imgElm);
		this.setImageOpacity(id, opacity);
		this.setImagePosition(id);
		GEvent.bind(map, "zoomend", this, function() {
			this.setImagePosition(id);
		});
		GEvent.bind(map, "moveend", this, function() {
			this.setImagePosition(id);
		});
	},

	setImagePosition: function(id, oContext) {
		var map = this.maps[this.api];
		var topLeftPoint; var bottomRightPoint;

		topLeftPoint = map.fromLatLngToDivPixel( new GLatLng(oContext.latLng.top, oContext.latLng.left) );
		bottomRightPoint = map.fromLatLngToDivPixel( new GLatLng(oContext.latLng.bottom, oContext.latLng.right) );
		
		oContext.pixels.top = topLeftPoint.y;
		oContext.pixels.left = topLeftPoint.x;
		oContext.pixels.bottom = bottomRightPoint.y;
		oContext.pixels.right = bottomRightPoint.x;
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		var map = this.maps[this.api];
		var geoXML = new GGeoXml(url);
		if(autoCenterAndZoom) {
			GEvent.addListener( geoXML, 'load', function() { geoXML.gotoDefaultViewport(map); } );
		}
		map.addOverlay(geoXML);
	},

	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
		var copyright = new GCopyright(1, new GLatLngBounds(new GLatLng(-90,-180), new GLatLng(90,180)), 0, "copyleft");
		var copyrightCollection = new GCopyrightCollection(copyright_text);
		copyrightCollection.addCopyright(copyright);
		var tilelayers = [];
		tilelayers[0] = new GTileLayer(copyrightCollection, min_zoom, max_zoom);
		tilelayers[0].isPng = function() {
			return true;
		};
		tilelayers[0].getOpacity = function() {
			return opacity;
		};
		tilelayers[0].getTileUrl = function (a, b) {
			url = tile_url;
			url = url.replace(/\{Z\}/g,b);
			url = url.replace(/\{X\}/g,a.x);
			url = url.replace(/\{Y\}/g,a.y);
			return url;
		};
		if(map_type) {
			var tileLayerOverlay = new GMapType(tilelayers, new GMercatorProjection(19), copyright_text, {
				errorMessage:"More "+copyright_text+" tiles coming soon"
			});		
			this.maps[this.api].addMapType(tileLayerOverlay);
		} else {
			tileLayerOverlay = new GTileLayerOverlay(tilelayers[0]);
			this.maps[this.api].addOverlay(tileLayerOverlay);
		}		
		this.tileLayers.push( [tile_url, tileLayerOverlay, true] );
		return tileLayerOverlay;
	},

	toggleTileLayer: function(tile_url) {
		for (var f=0; f<this.tileLayers.length; f++) {
			if(this.tileLayers[f][0] == tile_url) {
				if(this.tileLayers[f][2]) {
					this.maps[this.api].removeOverlay(this.tileLayers[f][1]);
					this.tileLayers[f][2] = false;
				}
				else {
					this.maps[this.api].addOverlay(this.tileLayers[f][1]);
					this.tileLayers[f][2] = true;
				}
			}
		}	   
	},

	getPixelRatio: function() {
		var map = this.maps[this.api];

		var projection = G_NORMAL_MAP.getProjection();
		var centerPoint = map.getCenter();
		var zoom = map.getZoom();
		var centerPixel = projection.fromLatLngToPixel(centerPoint, zoom);
		// distance is the distance in metres for 5 pixels (3-4-5 triangle)
		var distancePoint = projection.fromPixelToLatLng(new GPoint(centerPixel.x + 3, centerPixel.y + 4), zoom);
		//*1000(km to m), /5 (pythag), *2 (radius to diameter)
		return 10000/distancePoint.distanceFrom(centerPoint);
	
	},
	
	mousePosition: function(element) {
		var locDisp = document.getElementById(element);
		if (locDisp !== null) {
			var map = this.maps[this.api];
			GEvent.addListener(map, 'mousemove', function (point) {
				var loc = point.lat().toFixed(4) + ' / ' + point.lng().toFixed(4);
				locDisp.innerHTML = loc;
			});
			locDisp.innerHTML = '0.0000 / 0.0000';
		}
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new GLatLng(this.lat,this.lon);
	},

	fromProprietary: function(googlePoint) {
		this.lat = googlePoint.lat();
		this.lon = googlePoint.lng();
	}
	
},

Marker: {
	
	toProprietary: function() {
		var me = this;
		var infoBubble, event_action, infoDiv, div;
		var options = {};
		if (this.labelText) {
			options.title =  this.labelText;
		}
		if (this.iconUrl) {
			var icon = new GIcon(G_DEFAULT_ICON, this.iconUrl);
			icon.printImage = icon.mozPrintImage = icon.image;
			if (this.iconSize) {
				icon.iconSize = new GSize(this.iconSize[0], this.iconSize[1]);
				var anchor;
				if (this.iconAnchor) {
					anchor = new GPoint(this.iconAnchor[0], this.iconAnchor[1]);
				}
				else {
					// FIXME: hard-coding the anchor point
					anchor = new GPoint(this.iconSize[0]/2, this.iconSize[1]/2);
				}
				icon.iconAnchor = anchor;
			}
			if (typeof(this.iconShadowUrl) != 'undefined') {
				icon.shadow = this.iconShadowUrl;
				if(this.iconShadowSize) {
					icon.shadowSize = new GSize(this.iconShadowSize[0], this.iconShadowSize[1]);
				}
			} 
			else {  // turn off shadow
  				icon.shadow = '';
				icon.shadowSize = '';
			}
			if (this.transparent) {
  				icon.transparent = this.transparent;
			}
			if (this.imageMap) {
  				icon.imageMap = this.imageMap;
			}
			options.icon = icon;
		}
		if (this.draggable) {
			options.draggable = this.draggable;
		}
		var gmarker = new GMarker( this.location.toProprietary('google'),options);
				
		if (this.infoBubble) {
			if (this.hover) {
				event_action = "mouseover";
			}
			else {
				event_action = "click";
			}
			GEvent.addListener(gmarker, event_action, function() {
				gmarker.openInfoWindowHtml(me.infoBubble, {
					maxWidth: 100
				});
			});
		}

		if (this.hoverIconUrl) {
			GEvent.addListener(gmarker, "mouseover", function() {
				gmarker.setImage(me.hoverIconUrl);
			});
			GEvent.addListener(gmarker, "mouseout", function() {
				gmarker.setImage(me.iconUrl);
			});
		}

		if (this.infoDiv) {
			if (this.hover) {
				event_action = "mouseover";
			}
			else {
				event_action = "click";
			}
			GEvent.addListener(gmarker, event_action, function() {
				document.getElementById(me.div).innerHTML = me.infoDiv;
			});
		}

		return gmarker;
	},

	openBubble: function() {
		var gpin = this.proprietary_marker;
		gpin.openInfoWindowHtml(this.infoBubble);
	},
	
	closeBubble: function() {
		var gpin = this.proprietary_marker;
		gpin.closeInfoWindow();
	},

	hide: function() {
		this.proprietary_marker.hide();
	},

	show: function() {
		this.proprietary_marker.show();
	},

	update: function() {
		point = new mxn.LatLonPoint();
		point.fromProprietary('google', this.proprietary_marker.getPoint());
		this.location = point;
	}
	
},

Polyline: {

	toProprietary: function() {
		var gpoints = [];
		for (var i = 0,  length = this.points.length ; i< length; i++){
			gpoints.push(this.points[i].toProprietary('google'));
		}
		if (this.closed	|| gpoints[0].equals(gpoints[length-1])) {
			return new GPolygon(gpoints, this.color, this.width, this.opacity, this.fillColor || "#5462E3", this.opacity || "0.3");
		} else {
			return new GPolyline(gpoints, this.color, this.width, this.opacity);
		}
	},
	
	show: function() {
		throw 'Not implemented';
	},

	hide: function() {
		throw 'Not implemented';
	}
}

});
