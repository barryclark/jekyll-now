/**********************************************************************
map_GoogleV2.js

$Comment: provides JavaScript for Google Api V2 calls
$Source :map_GoogleV2.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2011/01/03 $
$Author: guenter richter $
$Id:map_GoogleV2.js 1 2011-01-03 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_GoogleV2.js,v $
**********************************************************************/

/** 
 * @fileoverview This is the interface to the Google maps API v2
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

/* ...................................................................* 
 *  global vars                                                       * 
 * ...................................................................*/ 

/* ...................................................................* 
 *  Google directions		     	                                  * 
 * ...................................................................*/

  
function __directions_handleErrors(){

	var result = $("#directions-result")[0];

	if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
		result.innerHTML = ("Indirizzo sconosciuto. Forse è troppo nuovo o sbagliato.\n Codice errore: " + gdir.getStatus().code);
	else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
		result.innerHTML = ("Richiesta non riuscita.\n Codice errore: " + gdir.getStatus().code);

	else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
		result.innerHTML = ("Inserire indirizzi! \n Codice errore: " + gdir.getStatus().code);

	else if (gdir.getStatus().code == G_GEO_BAD_KEY)
		result.innerHTML = ("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + gdir.getStatus().code);

	else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
		result.innerHTML = ("A directions request could not be successfully parsed.\n Error code: " + gdir.getStatus().code);

	else  result.innerHTML = ("Errore sconosciuto!");
}

function _map_setDirections(map,fromAddress, toAddress, toHidden, locale) {

	var result = $("#directions-result")[0];
	result.innerHTML = "";

	gdir.loadFromWaypoints([fromAddress,toHidden],
							{ "locale": locale, "preserveViewport":true });
}

function _map_setDestinationWaypoint(marker){

	if ( marker ){
		var form = $("#directionsform")[0];
		if ( form ){
			form.to.value = marker.data.name;
			if ( marker.getLatLng ){
				form.toHidden.value = marker.getLatLng();
			}
			else if( marker.getVertex ){
				form.toHidden.value = marker.getVertex(0);
			}
		}
	}
}

/**
 * Is called 'onload' to start creating the map
 */
function _map_loadMap(target){

	var __map = null;

	// if google maps API v2 is loaded
	if ( GMap2 ){

		// check if browser can handle Google Maps
		if ( !GBrowserIsCompatible()) {
			alert("sorry - your browser cannot handle Google Maps !");
			return null;
		}

		__map = new GMap2(target);

		if ( __map ){
			// configure user map interface
			__map.addControl(new GMapTypeControl());
	//		map.addControl(new GMenuMapTypeControl());
			__map.addControl(new GLargeMapControl3D());
			__map.addControl(new GScaleControl());
			__map.addMapType(G_PHYSICAL_MAP);
			__map.addMapType(G_SATELLITE_3D_MAP);
			__map.enableDoubleClickZoom();
			__map.enableScrollWheelZoom();
		}
	}
	return __map;
}

/**
 * Is called to set up directions query	
 */
function _map_addDirections(map,target){
	if (map){
		gdir = new GDirections(map,target);
		GEvent.addListener(gdir, "error", __directions_handleErrors);
	}
}
/**
 * Is called to set up traffic information layer	
 */
function _map_addTrafficLayer(map,target){
	/* tbd */
}

/**
 * Is called to set event handler	
 */
function _map_addEventListner(map,szEvent,callback,mapUp){
	if (map){
		GEvent.addListener(map, szEvent, GEvent.callback(map,callback,mapUp) );
	}
}
/**
 * Is called 'onunload' to clear objects
 */
function _map_unloadMap(map){
	if (map){
		GUnload();
	}
}

// set map center and zoom
//
function _map_setMapExtension(map,bBox){
	if (map){
		var mapCenter = { lon: (bBox[0] + (bBox[1]-bBox[0])/2) , lat: (bBox[2] + (bBox[3]-bBox[2])/2) };
		var mapZoom = map.getBoundsZoomLevel(new GLatLngBounds(	new GLatLng(bBox[2],bBox[0]),
																		new GLatLng(bBox[3],bBox[1]) ) );
		map.setCenter(new GLatLng(mapCenter.lat, mapCenter.lon), mapZoom);
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
	}
}
// set map center and zoom
//
function _map_setCenterAndZoom(map,center,nZoom){
	if (map){
		map.setCenter(center,nZoom);
	}
}
// create custom tooltip
//
function _map_createMyTooltip(marker, text, padding){
	var tooltip = new Tooltip(marker, text, padding);
	marker.tooltip = tooltip;
	map.addOverlay(tooltip);
}
function _map_createMyTooltipListener(element, tooltip){
	GEvent.addDomListener(element,'mouseover',GEvent.callback(tooltip,
		Tooltip.prototype.show));
	GEvent.addDomListener(element,'mouseout',GEvent.callback(tooltip,
		Tooltip.prototype.hide));
}

// -----------------------------
// EOF
// -----------------------------

