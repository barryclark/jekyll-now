---
layout: post
title: Hello World!
---

This is my first blog post, using my new Jekyll/GitHub Pages website. I looked at a few options for creating a personal website/blog - such as WordPress and Blogger, both of which I have used before, and are very user-friendly but quite clunky. 

I have had a GitHub account for a few years, and keep the code for all my personal/hobby projects in there. I knew GitHub Pages existed, but had never really looked into it before. On delving a little further, I discovered that, behind the scenes, it uses [Jekyll](https://help.github.com/articles/about-github-pages-and-jekyll/), a Ruby-based static site generator, which is specifically designed for blogs and software documentation. I'd never heard of this, but was keen to find out more.

Initially, the idea of a blog based on static web pages sounded pretty archaic - surely dynamic page generation is the way to go? However, although it requires a bit more technical knowledge to set up, there are quite a few compelling reasons to use this approach:

* **Performance**: our web server is simply serving up static files - there is very little server-side processing
* **Simplicity**: our web server only needs to be able to serve up static html pages - and all content can be written using MarkDown
* **Security**: dynamically generated web pages carry a much higher risk of malicious exploitation, due to the presence of a back-end database. This security loophole is closed if we use Jekyll
* **Scalability**: a server that serves up only static pages can handle a lot more traffic than one that needs to generate dynamic content. It is also much simpler to deploy the site to multiple servers if redundancy or load balancing is required
* **Version Control**: the site content is all hosted within GitHub, so we automatically get all the GitHub goodness of version control, branching, collaborative coding etc. The GitHub repository also acts as an off-site backup

It's also been a good opportunity to look at some new web frameworks and approaches which I haven't encountered before, namely:

* [Jekyll](https://jekyllrb.com/):  a simple, blog-aware, static site generator written in Ruby
* [JekyllNow](http://www.jekyllnow.com/): a pre-configured GitHub Pages blog which can be forked and customised
* [Sass](https://sass-lang.com/): a scripting language used to generate CSS
* [YAML](http://yaml.org/): a human-readable data serialization language, commonly used for configuration files
* [Liquid](https://shopify.github.io/liquid/): template lanugage for web apps

I will be adding content and functionality as and when over the coming weeks, so please check back soon.
