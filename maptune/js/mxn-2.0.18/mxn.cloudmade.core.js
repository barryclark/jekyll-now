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
mxn.register('cloudmade', {	

	Mapstraction: {

		init: function(element, api) {
			var me = this;
			var opts = {
				key: cloudmade_key
			};
			if (typeof cloudmade_styleId != "undefined"){
				opts.styleId = cloudmade_styleId;
			}
			var cloudmade = new CM.Tiles.CloudMade.Web(opts);
			this.maps[api] = new CM.Map(element, cloudmade);
			this.loaded[api] = true;

			CM.Event.addListener(this.maps[api], 'click', function(location,marker) {
				if ( marker && marker.mapstraction_marker ) {
					marker.mapstraction_marker.click.fire();
				}
				else if ( location ) {
					me.click.fire({'location': new mxn.LatLonPoint(location.lat(), location.lng())});
				}

				// If the user puts their own Google markers directly on the map
				// then there is no location and this event should not fire.
				if ( location ) {
					me.clickHandler(location.lat(),location.lng(),location,me);
				}
			});
			CM.Event.addListener(this.maps[api], 'dragend', function() {
				me.endPan.fire();
			});
			CM.Event.addListener(this.maps[api], 'zoomend', function() {
				me.changeZoom.fire();
			});
		},

		applyOptions: function(){
			var map = this.maps[this.api];
			if (this.options.enableScrollWheelZoom) {
				map.enableScrollWheelZoom();
			}
			else {
				map.disableScrollWheelZoom();
			}
		},

		resizeTo: function(width, height){	
			this.maps[this.api].checkResize();
		},

		addControls: function( args ) {
			var map = this.maps[this.api];

			var c = this.addControlsArgs;
			switch (c.zoom) {
				case 'large':
					this.addLargeControls();
					break;
				case 'small':
					this.addSmallControls();
					break;
			}

			if (c.map_type) {
				this.addMapTypeControls();
			}
			if (c.scale) {
				map.addControl(new CM.ScaleControl());
				this.addControlsArgs.scale = true;
			}
		},

		addSmallControls: function() {
			var map = this.maps[this.api];
			map.addControl(new CM.SmallMapControl());
			this.addControlsArgs.zoom = 'small';
		},

		addLargeControls: function() {
			var map = this.maps[this.api];
			map.addControl(new CM.LargeMapControl());
			this.addControlsArgs.zoom = 'large';
		},

		addMapTypeControls: function() {
			var map = this.maps[this.api];
			map.addControl(new CM.TileLayerControl());
			this.addControlsArgs.map_type = true;
		},

		dragging: function(on) {
			var map = this.maps[this.api];

			if (on) {
				map.enableDragging();
			} else {
				map.disableDragging();
			}
		},

		setCenterAndZoom: function(point, zoom) { 
			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			map.setCenter(pt, zoom);

		},

		addMarker: function(marker, old) {
			var map = this.maps[this.api];
			var pin = marker.toProprietary(this.api);
			map.addOverlay(pin);
			return pin;
		},

		removeMarker: function(marker) {
			var map = this.maps[this.api];
			marker.proprietary_marker.closeInfoWindow();
			map.removeOverlay(marker.proprietary_marker);
		},
		
		declutterMarkers: function(opts) {
			var map = this.maps[this.api];

			// TODO: Add provider code
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
			var pt = map.getCenter();

			return new mxn.LatLonPoint(pt.lat(), pt.lng());
		},

		setCenter: function(point, options) {
			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			if(options !== null && options.pan) { map.panTo(pt); }
			else { map.setCenter(pt); }
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

			var zoom = map.getBoundsZoomLevel(new CM.LatLngBounds(sw.toProprietary(this.api), ne.toProprietary(this.api)));
			return zoom;
		},

		setMapType: function(type) {
			var map = this.maps[this.api];

			// TODO: Are there any MapTypes for Cloudmade?

			switch(type) {
				case mxn.Mapstraction.ROAD:
					// TODO: Add provider code
					break;
				case mxn.Mapstraction.SATELLITE:
					// TODO: Add provider code
					break;
				case mxn.Mapstraction.HYBRID:
					// TODO: Add provider code
					break;
				default:
					// TODO: Add provider code
			}	 
		},

		getMapType: function() {
			var map = this.maps[this.api];

			// TODO: Are there any MapTypes for Cloudmade?

			return mxn.Mapstraction.ROAD;
			//return mxn.Mapstraction.SATELLITE;
			//return mxn.Mapstraction.HYBRID;

		},

		getBounds: function () {
			var map = this.maps[this.api];

			var box = map.getBounds();
			var sw = box.getSouthWest();
			var ne = box.getNorthEast();

			return new mxn.BoundingBox(sw.lat(), sw.lng(), ne.lat(), ne.lng());
		},

		setBounds: function(bounds){
			var map = this.maps[this.api];
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();

			map.zoomToBounds(new CM.LatLngBounds(sw.toProprietary(this.api), ne.toProprietary(this.api)));
		},

		addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
			var map = this.maps[this.api];

			// TODO: Add provider code
		},

		setImagePosition: function(id, oContext) {
			var map = this.maps[this.api];
			var topLeftPoint; var bottomRightPoint;

			// TODO: Add provider code

		},

		addOverlay: function(url, autoCenterAndZoom) {
			var map = this.maps[this.api];

			// TODO: Add provider code

		},

		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom) {
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
			var cll = new CM.LatLng(this.lat,this.lon);
			return cll;
		},

		fromProprietary: function(point) {
			this.lat = point.lat();
			this.lon = point.lng();
		}

	},

	Marker: {

		toProprietary: function() {
			var pt = this.location.toProprietary(this.api);
			var options = {};

			if (this.iconUrl) {
				var cicon = new CM.Icon();
				cicon.image = this.iconUrl;
				if (this.iconSize) {
					cicon.iconSize = new CM.Size(this.iconSize[0], this.iconSize[1]);
					if (this.iconAnchor) {
						cicon.iconAnchor = new CM.Point(this.iconAnchor[0], this.iconAnchor[1]);
					}
				}
				if (this.iconShadowUrl) {
					cicon.shadow = this.iconShadowUrl;
					if (this.iconShadowSize) {
						cicon.shadowSize = new CM.Size(this.iconShadowSize[0], this.iconShadowSize[1]);
					}
				}
				options.icon = cicon;
			}
			if (this.labelText) {
				options.title = this.labelText;
			}
			var cmarker = new CM.Marker(pt, options);

			if (this.infoBubble) {
				cmarker.bindInfoWindow(this.infoBubble);
			}


			return cmarker;
		},

		openBubble: function() {		
			var pin = this.proprietary_marker;
			pin.openInfoWindow(this.infoBubble);
		},

		hide: function() {
			var pin = this.proprietary_marker;
			pin.hide();
		},

		show: function() {
			var pin = this.proprietary_marker;
			pin.show();
		},

		update: function() {
			// TODO: Add provider code
		}

	},

	Polyline: {

		toProprietary: function() {
			var pts = [];
			var poly;

			for (var i = 0,  length = this.points.length ; i< length; i++){
				pts.push(this.points[i].toProprietary(this.api));
			}
			if (this.closed || pts[0].equals(pts[pts.length-1])) {
				poly = new CM.Polygon(pts, this.color, this.width, this.opacity, this.fillColor || "#5462E3", this.opacity || "0.3");
			}
			else {
				poly = new CM.Polyline(pts, this.color, this.width, this.opacity);
			}
			return poly;
		},

		show: function() {
			this.proprietary_polyline.show();
		},

		hide: function() {
			this.proprietary_polyline.hide();
		}

	}

});
