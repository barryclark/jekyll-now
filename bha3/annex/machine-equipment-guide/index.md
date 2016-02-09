---
layout: default
title: Machine & Equipment Guide
permalink: /bha2/annex/machine-equipment-guide/
---

## Machine & Equipment Guide

Please use the following calender to book the machines in the Fablab during the days that are indicated as "Practical". Try to limit your reservations to 1 hour each.

For those of you who never used shared Google Calendar's before, here is a (guide to add this calendar to yours)[https://support.google.com/calendar/answer/37100?hl=en&rd=1].
Agenda-id: tl3tl6lvk9v21e5g0iudocof08@group.calendar.google.com

To make appointments, simply invite the shared agenda to the meeting through the "add guests" box.

{% include machine-calendar.html %}

Please read the following guides before using that particular machine or piece of equipment:

{% for page in site.pages %}
{% if page.url contains 'bha2' %}
{% if page.categories contains 'machine-equipment-guide' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
{% endif %}
{% endif %}
{% endfor %}