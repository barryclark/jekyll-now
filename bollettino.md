---
layout: page
title: Bollettino
permalink: /bollettino/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0/dist/leaflet.js"></script>
<style>
#map{ height: 400px }
</style>

<div class="row"><div class="col-md-12"> <div id="map"></div> </div> </div>

<div id="filtri" class="col-lg-12 col-md-12 col-lg-offset-1 col-md-offset-1">
<a href="#Aperte"><button class="btn btn-danger">Aperte</button></a>
<a href="#Chiuse"><button class="btn btn-danger">Chiuse</button></a>
</div>

<h3 id="Aperte">Segnalazioni Aperte</h3>

<div class="panel-group">
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Bollettino" %}
{% capture memberName %}{{member.issue.data.descrizione}}{% endcapture %}
{% assign memberId = member.number %}
{% capture memberUrl %}{{site.url}}/issues/{{member.number}}{% endcapture %}
<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
<a href="{{memberUrl}}">{{member.title}}</a>
</div>
<div class="panel-body">
{% if member.issue.data.descrizione %}
<div class="row">
<div class="col-md-12">{{member.issue.data.descrizione}}</div>
</div>
{% endif %}
{% if member.issue.data.data %}
<div class="row">
<div class="col-md-4"><b>Data: </b></div><div class="col-md-8">{{member.issue.data.data}}</div>
</div>
{% endif %}
{% if member.issue.data.indirizzo %}
<div class="row">
<div class="col-md-4"><b>Indirizzo: </b></div><div class="col-md-8">{{member.issue.data.indirizzo}}</div>
</div>
{% endif %}
{% if member.issue.data.link %}
<div class="row">
<div class="col-md-4"><b>Link: </b></div><div class="col-md-8"><a href="{{member.issue.data.link}}">{{member.issue.data.link}}</a></div>
</div>
{% endif %}
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
{% endif %}
{% endfor %}
</div>

<h3 id="Chiuse">Segnalazioni Chiuse</h3>

<div class="panel-group sieve">
{% assign filteredissues = site.data.issuesjson | where: "state","closed" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Bollettino" %}
{% capture memberName %}{{member.issue.data.descrizione}}{% endcapture %}
{% assign memberId = member.number %}
{% capture memberUrl %}{{site.url}}/issues/{{member.number}}{% endcapture %}
<div class="panel panel-info">
<div class="panel-heading"><span class="anchor" id="{{memberId}}"></span>
<a href="{{memberUrl}}">{{member.title}}</a>
</div>
<div class="panel-body">
{% if member.issue.data.descrizione %}
<div class="row">
<div class="col-md-12">{{member.issue.data.descrizione}}</div>
</div>
{% endif %}
{% if member.issue.data.data %}
<div class="row">
<div class="col-md-4"><b>Data: </b></div><div class="col-md-8">{{member.issue.data.data}}</div>
</div>
{% endif %}
{% if member.issue.data.indirizzo %}
<div class="row">
<div class="col-md-4"><b>Indirizzo: </b></div><div class="col-md-8">{{member.issue.data.indirizzo}}</div>
</div>
{% endif %}
{% if member.issue.data.link %}
<div class="row">
<div class="col-md-4"><b>Link: </b></div><div class="col-md-8"><a href="{{member.issue.data.link}}">{{member.issue.data.link}}</a></div>
</div>
{% endif %}
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
{% endif %}
{% endfor %}
</div>

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'bollettino' %}
      <article class="post">
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

<script>
var markerList=[];
{% assign filteredissues = site.data.issuesjson | where: "state","open" %}
{% for member in filteredissues %}
{% if member.issue.labels contains "Bollettino" %}
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
