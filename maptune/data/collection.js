window.ixmaps = window.ixmaps || {};

(function() {
   ixmaps.saveCollection = function(){
	 layer = ixmaps.jsapi.getLayer("*","Collection");
	 layer = layer.data;
	 var x = new Theme(layer);
	 var szJson = x.getPrettyString();
	try	{
		ixmaps.confirmMessage("Please confirm download",
			function () {
				//saveTextAsFile("var collection = "+szJson);
				saveTextAsFile(szJson);
			},
			function () {
			});
	}
	catch (e){
		if ( confirm("Please confirm download") ){
			//saveTextAsFile("var collection = "+szJson);
			saveTextAsFile(szJson);
		}
	}

	/***
	 $("#feed-dialog-content").html("<pre>"+x.getPrettyString()+"</pre>");
	 $("#feed-dialog-content").css("visibility","visible");
	 $("#feed-dialog").dialog({ width: 800, height: 500, title: "Collection", position:  [50,50] });
	 ***/
   };

   ixmaps.loadCollection = function(){
	infuseHTML('itemlist','./load.html','importdiv');
   };

 /**
 * end of namespace
 */

})();

   	/**************************************************************** 
	 *
	 * Theme 
	 *
	 ****************************************************************/

	/**
	 * This is the Theme class.  
	 * It realizes an object to configure and realize a map theme 
	 * @constructor
	 * @throws 
	 * @return A new Theme object
	 */
	function Theme(definition) {
		this.obj = null;
		this.szTheme = null;

		if ( typeof(definition) == "string" ){
			this.szTheme = definition;
			this.parse(definition);
		}else{
			this.obj = definition;
			//this.szTheme = JSON.stringify(definition);
		}
	}
	Theme.prototype.parse = function(szThemeDef){
		var szRaw = szThemeDef.replace(/\n\t+/g,'');
		try	{
			this.obj = JSON.parse(szRaw);
		} catch (e){
			ixmaps.parentApi.error("Code: "+e);
		}
	};
	Theme.prototype.getString = function(){
		if ( !this.szTheme ){
			this.szTheme = JSON.stringify(this.obj);
		}
		return this.szTheme;
	};
	Theme.prototype.getObj = function(){
		if ( !this.obj ){
			this.parse(definition);
		}
		return this.obj;
	};
	Theme.prototype.getPrettyString = function(){
		this.szPrettyString = "";
		this.tab = 1;
		this.recurs = 0;
		this.formatObj(this.obj);
		return this.szPrettyString;
	};
	Theme.prototype.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};
	Theme.prototype.formatObj = function(obj){

		if ( ++this.recurs > 10 ){
			return;
		}
		if ( this.isArray(obj) ){

			this.szPrettyString += '[';
			var n = 0;
			for ( var a in obj ){
				if ( typeof(obj[a]) == "object" ){
					this.szPrettyString += (n?',':'');
					this.tab++;
					this.formatObj(obj[a]);
					this.tab--;
				}else{
					this.szPrettyString += (n?',\n':'\n') + (this.getIndent()) + '"'+String(obj[a]).replace(/\"/,"\'")+'"';
				}
				n++;
			}
			this.szPrettyString += ']';

		}
		else{

			var n = 0;
			for ( var a in obj ){
				if ( a == "parent" || a == "listItem" || a == "gOverlayObject" || a == "gOverlayObjectPartsA" || a == "setLine" || a == "setPolygon" || a == "setPosition"){
					continue;
				}
				if ( obj[a] == null ){
					continue;
				}
				if ( typeof(obj[a]) == "object" ){
					this.szPrettyString += (n?',\n':'\n') + (this.getIndent()) + '"'+a+'": ' ;
					this.tab++;
					this.formatObj(obj[a]);
					this.tab--;
				}else{
					this.szPrettyString += (n?',\n':'{\n') + (this.getIndent()) + '"'+a+'": "'+String(obj[a]).replace(/\"/,"\'")+'"';
					n++;
				}
			}
			this.szPrettyString += '\n'+(this.getIndent())+'}';
		}

		this.recurs--;
	};
	Theme.prototype.getIndent = function(){
		var szTab = "";
		for ( var i=0; i<this.tab; i++ ){
			szTab += "\t";
		}
		return szTab;
	};


	/**
	 * isAPIAvailable  
	 * checks the browser support for the HTML5 File API
	 * displays a warning if the browser doesn't support it
	 * @type boolean
	 * @return true,false
	 */
	function isAPIAvailable() {
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			  // Great success! All the File APIs are supported.
			  return true;
		} else {
			  alert("The browser you're using does not currently support\nthe HTML5 File API. As a result the file loading demo\nwon't work properly.");
			  return false;
		}
	}
	function saveTextAsFile(szText)
	{
		var textToWrite = szText;
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		var fileNameToSaveAs = "project.json";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}

	function destroyClickedElement(event)
	{
		document.body.removeChild(event.target);
	}

	/**
	 * open/close the data input dialog 
	 * @param flag 'show' or 'hide'
	 * @type void
	 */
	__openDialog = function(szUrl){

		$("#layer").load(szUrl, function(response, status, xhr) {
			  if (status == "error") {
				var msg = "Sorry but there was an error: ";
				alert(msg + xhr.status + "\n" + xhr.statusText);
			  }
		});
	};

ixmaps.jsapi.import(
	{ "type": "Collection",
	  "name": "collection",
	  "title": "La mia mappa",
	  "description": "<div id='infodiv' style='margin-top:-10px;color:#444;'>Contiene i punti collezionati<br><label class='btn btn-default' title='scarica GeoJson' onclick='ixmaps.saveCollection();'>download GeoJson</label><div>",
	  "comment": "Creator: JsonGis 1.1 version:1.1 build:255 generation-time:Tue Feb 25 12:31:31 2014 ",
	  "layers": [
		{ "type": "FeatureCollection",
		  "properties": {
			"name": "Collection",
			"description": "",
			"Snippet": "",
			"visibility": "1",
			"open": "1",
			"legendstyle": "CHECKSUBLAYER",
			"legend": "collapsed",
			"sourcelegend": "collapsed",
			"end": ""
		  },
		  "features": []
		  }
	   ]
	}
	);



// -----------------------------
// EOF
// -----------------------------

