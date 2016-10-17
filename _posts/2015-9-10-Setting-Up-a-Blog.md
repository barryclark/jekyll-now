---
layout: post
title: Setting Up a Blog
header: '/images/tech/jekyll.png'
---

When I re-did my website, I decided to make some sort of blog to go with it. After some quick searching on the different ways to set one up, I decided to go with [Jekyll](http://jekyllrb.com/), a static site generator written in Ruby and that can be installed as a RubyGem.

<!--halt-->

## Choosing a host

One of the first things I did before starting my blog was finding a place to host it. I first considered getting a
box from DigitalOcean like I have with a couple of my past projects, but I instead went with [GitHub Pages](https://pages.github.com).

Each person with a GitHub account gets a free subdomain for each of their projects at `project.github.io`, as well
as one *account* subdomain at account.github.io. This account subdomain makes for a perfect place to host a jekyll blog. Since
GitHub Pages support Jekyll already and setting up a blog is as simple as creating a repository on GitHub and then pushing
to your Jekyll blog repo whenever you want to redeploy.

## Finding a template

To setup a Jekyll Blog on GitHub pages, install the `github-pages` gem in the folder of the blog repository. To get myself off the ground,
I used [this guide](http://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages) as a starting point, since they offered a pretty vanilla
Jekyll setup that I could configure however I wanted.

There are a bunch of Jekyll blog themes out there, although some are incompatible with GitHub Pages, as Pages only
supports a subset of all the Jekyll plugins.

## Building a layout

As Jekyll describes itself, the engine takes text written in any markup language and sends it through a series of layout files. My vanilla
install already had some layout files defined, but I modified them to be a little simpler and to match the look I was going for.

I currently am using three layout files:

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

First there is a title and a date for the post, and then the content of the post itself is injected within the entry.

Blog entries can be written in a variety of markup languages, for mine I like to use markdown.

## Styling content

I used SASS to style my layouts and posts. I included the [Bourbon](http://bourbon.io) gem, which provides a collection of mixins that I find
useful when styling applications, especially to help with vendor-prefixed styles in a similar way to Compass.  

Bourbon breaks its library into general mixins, grid mixins, and scaffolding, each with its respective gem. I used all of them here, since I needed some of the general mixins, as well as a grid and wanted some default styles.  

I like Bourbon because it isn't a front-end framework like Bootstrap or Foundation, which seems like overkill for my small blog, but instead just gives me the few mixins I need to make styling easier.  

I did include some scaffolding with the Bourbon Bitters gem, which like the other framework alters the appearance of several components, but it is in comparison very light-weight. Bitters breaks all of its styles into logical files for different components, making it simple to keep and modify only the styles you need, such as my blog's typography, grid settings, and lists.

## Hooking up the blog

Now that my Blog is deployed to GitHub Pages, I want to connect it to my website at `danreynolds.ca`. To do that, I setup a
`CNAME` in my site's DNS records, which forwards my subdomain `blog` to the Pages site.  

Finally, I had to add a `CNAME` file in the root of the blog repository containing **only** the name of the custom domain.
My custom domain was `blog.danreynolds.ca`.

With everything setup, I now have a perfect way to say random things that might sometimes be enjoyable or possibly even useful. Hurray for blogging!
