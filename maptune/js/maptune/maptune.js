/**********************************************************************
map_favour.js

$Comment: provides JavaScript for favourite layer
$Source :map_favour.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2013/01/06 $
$Author: guenter richter $
$Id:map_favour.js 1 2013-01-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_favour.js,v $
**********************************************************************/

/** 
 * @fileoverview This file is a plugin for maptune.jsapi to create and manage a favourite layer
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

/**
 * define namespace maptune
 */

// auto initialize
//
(function() {
})();

window.maptune = window.maptune || {};
maptune.jsapi = maptune.jsapi || {};
maptune.feed = maptune.feed || {};
maptune.feed.parse = maptune.feed.parse || {};
(function() {

var debug = false;

/**
 * feed channel object  
 * @class a feed channel object
 * @constructor
 * @throws 
 * @return A new Channel
 */
	maptune.feed.Channel = Channel = function(szUrl){
		this.szUrl = szUrl;
	};

/**
 * add a feed to the map  
 * @param the URL of the feed
 * @param opt optional parameter object
 * @type void
 */
	maptune.feed.addFeed = function(szSource,opt,callback){

		//_TRACE("maptune.feed.addFeed: "+JSON.stringify(opt));

		maptune.feed.unresolvedPosition = 0;

		if ( !callback ){
			callback = function(){};
		}

		if ( opt.type == 'json' ){
			$.get(szSource,
				function(data){
					maptune.message("loading",false);
					callback(maptune.feed.processFeed(data,opt));
				}).error(function() { alert("error"); });
		}
		if ( opt.type == 'text' ){
            $.ajax({
                 type: "GET",
                 url: szSource,
                 dataType: "text",
                 success: function(xml) {
					maptune.message("loading",false);
					// alert(xml);
					var test = JSON.parse(xml);
					// alert(test.value.items[0].content);
					szTest = "{\"map\":"+String(test.value.items[0].content);
					// alert(szTest);
					eval ("var obj='"+szTest+"');");
					// alert(obj);
					callback(maptune.feed.processFeed(xml,opt));
                 },
                 error: function(xml) {
					maptune.message("loading",false);
					callback(false);
                 }
            });
		}
		if ( opt.type == 'xml' ){
            $.ajax({
                 type: "GET",
                 url: szSource,
                 dataType: "xml",
                 success: function(xml) {
					maptune.message("loading",false);
					callback(maptune.feed.processFeed(xml,opt));
                 },
                 error: function(xml) {
					maptune.message("loading",false);
 					callback(false);
                }
            });
		}
	};


/**
 * process the feeds data feed to the map  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type void
 */
	maptune.feed.processFeed = function(data,opt){

		//_TRACE("processFeed: " + opt.type + " " + typeof(data) + JSON.stringify(opt));

		if ( opt.type == "json" && typeof(data) == "string" ){
			data = JSON.parse(data);
		}

		if ( data == null ){
			// alert("no data");
			return false;
		}
		try {
			switch(opt.name){
				// deprecated, keep for compatibility, use 'MyMapsKLM_YQL'
				case 'Google_Maps_My_Map_KML_YQL':
					var feedLayer = this.parse.MyMapsKLM_YQL(data,opt);
					break;
				// deprecated, keep for compatibility, use 'MyMapsKLM'
				case 'Google_Maps_My_Map_KML':
					var feedLayer = this.parse.MyMapsKLM(data,opt);
					break;
				// the one and only for the future
				default:
					if ( eval("typeof(this.parse."+opt.name+")") == "function" ){
						var feedLayer = eval("this.parse."+opt.name+"(data,opt)");
					}else{
						$.getScript(scriptBase + 'maptune.feed.' + opt.name + ".js")
						.done(function(script, textStatus) {
						  maptune.feed.processFeed(data,opt);
						  return;
						})
						.fail(function(jqxhr, settings, exception) {
						  maptune.errorMessage("'"+opt.name+"' unknown feed format !",2000);
						});
						return;
					}
					break;
			}
		} catch (e){
			maptune.errorMessage("'"+opt.name+"' unknown feed format !",2000);
			return false;
		}

		if ( feedLayer == null ){
			// alert(data);
			alert("no valid data");
			return false;
		}
		if ( maptune.feed.unresolvedPosition ){
			maptune.errorMessage(maptune.feed.unresolvedPosition+" unresolved position(s)",2000);
		}

		if ( opt.flag && opt.flag.match(/gallery/) ){
			feedLayer.layers[0].properties.fGallery = true;
		}
		if ( opt.flag && opt.flag.match(/open/) ){
			feedLayer.layers[0].properties.open = true;
			feedLayer.layers[0].properties.visibility = true;
		}
		if ( opt.flag && opt.flag.match(/closed/) ){
			feedLayer.layers[0].properties.open = false;
		}
		if ( opt.flag && opt.flag.match(/noinfo/) ){
			feedLayer.layers[0].fShowInfoInList = false;
		}
		if ( opt.flag && opt.flag.match(/showinfo/) ){
			feedLayer.layers[0].fShowInfoInList = true;
		}
		if ( opt.flag && opt.flag.match(/nolegend/) ){
			feedLayer.layers[0].fNoLegend = true;
		}
		//_TRACE("addNewData from feed: "+feedLayer.name);
		maptune.jsapi.addNewData(feedLayer.name?feedLayer.name:"feed-test",feedLayer);
		if ( opt.flag && opt.flag.match(/zoomto/) ){
			maptune.jsapi.zoomToLayer(feedLayer.name);
		}
//		setTimeout("maptune.jsapi.zoomToLayer();",1000);
//		maptune.jsapi.redraw();
//		maptune.jsapi.zoomToLayer();

		return true;

	};

	maptune.feed.LayerSet = function(szName){
		this.type	= "Map";
		this.name	= szName?szName:"Feed";
		this.comment = "generated by map_feed";
		this.bbox = new Array(180,90,-180,-90);
		this.layers = new Array();
	};
	maptune.feed.LayerSet.prototype.addLayer = function(szName){
		var ret = new maptune.feed.Layer(szName);
		ret.parent = this;
		this.layers.push(ret);
		return ret;
	};

	maptune.feed.Layer = function(szName){
		this.type = "FeatureCollection";
		this.properties = { "name": szName ,
							 "description": "",
							 "Snippet": "",
							 "visibility": "1",
							 "open": "0",
							 "legendstyle": "CHECKSUBLAYER",
							 "icon": "./resources/icons/google/kml/paddle/red-diamond.png",
							 "end": "" };
		this.features = new Array();
	};
	maptune.feed.Layer.prototype.addFeature = function(szName){
		var ret = new maptune.feed.Feature(szName);
		ret.parent = this;
		this.features.push(ret);
		return ret;
	};

	maptune.feed.Feature = function(szName){
		this.type		=	"Feature";
		this.properties = { "name": szName,
							"description": "" ,
							"icon": "./resources/icons/google/kml/paddle/red-diamond.png",
							"smallicon": "./resources/icons/google/red-circle.png",
							"iconscale": "1.000000",
							"legenditem": "Test",
							"end": "" };
	};

	maptune.feed.Feature.prototype.setPosition = function(lat,lng){
		this.geometry   = { "type": "Point",
							"coordinates": new Array(lat,lng) };
		obj = this.parent.parent;
		if ( obj ){
			obj.bbox[0] = Math.min(obj.bbox[0],lat);
			obj.bbox[1] = Math.min(obj.bbox[1],lng);
			obj.bbox[2] = Math.max(obj.bbox[2],lat);
			obj.bbox[3] = Math.max(obj.bbox[3],lng);
		}
	};

	maptune.feed.Feature.prototype.setLine = function(latlngA){
		this.multigeometry   = [{ "type": "LineString",
								  "coordinates": latlngA }];
	};


/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
