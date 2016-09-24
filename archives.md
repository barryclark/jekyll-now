---
layout: page
title: Archives
permalink: /archives/
---

<style>
table, th, td {
    border: 0px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
    text-align: left;
}
</style>

<section id="site-archives">

{% assign old_week = 100 %}

{% for post in site.posts %}
   {% assign author = site.data.authors[post.author] %}
   {% capture week %}
      {{ post.date | date: "%W" }}
   {% endcapture %}
   {% capture dayname %}
      {{ post.date | date: "%a" }}
   {% endcapture %}
   {% assign week = week | plus: 0 %}
        
   {% if week < old_week %}
      <font size="5"> <b> Week of: </b> 
      {% if dayname contains "Sun" %}
         {{ post.date | date: "%s" | minus : 518400 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}
      {% if dayname contains "Sat" %}
         {{ post.date | date: "%s" | minus : 432000 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}	
      {% if dayname contains "Fri" %}
         {{ post.date | date: "%s" | minus : 345600 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}
      {% if dayname contains "Thu" %}
         {{ post.date | date: "%s" | minus : 259200 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}	
      {% if dayname contains "Wed" %}
         {{ post.date | date: "%s" | minus : 172800 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}	
      {% if dayname contains "Tue" %}
         {{ post.date | date: "%s" | minus : 86400 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}	
      {% if dayname contains "Mon" %}
         {{ post.date | date: "%s" | minus : 0 | date: "%b %d, %Y %I:%M %p -0500" | uri_encode | replace:"+","%20" | date: "%B %e, %Y" }} 
      {% endif %}
      </font> <hr width="100%"> 			
      {% assign old_week = week %}
   {% endif %}
   
   <table style="width:100%">
   <colgroup>
    <col style="width: 33%" />
    <col style="width: 33%" />
    <col style="width: 33%" />
  </colgroup>     
   <p style="text-indent: 1em;"> <tr><td><a href="{{site.baseurl}}{{ post.url }}">{{ post.title }} </a></td>
   <font size="3"> <td>{{ post.date | date: "%A" }}</td>
   {% if author.name %}
      <td><i>{{ author.name }}</i></td> </font></tr>
   {% else %}
      </font></tr>
   {% endif %}
{% endfor %}
