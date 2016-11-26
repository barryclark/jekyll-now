---
layout: page
title: Storie
permalink: /storie/
---

In questa pagina ti raccontiamo le storie di successo più rilvanti che questo progetto è riuscito a creare. Tante piccole cose che messe insieme speriamo siano un contributo utile.

{: .table .table-striped #storie}
Storia          |Link                    |Come è finita             |Grazie a
:---------------|:-----------------------|:-------------------------|:------------
{% for member in site.data.storie %} {{member.Fabbisogno}} | [Link]({{member.Link}}) | {{member.Conclusione}} | {{member.Grazie}}
{% endfor %}



{% assign storie = (site.storie | sort: 'date') %}

<div class="posts">
  {% for post in storie reversed%}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi tutto</a>
      </article>
      <p class="post-meta">
        Posted on {{ post.date | date: "%B %-d, %Y" }}
      </p>
  {% endfor %}
</div>
