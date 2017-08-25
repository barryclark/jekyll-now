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
mxn.register('openlayers', {	

	Mapstraction: {

		init: function(element, api){
			var me = this;

			var projection = ol.proj.get('EPSG:3857');
			var view = new ol.View({
			  center: [0, 0],
			  projection: projection,
			  extent: projection.getExtent(),
			  zoom: 2
			});
			var map = new ol.Map({
			  layers: [
				new ol.layer.Tile({
				  source: new ol.source.OSM()
				})
			  ],
			  //renderer: exampleNS.getRendererFromQueryString(),
			  target: 'map',
			  controls: ol.control.defaults({
				attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
				  collapsible: false
				})
			  }),
			  view: view
			});
			/**	  
			var map = new ol.Map(
				element.id,
				{
					maxExtent: new ol.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
					maxResolution: 156543,
					numZoomLevels: 18,
					units: 'm',
					projection: 'EPSG:900913'
				}
			);
			**/			
			// initialize layers map (this was previously in mxn.core.js)
			this.layers = {};
			/**
			this.layers.osm = new ol.Layer.TMS(
				'OpenStreetMap',
				[
					"http://a.tile.openstreetmap.org/",
					"http://b.tile.openstreetmap.org/",
					"http://c.tile.openstreetmap.org/"
				],
				{
					type:'png',
					getURL: function (bounds) {
						var res = this.map.getResolution();
						var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
						var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
						var z = this.map.getZoom();
						var limit = Math.pow(2, z);
						if (y < 0 || y >= limit) {
							return null;
						} else {
							x = ((x % limit) + limit) % limit;
							var path = z + "/" + x + "/" + y + "." + this.type;
							var url = this.url;
							if (url instanceof Array) {
								url = this.selectUrl(path, url);
							}
							return url + path;
						}
					},
					displayOutsideMaxExtent: true,
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors&nbsp;'
				}
			);
			**/					
			// deal with click
			map.on('click', function(evt){
				var lonlat = map.getLonLatFromViewPortPx(evt.xy);
				var point = new mxn.LatLonPoint();
				point.fromProprietary(api, lonlat);
				me.click.fire({'location': point });
			});

			// deal with zoom change
			map.on('zoomend', function(evt){
				me.changeZoom.fire();
			});
			
			// deal with map movement
			map.on('moveend', function(evt){
				me.moveendHandler(me);
				me.endPan.fire();
			});
			
			// deal with initial tile loading
			var loadfire = function(e) {
				me.load.fire();
				this.events.unregister('loadend', this, loadfire);
			};
			
			for (var layerName in this.layers) {
				if (this.layers.hasOwnProperty(layerName)) {
					if (this.layers[layerName].visibility === true) {
						this.layers[layerName].events.register('loadend', this.layers[layerName], loadfire);
					}
				}
			}
			
			map.addLayer(this.layers.osm);
			this.tileLayers.push(["http://a.tile.openstreetmap.org/", this.layers.osm, true]);
			this.maps[api] = map;
			this.loaded[api] = true;
		},

		applyOptions: function(){
			var map = this.maps[this.api],
				navigators = map.getControlsByClass( 'ol.Control.Navigation' ),
				navigator;

			if ( navigators.length > 0 ) {
				navigator = navigators[0];
				if ( this.options.enableScrollWheelZoom ) {
					navigator.enableZoomWheel();
				} else {
					navigator.disableZoomWheel();
				}
				if ( this.options.enableDragging ) {
					navigator.activate();
				} else {
					navigator.deactivate();
				}
			}
		},

		resizeTo: function(width, height){	
			this.currentElement.style.width = width;
			this.currentElement.style.height = height;
			this.maps[this.api].updateSize();
		},

		addControls: function( args ) {
			var map = this.maps[this.api];	
			// FIXME: OpenLayers has a bug removing all the controls says crschmidt
			for (var i = map.controls.length; i>1; i--) {
				map.controls[i-1].deactivate();
				map.removeControl(map.controls[i-1]);
			}
			if ( args.zoom == 'large' )	  {
				map.addControl(new ol.Control.PanZoomBar());
			}
			else if ( args.zoom == 'small' ) {
				map.addControl(new ol.Control.ZoomPanel());
				if ( args.pan) {
					map.addControl(new ol.Control.PanPanel()); 
				}
			}
			else {
				if ( args.pan){
					map.addControl(new ol.Control.PanPanel()); 
				}
			}
			if ( args.overview ) {
				map.addControl(new ol.Control.OverviewMap());
			}
			if ( args.map_type ) {
				map.addControl(new ol.Control.LayerSwitcher());
			}
			if ( args.scale ) {
				map.addControl(new ol.Control.ScaleLine());
			}
		},

		addSmallControls: function() {
			var map = this.maps[this.api];
			this.addControlsArgs.pan = false;
			this.addControlsArgs.scale = false;						
			this.addControlsArgs.zoom = 'small';
			map.addControl(new ol.Control.ZoomBox());
			map.addControl(new ol.Control.LayerSwitcher({
				'ascending':false
			}));			
		},

		addLargeControls: function() {
			var map = this.maps[this.api];
			map.addControl(new ol.Control.PanZoomBar());
			this.addControlsArgs.pan = true;
			this.addControlsArgs.zoom = 'large';
		},

		addMapTypeControls: function() {
			var map = this.maps[this.api];
			map.addControl( new ol.Control.LayerSwitcher({
				'ascending':false
			}) );
			this.addControlsArgs.map_type = true;
		},

		setCenterAndZoom: function(point, zoom) { 
			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			map.setCenter(point.toProprietary(this.api), zoom);
		},

		addMarker: function(marker, old) {
			var map = this.maps[this.api];
			var pin = marker.toProprietary(this.api);
			if (!this.layers.markers) {
				this.layers.markers = new ol.Layer.Markers('markers');
				map.addLayer(this.layers.markers);
			}
			this.layers.markers.addMarker(pin);
			return pin;
		},

		removeMarker: function(marker) {
			var map = this.maps[this.api];
			var pin = marker.proprietary_marker;
			this.layers.markers.removeMarker(pin);
			pin.destroy();
		},

		declutterMarkers: function(opts) {
			throw 'Not supported';
		},

		addPolyline: function(polyline, old) {
			var map = this.maps[this.api];
			var pl = polyline.toProprietary(this.api);
			if (!this.layers.polylines) {
				this.layers.polylines = new ol.Layer.Vector('polylines');
				map.addLayer(this.layers.polylines);
			}
			this.layers.polylines.addFeatures([pl]);
			return pl;
		},

		removePolyline: function(polyline) {
			var map = this.maps[this.api];
			var pl = polyline.proprietary_polyline;
			this.layers.polylines.removeFeatures([pl]);
		},
		
		removeAllPolylines: function() {
			var olpolylines = [];
			for (var i = 0, length = this.polylines.length; i < length; i++) {
				olpolylines.push(this.polylines[i].proprietary_polyline);
			}
			if (this.layers.polylines) {
				this.layers.polylines.removeFeatures(olpolylines);
			}
		},

		getCenter: function() {
			var map = this.maps[this.api];
			var pt = map.getCenter();
			var mxnPt = new mxn.LatLonPoint();
			mxnPt.fromProprietary(this.api, pt);
			return mxnPt;
		},

		setCenter: function(point, options) {
			var map = this.maps[this.api];
			var pt = point.toProprietary(this.api);
			map.setCenter(pt);
		},

		setZoom: function(zoom) {
			var map = this.maps[this.api];
			map.zoomTo(zoom);
		},

		getZoom: function() {
			var map = this.maps[this.api];
			return map.zoom;
		},

		getZoomLevelForBoundingBox: function( bbox ) {
			var map = this.maps[this.api];

			var sw = bbox.getSouthWest();
			var ne = bbox.getNorthEast();

			if(sw.lon > ne.lon) {
				sw.lon -= 360;
			}

			var obounds = new ol.Bounds();
			
			obounds.extend(new mxn.LatLonPoint(sw.lat,sw.lon).toProprietary(this.api));
			obounds.extend(new mxn.LatLonPoint(ne.lat,ne.lon).toProprietary(this.api));
			
			var zoom = map.getZoomForExtent(obounds);
			
			return zoom;
		},

		setMapType: function(type) {
			var map = this.maps[this.api];
			throw 'Not implemented (setMapType)';

			// switch(type) {
			//	 case mxn.Mapstraction.ROAD:
			//	 map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			//	 break;
			//	 case mxn.Mapstraction.SATELLITE:
			//	 map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			//	 break;
			//	 case mxn.Mapstraction.HYBRID:
			//	 map.setMapTypeId(google.maps.MapTypeId.HYBRID);
			//	 break;
			//	 default:
			//	 map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			// }	 
		},

		getMapType: function() {
			var map = this.maps[this.api];
			// TODO: implement actual layer support
			return mxn.Mapstraction.ROAD;

			// var type = map.getMapTypeId();
			// switch(type) {
			//	 case google.maps.MapTypeId.ROADMAP:
			//	 return mxn.Mapstraction.ROAD;
			//	 case google.maps.MapTypeId.SATELLITE:
			//	 return mxn.Mapstraction.SATELLITE;
			//	 case google.maps.MapTypeId.HYBRID:
			//	 return mxn.Mapstraction.HYBRID;
			//	 //case google.maps.MapTypeId.TERRAIN:
			//	 //		return something;
			//	 default:
			//	 return null;
			// }
		},

		getBounds: function () {
			var map = this.maps[this.api];
			var olbox = map.calculateBounds();
			var ol_sw = new ol.LonLat( olbox.left, olbox.bottom );
			var mxn_sw = new mxn.LatLonPoint(0,0);
			mxn_sw.fromProprietary( this.api, ol_sw );
			var ol_ne = new ol.LonLat( olbox.right, olbox.top );
			var mxn_ne = new mxn.LatLonPoint(0,0);
			mxn_ne.fromProprietary( this.api, ol_ne );
			return new mxn.BoundingBox(mxn_sw.lat, mxn_sw.lon, mxn_ne.lat, mxn_ne.lon);
		},

		setBounds: function(bounds){
			var map = this.maps[this.api];
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();

			if(sw.lon > ne.lon) {
				sw.lon -= 360;
			}

			var obounds = new ol.Bounds();
			
			obounds.extend(new mxn.LatLonPoint(sw.lat,sw.lon).toProprietary(this.api));
			obounds.extend(new mxn.LatLonPoint(ne.lat,ne.lon).toProprietary(this.api));
			map.zoomToExtent(obounds);
		},

		addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
			var map = this.maps[this.api];
			var bounds = new ol.Bounds();
			bounds.extend(new mxn.LatLonPoint(south,west).toProprietary(this.api));
			bounds.extend(new mxn.LatLonPoint(north,east).toProprietary(this.api));
			var overlay = new ol.Layer.Image(
				id, 
				src,
				bounds,
				new ol.Size(oContext.imgElm.width, oContext.imgElm.height),
				{'isBaseLayer': false, 'alwaysInRange': true}
			);
			map.addLayer(overlay);
			this.setImageOpacity(overlay.div.id, opacity);
		},

		setImagePosition: function(id, oContext) {
			// do nothing
		},

		addOverlay: function(url, autoCenterAndZoom) {
			var map = this.maps[this.api];
			var kml = new ol.Layer.GML("kml", url,{
				'format': ol.Format.KML,
				'formatOptions': new ol.Format.KML({
					'extractStyles': true,
					'extractAttributes': true
				}),
				'projection': new ol.Projection('EPSG:4326')
			});
			if (autoCenterAndZoom) {
				var setExtent = function() {
					dataExtent = this.getDataExtent();
					map.zoomToExtent(dataExtent);
				};
				kml.events.register('loadend', kml, setExtent); 
			}
			map.addLayer(kml);
		},

		addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
			var map = this.maps[this.api];
			var new_tile_url = tile_url.replace(/\{Z\}/g,'${z}');
			new_tile_url = new_tile_url.replace(/\{X\}/g,'${x}');
			new_tile_url = new_tile_url.replace(/\{Y\}/g,'${y}');
			var overlay = new ol.Layer.XYZ(copyright_text,
				new_tile_url,
				{sphericalMercator: false, opacity: opacity}
			);
			if(!map_type) {
				overlay.addOptions({displayInLayerSwitcher: false, isBaseLayer: false});
			}
			map.addLayer(overlay);
			this.tileLayers.push( [tile_url, overlay, false] );			
		},

		toggleTileLayer: function(tile_url) {
			var map = this.maps[this.api];
			for (var f=this.tileLayers.length-1; f>=0; f--) {
				if(this.tileLayers[f][0] == tile_url) {
					this.tileLayers[f][2] = !this.tileLayers[f][2];
					this.tileLayers[f][1].setVisibility(this.tileLayers[f][2]);
				}
			}	   
			// TODO: Add provider code
		},

		getPixelRatio: function() {
			var map = this.maps[this.api];

			// TODO: Add provider code	
		},

		mousePosition: function(element) {
			var map = this.maps[this.api];
			var locDisp = document.getElementById(element);
			if (locDisp !== null) {
				map.events.register('mousemove', map, function (evt) {
					var lonlat = map.getLonLatFromViewPortPx(evt.xy);
					var point = new mxn.LatLonPoint();
					point.fromProprietary('openlayers', lonlat);
					var loc = point.lat.toFixed(4) + ' / ' + point.lon.toFixed(4);
					locDisp.innerHTML = loc;
				});
			}
			locDisp.innerHTML = '0.0000 / 0.0000';
		}
	},

	LatLonPoint: {

		toProprietary: function() {
			var ollon = this.lon * 20037508.34 / 180;
			var ollat = Math.log(Math.tan((90 + this.lat) * Math.PI / 360)) / (Math.PI / 180);
			ollat = ollat * 20037508.34 / 180;
			return new ol.LonLat(ollon, ollat);			
		},

		fromProprietary: function(olPoint) {
			var lon = (olPoint.lon / 20037508.34) * 180;
			var lat = (olPoint.lat / 20037508.34) * 180;
			lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
			this.lon = lon;
			this.lat = lat;
		}

	},

	Marker: {

		toProprietary: function() {
			var size, anchor, popup;
			if(this.iconSize) {
				size = new ol.Size(this.iconSize[0], this.iconSize[1]);
			}
			else {
				size = new ol.Size(21,25);
			}

			if(this.iconAnchor) {
				anchor = new ol.Pixel(-this.iconAnchor[0], -this.iconAnchor[1]);
			}
			else {
				anchor = new ol.Pixel(-(size.w/2), -size.h);
			}

			if(this.iconUrl) {
				this.icon = new ol.Icon(this.iconUrl, size, anchor);
			}
			else {
				this.icon = new ol.Icon('http://ol.org/dev/img/marker-gold.png', size, anchor);
			}
			var marker = new ol.Marker(this.location.toProprietary("openlayers"), this.icon);

			if(this.infoBubble) {
				popup = new ol.Popup.FramedCloud(null,
					this.location.toProprietary("openlayers"),
					new ol.Size(100,100),
					this.infoBubble,
					this.icon,
					true
				);
				var theMap = this.map;
				if(this.hover) {
					marker.events.register("mouseover", marker, function(event) {
						theMap.addPopup(popup);
						popup.show();
					});
					marker.events.register("mouseout", marker, function(event) {
						popup.hide();
						theMap.removePopup(popup);
					});
				}
				else {
					var shown = false;
					marker.events.register("mousedown", marker, function(event) {
						if (shown) {
							popup.hide();
							theMap.removePopup(popup);
							shown = false;
						} else {
							theMap.addPopup(popup);
							popup.show();
							shown = true;
						}
					});
				}
				this.popup = popup;
			}
			
			//fire click event for marker
			marker.events.register("click",marker,function(event) {
				marker.mapstraction_marker.click.fire();
			});

			if(this.hoverIconUrl) {
				icon = this.iconUrl || 'http://ol.org/dev/img/marker-gold.png';
				hovericon = this.hoverIconUrl;
				marker.events.register("mouseover", marker, function(event) {
					marker.setUrl(hovericon);
				});
				marker.events.register("mouseout", marker, function(event) {
					marker.setUrl(icon);
				});
			}

			if(this.infoDiv){
				// TODO
			}
			return marker;
		},

		openBubble: function() {		
			if ( this.infoBubble ) {
				// Need to create a new popup in case setInfoBubble has been called
				this.popup = new ol.Popup.FramedCloud(null,
					this.location.toProprietary("openlayers"),
					new ol.Size(100,100),
					this.infoBubble,
					this.icon,
					true
				);
			}

			if ( this.popup ) {
				this.map.addPopup( this.popup, true );
			}
		},

		closeBubble: function() {
			if ( this.popup ) {
				this.popup.hide();
				this.map.removePopup( this.popup );
			}
		},

		hide: function() {
			this.proprietary_marker.display( false );
		},

		show: function() {
			this.proprietary_marker.display( true );
		},

		update: function() {
			// TODO: Add provider code
		}

	},

	Polyline: {

		toProprietary: function() {
			var olpolyline;
			var olpoints = [];
			var ring;
			var style = {
				strokeColor: this.color || "#000000",
				strokeOpacity: this.opacity || 1,
				strokeWidth: this.width || 1,
				fillColor: this.fillColor || "#000000",
				fillOpacity: this.getAttribute('fillOpacity') || 0.2
			};

			//TODO Handle closed attribute

			for (var i = 0, length = this.points.length ; i< length; i++){
				olpoint = this.points[i].toProprietary("openlayers");
				olpoints.push(new ol.Geometry.Point(olpoint.lon, olpoint.lat));
			}

			if (this.closed) {
				// a closed polygon
				ring = new ol.Geometry.LinearRing(olpoints);
			} else {
				// a line
				ring = new ol.Geometry.LineString(olpoints);
			}

			olpolyline = new ol.Feature.Vector(ring, null, style);

			return olpolyline;
		},

		show: function() {
			throw 'Not implemented';
		},

		hide: function() {
			throw 'Not implemented';
		}

	}

});
