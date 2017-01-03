---
layout: post
title: 'Up and running'
published: true
date: 2017-1-1
categories: ['welcome']
tags: ['blog']
comments: true
---

Hi there! This is my first post for my personal webpage. Stay tuned to see more of them comming.

Let's start with an incredible drawing of Akira. Why? Because Akira is awesome, that's why. 
For those that might not know Akira, here they have a [FAQ about the manga](http://www.akira2019.com/faq.htm) [SPOILERS], and I highly recomend reading it, aside from watching the animated movie. 

![Akira](https://web.archive.org/web/20170102191539/https://s-media-cache-ak0.pinimg.com/736x/ba/31/ff/ba31ffd27aab729cbc798b086b8d7c88.jpg)

As mentioned in the Meta subsection of this website's About, this website is based on the Jekyll/GitHub static site generator. Getting everything installed, setting up the repository and so on has been a pain in the ass since this is my first time using such tools. Specially the customization of the homepage to include the surrealist picture.
The main tutorials I've used have been the following:

- [Jekyll Now](https://web.archive.org/web/20161023095403/https://github.com/barryclark/jekyll-now)
- [How to Create a Blog with Jekyll – A Beginner’s Guide](https://web.archive.org/web/20161009163358/http://www.hongkiat.com/blog/blog-with-jekyll/)
- [Build A Blog With Jekyll And GitHub Pages](https://web.archive.org/web/20160428224112/https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)
- [Building a static website with Jekyll and GitHub Pages](https://web.archive.org/web/20170102230002/http://programminghistorian.org/lessons/building-static-sites-with-jekyll-github-pages)
- [Getting Started with Markdown](https://web.archive.org/web/20161031034559/http://programminghistorian.org/lessons/getting-started-with-markdown)
- [kmarkdown Syntax](https://web.archive.org/web/20160510030312/http://kramdown.gettalong.org/syntax.html)
- [BLOGGING WITH RMARKDOWN, KNITR, AND JEKYLL](https://web.archive.org/web/20151226204414/http://brendanrocks.com/blogging-with-rmarkdown-knitr-jekyll/)
- [How to add other themes for Jekyll Now?](https://web.archive.org/web/20170102230242/https://stackoverflow.com/questions/41406532/how-to-add-other-themes-for-jekyll-now)
- [Jekyll Series](https://web.archive.org/web/20160422234720/http://digitaldrummerj.me/blogging-on-github-part-1-Getting-Started/); best one for begginers I've seen.

{% if page.comments %}
<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//llucpuigcodina-github-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
{% endif %}