---
layout: jspage
title: Towing Capacity Calculator
permalink: /calculator/
icon: calc-200.png
---

<script src="{{ site.baseurl }}/js/towing.js">
</script>

## Vehicle data
<div class='input-group'>
<span class="input-group-prepend">Curb Weight:</span><input class="form-control" type="text" placeholder="Curb Weight in pounds" id="curbWeight" aria-describedby="curbWeightHelp"><span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">GVWR: </span><input class="form-control" type="text" placeholder="GVWR" id="gvwr" aria-describedby="gcvwrHelp"><span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">GCVWR: </span><input class="form-control" type="text" placeholder="GCVWR" id="gcvwr" aria-describedby="payloadHelp"><span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Payload: </span><input class="form-control" type="text" placeholder="Payload" id="payload" aria-describedby="payloadHelp"><span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Towing Capacity: </span><input class="form-control" type="text" placeholder="Towing Capacity" id="towingCapacity" aria-describedby="towingCapacityHelp"><span class="input-group-suffix">lbs</span>
</div>

## Estimated Payload (in the vehicle)
<div class='input-group'>
<span class="input-group-prepend">Passengers:</span><input class="form-control" type="text" placeholder="Passengers in pounds" id="passengers" aria-describedby="passengersHelp">
<span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Cargo:</span><input class="form-control" type="text" placeholder="Payload" id="cargo" aria-describedby="cargoHelp">
<span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Total Payload:</span><input class="form-control" type="text" placeholder="0" id="totalPayload" aria-describedby="payload" disabled>
<span class="input-group-suffix">lbs</span>
</div>

## Travel Trailer data
<div class='input-group'>
<span class="input-group-prepend">UVW:</span><input class="form-control" type="text" placeholder="UVW" id="tt_uvw" aria-describedby="uvwHelp">
<span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">GVWR:</span><input class="form-control" type="text" placeholder="GVWR" id="tt_gvwr" aria-describedby="ttGwvrHelp">
<span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Hitch Weight:</span><input class="form-control" type="text" placeholder="Hitch Weight" id="tt_hitch" aria-describedby="ttHitchHelp">
<span class="input-group-suffix">lbs</span>
</div>

# Results
<div class="alert alert-danger payload-alert" role="alert">
Your payload exceeds your vehicle's limit
</div>
<div class='input-group'>
<span class="input-group-prepend">Available Payload:</span>
<input class="form-control" type="text" placeholder="0" id="availablePayload" aria-describedby="available payload" disabled>
<span class="input-group-suffix">lbs</span>
</div>

<div class="alert alert-danger newgvw-alert" role="alert">
Your Gross Vehicle Weight is exceeded
</div>
<div class='input-group'>
<span class="input-group-prepend">New GVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgvw" aria-describedby="new gvw" disabled>
<span class="input-group-suffix">lbs</span>
</div>

<div class="alert alert-danger newgcvw-alert" role="alert">
Your Gross Combined Vehicle Weight is exceeded
</div>
<div class='input-group'>
<span class="input-group-prepend">New GCVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgcvw" aria-describedby="new gcvw" disabled>
<span class="input-group-suffix">lbs</span>
</div>

<div class='input-group'>
<span class="input-group-prepend">Towing Capacity:</span>
<input class="form-control" type="text" placeholder="0" id="newTowingCapacity" aria-describedby="actual towing capacity" disabled>
<span class="input-group-suffix">lbs</span>
</div>
