/**********************************************************************
maptune.feed.PicenoNews.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.PicenoNews.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.PicenoNews,v $
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
	maptune.feed.parse.PicenoNews = function(data,opt){

		if ( opt.format == "json" ) {

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(data.value.title);

			// create one and only layer
			// -------------------------

			var layer    = layerset.addLayer(data.value.title);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var itemA = data.value.items[0].channel.item;

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// parse one feature
				// -----------------
				var szImageUrl = "";
				var szText		= itemA[i].description;
				var szTitle		= itemA[i].title;
				var szLink		= itemA[i].link;
				var szDate		= itemA[i].description.substr(0,28);

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "</td></tr></table>";
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Provincia di Ascoli Piceno</a>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szDate +" </span></div>";

				var szIcon = "./resources/icons/map-icons-collection/numeric/red"+ (i+1) +".png";
				var szSmallIcon = null; //"./resources/icons/google/red-circle.png";

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= "Piceno News";

					var d = new Date();
					feature.properties.utime = d.getTime();

					feature.setPosition(itemA[i]["geo:long"],itemA[i]["geo:lat"]);

			}
		}else
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
				layer.properties.fGallery = false;
				layer.properties.open = "1";
				});

			var i=0;

			$(data).find('item').each(function(){

				// parse one feature
				// -----------------
				var szImageUrl = "";
				var szText		= $(this).find('description:first').text();
				var szTitle		= $(this).find('title:first').text();
				var szLink		= $(this).find('link:first').text();
				var szDate		= $(this).find('publDate:first').text();

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "</td></tr></table>";
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Provincia di Ascoli Piceno</a>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szDate +" </span></div>";

				var szIcon = "./resources/icons/map-icons-collection/numeric/blue"+ (i+1) +".png";
				var szSmallIcon = null; //"./resources/icons/google/blu-circle.png";

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= "Piceno News";

					var d = new Date();
					feature.properties.utime = d.getTime();

					var lat  = $(this).find('[nodeName=geo:lat]:first').text();
					var lng = $(this).find('[nodeName=geo:long]:first').text();

					feature.setPosition(lng,lat);

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
