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

Journal club meetings currently take place on Wednesdays at 12:00 pm in seminar room of the Institute for Advanced Computational Science (IACS). Sometimes there are treats.

**Join the club** by emailing [David Hocker](mailto:david.hocker@stonybrook.edu?subject=computational journal club)!

# 2017 Fall Schedule

- September 20: David Hocker
- September 27: Piotr Sokol
- October 4: Phillip Kang
- October 11: Yuan Zhao (time change, TBA)
- October 18: David Hocker
- October 25: Memming Park
- November 1: Elliot Crooks
- November 8: Giancarlo La Camera
- November 15: Logan Becker
- November 22:  No meeting- Thanksgiving
- November 29: (TBA)
- December 6: (TBA)
- December 13: (TBA)
- December 20: (TBA)



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
