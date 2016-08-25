---
layout: page
title: Hai Bisogno?
permalink: /aiuto/
---

### Risorse Utili

- [Gruppo Facebook](https://www.facebook.com/groups/1758670357733881/) : da usare per condividere informazioni utili
- [Twitter](twitter.com/terremotocentro): da usare per indirizzare twitter da rilanciare
- [Gruppo Telegram](https://telegram.me/joinchat/BgW6eAbwichChVE61JZ2xA) da usare per chattare sul tema

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'aiuto' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
