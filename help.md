---
layout: page
title: Hai Bisogno?
permalink: /aiuto/
---

### Risorse Utili

- [Gruppo Facebook](https://www.facebook.com/groups/1758670357733881/) : da usare per condividere informazioni utili
- [Twitter](https://www.twitter.com/terremotocentro): da usare per indirizzare twitter da rilanciare
- [Gruppo Telegram](https://telegram.me/joinchat/BgW6eAbwichChVE61JZ2xA): da usare per chattare sul tema
- [Segnalazione Rimozione Contenuti](mailto:terremotocentroita+rimozione@gmail.com): contatto email per segnalare un contenuto da rimuovere

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'aiuto' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
