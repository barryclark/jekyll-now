---
layout: post
title: "Introducing chalk"
description: "Chalk is a high quality, completely customizable, performant and 100% free blog template for Jekyll."
tags: [web, jekyll]
---

{% include image.html path="documentation/chalk-intro.png" path-detail="documentation/chalk-intro@2x.png" alt="Chalk intro" %}

[Download Chalk here!](https://github.com/nielsenramon/chalk)

#### Features:
  - Dark and Light theme.
  - Filter on tags.
  - Customizable pagination.
  - Beautified link sharing in Facebook and other social media.
  - Automatic time to read post indicator.
  - Automatic RSS feed.
  - About page.
  - 404 page.
  - SEO optimized.
  - PageSpeed optimized.
  - Cross browser support (supports all modern browsers).
  - Media embed for videos.
  - Enlarge images on click (like Medium).

#### Integrations
  - [Google Analytics](https://analytics.google.com/analytics/web/)
  - [Google Fonts](https://fonts.google.com/)
  - [Disqus](https://disqus.com/)
  - [Ionicons](http://ionicons.com/)
  - Social media links

#### Used tools
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [Bower](http://bower.io/)
  - [Circle CI](https://circleci.com/)
  - [Html-proofer](https://github.com/gjtorikian/html-proofer)
  - [Jekyll](http://jekyllrb.com/)
  - [Jekyll assets](https://github.com/jekyll/jekyll-assets)
  - [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap)
  - [HTML5 Boilerplate](https://html5boilerplate.com/) (Influenced by)
  - [Kickster](http://kickster.nielsenramon.com/)
  - [Retina.js](http://imulus.github.io/retinajs/)
  - [STACSS](http://stacss.nielsenramon.com/)

{% include image.html path="documentation/enlarge.gif" path-detail="documentation/enlarge@2x.gif" alt="Enlarge image feature" %}

## Installation

If you haven't installed the following tools then go ahead and do so (make sure you have [Homebrew](http://brew.sh/) installed):

{% highlight bash %}
brew install ruby
brew install npm
{% endhighlight %}

Next setup your environment:

{% highlight bash %}
bin/setup
{% endhighlight %}

## Development

Run Jekyll:

{% highlight bash %}
bundle exec jekyll serve
{% endhighlight %}

## Deploy to GitHub Pages

Run this in the root project folder in your console:

{% highlight bash %}
bin/deploy
{% endhighlight %}

You can find more info on how to use the gh-pages branch and a custom domain [here](https://help.github.com/articles/quick-start-setting-up-a-custom-domain/).

[View this](https://github.com/nielsenramon/kickster#automated-deployment-with-circle-ci) for more info about automated deployment with Circle CI.

_If you have any questions about using or configuring Chalk please create an issue <a href="" title="here" target="_blank">here</a>!_
