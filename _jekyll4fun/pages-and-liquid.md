---
layout: lesson
title: Liquid Basics
chapter: 4
---
Jekyll uses a templating language called Liquid
* [Shopify Docs](https://shopify.github.io/liquid/)
* [Additional Jekyll Filters](https://jekyllrb.com/docs/liquid/filters/)
* [With Examples](https://learn.cloudcannon.com/jekyll/introduction-to-liquid/)

Create a new page "demo-page.md" at the root of your jekyll directory
At the top of the page add
~~~
---
layout: default
---
~~~
What happens if you don't include this section?

Next declare and then show a liquid variable

~~~
{% raw %}
{% assign x = 1 | plus: 1 %}
{{ x }}
{% endraw %}
~~~

Refresh your site

Add a property from your _config.yml
