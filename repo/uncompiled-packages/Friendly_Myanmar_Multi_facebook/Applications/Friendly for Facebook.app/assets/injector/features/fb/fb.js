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
