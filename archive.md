---
layout: page
title: Archive
---


<!---
 Code from https://nildeala.fr/2015/02/10/jekyll-pro-tip-awesome-archive-page.html
 and more stolen from http://chris.house/blog/building-a-simple-archive-page-with-jekyll/
-->
<style>
.catbloc:not(:target) {
    display: none;
}
</style>

<nav>
    <a href="#allposts">All</a>
    {% for tag in site.tags %}
        <a href="#{{ tag | first | remove:' ' }}"><strong>{{ tag | first }}</strong></a>{% if forloop.last %}.{% else %},{% endif %}
    {% endfor %}
</nav>

<div class="catbloc" id="allposts">
    <h2>All posts</h2>
        <table style="border-spacing: 5px;">
         {% for post in site.posts %}
             {% assign currentDate = post.date | date: "%Y" %}
             {% if currentDate != myDate %}
                 {% unless forloop.first %}</ul>{% endunless %}
                 <h1>{{ currentDate }}</h1>
                 <ul>
                 {% assign myDate = currentDate %}
             {% endif %}
             <li><span>{{ post.date | date: "%B %-d, %Y" }}</span> - <a href="{{ post.url }}"> {{ post.title }}</a></li>
             {% if forloop.last %}</ul>{% endif %}
       {% endfor %}
        </table>
</div>



<div>
{% for tag in site.tags %}
    <div class="catbloc" id="{{ tag | first | remove:' ' }}">
        <h2>{{ tag | first }}</h2>
        
        <ul>
           {% for posts in tag %}
             {% for post in posts %}
               {% if post.url %}
                 <li>
                     <time>{{ post.date | date: "%-d %B %Y" }}</time> - <a href="{{ post.url }}">{{ post.title }}</a>, {{ post.summary }}
                 </li>
               {% endif %}
             {% endfor %}
           {% endfor %}
        </ul>
    </div>
{% endfor %}
</div>

  {% include disqus.html %}
