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
mxn.register('multimap', {	

Mapstraction: {
	
	init: function(element, api) {		
		var me = this;
		
		if (MultimapViewer) {
			if(this.debug){
				// multimap calls this print_debug function to output debug info
				window.print_debug = function(strMessage){
					var dbg = document.getElementById('debug');
					if(dbg){
						dbg.innerHTML += '<p>MUlTIMAP: ' + strMessage + '</p>';
					}
					else {
						alert(strMessage);
					}
				};
			}

			var map = new MultimapViewer(element);
			
			// Hook up our events
			map.addEventHandler('click', function(eventType, eventTarget, arg1, arg2, arg3){
				if (arg1) {
					me.clickHandler(arg1.lat, arg1.lon, me);
					me.click.fire({'location': new mxn.LatLonPoint(arg1.lat, arg1.lon)});
				}
			});
			
			map.addEventHandler('changeZoom', function(eventType, eventTarget, arg1, arg2, arg3){
				me.moveendHandler(me);
				me.changeZoom.fire();
			});
			
			map.addEventHandler('endPan', function(eventType, eventTarget, arg1, arg2, arg3){
				me.moveendHandler(me);
				me.endPan.fire();
			});
			
			map.addEventHandler('openInfoBox', function(eventType, eventTarget, arg1, arg2, arg3){
				if(arg1.mapstraction_marker) {
					arg1.mapstraction_marker.openInfoBubble.fire();
				}
			});
			
			map.addEventHandler('closeInfoBox', function(eventType, eventTarget, arg1, arg2, arg3){
				if(arg1.mapstraction_marker) {
					marker.closeInfoBubble.fire();
				}
			});
			
			this.maps[api] = map;
			this.loaded[api] = true;

		}
		else {
			alert(api + ' map script not imported');
		}
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
		
		if (this.options.enableScrollWheelZoom) {
			map.setOptions( { 'mousewheel:wheelup': 'zoomin', 'mousewheel:wheeldown': 'zoomout' } );
		}
		
		if (this.options.enableDragging) {
			map.setOption('drag', 'dragmap');
		} 
		else {
			map.setOption('drag', '');
		}
	},

	resizeTo: function(width, height){	
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
		this.maps[this.api].resize();
	},

	addControls: function( args ) {
		var map = this.maps[this.api];
		
		var pan_zoom_widget = 'MM';
		if (args.zoom && args.zoom == "small") {
			pan_zoom_widget = pan_zoom_widget + "Small";
		}
		if (args.pan) {
			pan_zoom_widget = pan_zoom_widget + "Pan";
		}
		if (args.zoom) {
			pan_zoom_widget = pan_zoom_widget + "Zoom";
		}
		pan_zoom_widget = pan_zoom_widget + "Widget";

		if (pan_zoom_widget != "MMWidget") {
			eval(' map.addWidget( new ' + pan_zoom_widget + '() );');
		}

		if ( args.map_type ) {
			map.addWidget( new MMMapTypeWidget() );
		}
		if ( args.overview ) {
			map.addWidget( new MMOverviewWidget() );
		}
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		
		smallPanzoomWidget = new MMSmallPanZoomWidget();
		map.addWidget( smallPanzoomWidget );
		this.addControlsArgs.pan = true;
		this.addControlsArgs.zoom = 'small';
	},

	addLargeControls: function() {
		var map = this.maps[this.api];
		
		panzoomWidget = new MMPanZoomWidget();
		map.addWidget( panzoomWidget );
		this.addControlsArgs.pan = true;  // keep the controls in case of swap
		this.addControlsArgs.zoom = 'large';
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];
		
		map.addWidget( new MMMapTypeWidget() );
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		
		// TODO: toProprietary() here?
		map.goToPosition( new MMLatLon( point.lat, point.lng ), zoom );
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var pin = marker.toProprietary(this.api);
				
        map.addOverlay(pin);
		
		return pin;
	},

	removeMarker: function(marker) {
		var map = this.maps[this.api];
		
		map.removeOverlay(marker.proprietary_marker);
	},
	
	declutterMarkers: function(opts) {
		var map = this.maps[this.api];
		
		map.declutterGroup(opts.groupName);
	},

	addPolyline: function(polyline, old) {
		var map = this.maps[this.api];
		var pl = polyline.toProprietary(this.api);
		
		map.addOverlay( pl );
		
		return pl;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
		
		polyline.proprietary_polyline.remove();
	},
	
	getCenter: function() {
		var point;
		var map = this.maps[this.api];
		
		var mmPt = map.getCurrentPosition();
        point = new mxn.LatLonPoint();
		point.fromProprietary(this.api, mmPt);
		
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		if(options && options.pan) { 
			map.panToPosition(pt);
		}
		else { 
			map.goToPosition(pt);
		}
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		
		map.setZoomFactor(zoom);		
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		var zoom;
		
		zoom = map.getZoomFactor();
		
		return zoom;
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast();
		var sw = bbox.getSouthWest();
		var zoom;
		
		var mmlocation = map.getAutoScaleLocation( [sw.toProprietary(this.api), ne.toProprietary(this.api)] );
		zoom = mmlocation.zoom_factor;
		
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];		
		var defaultType = null;
		var requiredType = null;
		var typeWeWillUse = null;
		
		// check we can map the type
		switch (type) {
			case mxn.Mapstraction.ROAD:
				requiredType = MM_WORLD_MAP;
				break;
			case mxn.Mapstraction.SATELLITE: 
				requiredType = MM_WORLD_AERIAL;
				break;
			case mxn.Mapstraction.HYBRID: 
				requiredType = MM_WORLD_HYBRID;
				break;
		}
		
		var availableTypes = map.getAvailableMapTypes();
		for (var i = 0; i < availableTypes.length; i++) {
			if(requiredType && availableTypes[i] == requiredType) {
				typeWeWillUse = requiredType;
				break;
			}
			if(availableTypes[i] == MM_WORLD_MAP) {
				defaultType = MM_WORLD_MAP;
			}
		}
		
		typeWeWillUse = typeWeWillUse || defaultType;
		
		if(typeWeWillUse !== null) {
			map.setMapType(typeWeWillUse);
		}	
		
	},

	getMapType: function() {
		var map = this.maps[this.api];
		
		type = map.getMapType();
		switch(type) {
			case MM_WORLD_MAP:
				return mxn.Mapstraction.ROAD;
			case MM_WORLD_AERIAL:
				return mxn.Mapstraction.SATELLITE;
			case MM_WORLD_HYBRID:
				return mxn.Mapstraction.HYBRID;
			default:
				return null;
		}
		
	},

	getBounds: function () {
		var map = this.maps[this.api];
		
		var mmbox = map.getMapBounds();
		sw = mmbox.getSouthWest();
		ne = mmbox.getNorthEast();
		return new mxn.BoundingBox(sw.lat, sw.lon, ne.lat, ne.lon);
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		
		var mmlocation = map.getAutoScaleLocation([sw.toProprietary(this.api), ne.toProprietary(this.api)]);
		map.goToPosition(mmlocation.coords, mmlocation.zoom_factor);		
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		var map = this.maps[this.api];
		map.getContainer().appendChild(oContext.imgElm);
		this.setImageOpacity(id, opacity);
		this.setImagePosition(id);
		var me = this;
		map.addEventHandler( 'changeZoom', function(eventType, eventTarget, arg1, arg2, arg3) {
			me.setImagePosition(id);
		});
		map.addEventHandler( 'drag', function(eventType, eventTarget, arg1, arg2, arg3) {
			me.setImagePosition(id);
		});
		map.addEventHandler( 'endPan', function(eventType, eventTarget, arg1, arg2, arg3) {
			me.setImagePosition(id);
		});
	},

	setImagePosition: function(id, oContext) {
		var map = this.maps[this.api];
		var topLeftPoint; var bottomRightPoint;

		topLeftPoint = map.geoPosToContainerPixels(new MMLatLon(oContext.latLng.top, oContext.latLng.left));
		bottomRightPoint = map.geoPosToContainerPixels(new MMLatLon(oContext.latLng.bottom, oContext.latLng.right));

		oContext.pixels.top = topLeftPoint.y;
		oContext.pixels.left = topLeftPoint.x;
		oContext.pixels.bottom = bottomRightPoint.y;
		oContext.pixels.right = bottomRightPoint.x;
	}
	
	/* Not supported
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
	*/
},

