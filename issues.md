---
layout: page
title: Issues
permalink: /issues/
---

* [Notizie Utili](#notizie-utili)
* [Alloggi](#alloggi)
* [Donazioni](#donazioni)
* [Fabbisogni](#fabbisogni)
* [Raccolte Fondi](#raccolte-fondi)

---

# Notizie Utili

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Notizie Utili" %}
* <a href="{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

---

# Alloggi

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Alloggi" %}
* <a href="{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

---

# Donazioni

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Donazioni" %}
* <a href="{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

---

# Fabbisogni

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Fabbisogni" %}
* <a href="{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}

---

# Raccolte Fondi

{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Raccolte Fondi" %}
* <a href="{{ member.number | datapage_url: '.' }}">{{member.title}}</a>
{% endif %}
{% endfor %}
