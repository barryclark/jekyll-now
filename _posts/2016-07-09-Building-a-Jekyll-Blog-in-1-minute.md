---
layout: post
title:
---
Today I want to share the wonders of Jekyll, the gem this website is built on.  

Jekyll is a Ruby gem that generates a blog-aware static site. Very simple and easy to throw up with github-pages. Very slick and shares navigation and layout across multiple pages.
<h2>Installing Jekyll</h2>
Install it by doing  
{% highlight ruby %}
gem install Jekyll
{% endhighlight %}
This installs the gem and allows you to run  
{% highlight ruby %}
jekyll new your_blog_name
{% endhighlight %}
 to generate the project with Jekyll files already configured and ready to go.
<h2> Running Jekyll locally</h2>
In your terminal run {% highlight ruby %}
jekyll serve
{% endhighlight %}
 to start the local jekyll server. __Boom, you're riding Jekyll__. You can view it under `localhost:4000` in your browser.
<h2> Making posts and configuration</h2>
To make posts create a new file in the _posts folder and use this funky format `YYYY-MM-DD-Hella-Cool-title.md` for each post. Your `_config.yml` file will contain all the text you need to change so it doesn't look like you just generated a brand new jekyll blog.
<h2>Hosting to Github Pages</h2>
Fortunately this is the most tedious part of getting setup. Check out the [documentation](https://jekyllrb.com/docs/github-pages/).
  
For a much more comprehensive experience checkout the [official docs](https://jekyllrb.com/docs/home/).  
