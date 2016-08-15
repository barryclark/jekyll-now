---
layout: page
title: Journal Club
permalink: /journalclub/
---

As the tools in experiments neuroscience are rapidly developing, this is an important time to consider the broad trends and aims of the computational/theoretical works that are born alongside them.  Our aim is to present and discuss papers that reflect these modern directions so that we may better understand how our own work fits into a global neuroscience picture. Some themes and topics that we hope to cover are:

*computational models of neural systems
*novel analysis tools for understanding neural recordings
*recent advances in theoretical neuroscience
*popular theories in neuroscience
/Users/dhocker/websites/catniplab.github.io/_jclubposts/post1_rich_natneuro_2016.md
Journal club meetings take place on Tuesdays at 1pm in the Life Sciences Building, room LSB 575

## Join the club!

[david.hocker@stonybrook.edu](mailto:david.hocker@stonybrook.edu)

## Upcoming Paper


## Past Papers
<div class="posts">
  {% for post in site.jclubposts %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

      <div class="entry">
        {{ post.excerpt }}
      </div>

    </article>
  {% endfor %}
</div>



