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
		count: function(domain) {
			$.get("https://api.reddit.com/domain/" + domain,function(data, status){
				var results = data.data.children;
				results.sort(function(a, b){return a.data.url.localeCompare(b.data.url)});
				
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
					
			});
		}
	}
}

function intToString(integer) {
	if(integer === 0) {
		return "";
	} else if(integer < 1000) {
		return integer;
	} else if(integer < 1000000) {
	    return Math.round(integer / 1000) + "k";
	} else {
		return Math.round(integer / 1000000) + "m";
	}
}
