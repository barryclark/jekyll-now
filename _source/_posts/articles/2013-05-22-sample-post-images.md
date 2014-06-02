---
layout: article
title: "A Post with Images"
categories: articles
excerpt: "Examples and code for displaying images in posts."
tags: [sample, images, test]
---

Here are some examples of what a post with images might look like. If you want to display two or three images next to each other responsively use `figure` with the appropriate `class`. Each instance of `figure` is auto-numbered and displayed in the caption.

## Figures (for images or video)

### One Up

<figure>
	<a href="http://placehold.it/900x450.gif"><img src="http://placehold.it/900x450.gif"></a>
	<figcaption>Image caption.</figcaption>
</figure>

### Two Up

Apply the `half` class like so to display two images side by side that share the same caption.

{% highlight html %}
<figure class="half">
	<img src="{{ site.url }}/images/image-filename-1.jpg">
	<img src="{{ site.url }}/images/image-filename-2.jpg">
	<figcaption>Caption describing these two images.</figcaption>
</figure>
{% endhighlight %}

And you'll get something that looks like this:

<figure class="half">
	<a href="http://placehold.it/1200x600.gif"><img src="http://placehold.it/900x450.gif"></a>
	<a href="http://placehold.it/1200x600.gif"><img src="http://placehold.it/900x450.gif"></a>
	<figcaption>Two images.</figcaption>
</figure>

### Three Up

Apply the `third` class like so to display three images side by side that share the same caption.

{% highlight html %}
<figure class="third">
	<img src="{{ site.url }}/images/image-filename-1.jpg">
	<img src="{{ site.url }}/images/image-filename-2.jpg">
	<img src="{{ site.url }}/images/image-filename-3.jpg">
	<figcaption>Caption describing these three images.</figcaption>
</figure>
{% endhighlight %}

And you'll get something that looks like this:

<figure class="third">
	<img src="http://placehold.it/900x450.gif">
	<img src="http://placehold.it/900x450.gif">
	<img src="http://placehold.it/900x450.gif">
	<figcaption>Three images.</figcaption>
</figure>

Testing images with links to larger images:

<figure class="third">
	<a href="http://placehold.it/1200x600.gif"><img src="http://placehold.it/900x450.gif"></a>
	<a href="http://placehold.it/1200x600.gif"><img src="http://placehold.it/900x450.gif"></a>
	<a href="http://placehold.it/1200x600.gif"><img src="http://placehold.it/900x450.gif"></a>
	<figcaption>Three linked images.</figcaption>
</figure>