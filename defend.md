---
layout: default
---

<p align="center">
<img width="200" src="/images/blue-knight.png">
<br>The offense sells tickets. Defense wins championships
</p>
<br>
<br>

<div class="defenses">
  {% for defense in site.defenses %}
    <article class="defense">

      <h1><a href="{{ site.baseurl }}{{ defense.url }}">{{ defense.title }}</a></h1>

      <div class="entry">
        {{ defense.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ defense.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>
