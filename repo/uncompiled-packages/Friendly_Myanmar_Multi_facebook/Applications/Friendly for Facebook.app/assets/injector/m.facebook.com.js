if (window.top==window){
	window.__ow_ts_0=new Date().getTime();
	(function(){
		window.ow_init = function(){
			function inlinedDefines(){
				// jQuery
				ow_define("jQuery",[],function(){ console.debug(ow_jQuery); return window.ow_jQuery; });
				// Bridge
				ow_define("Bridge",["jQuery"],function($){
					return (function(){
						var _={};
						
						_.callOwner = function(fn,data,callback){
						  var iframe = document.createElement('iframe');
						  iframe.setAttribute('src', "http://ow_ownerjscall/"+fn+"?params=" + encodeURIComponent(JSON.stringify(data)));
						  document.body.appendChild(iframe);
						  iframe.parentNode.removeChild(iframe);
						  iframe = null;
						};
						_.callNative = function(fn,data,callback){
							$.ajax({	
								url:"bridge://"+fn+"/",
								dataType:"jsonp",
								data:data,
								success:function(r){
									console.debug(r);
									callback(r);
								},
								error:function(xhr, textStatus, errorThrown){
									console.debug(arguments);
								},
								complete:function(){
									console.debug("complete",arguments);
								}
							});
						}
						
						_.me = function(callback){
							_.callNative("session/me",null,callback);
						};
						_.currentSession = function(callback){
							_.callNative("session/current",{referer:document.location.toString()},callback);
						};
						_.sessionLockWithPin = function(pin,callback){
							_.callNative("session/lockWithPin/"+pin,null,callback);
						};
						_.sessionGetLockPin = function(callback){
							_.callNative("session/getLockPin",null,callback);
						};
						
						_.browserWindowOpen = function(url){
							if (url.indexOf("/")==0){
								var port = document.location.port ? ":"+document.location.port:"";
								url = document.location.protocol+"//"+document.location.host+port+url;
							}
							_.callNative("browser/windowOpen",{url:url},function(){});
						};
						_.browserSetImageLinks = function(imageLinks){
							//alert(JSON.stringify(imageLinks));
							_.callOwner("browser/setImageLinks",{payload:{images:imageLinks}},function(){});
				//			_.callNative("browser/setImageLinks",{payload:JSON.stringify({images:imageLinks})},function(){});
						}
						_.browserShowImagesBrowser = function(imageLinks){
							_.callNative("browser/showImagesBrowser",{payload:JSON.stringify({images:imageLinks})},function(){});
						}
						_.appActivityStart = function(msg){
							_.callNative("app/activityStart",{msg:msg},function(){});
						};
						_.appActivityStop = function(){
							_.callNative("app/activityStop",null,function(){});
						};
						
						_.disableAdBanner = function(){
							_.callOwner('browser/disableAdBanner',{});
						};
						_.enableAdBanner = function(){
							_.callOwner('browser/enableAdBanner',{});
						};
						_.init = function(){
							return _;
						}
						return _;
					})().init();
				});
				// FB
				ow_define("FB",["jQuery","Bridge"],function($,Bridge){
					function FB(session){
						this.cache={};
						this.session=session;

						this.graphGet = function(path,data,callback,error){
							data['access_token']=this.session['accessToken'];
							Bridge.appActivityStart("Connecting to Facebook");
							$.ajax({	
								url:"https://graph.facebook.com/"+path,
								dataType:"jsonp",
								data:data,
								success:function(r){
									Bridge.appActivityStop();
									console.debug(r);
									callback(r);
								},
								error:function(xhr, textStatus, errorThrown){
									Bridge.appActivityStop();
									console.debug(arguments);
									if (error)
										error(xhr,textStatus,errorThrown);
								},
								complete:function(){
									console.debug("complete",arguments);
								}
							});
						}
						this.loadPage = function(url){
							if (typeof(window['require'])!="undefined"){
								var pageController = window.require("MPageController");
								if (pageController){
									pageController.loadPage(url);
								}
							}
						}
						this.override = function(module,name,impl){
							window.requireLazy([module],function(m){
								console.debug("found module ",module,m);
								m["__ow__"+name]=m[name];
								m[name]=function(){return impl(m,m["__ow__"+name]).apply(m,arguments);};
							});
						}
						this.requireLazy = function(module,then){
							window.requireLazy([module],function(m){then(m);});
						}
						this.require = function(module){
							if (typeof(window["require"])!="undefined")
								return window.require(module);
							else return null;
						}
					};
					return FB;
				});
			}
			
			window.__ow_ts_1=new Date().getTime();
			console.debug("jq loaded: "+(__ow_ts_1-__ow_ts_0));
			var $ = ow_jQuery;
				try{
					window.UIFeaturesModules={
						//"FB":{name:"fb",js:"fb.js"},
						//"jQuery":{name:"jquery",js:"jquery_wrapper.js"},
						//"Bridge":{name:"bridge",js:"bridge.js"},
						"main":{name:"main",js:"main.js"}//,
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
					
					//#import{settings}
					//#import{loaderfw}
					
					__ow__startloadedfw( inlinedDefines );
				}catch(e){
					alert(e);
				}
		};
		//#import{jquery}
		ow_init();
	})();
}

