Fabbisogni

Data Ora Breve descrizione delle necessità Elenco completo dei fabbisogni Indirizzo Località Comune Fonte Link Latitudine Longitudine {% for member in site.data.fabbisogni %}

{{member.Data}} {{member.Ora}} {{member.['Breve descrizione delle necessità']}}
{{member.['Elenco completo dei fabbisogni']}}
{% if member.Indirizzo %}
Indirizzo:
{{member.Indirizzo}}
{% endif %} {% if member.Località %}

Localita:
{{member.Località}}
{% endif %}

{% if member.Comune %}

Comune:
{{member.Comune}}
{% endif %} {% if member.Fonte %}

Fonte:
{{member.Fonte}}
{% endif %} {% if member.Link %}

Link:
{{member.Link}}
{% endif %} {% if member.Latitudine %}

Lat:
{{member.Latitudine}}
{% endif %} {% if member.Longitudine %}

Lon:
{{member.Longitudine}}
{% endif %}

{% endfor %}
{% for post in site.posts %} {% if post.categories contains 'donazioni' %}
