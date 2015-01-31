require(["Bridge","Tiles","jQuery"],function(Bridge,Tiles,$){

	
	var Main = (function(){
		var _={};
		
		_.updateStoredSessions = function(sessions){
			var html=[];
			sessions.forEach(function(session){
				console.debug(session);
				
				html.push('<div class="sessionBtn tile" data-fbUserId="'+session.id+'" style="background-image:url(https://graph.facebook.com/'+session.id+'/picture)"></div>');
				
			});
			html.push('<div class="sessionBtn tile" data-fbUserId="">Sign-in</div> ')
			$(".sessions").html(html.join(""));
		};
		
		
		
		
		
		_.init = function(){
			$("#bodywrapper").append('<div class="sessions"></div>');
		
			$("body").on("tap",".sessionBtn",function(){
				Bridge.loadSession($(this).attr("data-fbUserId"));
			});
			$("body").on("longPress",".sessionBtn",function(){
				Bridge.phoneVibrate();
//				$("#bodywrapper").append('<div>Long press on '+$(this).attr("data-fbUserId")+'!!!</div>');
			});
			
			Bridge.refreshStoredSessions = function(){
				Bridge.storedSessions(function(r){
					_.updateStoredSessions(r);
				});
			};
			Bridge.storedSessions(function(r){
				_.updateStoredSessions(r);
			});
		
			return _;
		}
		return _;
	})().init();
	
	
});