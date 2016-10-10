var social = {
	facebook: {
		share: function(url) {
			FB.ui({
				method: 'share',
				href: url
		  	}, function(response){});
		},
		count: function(url, callback) {
			var ajax = $.get("https://graph.facebook.com/",{id: url},function(data, status){
				callback(data.share);
			});
		}
	}
}
