ow_require(["jQuery","Bridge","FB"],
	function($,Bridge,FB){


	var OWChannelTracker = (function(){
		var _ = {};
	
		_.handler = function(msg){
			console.debug("message : ",this,arguments);
			Bridge.callNative("channel",msg,function(){});
		};
		_.init = function(stateMachine){
			try{
				_.stateMachine=stateMachine;
				stateMachine.addListener(stateMachine.CHANNEL_MESSAGE,_.handler);
			} catch(ex){
				console.debug(ex);
			}
		}
		return _;
	})();



	var SkinModifier = (function(){
		var _ = {};

		_.applySkin = function(skin){
			// skin = {'baseColor':"#aaaaaa",'darkColor':"#bbbbbb"}
			var newSkin = '\
body.touch {border-top: 1px solid {baseColor}}\
\
div[data-sigil="MTopBlueBarHeader"] {\
	background:{baseColor} !important;\
    -webkit-box-shadow:none !important;\
}\
body.touch {\
    border-color:{darkColor} !important;\
}\
\
#requests_jewel>a {\
opacity:0.5\
}\
\
.touch .btnI.bgb {\
border-color:{darkColor} {darkColor} {darkColor};\
background: -webkit-linear-gradient({baseColor}, {darkColor});\
}\
			'.replace(/{baseColor}/g,skin.baseColor).replace(/{darkColor}/g,skin.darkColor);
			var styleElement = $("#friendlyCustomSkin");
			if (styleElement.size()==0){
				styleElement= $("<style id='friendlyCustomSkin'></style>").appendTo("body");
			}
			styleElement.text(newSkin);
		};

		return _;
	})();


	function MenuController(element){
		this.element = element;
		this.element.data("menuController",this);
		
	};
	var Main = (function(){
		var _ = {chathead:null,menuContainer:null,session:null,FB:null,Birthdays:null,Options:null,Links:null,Home:null};
		_.findMediaImage = function(a){
			// fb images are in i.img elements within css background-image attribute
			var imgDef = a.data("ow_imgDef");
			//console.debug("already found img def : ",imgDef);
			if (imgDef) return imgDef;

			var i = $("div > i.img",a);
			if (i.size()==0){
				// let's try directly inside
				i = $("i.img:first-child",a);
				console.debug("could not find directly in div>i.img");
			}
			if (i.size()>0){
				var bgimage = i.css("background-image");
				if (bgimage.indexOf("url(")==0){
					/*var offset = i.offset();
					var scroll = {top:$(window).scrollTop(),left:$(window).scrollLeft()};
					*/
					var inlineURL = bgimage.substring(4,bgimage.length-1);
					url = inlineURL.replace(/(v\/)?(t[0-9]+\.[0-9]+-[0-9]+\/)?(c[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\/)?(s[0-9]+x[0-9]+\/)?(p[0-9]+x[0-9]+\/)?/g,"").replace(/_[ats]\.jpg$/,"_n.jpg").replace(/_[ats]\.png$/,"_n.png");
					imgDef = {
						//x:offset.left-scroll.left,
						//y:offset.top-scroll.top,
						//width:i.width(),
						//height:i.height(),
						url:url,
						inlineURL:inlineURL,
						detailURL:a.attr("href")
					};
					a.data("ow_imgDef",imgDef);
					a.data("ow_imgElem",i);
				}
			} else {
				console.debug("i.img not found");
			}
			return  imgDef;
		};
		_.touchstartedInImage = false;
		_.touchstartedInImageTimestamp = 0;
		_.overrideImagesTap = function(){
			$("html").on("touchstart","a.ow_hasImageDef",function(e){
//            $("html").on("touchstart","article a[href*='/photos/a.']:not(.touchable),#m_stream_stories a[href*='/photos/a.']:not(.touchable),a[href*='/photos/pb.']:not(.touchable),a[href*='/photos/ms.']:not(.touchable),a[href^='#!/photo.php?']:not(.touchable),a[href^='/photo.php?']:not(.touchable),a.square_thumbnail[href^='/photo.php?']:not(.touchable)",function(e){
				var a = $(this);
				var img = _.findMediaImage(a);
				if (img){
					// update offset...
					var imgElem = a.data("ow_imgElem");
					var offset = imgElem.offset();
					var scroll = {top:$(window).scrollTop(),left:$(window).scrollLeft()};
					img.x = offset.left-scroll.left+2;
					img.y = offset.top-scroll.top+2;
					img.width = imgElem.width()-4;
					img.height = imgElem.height()-4;
					_.touchstartedInImage = {img:img,href:a.attr('href')};
					_.touchstartedInImageTimestamp = (new Date()).getTime();
				}
			});
			/*
			$("html").on("click","article a[href*='/photos/a.']:not(.touchable),#m_stream_stories a[href*='/photos/a.']:not(.touchable),a[href*='/photos/pb.']:not(.touchable),a[href*='/photos/ms.']:not(.touchable),a[href^='#!/photo.php?']:not(.touchable),a[href^='/photo.php?']:not(.touchable),a.square_thumbnail[href^='/photo.php?']:not(.touchable)",function(e){
				var a = $(this);
				var img = _.findMediaImage(a);
				if (img){
					e.preventDefault();
					return false;
				}
			});
			*/
		};

		_.uriDictionary = function(uri){
			if (uri.indexOf("?")>0 && uri.indexOf("?")<uri.length-1){
				var q = uri.substring(uri.indexOf("?")+1);
				return _.queryDictionary(q);
			}
			return {};
		};

		_.queryDictionary = function(query){
			var d = {};
			var mappings = query.split("&");
			mappings.forEach(function(mapping){
				var keyval = mapping.split("=");
				var k = keyval[0];
				var v = null;
				if (keyval.length>1){
					v = decodeURIComponent(keyval[1]);
				}
				if (v){
					d[k]=v;
				}
			});
			console.debug(query,d);
			return d;
		}
		_.findArticleURL = function(article){
			var link = article.find('a[href*="facebook.com/l.php?u="]');
			if (link.size()>0){
				console.debug(link);
				console.debug(link.attr("href"));
				var d = _.uriDictionary(link.attr("href"));
				if (d["u"]){
					return d["u"];
				} 
			}
			return null;
		};
		_.findArticleForShareId = function(shareId){
			var shareBtn = $('a[data-store^="{\"share_id\":'+shareId+'"]');
			if (shareBtn.size()>0){
				var article = shareBtn.parents("article");
				if (article.size()>0){
					console.debug(article);
					var link = article.find('a[href^="http://m.facebook.com/l.php?u="]');
					if (link.size()>0){
						console.debug(link);
						console.debug(link.attr("href"));
						var d = _.uriDictionary(link.attr("href"));
						if (d["u"]){
							return d["u"];
						} 
					}
				}
			}
			return null;
		};

		_.bugFixing = function(){
			// START BUGFIX
			// bugfix on ipad the sort button does not work (since 09/26/2013)
			$("body").on("touchstart",".actionSheet > a:first-child",function(){
				var btn = $(this);
					console.debug("fix for fb messup ?");
				if (!btn.attr("aria-haspopup")){
					// this button needs to be fixed
					console.debug("fix for fb messup !");
					event.preventDefault();
					btn.parent().find(".flyout").toggleClass("popover_hidden");

				}
				return false;
			});
			// END BUGFIX
		}

		_.isPhotoDetailURL = function(url){
			return (url.indexOf("/photo.php?")==0) || (url.indexOf("/photos/a.") > 0) || (url.indexOf("/photos/pb.") > 0) || (url.indexOf("/photos/ms.") > 0);
		}

		_.startFB = function(){
			_.bugFixing();
			_.overrideImagesTap();
			try{
				_.FB.override("MRequestGateway","send",function(gateway,originalFunction){
					return function(request){
						var uri = request.getURI();
						var method = request.getMethod();
						//console.debug(method,uri,request);
						request.listen("done",function(){
							console.debug(method+" "+uri+" -> ",arguments);
						});
						return originalFunction.apply(gateway,arguments);
					};
				});
				_.FB.override("MModalDialog","open",function(modalDialog,originalFunction){
					return function(){
						console.debug("overriden modal dialog open ",modalDialog,arguments);
						try {
							if (arguments.length>0){
								var p = arguments[0];
								if (p.indexOf("/sharer-dialog.php")==0){
									console.debug("Share via feed!");
									Bridge.callOwner("analytics/trackShareOnFacebookFromStream",{url:p},function(){});
									/*
									TODO: need more testing
									if (p.indexOf("?")>0){
										var query = p.substring(p.indexOf("?")+1);
										console.debug("query ",query);
										var d = _.queryDictionary(query);
										console.debug("dict : ",d);
										var shareId = d["sid"];
										if (shareId){
											var href = _.findArticleForShareId(shareId);
											if (href){
												console.debug("Found article to share ! : ",href);
												Bridge.callOwner("browser/shareURL",{url:href},function(){});
												return;
											}
										}
									}*/
								}
							}
						}catch(ex){
							console.debug(ex);
						} 
						return originalFunction.apply(modalDialog,arguments);
					};
				});
				_.FB.override("MPageController","loadPage",function(pageController,originalFunction){
					return function(){ 
						console.debug("overriden loadPage with",arguments);
						if (_.isPhotoDetailURL(arguments[0])){
							if (_.touchstartedInImage){
								if (arguments[0].indexOf("http")<0){
									_.touchstartedInImage.img.detailURL = "https://m.facebook.com"+arguments[0];
								} else {
									_.touchstartedInImage.img.detailURL = arguments[0];
								}
								Bridge.callOwner("browser/zoomImage",_.touchstartedInImage.img,function(){});
								_.touchstartedInImage = null;
								return false;
							}
						}
						try {
							var renderedPath = pageController.getRenderedPath();
							if ((renderedPath.indexOf("/photo.php?")==0) && (arguments[0].indexOf("/photo.php?")==0)){
								return originalFunction.apply(pageController,arguments);
							}
						}catch(ex){
							console.debug(ex);
						}
						if (arguments[0].indexOf("/logout.php")<0 && arguments[0].indexOf("/home.php")!=0 && arguments[0].indexOf("facebook.com/l.php?")<0) {
							Bridge.browserWindowOpen(arguments[0]); 
						} else {
							return originalFunction.apply(pageController,arguments);
						} 
					};
				});
				_.FB.override("MPageController","load",function(pageController,originalFunction){
					return function(){ 
						console.debug("overriden load with",arguments);
						if (_.isPhotoDetailURL(arguments[0])){
							var delay = (new Date()).getTime() - _.touchstartedInImageTimestamp;
							if (_.touchstartedInImage && delay <= 1000){
								if (arguments[0].indexOf("http")<0){
									_.touchstartedInImage.img.detailURL = "https://m.facebook.com"+arguments[0];
								} else {
									_.touchstartedInImage.img.detailURL = arguments[0];
								}
								Bridge.callOwner("browser/zoomImage",_.touchstartedInImage.img,function(){});
								_.touchstartedInImage = null;
								return false;
							} else {
								_.touchstartedInImage = null;
							}
						}
						try {
							var renderedPath = pageController.getRenderedPath();
							if ((renderedPath.indexOf("/photo.php?")==0) && (arguments[0].indexOf("/photo.php?")==0)){
								return originalFunction.apply(pageController,arguments);
							} else if ((renderedPath.indexOf("/messages/read")==0) && (arguments[0].indexOf("/messages/action_redirect")==0)){
								return originalFunction.apply(pageController,arguments);
							}
						}catch(ex){
							console.debug(ex);
						}
						if (arguments[0].indexOf("/logout.php")<0 && arguments[0].indexOf("/home.php")!=0 && arguments[0].indexOf("facebook.com/l.php?")<0){
							Bridge.browserWindowOpen(arguments[0]); 
						} else {
							return originalFunction.apply(pageController,arguments);
						} 
					};
				});
				// listen to Channel for new messages / notifications / requests ... etc
				_.FB.requireLazy(["MChannelManager"],function(channelManager){
					OWChannelTracker.init(channelManager);
				});
				_.FB.requireLazy("Stratcom",function(Stratcom){

					/* BEGIN Disable inline comments */
					Stratcom.__ow_listen = Stratcom.listen;
					Stratcom.listen = function(n,o,p){
						//console.debug("listen on ",arguments);
						if (n=='click' && o=='feed-ufi-trigger'){
							return null;
						} else {
							return Stratcom.__ow_listen(n,o,p);
						}
					};
					/*
					// Removed because it breaks friends requests
					Stratcom.__ow_listenCapture = Stratcom.listenCapture;
					Stratcom.listenCapture = function(){
						//console.debug("listen capture on ",arguments);
						if (n=='click' && o=='feed-ufi-trigger'){
							return null;
						} else {
							return Stratcom.__ow_listenCapture(n,o,p);
						}
					};
					*/
					// remove existing listeners
					if (Stratcom["_targets"] && Stratcom._targets["click"] && Stratcom._targets.click["feed-ufi-trigger"]){
						//console.debug(">>>>>>>>>>",Stratcom._targets.click["feed-ufi-trigger"]);
						Stratcom._targets.click["feed-ufi-trigger"]= [];
					}
					/* END Disable inline comments */

				});
			}catch(ex){
				// probably not on fb page
				console.debug(ex);
			}	
		}

		_.findImageDefs = function(){
			try{
				ow_jQuery("article a[href*='/photos/a.']:not(.ow_imageDefsScanned):not(.touchable),#m_stream_stories a[href*='/photos/a.']:not(.ow_imageDefsScanned):not(.touchable),a[href*='/photos/pb.']:not(.ow_imageDefsScanned):not(.touchable),a[href*='/photos/ms.']:not(.ow_imageDefsScanned):not(.touchable),a[href^='#!/photo.php?']:not(.ow_imageDefsScanned):not(.touchable),a[href^='/photo.php?']:not(.ow_imageDefsScanned):not(.touchable),a.square_thumbnail[href^='/photo.php?']:not(.ow_imageDefsScanned):not(.touchable)").each(
					function(){
						var a = $(this);
						a.addClass("ow_imageDefsScanned");
						var img = _.findMediaImage(a);
						if (img){
							a.addClass("ow_hasImageDef");
	//						a.css({"border":"2px solid red !important"});
	//						_.touchstartedInImage = {img:img,href:a.attr('href')};
	//						_.touchstartedInImageTimestamp = (new Date()).getTime();
						}
				});
			}catch(ex){
				//console.debug(ex);
			}
		}

		_.injectShare = function(){
			ow_jQuery("section > article:not(.ow_sharable)").each(function(){
				var article = ow_jQuery(this);
				article.addClass("ow_sharable");
				var shareLink = article.find("a[href^='/sharer.php']");
				if (shareLink.size()==0){
					// no share button
					var url = _.findArticleURL(article);
					console.debug(url);
					if (url){
						var ufiActions = article.find("div.ufiActions");
						if (ufiActions.size()>0){
							var btn = ow_jQuery('<div class="button equalWidth ow_shareLink">Share</div>');
							btn.attr("ow_url",url);
							ufiActions.first().append(btn);
						}
					}
				}
			});
		}

		_.start=function(session){
			_.session=session;
			_.FB = new FB(session);
			_.startFB();

			ow_jQuery("body").on("click",".ow_shareLink",function(){
				var btn = ow_jQuery(this);
				if (btn && btn.attr("ow_url")){
					Bridge.callOwner("browser/shareURL",{url:btn.attr("ow_url")},function(){});
				}
			});

			if (typeof(window.OW_fbAdsHide)!="undefined"){
				

				var cleanupSection = function(){
					try{
						//_.injectShare();
						_.findImageDefs();
		                ow_jQuery('button[type=submit]:disabled').each(function(){
		                	ow_jQuery(this).removeAttr("disabled");
		                });

		                var checkTimestamp = new Date().getTime();
		                ow_jQuery('#m_newsfeed_stream > article').each(function(){
		                	// remove ppl you may know
		                	var article = ow_jQuery(this);
		                	if (ow_jQuery('footer a[href ^= "/findfriends/browser"]',article).size()>0){
		                		article.remove();
		                	}
		                });
		                ow_jQuery('section.storyStream:not(.ow_cleanedup)').each(function(){
							var section = ow_jQuery(this);
							var ts = section.data("ow_timestamp");
							if (!ts){
								ts = checkTimestamp;
								section.data("ow_timestamp",ts);
							}
							if (section.find("article").size()>0){
								ow_jQuery('article .fbEmuTracking',section).parents('article').remove(); // hide articles with ad trackers
	   		            		ow_jQuery('article .muffin_tracking_pixel_start',section).parents('article').remove();
	        		    		ow_jQuery('article footer a[href ^= "/pages/?"]',section).parents('article').remove();
	        		    	}
							if (checkTimestamp-ts > 1000){
								section.addClass("ow_cleanedup");
							} else {
								// give it more time...
								console.debug("giving more time to : ",section);
							}

							
						});
					}catch(ex){
						//console.debug("Exception in cleanup section",ex);
					}
					setTimeout(function(){ cleanupSection();},500);
				};

				cleanupSection();
				
			}

		};

		_.openGraphData = function(){
			var ogData = {};
			$("head > meta[property^='og:']").each(function(){
				var p = $(this).attr("property");
				var v = $(this).attr("content");
				if (v){
					ogData[p]=v;
				}
			});
			console.debug("ogData:",ogData);
			return ogData;
		};
		_.scrapImages = function(){
			try{
				console.debug("Scrapping images");
				var imageLinks = [];
				$("img").each(function(){
					var img = $(this);
					var src = img.attr("src");
					if (src){
						if (img[0].naturalWidth>=500 && img[0].naturalHeight>=500){
							imageLinks.push(src);
						} else if (src.indexOf("media.tumblr.com/")>0 && src.indexOf(".jpg")){
							src = src.replace(/_[0-9]+\.jpg/,"_500.jpg");
							imageLinks.push(src);
						}
					}
				});
				console.debug("Scrapped images: "+imageLinks.length);
				Bridge.browserSetImageLinks({referer:document.location.toString(),urls:imageLinks,og:_.openGraphData()});
				
			}	catch(ex){
					// probably not on fb page
					console.debug(ex);
				}
		};

		

		
		
		_.init = function(){
			window.__ow_ts_2=new Date().getTime();
			console.debug("main init: "+(__ow_ts_2-__ow_ts_1));
			var lastWindowOpenTS=0;
			window.ow_open = window.open;
			window.open = function(){
				// only do it if lastWindowOpenTS is < to now - 1s 
				var ts = (new Date()).getTime();
				if (ts-lastWindowOpenTS > 500){
					lastWindowOpenTS = ts;
					return window.ow_open.apply(window,arguments);
				} else {
					console.debug("Ignored open window as it's too close from last one");
					return null;
				}
			}
			Bridge.currentSession(function(r){console.debug(r);if (r && r.skin) {/*SkinModifier.applySkin(r.skin);*/}_.start(r);});
			return  _;
		}
		window.FriendlyForFacebook = _;
		return _;
	})().init();
});