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
I looked into several blogs, GitHub source code, Stackflow for the solution.  Fortunately there is a work around.

Here are the steps to add tag in every post and generate tag page:

**Add** *tags.html* **page in root directory:** 

Get the tag name for every tag on the site and set them to the `site_tags` variable:
<pre><code>
    {% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}
    {% endfor %}{% endcapture %}
</pre></code>

`tag_words` is a sorted array of the tag names:
<pre><code>
    {% assign tag_words = site_tags | split:',' | sort %}
</pre></code>


**Edit** *CSS*: I choose [Wouter Beeftink's CSS style](http://codepen.io/wbeeftink/pen/dIaDH).

**Edit** *post.html* :

<pre><code>
    <ul class="tags">
    {% for tag in page.tags %}
        <li><a href="/tags#{{ tag }}" class="tag">{{ tag }}</a></li>
    {% endfor %}
    </ul>
</pre></code>

**Add tag to post:** This tag variable inside each post's YAML Front matter.

<pre><code>
    tags: 
    - Jekyll with GitHub
</pre></code>


