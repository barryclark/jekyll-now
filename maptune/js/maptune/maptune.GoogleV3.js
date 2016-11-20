/**********************************************************************
map_GoogleV3.js

$Comment: provides JavaScript for Google Api V3 calls
$Source :map_GoogleV3.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2011/01/03 $
$Author: guenter richter $
$Id:map_GoogleV2.js 1 2011-01-03 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_GoogleV3.js,v $
**********************************************************************/

/** 
 * @fileoverview This is the interface to the Google maps API v3
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

/* ...................................................................* 
 *  global vars                                                       * 
 * ...................................................................*/
 
var panoramioLayer = null;
var trafficLayer = null;
var directionDisplay = null;
var directionsService = null;

/**
 * custom map styles
 */
var bw_stylez = [
	  {
		featureType: "all",
		elementType: "all",
		stylers: [
		  { saturation: -99 }
		]
	  },{
		featureType: "poi",
		elementType: "all",
		stylers: [
		  { visibility: "off" }
		]
	  },{
		featureType: "landscape.natural",
		elementType: "geometry",
		stylers: [
		  { visibility: "on" },
		  { lightness: 98 }
		]
	  },{
		featureType: "water",
		stylers: [
		  { lightness: 80}
		]
	  },{
		featureType: "road",
		elementType: "labels",
		stylers: [
		  { lightness: 20 }
		]
	  },{
		featureType: "road",
		elementType: "geometry",
		stylers: [
		  { lightness: 50 }
		]
	  },{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
		  { lightness: 60 }
		]
	  },{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
		  { lightness: 70 }
		]
	  },{
		featureType: "poi",
		elementType: "all",
		stylers: [
		  { visibility: "off" }
		]
	  },{
		featureType: "water",
		elementType: "all",
		stylers: [
		  { visibility: "on" }
		]
	  },{
		featureType: "administrative",
		elementType: "geometry",
		stylers: [
		  { visibility: "off" }
		]
	  },{
		featureType: "administrative.province",
		elementType: "labels",
		stylers: [
		  { visibility: "off" }
		]
	  },{
		featureType: "landscape.man_made",
		elementType: "geometry",
		stylers: [
		  { visibility: "off" }
		]
	  }
		];
var grigio_stylez = [
		{
		featureType: "all",
		stylers: [
			{ saturation: -100 },
			{ lightness: 65}
			]
	  },{
		featureType: "road",
		elementType: "labels",
		stylers: [
		  { lightness: 50 }
		]
	  },{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
		  { lightness: -5 }
		]
	  },{
		featureType: "poi",
		elementType: "all",
		stylers: [
		  { lightness: 45 }
		]
	  }
	];
var scuro_stylez = [
		{
		featureType: "all",
		stylers: [
			{ saturation: -70 },
			{ lightness: -75}
			]
		}
	];
var pale_stylez = [
		{
		featureType: "all",
		stylers: [
			{ saturation: -20 },
			{ lightness: 60}
			]
		}
	];

var MY_MAPTYPE_GRIGIO_ID = 'grigio'; 
var MY_MAPTYPE_SCURO_ID = 'scuro'; 
var MY_MAPTYPE_PALE_ID = 'pale'; 
var MY_MAPTYPE_BW_ID = 'bianco';


/**
 * Is called 'onload' to start creating the map
 */
