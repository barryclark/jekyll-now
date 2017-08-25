/**********************************************************************
maptune.feed.parse.traffic_data.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.parse.traffic_data.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/12/29 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-12-29 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.parse.traffic_data,v $
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
	maptune.feed.parse.traffic_data = function(data,opt){
		
		// type must be json
		// ------------------
		if ( opt.format == "json" ) {

			var szItem = null;

			// look for firt object to get the item array name
			// ------------------------------------------------
			if ( typeof(data.traffic_data["PK_data"]) === "object" ){
					szItem = "PK_data";
			}
			if ( szItem === null ){
				return;
			}

			// -------------------------------------------------
			// ok we have an array of items, lets make the layer
			// -------------------------------------------------
				
			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szItem);
			layerset.title = opt.title;

			// create one and only layer
			// -------------------------
			var layer    = layerset.addLayer(szItem);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			layer.legend = "expanded";

			var itemA = data.traffic_data[szItem];

			// some statistics, needed below 
			// -----------------------------
			var maxTotal = 0;
			var maxFree = 0;
			for ( i=0; i<itemA.length; i++ ){
				maxTotal = Math.max(maxTotal,0||itemA[i].Total); 
				maxFree = Math.max(maxFree,(itemA[i].Free?itemA[i].Free:0)); 
			}

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// parse one item (feature)
				// ------------------------

				var szTitle = itemA[i].Name + (itemA[i].Free?(" +" + itemA[i].Free + ""):"")
											+ (itemA[i].Total?("&nbsp;/&nbsp;" + itemA[i].Total + ""):"");;
				var d=new Date();
				var szPubDate = d.toLocaleTimeString();
				var szLink = "http://opendata.5t.torino.it/get_pk/";

				// make the item description table
				// -------------------------------
				var szText = "<table cellpadding='0' cellspacing='0' >";
				var row = itemA[i];
				for ( b in row ){
					if ( b == 'lat' || b == 'lng' || b == 'ID' || b == 'Name' ){
						continue;
					}
					// look for special attributes like tel, site, mail, ...
					//
					if ( b == "tel" ){
						szText += "<tr><td><span style='margin-right:10px;color:#888'>"+b+": </span></td><td><a href='rel:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "e_mail" ){
						szText += "<tr><td><span style='margin-right:10px;color:#888'>"+b+": </span></td><td><a href='mailto:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "sito_web" ){
						szText += "<tr><td><span style='margin-right:10px;color:#888'>"+b+": </span></td><td><a href='http://"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else{
						// normal row
						//
						szText += "<tr><td><span style='margin-right:10px;color:#888'>"+b+": </span></td><td>"+ row[b] +"</td></tr>";
					}
				}
				szText += "</table>";
				szText = "<div><span style='font-family:courier new;font-size:12px;'>"+szText+"</span></div>";

				// add a footer
				// ------------
				var szHtml  = szText;
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-top:10px;margin-bottom:0px'>";
					szHtml += "fonte: <a href='"+szLink+"'>"+szLink+"</a>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szPubDate +" </span>";
					szHtml += "</div>";

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
				if ( szItem === "PK_data" ){
					var total = itemA[i].Total;
					var free = itemA[i].Free;
					if ( total && free ){
						var nOcc = free/total;
						if ( (free < 5) || (nOcc < 0.05) ){
							szIcon = "./resources/icons/map-icons-collection/parking-red.png";
							szSmallIcon = "";
						}else
						if ( nOcc < 0.2 ){
							if ( itemA[i].tendence < 0 ){
								szIcon = "./resources/icons/map-icons-collection/parking-orange-up.png";
							}else if ( itemA[i].tendence > 0 ){
								szIcon = "./resources/icons/map-icons-collection/parking-orange-down.png";
							}else{
								szIcon = "./resources/icons/map-icons-collection/parking-orange.png";
							}
							szSmallIcon = "";
						}else{
							if ( itemA[i].tendence < 0 ){
								szIcon = "./resources/icons/map-icons-collection/parking-green-up.png";
							}else if ( itemA[i].tendence > 0 ){
								szIcon = "./resources/icons/map-icons-collection/parking-green.png";
							}else{
								szIcon = "./resources/icons/map-icons-collection/parking-green.png";
							}
							szSmallIcon = "";
						}
						// nOcc = Math.pow(free,0.5)/ Math.pow(total,0.5);
						// nOcc = Math.log(free)/ Math.log(total);
						// nOcc = Math.log(total)/Math.log(maxTotal);
						nOcc = Math.log(free)/ Math.log(maxFree);
						nScale = Math.max(0.5,nOcc)*1.5;
					}else{
						szIcon = "./resources/icons/map-icons-collection/parking.png";
						szSmallIcon = "";
						nScale = 0.75;
					}

				}

				// get the position !!
				// -----------------
				var lat = itemA[i].lat || itemA[i].latitudine || itemA[i].Latitudine;
				var lon = itemA[i].lng || itemA[i].longitudine || itemA[i].Longitudine;

				if ( lat && lon ){
					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= szItem;
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
