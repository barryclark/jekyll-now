var social = {
  shareToFacebook: function(url) {
    FB.ui({
        method: 'share',
        href: url
      }, function(response){});
  }
}