function _map_loadMap(target){

	var __map = null;

	// if google maps API v3 is loaded
	if ( typeof(google) != 'undefined' && google.maps ){


		var mapTypeIds = [];
            for(var type in google.maps.MapTypeId) {
                mapTypeIds.push(google.maps.MapTypeId[type]);
            }
        mapTypeIds.push("OSM");		
        mapTypeIds.push("MapQuest - OSM");		
        mapTypeIds.push("bianco");		
        mapTypeIds.push("grigio");		
        mapTypeIds.push("scuro");		
		
		var mapOptions = {
			/**
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.TERRAIN, MY_MAPTYPE_PALE_ID, MY_MAPTYPE_GRIGIO_ID, MY_MAPTYPE_BW_ID, MY_MAPTYPE_SCURO_ID]
				,style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
				},
			**/
			mapTypeControlOptions: {
                    mapTypeIds: mapTypeIds,
 					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
              },
			mapTypeId: "OSM",
			mapTypeControl: true,
		    panControl: false,
			zoomControl: true,
			streetViewControl: false,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_BOTTOM
			}
			/**
			,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTEM
			}
			**/
		};

		__map = new google.maps.Map(target, mapOptions);
		
		__map.mapTypes.set("OSM", new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
				return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "OSM",
			maxZoom: 18
		}));
		__map.mapTypes.set("MapQuest - OSM", new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
				return "http://otile1.mqcdn.com/tiles/1.0.0/osm/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
			},
			tileSize: new google.maps.Size(256, 256),
			name: "MapQuest",
			maxZoom: 18
		}));


		__map.mapTypes.set(MY_MAPTYPE_BW_ID, new google.maps.StyledMapType(bw_stylez,{name: "Bianco" }));
		__map.mapTypes.set(MY_MAPTYPE_GRIGIO_ID, new google.maps.StyledMapType(grigio_stylez,{name: "Grigio" }));
		__map.mapTypes.set(MY_MAPTYPE_SCURO_ID, new google.maps.StyledMapType(scuro_stylez,{name: "Scuro" }));
		/**
		__map.mapTypes.set(MY_MAPTYPE_PALE_ID, new google.maps.StyledMapType(pale_stylez,{name: "Pale" }));
		__map.mapTypes.set(MY_MAPTYPE_BW_ID, new google.maps.StyledMapType(bw_stylez,{name: "Bianco" }));
		__map.mapTypes.set(MY_MAPTYPE_GRIGIO_ID, new google.maps.StyledMapType(grigio_stylez,{name: "Grigio" }));
		__map.mapTypes.set(MY_MAPTYPE_SCURO_ID, new google.maps.StyledMapType(scuro_stylez,{name: "Scuro" }));
		**/


		panoramioLayer = new google.maps.panoramio.PanoramioLayer();


		__map.addOverlay = function(overlay){
			overlay.setMap(this);
		};
		__map.removeOverlay = function(overlay){
			overlay.setMap(null);
		};
		__map.openInfoWindowHtml = function(position,szInfo,opt,onclose){
			if ( this.lastInfoWindow ){
				this.lastInfoWindow.close();
				this.lastInfoWindow = null;
			}
			var x = new google.maps.InfoWindow({
					 position: position
//					,content: szInfo
					,maxWidth: opt.maxWidth
					,maxHeight: opt.maxHeight
				});
			x.open(this.getStreetView().getVisible()?this.getStreetView():this);
			// GR 26.09.2011 now here; there was an window size error with V3 if done in object creation (see above) 
			x.setContent(szInfo);
			this.lastInfoWindow = x;

			google.maps.event.addListener(x, 'closeclick', onclose );
		};
		__map.closeInfoWindow = function(){
			if ( this.lastInfoWindow ){
				this.lastInfoWindow.close();
				this.lastInfoWindow = null;
			}
		};
		__map.checkResize = function(){
			google.maps.event.trigger(this, 'resize');
		};

		__map.loadServiceLayer = function(szUrl){
			if ( szUrl.match(/panoramio/) && panoramioLayer ){
				panoramioLayer.setMap(this);	
			}
			if ( szUrl.match(/traffic/) && trafficLayer ){
				trafficLayer.setMap(this);	
			}
		};
		__map.removeServiceLayer = function(szUrl){
			if ( szUrl.match(/panoramio/) && panoramioLayer ){
				panoramioLayer.setMap(null);	
			}
			if ( szUrl.match(/traffic/) && trafficLayer ){
				trafficLayer.setMap(null);	
			}
		};
	}

	htmlMap_intitSynch(__map);

	return __map;
}

/**
 * Is called on resize map div
 */
function _map_checkResize(map){
	if (map){
		map.checkResize();
	}
}

/**
 * Is called to set up directions query	
 */
function _map_addDirections(map,target){
	if (map){
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
//		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(target);
	}
}
/**
 * Is called to clear directions 	
 */
