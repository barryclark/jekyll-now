/**********************************************************************
maptune.feed.GeoJson.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.GeoJson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id: maptune.feed.GeoJson.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.GeoJson,v $
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
	maptune.feed.parse.BasilicataEvents = function(data,opt){

		var dataA = null;

		if ( opt.format == "csv" ) {
			dataA = $.csv.toArrays(data,{separator:','});
		}else
		if ( opt.format == "json" ) {
			dataA = data.row;
		}

		if ( dataA ) {

			var	szTitle = opt.title||data.name;
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

			var infoA = null;
			if ( opt.opt.parser && opt.opt.parser.info ){
				infoA = opt.opt.parser.info.split("|");
			}

			// parse the feeds elements and create layer features
			// ---------------------------------------------------
			for ( i=1; i<dataA.length; i++ ){

				// make the item description table
				// -------------------------------
				var row = dataA[i];
				szTitle = String(i);

				var szData = "<table>";
				for ( b in row ){

					var szVal = String(row[b]);
					var szLab = String(dataA[0][b]);

					if ( infoA ){
						if ( !eval("opt.opt.parser.info.match(\/"+szLab+"\/)") ){
							continue;
						}
				}

					if ( opt.opt.parser && opt.opt.parser.label == "false" ){
						// only values
						// look for special attributes like tel, site, mail, ...
						//
						if ( szLab == "tel" ){
							szData += "<tr><td><a href='rel:"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( (szLab == "e_mail") || (szLab == "mail") || szVal.match(/@/) ){
							szData += "<tr><td><a href='mailto:"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( (szLab == "sito_web") ){
							szData += "<tr><td><a href='http://"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( opt.opt.image == szVal || szVal.match(/jpg/) || szVal.match(/jpeg/) || szVal.match(/png/) || szVal.match(/bmp/) || szVal.match(/tiff/) ){
							szData += "<tr><td><img src='"+szVal+"' width='150'></td></tr>";
						}else
						if ( (szLab == "url") || szVal.match(/http/)){
							szData += "<tr><td><a href='"+szVal+"' target='_blank' >"+ szVal +"</a></td></tr>";
						}else{
							// normal row
							//
							szData += "<tr><td>"+ szVal +"</td></tr>";
						}
					}
					else{
						// label and values
						// look for special attributes like tel, site, mail, ...
						//
						if ( szLab == "tel" ){
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td><a href='rel:"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( (szLab == "e_mail") || (szLab == "mail") || szVal.match(/@/) ){
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td><a href='mailto:"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( (szLab == "sito_web") ){
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td><a href='http://"+szVal+"'>"+ szVal +"</a></td></tr>";
						}else
						if ( (szLab == "Link_immagine ") ){
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td><img src='"+szVal+"' width='150'></td></tr>";
						}else
						if ( (szLab == "url") || szVal.match(/http/)){
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td><a href='"+szVal+"' target='_blank' >"+ szVal +"</a></td></tr>";
						}else{
							// normal row
							//
							szData += "<tr><td><span style='color:#888'>"+szLab+": </span></td><td>"+ szVal +"</td></tr>";
						}
					}
				}
				szData += "</table>";

				var	szHtml  = szData;

				var szIcon = "./resources/icons/google/kml/paddle/blu-blank.png";
				var szSmallIcon = "./resources/icons/google/blu-circle.png";

				var lat = null;
				var lon = null;
				var name = null;
				var timeStart = null;
				var timeEnd = null;
				
				for ( b in row ){
					var col   = dataA[0][b];
					if (col == "Latitudine" ){
						lat  = row[b];
					}else
					if (col == "Longitudine" ){
						lon  = row[b];
					}
				}
				if ( opt.opt.parser ){
					for ( b in row ){
						var col   = dataA[0][b];
						if (col == opt.opt.parser.lat ){
							lat  = row[b];
						}else
						if (col == opt.opt.parser.lon ){
							lon  = row[b];
						}else
						if (col == opt.opt.parser.title ){
							name  = row[b];
						}else
						if (col == opt.opt.parser.timeStart ){
							timeStart  = row[b];
						}else
						if (col == opt.opt.parser.timeEnd ){
							timeEnd  = row[b];
						}
					}
				}

				if ( lat && lon ){

					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);

					// generic properties
					for ( b in row ){
						var col = dataA[0][b];
						var val = row[b];
						feature.properties[col] = val;
					}

					//feature.properties			    = row;
					feature.properties.name			= name||szTitle;
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= "csv";

					lon = ((lon<=180)&&(lon>-180))?lon:0;
					lat = ((lat<=80)&&(lat>-80))?lat:0;

					feature.setPosition(lon,lat);

					// start and end time
					// ------------------
					if ( timeStart ){
						var dateA = timeStart.split(" ")[0].split("\/");
						var d1 =  new Date(dateA[2],dateA[1]-1,dateA[0]);
						feature.properties.utime = d1.getTime();
						feature.properties.utimeStart = d1.getTime();
					}
					if ( timeEnd ){
						var dateA = timeEnd.split(" ")[0].split("\/");
						var d2 =  new Date(dateA[2],dateA[1]-1,dateA[0]);
						feature.properties.utimeEnd = d2.getTime();
					}
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
