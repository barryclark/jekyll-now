---
permalink: /essays
published: true
layout: page
---
<h1><b><u>Essays</u></b></h1>
<div class="posts">
  {% for essay in site.essays %}
    <article class="post">

      <h3><a href="{{ site.baseurl }}{{ essay.url }}">{{ essay.title }}</a></h3>


    </article>
  {% endfor %}
</div>
###Testing 123


please work lmao
