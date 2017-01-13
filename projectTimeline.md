    ---
    layout: nil
    ---

    [
    {% for post in site.posts %}
        {% if post.category == 'projects'' %}
            {
                "title"    : "{{ post.title }}",
                "url"     : "{{ post.url }}",
                "date"     : "{{ post.date | date: "%B %d, %Y" }}",
                "content"  : "{{ post.content | escape }}"
            } {% if forloop.last %}{% else %},{% endif %}
        {% endif %}
    {% endfor %}
    ] 
  
