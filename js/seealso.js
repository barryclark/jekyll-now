function addSeeAlsos(posts) {
	posts.sort(function(){return Math.random() - 0.5;});

	for(var i = 0; i < Math.min(posts.length, 3); i++) {
		post = posts[i];
		
		var text = "<div class='related-post'>";
		text = text + '<h3><a href="' + post.url + '">' + post.title + "</a></h3>";
		text = text + '<div class="excerpt">' + post.excerpt + "</div>";
		text = text + "</div>";

		$("#see-also").append(text);
  }
}
