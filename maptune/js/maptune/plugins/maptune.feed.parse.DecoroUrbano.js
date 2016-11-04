/**********************************************************************
maptune.feed.DecoroUrbano.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.geojson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.DecoroUrbano,v $
**********************************************************************/

/** 
 * @fileoverview This file is a parser plugin for maptune.feed.parse to import proprietary feeds
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

/**
 * parse the feed data and make an maptune layer object  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an maptune layer object
 */
	maptune.feed.parse.DecoroUrbano = function(data,opt){

		if ( opt.format == "json" ) {

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(data.value.title);

			// create one and only layer
			// -------------------------

			var layer    = layerset.addLayer(data.value.title);
			layer.properties.fGallery = true;
			layer.properties.open = "1";

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<data.count; i++ ){

				// parse one feature
				// -----------------
				var szImageUrl = data.value.items[i].enclosure.url;
				var szText = data.value.items[i].feature.properties.description;
				var szTitle = data.value.items[i].title;
				var szLink = data.value.items[i].link;
				var szDate = data.value.items[i].pubDate;

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "<img src='"+szImageUrl+"' height='"+120+"px' /></td></tr></table>";
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Decoro Urbano</a>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szDate +" </span></div>";

				var szIcon = "./resources/icons/google/red-diamond.png";
				if ( data.value.items[i].feature.properties.category ){
					if ( data.value.items[i].feature.properties.category.match(/Rifiuti/) ){
						szIcon = "./resources/icons/decoro_urbano/rifiuti.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Vandalismo/) ){
						szIcon = "./resources/icons/decoro_urbano/vandalismo-incuria.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Dissesto stradale/) ){
						szIcon = "./resources/icons/decoro_urbano/dissesto-stradale.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Affissioni abusive/) ){
						szIcon = "./resources/icons/decoro_urbano/affizioni-abusive.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Segnaletica/) ){
						szIcon = "./resources/icons/decoro_urbano/segnaletica.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/verdi/) ){
						szIcon = "./resources/icons/decoro_urbano/zone-verdi.png";
					}
				}
				var szSmallIcon = "./resources/icons/google/red-circle.png";
				if ( data.value.items[i].feature.properties.category ){
					if ( data.value.items[i].feature.properties.category.match(/Rifiuti/) ){
						szSmallIcon = "./resources/icons/google/darkblu-circle.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Vandalismo/) ){
						szSmallIcon = "./resources/icons/google/rosp-circle.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Dissesto stradale/) ){
						szSmallIcon = "./resources/icons/google/orang-circle.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Affissioni abusive/) ){
						szSmallIcon = "./resources/icons/google/viola-circle.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/Segnaletica/) ){
						szSmallIcon = "./resources/icons/google/yel-circle.png";
					}
					if ( data.value.items[i].feature.properties.category.match(/verdi/) ){
						szSmallIcon = "./resources/icons/google/darkgreen-circle.png";
					}
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= data.value.items[i].feature.properties.category;

					var d = new Date(data.value.items[i].pubDate);
					feature.properties.utime = d.getTime();

				var pointA = data.value.items[i].feature.geometry.coordinates.split(" ");
					feature.setPosition(pointA[1],pointA[0]);
			}
		} else
		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;

			$(data).find('channel').each(function(){
				var title = $(this).find('title:first').text();
				// create maptune layerset
				// ----------------------
				layerset = new maptune.feed.LayerSet(title);

				// create one and only layer
				// -------------------------

				layer = layerset.addLayer(title);
				layer.properties.fGallery = true;
				layer.properties.open = "1";
				});

			var i=0;

			$(data).find('item').each(function(){

				// parse one feature
				// -----------------
				var szImageUrl  = $(this).find('enclosure:first').attr("url");
				var szText		= $(this).find('description:first').text();
				var szTitle		= $(this).find('title:first').text();
				var szLink		= $(this).find('link:first').text();
				var szDate		= $(this).find('pubDate:first').text();

				var linkA = szLink.split(/\//);
				var szCitta  = linkA[linkA.length-4];
				var szStrada = linkA[linkA.length-3];
				var szId	 = linkA[linkA.length-2];
				var szState  = $(this).find('category:last').text();

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "<img src='"+szImageUrl+"' height='"+120+"px' /></td></tr></table>";
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Decoro Urbano</a>";
					// szHtml += "<br>ind.: <span style='color:#aac'>"+ szId+" "+szStrada+" "+szCitta +" </span>";
					szHtml += "<br>stato: <span style='color:#aac'>"+ szState+" - "+szCitta+" </span>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szDate +" </span></div>";

				var szIcon = "./resources/icons/google/red-diamond.png";
				var category = $(this).find('category:first').text();

				if ( category ){
					if ( category.match(/Rifiuti/) ){
						szIcon = "./resources/icons/decoro_urbano/rifiuti.png";
					}
					if ( category.match(/Vandalismo/) ){
						szIcon = "./resources/icons/decoro_urbano/vandalismo-incuria.png";
					}
					if ( category.match(/Dissesto stradale/) ){
						szIcon = "./resources/icons/decoro_urbano/dissesto-stradale.png";
					}
					if ( category.match(/Affissioni abusive/) ){
						szIcon = "./resources/icons/decoro_urbano/affizioni-abusive.png";
					}
					if ( category.match(/Segnaletica/) ){
						szIcon = "./resources/icons/decoro_urbano/segnaletica.png";
					}
					if ( category.match(/verdi/) ){
						szIcon = "./resources/icons/decoro_urbano/zone-verdi.png";
					}
				}
				var szSmallIcon = "./resources/icons/google/red-circle.png";
				if ( category ){
					if ( category.match(/Rifiuti/) ){
						szSmallIcon = "./resources/icons/google/darkblu-circle.png";
					}
					if ( category.match(/Vandalismo/) ){
						szSmallIcon = "./resources/icons/google/rosp-circle.png";
					}
					if ( category.match(/Dissesto stradale/) ){
						szSmallIcon = "./resources/icons/google/orang-circle.png";
					}
					if ( category.match(/Affissioni abusive/) ){
						szSmallIcon = "./resources/icons/google/viola-circle.png";
					}
					if ( category.match(/Segnaletica/) ){
						szSmallIcon = "./resources/icons/google/yel-circle.png";
					}
					if ( category.match(/verdi/) ){
						szSmallIcon = "./resources/icons/google/darkgreen-circle.png";
					}
				}
				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= category;

					var d = new Date($(this).find('pubDate:first').text());
					feature.properties.utime = d.getTime();

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
