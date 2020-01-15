---
layout: jspage
title: Towing Capacity Calculator
permalink: /calculator/
icon: calc-200.png
---

<script src="{{ site.baseurl }}/js/towing.js">
</script>

**All data is in pounds**

## Vehicle data

{% for towing in site.data.towing.vehicle %}
<div class='input-group'>
<span class="input-group-prepend">{{towing.label}}:</span><input class="form-control" type="text" placeholder="{{towing.description}}" id="{{towing.id}}" aria-describedby="curbWeightHelp">
</div>
{% endfor %}

## Estimated Payload (in the vehicle)
{% for towing in site.data.towing.payload %}
<div class='input-group'>
<span class="input-group-prepend">{{towing.label}}:</span><input class="form-control" type="text" placeholder="{{towing.description}}" id="{{towing.id}}" aria-describedby="curbWeightHelp">
</div>
{% endfor %}

## Travel Trailer data
{% for towing in site.data.towing.trailer %}
<div class='input-group'>
<span class="input-group-prepend">{{towing.label}}:</span><input class="form-control" type="text" placeholder="{{towing.description}}" id="{{towing.id}}" aria-describedby="curbWeightHelp">
</div>
{% endfor %}

# Results
<div class="alert alert-danger payload-alert" role="alert">
Your payload exceeds your vehicle's limit
</div>
<div class='input-group'>
<span class="input-group-prepend">Available Payload:</span>
<input class="form-control" type="text" placeholder="0" id="availablePayload" aria-describedby="available payload" disabled>

</div>

<div class="alert alert-danger newgvw-alert" role="alert">
Your Gross Vehicle Weight is exceeded
</div>
<div class='input-group'>
<span class="input-group-prepend">New GVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgvw" aria-describedby="new gvw" disabled>

</div>

<div class="alert alert-danger newgcvw-alert" role="alert">
Your Gross Combined Vehicle Weight is exceeded
</div>
<div class='input-group'>
<span class="input-group-prepend">New GCVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgcvw" aria-describedby="new gcvw" disabled>

</div>

<div class='input-group'>
<span class="input-group-prepend">Towing Capacity:</span>
<input class="form-control" type="text" placeholder="0" id="newTowingCapacity" aria-describedby="actual towing capacity" disabled>

</div>
