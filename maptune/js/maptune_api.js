/**********************************************************************
	 maptune_api.js

$Comment: provides api functions to control embedded maptune apps
$Source : maptune_api.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2011/10/29 $
$Author: guenter richter $
$Id: maptune_api.js 1 2011-10-29 10:51:41Z Guenter Richter $

Copyright (c) Guenter Richter
$Log: maptune_api.js,v $
**********************************************************************/

/** 
 * @fileoverview This file provides api functions to control an embedded maptune app<br>
 * @author Guenter Richter guenter.richter@medienobjekte.de
 * @version 1.0 
 */

window.maptune = window.maptune || {};
window.maptune = window.maptune || {};
maptune.jsapi = maptune.jsapi || {};
(function() {

	// ------------------------------------------------
	// cross domain messaging
	// ------------------------------------------------

	// listen to messages and execute coded functions
	// ----------------------------------------------

	maptune.waitCallback = null;
	window.addEventListener("message", receiveMessage, false);  
	function receiveMessage(e)  {
		if ( e.data.match(/executeThis/) ){
			eval(e.data.substr(12,e.data.length-12));
		}else
		if ( e.data.match(/waitForMap/) ){
			maptune.waitForEmbeddedMap("map", function(mapApi){
				try{
					parent.maptune.embededApi = mapApi;
				}catch (e){}
				parent.postMessage("isMap","*");
			});
		}else
		if ( e.data.match(/isMap/) ){
			maptune.waitCallback();
		}
	} 
	
	// send messages to execute functions across (cross domain) iframes
	// ---------------------------------------------------------------------

	maptune.iframe = maptune.iframe || {};

	maptune.iframe.exec = function(szFrame,szFunction){
		var frame = window.document.getElementById(szFrame);
		if ( frame ){
			frame.contentWindow.postMessage("executeThis:"+szFunction,"*");
		}
	};
	maptune.iframe.parentExec = function(szFunction){
		parent.postMessage("executeThis:"+szFunction,"*");
	};

	maptune.dispatchToParentApi = function(szFunc){
		try	{ eval("maptune.parentApi."+szFunc); }
		catch (e){ maptune.iframe.parentExec("maptune."+szFunc); }
	};

	// special function to get a callback if map loaded
	//
	maptune.iframe.waitForMap = function(szFrame,callback){
		var frame = window.document.getElementById(szFrame);
		if ( frame ){
			maptune.waitCallback = callback;
			frame.contentWindow.postMessage("waitForMap","*");
		}
	};

	// function to be executed by the hosting page ( which has the iframe with the embedded maptune) 
	// ---------------------------------------------------------------------------------------------
	//
	// make actual map fullscreen
	//
	maptune.iframe.toFullscreen = function(szFrame){
		var frame = window.parent.window.document.getElementById(szFrame||"maptune");
		if (frame){
			var width = window.parent.window.innerWidth;
			var height = window.parent.window.innerHeight;
			maptune.iframe.embedWidth  = frame.getAttribute("width");
			maptune.iframe.embedHeight = frame.getAttribute("height");
			maptune.iframe.embedStyle  = frame.getAttribute("style");
			frame.setAttribute("width",String(width)+"px");
			frame.setAttribute("height",String(height)+"px");
			frame.setAttribute("style","position:absolute;top:0px;left:0px;");
		}
		return;
	};
	// go back to original embed size
	//
	maptune.iframe.toEmbedscreen = function(szFrame){
		var frame = window.parent.window.document.getElementById(szFrame||"maptune");
		if (frame){
			frame.setAttribute("width",String(maptune.iframe.embedWidth)+"px");
			frame.setAttribute("height",String(maptune.iframe.embedHeight)+"px");
			frame.setAttribute("style",String(maptune.iframe.embedStyle));
		}
		return;
	};
	// adapt the embed size to the window size
	//
	maptune.iframe.resizeEmbed = function(szFrame){
		var width  = window.parent.window.innerWidth;
		var height = window.parent.window.innerHeight;
		var frame  = window.parent.window.document.getElementById(szFrame||"maptune");
		if ( frame && (height > width) ){
			frame.setAttribute("width",String(width-30)+"px");
		}
	};

	// -------------------------------------------------------------
	// API embedding for non cross domain iframes
	// the child registers itself to the parent, to enable bubbling
	// -------------------------------------------------------------

	// --------------------------------------
	// a) embedded apis will register here
	// --------------------------------------

	/** array to store the api objects of embedded maptune windows which have registered to this (HTML) parent */
	maptune.embededApi = null; 
	maptune.embededApiA = new Object(); 

	/**
	 * register the given api (from an embedded map) with the given name
	 * this makes the api accessable from the parent HTML page
	 * @param api the API object
	 * @param szName the name of the map registering the api (must be given as query parameter '&name=' with the maps URL)
	 * @return void
	 */
	maptune.registerApi = function(api,szName){
		if ( api == this ){
			return;
		}
		maptune.embededApi = api;
		maptune.embededApiA[szName] = api;
	};

	// -----------------------------------------
	// b) register this api to the parent window
	// -----------------------------------------

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

		maptune.iframe.resizeEmbed();
	};

	// here we register an embedded matune api to the parent
	// -----------------------------------------------------
	maptune.registerMe();
	// -----------------------------------------------------


	// generate iframe to embed a maptune app
	// --------------------------------------
	maptune.embedViewer = function(szTargetDiv,szUrl,maptune){
		var target = window.document.getElementById(szTargetDiv);
		if ( target ){
			target.innerHTML = "<iframe id=\"myframe\" style=\"border:0;width:100%;height:100%\" src=\""+szUrl+"\" ></iframe>";
		}
	};

	// gives the parent a function to wait for the embedded map
	// --------------------------------------
	maptune.waitForEmbeddedMap = function(szName,fCallBack){
		if ( !maptune.embededApiA[szName] || !maptune.embededApiA[szName].embeddedSVG ){
			setTimeout("maptune.waitForEmbeddedMap('"+szName+"',"+fCallBack+")",1000);
			return;
		}
		fCallBack(maptune.embededApiA[szName]);
	};



	// -----------------------------------------
	// functions to control the mebedded map
	// -----------------------------------------

	/**
	 * execBookmark
	 * @param szName the name of the embedded map
	 * @param szBookmark the bookmark string
	 * @param fClear if true, clears all previout themes
	 * @return void
	 */
	maptune.execBookmark = function(szName,szBookmark,fClear){
			maptune.embededApiA[szName].execBookmark(szBookmark,fClear);
	};

	/**
	 * onWindowResize
	 * @param szName the name of the embedded map
	 * @param box the new window size box
	 * @param zoomto flag true/false
	 * @return void
	 */
	maptune.onWindowResize = function(szName,box,zoomto){
		maptune.embededApiA[szName].onWindowResize(box,zoomto);
	};

	/**
	 * toFullscreen
	 * @return void
	 */
	maptune.toFullscreen = function(){
		maptune.iframe.toFullscreen();
	};

	/**
	 * toEmbedscreen
	 * @return void
	 */
	maptune.toEmbedscreen = function(){
		maptune.iframe.toEmbedscreen();
	};

	/**
	 * addFeedLayer
	 * @return void
	 */
	maptune.addFeedLayer = function(szLayer,opt){
		maptune.embededApi.addFeedLayer(szLayer,opt);
	};
	/**
	 * isFeedLayer
	 * @return true/false
	 */
	maptune.isFeedLayer = function(szLayer){
		return maptune.embededApi.isFeedLayer(szLayer);
	};
	/**
	 * removeFeedLayer
	 * @return true/false
	 */
	maptune.removeFeedLayer = function(szLayer){
		return maptune.embededApi.removeFeedLayer(szLayer);
	};

	// -----------------------------------------
	// functions to synchronize two embedded maps
	// -----------------------------------------

	/**
	 * sync slave maps 
	 * (embedded maps that have been rigistered with a name) 
	 * @param masterApi the api of the map that gives the new envelope
	 * @param ptSW south west point of the new envelope
	 * @param ptSW north east point of the new envelope
	 * @param nZoom html map zoom to set, overrides the zoom of the envelope, necessary because the html map can only have integer zoom levels 
	 * @return void
	 */
	maptune.masterApi = null;
	maptune.syncEmbed = function(masterApi,ptSW,ptNE,nZoom){
		if ( (maptune.masterApi != null) && (maptune.masterApi != masterApi) ){
			return;
		}
		maptune.masterApi = masterApi;
		for ( a in maptune.embededApiA ){
			if ( maptune.embededApiA[a] != masterApi ){
				maptune.embededApiA[a].syncEmbedMap(ptSW,ptNE,nZoom);
			}
		}
		setTimeout("maptune.masterApi = null",1000);
	};

	maptune.fullScreenMap = function(szTemplateUrl){
		for ( a in maptune.embededApiA ){
			maptune.embededApiA[a].fullScreenMap(szTemplateUrl);
		}
	};


	// -----------------------------------------
	// bubble up calls to parent 
	// -----------------------------------------

	maptune.maptune_onInfoDisplayExtend = function(svgDoc,szId){
		return maptune.parentApi.maptune_onInfoDisplayExtend(svgDoc,szId);
	};

	maptune.maptune_onNewTheme = function(szId){
		return maptune.parentApi.maptune_onNewTheme(szId);
	};

	maptune.maptune_onRemoveTheme = function(szId){
		return maptune.parentApi.maptune_onRemoveTheme(szId);
	};

	maptune.maptune_onZoomAndPan = function(){
		return maptune.parentApi.maptune_onZoomAndPan();
	};

	maptune.maptune_drawChart = function(SVGDoc,args){
		return maptune.parentApi.maptune_drawChart(SVGDoc,args);
	};


	// -----------------------------------------
	// helper
	// -----------------------------------------

	/**
	 * helper function to set attribute "unselectable" = "on"  
	 * @return true or false
	 */
	maptune.makeUnselectable = function(szNodeId) {
		var node = window.document.getElementById(szNodeId);
		if ( node ){
			if (node.nodeType == 1) {
				node.setAttribute("unselectable","on");
			}
			var child = node.firstChild;
			while (child) {
				this.makeUnselectable(child);
				child = child.nextSibling;
			}
		}
	};
}( window.maptune = window.maptune || {} ));

// .............................................................................
// EOF
// .............................................................................

