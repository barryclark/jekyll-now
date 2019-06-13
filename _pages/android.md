---
title: Android
layout: collection
permalink: /android/
collection: Android
author_profile: true
---

{% capture written_label %}'None'{% endcapture %}

{% for android in site.android %}
    {% unless android.output == false or android.label == "posts" %}
      {% capture label %}{{ android.label }}{% endcapture %}
      {% if label != written_label %}
        <h2 id="{{ label | slugify }}" class="archive__subtitle">{{ label }}</h2>
        {% capture written_label %}{{ label }}{% endcapture %}
      {% endif %}
    {% endunless %}
    {% for post in android.docs %}
      {% unless android.output == false or android.label == "posts" %}
        {% include archive-single.html %}
      {% endunless %}
    {% endfor %}
{% endfor %}
