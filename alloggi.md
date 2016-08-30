---
layout: page
title: Alloggi
permalink: /alloggi/
---

<div class="panel-group">
{% for member in site.data.alloggi %}

{% assign memberId = member.Descrizione|strip_newlines|handleize|escape|strip_html|replace:' ','_'|truncate:20 %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}

<div class="panel panel-info">
<div class="panel-heading" id="{{memberId}}">
{{member.Descrizione|strip_newlines}}
</div>
<div class="panel-body">
{% if member.Dove %}
<div class="row">
<div class="col-md-2"><b>Indirizzo:</b></div> {{member.Dove}}
</div>
{% endif %}
{% if member.Numero %}
<div class="row">
<div class="col-md-2"><b>Numero:</b></div> {{member.Numero}}
</div>
{% endif %}

{% if member.Email and member.Email contains '@' %}
<div class="row">
<div class="col-md-2"><b>Email:</b></div> <a href="mailto:{{member.Email}}">{{member.Email}}</a>
</div>
{% endif %}

{% if member.Link %}
<div class="row">
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">{{member.Link}}</a></div>
</div>
{% endif %}
<div class="row">
</div>
</div>
<div class="panel-footer">
<div class="row">
<div class="col-md-2"><a href="{{memberUrl}}">Permalink</a></div>
<div class="col-md-2"><div class="fb-share-button" data-href="{{memberUrl}}" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fterremotocentroitalia.info%2F&amp;src=sdkpreparse">Share</a></div></div>
<div class="col-md-2"><a class="twitter-share-button"  href="https://twitter.com/intent/tweet?hashtags=terremotocentroitalia,alloggio&url={{memberUrl}}">Tweet</a></div>
</div>
</div>
</div>
{% endfor %}
</div>

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'alloggi' %}
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
