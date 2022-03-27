---
layout: default
---

<p align="center">
<img width="600" src="/images/devops8.png">
<h3>Agile is our Mindset - DevOps is our Culture</h3>
</p>


<div class="cultures">
  {% for memory in site.memories %}
    <article class="culture">

      <h1><a href="{{ site.baseurl }}{{ culture.url }}">{{ culture.title }}</a></h1>

      <div class="entry">
        {{ culture.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ culture.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>