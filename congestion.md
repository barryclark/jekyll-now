---
layout: page
title: Congestion during COVID-19
permalink: /COVID19/congestion/
---

It's relatively easy to measure volumes and speeds. It's harder to tell from that data if there is congestion at that location. Many companies provide city-wide congestion performance data for a hefty premium. I wanted to see if I could calculate the change in congestion by using public open data. [The city of Austin publishes bluetooth travel time sensor data at a number of locations.](https://data.austintexas.gov/Transportation-and-Mobility/Bluetooth-Travel-Sensors-Traffic-Match-Summary-Rec/v7zg-5jg9)

***

### Travel time

To reduce this massive dataset I only looked at peak hour travel times, from the volume data I was able to assume a city-wide peak hour of 4:30-5:30PM. The dates for this analysis is March 13 to May 15. I pulled 2020 and 2019 weekday data for those date ranges. If we calculate a weighted average based on the number of samples, we get a **30% drop in peak-hour travel times**. 

Travel time is more useful when looking at individual segments. Check out the list on the bottom of this post for each segment's change in travel time. 

***

### Travel time index

Travel time index is defined as the congested travel time divided by the free-flow travel time. A value close to 1 would mean there is no congestion, a value of 3 would mean it would take 3 times as long to complete that trip than if there was no congestion. 

To estimate a free-flow travel time I pulled 2019 weekday 5:00-6:00 AM and 7:30-10:00PM travel times. I assumed that a majority of the data in these ranges would be close to free-flow conditions but also have a suitable amount of samples. Last year saw a travel time index of 1.61, post-lockdown this year was 1.04. This is a **94% drop in congestion as compared to a year ago.** 

If we group by corridor:

![config.yml]({{site.baseurl}}images/Slopegraph_final.png) 


***

[Check out the processed dataset here.](https://github.com/Charlie-Henry/ModalShift/blob/master/Travel%20Time%20data.csv)

***

Travel time change by segment:

<iframe width="700" height="800" frameborder="0" scrolling="yes" src="//plotly.com/~charlie2343/72.embed?link=false"></iframe>

***
