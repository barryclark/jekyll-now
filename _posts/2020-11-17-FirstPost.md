---
layout: post
title: internet connected clock ! esp8266
food: pizza
---
<article class="post">

  <h1>{{ page.title }}</h1>

  <div class="entry">
    {{ Stuff You need to build the clock! }}
  </div>

  <div class="date">
    Written on {{ page.date | date: "%B %e, %Y" }}
  </div>

  <div class="comments">
    {% include disqus.html disqus_identifier=page.disqus_identifier %}
  </div>
</article>
