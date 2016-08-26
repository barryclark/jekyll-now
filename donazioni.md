---
layout: page
title: Vuoi Donare?
permalink: /donazioni/
---

* [Raccolte fondi](#raccolte-fondi)
* [Donazioni](#donazioni)

# Raccolte fondi

{% for member in site.data.raccolte %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Chi}}
</div>
<div class="panel-body">
{% if member.Descrizione %}
<div class="row">
<div class="col-md-12">
{{member.Descrizione}}
</div>
</div>
{% endif %}
{% if member.Intestazione %}
<div class="row">
<div class="col-md-2"><b>Intestazione:</b></div><div class="col-md-10">{{member.Intestazione}}</div>
</div>
{% endif %}

{% if member.IBAN %}
<div class="row">
<div class="col-md-2"><b>IBAN:</b></div><div class="col-md-10">{{member.IBAN}}</div>
</div>
{% endif %}

{% if member.BICSWIFT %}
<div class="row">
<div class="col-md-2"><b>BIC/SWIFT:</b></div><div class="col-md-10">{{member.BICSWIFT}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
</div>
</div>
{% endfor %}

---

# Donazioni

{% for member in site.data.donazioni %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Dove}}
</div>
<div class="panel-body">
{% if member.Cosa %}
<div class="row">
<div class="col-md-2"><b>Cosa:</b></div><div>{{member.Cosa}}
</div></div>
{% endif %}
{% if member.Descrizione %}
<div class="row">
<div class="col-md-12">
{{member.Descrizione}}
</div>
</div>
{% endif %}
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div><div class="col-md-10">{{member.Indirizzo}}</div>
</div>
{% endif %}

{% if member.Contatti %}
<div class="row">
<div class="col-md-2"><b>Contatti:</b></div><div class="col-md-10">{{member.Contatti}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
</div>
</div>
{% endfor %}

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'donazioni' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
