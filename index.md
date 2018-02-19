---
layout: default
---

# Welcome!

The  original idea for creating this site/blog was to document some of the technical challenges I had faced while working on my personal tech projects. Hopefully these articles will be useful for other developers who are facing similar issues, or who are just interested in similar areas or approaches. One of the other objectives is to create some more personal and detailed content for readers of my CV, who want to find out a bit more about my interests and ideas. In addition, I am hoping that this blog will be self-perpetuating, by encouraging me to explore more diverse areas of technology, and assess these more critically than I would have done previously - for example, the process of creating it has allowed me to discover a whole area of blogging and website-generation frameworks that I had never encountered before (see my inaugural [Hello World](https://julianjoseph.github.io/Hello-World) article).

<hr>

# Recent Blog Posts

<div class="posts">
{% for post in site.posts limit:5 %}
      <h2>{{ post.date | date: "%e %B %Y" }}: <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
{% endfor %}
</div>
