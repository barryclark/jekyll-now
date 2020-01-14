---
layout: jspage
title: Towing Capacity Calculator
permalink: /calculator/
---

<script src="{{ site.baseurl }}/js/towing.js">
</script>

## Vehicle data
<div class='input-group'>
<span class="input-group-prepend">Curb Weight:</span><input class="form-control" type="text" placeholder="Curb Weight in pounds" id="curbWeight" aria-describedby="curbWeightHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">GVWR: </span><input class="form-control" type="text" placeholder="GVWR" id="gvwr" aria-describedby="gcvwrHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">GCVWR: </span><input class="form-control" type="text" placeholder="GCVWR" id="gcvwr" aria-describedby="payloadHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">Payload: </span><input class="form-control" type="text" placeholder="Payload" id="payload" aria-describedby="payloadHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">Towing Capacity: </span><input class="form-control" type="text" placeholder="Towing Capacity" id="towingCapacity" aria-describedby="towingCapacityHelp">
</div>

## Estimated Payload (in the vehicle)
<div class='input-group'>
<span class="input-group-prepend">Passengers:</span><input class="form-control" type="text" placeholder="Passengers in pounds" id="passengers" aria-describedby="passengersHelp">

</div>
<div class='input-group'>
<span class="input-group-prepend">Cargo:</span><input class="form-control" type="text" placeholder="Payload" id="cargo" aria-describedby="cargoHelp">

</div>
<div class='input-group'>
<span class="input-group-prepend">Total Payload:</span><input class="form-control" type="text" placeholder="0" id="totalPayload" aria-describedby="payload" disabled>
</div>
## Travel Trailer data
<div class='input-group'>
<span class="input-group-prepend">UVW:</span><input class="form-control" type="text" placeholder="UVW" id="tt_uvw" aria-describedby="uvwHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">GVWR:</span><input class="form-control" type="text" placeholder="GVWR" id="tt_gvwr" aria-describedby="ttGwvrHelp">
</div>

<div class='input-group'>
<span class="input-group-prepend">Hitch Weight:</span><input class="form-control" type="text" placeholder="Hitch Weight" id="tt_hitch" aria-describedby="ttHitchHelp">
</div>
# Results
<div class='input-group'>
<span class="input-group-prepend">Available Payload:</span>
<input class="form-control" type="text" placeholder="0" id="availablePayload" aria-describedby="available payload" disabled>
</div>

<div class='input-group'>
<span class="input-group-prepend">New GVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgvw" aria-describedby="new gvw" disabled>
</div>

<div class='input-group'>
<span class="input-group-prepend">New GCVW:</span>
<input class="form-control" type="text" placeholder="0" id="newgcvw" aria-describedby="new gcvw" disabled>
</div>

<div class='input-group'>
<span class="input-group-prepend">Towing Capacity:</span>
<input class="form-control" type="text" placeholder="0" id="newTowingCapacity" aria-describedby="actual towing capacity" disabled>
</div>
