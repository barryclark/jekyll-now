---
layout: post
title: Mappa dei centri d'accoglienza dai Comuni dell'Aquila e di Rieti
categories: blog
---

Mappa dei centri d'accoglienza segnalati dai Comune dell'Aquila e di Rieti aggiornati al 18 Gennaio 2017.
Cliccare sulle icone per avere più informazioni.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0/dist/leaflet.js"></script>
<link rel="stylesheet" href="/css/OverPassLayer.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"></script>
<script type="text/javascript" src="/js/OverPassLayer.bundle.js"></script>
<style>
#map{ height: 400px; width: 100%; }
</style>

<div class="row"><div class="col-md-12"> <div id="map"></div> </div> </div>

<script>
{% raw %}

var houseMarker = L.AwesomeMarkers.icon({
icon: 'home',
prefix: 'fa',
markerColor: 'green'
});

var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: [attr_osm, attr_overpass].join(', ')
});
var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(42.39404,13.12141), 10);
var opl = new L.OverPassLayer({
    debug: false,
    endPoint: 'https://overpass-api.de/api/',
    minZoom: 10,
    markerIcon: houseMarker,
    query: 'node({{bbox}})["amenity"="social_facility"]["social_facility"="shelter"]["social_facility:for"="displaced"];out qt;',
    minZoomIndicatorOptions: {
        position: 'topright',
        minZoomMessage: 'Livello di zoom attuale: CURRENTZOOM - Minimo zoom per vedere i dati: MINZOOMLEVEL'
    }
});
map.addLayer(opl);

{% endraw %}

</script>
