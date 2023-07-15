---
permalink: /essays
published: true
layout: page
---
<h1><b><u>Essays</u></b></h1>
<div class="posts">
  {% for essay in site.static_files %}
  	{% if essay.path contains 'Essays' %}
  		<p>{{ essay.path }} swag</p>
  	{% endif %}
  {% endfor %}
</div>




###Testing 123


please work lmao
