---
layout: json
---

[
{% for post in site.categories.projects %}
    {
        "title"         : "{{ post.title }}",
        "url"           : "{{ site.url }}{{ post.url }}",
        "timelineText"  : "{{ post.timelineText }}",
        "startDate"     : "{{ post.startDate }}",
        "endDate"       : "{{ post.endDate }}",
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
] 
  
