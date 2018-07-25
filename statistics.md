---
layout: page
title: Blog Statistics
permalink: /statistics/
---

* {{ site.posts | size }} total posts.
* {{ site.pages | size }} pages of posts.
* {{ site.tags | size }} different tags.
* The most recent post was on [{{ site.posts.first.date | date: "%B %e, %Y" }}]({{ site.posts.first.url }}).
* The first post was on [{{ site.posts.last.date | date: "%B %e, %Y" }}]({{ site.posts.last.url }}).
* {{ site.posts.first.content | strip_html | number_of_words }}

{% for post in site.posts %}
{% assign words = site.posts.first.content.strip_html.number_of_words %}
{% endfor %}
