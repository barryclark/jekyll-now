---
layout: page
title: Alloggi
permalink: /alloggi/
---

<div class="panel-group">
{% for member in site.data.alloggi %}

{% assign memberId = member.Descrizione|slugify|truncate:20,"" %}
{% capture memberUrl %}{{site.url}}{{page.url}}#{{memberId}}{% endcapture %}
{% capture twittershareUrl %}https://twitter.com/intent/tweet?text={{member.Descrizione|truncate:50|uri_escape}}&hashtags=terremotocentroitalia,alloggio&url={{memberUrl|uri_escape}}{% endcapture %}
{% capture fbshareUrl %}http://www.facebook.com/share.php?u={{memberUrl|uri_escape}}&title=member.Descrizione{% endcapture %}

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
<div class="col-md-2"><b>Link:</b></div><div class="col-md-10"><a href="{{member.Link}}">Twitter</a></div>
</div>
{% endif %}
<div class="row">
</div>
</div>
<div class="panel-footer">
<div class="row">
<div class="col-md-1"><a href="{{memberUrl}}">Link</a></div>
<div class="col-md-1">
            <a href="{{fbshareUrl}}" title="Twitter">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>
            </a>
</div>
<div class="col-md-1">
            <a href="{{twittershareUrl}}" title="Twitter">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
            </a>

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
