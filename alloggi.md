---
layout: page
title: Alloggi
permalink: /alloggi/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0/dist/leaflet.js"></script>
<style>
#map{ height: 400px }
</style>

<div class="row"><div class="col-md-12"> <div id="map"></div> </div> </div>
<div class="row"><div class="col-md-12">
<div class="list-group">
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Alloggi" %}
<a href="/issues/{{ member.number }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>
<div class="panel-footer">
<ul class="share-buttons">
  <li>Condividi:</li>
  <li><a href="{{memberUrl}}" title="Copia link"><img alt="Copia link" src="/img/icone/link.png"></a></li>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u={{memberUrl | uri_escape}}&title={{memberName|truncate:70|uri_escape}} | {{ site.title }}" title="Condividi su Facebook" target="_blank"><img alt="Condividi su Facebook" src="/img/icone/Facebook.png"></a></li>
  <li><a href="https://twitter.com/intent/tweet?url={{memberUrl |uri_escape}}&text={{memberName|truncate:50|uri_escape}}&via=terremotocentro&hashtags=terremotocentroitalia" target="_blank" title="Tweet"><img alt="Tweet" src="/img/icone/Twitter.png"></a></li>
 <li><a href="https://plus.google.com/share?url={{memberUrl |uri_escape}}" target="_blank" title="Condividi su Google+"><img alt="Condividi su Google+" src="/img/icone/Google+.png"></a></li>
 <li><a data-proofer-ignore href="mailto:?subject={{page.title}} | {{site.title}}&body={{memberName|uri_escape}}%20Clicca qui:%20{{memberUrl |uri_escape}}" title="Invia email"><img alt="Invia email" src="/img/icone/Email.png"></a></li>
</ul>
</div>
</div>
</div>

<script>
var markerList=[];
{% for member in filteredissues %}
{% if member.issue.labels contains "Alloggi" %}
{% if member.issue.lat != blank and member.issue.lon != blank %}
markerList.push([{{member.issue.lat}}, {{member.issue.lon}}, "{{member.title|uri_escape}}", "/issues/{{ member.number }}"]);
{% endif %}
{% endif %}
{% endfor %}

// initialize the map
var map = L.map('map')

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var osmAttrib='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>';
var osm = new L.TileLayer(osmUrl, {minZoom: 6, maxZoom: 19, attribution: osmAttrib});


var sumLat = 0.;
var sumLon = 0.;
var countMarkers=0;

for (var i=0; i<markerList.length; i++) {

        var lat = markerList[i][0];
        var lon = markerList[i][1];
        var popupText = markerList[i][2];
        var popupURL = markerList[i][3];

        if (!isNaN(lat) && !isNaN(lon)) {
                var markerLocation = new L.LatLng(lat, lon);
                var marker = new L.Marker(markerLocation);
                map.addLayer(marker);

                marker.bindPopup("<a href=\"" + popupURL + "\">" + decodeURI(popupText) + "</a>");

                sumLat += lat;
                sumLon += lon;
                countMarkers++;
        }
}

map.addLayer(osm).setView([sumLat / countMarkers, sumLon / countMarkers], 6);

</script>
