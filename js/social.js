var social = {
	linkedin: {
		callback: function(data) {console.log("data");console.log(data);},
		process: function(url, callback) {
			$.getScript("https://www.linkedin.com/countserv/count/share?url=" + url + "&format=jsonp&callback=social.linkedin.callback", function(response,status) {
				console.log("response");
				console.log(response);
			});
		}
	},
	facebook: {
		process: function(url, callback) {
			$.get("https://graph.facebook.com/",{id: url},function(response, status){
				callback(response.share);
			});
		}
	},
	reddit: {
		process: function(domain, callback) {
			$.get("https://api.reddit.com/domain/" + domain,function(response, status){
				var results = response.data.children;				
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
						return this.items.find(function(item){return item.url === url})
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
