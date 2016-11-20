---
layout: page
title: Mappe
permalink: /mappe/
---

<div class="homepage-categories">
{% for category in site.data.logos %}
  {% if category.map == true %}
    {% capture logo_alt %}{{ category.name }}{% if category.logo_credit and category.logo_credit != empty %} logo by {{ category.logo_credit }}{% endif %}{% endcapture %}
    <a href="{{ site.baseurl }}/{{ category.link | slugify }}" class="thumbnail" title="{{ logo_alt }}">
      {% if category.logo and category.logo != empty %}
        <img src="{{ site.baseurl }}{{ category.logo }}" alt="{{ logo_alt }}">
      {% endif %}
      {{ category.name }}
    </a>
  {% endif %}
{% endfor %}
</div>
