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