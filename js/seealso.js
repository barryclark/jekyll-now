function addSeeAlsos(posts) {
	posts.sort(function(){return Math.random() - 0.5;});

	for(var i = 0; i < Math.min(posts.length, 3); i++) {
		post = posts[i];
		
		var text = "<a href='" + post.url + "'><div class='related-post'>";
		text = text + "<h3>" + post.title + "</h3>";
		text = text + '<div class="excerpt">' + post.excerpt + "</div>";
		text = text + "</div></a>";

		$("#see-also").append(text);
  }
}
