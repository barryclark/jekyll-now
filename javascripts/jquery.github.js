jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
}