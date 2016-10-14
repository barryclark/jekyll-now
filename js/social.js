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
		domainJson: null,
		setDomainJson: function(domain) {
			$.get("https://api.reddit.com/domain/",{id: domain},function(data, status){
				domainJson = data;
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
