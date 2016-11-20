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
mxn.register('ovi', {

Mapstraction: {

	init: function(element, api) {
		var me = this;
		var ovi_map;
		var mapLoaded = false;
		
		var eventStates = {
			"center": false,
			"zoom": false,
			"mapsize": false
		};
		
		if (ovi.mapsapi) {
			ovi_map = new ovi.mapsapi.map.Display (element);
			ovi_map.addComponent(new ovi.mapsapi.map.component.InfoBubbles());
			ovi_map.addComponent(new ovi.mapsapi.map.component.Behavior());

			// Handle click event
			ovi_map.addListener('click', function(event){
				coords = ovi_map.pixelToGeo(event.targetX, event.targetY);
				me.click.fire({'location': new mxn.LatLonPoint(coords.latitude, coords.longitude)});
			});

			// Handle endPan (via centre change) and zoom events
			// the Ovi Maps API doesn't have a discrete event for each of these events
			// instead it uses a start/update/end sequence of events, where update may happen
			// multiple times or not at all, so we need to keep track of which Ovi events have
			// fired during a start(/update) event sequence and then fire the relevent Mapstraction
			// events upon receiving the Ovi end event
			ovi_map.addListener('mapviewchangestart', function(event){
				if (event.data & event.MAPVIEWCHANGE_CENTER) {
					eventStates.center = true;
				}
				if (event.data & event.MAPVIEWCHANGE_ZOOM) {
					eventStates.zoom = true;
				}
				if (event.data & event.MAPVIEWCHANGE_SIZE) {
					eventStates.mapsize = true;
				}
			});

			ovi_map.addListener('mapviewchangeupdate', function(event){
				if (event.data & event.MAPVIEWCHANGE_CENTER) {
					eventStates.center = true;
				}
				if (event.data & event.MAPVIEWCHANGE_ZOOM) {
					eventStates.zoom = true;
				}
				if (event.data & event.MAPVIEWCHANGE_SIZE) {
					eventStates.mapsize = true;
				}
			});

			ovi_map.addListener('mapviewchangeend', function(event){
				// The Ovi Maps API doesn't support a "map loaded" event, but both a
				// "centre" and "size" mapviewchangestart/mapviewchangeupdate/mapviewchangeend
				// event sequence will be fired as part of the initial loading so we can trap
				// this and fire the MXN "load" event.
				
				if (!mapLoaded) {
					if (eventStates.center && eventStates.mapsize) {
						mapLoaded = true;
						eventStates.mapsize = false;
						me.load.fire();
					}
				} 
				else {
				    if (eventStates.center) {
						eventStates.center = false;
						me.moveendHandler(me);
						me.endPan.fire();
				    }
				}
				
				if (eventStates.zoom) {
					eventStates.zoom = false;
					me.changeZoom.fire();
				}
			});

			this.maps[api] = ovi_map;
			this.loaded[api] = true;
		}
		
		else {
			alert(api + ' map script not imported');
		}
	},
	
	applyOptions: function() {
		var map = this.maps[this.api];
		
		if (this.options.enableScrollWheelZoom) {
			map.addComponent(new ovi.mapsapi.map.component.zoom.MouseWheel());
		} 
		else {
			var mousewheel = map.getComponentById('zoom.MouseWheel');
			if (mousewheel) {
				map.removeComponent(mousewheel);
			}
		}	
	},
	
	resizeTo: function(width, height) {
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
	},
	
	addControls: function(args) {
		/* args = { 
		 *     pan:      true,
		 *     zoom:     'large' || 'small',
		 *     overview: true,
		 *     scale:    true,
		 *     map_type: true,
		 * }
		 */

		var map = this.maps[this.api];
		
		if (args.pan) {
			map.addComponent(new ovi.mapsapi.map.component.Behavior());
		}
		
		// TODO: The Ovi Maps API doesn't currently differentiate between large and small
		// style of Zoom controls so, for now, make them functionally equivalent
		if (args.zoom == 'large' || args.zoom == 'small') {
			map.addComponent(new ovi.mapsapi.map.component.ZoomBar());
		}
		
		if (args.overview) {
			map.addComponent(new ovi.mapsapi.map.component.Overview());
		}
		
		if (args.scale) {
			map.addComponent(new ovi.mapsapi.map.component.ScaleBar ());
		}
		
		if (args.map_type) {
			map.addComponent(new ovi.mapsapi.map.component.TypeSelector ());
		}
	},

	// TODO: The Ovi Maps API doesn't currently differentiate between large and small
	// style of Zoom controls so, for now, make them functionally equivalent
	addSmallControls: function() {
		var map = this.maps[this.api];
		map.addComponent(new ovi.mapsapi.map.component.ZoomBar());
	},
	
	addLargeControls: function() {
		var map = this.maps[this.api];
		map.addComponent(new ovi.mapsapi.map.component.ZoomBar());
	},
	
	addMapTypeControls: function() {
		var map = this.maps[this.api];
		
		map.addComponent(new ovi.mapsapi.map.component.TypeSelector ());
	},
	
	setCenterAndZoom: function(point, zoom) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		
		map.setCenter(pt);
		map.setZoomLevel(zoom);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var ovi_marker = marker.toProprietary(this.api);
		
		map.objects.add(ovi_marker);
		return ovi_marker;
	},
	
	removeMarker: function(marker) {
		var map = this.maps[this.api];
		
		map.objects.remove(marker.proprietary_marker);
	},
	
	declutterMarkers: function(opts) {
		throw 'Not supported';
	},
	
	addPolyline: function(polyline, old) {
		var map = this.maps[this.api];
		var ovi_polyline = polyline.toProprietary(this.api);

		map.objects.add(ovi_polyline);
		return ovi_polyline;
	},
	
	removePolyline: function(polyline) {
		var map = this.maps[this.api];

		map.objects.remove(polyline.proprietary_polyline);
	},
	
	getCenter: function() {
		var map = this.maps[this.api];
		
		return new mxn.LatLonPoint(map.center.latitude, map.center.longitude);
	},
	
	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);

		map.setCentre(pt);
	},
	
	setZoom: function(zoom) {
		var map = this.maps[this.api];
		
		map.setZoomLevel(zoom);
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		
		return map.zoomLevel;
	},
	
	getZoomLevelForBoundingBox: function(bbox) {
		var map = this.maps[this.api];
		var sw = bbox.getSouthWest().toProprietary(this.api);
		var ne = bbox.getNorthEast().toProprietary(this.api);
		var ovi_bb = new ovi.mapsapi.geo.BoundingBox(sw, ne);
		
		return map.getBestZoomLevel(ovi_bb);
	},
	
	setMapType: function(type) {
		var map = this.maps[this.api];
		
		switch (type) {
			case mxn.Mapstraction.ROAD:
				map.set("baseMapType", map.NORMAL);
				break;
			case mxn.Mapstraction.PHYSICAL:
				map.set("baseMapType", map.TERRAIN);
				break;
			case mxn.Mapstraction.HYBRID:
				throw 'Not implemented';
			case mxn.Mapstraction.SATELLITE:
				map.set("baseMapType", map.SATELLITE);
				break;
			default:
				map.set("baseMapType", map.NORMAL);
				break;
		}	// end-switch ()
	},
	
	getMapType: function() {
		var map = this.maps[this.api];
		var type = map.baseMapType;
		
		switch(type) {
			case map.NORMAL:
				return mxn.Mapstraction.ROAD;
			case map.TERRAIN:
				return mxn.Mapstraction.PHYSICAL;
			case map.SATELLITE:
				return mxn.Mapstraction.SATELLITE;
			default:
				return null;
		}	// end-switch ()
	},
	
	getBounds: function() {
		var map = this.maps[this.api];
		var bbox = map.getViewBounds();
		var nw = bbox.topLeft;
		var se = bbox.bottomRight;
		
		return new mxn.BoundingBox(se.latitude, nw.longitude, nw.latitude, se.longitude);
	},
	
	setBounds: function(bounds) {
		var map = this.maps[this.api];

		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();

		var nw = new mxn.LatLonPoint(ne.lat, sw.lon).toProprietary(this.api);
		var se = new mxn.LatLonPoint(sw.lat, ne.lon).toProprietary(this.api);
		var ovi_bb = new ovi.mapsapi.geo.BoundingBox(nw, se);
		var keepCentre = false;
		map.zoomTo(ovi_bb, keepCentre);
	},
	
	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		throw 'Not implemented';
	},
	
	setImagePosition: function(id, oContext) {
		throw 'Not implemented';
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		throw 'Not implemented';
	},
	
	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
		throw 'Not implemented';
	},
	
	toggleTileLayer: function(tile_url) {
		throw 'Not implemented';
	},
	
	getPixelRatio: function() {
		throw 'Not implemented';
	},
	
	mousePosition: function(element) {
		var map = this.maps[this.api];
		var locDisp = document.getElementById(element);
		var coords;
		
		if (locDisp !== null) {
			map.addListener('mousemove', function(event){
				coords = map.pixelToGeo(event.targetX, event.targetY);
				locDisp.innerHTML = coords.latitude.toFixed(4) + ' / ' + coords.longitude.toFixed(4);
			});		
			locDisp.innerHTML = '0.0000 / 0.0000';
		}
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new ovi.mapsapi.geo.Coordinate(this.lat, this.lon);
	},
	
	fromProprietary: function(oviCoordinate) {
		this.lat = oviCoordinate.latitude;
		this.lon = oviCoordinate.longitude;
	}
},

