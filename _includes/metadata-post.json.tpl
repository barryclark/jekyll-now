{
    "page": {
        "title": "Introduction",
        "level": "1.1",
        "depth": 1,
        {% if page.next %}
        "next": {
            "title": "{{page.next.title}}",
            "level": "1.2",
            "depth": 1,
            "path": "{{page.next.path}}",
            "ref": "{{page.next.path}}",
            "articles": []
        },
        {% endif %}
        "dir": "ltr"
    },

    {%- include metadata.json.tpl -%}
}