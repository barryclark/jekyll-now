---
layout: post
title: Hacking Dundee's Buses
---

I've recently become very interested in real-time travel information, most cities and most modes of transport offer some kind of real-time information for transport. 

[London offers a unified API from Transport for London](https://api.tfl.gov.uk/) which lets developers access information from across its vast network, as does [Manchester](http://www.tfgm.com/Corporate/Informationwehold/Pages/Transparency-and-Open-Data.aspx), [Edinburgh](https://tfe-opendata.readme.io/) and presumably more. [Network Rail](https://datafeeds.networkrail.co.uk/) and [National Rail](https://datafeeds.nationalrail.co.uk/) offer data for the UK Rail Network.

In any city which provide real-time information for buses on boards at stops, then you would expect some type of API - weather or not it's open - it is likely to exist.

In Dundee, any bus stop with a shelter usually displays the next three or four arrivals at that stop. It displays the arrival in minutes, any bus which should arrive in under two minutes displays "DUE", once the bus has left the stop the listing clears. [Dundee has their own Travel Info website](http://www.dundeetravelinfo.com/default.asp), and on this website you are able click on a small map and find the bus stop you require. It's not the most user-friendly application out there, and since there is no open API, there is no opportunity to build more or improve.

I knew I wanted access to this data, but since there is no open API it wasn't exactly going to be straight forward. The map widget must be pulling the data from somewhere. I started by looking at the dependency's the webpage was pulling in. There was a `main.js` file which looked promising but nothing solid, as well as a few other local Javascript files which helped plot on the map and handle it's search functionality. I found nothing after looking at the Javascript files and assumed I had missed something, but after a second and closer search I found nothing promising.

However the answer was staring me in the face - in a collapsed `<script>` tag I found the following function.

````javascript
function loadSiriStopRealtime(marker,stopid){
	if (stopid == undefined){
		stopid = marker;
		marker = currMarker;
		//marker.openInfoWindowHtml("<div class='businfobox' style='width:300px'><h4>"+marker.arr.itemname+"</h4>loading...</div>");
		marker.bindPopup("<div class='businfobox' style='width:300px'><h4>"+marker.arr.itemname+"</h4>loading...</div>").openPopup();
	}
	if (stopid != ""){
		document.getElementById('ajaxloading-bus').style.display='inline';
		sendXmlHttpRequestGet("ajax_loadsiristopmonitoringrequest.asp?stopid="+stopid,loadSiriStopRealtimeRes,marker,null);
	}
}
````
