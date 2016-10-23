---
layout: default
title: Computational Neuroscience Journal Club
permalink: /journalclub/
---
## Computational and Theoretical Neuroscience Journal Club at Stony Brook University

![cookies and science](/images/cookie.jpg){: .center-image}

As the tools in experiments neuroscience are rapidly developing, this is an important time to consider the broad trends and aims of the computational/theoretical works that are born alongside them.  Our aim is to present and discuss papers that reflect these modern directions so that we may better understand how our own work fits into a global neuroscience picture. Some themes and topics that we hope to cover are:

* computational models of neural systems
* novel analysis tools for understanding neural recordings
* recent advances in theoretical neuroscience
* popular theories in neuroscience

Journal club meetings take place on Tuesdays at 12:30 pm in the Life Sciences Building, grad student lounge conference room (LSB 550). Sometimes there are treats.

**Join the club** by emailing [David Hocker](mailto:david.hocker@stonybrook.edu?subject=computational journal club)!

# 2016 Fall Schedule

- August 16: Il Memming Park
- August 23: David Hocker
- August 30: Gregory Kirschen
- September 6: Luca Mazzucato
- September 13: Luisa Le Donne
- September 20: Jonathan Beck
- September 27: Gulce Nazli Dikecligil
- October 11: Giancarlo La Camera
- October 18: Yuan Zhao
- October 25: Arthur Zhao
- November 1: Jin Wang
- November 8: Shaohua Wang
- November 16: Sriram Ganeshan

You can pick or [**suggest papers**](https://www.google.com/url?q=https://docs.google.com/document/d/17SuoVIIDbCae5GnxSHGO5BW2zbVP6wBCbaGGfgFLAOQ/edit?usp%3Dsharing&sa=D&ust=1472068897083000&usg=AFQjCNF5f_dZMloe4l3jWOm_mhxe7utbqw) to be discussed.

# Past/Current Papers

<div class="posts">
  {% for post in site.posts %}
	{% if post.categories contains 'journalclub' %}
    <article class="post">
    {{post.olddate}}
    <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    </article>
	{% endif %}
  {% endfor %}
</div>
