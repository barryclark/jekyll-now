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
mxn.register('openspace', {

Mapstraction: {

	init: function(element, api) {
		var me = this;
		// create the map with no controls and don't centre popup info window
		this.maps[api] = new OpenSpace.Map(element,{
				controls: [],
				centreInfoWindow: false
		});
		// note that these three controls are always there and the fact that 
		// there are three resident controls is used in addControls()
		// enable map drag with mouse and keyboard
		this.maps[api].addControl(new OpenLayers.Control.Navigation());
		this.maps[api].addControl(new OpenLayers.Control.KeyboardDefaults());
		// include copyright statement
		this.maps[api].addControl(new OpenSpace.Control.CopyrightCollection());
		
		this.maps[api].events.register(
			"click", 
			this.maps[api],
			function(evt) {
				var point = this.getLonLatFromViewPortPx( evt.xy );
				// convert to LatLonPoint
				var llPoint = new mxn.LatLonPoint();
				llPoint.fromProprietary(this.api, point);
				me.clickHandler( llPoint.lat, llPoint.lon );
				return false;
			}
		);
		this.loaded[api] = true;
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
	
		// TODO: Add provider code
	},
	
	resizeTo: function(width, height){
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
		this.maps[this.api].updateSize();
	},
	
	addControls: function( args ) {
		var map = this.maps[this.api];
		// remove existing controls but leave the basic navigation,	keyboard 
		// and copyright controls in place these were added in addAPI and not 
		// normally be removed
		for (var i = map.controls.length; i>3; i--) {
			map.controls[i-1].deactivate();
			map.removeControl(map.controls[i-1]);
		}
		// pan and zoom controls not available separately
		if ( args.zoom == 'large') {
			map.addControl(new OpenSpace.Control.LargeMapControl());
		}
		else if ( args.zoom == 'small' || args.pan ) {
			map.addControl(new OpenSpace.Control.SmallMapControl());
		}
		if ( args.overview ) {
			// this should work but as of OpenSpace 0.7.2 generates an error
			// unless done before setCenterAndZoom
			var osOverviewControl = new OpenSpace.Control.OverviewMap();
			map.addControl(osOverviewControl);
			osOverviewControl.maximizeControl();
		}
		if ( args.map_type ) {
			// this is all you get with openspace, a control to switch on or
			// off the layers and markers
			// probably not much use to anybody
			map.addControl(new OpenLayers.Control.LayerSwitcher());
		}
	},
	
	addSmallControls: function() {
		var map = this.maps[this.api];
		map.addControl(new OpenSpace.Control.SmallMapControl());
	},
	
	addLargeControls: function() {
		var map = this.maps[this.api];
		map.addControl(new OpenSpace.Control.LargeMapControl());
	},
	
	addMapTypeControls: function() {
		var map = this.maps[this.api];
	
		// TODO: Add provider code
	},
	
	setCenterAndZoom: function(point, zoom) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
	
		var oszoom = zoom-6;
		if (oszoom<0) {
			oszoom = 0;
		}
		else if (oszoom>10) {
			oszoom = 10;
		}
		map.setCenter(pt, oszoom);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var pin = marker.toProprietary(this.api);
	
		map.addOverlay(pin);
	
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

		return pl;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
	
		// TODO: Add provider code
	},
	
	getCenter: function() {
		var point;
		var map = this.maps[this.api];
	
		var pt = map.getCenter(); // an OpenSpace.MapPoint,
							  // UK National Grid
		point = new mxn.LatLonPoint();
		point.fromOpenSpace(pt);  // convert to LatLonPoint
	
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		if(options && options.pan) {
			map.setCenter(pt.toProprietary(this.api));
		}
		else {
			map.setCenter(pt.toProprietary(this.api));
		}
	},
	
	setZoom: function(zoom) {
		var map = this.maps[this.api];
	
		var oszoom = zoom-6;
		if (oszoom<0) {
			oszoom = 0;
	}
	else if (oszoom>10) {
			oszoom = 10;
	}
	map.zoomTo(oszoom);
	
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		var zoom;
	
		zoom = map.zoom + 6;  // convert to equivalent google zoom
	
		return zoom;
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast();
		var sw = bbox.getSouthWest();
		var zoom;
	
		var obounds = new OpenSpace.MapBounds();
		obounds.extend(new mxn.LatLonPoint(sw.lat,sw.lon).toProprietary(this.api));
		obounds.extend(new mxn.LatLonPoint(ne.lat,ne.lon).toProprietary(this.api));
		zoom = map.getZoomForExtent(obounds) + 6; // get it and adjust to equivalent google zoom
	
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
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
	
		// TODO: Add provider code
		//return mxn.Mapstraction.ROAD;
		//return mxn.Mapstraction.SATELLITE;
		//return mxn.Mapstraction.HYBRID;
	},

	getBounds: function () {
		var map = this.maps[this.api];

		// array of openspace coords	
		// left, bottom, right, top
		var olbox = map.calculateBounds().toArray(); 
		var ossw = new OpenSpace.MapPoint( olbox[0], olbox[1] );
		var osne = new OpenSpace.MapPoint( olbox[2], olbox[3] );
		// convert to LatLonPoints
		var sw = new mxn.LatLonPoint();
		sw.fromOpenSpace(ossw);
		var ne = new mxn.LatLonPoint();
		ne.fromOpenSpace(osne);
		return new mxn.BoundingBox(sw.lat, sw.lon, ne.lat, ne.lon);
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
	
		var obounds = new OpenSpace.MapBounds();
		obounds.extend(new mxn.LatLonPoint(sw.lat,sw.lon).toProprietary(this.api));
		obounds.extend(new mxn.LatLonPoint(ne.lat,ne.lon).toProprietary(this.api));
		map.zoomToExtent(obounds);	
	},

	addImageOverlay: function(id, src, opacity, west, south, east,
				  north, oContext) {
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

		try {
			map.events.register('mousemove', map, function (e) {
				var lonLat = map.getLonLatFromViewPortPx(e.xy);
				var lon = lonLat.lon * (180.0 / 20037508.34);
				var lat = lonLat.lat * (180.0 / 20037508.34);
				lat = (180/Math.PI)*(2*Math.atan(Math.exp(lat*Math.PI/180))-(Math.PI/2));
				var loc = numFormatFloat(lat,4) + ' / ' + numFormatFloat(lon,4);
				   // numFormatFloat(X,4) simply formats floating point 'X' to
				   // 4 dec places
				locDisp.innerHTML = loc;
			});
			locDisp.innerHTML = '0.0000 / 0.0000';
		} catch (x) {
				alert("Error: " + x);
		}
	
		// TODO: Add provider code
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		var lonlat = new OpenLayers.LonLat(this.lon, this.lat);
		// need to convert to UK national grid
		var gridProjection = new OpenSpace.GridProjection();
		return gridProjection.getMapPointFromLonLat(lonlat); 
		// on OpenSpace.MapPoint
	
	},
	
	fromProprietary: function(osPoint) {
		var gridProjection = new OpenSpace.GridProjection();
		var olpt = gridProjection.getLonLatFromMapPoint(osPoint); 
		// an OpenLayers.LonLat
		this.lon = olpt.lon;
		this.lat = olpt.lat;
	}
	
},

Marker: {
	
	toProprietary: function() {
		var size, anchor, icon;
		if(this.iconSize) {
			size = new OpenLayers.Size(this.iconSize[0],
					   this.iconSize[1]);
		}
		else {
			size = new OpenLayers.Size(20,25);
		}
	
		if(this.iconAnchor) {
			anchor = new OpenLayers.Pixel(this.iconAnchor[0],
					  this.iconAnchor[1]);
		}
		else {
			// FIXME: hard-coding the anchor point
			anchor = new OpenLayers.Pixel(-(size.w/2), -size.h);
		}
	
		if(this.iconUrl) {
			icon = new OpenSpace.Icon(this.iconUrl, size, anchor);
		}
		else { // leave at default OpenSpace icon
		}
	
		// This requires an OpenLayers specific hack, doesn't work when
		// not including OpenLayers.js
		OpenLayers.Marker.Label(this.location.toProprietary(this.api), icon,
				this.labelText, {mouseOver:true,tooltipsFormat:true});
		
		var marker = new OpenLayers.Marker(this.location.toProprietary(this.api), icon);
		
		return marker;
	},

	openBubble: function() {
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
		var ospolyline;
		var ospoints = [];
		for (var i = 0, length = this.points.length ; i< length; i++){
			// convert each point to OpenSpace.MapPoint
			var ospoint = this.points[i].toProprietary(this.api);
			var olgpoint = new OpenLayers.Geometry.Point(ospoint.getEasting(),ospoint.getNorthing());
			ospoints.push(olgpoint);
		}
		if (this.closed) {
			ospolyline = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.LinearRing(ospoints), 
				null,
				{
					fillColor: this.color,
					strokeColor: this.color,
					strokeOpacity: this.opacity,
					fillOpacity: this.opacity,
					strokeWidth: this.width
				}
			);
		}
		else {
			ospolyline = new OpenLayers.Feature.Vector(
				new	OpenLayers.Geometry.LineString(ospoints),
				null, 
				{
				   fillColor: 0,
				   strokeColor: this.color,
				   strokeOpacity: this.opacity,
				   fillOpacity: 0,
				   strokeWidth: this.width
				}
			);
		}
		return ospolyline;
	},
	
	show: function() {
		// TODO: Add provider code
	},
	
	hide: function() {
		// TODO: Add provider code
	}
	
}
	
});