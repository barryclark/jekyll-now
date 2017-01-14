---
layout: json
---

[
{% for post in site.categories.projects %}
    {
        "headLine"      : "<a href='{{ site.url }}{{ post.url }}'>{{ post.title }}</a>",
        "text"          : "{{ post.timelineText }}",
        "startDate"     : "{{ post.startDate }}",
        "endDate"       : "{{ post.endDate }}"
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
] 
  
