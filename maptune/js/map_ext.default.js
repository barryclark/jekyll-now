/**********************************************************************
map_ext.default.js

$Comment: provides JavaScript extensions for MapTune Google Maps Mashup
$Source :map_ext.default.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/07/19 $
$Author: guenter richter $
$Id:easynido_map_ext.js 1 2012-07-19 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_ext.default.js,v $
**********************************************************************/

/** 
 * @fileoverview This file defines user extensions to the MapTune Google Maps Mashup from feed data created by maptune
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

/**
 * define namespace maptune
 */

window.maptune = window.maptune || {};
maptune.jsapi = maptune.jsapi || {};
(function() {

	/* ...................................................................* 
	 *  map styling extensions                                            * 
	 * ...................................................................*/ 

	/*
	 * called before an info window is opened, gives the possibility to change the info title
	 * @param szTitle the actual (default) info window title
	 * @param info the JSON object that describes the window item (maptune layer JSON format)
	 * @type string
	 * @return new title
	 */

	maptune.jsapi.onInfoWindowTitle = function(szTitle,info) {

		// ===========================================
		// case A) we have data properties
		// ===========================================
		if ( info.properties && info.properties.data ){

			// enter user code here to change szTitle
			// --->

		}else{
		// ===========================================
		// case B) try to parse data from szInfo
		// ===========================================
			if ( info.properties && info.properties.description ){

			// enter user code here to change szTitle
			// --->

			}
		}
		return szTitle;
	};


	/*
	 * called before an tooltip for the marker is defined
	 * @param szTooltip the actual (default) tooltip
	 * @param info the JSON object that describes the window item (maptune layer JSON format)
	 * @type string
	 * @return new tooltip
	 */

	maptune.jsapi.onMarkerTooltip = function(szTooltip,info) {

		// ===========================================
		// case A) we have data (nidi,...)
		// ===========================================
		if ( info.properties && info.properties.data ){

			// enter user code here to change szTooltip
			// --->

		}else{
		// ===========================================
		// case B) try to parse data from szInfo
		// ===========================================
			if ( info.properties && info.properties.description ){

			// enter user code here to change szTooltip
			// --->

			}
		}
		return szTooltip;
	};

	/*
	 * called before an info window is opened, gives the possibility to add/change the content
	 * @param szInfo the actual (default) info window content
	 * @param info the JSON object that describes the window item (maptune layer JSON format)
	 * @type string
	 * @return new description
	 */

	maptune.jsapi.onOpenInfoWindow = function(szInfo,info,szContext) {

		// ===========================================
		// case A) we have data  
		// ===========================================
		if ( info.properties && info.properties.data ){

			// enter user code here to change szInfo
			// --->

		}else{
		// ===========================================
		// case B) try to parse data from szInfo
		// ===========================================
			if ( info.properties && info.properties.description ){

			// enter user code here to change szInfo
			// --->

			}
		}
	
		// --------------------------------------------
		// add streetview and directions buttons
		// --------------------------------------------
		if ( info.geometry && info.geometry.coordinates ){

			szInfo += "<div class='InfoWindowBody' style='height:7px;' >";
			var szStreet  = "<div style='float:right;margin-top:0px;margin-left:5px;margin-bottom:7px;'>";
				szStreet += maptune.jsapi.getStreetLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szStreet += "</div>";
			szInfo += szStreet;

			var szRoute  = "<div style='float:right;margin-top:0px;margin-left:5px;margin-bottom:7px;'>";
				szRoute += maptune.jsapi.getNavLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szRoute += "</div>";
			szInfo += szRoute;

			szInfo += "</div>";
		}

		return szInfo;
	};

	// helper

	// create link to call navigator from destination string
	// ----------------------------------------------------------------
	maptune.jsapi.getNavLink = function(szDestination){
		return ("<a href='http://maps.google.com/maps?daddr="+szDestination+"' class='dir-link-map' data-role='button' data-inline='true' data-theme='c' ></a>");
	};
	// create link to call streetview from destination string
	// ----------------------------------------------------------------
	maptune.jsapi.getStreetLink = function(szDestination){
		return ("<a href='javascript:maptune.jsapi.showStreeView("+szDestination+");' class='streetview-link-map' data-role='button' data-inline='true' data-theme='c' ></a>");
	};
	// use yahoo YQL webservice as proxy to get around origin problems
	// ----------------------------------------------------------------
	maptune.jsapi.addMyMapFeed = function(szLayer,szName,szType,szFlag,szTitle){
		var szUrl  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D";
			szUrl += "'"+encodeURIComponent(szLayer)+"'";
			szUrl += szName.match(/GeoRSS/)?"&format=rss&diagnostics=true":"&format=json&diagnostics=true";
		maptune.feed.addFeed(szUrl,{"name":szName,"type":szType,"flag":szFlag,'title':szTitle});
	};
	// switch map to street view 
	// ----------------------------------------------------------------
	maptune.jsapi.showStreeView = function(lat,lng){
		var map = maptune.jsapi.getMapHandle();
		var panorama = map.getStreetView();

		panorama.setPosition(new google.maps.LatLng(lat,lng));
		panorama.setPov({
			heading: 265,
			zoom:1,
			pitch:0}
			);
		panorama.setVisible(true);

		if (event && event.stopPropagation){
			event.stopPropagation();
		}
		else if(window.event){
			window.event.cancelBubble=true;
		}
	};

	/*
	 * called when an icon is requested by the map
	 * @param icon the actual (default) icon
	 * @param info the JSON object that describes the window item (maptune layer JSON format)
	 */

	maptune.jsapi.onGetIcon = function(icon,info,i) {

		// enter user code here to change icon
		// --->

		return null;
	};

})();

/**
 * end of namespace
 */

// -----------------------------
// EOF
// -----------------------------
