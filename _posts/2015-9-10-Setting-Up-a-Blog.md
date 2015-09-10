---
layout: post
title: Setting Up a Blog
---

When I redid my website, it prompted the need for some sort of place where I could write about things. After some quick searching, I decided to go with [Jekyll](http://jekyllrb.com/), a static site generator that can be installed as a RubyGem.

# Creating my Layouts

As Jekyll describes itself, the engine takes text written in any markup language and sends it through a series of layout files. I currently am using three layout files:

1. **default.html**: A default layout that wraps a page or post in a predefined HTML structure.
2. **page.html**: A template that describes the structure of any page that I create, such as an about page.
3. **post.html**: A template that describes the structure of any post that I create, like this one.

In this post, for example, my default layout centers content within a container and adds my header to the page. It then uses the [Liquid](https://github.com/Shopify/liquid/wiki) templating language to inject the content. My body for the default layout looks like this:

{% highlight html %}
<div class='container'>
  <header>
    <div class='site-info'>
      <h1><a href='{{ site.baseurl }}/'>{{ site.name }}</a></h1>
      <p>{{ site.description }}</p>
    </div>
  </header>
  <section class='content'>
    // Inject content with Liquid here
  </section>
</div>
{% endhighlight %}

The `post.html` file is then rendered in the content section. My `post.html` layout is very simple:

{% highlight html %}
<article class="post">
  <h1 class='post-title'>{{ page.title }}</h1>

  <div class="date">
    Written on {{ page.date | date: "%B %e, %Y" }}
  </div>

  <div class="entry">
    // Inject content with Liquid here
  </div>
</article>
{% endhighlight %}

First there is a title and a date for the post, and then the content of the post itself is injected into the entry div.

In addition to hosting my code, I discovered that GitHub offered a great blogging solution in the form of [Github Pages](https://pages.github.com/).
