var social = {
	facebook: {
		share: function(url) {
			FB.ui({
				method: 'share',
				href: url
		  	}, function(response){});
		},
		count: function(url) {
			var ajax = $.get("https://graph.facebook.com/",{id: url},function(data, status){});
			
			var result = ajax.responseJSON.share;
			
			return result;
		}
	}
}
