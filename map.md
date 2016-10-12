---
layout: page
title: Mappe
permalink: /mappe/
---

<style>

.homepage-categories,
.theme-gallery {
  text-align: justify;
}

/* allows last line of categories to be justify aligned */
.homepage-categories:after,
.theme-gallery:after {
  display: inline-block;
  width: 100%;
  content: '';
}

.homepage-categories .thumbnail {
  display: inline-block;
  min-width: 120px;
  text-align: center;
  border: none;
  padding: 10px;
}

.homepage-categories .thumbnail img {
  height: 80px;
}

.homepage-categories a {
  color: #000;
}
</style>


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
