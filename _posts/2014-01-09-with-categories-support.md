---
layout: post
title: Now With Categories Support
summary: Category link helpers and filtering by category make parsing blogs with many posts simple to navigate and consume content.
category: Features
---

When blogs begin to build up lots of content, it's often desirable to filter by categories. Maid utilizes the [generate_categories](https://github.com/recurser/jekyll-plugins) plugin by [Dave Perrett](http://www.daveperrett.com/articles/2010/12/08/jekyll-plugins-for-categories-projects-and-sitemaps/) to automatically create indexes for each category.

<p class="message">
  Don't forget, since this uses a third party plugin, Github pages cannot build the website properly. So, you'll need to build the site, and then only push the contents of <code>_site/</code>.
</p>

These can be navigated to with the `category_link` helper like so:

{% raw %}
```html
<em class="post-category">
  {{ post.categories | category_links }}
</em>
```

Maid's version of the generate_categories plugin also allows you to submit just one category, this is what's used on the main index page:

```html
<em class="post-category">
  from {{ post.category | category_links }}
</em>
```

{% endraw %}
