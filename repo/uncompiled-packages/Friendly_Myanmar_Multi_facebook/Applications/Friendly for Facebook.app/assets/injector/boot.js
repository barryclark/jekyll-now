window.__ow_ts_0=new Date().getTime();
(function(){
	//var bootcss='div[data-sigil="MTopBlueBarHeader"] {background:#526ca3 !important;-webkit-box-shadow:none !important;} \n body.touch{border-color:#526ca3 !important;}';
	//var cssnode = window.document.createElement('style'); cssnode.innerText=bootcss; window.document.head.appendChild(cssnode);
//	var bootcss=window.document.createElement('link');bootcss.setAttribute('type','text/css');bootcss.setAttribute('rel','stylesheet');bootcss.setAttribute('href','resources:///assets/injector/boot.css');window.document.head.appendChild(bootcss);


	window.ow_init = function(){
		window.__ow_ts_1=new Date().getTime();
		console.debug("jq loaded: "+(__ow_ts_1-__ow_ts_0));
		var $ = ow_jQuery;
			try{
				window.UIFeaturesModules={
					"FB":{name:"fb",js:"fb.js"},
					"Screen":{name:"ui",js:"screen.js"},
					"jQuery":{name:"jquery",js:"jquery_wrapper.js"},
					"Floating":{name:"ui",js:"floating.js",css:"floating.css"},
					"Expandable":{name:"ui",js:"expandable.js",css:"expandable.css"},
					"Bridge":{name:"bridge",js:"bridge.js"},
					"Pincode":{name:"pincode",js:"pincode.js",css:"pincode.css"},
					"Birthdays":{name:"main",js:"birthdays.js"},
					"Pages":{name:"ui",js:"pages.js",css:"pages.css"},
					"Options":{name:"main",js:"options.js"},
					"Links":{name:"main",js:"links.js"},
					"Home":{name:"main",js:"home.js",css:"home.css"},
					"main":{name:"main",js:"main.js",css:"main.css"},
					"mainHome":{name:"main",js:"mainHome.js",css:"mainHome.css"}
				};
				window.UIFeaturesBaseURL = "resources:///assets/injector/";
				var hash = document.location.hash;
				if (!hash){
					hash= "#!ow_main";
				}
				if (hash=="#!ow_main"){
				    window.UIFeaturesMain = "main";
				} else if (hash == "#!ow_home"){
					window.UIFeaturesMain = "mainHome";
				} else {
					window.UIFeaturesMain = "main";
				}
				window.UIFeaturesDefrecPrefix = "ow_";
				%@
				
				__ow__startloadedfw();
			}catch(e){
				alert(e);
			}
	};
	var s=window.document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('src','resources:///assets/injector/libs/jquery-1.9.1-noConflict.js');s.setAttribute('onload','ow_init()');window.document.head.appendChild(s);
	
})();
