---
layout: default
title: Culture Collection
permalink: /biofactory/annex/culture-collection/
---

## Culture Collection

The following cultures are available in the Waag Society's Open Wetlab:

{% for page in site.pages %}
{% if page.url contains 'biofactory' %}
{% if page.categories contains 'culture-collection' %}
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

