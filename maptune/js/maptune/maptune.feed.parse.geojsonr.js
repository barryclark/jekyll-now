/**********************************************************************
maptune.feed.geojsonr.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.geojsonr.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.geojsonr,v $
**********************************************************************/

/** 
 * @fileoverview This file is a geojson plugin for maptune.jsapi top import arbitrari georeferenced feeds
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
	maptune.feed.parse.GeoJsonR = function(data,opt){


		if ( opt.format == "json" ) {

			if ( data.json ){
				data = data.json;
			}

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet("test");

			// create one and only layer
			// -------------------------

			var layer    = layerset.addLayer("test");
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var itemA = data.features;

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// make the item description table
				// -------------------------------
				var row = itemA[i].properties.data;

				var szData = "<table>";
				for ( b in row ){
					// look for special attributes like tel, site, mail, ...
					//
					if ( b == "tel" ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='rel:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "e_mail" ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='mailto:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "sito_web" ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='http://"+row[b]+"'>"+ row[b] +"</a></td></tr>";
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
				var szText		= itemA[i].properties.description;
				var szTitle		= itemA[i].properties.title;
				var szLink		= itemA[i].properties.link;

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "</td></tr></table>";
					szHtml  = szData;

//					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Provincia di Ascoli Piceno</a>";

				var szIcon = "./resources/icons/google/kml/paddle/blu-blank.png";
				var szSmallIcon = "./resources/icons/google/blu-circle.png";

				if ( itemA[i].geometry && itemA[i].geometry.coordinates ){

					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= "GeoJson";

						feature.setPosition(itemA[i].geometry.coordinates[1],itemA[i].geometry.coordinates[0]);
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
