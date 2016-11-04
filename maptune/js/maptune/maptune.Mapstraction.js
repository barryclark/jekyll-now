/**********************************************************************
map_Mapstraction.js

$Comment: provides JavaScript interface for mapstraction calls
$Source :map_Mapstraction.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/03/11 $
$Author: guenter richter $
$Id:map_Mapstraction.js 1 2012-03-12 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_Mapstraction.js,v $
**********************************************************************/

/** 
 * @fileoverview This is the interface to the Mapstraction API 
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

var mapstraction = null;
var geocoder = null;
var ptLatLonInitGMap = null;
var newZoomInitGMap = null;

var mapstraction = null;
var mapDiv = null;

/**
 * Is called 'onload' to start creating the map
 */
function _map_loadMap(target,szMapService) {

		if ( !mxn || !target ){
			return;
		}

		// set the map hosting element
		mapDiv = target;

		var __map = null;

		if ( !szMapService || (typeof(szMapService) == "undefined") || (szMapService.length == 0) ){
			szMapService = "openlayers";
		}
		mapstraction = new mxn.Mapstraction(target.getAttribute("id"),szMapService);

		mapstraction.enableScrollWheelZoom();

		// correct open layers attibution position
		if ( szMapService == "openlayers" ){
			$("div.olControlAttribution").css("bottom","0.4em");
			$("div.olControlAttribution").css("right","1em");
		}
		if ( (szMapService == "leaflet") ){

			/** NOKIA */
			/**
			  mapstraction.addTileLayer("http://maps.nlp.nokia.com/maptiler/v2/maptile/newest/normal.day/{z}/{x}/{y}/256/png8", {
				 name: "NOKIA",
				 myname: "NOKIA",
				 attribution: "Map data: Copyright Nokia, 2013",
				 subdomains: ['khm0','khm1','khm2','khm3']
			  });
			  mapstraction.addTileLayer("http://maptile.maps.svc.ovi.com/maptiler/maptile/newest/normal.day.transit/{z}/{x}/{y}/256/png8", {
				 name: "NOKIA OVI - transit",
				 myname: "NOKIA OVI - transit",
				 attribution: "Map data: Copyright Nokia, 2013",
				 subdomains: ['khm0','khm1','khm2','khm3']
			  });
			**/
			  mapstraction.addTileLayer("http://{s}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=IhE4BDSYudkb1itnuARB&token=5636fffT2ok28aFX4lciGg&lg=ENG", {
				 name: "NOKIA - satellite",
				 myname: "NOKIA - satellite",
				 attribution: 'Map tiles &copy; <a href="http://here.com/">HERE Maps</a>',
				 subdomains: ['1','2','3','4']
			  });

			/** Open Street Map */

			  mapstraction.addTileLayer("http://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap",
				 myname: "OpenStreetMap",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.',
				 subdomains: ['otile1','otile2','otile3','otile4'],
				 maxZoom: 19
			  });
			  mapstraction.addTileLayer("http://tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap - Cycle Map",
				 myname: "OpenStreetMap - Cycle Map",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Tiles courtesy of <a href="http://www.thunderforest.com" target="_blank">Andy Allan</a>',
				 subdomains: ['otile1','otile2','otile3','otile4'],
				 maxZoom: 18
			  });
			  mapstraction.addTileLayer("http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap - b&w",
				 myname: "OpenStreetMap - b&w",
				 attribution: "Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 OpenCycleMap",
				 subdomains: ['a','b','c','d'],
				 maxZoom: 18
			  });
			  mapstraction.addTileLayer("http://korona.geog.uni-heidelberg.de:8008/tms_rg.ashx?x={x}&y={y}&z={z}", {
				 name: "OpenStreetMap - gray",
				 myname: "OpenStreetMap - gray",
				 attribution: "Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 OpenCycleMap",
				 subdomains: ['tiles1','tiles2','tiles3','tiles4'],
				 maxZoom: 18
			  });
			  mapstraction.addTileLayer("http://korona.geog.uni-heidelberg.de:8001/tms_r.ashx?x={x}&y={y}&z={z} ", {
				 name: "OpenStreetMap - roads",
				 myname: "OpenStreetMap - roads",
				 attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				 subdomains: ['tiles1','tiles2','tiles3','tiles4'],
				 maxZoom: 19
			  });
			  mapstraction.addTileLayer("http://korona.geog.uni-heidelberg.de:8007/tms_b.ashx?x={x}&y={y}&z={z}", {
				 name: "OpenStreetMap - admin",
				 myname: "OpenStreetMap - admin",
				 attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				 subdomains: ['tiles1','tiles2','tiles3','tiles4'],
				 maxZoom: 18
			  });
			  /**	
			  mapstraction.addTileLayer("http://korona.geog.uni-heidelberg.de:8007/tms_b.ashx?x={x}&y={y}&z={z}", {
				 name: "OpenStreetMap - admin - dark",
				 myname: "OpenStreetMap - admin - dark",
				 attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				 subdomains: ['tiles1','tiles2','tiles3','tiles4'],
				 maxZoom: 18
			  });
			  **/
			  mapstraction.addTileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap - Humanitarian",
				 myname: "OpenStreetMap - Humanitarian",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Tiles courtesy of <a href="http://hot.openstreetmap.org" target="_blank">Humanitarian OpenStreetMapTeam</a>',
				 subdomains: ['a','b','c'],
				 maxZoom: 20
			  });
			  mapstraction.addTileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap - wikipedia",
				 myname: "OpenStreetMap - wikipedia",
				 attribution: 'Wikimedia maps beta | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
				 subdomains: ['a','b','c'],
				 maxZoom: 20
			  });
			  mapstraction.addTileLayer("http://tile.opencyclemap.org/transport/{z}/{x}/{y}.png", {
				 name: "OpenStreetMap - Transport",
				 myname: "OpenStreetMap - Transport",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Tiles courtesy of <a href="http://www.thunderforest.com" target="_blank">Andy Allan</a>',
				 subdomains: ['otile1','otile2','otile3','otile4'],
				 maxZoom: 20
			  });

			/** MapQuest */
			  mapstraction.addTileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
				 name: "MapQuest - Open",
				 myname: "MapQuest - Open",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>. Tiles courtesy of <a href="http://www.mapquest.com" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
				 subdomains: ['otile1','otile2','otile3','otile4'],
				 maxZoom: 19
			  });

			/** ArcGis */
			 /**
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Topo",
				 myname: "ArcGIS - Topo",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Light Gray Base",
				 myname: "ArcGIS - Light Gray Base",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Light Gray Reference",
				 myname: "ArcGIS - Light Gray Reference",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Terrain Basemap",
				 myname: "ArcGIS - Terrain Basemap",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Ocean Basemap",
				 myname: "ArcGIS - Ocean Basemap",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}.png", {
				 name: "ArcGIS - Reference Overlay",
				 myname: "ArcGIS - Reference Overlay",
				 attribution: "Map data &copy; 2013 ESRI, Imagery &copy; 2013 ESRI",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("http://{s}.maptoolkit.net/terrain/{z}/{x}/{y}.png", {
				 name: "Map Toolkit",
				 myname: "Map Toolkit",
				 attribution: "Map Toolkit",
				 subdomains: ['tile1','tile2','tile3','tile4']
			  });
			  mapstraction.addTileLayer("http://{s}.openpistemap.org/landshaded/{z}/{x}/{y}.png", {
				 name: "landshaded",
				 myname: "landshaded",
				 attribution: "openpistemap",
				 subdomains: ['tiles2','tiles2','tiles2','tiles2']
			  });

			  mapstraction.addTileLayer("#", {
				 name: "Black",
				 myname: "Black",
				 attribution: ".",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			  mapstraction.addTileLayer("#", {
				 name: "White",
				 myname: "White",
				 attribution: ".",
				 subdomains: ['otile1','otile2','otile3','otile4']
			  });
			**/


			/** GeoIQ */
			  mapstraction.addTileLayer("http://{s}.acetate.geoiq.com/tiles/acetate/{z}/{x}/{y}.png", {
				 name: "Stamen - GeoIQ - acetate",
				 myname: "GeoIQ - acetate",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Acetate tileset courtesy of <a href="http://stamen.com" target="_blank">Stamen Design</a>',
				 subdomains: ['a','b','c','d'],
				 maxZoom: 20
			  });

			/** Stamen */

			  mapstraction.addTileLayer("http://a.tile.stamen.com/toner-lite/{z}/{x}/{y}.png", {
				 name: "Stamen - toner-lite",
				 myname: "Stamen - toner-lite",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Tiles courtesy of <a href="http://stamen.com" target="_blank">Stamen Design</a>',
				 subdomains: ['a','b','c','d'],
				 maxZoom: 20
			  });
			  mapstraction.addTileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png", {
				 name: "Stamen - watercolor",
				 myname: "Stamen - watercolor",
				 attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>.'+
							  ' Tiles courtesy of <a href="http://stamen.com" target="_blank">Stamen Design</a>',
				 subdomains: ['a','b','c','d'],
				 maxZoom: 20
			  });

			/** MapBox */

			  mapstraction.addTileLayer("http://{s}.tiles.mapbox.com/v3/examples.bc17bb2a/{z}/{x}/{y}.png", {
				 name: "MapBox - OSM",
				 myname: "MapBox - OSM",
				 attribution: "Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 OpenStreetMap",
				 subdomains: ['a','b','c','d']
			  });

			/** CartoDB */
			  mapstraction.addTileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
				 name: "CartoDB - Positron",
				 myname: "CartoDB - Positron",
				 attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a></a>",
				 subdomains: ['a','b','c','d']
			  });
			  mapstraction.addTileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
				 name: "CartoDB - Dark matter",
				 myname: "CartoDB - Dark matter",
				 attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a></a>",
				 subdomains: ['a','b','c','d']
			  });

			/** ThunderForest */
			  mapstraction.addTileLayer("https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png", {
				 name: "ThunderForest - pioneer",
				 myname: "ThunderForest - pioneer",
				 attribution: "Map data &copy; 2015 OpenStreetMap contributors, Imagery &copy; 2015 ThunderForest",
				 subdomains: ['a','b','c']
			  });

			/** Spaghetti Opne Data */

			  mapstraction.addTileLayer("http://public.maptune.com/stage/maps/tiles/FB_SOD/{z}/{x}/{y}.png", {
				 name: "SOD",
				 myname: "SOD",
				 attribution: "Map data: SOD14",
				 subdomains: ['khm0','khm1','khm2','khm3'],
				 maxZoom: 7
			  });
				mapstraction.addControls({
					pan: false, 
					zoom: {position:'bottomleft'},
					map_type: true
					});

				// here we select the layer we want to be active
				// ------------------------------------------------

				//maptune.fMapType = maptune.fMapType || "Stamen - toner-lite";
				maptune.fMapType = maptune.fMapType || "OpenStreetMap";

				// 21.03.2014 CloudMade shuts down free tile service, so we have to remap the maptype here
				if ( maptune.fMapType.match(/CloudMade/) ){
					maptune.fMapType = "ArcGIS - Light Gray Base";
				}

				var map = mapstraction.maps[mapstraction.api];
				map.addLayer(mapstraction.layers[maptune.fMapType]);
				lastLeafletLayer = maptune.fMapType;
				/**
				map.addLayer(nexrad);
				**/

				// hook on 'baselayerchange' to get the actual layer name
				// while Leaflet doesn't publish the option 'name',
				// we must use a workaround and set a private layer name in .myname (see above)
				// ------------------------------------------------------------------------------------------
				map.on('baselayerchange', function(e) {
					lastLeafletLayer = e.layer.options.myname; 
				});	
			
			}
	
		__map = new Object();
	
		__map.checkResize = function(){

			mapstraction.resizeTo($(mapDiv).width(),$(mapDiv).height());
			return;
		};
		__map.addOverlay = function(obj){

			if(obj && obj.location ){
				if ( obj.opt ){

					mapstraction.addMarkerWithData(obj,{
						label : obj.opt.title,
						date : "new Date()",
						marker : 4,
						icon : obj.opt.icon.image,
						iconSize : obj.opt.icon.iconSize,
						iconAnchor : obj.opt.icon.iconAnchor
					});
						/**
					mapstraction.addMarkerWithData(obj,{
						//infoBubble : html,
						label : obj.opt.title,
						//date : "new Date(\""+item.date+"\")",
						iconShadow : obj.opt.icon.shadow,
						//marker : item.id,
						iconShadowSize : obj.opt.icon.shadowSize,
						icon : obj.opt.icon.image,
						iconSize : obj.opt.icon.iconSize,
						//category : item.source_id,
						draggable : false,
						hover : false
					});
					**/
				}else{
					mapstraction.addMarker(obj,false);
				}


			}else{
				return null;
			}
		};
		__map.removeOverlay = function(obj){
			if(obj){
				mapstraction.removePolyline(obj)
				return mapstraction.removeMarker(obj);
			}else{
				return null;
			}
		};

		__map.addImageOverlay = function(src,bounds,opacity){
			mapstraction.addImageOverlay("1", src, opacity||1, bounds[0][1], bounds[0][0], bounds[1][1], bounds[1][0]);
		}

		__map.getCenter = function(){
			return mapstraction.getCenter();
		};
		__map.getZoom = function(){
			return mapstraction.getZoom();
		};
		__map.setCenter = function(center){
			return mapstraction.setCenter(center);
		};
		__map.setZoom = function(zoom){
			return mapstraction.setZoom(zoom);
		};
	
	return 	__map;
	}

