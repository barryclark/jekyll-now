---
layout: page
title: Archive
permalink: /archive/
---

{% assign groups = "harnessed-rl,harness-rsi,agent-arch" | split: "," %}
{% assign names = "Harnessed Agentic RL,Harness 自进化,Agent 架构" | split: "," %}

{% for g in groups %}
{% assign group_name = names[forloop.index0] %}
{% assign count = 0 %}
{% for post in site.posts %}
  {% if post.series == g %}{% assign count = count | plus: 1 %}{% endif %}
{% endfor %}
{% if count > 0 %}
<h2 class="archive-title">{{ group_name }} <span class="archive-count">{{ count }}</span></h2>
<ul class="archive-list">
  {% for post in site.posts %}
    {% if post.series == g %}
    <li>
      <span class="archive-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
{% endif %}
{% endfor %}
