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

# 2017 Spring Schedule

- January 18: David Hocker
- January 25: Tankut Can
- February 1: Adrián Soto Cambres
- February 8: Jonathan Rawski
- February 15: Arthur Zhao
- February 22,29:  no journal club, Cosyne meeting
- March 8: Logan Becker
- March 15: no journal club, Spring break!
- March 22: Luca Mazzucato
- March 29: Yuan Zhao
- April 5: Jin Wang (rescheduled)
- April 12: Giancarlo La Camera 
- April 19: Andrea Giovannucci (invited speaker, Simons Foundation)
- April 26: Memming Park
- May 3: Phillip Kang
- May 10: Jin Wang
- May 17: Naz Gulce



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
