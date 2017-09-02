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
This function makes a request to `http://www.dundeetravelinfo.com/ajax_loadsiristopmonitoringrequest.asp?stopid=X` where `X` is the stop ID of the bus stop. It outputs [raw HTML](http://www.dundeetravelinfo.com/ajax_loadsiristopmonitoringrequest.asp?stopid=6400PT1691) which is then loaded into the map on Dundee's Travel Info website, but we could scrape this and create an API from this. 

This presents a bottleneck however, what are stop IDs?

You can perform an empty search on the map and it returns 20 bus stops, from there you can manually work out what the stop IDs are by clicking through them but there around 80 stops in Dundee's City Center *alone*, never mind the surrounding neighborhoods.

Luckily there is a very neat way around this. If you are not familiar with [data.gov.uk](https://data.gov.uk/) it is the UK Government's central repository for data which it has opened up. It is an absolute treasure trove of useful information. There is one dataset we are interested in for this project, specifically for finding our stop IDs. [The Department of Transport have a system called NaPTAN](https://data.gov.uk/dataset/naptan), which stands for National Public Transport Access Nodes, which contains data not just about buses but all methods of public transport.

The dataset is available in a few formats, I picked CSV for its ease. I was able to filter by the parent locality name, this presents the 1024 bus stops of Dundee. There is a lot of really useful information here such as stop names, geographic data and even the name of the local area. However the one column we are interested in here is the *ATOCCode*, which is our stop ID from before.

Now that we have a list of stop IDs, we can poll the webpage and scrape the data.
