---
layout: default
---
Benjis Denkarium to persist some chaotic memories
![_config.yml]({{ site.baseurl }}/images/pensieve.png)

{% for album in site.memories %}
    {{ album.title }}
    {{ album.content }}
{% endfor %} 

<div class="memories">
  {% for memory in site.memories %}
    <article class="memory">

      <h1><a href="{{ site.baseurl }}{{ memory.url }}">{{ memory.title }}</a></h1>

      <div class="entry">
        {{ memory.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ memory.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>
