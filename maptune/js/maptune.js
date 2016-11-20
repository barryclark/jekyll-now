/**********************************************************************
maptune.js

$Comment: provides JavaScript for MapTune mobile map applications
$Source : maptune.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/07/30 $
$Author: guenter richter $
$Id:maptune.js 1 2013-02-22 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.js,v $
**********************************************************************/

/** 
 * @fileoverview This file provides JavaScript for MapTune mobile map applications
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

window.maptune = window.maptune || {};
window.maptune = window.maptune || {};

/** 
 * helper to test valid string  
 */
function __ASSERT(szString){
	return (typeof(szString) != 'undefined') && (szString != 'undefined') && (szString.length);
}

// ---------------------------------------------------------------
//
// local storage (HTML5) 
//
// ---------------------------------------------------------------

// init HTML5 localStorage 
// ------------------------
// test if localStorage is upported by browser
// redefine the setItem and getItem procedures for Javascript objects
//
if (typeof (localStorage) === 'undefined') {

	alert('Your browser does not support HTML5 localStorage. Try upgrading.');

} else {

	// redefine storage setter and getter to handle Javascript Objects
	// ---------------------------------------------------------------
	//
	Storage.prototype._setItem = Storage.prototype.setItem;
	Storage.prototype.setItem = function (key, value) {
		if ( typeof(value) == "string" ){
			this._setItem(key, value);
		}else{
			this._setItem(key, JSON.stringify(value));
		}
	};

	Storage.prototype._getItem = Storage.prototype.getItem;
	Storage.prototype.getItem = function (key) {
		try {
			return JSON.parse(this._getItem(key));
		} catch (e) {
			return this._getItem(key);
		}
	};
}

// maptune wrapper for store and retrieve
// ---------------------------------------------------
// in localStorage of HTML5 (if present and allowed)
//
var fAllowLOcalStorage = true;

maptune.getStoredObject = function (szKey) {
	var item = null;
	if ((typeof (localStorage) !== 'undefined') && fAllowLOcalStorage) {
		try {
			item = localStorage.getItem(szKey);
		} catch (e) {}
	}
	return item;
};

maptune.storeObject = function (szKey, object) {
	if ((typeof (localStorage) !== 'undefined') && fAllowLOcalStorage) {
		try {
			localStorage.setItem(szKey, object);
			return;
		} catch (e) {}
	}
};


// -------------------------------------------------------------
// global vars to keep selections and settings during a session 
//
// must be set every time, when, a page is loaded from external
// (not by jquery mobile). For this purpose they are passed 
// as URL parameter if possible (for OAUTH) or cached in local
// storage (see above) if history back points to an absolute URL 
// -------------------------------------------------------------

var __dialog = null;
var __user = null;
var __accessToken = null;
var __szInfoFilter = null;
var __FBMemberA = null;


// --------------------------------------------
//
// local functions for dialogs and data loading 
//
// --------------------------------------------

/**
 * open/close the layer select dialog (menu like)  
 * @param flag 'show' or 'hide'
 * @type void
 */
maptune.selectLayerDialog = function(flag){

	var szLayerHTMLSrc = MapParam.layer?MapParam.layer.href:'./layer.html';

	if ( $("#layer-dialog").css("display") === "block" ){
		flag = 'hide';
	}
	if ( flag && flag === 'hide' ){
		$("#layer-dialog").hide('slide', {direction: 'right'}, 150);
	}else{
		$('#layer-dialog').load( szLayerHTMLSrc + ' #layerlist', function(response, status, xhr) {
			  if (status === "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + "\n" + xhr.statusText);
			  }
			$("#layer-dialog").css("visibility","visible");
//			$("#layer-dialog").css("height","100%");
			$("#layer-dialog").css("z-index","9999");
			$("#layer-dialog").show('slide', {direction: 'right'}, 150);

		});
	}
};

/**
 * open/close the feed select dialog 
 * @param flag 'show' or 'hide'
 * @type void
 */
