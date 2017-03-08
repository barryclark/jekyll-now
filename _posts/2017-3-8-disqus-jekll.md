---
layout: post
title: Add Comments for Jekyll with Disqus
date: 2017-3-8 17:03:33
---

**Jekyll** is a static site generator that's perfect for GitHub hosted blogs. Get it from [Github](https://github.com/barryclark/jekyll-now)

To setup a blog and host it in github is a good idea. You don't need to worry about the deployment server or database, there is no server side code, evertying is static. And you can use your favourite markdown supported editor to write a post, that can save us a lot of time on eidting our post. 

### How to add comments functionality into jekyll

This post is to domenstrate how to add disqus into jekyII. I have done it recently, it turns out to be super easy than I thought.

- Make sure you have an account in [disqus](https://disqus.com/), if not, please register a new one. 
- Configure Disqus for your site, remember your website's short name.
![config](https://huangzhenhong.github.io/images/config-disqus.png)
- go to your jekyll project, edit _config.yml file, add the shortname(please make sure it is exact same with the shortname in Disqus configuration)
```
    disqus: 
        huangzhenhong
```
- Go to folder _includes and edit disqus.html, make sure following script is there.

```
{% if site.disqus %}
<div class="comments">
	<div id="disqus_thread"></div>
	<script type="text/javascript">
	    var disqus_shortname = '{{ site.disqus }}';
	    (function() {
	        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();
	</script>
	<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
{% endif %}
```

Now you are all set, you should be able to see the same comments block as mine. 

**Note: please don't directly use my shortname in your website**
