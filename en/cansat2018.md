---
layout: page
permalink: /en/cansat2018/
lang: EN
title: CanSat 2018
ref: cansat2018
---

At [ESA's German CanSat competition of 2018](https://www.cansat.de/wettbewerb-2018), we achieved the 4th place. Here you can find all the information about Apoapsis' first participation.

## Overview

<div class="page-banner">
  <img src="{{ site.baseurl }}/images/logo-1024x512.png" />
  <div>
    <p>Our mission is called <abbr title="Apoapsis is an astronomical term: It describes the furthest point of an orbit from the central mass.">Apoapsis</abbr>, with which we want to take part at the ESA's German CanSat competition of 2018.</p>
    <p><strong>What is a CanSat?</strong> A mini satellite at the size of a soda can.</p>
    <p><strong>What does our CanSat?</strong> It measures air pressure, temperature und particulate pollution.</p>
  </div>
</div>

## About us

We are the team Apoapsis from Vaterstetten. Our group consists of Niklas Cölle, Leon Hauser, Thomas Schlienz, Henrik Böving and Felix Edelmann, and we all attend the 11th grade of the Humboldt-Gymnasium Vaterstetten. With our CanSat, we want to measure the fine dust concentration of the atmosphere in higher air layers.

We were inspired by the project [luftdaten.info](http://luftdaten.info) of the OK Lab Stuttgart, which collects the measurements of public accessible fine dust sensors in real time and displays them on a public available map.

## The Team

<div class="page-banner">
  <img src="{{ site.baseurl }}/images/hgv-425x250.jpg" />
  <div>We're a group of five eleventh-graders from the <a href="http://www.humboldt-gym.de/">Humboldt-Gymnasium Vaterstetten</a> in Baldham near Munich.</div>
</div>

<section class="team-member-presentation" id="niklas">
  <img src="{{ site.baseurl }}/images/team-member-niklas.jpg" />
  <span>“I'm <strong>Niklas Cölle</strong>, the team's project leader. I'm responsible for the satellite's eletronics and control units. However, I also help with software development. I've always been interested in aerospace engineering and therefore wanted to work on a project like this one.”</span>
</section>

<section class="team-member-presentation" id="leon">
  <img src="{{ site.baseurl }}/images/team-member-leon.jpg" />
  <span>“My name is <strong>Leon Hauser</strong>. I assume the role of the ‘structural engineer’, since I'm interested in an engineer's career. I joined the project because I've been interested in the construction of aerospace vehicles for a long time and couldn't resign such an opportunity.”</span>
</section>

<section class="team-member-presentation" id="thomas">
  <img src="{{ site.baseurl }}/images/team-member-thomas.jpg" />
  <span>“I'm <strong>Thomas Schlienz</strong> and my departments are research and evaluation. I'm fascinated by the opportunities that modern satellite technologies offer us – that's what this project makes especially exciting. Working together in a team is also very rewarding to me.”</span>
</section>

<section class="team-member-presentation" id="henrik">
  <img src="{{ site.baseurl }}/images/team-member-henrik.jpg" />
  <span>“I'm <strong>Henrik Böving</strong>, one of our team's coders. As a developer and a python fan, I'm responsible for programming the CanSat and the ground station as well as for the evaluation of the collected data.”</span>
</section>

<section class="team-member-presentation" id="felix">
  <img src="{{ site.baseurl }}/images/team-member-felix.jpg" />
  <span>“My name is <strong>Felix Edelmann</strong>. As supporting member, I maintain the website and help with coding-related problems.“</span>
</section>

## Sponsors

<section class="sponsor-presentation" id="techmatrix">
  <a href="https://www.techmatrix.de/"><img src="{{ site.baseurl }}/images/sponsoren/Techmatrix_CMYK.png" /></a>
  <span>The company <a href="https://www.techmatrix.de/"><strong>Techmatrix Consulting GmbH</strong></a> from Neufarn supported our project with a donation.</span>
</section>

<section class="sponsor-presentation" id="watterott">
  <a href="https://www.watterott.com/"><img src="{{ site.baseurl }}/images/sponsoren/Watterott.png" /></a>
  <span>The company <a href="https://www.watterott.com/"><strong>Watterott</strong></a> supplied all CanSat teams with construction components worth 200€. We thankfully accepted their offer and received our GPS modules from them.</span>
</section>

<section class="sponsor-presentation" id="urs-investigators">
  <span>The former CanSat Team <a href="https://ursinvestigators.blogspot.com/"><strong>URSinvestigators</strong></a>, which took part at the German CanSat competition 2015 and at the European CanSat competition 2016, left us parachute silk and proper string over, which we gratefully received.</span>
</section>

<section class="sponsor-presentation" id="caas">
  <a href="http://www.carbontubes.eu/"><img src="{{ site.baseurl }}/images/sponsoren/caas.png" /></a>
  <span>The company <a href="http://www.carbontubes.eu/"><strong>CAAS</strong></a> from Slovenia helped us choosing the high-quality carbon composite pipe we will be using for the hull of our CanSat.</span>
</section>

## Blog posts (2018)

{% assign posts=site.posts | where:"lang", page.lang %}
{% for post in posts %}
{% if post.categories contains 'cansat2018' %}
<article class="post clearfix">
  <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> <span class="meta">{{ post.date | date: "%d/%b/%Y" }}</span></h3>

  {% if post.teaserImage %}
    <figure class="teaser-image">
      <a href="{{ post.url }}">
        <img src="{{ post.teaserImage }}" alt="{{ post.title }}" />
      </a>
    </figure>
  {% endif %}

  <div class="entry">
    {{ post.excerpt }}
  </div>

  <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read more</a>
</article>
{% endif %}
{% endfor %}