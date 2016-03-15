---
layout: page
title: Archive
---

Popular tags: <a href="#mathematics">Mathematics</a>, <a href="#machinelearning">Machine Learning</a>, <a href="#python">Python</a>


## Reverse Chronological

{% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %}


## Mathematics


<a name="mathematics"></a>

{% for post in site.posts %}
  {% for tag in post.tags %}
    {% if tag == "Mathematics" %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ site.baseurl }}{{ post.url }})

     {{ post.summary }}
    {% break %}
    {% endif %}
  {% endfor %}
{% endfor %}

## Machine Learning 

<a name="machinelearning"></a>

{% for post in site.posts %}
  {% for tag in post.tags %}
    {% if tag == "Machine Learning" %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ site.baseurl }}{{ post.url }})

     {{ post.summary }}
    {% break %}
    {% endif %}
  {% endfor %}
{% endfor %}

## Python


<a name="python"></a>

{% for post in site.posts %}
  {% for tag in post.tags %}
    {% if tag == "Python" %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ site.baseurl }}{{ post.url }})

     {{ post.summary }}
    {% break %}
    {% endif %}
  {% endfor %}
{% endfor %}