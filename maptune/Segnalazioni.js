	_TRACE("Segnalazioni.js ------->");

	// define default marker style for layers
	// --------------------------------------
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
		"layerdialog" :{"href":"layer.html"}
		,
		"layerbar" :{"href":"layer.html"}
		,
		"layertab" :{"href":"layer.html"}
		,
		"layer" :{"href":"layer.html"}
		,
		"filter": { "segnalazioni aperti" : "open",
					"segnalazioni chiusi" : "closed",
					"elimina filtri":""
				}
		,
		"layers": []

	};

	/**
	 * is called with delay (see below)
	 *  --------------------------------
	 */

	__init = function(){

		maptune.jsapi.setMapType("OpenStreetMap");

		maptune.addFeedLayer('https://raw.githubusercontent.com/emergenzeHack/terremotocentro/master/_data/issues.csv',{
			type:'csv',
			format:'csv',
			flag:'open|zoomto',
			title:'Segnalazioni',
			proxy:'true',
			name:'Segnalazioni',
			parser:{
				lat: 'lat',
				lon: 'lon',
				title: 'title',
				image: 'image',
				timeStart: 'created_at',
				label: 'true',
				info: 'url|id|created_at|updated_at|title|labels|milestone|image|body|state'
			},
			layer:{'name': 'Segnalazioni',
				'markerImage' : 'resources/icons/map-icons-collection/flag_red.png',
				'smallImage' :  'resources/icons/default/default-small_red.png',
				'markerType' : 'categorical',
				'category'   : 'state', 
				'categoryList': { 
					  'closed':
							  { 'markerImage' : 'resources/icons/default/default_dark_green.png',
								'smallImage' :  'resources/icons/default/default-small_dark_green.png'
							  },
					  'open':
							  { 'markerImage' : 'resources/icons/default/default_red.png',
								'smallImage' :  'resources/icons/default/default-small_red.png'
							  }
				},
				'markerImageType' : 'png',
				'initialTimeScope':'all',
				'sort' : 'timeDown',
				}
			});


	};

	/**
	 * is called when maptune is initialized
	 * -------------------------------------
	 */
	maptune.onMapReady = function(){
		maptune.setView([42.755332746654964,13.208563232421875],10);
		setTimeout("__init()",100);
	};


	/**
	 * is called from maptune when info window is opened on map or in the item list
	 * used can change or add (html) content
	 *
	 * @param szInfo	the actual HTML content
	 * @param info		internal json format of layer item
	 * @param szContext "map" or "sidebar"
	 * @return new HTML content
	 */
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
		}
		return szInfo;
	};


	// --------------------------------------
	// EOF
	// --------------------------------------

	_TRACE("Segnalazioni.js ----- EOF");
