---
permalink: /essays
published: true
layout: page
---
<h1><b><u>Essays</u></b></h1>
<div class="posts">
 {% assign essay_files = site.static_files | where: "essay", true %}
  {% for essay in essay_files %}
    {{ essay.path }}
  {% endfor %}
</div>
###Testing 123


please work lmao
