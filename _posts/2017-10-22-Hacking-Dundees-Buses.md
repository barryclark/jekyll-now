---
layout: post
title: Hacking Dundee's Buses
---

I have been looking for an excuse to learn and use Python, and I always find the best way for me to learn is to tackle something in a small project. I have also recently become very interested in real-time travel information for public transport. Most cities and countries offer real-time arrival and departure information for busses, trains and mass transit (trams, underground, light rail) and where I live and study in [Dundee](https://www.google.co.uk/maps/search/Dundee,Scotland?hl=en&source=opensearch) is no different.

[London offers a unified API from Transport for London](https://api.tfl.gov.uk/) which lets developers access information from across its vast network, as does [Manchester](http://www.tfgm.com/Corporate/Informationwehold/Pages/Transparency-and-Open-Data.aspx), [Edinburgh](https://tfe-opendata.readme.io/) and presumably more. [Network Rail](https://datafeeds.networkrail.co.uk/) and [National Rail](https://datafeeds.nationalrail.co.uk/) offer data for the UK Rail Network.

In any city which provide real-time information for buses on boards at stops, then you would expect some type of API - weather or not it's open - it is likely to exist.

> Quick aside, there is an international protocol developed in Europe which defines how real time travel data should be trasnmited, it's called [SIRI](https://en.wikipedia.org/wiki/Service_Interface_for_Real_Time_Information)

In Dundee, any bus stop with a shelter usually displays the next three or four arrivals at that stop. It displays the arrival in minutes, any bus which should arrive in under two minutes displays "DUE", once the bus has left the stop the listing clears. If for whatever reason there is no real-time data available, then the scheduled bus time is then displayed.

[Dundee has their own Travel Info website](http://www.dundeetravelinfo.com/default.asp), and on this website you are able click on a small map and find the bus stop you require. It's not the most user-friendly application out there, and since there is no open API, there is no opportunity to build more or improve.

I knew I wanted access to this data, but since there is no open API it wasn't exactly going to be straight forward. The map widget must be pulling the data from somewhere. I started by looking at the dependency's the webpage was pulling in. There was a `main.js` file which looked promising but nothing solid, as well as a few other local JavaScript files which helped plot on the map and handle it's search functionality. I found nothing after looking at the JavaScript files and assumed I had missed something, but after a second and closer search I found nothing promising.

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

You can perform an empty search on the map and it returns 20 bus stops, from there you can manually work out what the stop IDs are by clicking through them but there around 80 stops in Dundee's City Center *alone*, never mind the surrounding neighborhoods. The only pattern I noticed between the IDs are that they are all prepended with '6400' but aside from that, nothing.

Luckily there is a very neat way around this. If you are not familiar with [data.gov.uk](https://data.gov.uk/) it is the UK Government's central repository for data which it has _mostly_ opened up. It is an absolute treasure trove of useful information. There is one dataset we are interested in for this project, specifically for finding our stop IDs. [The Department of Transport have a system called NaPTAN](https://data.gov.uk/dataset/naptan), which stands for National Public Transport Access Nodes, which contains data not just about buses but all methods of public transport.

The dataset is available in a few formats, I picked CSV for its ease. I was able to filter by the parent locality name, this presents the 1024 bus stops of Dundee. There is a lot of really useful information here such as stop names, geographic data and even the name of the local area. However the one column we are interested in here is the *ATOCCode*, which is our stop ID from before.

Now that we have a list of stop IDs, we can poll the webpage and scrape the data. This was my first draft of the script below for just 

````python
import schedule
import time
import json

#import the library used to query a website
import urllib2

#import HTML parser
from bs4 import BeautifulSoup


def scrape():
	#set the URL which is being scraped
	url = "http://www.dundeetravelinfo.com/ajax_loadsiristopmonitoringrequest.asp?stopid=6400A55"

	#open the URL
	page = urllib2.urlopen(url)

	#parse the webpage
	soup = BeautifulSoup(page, "lxml")

	#print it
	#print soup.prettify()

	#fine the routes, destination & departure time
	routes = soup.find_all('div', class_='route')
	destinations = soup.find_all('div', class_='destination')
	departs = soup.find_all('div', class_='depart')

	stopDepartures = [];

	for route, destination, time in zip(routes, destinations, departs):
		
		details = {
			'route': route.string,
			'destination' : destination.string,
			'depats': time.string
		}

		stopDepartures.append(details)

		pass

	print json.dumps(stopDepartures)

schedule.every(1).minutes.do(scrape)

while True:
    schedule.run_pending()
    time.sleep(1)
````

Using BeautifulSoup, it scrapes the webpage of just one bus stop, and turns that into some JSON and it does that every minute.

This is nowhere as efficent as it absolutely could be. Firstly, this needs to include all the stops in the Dundee area (which is over 1000) however, not every stop reports realtime data, typically the more rural and less frequently used stops. It would also be helpful to turn this into either a RESTful API, something along the lines of `/stop/stopname` or similar. What might be really nice is a firehose approach, however I don't feel like there are enough movements to make full use of a firehose but that may be wrong.

It would also be preferable to not poll 1000+ webpages ever minute, so cutting out those stops which don't report data as well as being smarter with the scheduler would be beneficial to reduce computational and network load.

*TL;DR* There is also [this](http://www.travelinedata.org.uk/traveline-open-data/nextbuses-api/) which is Travellines's NextBus API for bus stops across the UK. But that's much less fun.

I'm still polishing the edges on the code and the API but I'll write a followup post once I'm satisfied.
