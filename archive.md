---
layout: page
title: Archive
---


<!---
 Code from https://nildeala.fr/2015/02/10/jekyll-pro-tip-awesome-archive-page.html
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
        <ul>
            {% for post in site.posts %}
                <li>
                <time>{{ post.date | date: "%-d %B %Y" }}</time>
                    <a href="{{ post.url }}">
                    {{ post.title }}
                    </a>
                    <br>{{ post.summary  }}
                </li>
            {% endfor %}
        </ul>
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
                     <time>{{ post.date | date: "%-d %B %Y" }}</time>
                   <a href="{{ post.url }}">
                     {{ post.title }}
                   </a>
                   <br>{{ post.summary  }}
                 </li>
               {% endif %}
             {% endfor %}
           {% endfor %}
        </ul>
    </div>
{% endfor %}
</div>

  {% include disqus.html %}
