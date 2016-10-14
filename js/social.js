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

$( document ).ready(function() {
	social.facebook.count("{{ url | uri_escape }}", function(count) {
		$(".share.facebook .count").append(intToString(count.share_count));
	});
});
