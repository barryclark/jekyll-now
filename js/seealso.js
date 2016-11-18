function addSeeAlsos(posts) {
	posts.sort(function(){return Math.random() - 0.5;});

	for(var i = 0; i < Math.min(posts.length, 3); i++) {
		post = posts[i];
		
		var text = "<a href='" + post.url + "'><div class='related-post'>";
		
		text = text + "<div class='date'>" + post.date + "</div>";
		
		if(typeof post.image !== 'undefined') {
		   text = text + "<div><img src='" + post.image + "' /></div>";
	   	}
		
		text = text + "<h3>" + post.title + "</h3>";		
		
		if(typeof post.image == 'undefined') {
			text = text + '<div class="excerpt">' + post.excerpt + "</div>";
		}
		
		text = text + "</div></a>";

		$("#see-also").append(text);
  }
}
