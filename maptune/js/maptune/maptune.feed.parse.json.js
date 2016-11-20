/**********************************************************************
maptune.feed.json.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.json.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id: maptune.feed.json.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.json,v $
**********************************************************************/

/** 
 * @fileoverview This file is a json plugin for maptune.jsapi top import arbitrari georeferenced feeds
 *
 * @author Guenter Richter guenter.richter@maptune.com
 * @version 0.9
 */

 // strips blanks inside numbers (e.g. 1 234 456 --> 1234456) and chanhe decimal ',' to decimal '.'
 var __scanValue = function(szValue){

	// GR 29.03.2015 - hack for Lecce; position comes like "15;12.3456,47.3456" 
    if(szValue && szValue.match(/;/)){
		szValueA = szValue.split(';');
		szValue = szValueA.pop();
	}
	// ------------------------------------------------------------------------

	return Number(String(szValue).replace(/ /gi,"").replace(/,/gi,"."));
 };

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
	maptune.feed.parse.json = function(dataA,opt){ 

		if ( dataA["json"] ){
			dataA = dataA["json"];
		}

		if ( dataA ) {

			var	szTitle = opt.title
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

			var parser = {};
			if ( opt.opt && opt.opt.parser ){
				parser = opt.opt.parser;
			}

			var infoA = null;
			if ( parser.info ){
				infoA = parser.info.split("|");
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
					var szLab = String(b);

					if ( szVal == "null" ){
						continue;
					}
					
					// check, if info selection defined
					if ( infoA ){
						if ( !eval("parser.info.match(\/"+szLab+"\/)") ){
							continue;
						}
					}

					// make label, if not set to false
					var szLabTD = "<td><span style='color:#888'>"+szLab+": </span></td>";
					if ( parser.label == "false" ){
						szLabTD = "";
					}

					// look for special attributes like tel, site, mail, ...
					// ------------------------------------------------------
					if ( szLab == "tel" ){
						szData += "<tr>"+szLabTD+"<td><a href='rel:"+szVal+"'>"+ szVal +"</a></td></tr>";
					}else
					if ( (szLab == "e_mail") || (szLab == "mail") || szLab == parser.mail ){
						szData += "<tr>"+szLabTD+"<td><a href='mailto:"+szVal+"'>"+ szVal +"</a></td></tr>";
					}else
					// image
					if ( !szVal.match(/\<img/i) && 
						(szLab == parser.image || szVal.match(/jpg/) || szVal.match(/jpeg/) || szVal.match(/gif/) || szVal.match(/png/) || szVal.match(/bmp/) || szVal.match(/tiff/)) ){
						szVal = szVal.replace(/https/g,'http');
						szData += "<tr>"+szLabTD+"<td><img src='"+szVal+"' height='120' onerror='this.src = \"resources/images/image-not-found.png\";'></td></tr>";
					}else
					// link
					if ( szLab == parser.sito || szLab == parser.link || (szLab == "url") || szVal.match(/http/)){
						var szLink = szVal;
						if ( szLink.length > 30 ){
							szLink = szLink.substr(0,29) + " ...";
						}
						szData += "<tr>"+szLabTD+"<td><a href='"+szVal+"' target='_blank' >"+ szLink +"</a></td></tr>";
					}else{
						// normal row
						//
						szData += "<tr>"+szLabTD+"<td>"+ szVal +"</td></tr>";
					}
				}
				szData += "</table>";

				var	szHtml  = szData;

				// define default icons
				// -------------------------------
				var szIcon = "./resources/icons/google/kml/paddle/blu-blank.png";
				var szSmallIcon = "./resources/icons/google/blu-circle.png";

				// get position and timestamps
				// -------------------------------
				var lat = null;
				var lon = null;
				var name = null;
				var timeStart = null;
				var timeEnd = null;
				
				for ( b in row ){
					var col   = b;
					if (col == "Latitudine" ){
						lat  = __scanValue(row[b]);
					}else
					if (col == "Longitudine" ){
						lon  = __scanValue(row[b]);
					}
				}
				if ( parser ){
					for ( b in row ){
						var col   = b;
						if (col == parser.latlon && row[b] ){
							var positionA = row[b].split(","); 
							lat  = __scanValue(positionA[0]);
							lon  = __scanValue(positionA[1]);
						}else
						if (col == parser.lat ){
							lat  = __scanValue(row[b]);
						}else
						if (col == parser.lon ){
							lon  = __scanValue(row[b]);
						}
						if (col == parser.title ){
							name  = row[b];
						}
						if (col == parser.timeStart ){
							timeStart  = row[b];
						}else
						if (col == parser.timeEnd ){
							timeEnd  = row[b];
						}
					}
				}

				// =============================================================
				// only if position is defined, finally create and inser feature
				// =============================================================

				if ( lat && lon ){

					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);

					// generic properties
					for ( b in row ){
						var col = b;
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
						var d1 =  new Date(timeStart);
						if ( parser.timeParse ){
							d1 = parser.timeParse(timeStart);
						}
						feature.properties.utime = d1.getTime();
						feature.properties.utimeStart = d1.getTime();
					}
					if ( timeEnd ){
						var d2 =  new Date(timeEnd);
						if ( parser.timeParse ){
							d2 = parser.timeParse(timeEnd);
						}
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
