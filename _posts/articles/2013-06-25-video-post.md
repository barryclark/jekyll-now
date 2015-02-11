---
layout: post
title: "A Post with a Video"
excerpt: "Custom written post descriptions are the way to go... if you're not lazy."
categories: articles
tags: [sample-post, video]
comments: true
share: true
---

<iframe width="560" height="315" src="//www.youtube.com/embed/pdSp4Y4GOQs" frameborder="0"> </iframe>

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
{% endhighlight %}

And here's a Vimeo embed for testing purposes.

<iframe src="//player.vimeo.com/video/98146708?title=0&amp;byline=0" width="500" height="281" frameborder="0"> </iframe>