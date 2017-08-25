/**********************************************************************
maptune_map_ext.js

$Comment: provides JavaScript extensions for MapTune Google Maps Mashup
$Source :maptune_map_ext.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/07/19 $
$Author: guenter richter $
$Id:easynido_map_ext.js 1 2012-07-19 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune_map_ext.js,v $
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

			if (szContext.match(/map/) ){

				szInfo += "<div class='InfoWindowBody' style='height:7px;margin-top:10px;' >";
				/**
				var szStreet  = "<div style='float:right;margin-top:0px;margin-left:5px;margin-bottom:7px;'>";
					szStreet += maptune.jsapi.getStreetLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
					szStreet += "</div>";
				szInfo += szStreet;
				var szRoute  = "<div style='float:right;margin-top:0px;margin-left:5px;margin-bottom:7px;'>";
					szRoute += maptune.jsapi.getNavLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
					szRoute += "</div>";
				szInfo += szRoute;
				**/

				szInfo += "</div>";
			}
		}

		// --------------------------------------------
		// add zoomto button
		// --------------------------------------------
		if ( 1 ){
			var szStreet  = "<div style='float:right;margin-left:5px;margin-top:-5px;'>";
				szStreet += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szStreet += "</div>";
			szInfo += szStreet;
		}

		return szInfo;
	};

	// helper

	// create link to call navigator from destination string
	// ----------------------------------------------------------------
	maptune.jsapi.getNavLink = function(szDestination){
		return ("<a href='http://maps.google.com/maps?daddr="+szDestination+"' target='_blank' class='dir-link-map' data-role='button' data-inline='true' data-theme='c' ></a>");
	};
	// create link to call streetview from destination string
	// ----------------------------------------------------------------
	maptune.jsapi.getStreetLink = function(szDestination){
		return ("<a href='#' onclick='event.stopPropagation();maptune.jsapi.showStreeView("+szDestination+");' class='streetview-link-map' data-role='button' data-inline='true' data-theme='c' ></a>");
	};
	// create link to zoom to item
	// ----------------------------------------------------------------
	maptune.jsapi.getZoomLink = function(szDestination){
		return ("<a href='#' onclick='event.stopPropagation();maptune.jsapi.zoomTo("+szDestination+");maptune.jsapi.forceMap();' ><img src='resources/ui/zoomto.png' height='24' /></a>");
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

		// enter user code here to change item icon
		// --->

		/*
		if ( info.properties.data && info.properties.data.CIRCCM ){	

			switch(info.properties.name){
				case "Platano comune":
				case "Ginkgo":
					icon.image = "resources/icons/default/default_green.png";
					break;
				case "Tiglio ibrido":
				case "Tiglio":
					icon.image = "resources/icons/default/default_dark_green.png";
					break;
				case "Alloro":
					icon.image = "resources/icons/default/default_dark_petrol.png";
					break;
				case "Leccio":
					icon.image = "resources/icons/default/default_light_green.png";
					break;
				case "Cedro del libano":
				case "Cedro dell'Atlante":
					icon.image = "resources/icons/default/default_dark_petrol.png";
					break;
				case "Pino":
				case "Pino domestico":
					icon.image = "resources/icons/default/default_petrol.png";
					break;
				case "Bagolaro":
					icon.image = "resources/icons/default/default_middle_green.png";
					break;
				case "Cipresso comune":
					icon.image = "resources/icons/default/default_dark_green.png";
					break;
				default:
					icon.image = "resources/icons/default/default_dark_green.png";
					break;
			}
			var nSize = info.properties.data.CIRCCM/100;
			nSize = Math.max(0.5,Math.min(1.2,nSize));
			icon.iconSize = new GSize(32*nSize, 32*nSize);
			icon.iconAnchor = new GPoint(16*nSize, 32*nSize);
			icon.infoWindowAnchor = new GPoint(15*nSize, 6*nSize);
			return icon;
		}
		**/
		return null;
	};

	/*
	 * called when a layer is to be drawn
	 */

	maptune.jsapi.onDrawLayer = function(szName) {
	}

	/* ...................................................................* 
	 *  handle views (map,list,both)                                      * 
	 * ...................................................................*/ 

	var fFooterTransparent = false;
	var fFullScreenList = false; 
	var nAnimateDuration = 400; 

	/*
	 * make map visible 
	 */
	maptune.jsapi.forceMap = function(){
		if ( !fFullScreenList ){
			return;
		}
		if ( maptune.jsapi.szAcualView && (maptune.jsapi.szAcualView == "list") ){
			this.setView("map");
		}
		if ( maptune.jsapi.szAcualView && (maptune.jsapi.szAcualView == "both") ){
		}
	};
	/*
	 * set actual view 
	 * @param szMode the new map view mode
	 */
	maptune.jsapi.setView = function(szMode){

		var actIcon = $("#view-select-icon").attr("src");
		var szColor = actIcon.match(/white/i)?"white":"blu";

		switch(szMode){
			case "map":
				setMap();
				$("#view-select-icon").attr("src","resources/ui/list_"+szColor+".png");
				break;
			case "list":
				if ( setList() ){
					$("#view-select-icon").attr("src","resources/ui/map-marker_"+szColor+".png");
				}else{
					$("#view-select-icon").attr("src","resources/ui/close-left_"+szColor+".png");
				}
				break;
			case "next":
				if ( this.szAcualView == 'map' ){
					this.setView('list');
					return;
				}else if ( this.szAcualView == 'both' ){
					this.setView('list');
					return;
				}else if ( this.szAcualView == 'list' ){
					this.setView('map');
					return;
				}
				break;
			default:
				setBoth();
		}
		maptune.jsapi.szAcualView = szMode;
		setTimeout("maptune.jsapi.checkResize();",1000);
	};
	/*
	 * get actual view 
	 * @return the actual view (map|list|both)
	 */
	maptune.jsapi.getView = function(){
		if ( $("#sidebar").css("visibility") == "hidden" ){
			return "map";
		} else
		if ( $("#map-content").css("visibility") == "hidden" ){
			return "list";
		} else {
			return "both";
		}
	};
	maptune.jsapi.toggleFullscreen = function(){
		var actIcon = $("#screen-select-icon").attr("src");
		var szColor = actIcon.match(/white/i)?"white":"blu";
		if ( this.fullScreen === true ){
			this.setEmbedscreen();
			$("#screen-select-icon").attr("src","resources/ui/fullscreen_"+szColor+".png");
		}else{
			this.setFullscreen();
			$("#screen-select-icon").attr("src","resources/ui/window_"+szColor+".png");
		}
	}
	maptune.jsapi.setFullscreen = function(){
		try {
			maptune.dispatchToParentApi("toFullscreen()");
			this.fullScreen = true;
		} catch (e)	{
			window.parent.window.open(window.location);
		}
	}
	maptune.jsapi.setEmbedscreen = function(){
		try {
			maptune.dispatchToParentApi("toEmbedscreen()");
			this.fullScreen = false;
		} catch (e)	{}
	}

	maptune.dispatchToParentApi = function(szMap,szFunc){
	maptune.iframe.parentExec();
	if ( maptune.embededApiA && Object.getOwnPropertyNames(maptune.embededApiA).length ){
			eval("maptune.embededApiA['"+(szMap||'map')+"']."+szFunc);
		}else{
			maptune.iframe.exec("embed-cross","maptune."+szFunc);
		}

	};




	/*
	 * intercept window resize, and autoadapt the map view to the aspect ratio  
	 */
	var __nHeaderHeight = 0;
	maptune.jsapi.onWindowResize = function(){

		var ratio = window.innerWidth / window.innerHeight;
		if ( ratio > 1 ){
			if ( maptune.jsapi.szAcualView == "both" ){
				maptune.jsapi.checkResize();
				return;
			}
			if (0){
				__nHeaderHeight = $("#hdr").height();
				$("#hdr").css("height","0px");
				$("#hdr").css("visibility","hidden");
			}
			maptune.jsapi.setView("both");
		}else{
			if (0){
				$("#hdr").css("height",__nHeaderHeight+"px");
				$("#hdr").css("visibility","visible");
			}
			maptune.jsapi.setView("map");
		}
	};

	/*
	 * show only the map 
	 */
	setMap = function(){

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight - 3;
		var maxWidth  = window.innerWidth;

		$("#content").css("height",(maxHeight)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		$("#map").css("top",(0)+"px");
		$("#map").animate({left:(0)+'px'},nAnimateDuration);
		$("#map").css("width",(maxWidth)+"px");
		$("#map").css("height",(maxHeight)+"px");

		$("#sidebar").css("position","absolute");
		$("#sidebar").css("top","0px");
		$("#sidebar").css("left","0px");
		$("#sidebar").css("width","0px");
		$("#sidebar").css("height",(maxHeight)+"px");

		$("#layer-dialog-button").css("visibility","visible");
		$("#timelapbuttons-date").show();

		maptune.jsapi.setSidebarClipping(false);
		maptune.jsapi.setSidebarAutoScroll(true);
		maptune.jsapi.setSidebarTooltips(true);
		maptune.jsapi.checkResize();

		setTimeout('$("#myIntroDiv").animate({opacity:0},2000)',3000);
	};

	/*
	 * show only the list of the map items 
	 */
	setList = function(){

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight - 2;
		var maxWidth  = window.innerWidth;

		$("#sidebar").show();

		$("#content").css("height",(maxHeight-1)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		$("#sidebar").css("position","absolute");
		$("#sidebar").css("top","0px");
		$("#sidebar").css("left","0px");
		$("#sidebar").css("width","0px");
		$("#sidebar").css("height",(maxHeight)+"px");

		var sidebarFooterHeight = 0||$("#sidebar-footer").height();
		$("#itemlist").css("height",(maxHeight-sidebarFooterHeight-7)+"px");

		fFullScreenList = (maxWidth <= 500);
		if ( fFullScreenList ){
			var sidebarWidth = maxWidth;
			$("#sidebar").css("width",(sidebarWidth)+"px");
			$("#map").animate({left:(sidebarWidth)+'px'},nAnimateDuration);
		}else{
			var sidebarWidth = Math.max(350,Math.floor(maxWidth/3));
			$("#sidebar").css('width',(sidebarWidth)+'px');
			$("#map").animate({left:(sidebarWidth)+'px'},nAnimateDuration);
			setTimeout('$("#map").css("width","'+(maxWidth-sidebarWidth)+'px")',nAnimateDuration);
		}

		$("#layer-dialog-button").css("visibility","hidden");
		$("#timelapbuttons-date").hide();

		maptune.jsapi.setSidebarClipping(true);
		maptune.jsapi.setSidebarAutoScroll(true);
		maptune.jsapi.setSidebarTooltips(true);
		maptune.jsapi.setSidebarTooltips(true,true);
		maptune.jsapi.checkResize();

		if ( 0 && !fFullScreenList ){
			if ( !document.getElementById("sidebar-delete-button") ){
				var deleteButton = document.createElement("div");
				deleteButton.setAttribute("id","sidebar-delete-button");
				var szHTML = "<a href=\"javascript:maptune.jsapi.setView('map');\"><img src='resources/ui/delete.png' height='22' style=\"position:absolute;top:10px;right:10px;\" /></a>";
				deleteButton.innerHTML = szHTML;
				$("#sidebar")[0].appendChild(deleteButton);
			}
		}
		return fFullScreenList;
	};

	/*
	 * show map and list (sidebar)
	 */
	setBoth = function(){

		var headerHeight = $("#hdr").height();
		var footerHeight = $("#ftr").height();
		var maxHeight = window.innerHeight - headerHeight - footerHeight - 2;
		var maxWidth  = window.innerWidth;

		$("#sidebar").show();

		$("#content").css("height",(maxHeight-1)+"px");
		$("#content").css("width",(maxWidth)+"px");
		$("#content").css("overflow","hidden");

		if ( 1 ){
			var sidebarWidth = Math.max(250,maxWidth*0.3);
			$("#sidebar").css("position","absolute");
			$("#sidebar").css("top",(-2)+"px");
			//$("#sidebar").css("left",(maxWidth-sidebarWidth)+"px");
			$("#sidebar").css("width",sidebarWidth+"px");
			$("#sidebar").css("height",maxHeight+"px");
			$("#sidebar").animate({left:(maxWidth-sidebarWidth+5)+'px'},nAnimateDuration);

			$("#map").css("top",(0)+"px");
			$("#map").css("left","0px");
			$("#map").animate({width:(maxWidth-sidebarWidth)+'px'},nAnimateDuration);
			//$("#map").css("width",(maxWidth-sidebarWidth)+"px");
			$("#map").css("height",(maxHeight)+"px");


		}else{
			$("#map").css("width","100%");
			$("#map").css("height",maxHeight*0.66+"px");
			$("#sidebar").css("position","relative");
			$("#sidebar").css("top","0px");
			$("#sidebar").css("left","0px");
			$("#sidebar").css("width","100%");
			$("#sidebar").css("height","100%");
		}

		$("#layer-dialog-button").css("visibility","hidden");
		$("#timelapbuttons-date").show();

		maptune.jsapi.setSidebarClipping(false);
		maptune.jsapi.setSidebarAutoScroll(true);
		maptune.jsapi.setSidebarTooltips(true,true);
		maptune.jsapi.redraw();

		maptune.jsapi.checkResize();
	};


	/*
	 * make images clickable to zoom them in a lightbox
	 * @param id the id of the element (div)
	 */
	maptune.clickableImages = function(szId){
		$("#"+szId).find("img").each( function( index ) {
		  var src = $( this ).attr("src");
		  var title = $( this ).attr("title");
		  if ( !src.match(/resources\/ui/) ) {
			$( this ).attr("onclick","event.stopPropagation();maptune.jsapi.onImageClick(\""+src+"\",\""+title+"\");");
		  }
		});
		$("."+szId).find("img").each( function( index ) {
		  var src = $( this ).attr("src");
		  var title = $( this ).attr("title");
		  if ( !src.match(/resources\/ui/) ) {
			$( this ).attr("onclick","event.stopPropagation();maptune.jsapi.onImageClick(\""+src+"\",\""+title+"\");");
		  }
		});
	};
 
	
})();

