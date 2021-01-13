---
layout: default
---
## Reminders for Tony
1. Open Chat
2. Record!

<div class="posts">
  {% for post in site.posts reversed %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
      <div class="date">
        {{ post.date | date: "%B %e, %Y" }}
      </div>
      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>