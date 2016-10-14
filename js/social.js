var social = {
	facebook: {
		share: function(url) {
			FB.ui({
				method: 'share',
				href: url
		  	}, function(response){});
		},
		count: function(url, callback) {
			$.get("https://graph.facebook.com/",{id: url},function(data, status){
				callback(data.share);
			});
		}
	},
	reddit: {
		process: function(domain, callback) {
			$.get("https://api.reddit.com/domain/" + domain,function(data, status){
				var results = data.data.children;				
				var array = new Array();
				
				for(var i = 0; i < results.length; i++) {
					var url = results[i].data.url;
					var score = results[i].data.score;
					
					var old = array.find(function(v){return v.url === url});
					
					if(typeof old === "undefined") {					
						var value = {
							url: url,
							score: score,
							count: 1
						};

						array.push(value);
					} else {
						old.score = old.score + score;
						old.count = old.count + 1;
					}
				}
								
				callback({
					items: array,
					count: array.reduce(function(total,current){return total + current.count;},0),
					score: array.reduce(function(total,current){return total + current.score;},0),
					find: function(url) {
						return items.find(function(item){return item.url === url})
					}
				});					
			});
		}
	}
}

function intToString(integer) {
	if(isNaN(integer) || integer <= 0) {
		return "";
	} else if(integer < 1000) {
		return integer;
	} else if(integer < 1000000) {
	    return Math.round(integer / 1000) + "k";
	} else {
		return Math.round(integer / 1000000) + "m";
	}
}
