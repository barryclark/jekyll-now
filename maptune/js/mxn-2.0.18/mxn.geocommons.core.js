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
mxn.register('geocommons', {

	Mapstraction: {

		init: function(element, api) {
			var me = this;
			this.element = element;
			this.loaded[this.api] = false; // Loading will take a little bit.
			
			this.maps[api] = new F1.Maker.Map({
				dom_id: this.element.id,
				map_id: 143049,
				uiLayers: false,
				flashvars: {},
				onMapLoaded: function(map){
					me.loaded[me.api] = true;
					var num_events = me.onload[me.api].length;
					for (var i = 0; i < num_events; i++) {
						me.onload[me.api][i]();
					}
					me.load.fire();
				},
				onMapPanStop: function() {
					me.endPan.fire();
				},
				onMapZoomed: function() {
					me.changeZoom.fire();
				},
				onFeatureSelected: function() {
					me.click.fire();
				}

			});
			
		},

		applyOptions: function(){
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		resizeTo: function(width, height){
			var map = this.maps[this.api];
			map.setSize(width,height);
		},

		addControls: function( args ) {
			var map = this.maps[this.api];
			map.setMapStyle({zoom: {visible: args.zoom || false, expanded: (args.zoom == 'large')}});
			map.setMapStyle({layers: {visible: args.layers || false}});
			map.setMapStyle({legend: {visible: args.legend || false, expanded: true}});
		},

		addSmallControls: function() {
			var map = this.maps[this.api];
			this.addControls({
				zoom:   'small',
				legend: "open"
			});
			
		},

		addLargeControls: function() {
			var map = this.maps[this.api];
			this.addControls({
				zoom:   'large',
				layers: true,
				legend: "open"
			});
		},

		addMapTypeControls: function() {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		dragging: function(on) {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		setCenterAndZoom: function(point, zoom) {
			var map = this.maps[this.api];
			map.setCenterZoom(point.lat, point.lon,zoom);
		},

		getCenter: function() {
			var map = this.maps[this.api];
			var point = map.getCenterZoom()[0];
			return new mxn.LatLonPoint(point.lat,point.lon);
		},

		setCenter: function(point, options) {
			var map = this.maps[this.api];
			map.setCenter(point.lat, point.lon);
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
			var zoom;

			// TODO: Add provider code

			return zoom;
		},

		setMapType: function(type) {
			var map = this.maps[this.api];
			switch(type) {
				case mxn.Mapstraction.ROAD:
					map.setBasemap("openstreetmap");
					break;
				case mxn.Mapstraction.SATELLITE:
					map.setBasemap("nasabluemarble");
					break;
				case mxn.Mapstraction.TERRAIN:
					map.setBasemap("acetateterrain");
					break;
				case mxn.Mapstraction.HYBRID:
					map.setBasemap("googlehybrid");
					break;
				default:
					map.setBasemap(type);
			}
		},

		getMapType: function() {
			var map = this.maps[this.api];
			
			// TODO: I don't thick this is correct -Derek
			switch(map.getBasemap().name) {
				case "openstreetmap":
					return mxn.Mapstraction.ROAD;
				case "nasabluemarble":
					return mxn.Mapstraction.SATELLITE;
				case "acetateterrain":
					return mxn.Mapstraction.TERRAIN;
				case "googlehybrid":
					return mxn.Mapstraction.HYBRID;
				default:
					return null;
			}
		},

		getBounds: function () {
			var map = this.maps[this.api];
			var extent = map.getExtent();
			return new mxn.BoundingBox( extent.northWest.lat, extent.southEast.lon, extent.southEast.lat, extent.northWest.lon);
		},

		setBounds: function(bounds){
			var map = this.maps[this.api];
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();
			map.setExtent(sw.lon,sw.lat,ne.lon,ne.lat);

		},

		addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},
		
		// URL in this case is either a Maker map ID or the full URL to the Maker Map
		addOverlay: function(url, autoCenterAndZoom) {
			var map = this.maps[this.api];
			var match;

			if(typeof(url) === "number") {
				map.loadMap(url);
				return;
			}
			// Try if we've been given either a string of the ID or a URL
			match = url.match(/^(\d+)$/);
			if(match !== null){
				match = url.match(/^.*?maps\/(\d+)(\?\(\[?(.*?)\]?\))?$/);
			}

			map.loadMap(match[1]);
		},

		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom) {
			var map = this.maps[this.api];

			map.addLayer({source: "tile:" + tile_url, styles: {fill: {opacity: opacity || 1.0}}});
		},

		toggleTileLayer: function(tile_url) {
			var map = this.maps[this.api];

			var layers = map.getLayers();
			for(var i = 0; i < layers.length; ++i) {
				if(layers[i].source == "tile:" + tile_url) {
					map.showLayer(layers[i].guid, !layers[i].visible);
				}
			}
		},

		getPixelRatio: function() {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		mousePosition: function(element) {
			var map = this.maps[this.api];

				// TODO: Add provider code
		},
		addMarker: function(marker, old) {
			var map = this.maps[this.api];
			var pin = marker.toProprietary(this.api);
			// TODO: Add provider code
			// map.addOverlay(pin);
			var layers = map.getLayers();
			for(var i = 0; i < layers.length; ++i) {
				if(layers[i].title == "Edit Layer") {
					map.addFeatures(layers[i].guid, [pin], false);
					map.addLayerInfoWindowFilter(layers[i].guid, {title: "$[title]", tabs: [{type: "text", title: "About", value: "$[infoBubble]"}]});
				}
			}
			
			return pin;
		},

		removeMarker: function(marker) {
			var map = this.maps[this.api];
			// TODO: Add provider code

		},

		declutterMarkers: function(opts) {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		addPolyline: function(polyline, old) {
			var map = this.maps[this.api];
			var pl = polyline.toProprietary(this.api);
			// TODO: Add provider code
			// map.addOverlay(pl);
			return pl;
		},

		removePolyline: function(polyline) {
			var map = this.maps[this.api];
			// TODO: Add provider code
		}
		
	},

	LatLonPoint: {

		toProprietary: function() {
			// GeoJSON
			return {type: "Point", coordinates: [this.lon,this.lat]};
		},

		fromProprietary: function(point) {
			this.lon = point.coordinates[0];
			this.lat = point.coordinates[1];
		}

	},

	Marker: {

		toProprietary: function() {
			return {title: this.labelText || "", infoBubble: this.infoBubble || "", geometry: this.location.toProprietary('geocommons')};
		},

		openBubble: function() {
			// TODO: Add provider code
		},
		closeBubble: function() {
			// TODO: Add provider code
		},


		hide: function() {
			// TODO: Add provider code
		},

		show: function() {
			// TODO: Add provider code
		},

		update: function() {
			// TODO: Add provider code
		}

	},

	Polyline: {

		toProprietary: function() {
			return {};
			// TODO: Add provider code
		},

		show: function() {
			// TODO: Add provider code
		},

		hide: function() {
			// TODO: Add provider code
		}

	}

});