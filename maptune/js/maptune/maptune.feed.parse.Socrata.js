/**********************************************************************
maptune.feed.Socrata.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.Socrata.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2013/01/25 $
$Author: guenter richter $
$Id:map_pipe.js 1 2013-01-25 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.Socrata,v $
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
	maptune.feed.parse.Socrata = function(data,opt){

		if ( opt.format == "json" ) {

			var rowA = null;

			// see if data is wrapped 
			if ( data.data ){
				rowA = data.data;
			}else{
				// xml -> json
				if ( data.response ){
					rowA = data.response.row.row;
				}else
				// native json	
				if ( data.json ){
					rowA = data.json.json;
				}
			}

			var szTitle = opt.title;

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szTitle);
			layerset.title = opt.title;

			// create one and only layer
			// -------------------------
			var layer    = layerset.addLayer(szTitle);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var szLocationObj = null;

			// create the item (features) of the layer
			// ---------------------------------------
			for ( a in rowA ){

				var row = rowA[a];

				// search latitude,longitude object
				// --------------------------------
				szLocationObj = null;
				for ( b in row ){
					if ( typeof(row[b]) == "object" ){
						if ( row[b].latitude && row[b].longitude ){
							var szLocationObj = b;
						}
					}
				}
				if ( szLocationObj ){
					var lat = row[szLocationObj].latitude;
					var lon = row[szLocationObj].longitude;
				}

				// make the item description
				// -------------------------
				var	szText = "";

				// test street view image (abandoned because of googles restrictions)
				// -------------------------------------------------------------------
				if ( 0 && lat && lon ){
					szText += "<img src='";
					szText += "http://maps.googleapis.com/maps/api/streetview?size=150x100&location="+lat+","+lon+"&heading=250&fov=90&pitch=-10&sensor=false";
					szText += "' >";
				}

				// make the item description table
				// -------------------------------
				szText += "<table>";
				for ( b in row ){
					if ( b.substr(0,1) == "_" || b == szLocationObj || b == "lat" || b == "lng" ){
						continue;
					}
					// look for special attributes like tel, site, mail, ...
					//
					if ( b == "tel" ){
						szText += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='rel:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "e_mail" ){
						szText += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='mailto:"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else
					if ( b == "sito_web" ){
						szText += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='http://"+row[b]+"'>"+ row[b] +"</a></td></tr>";
					}else{
						// normal row
						//
						szText += "<tr><td><span style='color:#888'>"+b+": </span></td><td>"+ row[b] +"</td></tr>";
					}
				}
				szText += "</table>";

				// create the item only if we have a position
				// ------------------------------------------
				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";

				if ( lat && lon ){

					// define item title
					// -----------------
					var szItem = String(a);

					// look if title row id is given
					//
					if ( opt.opt && opt.opt.parser ){
						if ( opt.opt.parser.title ){
							szItem = row[opt.opt.parser.title];
						}
					}

					// finally add the feature to the layer
					// ------------------------------------
					var feature = layer.addFeature(String(szItem));
						feature.properties.description	= szText;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= szTitle;

						// GR 19.09 2014 add properties
						for ( b in row ){
							feature.properties[b] = row[b];
						}

						feature.setPosition(lon,lat);
					// ------------------------------------
				}
				else{
					alert("missing position");
				}
			}

			return layerset;
		}
	};


/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
