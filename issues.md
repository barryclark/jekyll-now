---
layout: page
title: Issues
permalink: /issues/
---

<div class="text-center">
	<a href="#notizie-utili" class="btn btn-primary btn-lg" role="button">Notizie Utili</a>
	<a href="#alloggi" class="btn btn-primary btn-lg" role="button">Alloggi</a>
	<a href="#donazioni" class="btn btn-primary btn-lg" role="button">Donazioni</a>
	<a href="#fabbisogni" class="btn btn-primary btn-lg" role="button">Fabbisogni</a>
	<a href="#raccolte-fondi" class="btn btn-primary btn-lg" role="button">Raccolte Fondi</a>
</div>

---

<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<style>
#map{ height: 400px }
</style>

<div class="row"><div class="col-md-12"> <div id="map"></div> </div> </div>

---

# Notizie Utili
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Notizie Utili" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}

</div>

---

# Alloggi
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Alloggi" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>

---

# Donazioni
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Donazioni" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>

---

# Fabbisogni
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Fabbisogni" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>

---

# Raccolte Fondi
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Raccolte Fondi" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>

---

# Bollettino
<div class="list-group">
{% for member in site.data.issuesjson %}
{% if member.issue.labels contains "Bollettino" %}
<a href="{{ member.title | datapage_url: '/issues' }}" class="list-group-item">
	<h4 class="list-group-item-heading">{{member.title}}</h4>
	<p class="list-group-item-text">{{member.issue.data.descrizione}}</p>
</a>
{% endif %}
{% endfor %}
</div>

<script>
var markerList=[];
{% for member in site.data.issuesjson %}
{% if member.issue.lat != blank and member.issue.lon != blank %}
markerList.push([{{member.issue.lat}}, {{member.issue.lon}}, "{{member.title|uri_escape}}", "{{ member.number }}"]);
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
        }
}

map.addLayer(osm).setView([sumLat / markerList.length, sumLon / markerList.length], 6);

</script>
