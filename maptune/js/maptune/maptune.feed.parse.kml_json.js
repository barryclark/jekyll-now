/**********************************************************************
maptune.feed.kml.js

$Comment: provides JavaScript for import of kml coded feeds
$Source : maptune.feed.kml,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/27 $
$Author: guenter richter $
$Id:maptune.feed.kml.js 1 2012-02-27 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.kml,v $
**********************************************************************/

/** 
 * @fileoverview This file is a kml plugin for maptune.jsapi top import arbitrari georeferenced feeds
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
 * depracated !!! use maptune.feed.parse.kml_json instead !!!
 *
 * parse the feed data and make an maptune layer object 
 * the data must be a KML transcoded by YQL into GeoJson
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an maptune layer object
 */
	maptune.feed.parse.MyMapsKLM_YQL = function(data,opt){alert(data);

		if ( !data.kml || !data.kml.Document  ){
			// alert("no valid KML!");
			alert("http status message: "+data.query.diagnostics.url["http-status-message"]);
			return null;
		}
		var kml = data.kml.Document;

		if ( !kml ){
			// alert("no valid KML!");
			return null;
		}
		var styleA = null;
		if ( kml.Style ){
			styleA = kml.Style;
		}
		if ( kml.Folder ){
			kml = kml.Folder;
			kml.Style = styleA;
		}
		if ( !kml.Placemark ){
			// alert("no valid KML!");
			return null;
		}
		var	szTitle = opt.title?opt.title:kml.name;
		if ( (szTitle == null) || (szTitle.length == 0) ){
			szTitle = "no name-";
		}

		var parser = {};
		if ( opt.opt && opt.opt.parser ){
			parser = opt.opt.parser;
		}

		// create maptune layerset
		// ----------------------
		var layerset = new maptune.feed.LayerSet(szTitle);

		// create one and only layer
		// -------------------------
		var layer    = layerset.addLayer(szTitle);
		layer.properties.fGallery = false;
		layer.properties.open = "1";
	
		// parse the feeds elements and create layere features
		// ---------------------------------------------------
		for ( i=0; i<kml.Placemark.length; i++ ){

			var timeStart = null;
			var timeEnd = null;

			var pl = kml.Placemark[i];

			if ( parser ){
				for ( b in pl ){
					if (b == parser.timeStart ){
						timeStart  = pl[b];
					}else
					if (b == parser.timeEnd ){
						timeEnd  = pl[b];
					}
				}
			}

			if ( pl.Point )	{

				// parse one point feature
				// -----------------------
				var szImageUrl = "";
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}

				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";

				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						// GR 07.03.2016 styles may be defined in <pair> with -normal and -highlight style
						// this is a Q&D implementation that handles the -normal ones if <pair> is defined
						if ( (kml.Style[s].id == szStyleId) || (kml.Style[s].id == (szStyleId+'-normal') ) ){
							szIcon = kml.Style[s].IconStyle.Icon.href;
							szSmallIcon = "./resources/icons/google/red-circle.png";
							if ( szIcon.match(/red/)){
								szSmallIcon = "./resources/icons/google/red-circle.png";
							}else
							if ( szIcon.match(/green/)){
								szSmallIcon = "./resources/icons/google/grn-circle.png";
							}else
							if ( szIcon.match(/blu/)){
								szSmallIcon = "./resources/icons/google/blu-circle.png";
							}else
							if ( szIcon.match(/yel/)){
								szSmallIcon = "./resources/icons/google/yel-circle.png";
							}else
							if ( szIcon.match(/viol/)){
								szSmallIcon = "./resources/icons/google/viola-circle.png";
							}
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= szIcon;
					var position = pl.Point.coordinates.split(",");
					feature.setPosition(position[0],position[1]);

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
			if ( pl.LineString )	{

				// parse one line feature
				// -----------------------
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}
                var style = { "lineStyle": {"color": "#66cc00","width": "5" } };
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].LineStyle.color;
							szWidth = kml.Style[s].LineStyle.width;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							style = { "lineStyle": {"color": szColor,"width": szWidth } };
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.legenditem	= szTitle;
					feature.properties.style		= style;
					var positionA = pl.LineString.coordinates.split(" ");
					var coordA = new Array(0);
					for ( var v=0; v<positionA.length; v++ ){
						if ( !isNaN(parseFloat(positionA[v]))){
							var position = positionA[v].split(",");
							coordA.push(new Array(position[0],position[1]));
						}
					}
					feature.setLine(coordA);
			}
			if ( pl.Polygon )	{

				// parse one line feature
				// -----------------------
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}
                var linestyle = {"color": "#66cc00","width": "5" };
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].LineStyle.color;
							szWidth = kml.Style[s].LineStyle.width;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							linestyle = {"color": szColor,"width": szWidth/20 };
						}
					}
				}catch (e){
				}

                var fillstyle = {"color": "#66cc00","opacity": "0.5"};
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].PolyStyle.color;
							szFill  = kml.Style[s].PolyStyle.fill;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							fillstyle = {"color": szColor,"opacity": (Number(aa)/255) };
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.legenditem	= szTitle;
					feature.properties.style		= { "lineStyle": linestyle,"fillStyle": fillstyle };
					var coordinates = pl.Polygon.outerBoundaryIs.LinearRing.coordinates;
					if ( coordinates ){
						var positionA = coordinates.split(" ");
						var ringsA = new Array(0);
						var coordA = new Array(0);
						for ( var v=0; v<positionA.length; v++ ){
							if ( !isNaN(parseFloat(positionA[v]))){
								var position = positionA[v].split(",");
								coordA.push(new Array(position[0],position[1]));
							}
						}
						ringsA.push(coordA);
						feature.setPolygon(ringsA);
					}
			}

		}
		return layerset;
	};

