/**********************************************************************
maptune.feed.georss.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.georss,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/01/15 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-01-15 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.georss,v $
**********************************************************************/

/** 
 * @fileoverview This file is a georss plugin for maptune.jsapi top import arbitrari georeferenced feeds
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

/**
 * define namespace maptune
 */

window.maptune = window.maptune || {};
maptune.feed = maptune.feed || {};
maptune.feed.parse = maptune.feed.parse || {};
(function() {

	$.fn.filterNode = function(name) {
		return this.find('*').filter(function() {
			return this.nodeName === name;
		});
	};

	$.fn.filterNodeGetFirst = function(name) {
		return this.filterNode(name).first().text();
	};

/**
 * parse the feed data and make an maptune layer object  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an maptune layer object
 */
	maptune.feed.parse.GeoRSS = function(data,opt){

		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;
			var fonte = null;

			var channelLat = null;
			var channelLng = null;

			if ( $(data).find('rss').length ){
				return maptune.feed.parse.GeoRSS_RSS(data,opt);
			}else
			if ( $(data).find('feed').length ){
				return maptune.feed.parse.GeoRSS_ATOM(data,opt);
			}
		}
		return null;
	};

	maptune.feed.parse.GeoRSS_RSS = function(data,opt){

		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;
			var fonte = null;

			var channelLat = null;
			var channelLng = null;

			var version = $(data).find('rss').attr("version");
 
			$(data).find('channel').each(function(){
				var title = opt.title||$(this).find('title:first').text();
				fonte = $(this).find('link:first').text();

				// create maptune layerset
				// ----------------------
				layerset = new maptune.feed.LayerSet(title);

				// create one and only layer
				// -------------------------

				layer = layerset.addLayer(title);
				layer.properties.fGallery = false;
				layer.properties.open = "1";

				if ( $(this).filterNodeGetFirst ){

					// get a channel geo position, if defined
					// GeoRSS 1.0
					if ( version && version.match(/1.0/) && $(this).filterNodeGetFirst ){
						var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
						channelLat = pointA[1];
						channelLng = pointA[0];
					}else
					// GeoRSS 2.0
					if ( version && version.match(/2.0/) ){
						channelLat = $(this).filterNodeGetFirst('geo:lat');
						channelLng = $(this).filterNodeGetFirst('geo:long');
					}else				
					// GeoRSS 1.0
					if ( $(this).filterNodeGetFirst('georss:point').length ){
						var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
						channelLat = pointA[1];
						channelLng = pointA[0];
					}else
					// GeoRSS 2.0
					if ( $(this).filterNodeGetFirst('geo:lat').length ){
						channelLat = $(this).filterNodeGetFirst('geo:lat');
						channelLng = $(this).filterNodeGetFirst('geo:long');
					}				
				}			
			});

			var i=0;

			$(data).find('item').each(function(){

				// parse one feature
				// -----------------
				var szImageUrl = "";
				var szText		= $(this).find('description:first').text();
				var szTitle		= $(this).find('title:first').text();
				var szLink		= $(this).find('link:first').text();
				var szDate		= $(this).find('pubDate').text();
				    szDate		= szDate || $(this).find('dc:date').text();

				// test
				if ( $(this).find('category') )	{
					var szCategory	= $(this).find('category').text();
				}else{
					var szCategory	= null;
				}

				szText = "<span class=\"feed_description\" >"+szText+"</span>";

				var szHtml =  "";
					if ( szCategory ){
						szHtml += "<span class=\"category\" style='color:#aac;font-size:0.9em;'>&nbsp;"+ szCategory +"&nbsp;</span><br>";
					}
					szHtml += "<div>"+szText+"</div>";
					szHtml += "<div style='font-size:0.8em;line-height:1.2em;padding-top:5px;padding-left:1px;padding-bottom:5px;'>fonte: <a href='"+szLink+"' target='blank'>"+fonte+"</a>";
					szHtml += "<br>publ.: <span style='color:#aac;font-size:0.9em;'>"+ szDate +" </span>";
					szHtml += "</div>";

				if ( i<20 ){
					var szIcon = "./resources/icons/map-icons-collection/numeric/blue"+ (i+1) +".png";
					var szSmallIcon = null; //"./resources/icons/google/blu-circle.png";
				}else{
					var szIcon = null; // "./resources/icons/google/blu-circle.png";
					var szSmallIcon = "./resources/icons/google/blu-circle.png";
				}

				// icon defined ?
				// ---------------
				if ( $(this).find('image').text().length ){
					var szIcon		= $(this).find('image').text();
					var szSmallIcon = null; //"./resources/icons/google/blu-circle.png";
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.category		= szCategory;
					feature.properties.legenditem	= "GeoRSS";

				var d = new Date(szDate);
				feature.properties.utime = d.getTime();

				// search date within description 
				// ------------------------------
				var dateA = new Array();
				while( szText.length ){ 
					var index = szText.search(/([0-2]\d|[3][0-1])\/([0]\d|[1][0-9])\/([1-2]\d|[0-9][0-9][0-9])/);
					if ( index > 0 ){
						dateA.push(szText.substr(index,10).split('/'));
						szText = szText.substr(index+10,szText.length-index-10);
					}else{
						szText = "";
					}
				}
				if ( dateA.length && (dateA[0][2].length == 4) ){
					var d1 =  new Date(dateA[0][2],dateA[0][1]-1,dateA[0][0]);
					feature.properties.utime = d1.getTime();
				}

				if ( $(this).filterNodeGetFirst ){

					// GeoRSS 2.0 gml
					if ( $(this).filterNodeGetFirst('gml:pos').length ){
						var pointA = $(this).filterNodeGetFirst('gml:pos').split(" ");
						feature.setPosition(pointA[1],pointA[0]);
					}else
					// GeoRSS 1.0
					if ( $(this).filterNodeGetFirst('georss:point').length ){
						var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
						feature.setPosition(pointA[1],pointA[0]);
					}else
					// GeoRSS 2.0
					if ( $(this).filterNodeGetFirst('geo:lat').length ){
						var lat = $(this).filterNodeGetFirst('geo:lat');
						var lng = $(this).filterNodeGetFirst('geo:long');
						feature.setPosition(lng,lat);
					}else
					// GeoRSS 1.0
					if ( version && version.match(/1.0/) ){
						try	{
							var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
							feature.setPosition(pointA[1],pointA[0]);
						}catch(e){}
					}else
					// GeoRSS 2.0
					if ( version && version.match(/2.0/) ){
						try	{
							var lat = $(this).filterNodeGetFirst('geo:lat').text();
							var lng = $(this).filterNodeGetFirst('geo:long').text();
							feature.setPosition(lng,lat);
						}catch(e){}
					}else
					// default = channel position, if defined
					if ( channelLat && channelLng ){
						feature.setPosition(channelLng,channelLat);
					}else{
					// we don't have a position
						maptune.feed.unresolvedPosition++;
					}
				}
				i++;

			});


		}

		return layerset;
	};

	maptune.feed.parse.GeoRSS_ATOM = function(data,opt){

		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;
			var fonte = null;

			var channelLat = null;
			var channelLng = null;

			var parser = {};
			if ( opt.opt && opt.opt.parser ){
				parser = opt.opt.parser;
			}
			var infoA = null;
			if ( parser.info ){
				infoA = parser.info.split("|");
			}

			// var version = $(data).find('rss').attr("version");

			$(data).find('feed').each(function(){

				var title = opt.title||$(this).find('title:first').text();
				fonte = $(this).find('link:first').text();

				// create maptune layerset
				// ----------------------
				layerset = new maptune.feed.LayerSet(title);

				// create one and only layer
				// -------------------------

				layer = layerset.addLayer(title);
				layer.properties.fGallery = false;
				layer.properties.open = "1";

				// GeoRSS 2.0 gml
				if ( $(this).filterNodeGetFirst('gml:pos').length ){
					var pointA = $(this).filterNodeGetFirst('gml:pos').split(" ");
					channelLat = pointA[1];
					channelLng = pointA[0];
				}else
				// GeoRSS 1.0
				if ( $(this).filterNodeGetFirst('georss:point').length ){
					var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
					channelLat = pointA[1];
					channelLng = pointA[0];
				}else
				// GeoRSS 2.0
				if ( $(this).filterNodeGetFirst('geo:lat').length ){
					var lat = $(this).filterNodeGetFirst('geo:lat');
					var lng = $(this).filterNodeGetFirst('geo:long');
					channelLat = pointA[1];
					channelLng = pointA[0];
				}
			
			});

			var i=0;

			$(data).find('entry').each(function(){

				// parse one feature
				// -----------------
				var szImageUrl = "";
				var szText		= $(this).find('summary:first').text();
				var szTitle		= $(this).find('title:first').text();
				var szLink		= $(this).find('link:first').text();
				var szDate		= $(this).find('updated').text();
					szDate		= $(this).filterNodeGetFirst('dc:date') || szDate;

				if ( $(this).find('category') )	{
					var szCategory	= $(this).find('category').text();
				}else{
					var szCategory	= null;
				}

				szText = "<span class=\"feed_description\" >"+szText+"</span>";
				if ( infoA ){
					szText += "<table>";
					for ( a in infoA ){
						szText += "<tr>";
						var szValue = $(this).filterNodeGetFirst(infoA[a]);
						szText += "<td>"+szValue+"<td>";
						szText += "</tr>";
					}
					szText += "</table>";
				}

				var szHtml =  "";
				if ( szCategory ){
					szHtml += "<span class=\"category\" style='color:#aac;font-size:0.9em;'>&nbsp;"+ szCategory +"&nbsp;</span><br>";
				}

				szHtml += "<div>"+szText+"</div>";

				szHtml += "<div style='font-size:0.8em;line-height:1.2em;padding-top:5px;padding-left:1px;padding-bottom:5px;'>fonte: <a href='"+szLink+"' target='blank'>"+fonte+"</a>";
				szHtml += "<br>publ.: <span style='color:#aac;font-size:0.9em;'>"+ szDate +" </span>";
				szHtml += "</div>";

				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";

				// icon defined ?
				// ---------------
				if ( $(this).find('image').text().length ){
					var szIcon		= $(this).find('image').text();
					var szSmallIcon = null; //"./resources/icons/google/blu-circle.png";
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.category		= szCategory;
					feature.properties.legenditem	= "Piceno News";

					var d = new Date(szDate);
					feature.properties.utime = d.getTime();

					// search date within description 
					// ------------------------------
					var dateA = new Array();
					while( szText.length ){ 
						var index = szText.search(/([0-2]\d|[3][0-1])\/([0]\d|[1][0-9])\/([1-2]\d|[0-9][0-9][0-9])/);
						if ( index > 0 ){
							dateA.push(szText.substr(index,10).split('/'));
							szText = szText.substr(index+10,szText.length-index-10);
						}else{
							szText = "";
						}
					}
					if ( dateA.length && (dateA[0][2].length == 4) ){
						var d1 =  new Date(dateA[0][2],dateA[0][1]-1,dateA[0][0]);
						feature.properties.utime = d1.getTime();
					}
					// GeoRSS 2.0 gml
					if ( $(this).filterNodeGetFirst('gml:pos').length ){
						var pointA = $(this).filterNodeGetFirst('gml:pos').split(" ");
						feature.setPosition(pointA[1],pointA[0]);
					}else
					// GeoRSS 1.0
					if ( $(this).filterNodeGetFirst('georss:point').length ){
						var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
						feature.setPosition(pointA[1],pointA[0]);
					}else
					// GeoRSS 2.0
					if ( $(this).filterNodeGetFirst('geo:lat').find().text().length ){
						var lat = $(this).filterNodeGetFirst('geo:lat');
						var lng = $(this).filterNodeGetFirst('geo:long').first.text();
						feature.setPosition(lng,lat);
					}else
					// GeoRSS 1.0
					if ( version && version.match(/1.0/) ){
						var pointA = $(this).filterNodeGetFirst('georss:point').split(" ");
						feature.setPosition(pointA[1],pointA[0]);
					}else
					// GeoRSS 2.0
					if ( version && version.match(/2.0/) ){
						var lat = $(this).filterNodeGetFirst('geo:lat');
						var lng = $(this).filterNodeGetFirst('geo:long');
						feature.setPosition(lng,lat);
					}else
					// default = channel position, if defined
					if ( channelLat && channelLng ){
						feature.setPosition(channelLng,channelLat);
					}else{
					// we don't have a position
						maptune.feed.unresolvedPosition++;
					}

				i++;

			});


		}

		return layerset;
	};
/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
