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
mxn.register('yandex', {

Mapstraction: {

	init: function(element, api) {
		var me = this;
		if (YMaps) {
			var yandexMap = this.maps[api] = new YMaps.Map(element);
			
			YMaps.Events.observe(yandexMap, yandexMap.Events.Click, function(map, mouseEvent) {
				var lat = mouseEvent.getCoordPoint().getX();
				var lon = mouseEvent.getCoordPoint().getY();
				me.click.fire({'location': new mxn.LatLonPoint(lat, lon)});
			});
			// deal with zoom change
			YMaps.Events.observe(yandexMap, yandexMap.Events.SmoothZoomEnd, function(map) {
				me.changeZoom.fire();
			});
			
			this.loaded[api] = true;
			me.load.fire();
		  }
		else {
			alert(api + ' map script not imported');
		}
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
		
		if(this.options.enableScrollWheelZoom){
			map.enableScrollZoom(true);
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
		// YMaps do not has something like checkResize() notifer;
		// if container been resized so map must be redrawn
		this.maps[this.api].redraw();
	},

	addControls: function(args) {
		var map = this.maps[this.api];
		
		if (args.zoom == 'large') {
			this.addLargeControls();
		} 
		else if (args.zoom == 'small') {
			this.addSmallControls();
		}
		
		if (args.pan) {
			this.controls.unshift(new YMaps.ToolBar());
			this.addControlsArgs.pan = true;
			map.addControl(this.controls[0]);
		}
		
		if (args.scale) {
			this.controls.unshift(new YMaps.ScaleLine());
			this.addControlsArgs.scale = true;
			map.addControl(this.controls[0]);
		}
		
		if (args.overview) {
			if (typeof(args.overview) != 'number') {
				args.overview = 5;
			}
			this.controls.unshift(new YMaps.MiniMap(args.overview));
			this.addControlsArgs.overview = true;
			map.addControl(this.controls[0]);
		}
		
		if (args.map_type) {
			this.addMapTypeControls();
		}
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		
		this.controls.unshift(new YMaps.SmallZoom());
		this.addControlsArgs.zoom = 'small';
		map.addControl(this.controls[0]);
	},

	addLargeControls: function() {
		var map = this.maps[this.api];
		
		this.controls.unshift(new YMaps.SmallZoom());
		this.addControlsArgs.zoom = 'large';
		map.addControl(this.controls[0]);
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];

		this.controls.unshift(new YMaps.TypeControl());
		this.addControlsArgs.map_type = true;
		map.addControl(this.controls[0]);
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
		var pt = map.getCenter();
		var point = new mxn.LatLonPoint(pt.getLat(),pt.getLng());
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.setCenter(pt);
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		map.setZoom(zoom);
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		var zoom = map.getZoom();
		
		return zoom;
	},

	getZoomLevelForBoundingBox: function(bbox) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast().toProprietary(this.api);
		var sw = bbox.getSouthWest().toProprietary(this.api);
		var zoom = new YMaps.GeoBounds(ne, sw).getMapZoom(map);
		
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
		switch(type) {
			case mxn.Mapstraction.ROAD:
				map.setType(YMaps.MapType.MAP);
				break;
			case mxn.Mapstraction.SATELLITE:
				map.setType(YMaps.MapType.SATELLITE);
				break;
			case mxn.Mapstraction.HYBRID:
				map.setType(YMaps.MapType.HYBRID);
				break;
			default:
				map.setType(type || YMaps.MapType.MAP);
		}
	},

	getMapType: function() {
		var map = this.maps[this.api];
		var type = map.getType();
		switch(type) {
			case YMaps.MapType.MAP:
				return mxn.Mapstraction.ROAD;
			case YMaps.MapType.SATELLITE:
				return mxn.Mapstraction.SATELLITE;
			case YMaps.MapType.HYBRID:
				return mxn.Mapstraction.HYBRID;
			default:
				return null;
		}
	},

	getBounds: function () {
		var map = this.maps[this.api];
		var gbox = map.getBounds();
		var lb = gbox.getLeftBottom();
		var rt = gbox.getRightTop();
		return new mxn.BoundingBox(lb.getLat(), lb.getLng(), rt.getLat(), rt.getLng());
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		
		var leftBottom = new YMaps.GeoPoint(sw.lon, sw.lat);
		var rightTop = new YMaps.GeoPoint(ne.lon, ne.lat);
		var ybounds = new YMaps.GeoBounds(leftBottom, rightTop);
		map.setZoom(ybounds.getMapZoom(map));
		map.setCenter(ybounds.getCenter());
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		var map = this.maps[this.api];
		var mxnMap = this;
		
		// YMaps.IOverlay interface implementation.
		// http://api.yandex.ru/maps/jsapi/doc/ref/reference/ioverlay.xml
		var YImageOverlay = function (imgElm) {
			var ymap;
			this.onAddToMap = function (pMap, parentContainer) {
				ymap = parentContainer;
				ymap.appendChild(imgElm);
				this.onMapUpdate();
			};
			this.onRemoveFromMap = function () {
				if (ymap) {
					ymap.removeChild(imgElm);
				}
			};
			this.onMapUpdate = function () {
				mxnMap.setImagePosition(id);
			};
		};
		
		var overlay = new YImageOverlay(oContext.imgElm);
		map.addOverlay(overlay);
		this.setImageOpacity(id, opacity);
		this.setImagePosition(id);
	},
	setImagePosition: function(id, oContext) {
		var map = this.maps[this.api];

		var topLeftGeoPoint = new YMaps.GeoPoint(oContext.latLng.left, oContext.latLng.top);
		var bottomRightGeoPoint = new YMaps.GeoPoint(oContext.latLng.right, oContext.latLng.bottom);
		var topLeftPoint = map.converter.coordinatesToMapPixels(topLeftGeoPoint);
		var bottomRightPoint = map.converter.coordinatesToMapPixels(bottomRightGeoPoint);
		oContext.pixels.top = topLeftPoint.y;
		oContext.pixels.left = topLeftPoint.x;
		oContext.pixels.bottom = bottomRightPoint.y;
		oContext.pixels.right = bottomRightPoint.x;
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		var map = this.maps[this.api];
		var kml = new YMaps.KML(url);
		
		map.addOverlay(kml);
		
		YMaps.Events.observe(kml, kml.Events.Fault, function (kml, error) {
			alert("KML upload faults. Error: " + error);
		});
	},

	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
		var map = this.maps[this.api];
		var dataSource = new YMaps.TileDataSource(tile_url, true, true);
		dataSource.getTileUrl = function (t, s) { 
			return this._tileUrlTemplate.replace(/\{X\}/g,t.x).replace(/\{Y\}/g,t.y).replace(/\{Z\}/g,s); 
		};
		var newLayer = new YMaps.Layer(dataSource);
		newLayer._$element.css('opacity', opacity);

		if (map_type) {
			var layerID = Math.round(Math.random()*Date.now()).toString(); // silly hash function
			YMaps.Layers.add(layerID, newLayer);
			var newType = new YMaps.MapType([layerID],
				copyright_text,
				{ 
					textColor: "#706f60",
					minZoom:   min_zoom,
					maxZoom:   max_zoom 
				}
			);
			var tp;
			for (var controlName in map.__controls) {
				if (map.__controls[controlName] instanceof YMaps.TypeControl) {
					tp = map.__controls[controlName];
					break;
				}
			}
			if (!tp) {
				tp = new YMaps.TypeControl();
				map.addControl(tp);
			}
			tp.addType(newType);
		} 
		else {
			map.addLayer(newLayer);
			map.addCopyright(copyright_text);
		}
		this.tileLayers.push( [tile_url, newLayer, true] );
		return newLayer;
	},

	toggleTileLayer: function(tile_url) {
		var map = this.maps[this.api];
		for (var f=0; f<this.tileLayers.length; f++) {
			if(this.tileLayers[f][0] == tile_url) {
				if(this.tileLayers[f][2]) {
					this.maps[this.api].removeLayer(this.tileLayers[f][1]);
					this.tileLayers[f][2] = false;
				}
				else {
					this.maps[this.api].addLayer(this.tileLayers[f][1]);
					this.tileLayers[f][2] = true;
				}
			}
		}
	},

	getPixelRatio: function() {
		throw 'Not implemented';
	},
	
	mousePosition: function(element) {
		var locDisp = document.getElementById(element);
		if (locDisp !== null) {
			var map = this.maps[this.api];
			YMaps.Events.observe(map, map.Events.MouseMove, function(map, mouseEvent) {
				var geoPoint = mouseEvent.getGeoPoint();
				var loc = geoPoint.getY().toFixed(4) + ' / ' + geoPoint.getX().toFixed(4);
				locDisp.innerHTML = loc;
			});
			locDisp.innerHTML = '0.0000 / 0.0000';
		}
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new YMaps.GeoPoint(this.lon, this.lat);
	},

	fromProprietary: function(yandexPoint) {
		this.lat = yandexPoint.getLat();
		this.lon = yandexPoint.getLng();
		return this;
	}
	
},