function _map_clearDirections(map){
	if (map){
		directionsDisplay.setMap(null);
		var list = directionsDisplay.getPanel();
		if ( list && list.hasChildNodes() )	{
			while ( list.childNodes.length >= 1 ) {
				list.removeChild( list.firstChild );       
			} 
		}
	}
}
/**
 * Is called to set up layer with realtime traffic information(from Google)
 */
function _map_addTrafficLayer(map,target){
	if (map){
		trafficLayer = new google.maps.TrafficLayer();
	}
}
/**
 * Is called to set event handler	
 */
function _map_addEventListner(map,szEvent,callback){
	if (map){
		szEvent = (szEvent=="moveend")?"idle":szEvent;
		google.maps.event.addListener(map, szEvent, callback );
	}
}
/**
 * Is called 'onunload' to clear objects
 */
function _map_unloadMap(map){
	if (map){
//		GUnload();
	}
}

function _map_getBounds(){
	try {
		var bounds = gmap.getBounds();
		var swPoint = bounds.getSouthWest();
		var nePoint = bounds.getNorthEast();
		swLat = swPoint.lat();
		swLng = swPoint.lng();
		neLat = nePoint.lat();
		neLng = nePoint.lng();

		// correct invers longitude bounds, map around -180/180
		if ( neLng < swLng ){
			neLng += 360;
		}

		return new Array({lat:swLat,lng:swLng},{lat:neLat,lng:neLng});
	} catch (e){
		return null;
	}
}
// set map center and zoom
//
function _map_setMapExtension(map,bBox){
	if (map){
		/**
		var pixelWidth = 500;
		var GLOBE_WIDTH = 256; // a constant in Google's map projection
		var west = bBox[0];
		var east = bBox[2];
		var angle1 = east - west;
		if (angle1 < 0) {
		  angle1 += 360;
		}
		var north = bBox[1];
		var south = bBox[3];
		var angle2 = north - south;
		angle2 = Math.abs(angle2);
		var angle = Math.max(angle1,angle2);
		var zoom = Math.floor(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
		var center = new google.maps.LatLng( bBox[1] + (bBox[3] - bBox[1])/2 , bBox[0] + (bBox[2] - bBox[0])/2 );

		_map_setCenter(map,center);
		_map_setZoom(map,zoom);
		**/
		/**	
		map.fitBounds(new google.maps.LatLngBounds(
			new google.maps.LatLng(bBox[1],bBox[0]),
			new google.maps.LatLng(bBox[3],bBox[2])
			)
		);
		**/

		var dLat = (bBox[1] - bBox[3])*0.1;
		var dLng = (bBox[2] - bBox[2])*0.1;
		gmap.fitBounds(new google.maps.LatLngBounds(
			new google.maps.LatLng(bBox[1]-dLat,bBox[0]+dLng),
			new google.maps.LatLng(bBox[3]+dLat,bBox[2]-dLng)
			)
		);		

	}
}
// set map center and zoom
//
function xxx_map_setMapExtension(map,bBox){
	if (map){
		var dLat = (bBox[3] - bBox[1])*0.1;
		var dLng = (bBox[2] - bBox[0])*0.1;
		map.fitBounds(new google.maps.LatLngBounds(
			new google.maps.LatLng(bBox[1]+dLat,bBox[0]+dLng),
			new google.maps.LatLng(bBox[3]-dLat,bBox[2]-dLng)
			)
		);	
	}
}
// get map zoom 
//
function _map_getZoom(map){
	if (map){
		return map.getZoom();
	}
	return 0;
}
// get map center 
//
function _map_getCenter(map){
	if (map){
		return map.getCenter();
	}
	return null;
}
// set map zoom 
//
function _map_setZoom(map,nZoom){
	if (map){
		map.setZoom(nZoom);
	}
}
// set map center 
//
function _map_setCenter(map,center){
	if (map){
		map.setCenter(center);
		if (map.getStreetView().getVisible()){
			map.getStreetView().setPosition(center);
		}
	}
}
// set map center and zoom
//
function _map_setCenterAndZoom(map,center,nZoom){
	if (map){
		map.setCenter(center);
		map.setZoom(nZoom);
		if (map.getStreetView().getVisible()){
			map.getStreetView().setPosition(center);
		}
	}
}
function _map_createMyTooltip(marker, text, padding, opt){
	try{
		marker.attachTipTool(text,opt);  //  library method
	}catch (e){}
}
function _map_createMyTooltipListener(element, marker){
  element.onmouseover = function(){
    google.maps.event.trigger(marker, 'mouseover');
  };
  element.onmouseout = function(){
    google.maps.event.trigger(marker, 'mouseout');
  };
  // GR 30.01.2012 onclick must remove tooltip; if not -> icon size problems
  element.onmouseup = function(){
    google.maps.event.trigger(marker, 'mouseout');
  };
}

