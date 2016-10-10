var social = {
	appId: '197946313591875',
	uid: null,
	accessToken: null,
	facebook: {
		login: function() {
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
    					this.uid = response.authResponse.userID;
    					this.accessToken = response.authResponse.accessToken;
  				} else if (response.status === 'not_authorized') {
  				} else {
    					// the user isn't logged in to Facebook.
  				}	
			});
		},
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
			FB.api('/' + url + '?access_token=' + this.appId, function(response) {
  				console.log(response);
			});	
		}
	}
}