Marker: {
	
	toProprietary: function() {
		var options = {
			hideIcon: false,
			draggable: this.draggable
		};
		
		if (this.iconUrl) {
			var style = new YMaps.Style();
			var icon = style.iconStyle = new YMaps.IconStyle();

			icon.href = this.iconUrl;
			if (this.iconSize) {
				icon.size = new YMaps.Point(this.iconSize[0], this.iconSize[1]);
				var anchor;
				if (this.iconAnchor) {
					anchor = new YMaps.Point(this.iconAnchor[0], this.iconAnchor[1]);
				}
				else {
					anchor = new YMaps.Point(0, 0);
				}
				icon.offset = anchor;
			}
			
			if (this.iconShadowUrl) {
				icon.shadow = new YMaps.IconShadowStyle();
				icon.shadow.href = this.iconShadowUrl;
				if (this.iconShadowSize) {
					icon.shadow.size = new YMaps.Point(this.iconShadowSize[0], this.iconShadowSize[1]);
					icon.shadow.offset = new YMaps.Point(0, 0);
				}
			}
			
			options.style = style;
		}
		
		var ymarker = new YMaps.Placemark(this.location.toProprietary('yandex'), options);
		
		if (this.hoverIconUrl) {
			var me = this;
			YMaps.Events.observe(ymarker, ymarker.Events.MouseEnter, function(map, mouseEvent) {
				var markerOptions = ymarker.getOptions();
				if (! me.iconUrl) {
					// that dirtyhack saves default icon url
					me.iconUrl = ymarker._icon._context._computedStyle.iconStyle.href;
					markerOptions.style = ymarker._icon._context._computedStyle;
				}
				markerOptions.style.iconStyle.href = me.hoverIconUrl;
				ymarker.setOptions(markerOptions);
			});
			YMaps.Events.observe(ymarker, ymarker.Events.MouseLeave, function(map, mouseEvent) {
				var markerOptions = ymarker.getOptions();
				markerOptions.style.iconStyle.href = me.iconUrl;
				ymarker.setOptions(markerOptions);
			});
		}

		if (this.labelText) {
			ymarker.name = this.labelText;
		}
		
		if (this.infoBubble) {
			ymarker.setBalloonContent(this.infoBubble);
		}
		
		YMaps.Events.observe(ymarker, ymarker.Events.DragEnd, function(ymarker) {
			var latLon = new mxn.LatLonPoint().fromProprietary('yandex', ymarker.getGeoPoint());
			this.mapstraction_marker.location = latLon;
			this.mapstraction_marker.dragend.fire(latLon);
		});
		
		return ymarker;
	},

	openBubble: function() {
		this.proprietary_marker.openBalloon();
	},
	
	closeBubble: function() {
		this.proprietary_marker.closeBalloon();
	},
	
	hide: function() {
		this.proprietary_marker._$iconContainer.addClass("YMaps-display-none");
	},

	show: function() {
		this.proprietary_marker._$iconContainer.removeClass("YMaps-display-none");
	},

	update: function() {
		point = new mxn.LatLonPoint();
		point.fromProprietary('yandex', this.proprietary_marker.getGeoPoint());
		this.location = point;
	}
},

Polyline: {

	toProprietary: function() {
		var ypoints = [];
		
		for (var i = 0,  length = this.points.length ; i< length; i++){
			ypoints.push(this.points[i].toProprietary('yandex'));
		}
		
		var options = {
			style: {
				lineStyle: {
					strokeColor: this.color.replace('#',''),
					strokeWidth: this.width
				}
			}
		};
		
		if (this.closed	|| ypoints[0].equals(ypoints[length-1])) {
			options.style.polygonStyle = options.style.lineStyle;
			if (this.fillColor) {
				options.style.polygonStyle.fill = true;
				var alphaChanal = (Math.round((this.opacity||1)*255)).toString(16);
				options.style.polygonStyle.fillColor = this.fillColor.replace('#','') + alphaChanal;
			}
			return new YMaps.Polygon(ypoints, options);
		} 
		else {
			return new YMaps.Polyline(ypoints, options);
		}
	},
	
	hide: function() {
		this.proprietary_polyline._container._$container.addClass("YMaps-display-none");
	},

	show: function() {
		this.proprietary_polyline._container._$container.removeClass("YMaps-display-none");
	}
}

});
