---
layout: page
title: Games
permalink: /games/
---

{% for game in site.data.games %}
<ul>
  <li>
    <iframe src="{{ game.url }}" width="552" height="167" frameborder="0"></iframe>
  </li>
</ul>
{% endfor %}
