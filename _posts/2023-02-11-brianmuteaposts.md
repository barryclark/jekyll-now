---
layout: post
title: 'Hello, and welcome to my hub for all my blog posts on DS, ML, DL and more!!'
published: true
---

{% if user %}
  Hello, {{ user.name }}!
{% endif %}

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.https://www.machinelearningnuggets.com/decision-trees-and-random-forests/ }}">{{ post.Decision Trees and Random Forests(Building and optimizing decision tree and random forest models) }}</a>
    </li>
  {% endfor %}
</ul>