function _map_setMapType(map,szType){
	if (map){
		var szTypeId = google.maps.MapTypeId.ROADMAP;
		switch ( szType) {
		case "road":
		case "street":
			szTypeId = google.maps.MapTypeId.ROADMAP;
			break;
		case "satellite":
			szTypeId = google.maps.MapTypeId.SATELLITE;
			break;
		case "terrain":
			szTypeId = google.maps.MapTypeId.TERRAIN;
			break;
		}
		map.setMapTypeId(szTypeId);
	}
}
function _map_setMapTilt(map,nTilt) {
	if (map){
		map.setTilt(nTilt);
	}
}
function _map_rotateMap(map,nDegree) {
	if (map){
		var heading = map.getHeading() || 0;
		map.setTilt(45);
		map.setHeading(heading + nDegree);
	}
}
function _map_redraw(){
}

/* ...................................................................* 
 *  Google directions		     	                                  * 
 * ...................................................................*/
  
function __directions_handleErrors(status){

	var result = $("#directions-result")[0];

	if (status == google.maps.DirectionsStatus.INVALID_REQUEST)
		{result.innerHTML = ("La richiesta e invalida!");}
	else
	if (status == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED)
		{result.innerHTML = ("Troppi punti");}
	else
	if (status == google.maps.DirectionsStatus.NOT_FOUND)
		{result.innerHTML = ("Indirizzo sconosciuto. Forse è troppo nuovo o sbagliato");}
	else
	if (status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
		{result.innerHTML = ("Troppi richieste dalla pagina in poco tempo!");}
	else
	if (status == google.maps.DirectionsStatus.REQUEST_DENIED)
		{result.innerHTML = ("Richiesta non permesso!");}
	else
	if (status == google.maps.DirectionsStatus.UNKNOWN_ERROR)
		{result.innerHTML = ("Errore sconosciuto!");}
	else
	if (status == google.maps.DirectionsStatus.ZERO_RESULTS)
		{result.innerHTML = ("Percorso tra origine e destinazione non trovato!");}
	else
	    {result.innerHTML = ("Errore sconosciuto!");}
}

function _map_setDirections(map,fromAddress, toAddress, toHidden, locale) {

	var result = $("#directions-result")[0];
	result.innerHTML = "";

	var start = fromAddress;
	var end = toHidden.length?toHidden:toAddress;
	var request = {
		origin:start,
		destination:end,
        region:locale,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			directionsDisplay.setMap(map);
		}else{
			__directions_handleErrors(status);
		}
	});
}

function _map_setDestinationWaypoint(marker){

	if ( marker ){
		var form = $("#directionsform")[0];
		if ( form ){
			form.to.value = marker.data.name;
			if ( marker.getPosition ){
				form.toHidden.value = marker.getPosition();
			}
			else if( marker.getVertex ){
				form.toHidden.value = marker.getVertex(0);
			}
		}
	}
}

/* ------------------------------------------------------------------ * 
	Synchronization of SVG and Google map
* ------------------------------------------------------------------ */

/** 
 * interchange format of bounds is an array of 2 lat/lon point objects
 * array({lat:p1.lat,lng:p1.lng},{lat:p2.lat,lng:p2.lng}); 
 * p1 = south/west point; p2 = north/east point
 */
