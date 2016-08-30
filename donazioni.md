---
layout: page
title: Vuoi Donare?
permalink: /donazioni/
---

* [Raccolte fondi](#raccolte-fondi)
* [Donazioni](#donazioni)
* [Fabbisogni](#fabbisogni)

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

{% if member.CCPostale %}
<div class="row">
<div class="col-md-2"><b>Cc postale:</b></div><div class="col-md-10">{{member.CCPostale}}</div>
</div>
{% endif %}

{% if member.Causale %}
<div class="row">
<div class="col-md-2"><b>Causale:</b></div><div class="col-md-10">{{member.Causale}}</div>
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

# Fabbisogni

Data	Ora	Breve descrizione delle necessità	Elenco completo dei fabbisogni	Indirizzo	Località	Comune	Fonte 	Link	Latitudine	Longitudine
{% for member in site.data.fabbisogni %}
<div class="panel panel-info">
<div class="panel-heading">
{{member.Data}} {{member.Ora}} {{member.['Breve descrizione delle necessità']}}
</div>
<div class="panel-body">
<div class="row">
<div class="col-md-12">
{{member.['Elenco completo dei fabbisogni']}}
</div>
</div>
{% if member.Indirizzo %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div><div class="col-md-10">{{member.Indirizzo}}</div>
</div>
{% endif %}
{% if member.Località %}
<div class="row">
<div class="col-md-2"><b>Localita:</b></div><div class="col-md-10">{{member.Località}}</div>
</div>
{% endif %}

{% if member.Comune %}
<div class="row">
<div class="col-md-2"><b>Comune:</b></div><div class="col-md-10">{{member.Comune}}</div>
</div>
{% endif %}
{% if member.Fonte %}
<div class="row">
<div class="col-md-2"><b>Fonte:</b></div><div class="col-md-10">{{member.Fonte}}</div>
</div>
{% endif %}
{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
{% if member.Latitudine %}
<div class="row">
<div class="col-md-2"><b>Lat:</b></div><div class="col-md-10">{{member.Latitudine}}</div>
</div>
{% endif %}
{% if member.Longitudine %}
<div class="row">
<div class="col-md-2"><b>Lon:</b></div><div class="col-md-10">{{member.Longitudine}}</div>
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

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Leggi Tutto</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
