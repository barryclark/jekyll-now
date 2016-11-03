---
layout: post
title: Mappa degli Alloggi
categories: mappe
---

Qui di seguito la mappa degli alloggi disponibili registrati ad oggi nei nostri sistemi.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>
<style>
#map{ height: 1000px; width: 100%; }
</style>

<div class="row"><div class="col-md-12"> <div id="map"></div> </div> </div>
<div class="row"><div class="col-md-12">
<div class="list-group">
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
</div>
</div>
</div>

<script>
var houseMarker = L.AwesomeMarkers.icon({
icon: 'home',
prefix: 'fa',
markerColor: 'green'
});
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
var osm = new L.TileLayer(osmUrl, {minZoom: 3, maxZoom: 19, attribution: osmAttrib});


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
                var marker = new L.Marker(markerLocation, { icon: houseMarker} );
                map.addLayer(marker);

                marker.bindPopup("<a href=\"" + popupURL + "\">" + decodeURI(popupText) + "</a>");

                sumLat += lat;
                sumLon += lon;
                countMarkers++;
        }
}

map.addLayer(osm).setView([sumLat / countMarkers, sumLon / countMarkers], 6);

</script>