/**
 * end of namespace
 */

/* ...................................................................* 
 *  scroll div workaround for adroid browser < 4.0                    * 
 * ...................................................................*/ 

window.maptune = window.maptune || {};
(function() {

	/*
	 * local helper function
	 */
	TS_isTouchDevice = function(){
		try{
			document.createEvent("TouchEvent");
			return true;
		}catch(e){
			return false;
		}
	};

	/*
	 * continue scrolling a while
	 */
	TS_touchScrollTail = function(){
		if ( TS_lastTouchElement && TS_lastTouchOff ){
			TS_lastTouchElement.scrollTop -= TS_lastTouchOff;
			var dOff = Math.abs(Math.round(TS_lastTouchOff/3));
			if ( dOff ){
				TS_lastTouchOff -= TS_lastTouchOff<0?-dOff:dOff;
				setTimeout("TS_touchScrollTail()",20);
			}else{ 
				var mouseupEvent = document.createEvent ("MouseEvent");
				mouseupEvent.initMouseEvent ("mouseup", true, true, window, 0, 
											event.screenX, event.screenY, event.clientX, event.clientY, 
											event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
											0, null);
                TS_lastTouchElement.dispatchEvent (mouseupEvent);
			}
		}
	};

	var TS_lastTouchY = 0;
	var TS_lastTouchOff = 0;
	var TS_lastTouchElement = 0;

	/*
	 * apply scroll workaround to one HTML element (div) given by its id
	 * @param id the id of the element (div)
	 */
	maptune.touchScroll = function(id){
		if(TS_isTouchDevice()){ //if touch events exist...
			var el=document.getElementById(id);
			var scrollStartPos=0;

			document.getElementById(id).addEventListener("touchstart", function(event) {
				scrollStartPos=this.scrollTop+event.touches[0].pageY;
				TS_lastTouchY = event.touches[0].pageY;
				//event.preventDefault();
			},false);

			document.getElementById(id).addEventListener("touchmove", function(event) {
				this.scrollTop=scrollStartPos-event.touches[0].pageY;
				TS_lastTouchOff = event.touches[0].pageY-TS_lastTouchY;
				TS_lastTouchY = event.touches[0].pageY;
				event.preventDefault();
			},false);

			document.getElementById(id).addEventListener("touchend", function(event) {
				setTimeout("TS_touchScrollTail()",20);
				TS_lastTouchElement = this;
				//event.preventDefault();
			},false);
		}
	};

})();

/**
 * end of namespace
 */

// -----------------------------
// EOF
// -----------------------------
