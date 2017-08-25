/**********************************************************************
maptune.feed.parse.Koeln_Parken.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.parse.Koeln_Parken.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2013/09/08 $
$Author: guenter richter $
$Id:map_pipe.js 1 2013-09-08 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.parse.Koeln_Parken,v $
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
	maptune.feed.parse.Koeln_Parken = function(data,opt){
		
		// type must be json
		// ------------------
		if ( opt.format == "json" ) {

			if ( data.json ){
				data = data.json;
			}
			// -------------------------------------------------
			// ok we have an array of items, lets make the layer
			// -------------------------------------------------
				
			var szName = "Koeln_Parken";
			var szSite = "http://www.stadt-koeln.de/";
			
			var itemA = data.features;

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szName);
			layerset.title = opt.title;

			// create one and only layer
			// -------------------------
			var layer    = layerset.addLayer(szName);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			layer.legend = "expanded";

			// some statistics, needed below 
			// -----------------------------
			var maxTotal = 0;
			for ( i=0; i<itemA.length; i++ ){
				maxTotal = Math.max(maxTotal,0||itemA[i].attributes.KAPAZITAET); 
			}

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// parse one item (feature)
				// ------------------------

				var szTitle = itemA[i].attributes.PARKHAUS + (itemA[i].attributes.KAPAZITAET?(" (" + itemA[i].attributes.KAPAZITAET + " frei)"):"");
				var szKapaz = itemA[i].attributes.KAPAZITAET;
				var szTend  = (itemA[i].attributes.TENDENZ==2)?"mehr":(itemA[i].attributes.TENDENZ==1)?"weniger":"gleichbleibend";

				var d=new Date();
				var szPubDate = d.toLocaleTimeString();
				var szLink = "http://www.koeln.de/apps/parken/parkhaus/";

				// add a footer
				// ------------
				var szHtml  = "";
					szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;'>"+szKapaz+" freie Plaetze</span></div>";
					szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;'>Tendenz: "+szTend+"</span></div>";
					/**
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-top:10px;margin-bottom:0px'>";
					szHtml += "fonte: <a href='"+szLink+itemA[i].attributes.PARKHAUS+"'>"+"mehr..."+"</a>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szPubDate +" </span>";
					szHtml += "</div>";
					**/
				// define the marker
				// -----------------

				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";
				var nScale = 1;

				// if item list name is "PK_data"
				// ------------------------------
				// we have real time data from http://opendata.5t.torino.it giving the situation of the parking lots
				// we check the fill state and the tendency of the parking lot to select the icon
				// then we calcolate the icon size with the actual free capacity
				//
				if ( 1 ){
					var total = itemA[i].attributes.KAPAZITAET;
					if ( total ){
						if ( (total < 1) ){
							szIcon = "./resources/icons/map-icons-collection/parking-red.png";
							szSmallIcon = "";
						}else
						if ( total < 100 ){
							if ( itemA[i].attributes.TENDENZ == 2 ){
								szIcon = "./resources/icons/map-icons-collection/parking-yellow-up.png";
							}else
							if ( itemA[i].attributes.TENDENZ == 1 ){
								szIcon = "./resources/icons/map-icons-collection/parking-yellow-down.png";
							}else{
								szIcon = "./resources/icons/map-icons-collection/parking-yellow.png";
							}
							szSmallIcon = "";
						}else
						if ( total < 25 ){
							if ( itemA[i].attributes.TENDENZ == 2 ){
								szIcon = "./resources/icons/map-icons-collection/parking-orange-up.png";
							}else
							if ( itemA[i].attributes.TENDENZ == 1 ){
								szIcon = "./resources/icons/map-icons-collection/parking-orange-down.png";
							}else{
								szIcon = "./resources/icons/map-icons-collection/parking-orange.png";
							}
							szSmallIcon = "";
						}else{
							if ( itemA[i].attributes.TENDENZ == 2 ){
								szIcon = "./resources/icons/map-icons-collection/parking-green-up.png";
							}else
							if ( itemA[i].attributes.TENDENZ == 1 ){
								szIcon = "./resources/icons/map-icons-collection/parking-green-down.png";
							}else{
								szIcon = "./resources/icons/map-icons-collection/parking-green.png";
							}
							szSmallIcon = "";
						}
						// nOcc = Math.pow(free,0.5)/ Math.pow(total,0.5);
						// nOcc = Math.log(free)/ Math.log(total);
						// nOcc = Math.log(total)/Math.log(maxTotal);
						nOcc = Math.log(Math.abs(total))/ Math.log(maxTotal);
						nScale = Math.max(0.5,nOcc)*1.5;
					}else{
						szIcon = "./resources/icons/map-icons-collection/parking.png";
						szSmallIcon = "";
						nScale = 0.75;
					}

				}

				// get the position !!
				// -----------------
				var lat = itemA[i].geometry.y;
				var lon = itemA[i].geometry.x;

				if ( lat && lon ){
					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= szName;
						feature.properties.iconscale	= nScale;

						feature.setPosition(lon,lat);
				}
			}

		// all elements parsed
		// -------------------
		return layerset;
		} 

	return null;
	};


/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
