---
layout: json
---

[
{% for post in site.categories.projects %}
    {
        "url"           : "{{ site.url }}{{ post.url }}"
        "headLine"      : "{{ post.title }}",
        "text"          : "{{ post.timelineText }}",
        "startDate"     : "{{ post.startDate }}",
        "endDate"       : "{{ post.endDate }}"
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
] 
  
