---
layout: default
title: Projects
permalink: /projects/
---

<div class="projects">		 +lol
   {% for project in site.projects %}		
     <article class="project">		
 		
       <h1><a href="{{ site.baseurl }}{{ project.url }}">{{ project.title }}</a></h1>		
 		
       <div class="entry">		
         {{ project.excerpt }}		
       </div>		
 		
       <a href="{{ site.baseurl }}{{ project.url }}" class="read-more">Read More</a>		
     </article>		
   {% endfor %}		
 </div>
