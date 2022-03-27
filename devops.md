---
layout: default
---

<p align="center">
<img width="600" src="/images/devops8.png">
<br>Agile is our Mindset - DevOps is our Culture
</p>
<br>
<br>

<div class="cultures">
  {% for culture in site.cultures %}
    <article class="culture">

      <h1><a href="{{ site.baseurl }}{{ culture.url }}">{{ culture.title }}</a></h1>

      <div class="entry">
        {{ culture.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ culture.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>