maptune.selectFeedDialog = function(flag){

	var szFeedHTMLSrc = ((typeof MapParam != 'undefined') && MapParam.layerdialog)?MapParam.layerdialog.href:'./feeds.html';
	
	if ( $("#feed-dialog").css("display") === "block" ){
		flag = 'hide';
	}
	if ( flag && flag === 'hide' ){
		$("#feed-dialog").hide('slide', {direction: 'right'}, 150);
	}else{
		$("#feed-dialog").css("visibility","visible");
		$("#feed-dialog").css("height","100%");
		$("#feed-list").css("height","98%");
		$("#feed-dialog").hide();

		$("head").append($("<link rel='stylesheet' href='./feedlist.css"+ "' type='text/css' media='screen' />"));

		$('#feed-list').load( szFeedHTMLSrc + ' #feedlist', function(response, status, xhr) {
			  if (status === "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + "\n" + xhr.statusText);
			  }
			maptune.touchScroll("feed-list");

			var deleteButton = document.createElement("div");
			deleteButton.setAttribute("id","feedsdialog-delete-button");
			var szHTML = "<a href=\"javascript:maptune.selectFeedDialog('hide');\"><img src='resources/ui/delete.png' height='22' style=\"position:absolute;top:10px;right:10px;\" /></a>";
			deleteButton.innerHTML = szHTML;
			$("#feed-dialog-div")[0].appendChild(deleteButton);
			$("#feed-dialog").show('slide', {direction: 'right'}, 250);
		});
	}
};

/**
 * open/close the help screen dialog 
 * @param flag 'show' or 'hide'
 * @type void
 */
maptune.selectHelpDialog = function(flag){

	if ( $("#help-dialog").css("display") === "block" ){
		flag = 'hide';
	}
	if ( flag && flag === 'hide' ){
		$("#help-dialog").hide('slide', {direction: 'right'}, 150);
	}else{
		$("#help-dialog").css("visibility","visible");
		$("#help-dialog").css("height","100%");
		$("#feed-list").css("height","98%");
		$("#help-dialog").hide();

		$("head").append($("<link rel='stylesheet' href='./help.css"+ "' type='text/css' media='screen' />"));

		$('#help-content').load('./help.html'+' #content', function(response, status, xhr) {
			  if (status === "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + "\n" + xhr.statusText);
			  }
			maptune.touchScroll("help-content");

			var deleteButton = document.createElement("div");
			deleteButton.setAttribute("id","feedsdialog-delete-button");
			var szHTML = "<a href=\"javascript:maptune.selectHelpDialog('hide');\"><img src='resources/ui/delete.png' height='22' style=\"position:absolute;top:10px;right:10px;\" /></a>";
			deleteButton.innerHTML = szHTML;
			$("#help-dialog-div")[0].appendChild(deleteButton);
			$("#help-dialog").show();

		});
	}
};

// add feed try and error
// try different feedtypes until success
// ----------------------------------------------------------------

var __szFeedTypeA	= ["geojson","geojsonR","georss","kml","rss-geonames"];
var __nFeedType		= null;

function __addLayerFeedAutoTypeDetection(next){
	
	// next == null   
	// --> start try feedtypes from list
	// else try next feed type if exists
	//
	if ( !next ){
		__nFeedType = 0;
	}else{
		if ( ++__nFeedType >= __szFeedTypeA.length ){
			return;
		}
	}

	var feedForm  = window.document.getElementById("AddFeedForm");

	maptune.message("try:"+__szFeedTypeA[__nFeedType]);

	switch(__szFeedTypeA[__nFeedType]){
		case "kml":
			maptune.jsapi.addFeed(feedForm.query.value,{"type":'kml',"format":'xml',"flag":'zoomto',"title":'input'},__addLayerFeedAutoTypeDetectionResult);
			break;
		case "georss":
			maptune.jsapi.addFeed(feedForm.query.value,{"type":'GeoRSS',"format":'xml',"flag":'zoomto',"title":'input'},__addLayerFeedAutoTypeDetectionResult);
			break;
		case "xxxgeorss":
			break;
		case "rss-geonames":
			break;
		case "rss-metacarta":
			break;
		case "geojson":
			maptune.jsapi.addFeed(feedForm.query.value,{"type":'GeoJson',"format":'json',"flag":'zoomto',"title":'input'},__addLayerFeedAutoTypeDetectionResult);
			break;
		case "geojsonR":
			// !!! GeoJsonR is with wrong lat/lon coordinates (for berlin feeds)
			break;
		}		

	}
function __addLayerFeedAutoTypeDetectionResult(result){
	if ( !result ){
		__addLayerFeedAutoTypeDetection(1);
	}
}

// add layer defined by feed ( rss, georss, kml, geojson )
// ----------------------------------------------------------------
maptune.addFeedLayer = function(szLayer,opt){
	if ( opt && opt.type && (opt.type == "data") ){
		maptune.addLayer(opt.name,opt.flag,opt.filter,szLayer,opt);
		return;
	}else
	if ( opt && opt.type && (opt.type == "fusiontable") ){
		maptune.feed.addFusionTableLayer(szLayer,opt.col,opt.flag,opt.name,opt);
	}else
	if ( opt && opt.type && (opt.type == "fusiontable_query") ){
		maptune.feed.addFusionTableQuery(szLayer,opt.col,opt.flag,opt.name,opt);
	}else{
		maptune.jsapi.addFeed(szLayer,opt);
	}
	maptune.selectFeedDialog('hide');
};
// add layer defined by feed with unknown format - url given
// ----------------------------------------------------------------
maptune.addFeedLayerInput = function(){
	maptune.selectFeedDialog('hide');
	__addLayerFeedAutoTypeDetection();
};