Marker: {
	
	toProprietary: function() {
		var properties = [];
		var self = this;
		
		if (this.iconAnchor) {
			properties.anchor = [this.iconAnchor[0], this.iconAnchor[1]];
		}
		if (this.iconUrl) {
			properties.icon = this.iconUrl;
		}

		this.proprietary_infobubble = null;

		var prop_marker = new ovi.mapsapi.map.Marker(
				self.location.toProprietary('ovi'),
				properties);

		if (this.infoBubble) {
			var event_action = "click";
			if (this.hover) {
				event_action = "mouseover";
			}
			prop_marker.addListener(event_action, function() {
				self.openBubble();
			});
		}

		if (this.draggable) {
			prop_marker.enableDrag();
			
			prop_marker.addListener("dragstart", function(event){
				var bc = self.map.getComponentById("InfoBubbles");

				if (bc.bubbleExists(self.proprietary_infobubble)) {
					self.closeBubble();
					prop_marker.set("restore_infobubble", true);
				}
			}, false);
			
			prop_marker.addListener("dragend", function(event){
				var xy = event.dataTransfer.getData("application/map-drag-object-offset");
				var new_coords = self.map.pixelToGeo(
					event.displayX - xy.x + prop_marker.anchor.x,
					event.displayY - xy.y + prop_marker.anchor.y
					);
				var bb = self.map.getBoundingBox();
				
				if (bb.contains(new_coords)) {
					self.location.lat = new_coords.latitude;
					self.location.lon = new_coords.longitude;
				}
				
				if (prop_marker.get("restore_infobubble")) {
					prop_marker.set("restore_infobubble", false);
					self.openBubble();
				}
			}, false);
		}

		return prop_marker;
	},
	
	openBubble: function() {
		if (!this.map) {
			throw 'This marker must be added to a map in order to manage a Bubble';
		}
		this.proprietary_infobubble = this.map.getComponentById("InfoBubbles").addBubble(this.infoBubble, this.location.toProprietary('ovi'));
	},
	
	closeBubble: function() {
		if (!this.map) {
			throw 'This marker must be added to a map in order to manage a Bubble';
		}

		if (this.map.getComponentById("InfoBubbles").bubbleExists(this.proprietary_infobubble)) {
			this.map.getComponentById("InfoBubbles").removeBubble(this.proprietary_infobubble);
		}
		this.proprietary_infobubble = null;
	},
	
	hide: function() {
		this.proprietary_marker.set('visibility', false);
	},
	
	show: function() {
		this.proprietary_marker.set('visibility', true);
	},
	
	update: function() {
		throw 'Not implemented';
	}
	
},

