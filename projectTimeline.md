    ---
    layout: nil
    ---

    [
    {% for post in site.categories.projects %}
        {
            "title"    : "{{ post.title }}",
            "url"      : "{{ post.url }}",
            "date"     : "{{ post.date | date: "%B %d, %Y" }}",
            "content"  : "{{ post.content | escape }}"
        } {% if forloop.last %}{% else %},{% endif %}
    {% endfor %}
    ] 
  
