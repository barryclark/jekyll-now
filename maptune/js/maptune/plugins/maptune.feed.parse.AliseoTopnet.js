/**********************************************************************
maptune.feed.AliseoTopnet.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.geojson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.AliseoTopnet,v $
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
	maptune.feed.parse.AliseoTopnet = function(data,opt){

		// create maptune layerset
		// ----------------------
		var layerset = new maptune.feed.LayerSet(data.value.title);

		// create one and only layer
		// -------------------------
		var layer    = layerset.addLayer(data.value.title);

		var customIcons = new Array(0);
		customIcons["0"] = "./resources/icons/free-wifi-green.png"; // iconGreen;
		customIcons["1"] = "./resources/icons/free-wifi.png"; // iconBlue;
		customIcons["2"] = "./resources/icons/free-wifi-red.png"; // iconRed;
		customIcons["3"] = "./resources/icons/free-wifi-green.png"; // iconGreen;
		customIcons["4"] = "./resources/icons/free-wifi.png"; // iconBlue;

		// parse the feeds elements and create layere features
		// ---------------------------------------------------
		for ( i=0; i<data.count; i++ ){

			// parse one feature
			// -----------------
			var szImageUrl = "";
			var szText = "";
			var szTitle = data.value.items[i].nome;
			var szLink = data.value.items[i].link;


            var name = data.value.items[i].nome;
            var address = data.value.items[i].address;
            var cap = data.value.items[i].cap;
            var city = data.value.items[i].city;
            var logo = data.value.items[i].logo;
            var link = data.value.items[i].link;
            var provincia = data.value.items[i].provincia;
            var width = data.value.items[i].width;
            var height = data.value.items[i].height;
            var type = data.value.items[i].type;

			if ( 0 ){
				if (logo != '' && link !='') {
					var html = "<div><a title= '" + name + "' href='"+link+"'><img alt= '" + name + "' width='" + width + "' height='" + height + "' src='images/loghi/"+logo+"' /></a><br/><b>" + name + "</b> <br/>" + address+ "<br/>" + cap + ", "+  city + " " +provincia + " <br/><a title= '" + name + "' href='"+link+"'>"+link+"</a><br>&nbsp;</div>";
				} else {
					if (link != '') {
						var html = "<div><b>" + name + "</b> <br/>" + address+ "<br/>" + cap + ", "+  city + " " +provincia + " <br/><a title= '" + name + "' href='"+link+"'>"+link+"</a><br>&nbsp;</div>";
					} else if (logo != '') {
						var html = "<div><img src='http://aliseo.topnet.it/images/loghi/"+logo+"' width='" + width + "' height='" + height + "' /><br/><b>" + name + "</b> <br/>" + address+ "<br/>" + cap + ", "+  city + " " +provincia + "<br>&nbsp;</div>";
					} else {
						var html = "<div><b>" + name + "</b> <br/>" + address+ "<br/>" + cap + ", "+  city + " " +provincia + "<br>&nbsp;</div>";
					}
				}
			}
			else {
				var html = "<span>" +address+ "<br/>" + cap + ", "+  city + " " +provincia + "</span>";
			}
			var szHtml  = html;
				// szHtml += "<tr><td><img src='"+szImageUrl+"' height='"+120+"px' /></td></tr>";
				szHtml += "<p style='font-size:1em;margin:0px;padding:0px;margin-top:3px;'>"+ "<a href='"+szLink+"'>"+szLink+"</a></p>";
				szHtml += "<p style='font-size:0.8em;margin:0px;padding:0px;margin-bottom:3px;'><span style='color:#ddd;'>fonte: </span><a href='http://aliseo.topnet.it'>Aliseo Topnet</a></p>";

			
			// set type specific icon
			var szIcon = customIcons[data.value.items[i].type];
			var szSmallIcon = "./resources/icons/google/blu-circle.png";

			// add one feature
			// ---------------
			var feature = layer.addFeature(szTitle);
				feature.properties.description	= szHtml;
				feature.properties.icon			= szIcon;
				feature.properties.iconscale	= 0.7;
				feature.properties.smallicon	= null; //szSmallIcon;
				feature.properties.legenditem	= "Aliseo Topnet";

				feature.setPosition(data.value.items[i].lng,data.value.items[i].lat);
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
