---
layout: post
title: Towing Capacity Calculator
permalink: /calculator/
icon: calc-200.png
calc: true
jquery: true
---

<script src="{{ site.baseurl }}/assets/js/towing.js">
</script>

**This data is not sent or stored in our servers**

<div class='data-table'>
<div class='data-row'>
<div class='data-entry'>
<h1>Input Data</h1>
<h2>Towing Vehicle</h2>
  <div class="grid-container">
  {% for towing in site.data.towing.vehicle %}
    <div class="grid-label">
    {{towing.label}}:
    </div>
    <div class="grid-input">
    <input class="form-control" type="text" placeholder="{{towing.label}}" id="{{towing.id}}" aria-describedby="{{ towing.label }}" title="{{ towing.description }}">
    </div>
  {% endfor %}
  </div>

<h2>Estimated Cargo (in the vehicle)</h2>
<div class="grid-container">
  {% for towing in site.data.towing.payload %}
    <div class="grid-label">
    {{towing.label}}:
    </div>
    <div class="grid-input">
    <input class="form-control" type="text" placeholder="{{towing.label}}" id="{{towing.id}}" aria-describedby="{{ towing.label }}" title="{{ towing.description }}">
    </div>
  {% endfor %}
  </div>

<h2>Travel Trailer data</h2>
  <div class="grid-container">
  {% for towing in site.data.towing.trailer %}
    <div class="grid-label">
    {{towing.label}}:
    </div>
    <div class="grid-input">
    <input class="form-control" type="text" placeholder="{{towing.label}}" id="{{towing.id}}" aria-describedby="{{ towing.label }}" title="{{ towing.description }}">
    </div>
  {% endfor %}
  </div>


<div class='results'>
<h1>Results</h1>
  <div class="grid-container">
  {% for towing in site.data.towing.results %}
    <div class="grid-alert alert alert-danger {{ towing.id }}-alert" role="alert">
    {{ towing.alert }}
    </div>
    <div class='grid-label'>
      {{towing.label}}:
    </div>
    <div class='grid-item'><input class="form-control" type="text" placeholder="0" id="{{towing.id}}" aria-describedby="{{ towing.label }}" disabled>
    </div>
  {% endfor %}
  </div>
</div>
</div>
</div>
<hr/>
*Disclaimer: It is your responsibility to check all numbers and data for accurate information. This is not a replacement for your auto and trailer manufacturer's data. We can't take any responsibility for any wrongly introduced data. The information provided is for entertainment only.*