/**
 * Is called on resize map div
 */
function _map_checkResize(map,width,height){
	if ( mapstraction ){
		mapstraction.resizeTo(width,height);
	}
}
/**
 * Is called to set up directions query	
 */
function _map_addDirections(map,target){
	return;
	/**
	if (map){
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();
//		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(target);
	}
	**/
}
/**
 * Is called to clear directions 	
 */
function _map_clearDirections(map){
	return;
	/**
	if (map){
		directionsDisplay.setMap(null);
		var list = directionsDisplay.getPanel();
		if ( list && list.hasChildNodes() )	{
			while ( list.childNodes.length >= 1 ) {
				list.removeChild( list.firstChild );       
			} 
		}
	}
	**/
}
/**
 * Is called to set up layer with realtime traffic information(from Google)
 */
function _map_addTrafficLayer(map,target){
	return;
	/**
	if (map){
		trafficLayer = new google.maps.TrafficLayer();
	}
	**/
}
/**
 * Is called to set event handler	
 */
function _map_addEventListner(map,szEvent,callback){
	if (map){
		if ( szEvent=="moveend" ){
			mapstraction.changeZoom.addHandler(function(n, s, a) { callback(map) });
			mapstraction.endPan.addHandler(function(n, s, a) { callback(map) });
		}else
		if ( szEvent=="closeInfoBubble" ){
			map.closeInfoBubble.addHandler(callback);
		}else
		if ( szEvent=="openInfoBubble" ){
			map.openInfoBubble.addHandler(callback);
		}else
		if ( szEvent=="click" && map.click ){
			map.click.addHandler(callback);
		}else
		if ( szEvent=="mouseover" && map.mouseover ){
			map.mouseover.addHandler(callback);
		}else
		if ( szEvent=="mouseout" && map.mouseout ){
			map.mouseout.addHandler(callback);
		}
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

// set map center and zoom
//
function _map_setMapExtension(map,bBox){
	if (map && bBox){

		var arrayPtLatLon = new Array({lat:bBox[1],lng:bBox[0]},{lat:bBox[3],lng:bBox[2]});

		if (arrayPtLatLon && (arrayPtLatLon.length == 2) ){
			var dLat = (arrayPtLatLon[0].lat - arrayPtLatLon[1].lat)*0.1;
			var dLng = (arrayPtLatLon[1].lng - arrayPtLatLon[0].lng)*0.1;

			mapstraction.setBounds(
				new mxn.BoundingBox(arrayPtLatLon[0].lat,
									arrayPtLatLon[0].lng,
									arrayPtLatLon[1].lat,
									arrayPtLatLon[1].lng
				)
			);		
			mapstraction.setCenter(
				new mxn.LatLonPoint(arrayPtLatLon[1].lat + (arrayPtLatLon[0].lat - arrayPtLatLon[1].lat)/2,
									arrayPtLatLon[0].lng + (arrayPtLatLon[1].lng - arrayPtLatLon[0].lng)/2 ),{pan:true}
			);		
		}
	}
}
// get map zoom 
//
function _map_getZoom(map){
	if (map){
		return mapstraction.getZoom();
	}
	return 0;
}
// get map center 
//
function _map_getCenter(map){
	if (map){
		return mapstraction.getCenter();
	}
	return null;
}
// set map zoom 
//
function _map_setZoom(map,nZoom){
	if (map && nZoom){
		mapstraction.setZoom(nZoom);
	}
}
// set map center 
//
function _map_setCenter(map,center){
	if (map && center){
		mapstraction.setCenter(
			new mxn.LatLonPoint(center.lat,
								center.lng) , {pan:true}
		);		
	}
}
// set map center and zoom
//
function _map_setCenterAndZoom(map,center,nZoom){
	if (map && center && nZoom){
		_map_setCenter(map,center);
		_map_setZoom(map,nZoom);
	}
}
// get actual ma bounds
//
function _map_getBounds(){
	try {
		var bounds = mapstraction.getBounds();
		var swPoint = bounds.getSouthWest();
		var nePoint = bounds.getNorthEast();
		swLat = swPoint.lat;
		swLng = swPoint.lng;
		neLat = nePoint.lat;
		neLng = nePoint.lng;

		// correct invers longitude bounds, map around -180/180
		if ( neLng < swLng ){
			neLng += 360;
		}

		return new Array({lat:swLat,lng:swLng},{lat:neLat,lng:neLng});
	} catch (e){
		return null;
	}
}

function _map_redraw(){
	if ( mapstraction.layers && mapstraction.layers.markers ){
		mapstraction.layers.markers.redraw();
	}
}

function _map_setMapType(map,szMapType){
	var mapTypeTranslate = [];
	if (map){
		try	{
			// here we select the layer we want to be active
			// ------------------------------------------------
			var map = mapstraction.maps[mapstraction.api];
			map.removeLayer(mapstraction.layers[lastLeafletLayer]);
			map.addLayer(mapstraction.layers[mapTypeTranslate[szMapType]||szMapType]);
			lastLeafletLayer = mapTypeTranslate[szMapType]||szMapType;
		} catch (e){return null;}
	}
}

/* ...................................................................* 
 *  Tooltips          		     	                                  * 
 * ...................................................................*/

function _map_createMyTooltip(marker, text, padding, opt){
	return;
	/**
    marker.attachTipTool(text,opt);  //  library method
	**/
}

var _tooltipTimeout = null;
function _map_createMyTooltipListener(element, marker){
	_map_addEventListner(marker, "mouseover", function() {
		if (0){
			var point = new mxn.LatLonPoint(marker.point.lat,marker.point.lon)
			mapstraction.openBubble(point,"test");
			clearTimeout(_tooltipTimeout);
		}
	} );
	_map_addEventListner(marker, "mouseout", function() {
	} );
	return;
	/**
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
	**/
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

/**
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
**/


/* ...................................................................* 
 *  google maps api v2 emulation   	                                  * 
 * ...................................................................*/

GLatLng = function(lat,lng) {
	var x = new mxn.LatLonPoint(Number(lat),Number(lng));
	return x;
};

GPolyline = function(polyPoints,color,width,opacity) {
	x = new mxn.Polyline(polyPoints);
	mapstraction.addPolylineWithData(x,{
		width : width,
		opacity : opacity,
		color : color,
		closed : false
	});
	x.getPosition = function() {
		return x.getPoint();
	};
	return x;
};
GPolygon = function(polyPoints,lineColor,lineWidth,lineOpacity,fillColor,fillOpacity) {
	x = new mxn.Polyline(polyPoints);
	mapstraction.addPolylineWithData(x,{
		fillColor : fillColor,
		fillOpacity : fillOpacity,
		width : lineWidth,
		opacity : lineOpacity,
		color : lineColor,
		closed : true
	});
	x.getPosition = function() {
		return x.getPoint();
	};
	return x;
};

GMarker = function(point,opt) {
	
    var x = new mxn.Marker(point);
	x.getPoint = function() {
		return { lat:function(){return x.point.lat},lng:function(){return x.point.lng} };
	};
	x.getPosition = function() {
		return [ x.point.lat,x.point.lng ];
	};
	x.getCoordinates = function() {
		return [ x.point.lng,x.point.lat ];
	};
	x.attachTipTool = function(text,opt){
	};
	x.getIcon = function(){
		return 	x.icon || x.opt.icon;
	};
	x.setZIndex = function(nIndex){
	};
	x.addData(opt);
	x.opt = opt;

	x.point = point;

	return x;
};

G_DEFAULT_ICON = 0;
GIcon = function(){
	return new Object();
};
GSize = function(w,h){
	return new Array(w,h);
};
GPoint = function(x,y){
	return new Array(x,y);
};

// -----------------------------
// EOF
// -----------------------------

