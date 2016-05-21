---
layout: post
title: How to add Tags in GitHub's Jekyll without Plugin
tags:
- Jekyll plugin
- Tags
- Markdown
- CSS
- YAML
- GitHub
published: true
---

I am using Jekyll that hosted in GitHub for blogging. I immediately love Jekyll as soon as I created my first blog with it.
It is so simple yet provide pretty much most of the features I need for technical project blogging. But as I moved further I 
found that GitHub disable plugin when creating blog with Jekyll.

### Problem 
It's common to have a tag or archive page on a blog that display all tags and associate tag with post pages. However for some
reason this page is not automatically generated in Jekyll. 

### Solution
I looked into several blogs, GitHub source codea poked into Stackflow for the solution.  Fortunately there is a work around.
Here are the steps to add tag in every post and generate tag page:

1. Add *tags.html* page in root directory: This page displays tag names for every tag on the site in sorted order. Every tag name is hyperlinked to the site which contains of the tag name. 

```
{% raw %}
---
layout: page
title: Tags
description: Maggie Choy blog's tags. List of articles and posts by tags.
---

<!-- Get the tag name for every tag on the site and set them
to the `site_tags` variable. -->
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

<!-- `tag_words` is a sorted array of the tag names. -->
{% assign tag_words = site_tags | split:',' | sort %}

<!-- Build the Page -->

<!-- List of all tags -->
<ul class="tags">
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
    <li>
      <a href="#{{ this_word | cgi_escape }}" class="tag">{{ this_word }}
        <span>({{ site.tags[this_word].size }})</span>
      </a>
    </li>
  {% endunless %}{% endfor %}
</ul>

<!-- Posts by Tag -->
<div>
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
    <h2 id="{{ this_word | cgi_escape }}">{{ this_word }}</h2>
    {% for post in site.tags[this_word] %}{% if post.title != null %}
      <div>
        <span style="float: left;">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </span>
        <span style="float: right;">
          {{ post.date | date_to_string }}
        </span>
      </div>
      <div style="clear: both;"></div>
    {% endif %}{% endfor %}
  {% endunless %}{% endfor %}
</div>
{% endraw %}

```

2. Edit *CSS*: I choose [Wouter Beeftink's CSS style](http://codepen.io/wbeeftink/pen/dIaDH).

3. Edit *post.html* : Add this code to *post.html*. This piece of code lists tags name in every tag on the site and hyperlinks tags name on the site to tags page.

```
  {% raw %}
    <ul class="tags">
      {% for tag in page.tags %}
    <li><a href="/tags#{{ tag }}" class="tag">{{ tag }}</a></li>
  {% endfor %}
</ul>
  {% endraw %}
```

4. Add tag to post: This tag variable inside each post's *YAML Front matter*.

```
{% raw %}
  tags:
  - Web Scraping
  - Scrapy
  - Python
  - JSON
{% endraw %}
```

5. Build the project. Jekyll in Github does not require explicitly build. One push commit changes would trigger page build. 
You should be able to see newly added tag.html page at: http://www.your_site.com/tags
Tags page of my blog is here (http://www.maggie98choy.com/tags/)



