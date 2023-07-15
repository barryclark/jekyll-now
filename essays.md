---
permalink: /essays
published: true
layout: page
---
<h1><b><u>Essays</u></b></h1>
<div class="posts">
  {% for essay in site.static_files %}
  	{% if essay.path contains 'Essays' %}
  	<a href="{{ site.baseurl }}{{ essay.path }}">{{essay.name}}</a>
  	{% endif %}
  {% endfor %}
</div>
