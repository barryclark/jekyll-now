---
layout: page
title: Hai Bisogno?
permalink: /aiuto/
---

### Risorse Utili

- [Gruppo Facebook](https://www.facebook.com/groups/1758670357733881/) : da usare per condividere informazioni utili
- [Twitter](https://www.twitter.com/terremotocentro): da usare per indirizzare twitter da rilanciare
- [Canale Telegram](https://telegram.me/terremotocentroitalia): ricezione in tempo reale sulle scosse e news
- [Gruppo Telegram](https://telegram.me/joinchat/BgW6eEBsI3rLKsJk9L7FJg): da usare per chattare sul tema
- [Medium](https://medium.com/terremotocentroitalia): reperire informazioni utili, storie, tutorial
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
