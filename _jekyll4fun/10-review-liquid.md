---
title: Recap Working With Liquid
slug: recap-working-with-liquid
chapter: 8
---
Liquid is the template language that Jekyll uses. It was open sourced by
Shopify,  however there are also Jekyll specific extensions
* [Shopify Docs](https://shopify.github.io/liquid/)
* [Additional Jekyll Filters](https://jekyllrb.com/docs/liquid/filters/)
* [With Examples](https://learn.cloudcannon.com/jekyll/introduction-to-liquid/)

It's not a programming syntax, so it's pretty verbose to do even simple things.
It is consistent in it's patterns for doing things.
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

# More References and Guides
* [An Overview of Liquid: Shopify's Templating Language](https://www.shopify.com/partners/blog/115244038-an-overview-of-liquid-shopifys-templating-language)
* [Expert Tips](https://www.shopify.com/partners/blog/17387171-11-easy-to-learn-tips-for-using-liquid-shopifys-template-language)
