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

Journal club meetings currently take place on Mondays at 1:00 pm in the IACS Seminar Room.

**Join the club** by joining the [SBU Computational Neuroscience Google Group](https://groups.google.com/d/forum/sbu-computational-neuroscience/join)

# 2019 Spring Schedule
- February 11th: Ian Jordan
- February 18th: Piotr Sokół
- February 25th:
- March 3rd: No JC - Cosyne
- March 11th: Giancarlo La Camera
- March 18th:
- March 25th:
- April 1st: No JC - Prof. Tononi's lecutre
- April 8th: Josue Nassar
- April 15th: Junyan Song
- April 22nd:
- April 29nd:
- May 6th: Tong
- May 13th: Yanliang Shi
- May 20th: Sima Mofakham
- October 8th: No JC - Fall Break

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
