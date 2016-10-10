var social = {
	facebook: {
		share: function(url) {
			FB.ui({
				method: 'share',
				href: url
		  	}, function(response){});
		},
		count: function(url) {
			var result;
			
			var s = $.get("https://graph.facebook.com/",{id: url},function(data, status){
				result = data.share;
			});
			
			return result;
		}
	}
}
