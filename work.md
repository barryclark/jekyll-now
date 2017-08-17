---
layout: page
title: Projects
permalink: /work/
---

<ul class="portfolio-list">
	{% for project in site.data.projects %}
		<a href="{{project.external_url}}">
		  	<li>
		  		<div class="card">
		  			<div class="placeholder-image"></div>
					<!--<img src="{{ site.baseurl }}/images/{{ project.image }}">-->
					<div class="card-copy">
						<h2>{{project.name}}</h2>
						<p>{{project.description}}</p>
					</div>
				</div>
		  	</li>
	  	</a>
	{% endfor %}
</ul>