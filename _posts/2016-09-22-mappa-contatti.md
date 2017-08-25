---
layout: post
title: Mappa dei Contatti
categories: mappe
---

Qui di seguito la mappa dei contatti utili registrati ad oggi nei nostri sistemi.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0/dist/leaflet.js"></script>
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
function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

var markerList=[];
{% for member in filteredissues %}
{% if member.issue.labels contains "Contatti" %}
{% if member.issue.lat != blank and member.issue.lon != blank %}
markerList.push([{{member.issue.lat}}, {{member.issue.lon}}, "{{member.title|url_encode}}", "/issues/{{ member.number }}", "{{member.issue.image}}"]);
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
        var popupIMG = markerList[i][4];

        if (!isNaN(lat) && !isNaN(lon)) {
                var markerLocation = new L.LatLng(lat, lon);
                var marker = new L.Marker(markerLocation);
                map.addLayer(marker);

                if(popupIMG) {
                        marker.bindPopup("<a href=\"" + popupURL + "\">" + urldecode(popupText) + "</a><br><img src=\""+popupIMG+"\" />");
                } else {
                        marker.bindPopup("<a href=\"" + popupURL + "\">" + urldecode(popupText) + "</a>");
                }

                sumLat += lat;
                sumLon += lon;
                countMarkers++;
        }
}

map.addLayer(osm).setView([sumLat / countMarkers, sumLon / countMarkers], 7);

</script>
