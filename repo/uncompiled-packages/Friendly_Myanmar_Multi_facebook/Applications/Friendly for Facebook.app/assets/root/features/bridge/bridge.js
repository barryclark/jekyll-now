define("Bridge",["jQuery"],function($){
	var Bridge = (function(){
		var _={};

		_.callNative = function(fn,data,callback){
			$.ajax({	
				url:"bridge://"+fn+"/",
				dataType:"json",
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


		_.storedSessions = function(callback){
			_.callNative("session/storedSessions",null,callback);
		};

		_.loadSession = function(sessionId,callback){
			if (sessionId)
				_.callNative("session/load/"+sessionId,null,callback);
			else
				_.callNative("session/new",null,callback);
		};

		_.sessionLockWithPin = function(pin,callback){
			_.callNative("session/lockWithPin/"+pin,null,callback);
		};
		_.sessionGetLockPin = function(callback){
			_.callNative("session/getLockPin",null,callback);
		};

		_.phoneVibrate = function(){
			_.callNative("phone/vibrate",null,function(){});
		};

		
		_.init = function(){
			window.Bridge_refreshStoredSessions = function(){ _.refreshStoredSessions();};
			return _;
		}
		return _;
	})().init();
	
	return Bridge;
});