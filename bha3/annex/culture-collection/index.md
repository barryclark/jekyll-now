---
layout: default
title: Culture Collection
permalink: /bha3/annex/culture-collection/
---

## Culture Collection

The following cultures are available in the Waag Society's Open Wetlab. In case you are following the Academy in one of the partner labs, check the availability with your coordinator:

{% for page in site.pages %}
{% if page.categories contains 'culture-collection' %}
{% if page.url contains 'bha3' %}
* [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
{% endif %}
{% endif %}
{% endfor %}

## Isolate yourself

* Lactic acid bacteria from unpasteurized dairy product like Yakult
* Acetobacter (acitic acid bacteria) from unpasteurized vinegar
* Yeast from unpasteurized beer like Grimbergen or Duvel
* Nitrogen fixating bacteria from soil
* Sulfuroxidizing bacteria from soil

## To be bought in a store

* Yeast can be found in the baking section of any supermarket
* Lactobacilli are sold as pills at any drug store

