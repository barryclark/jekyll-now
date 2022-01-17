---
layout: default
---
Benjis [Denkarium](https://harrypotter.fandom.com/wiki/Pensieve) helps to persist some of my chaotic memories. The Pensieve (Denkarium on german) itself, is a magical device used to review these memories.

![_config.yml]({{ site.baseurl }}/images/pensieve.png)

---

<!-- HTML elements for search -->
<input type="text" id="search-input" placeholder="Search for memories ...">
<ul id="results-container"></ul>

<!-- or without installing anything -->
<script src="https://unpkg.com/simple-jekyll-search@latest/dest/simple-jekyll-search.min.js"></script>

---

<br>
<br>

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