// add layer defined by my own json
// ----------------------------------------------------------------
maptune.addLayer = function(szLayer,szFlag,szFilter,szSource,opt){
	_TRACE("maptune.addLayer: "+szLayer);
	if ( opt.layer ){
		if ( opt.layer.length ){
			for ( l in opt.layer ){
				maptune.jsapi.setLayerParam(opt.layer[l]);
			}
		}else{
			maptune.jsapi.setLayerParam(opt.layer);
		}
	}
	maptune.jsapi.loadData(szLayer,szFilter,"add|"+szFlag,szSource);
	maptune.selectFeedDialog('hide');
};

// check if layer defined by feed exists
// ----------------------------------------------------------------
maptune.isFeedLayer = function(szLayer){
	return maptune.jsapi.isLayerOfSource(szLayer);
};

// remove layer defined by feed
// ----------------------------------------------------------------
maptune.removeFeedLayer = function(szLayer){
	return maptune.jsapi.removeLayerOfSource(szLayer);
};

// 'play' timeline 
// ----------------------------------------------------------------
maptune.playTimeline = function(option){
	maptune.jsapi.playTimeline(null,option);
};

// reset map
// ----------------------------------------------------------------
maptune.reset = function(){
	maptune.jsapi.reset();
};
maptune.clear = function(){
	maptune.jsapi.clear();
};

// set map view	
// ----------------------------------------------------------------
maptune.setView = function(center,zoom){
	maptune.jsapi.setCenterAndZoom(new GLatLng(center[0],center[1]),zoom);
};

// get actual map bounding box	
// ----------------------------------------------------------------
maptune.getBBox = function(){
	return maptune.jsapi.getBoundingBox();
};

// get actual map zoom	
// ----------------------------------------------------------------
maptune.getZoom = function(){
	return maptune.jsapi.getZoom();
};

// get actual map scale	
// ----------------------------------------------------------------
maptune.getScale = function(){
	return maptune.jsapi.getScale();
};

// register api 
// ----------------------------------------------------------------
	maptune.registerMe = function(){
	
		if ( window.opener ){
			maptune.parentApi = window.opener.maptune;
		}else
		if ( parent ){
			maptune.parentApi = parent.window.maptune;
		}
		else{
			alert("error: missing parent window for parameter !");
		}
		// register the embedded map,
		// in case the parent page holds more than one embedded map, we can sync them
		if (!maptune.szName){
			maptune.szName = "mapTune";
		}
		if ( maptune.parentApi ){
			try{
				maptune.parentApi.registerApi(maptune,maptune.szName );
			}catch (e){}
		}
	};

	maptune.registerMe();

// ============================================================
//
// jquery mobile page handler
//
// ============================================================

if ( $( '#feed_map' ).live ){
	// ---------------------------------
	// initialize map 
	// ---------------------------------

	/**
	 * page 'feed_map.html'  !! on page show !!
	 */
	var defaultLayerDialog = "./layer.html";
	var defaultParamFile = "./param.js";

	$( '#feed_map' ).live( 'pageshow',function(event){

		_TRACE("jquery mobile - on .live init map");

		var paramFile = defaultParamFile;
		if ( $(document).getUrlParam('param') ){
			paramFile = $(document).getUrlParam('param');
		}

		maptune.message("loading",true);

		$.get( paramFile,
			function(data){
				maptune.message("loading",false);
				// compatible with old param.js;
				if ( typeof(MapParam) == "object" ){
					maptune.jsapi.mapParam = MapParam;
				}
				if ( maptune.jsapi.mapParam.defaultmap ){
					maptune.jsapi.reset();
				}
			
				_TRACE("create mapUp -----> leaflet");

				// create map !!!
				// ---------------------------------------------------------------------------------------
				alert("$('#feed_map' ).live");
				var mapUp = new maptune.jsapi.MapUp("map","itemlist","legend",null,"leaflet");

				maptune.jsapi.setView("map");
				maptune.touchScroll("sidebar");

			}).error(function() { alert("error loading MapParam:" +(paramFile)); });
		  

	});

	/**
	 * needed to force map display (see above) after 'add feed' dialog 
	 */
	$( '#dialog' ).live( 'pageshow',function(event){
		__dialog = true;
	});

}

// -------------------------------------
//
// end - jquery mobile handler
//
// -------------------------------------

// -----------------------------
// EOF
// -----------------------------
