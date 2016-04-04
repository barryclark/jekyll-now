---
layout: post
title: Using JSON and Liquid Tags in Jekyll Templates
tags: jekyll github pages liquid plugin snippet tip include template svg data json
image_small: /images/2016-01-04-small-jekyll-include.png
---

Jekyll allows you to write [plugins](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/ "Jekyll Plugins with GitHub Pages") to create custom generated content for your site. By default, GitHub Pages supports a few useful plugins (in the form of gems), but disables user plugins for security reasons. What if you want to get the most out of Jekyll, while still having GitHub Pages generate your site?

<!--more-->

## Plugins for GitHub Pages

To begin with, GitHub Pages supports a few useful plugins that you might want to take advantage of. For example, the `jekyll-feed` plugin creates [an Atom feed](https://en.wikipedia.org/wiki/Atom_%28standard%29 "Atom XML") for subscribing to new posts. You can enable plugins on GitHub Pages by adding to your site's _config.yml file:

{% highlight yaml %}
gems:
- jekyll-feed
- jekyll-mentions
- jekyll-redirect-from
- jekyll-sitemap
- jemoji
{% endhighlight %}

## Liquid Tags

Jekyll uses the [Liquid](http://liquidmarkup.org/ "Liquid Markup") templating language, which can be used in combination with the `include` tag to create some fairly powerful templates. The `include` tag supports passing variables to templates:

{% highlight liquid %}
{% raw %}
{% include footer.html param="value" param_2=page.param_value %}
{% endraw %}
{% endhighlight %}

Inside the template you can access these variables using `include.param` and `include.param_2` respectively.

### An Example

Liquid filters include a method for [formatting dates](https://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date "Liquid Date Filters"), but you're limited to a few options that might not support what you're looking for. I wanted to create a filter that added ordinals to the day (e.g. January 4**th**), but there's no way to do this using basic Liquid filters. If your site isn't hosted on GitHub Pages (meaning Jekyll isn't forced into safemode), the easiest way would be to create a simple filter and place this into the `_plugins/` directory.

If you're hosting your site on GitHub Pages, and don't want to push any generated content, you can still accomplish this by using the technique above. Using some basic Liquid syntax we can write:

{% highlight liquid %}
{% raw %}
{% assign d = include.date_param | date: "%-d" %}
{% case d %}
  {% when '1' or '21' or '31' %}{% assign ordinal = "st" %}
  {% when '2' or '22' %}{% assign ordinal = "nd" %}
  {% when '3' or '23' %}{% assign ordinal = "rd" %}
  {% else %}{% assign ordinal = "th" %}
{% endcase %}
{% endraw %}
{% endhighlight %}

Save this in a file called `ordinalize.html` and place it in the `_includes/` directory. To display an ordinalized date, you just need to include this template and can access the `ordinal` variable as a page variable. For example, to display the date formatted as "January 4th" you could use the following:

{% highlight liquid %}
{% raw %}
{% include ordinalize.html date_param=post.date %}
<h1>{{ post.title }}</h1>
<time datetime="{{ post.date }}">
  {{ post.date | date: "%B" }} {{ post.date | date: "%-d" }}{{ ordinal }}
</time>
{% endraw %}
{% endhighlight %}

## Data Files

Jekyll also supports custom data through the use of data files (YAML, JSON, or CSV) placed in the `_data` directory. This allows you to avoid repeating content in your templates and can be used in a number of different scenarios.

I decided to use a JSON data file for storing SVG icons in a single place. It would be easier to use a plain SVG file, and have multiple symbols which can be referenced with `<use xlink:href="#icon-1"></use>`, but browser support is slightly lacking. I ended up with a data file containing icons like this:

{% highlight json %}
"web": {
  "viewbox": "0 0 685 685",
  "paths": [
    {
      "d": "M0,342.5a342.5,342.5 0 1,0 685,0a342.5,342.5 0 1,0 -685,0",
      "fill": "#444"
    },
    {
      "d": "m246 467 73-81 61 141c13 25 52 4 38-24l-57-133 103 0-195-211c-3-3-23-9-24 9z",
      "fill": "#f6f6f6"
    }
  ]
}
{% endhighlight %}

My icons were pretty simple in that I could construct them using just paths and fills. I then created a simple Liquid template to draw the SVGs, which accepted a parameter referencing the item in the data file:

{% highlight liquid %}
{% raw %}
<svg viewBox="{{ include.icon.viewbox }}">
{% for path in include.icon.paths %}
    <path fill="{{ path.fill }}" d="{{ path.d }}"/>
{% endfor %}
</svg>
{% endraw %}
{% endhighlight %}

And with these two pieces I could include them into my pages:

{% highlight liquid %}
{% raw %}
{% include svg-icon.html icon=site.data.icons.web %}
{% endraw %}
{% endhighlight %}

Unfortunately there's no support for using site variables within data files, so you'll have to choose the best location for your data.
