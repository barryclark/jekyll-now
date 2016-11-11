	_TRACE("Potenza.js ------->");

	// define default marker style for layers
	var MapParam = {
		"all" :
			{ 
			"smallInfoClipDescription" : "500",
			"smallInfoKeepImage" : "true",
			"showInfoImmediately" : "true"
			},
		"default":
			{
			"thumbnailRoot" : "resources/images/tn/",
			"markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			"markerImageType" : "png"
			}
		,
		"noItemText" : "<span style=\"color:#888\">( vuoto ) <br>"
		,
		"noItemCall" : "$(\"#add-pill\").click()"
		,
		"layerdialog" :{"href":"layer.html"}
		,
		"layerbar" :{"href":"layer.html"}
		,
		"layertab" :{"href":"layer.html"}
		,
		"layer" :{"href":"layer.html"}
		,
		"filter": { 
					"Contatti"			  : "labels:Contatti",
					"Fabbisogni"		  : "labels:Fabbisogni",
					"Alloggi"			  : "labels:Alloggi",
					"Donazioni"			  : "labels:Donazioni",
					"Notizie Utili"		  : "labels:Notizie Utili",
					"---"				  : "",					
					"Roulotte/Camper"	  : "labels:Roulotte|Camper",
					"Acquisto solidale"	  : "labels:acquisto solidale",
					"----"				  : "",					
					"da Facebook"			  : "labels:Facebook",
					"da Form"				  : "labels:Form",
					"da Telegram"			  : "labels:Telegram",
					"-----"				  : "",					
					"Segnalazioni aperti" : "open",
					"Segnalazioni chiusi" : "closed",
					"------"			  : "",					
					"Tutto":""
				}
		,
		"layers": []

	};

	maptune.jsapi.onGetIcon = function(icon,info,i) {
		if ( info.properties.labels.match(/Alloggi/)){
			icon.image = "resources/icons/map-icons-collection/lodging_0star.png";
		}
		return icon;
	}

	__init = function(){
		maptune.jsapi.setMapType("OpenStreetMap");
		maptune.selectFeedDialog("show");

	};

	maptune.onMapReady = function(){
		maptune.setView([42.755332746654964,13.208563232421875],10);
		setTimeout("__init()",1);
	};


	maptune.jsapi.onOpenInfoWindow = function(szInfo,info,szContext) {
		if ( szContext == "sidebar" ){
			var szZoomTo  = "<div style='float:right;margin-top:-1em;'>";
				szZoomTo += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szZoomTo += "</div>";
			szInfo += szZoomTo;
			var szZoomTo  = "<div style='float:right;margin-top:-1em;'>";
				szZoomTo += "<a href='javascript:maptune.jsapi.forceMap();'><span class='glyphicon glyphicon-map-marker' aria-hidden='true' style='font-size:2em'></span></a>";
				szZoomTo += "</div>";
			szInfo += szZoomTo;
		}else{
			if ( !szInfo.match(/descrizione/) ){
				szInfo += info.properties.data.descrizione;
			}
		}
		return szInfo;
	};

	// extend Number to format with leading blanks

	Number.prototype.pad = function(size) {
		var s = String(this);
		while (s.length < (size || 2)) {s = "0" + s;}
		return s;
    };

	// query eventi dal INGV con data di oggi 
	// --------------------------------------------

	maptune.load_INGV_KML = function(nDays) {

		var starttime = "2016-10-30T00:00:00";	

		var d = new Date();
		// - n days
		nDays = nDays || 1;
		d.setDate(d.getDate()-nDays);

		var szToday = d.toLocaleString();
		var dateA = szToday.split(",")[0].split("/");
		starttime = (Number(dateA[2])+"-"+Number(dateA[1]).pad(2)+"-"+Number(dateA[0]).pad(2)) + "T00:00:00";

		maptune.addFeedLayer('http://webservices.ingv.it/fdsnws/event/1/query?starttime='+starttime+'&minmag=0&maxmag=10&mindepth=0&maxdepth=1000&minlat=-90&maxlat=90&minlon=-180&maxlon=180&minversion=100&orderby=time-asc&format=kml&limit=4000',
			{
			type:'kml',
			format:'xml',
			flag:'open|zoomto',
			name:'INGV - attività sismica (KML)',
			layer:{'name': 'INGV - attività sismica (KML)',
				'description':'<a href="javascript:maptune.load_INGV_KML()"> Terremoti </a> di oggi <br><a href=\'javascript:maptune.playTimeline({framerate:10,unit:&quot;hours&quot;,tail:3})\'> start sequenza temporale &nbsp;&nbsp;<span class=\'glyphicon glyphicon-play\' style=\'font-size:1em;\' aria-hidden=\'true\'></span></a> <img src=\'http://iside.rm.ingv.it/images/legend_kml.png\' height=\'180\' style=\'float:right\'>',
				'markerType' : 'symbol',
				'markerImageType' : 'png',
				'initListState' : 'noinfo',
				'sort' : 'timeDown',
				},
			parser: 
				{
				timeStart: 'name',
				timeEnd:  'name',
				timeParse: function(value){
								var dateA = value.split(' ');
								dateA = dateA.slice(3);
								var date = dateA.join(" ");
								return new Date(date);
							},
				},
			proxy:true
			});
		};

	maptune.load_INGV_GeoJson = function(nDays) {

		var starttime = "2016-10-30T00:00:00";	

		var d = new Date();
		// - n days
		nDays = nDays || 1;
		d.setDate(d.getDate()-nDays);

		var szToday = d.toLocaleString();
		var dateA = szToday.split(",")[0].split("/");
		starttime = (Number(dateA[2])+"-"+Number(dateA[1]).pad(2)+"-"+Number(dateA[0]).pad(2)) + "T00:00:00";

		maptune.addFeedLayer('http://webservices.ingv.it/fdsnws/event/1/query?starttime='+starttime+'&minmag=0&maxmag=10&mindepth=0&maxdepth=1000&minlat=-90&maxlat=90&minlon=-180&maxlon=180&minversion=100&orderby=time-asc&format=geojson&limit=4000',
			{
			type:'GeoJson',
			format:'json',
			flag:'open|zoomto',
			name:'INGV - attività  sismica (GeoJson)',
			parser: 
				{
				title: 'mag',
				timeStart: 'time',
				timeEnd:   'time',
				timeParse: function(value){
							return new Date(value);
							},
				},
			layer:{
				'name': 'INGV - attività  sismica (GeoJson)',
				'description':'Terremoti di oggi <br><a href=\'javascript:maptune.playTimeline({framerate:10,unit:&quot;hours&quot;,tail:3})\'> start sequenza temporale &nbsp;&nbsp;<span class=\'glyphicon glyphicon-play\' style=\'font-size:1em;\' aria-hidden=\'true\'></span></a>',
				'markerType' : 'symbol',
				'markerImage' : 'resources/icons/default/symbols/red_circle.png',
				'smallImage' : 'resources/icons/default/symbols/red_circle.png',
				'markerImageType' : 'png',
				'initListState' : 'noinfo',
				'sort' : 'timeDown',
				'markerSizeRule': {	'source': 'mag',
								    'normalSizeValue': 3,
								    'pow': 2
								  }
			},
			proxy:true
			});
		};

	maptune.load_INGV_GeoRSS = function(nDays) {

		var starttime = "2016-10-30T00:00:00";	

		var d = new Date();
		// - n days
		nDays = nDays || 1;
		d.setDate(d.getDate()-nDays);

		var szToday = d.toLocaleString();
		var dateA = szToday.split(",")[0].split("/");
		starttime = (Number(dateA[2])+"-"+Number(dateA[1]).pad(2)+"-"+Number(dateA[0]).pad(2)) + "T00:00:00";

		maptune.addFeedLayer('http://webservices.ingv.it/fdsnws/event/1/query?starttime='+starttime+'&minmag=0&maxmag=10&mindepth=0&maxdepth=1000&minlat=-90&maxlat=90&minlon=-180&maxlon=180&minversion=100&orderby=time-asc&format=atom&limit=4000',
			{
			type:'GeoRSS',
			format:'xml',
			flag:'open|zoomto',
			name:'INGV - attività  sismica (GeoRSS)',
			layer:{
				'name': 'INGV - attività  sismica (GeoRSS)',
				'description':'Terremoti di oggi <a href=\'javascript:maptune.playTimeline({framerate:24,unit:&quot;hours&quot;,tail:10})\'> start sequenza temporale &nbsp;&nbsp;<span class=\'glyphicon glyphicon-play\' style=\'font-size:1em;\' aria-hidden=\'true\'></span></a>',
				'markerType' : 'symbol',
				'markerImage' : 'resources/icons/default/symbols/red_circle.png',
				'smallImage' : 'resources/icons/default/symbols/red_circle.png',
				'markerImageType' : 'png',
				'initListState' : 'noinfo',
				'sort' : 'timeDown',
				'markerSizeRule': {	'source': 'name',
									'regex' : '/.* Magnitude\\(..\\) ?([0-9]+\\.([0-9])?|\\.[0-9])?/i',
									'matchIndex' : 1,
								    'normalSizeValue' : 3,
								    'pow' : 2
								  }
				},
			proxy:true
			});
		};

	// --------------------------------------
	// EOF
	// --------------------------------------

	_TRACE("Terremoto.js ----- EOF");
