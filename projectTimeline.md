---
layout: json
---

[
{% for post in site.categories.projects %}
    {
        "startDate"     : "{{ post.startDate }}",
        "endDate"       : "{{ post.endDate }}",
        "headline"      : "{{ post.title }}",
        "text"          : "{{ post.timelineText }}",
        "asset"         : {
                            "media": "{{ site.url }}{{ post.asset_media }}",
                            "caption": "{{ post.asset_caption }}",
                            "credit": "{{ post.asset_credit }}"
                          },
        "url"           : "{{ site.url }}{{ post.url }}"
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
] 
  
