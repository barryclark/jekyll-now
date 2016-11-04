mxn.register('leaflet', {

Mapstraction: {
    
    init: function(element, api) {
        var me = this;
        var map = new L.Map(element.id, {
            zoomControl: false
        });
        this.layers = {};
        this.features = [];
        this.maps[api] = map;
        this.loaded[api] = true;

		// deal with map movement
		map.addEventListener( 'drag', function(){
//			me.doPan.fire();
		});
		// deal with map movement
		map.addEventListener( 'dragend', function(){
			me.moveendHandler(me);
			me.endPan.fire();
		});
		// deal with zoom change
		map.addEventListener( 'zoomend', function(){
			me.changeZoom.fire();
		});
		// deal with map loaded
		map.addEventListener( 'load', function(){
			me.changeZoom.fire();
		});
		map.on("popupopen", function(e) {
			if (e.popup._source.mxnMarker) {
			  if (e.popup._source.mxnMarker.clicklatlng){
			    // if we have a click (mouse) position, set this
			    // to get the info on mouseposition for polygon, polyline  
			    e.popup.setLatLng(e.popup._source.mxnMarker.clicklatlng);
			  }
			  e.popup._source.mxnMarker.openInfoBubble.fire({'bubbleContainer': e.popup._container});
			}
		});
		map.on("popupclose", function(e) {
			e.popup._source.unbindPopup();
			if (e.popup._source.mxnMarker) {
			  e.popup._source.mxnMarker.closeInfoBubble.fire({'bubbleContainer': e.popup._container});
			}
		});

	},
    
    applyOptions: function(){
        return false;
    },

    resizeTo: function(width, height){
        this.currentElement.style.width = width;
        this.currentElement.style.height = height;
		this.maps[this.api].invalidateSize();
    },

    addControls: function(args) {
        var map = this.maps[this.api];
        if (args.zoom) {
            var zoom = new L.Control.Zoom();
			if (args.zoom.position){
				zoom = new L.Control.Zoom({position:args.zoom.position});
			}
            map.addControl(zoom);
        }
        if (args.map_type) {
            var layersControl = new L.Control.Layers(this.layers, this.features);
            map.addControl(layersControl);
        }
    },

    addSmallControls: function() {
        this.addControls({zoom: true, map_type: true});
    },

    addLargeControls: function() {
        throw 'Not implemented';
    },

    addMapTypeControls: function() {
        throw 'Not implemented';
    },

    setCenterAndZoom: function(point, zoom) { 
        var map = this.maps[this.api];
        var pt = point.toProprietary(this.api);
        map.setView(pt, zoom); 
    },
    
    addMarker: function(marker, old) {
        var map = this.maps[this.api];
        var pin = marker.toProprietary(this.api);
        map.addLayer(pin);
        this.features.push(pin);
        return pin;
    },

    removeMarker: function(marker) {
        var map = this.maps[this.api];
        map.removeLayer(marker.proprietary_marker);
    },
    
    declutterMarkers: function(opts) {
        throw 'Not implemented';
    },

    addPolyline: function(polyline, old) {
        var map = this.maps[this.api];
        polyline = polyline.toProprietary(this.api);
        map.addLayer(polyline);
        this.features.push(polyline);
        return polyline;
    },

    removePolyline: function(polyline) {
        var map = this.maps[this.api];
        map.removeLayer(polyline.proprietary_polyline);
    },

    getCenter: function() {
        var map = this.maps[this.api];
        var pt = map.getCenter();
        return new mxn.LatLonPoint(pt.lat, pt.lng);
    },

    setCenter: function(point, options) {
        var map = this.maps[this.api];
        var pt = point.toProprietary(this.api);
        if(options && options.pan) { 
            map.panTo(pt,{animate:false}); 
        }
        else { 
            map.setView(pt, map.getZoom(), true);
        }
    },

    setZoom: function(zoom) {
        var map = this.maps[this.api];
        map.setZoom(zoom,{animate:true});
    },
    
    getZoom: function() {
        var map = this.maps[this.api];
        return map.getZoom();
    },

    getZoomLevelForBoundingBox: function( bbox ) {
        throw 'Not implemented';
    },

    setMapType: function(type) {
        return false;
    },

    getMapType: function() {
        throw 'Not implemented';
    },

    getBounds: function () {
        var map = this.maps[this.api];
        var ne, sw, nw, se;
        var box = map.getBounds();
        sw = box.getSouthWest();
        ne = box.getNorthEast();
        return new mxn.BoundingBox(sw.lat, sw.lng, ne.lat, ne.lng);
    },

    setBounds: function(bounds){
        var map = this.maps[this.api];
        var sw = bounds.getSouthWest().toProprietary(this.api);
        var ne = bounds.getNorthEast().toProprietary(this.api);
        var newBounds = new L.LatLngBounds(sw, ne);
        map.fitBounds(newBounds,{animate:false}); 
    },

    addImageOverlay: function(id, src, opacity, west, south, east, north) {
        var map = this.maps[this.api];
        var newBounds = new L.LatLngBounds(new L.LatLng(south,west), new L.LatLng(north,east));
		L.imageOverlay(src, newBounds,{"opacity":opacity}).addTo(map);
    },

    setImagePosition: function(id, oContext) {
        throw 'Not implemented';
    },
    
    addOverlay: function(url, autoCenterAndZoom) {
        throw 'Not implemented';
    },

    addTileLayer: function(tile_url, options) {
        var layerName;
        if (options && options.name) {
            layerName = options.name;
            delete options.name;
        } else {
            layerName = 'Tiles';
        }
        this.layers[layerName] = new L.TileLayer(tile_url, options || {});
        var map = this.maps[this.api];
		// GR 16.01.2013 we add the layer later explicitly, (want only one active)
//        map.addLayer(this.layers[layerName]);
    },

    toggleTileLayer: function(tile_url) {
        throw 'Not implemented';
    },

    getPixelRatio: function() {
        throw 'Not implemented';
    },
    
    mousePosition: function(element) {
        throw 'Not implemented';
    },

    openBubble: function(point, content) {
        var map = this.maps[this.api];
        var newPoint = point.toProprietary(this.api);
		popup = map.openPopup(content,newPoint,{offset: L.point(0, -40), closeButton: false});
    },

    closeBubble: function() {
        var map = this.maps[this.api];
        map.closePopup();
    }
},

LatLonPoint: {
    
    toProprietary: function() {
        return new L.LatLng(this.lat,this.lon);
    },

    fromProprietary: function(point) {
        this.lat = point.lat();
        this.lon = point.lng();
    }
    
},

Marker: {
    
    toProprietary: function() {
        var me = this;
        var thisIcon = L.Icon;
        if (me.iconUrl) {
            thisIcon = thisIcon.extend({
                options: {iconUrl: me.iconUrl}
            });
        }
        if (me.iconSize) {
            thisIcon = thisIcon.extend({
                options: {iconSize: new L.Point(me.iconSize[0], me.iconSize[1])}
            });
        }
        if (me.iconAnchor) {
            thisIcon = thisIcon.extend({
                options: {iconAnchor: new L.Point(me.iconAnchor[0], me.iconAnchor[1])}
            });
        }
        if (me.iconShadowUrl) {
            thisIcon = thisIcon.extend({
                options: {shadowUrl: me.iconShadowUrl}
            });
        }
        if (me.iconShadowSize) {
            thisIcon = thisIcon.extend({
                options: {shadowSize: new L.Point(me.iconShadowSize[0], me.iconShadowSize[1])}
            });
        }
		// GR 17.11.2014
        thisIcon = thisIcon.extend({
             options: {popupAnchor: new L.Point(0,-25)}
            });

        var iconObj = new thisIcon();
        var marker = new L.Marker(
            this.location.toProprietary('leaflet'),
            { icon: iconObj,
			  title: this.getAttribute("title") 
			}
        );
        (function(me, marker) {
            marker.on("click", function (e) {
                me.click.fire();
            });
        })(me, marker);
        (function(me, marker) {
            marker.on("mouseover", function (e) {
                me.mouseover.fire();
            });
        })(me, marker);
        (function(me, marker) {
            marker.on("mouseout", function (e) {
                me.mouseout.fire();
            });
        })(me, marker);
        return marker;
    },

    openBubble: function() {
        var pin = this.proprietary_marker;
        if (this.infoBubble) {
			pin.mxnMarker = this;
            pin.bindPopup(this.infoBubble,{offset: L.point(0, 10-this.iconAnchor[1] )});
            pin.openPopup();
        }
    },
    
    closeBubble: function() {
        var pin = this.proprietary_marker;
		pin.closePopup();
    },

    hide: function() {
        var map = this.mapstraction.maps[this.api];
        map.removeLayer(this.proprietary_marker);
    },

    show: function() {
        var map = this.mapstraction.maps[this.api];
        map.addLayer(this.proprietary_marker);
    },
    
    isHidden: function() {
        var map = this.mapstraction.maps[this.api];
        if (map.hasLayer(this.proprietary_marker)) {
            return false;
        } else {
            return true;
        }
    },

   setIconAnchor: function(iconAnchor) {
        var pin = this.proprietary_marker;
		pin.icon.iconAnchor = new L.Point(iconAnchor[0], iconAnchor[1]);
    },

   update: function() {
        var pin = this.proprietary_marker;
		pin.update();
    }
    
},

Polyline: {

    toProprietary: function() {
        var me = this;
        var points = [];
        for (var i = 0,  length = this.points.length ; i< length; i++){
            points.push(this.points[i].toProprietary('leaflet'));
		}

		var polyOptions = {
			color: this.color || '#000000',
			opacity: this.opacity || 1.0, 
			weight: this.width,
			fillColor: this.fillColor || '#000000',
			fillOpacity: this.fillOpacity || '1'
		};
		if (this.closed) {
			var poly = new L.Polygon(points, polyOptions);
		} else {
			var poly = new L.Polyline(points, polyOptions);
		}
		(function(me, poly) {
            poly.on("click", function (e) {
				// get the mouse position in geo coordinates to use it later for infobubble position
				// workaround to avoid wired info bubble positins on polygons and polylines
				me.clicklatlng = new L.LatLng(e.latlng.lat,e.latlng.lng);
                me.click.fire();
            });
        })(me, poly);
		return poly;
	},
    
    show: function() {
        this.map.addLayer(this.proprietary_polyline);
    },

    hide: function() {
        this.map.removeLayer(this.proprietary_polyline);
    },
    
    isHidden: function() {
        if (this.map.hasLayer(this.proprietary_polyline)) {
            return false;
        } else {
            return true;
        }
    },

	openBubble: function() {
        var pin = this.proprietary_polyline;
        if (this.infoBubble) {
			pin.mxnMarker = this;
            pin.bindPopup(this.infoBubble);
            pin.openPopup();
        }
    },
    
    closeBubble: function() {
        var pin = this.proprietary_polyline;
		pin.closePopup();
    }

}

});