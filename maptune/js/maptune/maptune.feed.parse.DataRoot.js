/**********************************************************************
maptune.feed.DataRoot.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.geojson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/12/29 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-12-29 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.DataRoot,v $
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
	maptune.feed.parse.DataRoot = function(data,opt){
		
		if ( opt.format == "json" ) {

			var szItem = null;

			for ( a in data.dataroot ){
				var szType = eval("typeof(data.dataroot."+a+")");
				if ( szType === "object" ){
					szItem = a;
				}
			}

			// create maptune layerset
			// ----------------------
			var layerset = new maptune.feed.LayerSet(szItem);
			layerset.title = opt.title;

			// create one and only layer
			// -------------------------

			var layer    = layerset.addLayer(szItem);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var itemA = eval("data.dataroot."+szItem);

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// parse one feature
				// -----------------
				var szText = itemA[i].indirizzo || itemA[i].AnteprimaInformazioni;
				var szTitle = itemA[i].Denominazione || itemA[i].TitoloEvento;
				var szPubDate = itemA[i].GiornoDiRiferimento;
				var szLink = "http://www.opendata.provincia.roma.it/";
				var szLinkSito = itemA[i].SitoInternetEvento;
				var szLinkInfo = itemA[i].LinkUlterioriInfomazioni;

				// GR this is not working fine 
				// it was a try, to scroll only the text, must add maptune.touchScroll("..."); to get it working
				// szText = "<div style='overflow:auto;max-height:250px;'><span style='font-family:courier new;font-size:12px;'>"+szText+"</span></div>";

				szText = "<div><span style='font-family:courier new;font-size:12px;'>"+szText+"</span></div>";

				var szHtml  = szText;
					szHtml += "<div style='font-size:0.6em;line-height:1.2em;margin-top:10px;margin-bottom:0px'>";
					szHtml += "fonte: <a href='"+szLink+"'>www.opendata.provincia.roma.it</a>";
					if ( szLinkSito ){
						szHtml += "<br>sito: <a href='"+szLinkSito+"'>"+szLinkSito.split('?')[0]+"</a>";
					}
					if ( szLinkInfo ){
						szHtml += "<br>info: <a href='"+szLinkInfo+"'>"+szLinkInfo.split('?')[0]+"</a>";
					}
					szHtml += "<br>publ.: <span style='color:#aac'>"+ szPubDate +" </span>";
					szHtml += "</div>";

				var szIcon = "./resources/icons/default/kml/default.png";
				var szSmallIcon = "./resources/icons/default/kml/default-small.png";

				var lat = itemA[i].latitudine || itemA[i].Latitudine;
				var lon = itemA[i].longitudine || itemA[i].Longitudine;

				if ( lat && lon ){
					// add one feature
					// ---------------
					var feature = layer.addFeature(szTitle);
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= szItem;

						feature.setPosition(lon,lat);
				}

				// search date within description 
				// ------------------------------
				// start date
				// ----------
				var dateA = [];
				var szText = itemA[i].DataInizioEvento || "";
				while( szText.length ){ 
					var index = szText.search(/([0-2]\d|[3][0-1])\/([0]\d|[1][0-9])\/([1-2]\d|[0-9][0-9][0-9])/);
					if ( index > 0 ){
						dateA.push(szText.substr(index,10).split('/'));
						szText = szText.substr(index+10,szText.length-index-10);
					}else{
						szText = "";
					}
				}
				if ( dateA.length && (dateA[0][2].length == 4) ){
					var d1 =  new Date(dateA[0][2],dateA[0][1]-1,dateA[0][0]);
					feature.properties.utime = d1.getTime();
					feature.properties.utimeStart = d1.getTime();
				}

				// end date
				// --------
				dateA = [];
				szText = itemA[i].DataFineEvento || "";
				while( szText.length ){ 
					var index = szText.search(/([0-2]\d|[3][0-1])\/([0]\d|[1][0-9])\/([1-2]\d|[0-9][0-9][0-9])/);
					if ( index > 0 ){
						dateA.push(szText.substr(index,10).split('/'));
						szText = szText.substr(index+10,szText.length-index-10);
					}else{
						szText = "";
					}
				}
				if ( dateA.length && (dateA[0][2].length == 4) ){
					var d1 =  new Date(dateA[0][2],dateA[0][1]-1,dateA[0][0]);
					feature.properties.utimeEnd = d1.getTime();
				}


			}
		} else
		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;

			$(data).find('dataroot').each(function(){
				var itemA = $(this).children();
				itemA.each(function(){
					var rowA = $(this).children();
				});
			});
			return;
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
