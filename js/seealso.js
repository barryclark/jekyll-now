function addSeeAlsos(posts) {
	posts.sort(function(){return Math.random() - 0.5;});
	  
	for(var i = 0; i < Math.min(posts.length, 3); i++) {
		post = posts[i];
	
		var heading = ';
		heading = heading + ;
		heading = heading + post.title + "</a></h3>";
		
		$("#see-also").append('<h3><a href="' + post.url + '>' + post.title + "</a></h3>");
		$("#see-also").append('<div class="excerpt">' + post.excerpt + "</div>");
  } 
	
}