/**
 * parse the feed data and make an maptune layer object 
 * the data must be a KML transcoded by YQL into GeoJson
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an maptune layer object
 */
	maptune.feed.parse.kml_json = function(data,opt){

		if ( !data.kml || !data.kml.Document  ){
			// alert("no valid KML!");
			alert("http status message: "+data.query.diagnostics.url["http-status-message"]);
			return null;
		}

		var kml = data.kml.Document;

		if ( !kml ){
			// alert("no valid KML!");
			return null;
		}
		// Q&D folder workaround
		// ----------------------
		var styleA = null;
		if ( kml.Style ){
			styleA = kml.Style;
		}
		if ( kml.Folder ){
			kml = kml.Folder;
			kml.Style = styleA;
		}
		if ( !kml.Placemark ){
			// alert("no valid KML!");
			return null;
		}
		var	szTitle = opt.title?opt.title:kml.name;
		if ( (szTitle == null) || (szTitle.length == 0) ){
			szTitle = "no name-";
		}

		var parser = {};
		if ( opt.opt && opt.opt.parser ){
			parser = opt.opt.parser;
		}

		// create maptune layerset
		// ----------------------
		var layerset = new maptune.feed.LayerSet(szTitle);

		// create one and only layer
		// -------------------------
		var layer    = layerset.addLayer(szTitle);
		layer.properties.fGallery = false;
		layer.properties.open = "1";

		// parse the feeds elements and create layere features
		// ---------------------------------------------------
		for ( i=0; i<kml.Placemark.length; i++ ){

			var timeStart = null;
			var timeEnd = null;

			var pl = kml.Placemark[i];

			if ( parser ){
				for ( b in pl ){
					if (b == parser.timeStart ){
						timeStart  = pl[b];
					}else
					if (b == parser.timeEnd ){
						timeEnd  = pl[b];
					}
				}
			}

			if ( pl.Point )	{

				// parse one point feature
				// -----------------------
				var szImageUrl = "";
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}

				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";

				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						// GR 07.03.2016 styles may be defined in <pair> with -normal and -highlight style
						// this is a Q&D implementation that handles the -normal ones if <pair> is defined
						if ( (kml.Style[s].id == szStyleId) || (kml.Style[s].id == (szStyleId+'-normal') ) ){
							szSmallIcon = "./resources/icons/google/red-circle.png";
							szIcon = kml.Style[s].IconStyle.Icon.href;
							if ( szIcon.match(/red/)){
								szSmallIcon = "./resources/icons/google/red-circle.png";
							}else
							if ( szIcon.match(/green/)){
								szSmallIcon = "./resources/icons/google/grn-circle.png";
							}else
							if ( szIcon.match(/blu/)){
								szSmallIcon = "./resources/icons/google/blu-circle.png";
							}else
							if ( szIcon.match(/yel/)){
								szSmallIcon = "./resources/icons/google/yel-circle.png";
							}else
							if ( szIcon.match(/viol/)){
								szSmallIcon = "./resources/icons/google/viola-circle.png";
							}
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= szIcon;
					var position = pl.Point.coordinates.split(",");
					feature.setPosition(position[0],position[1]);

				if ( pl.TimeStamp )	{
					var szText = pl.TimeStamp.when;
					var d1 =  new Date(szText);
					feature.properties.utime = d1.getTime();
				}

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
			if ( pl.LineString )	{

				// parse one line feature
				// -----------------------
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}
                var style = { "lineStyle": {"color": "#66cc00","width": "5" } };
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].LineStyle.color;
							szWidth = kml.Style[s].LineStyle.width;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							style = { "lineStyle": {"color": szColor,"width": szWidth } };
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.legenditem	= szTitle;
					feature.properties.style		= style;
					var positionA = pl.LineString.coordinates.split(" ");
					var coordA = new Array(0);
					for ( var v=0; v<positionA.length; v++ ){
						if ( !isNaN(parseFloat(positionA[v]))){
							var position = positionA[v].split(",");
							coordA.push(new Array(position[0],position[1]));
						}
					}
					feature.setLine(coordA);
			}

			if ( pl.Polygon )	{

				// parse one line feature
				// -----------------------
				var szText = pl.description||"&nbsp;";
				var szTitle = pl.name;

				var szHtml  = "<p>"+szText+"</p>";
				if ( opt.fonte ){
					szHtml += "<p style='font-size:0.7em;margin-top:10px;'><span style='color:#ddd;'>fonte: </span><a href='"+opt.fonte+"'>"+opt.fonte+"</a></p>";
				}
                var linestyle = {"color": "#66cc00","width": "5" };
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].LineStyle.color;
							szWidth = kml.Style[s].LineStyle.width;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							linestyle = {"color": szColor,"width": szWidth/20 };
						}
					}
				}catch (e){
				}

                var fillstyle = {"color": "#66cc00","opacity": "0.5"};
				try	{
					szStyleId = pl.styleUrl.split(/#/)[1];
					for ( s=0; s<kml.Style.length; s++ ){
						if (kml.Style[s].id == szStyleId ){
							szColor = kml.Style[s].PolyStyle.color;
							szFill  = kml.Style[s].PolyStyle.fill;
							var aa = szColor.substr(0,2);
							var bb = szColor.substr(2,2);
							var gg = szColor.substr(4,2);
							var rr = szColor.substr(6,2);
							szColor = "#"+rr+gg+bb;
							fillstyle = {"color": szColor,"opacity": (Number(aa)/255) };
						}
					}
				}catch (e){
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.legenditem	= szTitle;
					feature.properties.style		= { "lineStyle": linestyle,"fillStyle": fillstyle };
					var coordinates = pl.Polygon.outerBoundaryIs.LinearRing.coordinates;
					if ( coordinates ){
						var positionA = coordinates.split(" ");
						var ringsA = new Array(0);
						var coordA = new Array(0);
						for ( var v=0; v<positionA.length; v++ ){
							if ( !isNaN(parseFloat(positionA[v]))){
								var position = positionA[v].split(",");
								coordA.push(new Array(position[0],position[1]));
							}
						}
						ringsA.push(coordA);
						feature.setPolygon(ringsA);
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
