---
layout: default
title: HUM 331
---

This blog features the research of students in _A History of Words: Technologies of
Communication from Cuneiform to Coding_ (HUM 331) taught by Professor Melissa Reynolds in
the Humanities Council and History Department at Princeton University in Spring 2021. Throughout the semester,
students will be posting their research on archival materials held in Princeton Library's
[Special Collections](https://library.princeton.edu/special-collections/welcome) using various
digital "tools" that they learn over the semester. As they post, they are learning how to use Jekyll, GitHub Pages, and Markdown to
build a static site (like this one) so that they can share their in-depth research on everything from campus activism to
nineteenth-century travelogues to early Japanese board games, taking advantage of the possibilities of digital storytelling
and digital analytical methodologies. Check back in May to see those projects, but in the mean time, scroll down to read posts
featuring their intermediate research, or toggle the menu at the top left to check out their bios or to read the course syllabus.

---
<br>

<div class="posts" id="top">
  {% for post in site.posts %}
    <article class="post">
      <header class="post-header">
      <h2 class="post-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
      <h4>By {{ post.author }} on {{ post.date | date: "%B %e, %Y" }}</h4>
      </header>

      <div class="entry">
        {{ post.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}

  <div class="breadcrumbs">
    <a href="#top">Return to the top</a>
  </div>
</div>