if ( typeof(gmap) == "undefined" ){
	var gmap = null;
}
function htmlMap_intitSynch(map){
	gmap = map;
	if ( typeof(htmlgui_synchronizeSVG) != "undefined" ){
		google.maps.event.addListener(gmap, "bounds_changed", htmlgui_synchronizeSVG );
		google.maps.event.addListener(gmap, "dragend",  htmlgui_panSVGEnd );
		google.maps.event.addListener(gmap, "dragstart", htmlgui_panSVGStart );
		google.maps.event.addListener(gmap, "drag", htmlgui_panSVG );
	}
}

function htmlMap_getZoom(){
	return gmap.getZoom();
}

function htmlMap_getCenter(){
	var center = gmap.getCenter();
	return {lat:center.lat(),lng:center.lng()};
}

function htmlMap_getBounds(){

	var bounds = gmap.getBounds();
	var swPoint = bounds.getSouthWest();
	var nePoint = bounds.getNorthEast();
	return new Array({lat:swPoint.lat(),lng:swPoint.lng()},{lat:nePoint.lat(),lng:nePoint.lng()});
}

function htmlMap_setCenter(ptLatLon){

	if ( ptLatLon ){
		gmap.setCenter(new google.maps.LatLng(ptLatLon.lat,ptLatLon.lng));		
	}
}

function htmlMap_setBounds(arrayPtLatLon){

	if (arrayPtLatLon && (arrayPtLatLon.length == 2) ){
		var dLat = (arrayPtLatLon[0].lat - arrayPtLatLon[1].lat)*0.1;
		var dLng = (arrayPtLatLon[1].lng - arrayPtLatLon[0].lng)*0.1;
		gmap.fitBounds(new google.maps.LatLngBounds(
			new google.maps.LatLng(arrayPtLatLon[0].lat-dLat,arrayPtLatLon[0].lng+dLng),
			new google.maps.LatLng(arrayPtLatLon[1].lat+dLat,arrayPtLatLon[1].lng-dLng)
			)
		);		
	}
}


// google maps api v2 emulation
// ----------------------------
GLatLngBounds = function(sw,ne) {
	return new google.maps.LatLngBounds(sw,ne);
};
GLatLng = function(lat,lng) {
	return new google.maps.LatLng(lat,lng);
};

GPolyline = function(polyPoints,color,width,opacity) {
	var x = new google.maps.Polyline({
                path: polyPoints,
                strokeColor: color,
                strokeOpacity: opacity,
                strokeWeight: width
			});
	x.getPosition = function() {
		return x.getPoint();
	};
	return x;
};
GPolygon = function(polyPoints,lineColor,lineWidth,lineOpacity,fillColor,fillOpacity) {
	var x = new google.maps.Polygon({
                paths: polyPoints,
                strokeColor: lineColor,
                strokeOpacity: lineOpacity,
                strokeWeight: lineWidth,
                fillColor: fillColor,
                fillOpacity: fillOpacity
			});
	x.getPosition = function() {
		return x.getPoint();
	};
	return x;
};
GMarker = function(point,opt) {
     var x = new google.maps.Marker({
//          title: opt.title,
		  icon: new google.maps.MarkerImage(
			  opt.icon.image,
			  // This marker is 20 pixels wide by 32 pixels tall.
			  opt.icon.iconSize,
			  // The origin for this image is 0,0.
			  new google.maps.Point(0,0),
			  // The anchor for this image is the base of the flagpole at 0,32.
			  opt.icon.iconAnchor,
			  // icon scale	
			  opt.icon.iconSize
			),
          position: point,
          clickable: true,
          draggable: false,
          flat: false
        });
	x.getPoint = function() {
		return x.getPosition();
	};
	return x;
};

G_DEFAULT_ICON = 0;
GIcon = function(){
	return new Object();
};
GSize = function(w,h){
	if ( typeof(google) != 'undefined' ){
		return new google.maps.Size(w,h);
	}else{
		return {width:w,height:h};
	}
};
GPoint = function(x,y){
	if ( typeof(google) != 'undefined' ){
		return new google.maps.Point(x,y);
	}else{
		return {x:x,y:y};
	}
};

// -----------------------------
// EOF
// -----------------------------

