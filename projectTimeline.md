---
layout: json
---

[
{% for post in site.categories.projects %}
    {
        "startDate"     : "{{ post.startDate }}",
        "endDate"       : "{{ post.endDate }}",
        "headLine"      : "{{ post.title }}",
        "text"          : "{{ post.timelineText }}",
        "asset":        : "",
        "url"           : "{{ site.url }}{{ post.url }}"
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
] 
  
