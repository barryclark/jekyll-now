/**********************************************************************
maptune.feed.georss.js

$Comment: provides JavaScript for import of feeds
$Source : maptune.feed.georss,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/01/15 $
$Author: guenter richter $
$Id:map_pipe.js 1 2012-01-15 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:maptune.feed.georss,v $
**********************************************************************/

/** 
 * @fileoverview This file is a georss plugin for maptune.jsapi top import arbitrari georeferenced feeds
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

	$.fn.filterNode = function(name) {
		return this.find('*').filter(function() {
			return this.nodeName === name;
		});
	};

	$.fn.filterNodeGetFirst = function(name) {
		return this.filterNode(name).first().text();
	};

/**
 * parse the feed data and make an maptune layer object  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an maptune layer object
 */
	maptune.feed.parse.MiBAC_DBUnico = function(data,opt){

		if ( opt.format == "xml" ) {

			var layerset = null;
			var layer = null;
			var fonte = null;

			var channelLat = null;
			var channelLng = null;
			
			console.log(data);

			// create maptune layerset
			// ----------------------
			layerset = new maptune.feed.LayerSet(opt.title);

			layer = layerset.addLayer(opt.title);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var i=0;

			$(data).find('luogodellacultura').each(function(){

				var szTitle = $(this).find('nomestandard:first').text();

				// add one feature
				// ---------------
				var feature = layer.addFeature(szTitle);
				
				// create info table
				// ------------------------------------
				var szData = "<table>";

				var szTipologia = $(this).find('tipologia:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>Tipologia:</span></td><td>"+szTipologia+"</td></tr>";

				var szCategoria = $(this).find('categoria:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>Categoria:</span></td><td>"+szCategoria+"</td></tr>";

				var szProprieta = $(this).find('proprieta:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>Proprieta:</span></td><td>"+szProprieta+"</td></tr>";

				var szDescription = $(this).find('testostandard:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>Descrizione:</span></td><td>"+szDescription+"</td></tr>";

				var allegati = $(this).find('allegati:first')
				szData += "<tr><td></td><td>";
				allegati.find('url').each(function(){
					szImageUrl = $(this).text();
					szData += "<img style='margin-right:5px;margin-bottom:5px' src='"+szImageUrl+"' height='"+120+"px' />";
				});
				szData += "</td></tr>";
				szData += "<tr><td>&nbsp;</td></tr>";

				var szOrario = $(this).find('orario:first').find('testostandard:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>orario:</span></td><td>"+szOrario+"</td></tr>";

				var szResponsabile = $(this).find('responsabile:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>responsabile:</span></td><td>"+szResponsabile+"</td></tr>";

				var szAccessibilita = $(this).find('accessibilita:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>accessibilita:</span></td><td>"+szAccessibilita+"</td></tr>";

				var szServizio = $(this).find('servizio:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>servizio:</span></td><td>"+szServizio+"</td></tr>";

				var szSito = $(this).find('sitoweb:first').text();
				szData += "<tr><td><span style='color:#888'>sito:</span></td><td>"+szSito+"</td></tr>";

				var szEmail = $(this).find('email:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>email:</span></td><td>"+szEmail+"</td></tr>";

				var szEmailCert = $(this).find('email-certificata:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>email-pec:</span></td><td>"+szEmailCert+"</td></tr>";

				var szTel = $(this).find('telefono:first').find('testostandard:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>tel:</span></td><td>"+szTel+"</td></tr>";

				var szFax = $(this).find('fax:first').find('testostandard:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>fax:</span></td><td>"+szFax+"</td></tr>";

				var szChiusuraSett = $(this).find('chiusuraSettimanale:first').find('testostandard:first').text();
				szData += "<tr style='vertical-align:top'><td><span style='color:#888'>chiusura settimanale:</span></td><td>"+szChiusuraSett+"</td></tr>";

				var indirizzo = $(this).find('indirizzo:first');

				var szVia = indirizzo.find('via-piazza:first').text();
				szData += "<tr><td><span style='color:#888'>via:</span></td><td>"+szVia+"</td></tr>";
				var szCAP = indirizzo.find('cap:first').text();
				szData += "<tr><td><span style='color:#888'>cap:</span></td><td>"+szCAP+"</td></tr>";
				var szComune = indirizzo.find('comune:first').text();
				szData += "<tr><td><span style='color:#888'>comune:</span></td><td>"+szComune+"</td></tr>";
				var szProvincia = indirizzo.find('provincia:first').text();
				szData += "<tr><td><span style='color:#888'>provincia:</span></td><td>"+szProvincia+"</td></tr>";
				var szRegione = indirizzo.find('regione:first').text();
				szData += "<tr><td><span style='color:#888'>regione:</span></td><td>"+szRegione+"</td></tr>";
				szData += "</table>";
				szData += "<br>";
				szData += "<table>";
				var szLat = $(this).filterNodeGetFirst('latitudine');
				szData += "<tr><td><span style='color:#888'>lat:</span></td><td>"+szLat+"</td></tr>";
				var szLon = $(this).filterNodeGetFirst('longitudine');
				szData += "<tr><td><span style='color:#888'>lon:</span></td><td>"+szLon+"</td></tr>";
				szData += "</table>";

				// ------------------------------------

				feature.properties.description	= szData;

				var lat = $(this).filterNodeGetFirst('latitudine');
				var lng = $(this).filterNodeGetFirst('longitudine');
				feature.setPosition(lng,lat);

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