Polyline: {
	
	toProprietary: function() {
		var coords = [];
		
		for (var i=0, length=this.points.length; i<length; i++) {
			coords.push(this.points[i].toProprietary('ovi'));
		}
		
		if (this.closed || coords[0].equals(coords[length-1])) {
			var polycolor = new mxn.util.Color();

			polycolor.setHexColor(this.color || "#5462E3");

			var polycolor_rgba = "rgba(" + polycolor.red + "," + polycolor.green + "," +
				polycolor.blue + "," + (this.opacity || 1.0) + ")";
			var polygon_options = {
				'visibility' : true,
				'fillColor' : polycolor_rgba,
				'color' : this.color || "#5462E3",
				'stroke' : 'solid',
				'width' : this.width || 1
			};
			this.proprietary_polyline = new ovi.mapsapi.map.Polygon (coords, polygon_options);
		}
		
		else {
			var polyline_options = {
				'visibility' : true,
				'color' : this.color || "#5462E3",
				'stroke' : 'solid',
				'width' : this.width || 1
			};
			this.proprietary_polyline = new ovi.mapsapi.map.Polyline (coords, polyline_options);
		}
		
		return this.proprietary_polyline;
	},
	
	show: function() {
		this.proprietary_polyline.set('visibility', true);
	},
	
	hide: function() {
		this.proprietary_polyline.set('visibility', false);
	}
	
}
	
});