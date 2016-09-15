---
layout: page
title: Alloggi
permalink: /alloggi/
---
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Alloggi" %}
<a href="/issues/{{ member.title | datapage_url: '.' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>


  
    
    
  

