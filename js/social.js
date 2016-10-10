var social = {
	facebook: {
		accessToken: null,
		share: function(url) {
			FB.ui({
				method: 'share',
				href: url
		  	}, function(response){});
		},
		like: function(url) {
			FB.ui({
				method: 'share_open_graph',
				action_type: 'og.likes',
				action_properties: JSON.stringify({
					object: url,
				})
			}, function(response){});
		},
		countLikes: function(url) {
			FB.api('/' + url + '?access_token=' + this.accessToken, function(response) {
  				console.log(response);
			});	
		}
	}
}
