---
title: Recap on Collections and Liquid
slug: recap-indexing-your-collection-with-liquid
chapter: 9
links:
- https://jekyllrb.com/docs/collections/
- https://ben.balter.com/2015/02/20/jekyll-collections/
- https://www.shopify.com/partners/blog/115244038-an-overview-of-liquid-shopifys-templating-language
- https://www.shopify.com/partners/blog/17387171-11-easy-to-learn-tips-for-using-liquid-shopifys-template-language
---

# Collections
Collections are Jekyll's option for organizing items you want to handle
in a consistent way.

* Use front matter defaults with layout, permalink etc.
* Sort, iterate, filter items with Liquid templating
* Assign and access custom properties in front matter with the "page" scope.
* Define a custom index page to show collection contents.

Collections can get you into trouble with regard to performance. Iterating,
Filtering, etc. are happening on files not a database.  Too much processing
and searching will increase your total time to render the site.

# Liquid
Liquid is the template language that Jekyll uses.
It's not a programming syntax, so it's pretty verbose to do even simple things.

It was open sourced by Shopify, there are also Jekyll specific extensions.

* [Shopify Docs](https://shopify.github.io/liquid/){:target="_blank"}
* [Additional Jekyll Filters](https://jekyllrb.com/docs/liquid/filters/){:target="_blank"}
* [With Examples](https://learn.cloudcannon.com/jekyll/introduction-to-liquid/){:target="_blank"}

A few common syntax conventions:

* Tags open and end:

~~~
{% raw %}
{% for %} ... {% endfor %}
{% if %} ... {% endif %}
{% endraw %}
~~~

* Connect inputs and outputs with pipes
* Double handlebars to access variables

~~~
{% raw %}
{% assign x = 1 | plus: 1 %}
{{ x }}
{% endraw %}
~~~
