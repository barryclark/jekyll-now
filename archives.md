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
  <table style="width:100%">
     <colgroup>
      <col style="width: 33%" />
      <col style="width: 33%" />
      <col style="width: 33%" />
    </colgroup>  

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
        <tr><td colspan="3">
          <h1>Week of: 
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
          </h1> 
          <hr width="100%"> 
          </td></tr>			
          {% assign old_week = week %}
       {% endif %}
       
       <tr>
      <td><a href="{{site.baseurl}}{{ post.url }}">{{ post.title }} </a></td>
       <td><font size="3">{{ post.date | date: "%A" }}</font></td>
       {% if author.name %}
          <td><i>{{ author.name }}</i></td></tr>
       {% else %}
          <td></td></tr>
       {% endif %}
       
  {% endfor %}
