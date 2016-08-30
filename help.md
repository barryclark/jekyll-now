---
layout: page
title: Segnala
permalink: /aiuto/
---

Se hai una necessità o vuoi comunicare aggiornamenti, ci sono numerosi modi di contattarci:

- [Gruppo Facebook](https://www.facebook.com/groups/1758670357733881/), da usare per informazioni generiche
- [Bot Telegram](http://telegram.me/terremotocentroitalia_bot), per segnalazioni da smartphone
- [Waze](/2016-08-26-usare-waze/), per tutto ciò che riguarda la viabilità
- [Gruppo Flickr](https://www.flickr.com/groups/3003557@N20/), per caricare foto e media
- [Email per segnalare contenuti da rimuovere](mailto:terremotocentroita+rimozione@gmail.com)

Tutto ciò che ci mandi sarà gestito dal nostro team, che provvederà alla pubblicazione sul sito appena possibile.

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
