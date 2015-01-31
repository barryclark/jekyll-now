define("Tiles",["jQuery"],function($){
	return (function(){
		var _={longPressTimeout:0};
		
		_.tileLongPress = function(tile){
			tile.removeClass("touched");
			tile.removeData("touchStartTS");
			//tile.removeData("longPressTimeout");
			setTimeout(function(){
				tile.trigger('longPress');
			},10);
		};
		
		_.tileTouchStart = function(tile){
			clearTimeout(_.longPressTimeout);
			tile.addClass("touched");
			tile.data("touchStartTS",(new Date()).getTime());
			_.longPressTimeout = setTimeout(function(){_.tileLongPress(tile);},1000);
			//this.data("longPressTimeout",longPressTimeout);
		};
		_.tileTouchEnd = function(tile){
			clearTimeout(_.longPressTimeout);
			tile.removeClass("touched");
			var ts = tile.data("touchStartTS");
			tile.removeData("touchStartTS");
			
			var d = (new Date()).getTime()-ts;
			if (d<=250){
				tile.addClass("animated pulse");
				setTimeout(function(){tile.removeClass("animated pulse");},300);
				setTimeout(function(){
					tile.trigger('tap');
				},10);
			}
		};


		_.init = function(){

			$("body").on("touchstart",".tile",function(e){
				_.tileTouchStart($(this));
			});
			$("body").on("touchend touchcancel",".tile",function(e){
				_.tileTouchEnd($(this));
			});



			return _;
		}
		return _;
	})().init();
});