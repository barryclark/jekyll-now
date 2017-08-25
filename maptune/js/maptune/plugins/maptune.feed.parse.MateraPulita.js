/**********************************************************************
maptune.feed.MateraPulita.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.geojson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.MateraPulita,v $
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
	maptune.feed.parse.MateraPulita = function(data,opt){

		if ( opt.format == "json" ) {

			data = data.data;

			var szTitle = data.description;

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szTitle);

			// create one and only layer
			// -------------------------

			var layer    = layerset.addLayer(szTitle);
			layer.properties.fGallery = true;
			layer.properties.open = "1";

			var itemA = data.channel.item;			
			// parse the feeds elements and create layere features
			// ---------------------------------------------------

			for ( i=0; i<itemA.length; i++ ){
				// parse one feature
				// -----------------
				var szImageUrl = itemA[i].file;
				var szText = itemA[i].descrizione;
				var szTitle = itemA[i].luogo;
				var szDate = itemA[i].pubDate;
				var szBonifica = itemA[i].bonifica;

				szBonifica = szBonifica.match(/nessuna/)?(szBonifica+" bonifica"):szBonifica;
				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>";
					// image defined ?
					if ( szImageUrl.match(/([^>]*[^/].(?:jpg|jpeg|bmp|gif|png))/i) ){
						szHtml += "<img src='"+szImageUrl+"' height='"+120+"px' alt='"+szImageUrl+"'/>";
					}else{
						szHtml += "<br><span style='color:#888888'>"+"( no immagine )"+"</span><br>&nbsp;";
					}
					szHtml += "</td></tr></table>";
					szHtml += "<div style='font-size:0.8em;line-height:1.2em;margin-bottom:0px'><span style='color:#aac'>"+ szDate +" </span></div>";
					szHtml += "<div style='font-size:0.8em;line-height:1.2em;margin-bottom:0px'><span style='color:#aac'>"+ szBonifica +" </span></div>";

				var szIcon = "./resources/icons/google/red-diamond.png";
				if ( itemA[i].bonifica ){
					if ( String(itemA[i].bonifica).match(/nessun/) ){
						szIcon = "./resources/icons/default/default_red.png";
					}else{
						szIcon = "./resources/icons/default/default_green.png";
					}
				}
				var szSmallIcon = "./resources/icons/google/red-circle.png";
				if ( itemA[i].bonifica ){
					if ( String(itemA[i].bonifica).match(/nessun/) ){
						szSmallIcon = "./resources/icons/default/default-small_red.png";
					}else{
						szSmallIcon = "./resources/icons/default/default-small_green.png";
					}
				}

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);

					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= itemA[i].bonifica;

					var d = (String(itemA[i].pubDate).split("segnalazione:")[1]);
					d = d.replace(/gen/g,'jan');
					d = d.replace(/feb/g,'feb');
					d = d.replace(/mar/g,'mar');
					d = d.replace(/apr/g,'apr');
					d = d.replace(/mag/g,'may');
					d = d.replace(/giu/g,'jun');
					d = d.replace(/lug/g,'jul');
					d = d.replace(/ago/g,'aug');
					d = d.replace(/set/g,'sep');
					d = d.replace(/ott/g,'oct');
					d = d.replace(/nov/g,'nov');
					d = d.replace(/dic/g,'dec');
					d = new Date(d);
					feature.properties.utime = d.getTime();

					feature.setPosition(itemA[i].long,itemA[i].lat);
			}
		} else
		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;

			$(data).find('channel').each(function(){
				var title = $(this).find('title:first').text();
				// create maptune layerset
				// ----------------------
				layerset = new maptune.feed.LayerSet(title);

				// create one and only layer
				// -------------------------

				layer = layerset.addLayer(title);
				layer.properties.fGallery = true;
				layer.properties.open = "1";
				});

			var i=0;

			$(data).find('item').each(function(){

				// parse one feature
				// -----------------
				var szImageUrl  = $(this).find('enclosure:first').attr("url");
				var szText		= $(this).find('description:first').text();
				var szTitle		= $(this).find('title:first').text();
				var szLink		= $(this).find('link:first').text();
				var szDate		= $(this).find('pubDate:first').text();

				var linkA = szLink.split(/\//);
				var szCitta  = linkA[linkA.length-4];
				var szStrada = linkA[linkA.length-3];
				var szId	 = linkA[linkA.length-2];
				var szState  = $(this).find('category:last').text();

				szText = "<span style='font-family:courier new;font-size:12px;'>"+szText+"</span>";

				var szHtml  = "<table><tr><td>"+szText+"</td></tr><tr><td>" + "<img src='"+szImageUrl+"' height='"+120+"px' /></td></tr></table>";
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-bottom:0px'>fonte: <a href='"+szLink+"'>Decoro Urbano</a>";
					// szHtml += "<br>ind.: <span style='color:#aac'>"+ szId+" "+szStrada+" "+szCitta +" </span>";
					szHtml += "<br>stato: <span style='color:#aac'>"+ szState+" - "+szCitta+" </span>";
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szDate +" </span></div>";

				var szIcon = "./resources/icons/google/red-diamond.png";
				var category = $(this).find('category:first').text();

				if ( category ){
					if ( category.match(/Rifiuti/) ){
						szIcon = "./resources/icons/decoro_urbano/rifiuti.png";
					}
					if ( category.match(/Vandalismo/) ){
						szIcon = "./resources/icons/decoro_urbano/vandalismo-incuria.png";
					}
					if ( category.match(/Dissesto stradale/) ){
						szIcon = "./resources/icons/decoro_urbano/dissesto-stradale.png";
					}
					if ( category.match(/Affissioni abusive/) ){
						szIcon = "./resources/icons/decoro_urbano/affizioni-abusive.png";
					}
					if ( category.match(/Segnaletica/) ){
						szIcon = "./resources/icons/decoro_urbano/segnaletica.png";
					}
					if ( category.match(/verdi/) ){
						szIcon = "./resources/icons/decoro_urbano/zone-verdi.png";
					}
				}
				var szSmallIcon = "./resources/icons/google/red-circle.png";
				if ( category ){
					if ( category.match(/Rifiuti/) ){
						szSmallIcon = "./resources/icons/google/darkblu-circle.png";
					}
					if ( category.match(/Vandalismo/) ){
						szSmallIcon = "./resources/icons/google/rosp-circle.png";
					}
					if ( category.match(/Dissesto stradale/) ){
						szSmallIcon = "./resources/icons/google/orang-circle.png";
					}
					if ( category.match(/Affissioni abusive/) ){
						szSmallIcon = "./resources/icons/google/viola-circle.png";
					}
					if ( category.match(/Segnaletica/) ){
						szSmallIcon = "./resources/icons/google/yel-circle.png";
					}
					if ( category.match(/verdi/) ){
						szSmallIcon = "./resources/icons/google/darkgreen-circle.png";
					}
				}
				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
					feature.properties.description	= szHtml;
					feature.properties.icon			= szIcon;
					feature.properties.smallicon	= szSmallIcon;
					feature.properties.legenditem	= category;

					var d = new Date($(this).find('pubDate:first').text());
					feature.properties.utime = d.getTime();

				var pointA = $(this).find('georss:point,point').text().split(" ");
					feature.setPosition(pointA[1],pointA[0]);

				i++;

				});
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
