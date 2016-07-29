---
layout: default
permalink: /tags/
---

<hr />
  <nav class="tags" style="float: none;">
    {% assign tags = site.tags | sort %}
    {% for tag in tags %}
      {% capture page_name %}/tags/{{ tag[0] | replace: ' ', '_' }}/{% endcapture %}
      <a href="{{ page_name }}" 
        {% if forloop.first or page.title == tag[0] %}
          class="{% if forloop.first %}first{% endif %}"
        {% endif %}>
        {{ tag[0] }}
      </a>{% unless forloop.last %}|{% endunless %}
    {% endfor %}
  </nav>
<hr />

{% for tag in tags %}
{{ tag | size }}
{% endfor %}
