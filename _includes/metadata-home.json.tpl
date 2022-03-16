{
    "page": {
        "title": "Introduction",
        "level": "1.1",
        "depth": 1,
        {% assign reversed_posts = site.posts | reverse %}

        {% if reversed_posts %}
        "next": {
            "title": "{{reversed_posts.first.title}}",
            "level": "1.2",
            "depth": 1,
            "path": "{{reversed_posts.first.path}}",
            "ref": "{{reversed_posts.first.path}}",
            "articles": []
        },
        {% endif %}
        "dir": "ltr"
    },

    {%- include metadata.json.tpl -%}
}