/**********************************************************************
maptune.feed.USGSEarthquake.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.USGSEarthquake.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:maptune.feed.USGSEarthquake.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.USGSEarthquake,v $
**********************************************************************/

/** 
 * @fileoverview This file is a plugin for maptune.jsapi to import USGS earthquake GeoJson feeds
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
	maptune.feed.parse.USGSEarthquake = function(data,opt){


		if ( opt.format == "json" ) {

//			var data = data.json;

			var	szTitle = data.metadata.title;
			if ( (szTitle == null) || (szTitle.length == 0) ){
				szTitle = "no name-";
			}

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szTitle);

			// create one and only layer
			// -------------------------
			var layer    = layerset.addLayer(szTitle);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var itemA = data.features;

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// make the item description table
				// -------------------------------
				var row = itemA[i].properties;

				var szData = "<table>";
				for ( b in row ){
					// look for special attributes like tel, site, mail, ...
					//
					if ( b == "tel" ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='rel:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( (b == "e_mail") || (b == "mail") || row[b].match(/@/) ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='mailto:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( (b == "sito_web") ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='http://"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( (b == "url") || row[b].match(/http/)){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='"+row[b]+"' target='_blank' >"+ row[b] +"</a></td></tr>";
					}else{
						// normal row
						//
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td>"+ row[b] +"</td></tr>";
					}
				}
				szData += "</table>";

				// parse one feature
				// -----------------
				var szImageUrl = "";
				var szText		= row.description;
				var szTitle		= "<b>"+String(row.mag)+"</b>, "+ String(row.place) +", "+  String(itemA[i].geometry.coordinates[2]) +"&nbsp;km deep";
				var szLink		= row.link;

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "</td></tr></table>";
					szHtml  = szData;

				var szIcon = "./resources/icons/google/kml/paddle/blu-blank.png";
				var szSmallIcon = "./resources/icons/google/blu-circle.png";

				// add one feature
				// need to have position
				// -----------------------------------------------------
				if ( itemA[i].geometry && itemA[i].geometry.coordinates ){

					var feature = layer.addFeature(szTitle);

						// keep original properties
						feature.properties			    = row;

						// set properties
						feature.properties.name			= szTitle;
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= "GeoJson";
						feature.properties.utime        = row.time;

						feature.setPosition(itemA[i].geometry.coordinates[0],itemA[i].geometry.coordinates[1]);
				}
			}
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
