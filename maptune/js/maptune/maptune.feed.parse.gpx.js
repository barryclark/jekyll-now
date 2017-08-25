/**********************************************************************
maptune.feed.parse.gpx.js

$Comment: provides JavaScript for import of gps export feeds
$Source : maptune.feed.parse.traffic_data.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2016/04/25 $
$Author: guenter richter $
$Id:maptune.feed.parse.gpx.js 1 2016-04-24 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.parse.gpx,v $
**********************************************************************/

/** 
 * @fileoverview This file is a parser plugin for gpx (GPS Exchange Format)
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
	maptune.feed.parse.gpx = function(data,opt){


		console.log(opt);
		console.log(data);

		if ( opt.format == "json" ) {

			var szCreator = null;

			// look for firt object to get the item array name
			// ------------------------------------------------
			if ( data.gpx ){
				szCreator = data.gpx.creator;
			}
			if ( szCreator === null ){
				return;
			}

			var szVersion = data.gpx.version;
			var wptA = data.gpx.wpt;

			if ( wptA && wptA.length ){

				// create maptune layerset
				// ----------------------
				var layerset = new maptune.feed.LayerSet(opt.title);
				layerset.title = opt.title;

				// create one and only layer
				// -------------------------
				var layer    = layerset.addLayer(opt.title);
				layer.properties.visibility = true;
				layer.properties.open = true;

				for ( i=0; i<wptA.length; i++ ){

					var szTime		= wptA[i].time;
					var szName		= wptA[i].name;
					var szDesc		= wptA[i].desc;

					var lat			= wptA[i].lat;
					var lon			= wptA[i].lon;

					if ( lat && lon ){

						// add one feature
						// ---------------
						var feature = layer.addFeature(szName);
						feature.properties.description	= szDesc;

						var d = new Date(szTime);
						feature.properties.utime = d.getTime();

						feature.setPosition(lon,lat);
					}
				}
			}

		// all elements parsed
		// -------------------
		return layerset;
		} 

		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;
			var fonte = null;

			var channelLat = null;
			var channelLng = null;

			var version = $(data).find('gpx').attr("version");
			// create maptune layerset
			// ----------------------
			layerset = new maptune.feed.LayerSet("GPS");

			// create one and only layer
			// -------------------------

			layer = layerset.addLayer("GPS");

			var i=0;

			$(data).find('wpt').each(function(){

				// parse one feature
				// -----------------
				var szTime		= $(this).find('time:first').text();
				var szName		= $(this).find('name:first').text();
				var szDesc		= $(this).find('desk:first').text();

				// add one feature
				// ---------------
				var feature = layer.addFeature(szName);
				feature.properties.description	= szDesc;

				var d = new Date(szTime);
				feature.properties.utime = d.getTime();

				var lat			= $(this).attr("lat");
				var lon			= $(this).attr("lon");
				feature.setPosition(lat,lon);

				i++;

			});

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
