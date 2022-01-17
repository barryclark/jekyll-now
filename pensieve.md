---
layout: default
---
Benjis [Denkarium](https://harrypotter.fandom.com/wiki/Pensieve) helps to persist some of my chaotic memories. The Pensieve (Denkarium on german) itself, is a magical device used to review these memories.

![_config.yml]({{ site.baseurl }}/images/pensieve.png)

---
<!-- Html Elements for Search -->
<div id="search-container">
<input type="text" id="search-input" placeholder="Search memories ...">
<ul id="results-container"></ul>
</div>

<!-- Script pointing to search-script.js -->
<script src="/js/search-script.js" type="text/javascript"></script>

<!-- Configuration -->
<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json'
})
</script>

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