LatLonPoint: {
	
	toProprietary: function() {
		return new MMLatLon(this.lat, this.lon);
	},

	fromProprietary: function(multimapPoint) {
		this.lat = multimapPoint.lat;
		this.lon = multimapPoint.lon;
	}
	
},

Marker: {
	
	toProprietary: function() {
		//prepare our markeroptions
		var mmmarkeropts = {};

		if(this.iconUrl) {
			mmmarkeropts.icon = new MMIcon(this.iconUrl);
			if(this.iconSize) {
				mmmarkeropts.icon.iconSize = new MMDimensions(this.iconSize[0], this.iconSize[1]);
			}
			else {
				//mmmarkeropts.icon.iconSize = new MMDimensions(32, 32); //how to get this?
			}

			if(this.iconAnchor) {
				mmmarkeropts.icon.iconAnchor = new MMPoint(this.iconAnchor[0], this.iconAnchor[1]);
			}

			if(this.groupName) {
				mmmarkeropts.icon.groupName = this.groupName;
			}
		}

		if(this.labelText) {
			mmmarkeropts.label = this.labelText;
		}


		var mmmarker = new MMMarkerOverlay( this.location.toProprietary('multimap'), mmmarkeropts );

		if(this.infoBubble) {
			mmmarker.setInfoBoxContent(this.infoBubble);
		}

		if(this.infoDiv) { }

		for (var key in this.attributes) {
			if (this.attributes.hasOwnProperty(key)) {
				mmmarker.setAttribute(key, this.attributes[key]);
			}
		}

		return mmmarker;
	},

	openBubble: function() {		
		this.proprietary_marker.openInfoBox();
	},

	hide: function() {
		this.proprietary_marker.setVisibility(false);
	},

	show: function() {
		this.proprietary_marker.setVisibility(true);
	}

	/* Not supported
	update: function() {
		// TODO: Add provider code
	}
	*/
	
},

Polyline: {

	toProprietary: function() {
		var mmpolyline;
		var mmpoints = [];
		for (var i = 0, length = this.points.length ; i < length; i++){
			mmpoints.push(this.points[i].toProprietary('multimap'));
		}
		mmpolyline = new MMPolyLineOverlay(mmpoints, this.color, this.opacity, this.width, this.closed, this.fillColor);
		return mmpolyline;
	}
	
}

});