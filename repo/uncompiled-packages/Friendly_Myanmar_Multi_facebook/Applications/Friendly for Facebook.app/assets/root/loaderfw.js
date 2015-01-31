	if(!console.debug){
		console.debug = console.log;
	}
	function __ow__startloadedfw(preloadFn){
//	$(function(){

		/*
		 * UI tools
		 */
		var UIFeatureManager = (function(){
			var _={ready:{},waiting:[],installing:{}};
			_.setBodyScrollable = function(scrollable){
				if (!scrollable)
					$("body").addClass("no-scroll");
				else
					$("body").removeClass("no-scroll");
			}


			_.setNeedsCheckWaitingModules = function(){
				clearTimeout(_.checkTimeout);
				_.checkTimeout = setTimeout(function(){_.checkWaitingModules();},0);
			};

			_.checkWaitingModules = function(){
				_.checking=true;
				console.debug("Checking "+_.waiting.length+" waiting modules");
				_.waiting.forEach(function(waitingModule){
					try{
						var loaded = waitingModule.loaded;
						if (!loaded){
							var files = waitingModule.files;
							var ready = waitingModule.ready;
							var callback = waitingModule.callback;
							if (files.length>ready.length){
								console.debug(["check",files,ready]);
								files.forEach(function(file){
									if (_.ready[file] && ready.indexOf(file)<0){
										ready.push(file)
									}
								});
								console.debug(ready);
								if (files.length==ready.length){
									waitingModule.loaded=true;
									var args=[];
									files.forEach(function(file){
										args.push(_.ready[file]);
									});
									callback.apply(null,args);
								}
							}
						}
					}catch(ex){console.debug(ex);}
				});
				_.checking=false;
			}

			_.setFeatureJSLoaded = function(feature,js){
				try{
					console.debug("Did load js "+feature+"/"+js)
					var n = feature+"/"+js;
					_.ready[n] = true;
					_.setNeedsCheckWaitingModules();
				}catch(ex){console.debug(ex);}
			};
			_.pushWaitingModule = function(w){
				clearTimeout(_.checkTimeout);
				if (!_.checking){
					_.waiting.push(w);
					_.setNeedsCheckWaitingModules();
				} else {
					setTimeout(function(){_.pushWaitingModule(w);},10);
				}
			};
			_.setModulesDefinition = function(def){
				_.modulesDefinition = def;
			}
			_.require = function(files,callback){
				try{
					var missing=[];
					var ready=[];
					files.forEach(function(file){
						if (!_.ready[file]){
							missing.push(file);
						} else {
							ready.push(file)
						}
					});
					if (missing.length==0){
						var args=[];
						files.forEach(function(file){
							args.push(_.ready[file]);
						});
						callback.apply(null,args);
					} else {
						missing.forEach(function(toInstall){
							if (!_.installing[toInstall]){
								_.installing[toInstall]=true;
								var moduleDef = _.modulesDefinition[toInstall];
								if (moduleDef){
									console.debug("Found require ",toInstall," needing install",moduleDef);
									_.installFeature(moduleDef);
								}
							}
						});
						_.pushWaitingModule({callback:callback,files:files,ready:ready});
					}
				}catch(ex){console.debug(ex);}
			}

			_.define = function(name,files,body){
				_.require(files,function(){
					_.ready[name] = body.apply(null,arguments);
					_.setNeedsCheckWaitingModules();
				});
			}
			_.baseURL="./";
			_.installFeature = function(feature){
				var baseURL = _.baseURL;
				console.debug(["install feature : "+JSON.stringify(feature)]);
				var is_touch_device = 'ontouchstart' in window;
				var noCacheExt = is_touch_device?"":'?t='+(new Date().getTime());
				if (feature.css && $("#featureCSS_"+feature.name).size()==0){
					feature.css.split(",").forEach(function(css){
						$("head").append('<link href="'+baseURL+'features/'+feature.name+'/'+css+noCacheExt+'" rel="stylesheet">');
					});

				}
				if (feature.js && $("#featureCSS_"+feature.name).size()==0){
					feature.js.split(",").forEach(function(js){
						$.getScript(baseURL+"features/"+feature.name+"/"+js+noCacheExt,function(script,textStatus){
							try{
								console.debug("loaded "+js);
								_.setFeatureJSLoaded(feature.name,js);
							}catch(ex){console.debug(ex);}
						});
					});
				}
			};

			_.init = function(baseURL,features){
				_.baseURL = baseURL;
				features.forEach(function(feature){
					_.installFeature(feature);
				});
			};

			return _;
		})();
		
		var defreqPrefix = (typeof(UIFeaturesDefrecPrefix)!="undefined")?UIFeaturesDefrecPrefix:"";
		window[defreqPrefix+"define"]=UIFeatureManager.define;
		window[defreqPrefix+"require"]=UIFeatureManager.require;
		var baseURL = (typeof(UIFeaturesBaseURL)!="undefined")?UIFeaturesBaseURL:"./";

		if (preloadFn){
			console.debug("Inlined defines");
			preloadFn();
		}


		UIFeatureManager.init(baseURL,
				[
				/*
				 	{name:"prototypes",js:"prototypes.js"}
				 
				 	{name:"_base",css:"normandy.css"},
				 	{name:"_prototypes",js:"prototypes.js"},
				 	{name:"_json",js:"json.js"}
				 	*/
			    ]);

					if (typeof(UIFeaturesModules)!="undefined"){
						UIFeatureManager.setModulesDefinition(UIFeaturesModules);
					}
					if (typeof(UIFeaturesMain)!="undefined"){
						UIFeatureManager.require([UIFeaturesMain],function(){
							console.debug(["Loading main ",arguments]);
						});
					}
		
//	});
};

