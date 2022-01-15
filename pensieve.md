---
layout: default
---
Benjis [Denkarium](https://harrypotter.fandom.com/wiki/Pensieve) helps to persist some of my chaotic memories. The Pensieve (Denkarium on german) itself, is a magical device used to review these memories.

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

![_config.yml]({{ site.baseurl }}/images/pensieve.png)
