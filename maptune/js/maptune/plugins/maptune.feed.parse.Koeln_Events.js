/**********************************************************************
maptune.feed.parse.Koeln_Events.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.parse.Koeln_Events.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2013/09/08 $
$Author: guenter richter $
$Id:map_pipe.js 1 2013-09-08 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.parse.Koeln_Events,v $
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
	maptune.feed.parse.Koeln_Events = function(data,opt){
		
		// type must be json
		// ------------------
		if ( opt.format == "json" ) {

			if ( data.json ){
				data = data.json;
			}
			var itemA = data.items;
			var szName = "Koeln_Events";
			var szSite = "http://www.stadt-koeln.de/";

			// -------------------------------------------------
			// ok we have an array of items, lets make the layer
			// -------------------------------------------------
				
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

			// parse the feeds elements and create layer features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// parse one item to create a feature
				// -----------------------------------

				var szTitle		= itemA[i].title;
				var szText		= itemA[i].description;
				var szStartDate	= itemA[i].beginndatum;
				var szEndDate	= itemA[i].endedatum;
				var szLink		= itemA[i].link;
				var szLinkInfo	= itemA[i].link;
				var szImageUrl	= itemA[i].teaserbild;
				var szAction	= itemA[i].uhrzeit;
				var szAdress	= itemA[i].strasse + "," + itemA[i].hausnummer;
				var szArrive	= itemA[i].oepnv;

				var d=new Date();
				var szPubDate = d.toLocaleTimeString();

				// make the item description
				// -------------------------

				var szHtml  = "<div><span style='font-size:12px;'>"+szText+"</span></div>";

					if ( szImageUrl && (szImageUrl != "null") ) {
						szHtml += "<div style='margin-top:5px;'><img src='"+ szSite+szImageUrl +"' height='"+120+"px' /><div>";
					}

					if ( szEndDate && (szEndDate!=szStartDate) ) {
						szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;font-weight:bold;'>"+szStartDate+" - "+szEndDate+"</span></div>";
					}else{
						szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;font-weight:bold;'>"+szStartDate+"</span></div>";
					}
					szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;'>"+szAction+"</span></div>";
					szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;'>"+szAdress+"</span></div>";
					szHtml += "<div style='margin-top:5px;'><span style='font-size:12px;'>"+szArrive+"</span></div>";

					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-top:10px;margin-bottom:0px'>";
					if ( szLinkInfo ){
						szHtml += "<br><a href='"+szLinkInfo+"' target='_blanc' >"+"mehr..."+"</a>";
					}
					szHtml += "</div>";

				// define icons
				// ------------

				var szIcon = "./resources/icons/default/default_red.png";
				var szSmallIcon = "./resources/icons/default/default-small_red.png";

				// get geo position
				// no position, no feature !
				// -------------------------

				var lat = itemA[i].latitude; 
				var lon = itemA[i].longitude;

				if ( lat && lon && lat.length && lon.length && !(isNaN(lat) || isNaN(lon)) ){

					// add one feature
					// ===============
					var feature = layer.addFeature(szTitle);
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= szName;

						feature.setPosition(lon,lat);

					// start and end time
					// ------------------
					if ( szStartDate.length ){
						var dateA = szStartDate.split(/\-/);
						var d1 =  new Date(szStartDate);
						feature.properties.utime = d1.getTime();
						feature.properties.utimeStart = d1.getTime();
					}
					if ( szEndDate.length ){
						var dateA = szEndDate.split(/\-/);
						var d2 =  new Date(szEndDate);
						feature.properties.utimeEnd = d2.getTime();
					}
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
