---
layout: page
title: Thoughts & Takeaways Archive
permalink: /COVID19/archive/
---

### August 26th thoughts & takeaways:

* Last week, traffic volumes ticked up 3.2%. However, over the past two months we've been pretty flat. We have yet to break the daily record set back on June 12th. 

* I've removed the Apple/Austin data comparison figure because I think the data is pretty biased and not very useful. 

* I've changed the volume forecast model to take into account the COVID-19 cases, rather than deaths. This data is from COVIDhub and is an ensemble model. To remove day-of-week affects, I've also decided to go with an average daily traffic per week analysis. 

* I've also included Google search trends data as well as Google mobility data. This allows for a scenario forecast where if we decided to end the lockdown completely we'd see a jump in traffic volumes (but not completely back to February levels), or vice versa where we'd go back to a March-level lockdown.


***

### August 17th thoughts & takeaways:

* This update is only for adding the volume projections graphic.

* Currently, the model only is seeing the reported (or projected) COVID-19 deaths and the day of the week. A 3rd degree polynomial provides the best fit for the data.

* Why do you show traffic decreasing? Note that the COVID-19 projections do not account for day-of-week variation while the traffic model does. This may cause some of those future weekend days to be much lower than expected. The weekdays seem more reasonable to me. 

* Ask questions on my twitter or contact me directly. This is my first time doing this so don't this projection super seriously. Please seek official information for making decisions about your health.

***

### August 14th thoughts & takeaways:

* Traffic volumes fell over the past couple of weeks, speeds are up sharply this week. Will have to look into this further to see if there were some changes at our study intersections.

* As for those study intersections, I've [finally included a map of the intersections](https://www.google.com/maps/d/edit?mid=1zGywOn2kiuE8hZK5PRbp72AStodktfoR&usp=sharing) the traffic volumes come from. 

* At the bottom I've included a graphic that I made that summarizes most of the datasets from February to July.

***

### August 1st thoughts & takeaways:

* Things have flattened out since the latest spike in cases. 1.2% decrease last week. 

* I've updated the static graphic showing trip types from Google data for Travis County. Check it out!

***

### July 22nd thoughts & takeaways:

* Last week we saw a 2.8% increase in volumes. The moving average has recovered back to where we were in the last week of June. The threat of additional lockdowns seem to have been squashed but schools won't be starting in-person for a while. 

***

### July 15th thoughts & takeaways:

* I'd like to shout out some fantastic modeling work done by Will Barbour and Vanderbilt. [They created a "rebound calculator"](https://lab-work.github.io/therebound/) that estimates travel time impacts based on mode changes due to COVID-19. 
* Here's a plot I created using the tool they included in their post. The big takeaway being that congestion in cities with more transit riders will be impacted much more than car-dependent cities like Austin. I compare a scenario where we kept the same mode split as we did in 2018 versus one where everyone drove alone. 

![config.yml]({{site.baseurl}}/images/AustinVSsf.png) 

* My initial thinking was have been that we would actually see improved traffic congestion in a post-COVID world. It's possible that is what we'll see in a car-dependent city like Austin but that won't be the same story in San Francisco or New York. It's also possible that we could see higher numbers of remote workers, especially if congestion got really much worse. I also didn't look at job losses, which would have a similar impact as working remotely. 

* Working remotely also generates trips, generally shorter, home-based trips and these aren't taken into account in more commute-centered modeling like this.

* One of the biggest riders of transit in Austin are school children. I wonder what the impact on school bus ridership will be.

***

### July 11th thoughts & takeaways:

* Not a whole lot changed over the past week, same trends that we've been seeing since the spike in cases began a few weeks ago. US mobility trends from Apple is also seeing a decrease.

* I've added a new section based on some positive feedback I've been receiving on the Google post-covid trip reports. That will be updated monthly, for now.

[Past Thoughts & Takeaways](http://modalshift.co/COVID19/archive/)

***

### July 6th thoughts & takeaways:

* Over last week, the traffic volume decreased 2.4%. 

* The 4th of July looks more like a regular Sunday and it follows what we saw on Memorial Day. Only about 1% higher than the volume seen on Memorial Day. 

![config.yml]({{site.baseurl}}/images/4th_compare.png) 

* Since Memorial Day wasn't particularly great for social distancing and staying at home, I'd say this isn't great news for keeping cases down. 

* I've been diving deep into that TSA data because I thought it was an interesting way to compare when cities locked down and how the virus is spreading. Here's a chart showing the relative difference in passengers through TSA checkpoints for a few airports I'm interested in:

![config.yml]({{site.baseurl}}/images/TSA relative.jpg) 

***

### July 2nd thoughts & takeaways:

* Much the same trends of decreasing traffic have continued, I've added a new chart to track the weekly % change in traffic. More lockdown measures have been rumored to be implemented after the long weekend.

* Here's a chart showing the change we've seen in type of traffic that is returning. Initially, weekend traffic was recovering much faster than the peak hours. This was probably fueled by good weather and cabin fever. In June this went negative as the weather heated up and the virus spread increased.

<iframe width="700" height="300" frameborder="0" scrolling="no" src="//plotly.com/~charlie2343/89.embed?autosize=true&link=false"></iframe>

***

### June 29th thoughts & takeaways:

* The last two weeks have seen decreasing volumes. Last week decreased 6.3%. I guess people are seeing the increasing cases and are deciding to stay home. 

* Sunday's volume was lower than Father's day. With the 3-day weekend coming up, we'll probably see daily volumes continue to drop. 

***

### June 26th thoughts & takeaways:

* Austin and Texas isn't doing so well on the fight against COVID-19. Volumes have started to dip downward, but it may have been caused by poor weather. Father's day was the lowest daily volume we've seen since the end of May.

* I've added some new data from TSA checkpoints. The data is updated every couple weeks. It'll be interesting to watch if the Austin share of USA traffic will start to nosedive with the increase in cases.  

***

### June 20th thoughts & takeaways:

* Daily traffic volumes have returned now to beyond 75-80% of pre-lockdown volumes. About half way recovered from the low point of 50-60% drop in April. Still largely on track for a late August recovery projection. Congestion will follow and we've already seen some locations in Austin where congestion is returning. 

* Austin is experiencing a lot of growth in cases, hospitalizations. It's not clear if people are traveling less or going back into lockdown but businesses certainly aren't. 

* Daily micromobility trips are now about 15-20% recovered from pre-lockdown numbers. These numbers are very day-of-week dependent. A sizable chunk of weekday trips are UT related, so we may not see these return for a while. 

* Many UT students are seeing that their classes are being moved online. Some students only have one or two in-person classes per week. The effects of this are pretty obvious, but transit is going to be hit hard.

***

### June 11th thoughts & takeaways:

* Traffic volumes increased by 26% in May, [but there are obvious reasons why this isn't the best way to measure the recovery.](https://twitter.com/aniccia/status/1270799838540517376)

* Another way to show this is that May's daily traffic volumes were 63% of pre-lockdown February. 

* It's not completely clear as to why speeds fell two weeks ago. There was some rainy weather  Wednesday night. Thursday night (5/28) was the beginning of the protests, but I wouldn't expect the protests to have an impact on the speeds at the intersections I look at.

* Black lives matter

***

### May 31st thoughts & takeaways:

* The past week has been eventful, to say the least. Between severe weather and protests average speeds have fallen sharply. Traffic incidents have increased as well. 

* Traffic volumes increased to a new high water mark on Friday. It was the highest volume in a single day since March 14th, the day after schools were closed.

* Over Memorial Day weekend, shared micromobility daily trip totals broke 1,000 for the first time since March 23rd. 

***

### May 27th thoughts & takeaways:

* I've changed some of the plots around and changed the intersections I've been looking at for the volume & speed plots. A few were locations stopped reporting data over the course of the past month so those were removed. 

* I've added a plot that compares Austin traffic vs national trends data from Apple. It sounds like the data comes from people requesting directions in Apple maps, which probably would skew from the normal amount during memorial day weekend. It appears that nationally the traffic has already recovered past the January 13th baseline Apple compares to.


***

### May 23rd thoughts & takeaways:

* Monday, Tuesday, Wednesday, Thursday's traffic volumes all were very similar. Yesterday only barely higher than the previous Friday which I thought was strange as it was the beginning of the long weekend and with all of the extra businesses that could open. That being said, it was the 2nd busiest day on Austin's roads since the beginning of the lockdown. 

* Last week I was curious what kind of traffic is actually returning to the roads over the past month of so. Is it people returning to work? People feeling cabin sick and heading outside? I pulled the data and grouped by a few analysis periods. From April 5th to May 2nd, weekend traffic was recovering the fastest, and nearly 4x as fast as the AM peak hour.

<iframe width="700" height="300" frameborder="0" scrolling="no" src="//plotly.com/~charlie2343/75.embed?autosize=true&link=false"></iframe>

***

### May 20th thoughts & takeaways:

* Check out the analysis I did below on travel time and congestion in Austin post-COVID. While traffic volumes have decreased around 40-50%, congestion has reduced 94% and travel times have been reduced by 30%.

* Volumes have started to bounce back now that weather has returned to being hot and humid.

***

### May 18th thoughts & takeaways:

* Friday night/Saturday morning's inclement weather caused the highest number of reported traffic incidents since the beginning of the lockdown. 

* The two rainstorms had a pretty major affect on the moving average, causing some data issues at some locations as I mentioned in the last update. As comparing to two weeks ago, only Tuesday and Saturday saw much less volume (-6%, and -2% respectively). I'd expect to see this downward curve start to rebound starting today as the forecast for this week is much better and with the 3-day weekend coming up.


***

### May 15th thoughts & takeaways:

* The decreasing trend in the traffic volumes is probably misleading on first glance. First of all, the bad weather on Tuesday reduced traffic volumes significantly. Also, it appears that the weather has caused on data issues at [Braker lane/Mopac]({{site.baseurl}}/images/braker@mopac.PNG). That location appears to now only be reporting half of the daily traffic. 

* Inclement weather is forecast for tonight, so this weekend I will take inventory of what count locations I will remove from the dataset to get a more representative sample going forward.

***

### May 13th thoughts & takeaways:

* The huge boost in traffic expected on Mother's Day didn't really happen. The volume on Sunday was higher than the previous week but not far from the trend that has been in place over the past two weeks. 

* Yesterday's volume was the lowest for a Tuesday since April 6th. This was caused by the significant rain we got yesterday. This is also shown in the slower speeds & higher number of traffic incidents. 

***

### May 10th thoughts & takeaways:

* The traffic volume recovery rate appears to be slowly increasing. This past week's growth is about 6% which is higher than the previous rate of about 10% per month. 

* It will be interesting to see Mother's Day traffic counts as it'll probably be significantly higher than the previous Sundays, which will have an impact on the moving average. With Memorial Day around the corner as well, who knows what traffic could look like at the end of the month. 

* I'm also curious about what kind of traffic is returning. Is it people commuting to work or people being more willing to do non-essential trips to salons, restaurants, parks, etc? Is it the economy being optimized for the post-Coronavirus world (Uber drivers switching to doordash or something similar)? Expect another post this week where I'll explore this.

***

### May 6th thoughts & takeaways:

* May 3rd & 4th traffic volume and speed data was missing multiple intersections but now seems to be fixed. The volumes on those days was estimated based on the available data on those days as compared to the previous Sunday/Monday. Sunday saw about 4% higher volumes and Monday was 2% less. 

* The recovery trend is still ticking along at the roughly linear pace since the low point of volumes on the first week of April. The Governor's new order will open more businesses on Friday and even more in the coming weeks. 

* Sunday's shared mircomobility trips was the most in a single day since March 19th. Friday's traffic volumes was the highest for a single day since March 18th. 

* I find it *incredibly* satisfying that the traffic incidents are following the same curve as traffic volumes.

***

### May 3rd thoughts & takeaways:

* Following the lifting the stay-at-home order for Texas, Friday's traffic volume was 8% higher than the previous Friday. The same trend remains true for Saturday's volumes. This was not significantly different than the trend we've been seeing over the past two weeks.

* Some have wondered if we'll see a "U-shaped" or "V-shaped" recovery from the shutdown. The linear trend following the end of the stay-at-home order bodes well for a Nike swoosh-shaped recovery. If you forecast out this trend line, traffic volumes would recover to the volumes we saw in February around September 1st. 

***

### May 1st thoughts & takeaways:

* The Governor's order to open restaurants and other businesses begins today. Yesterday's volume data was pretty much on par for what we saw last Thursday. Fridays are usually the highest volume day, since daily rush hour traffic combines with people traveling to locations for the weekend or other leisure activities. We'll see how this looks in the data tomorrow morning. I'll be watching the late evening (6-9pm) to see if we're getting higher volumes of people heading out to eat or whatever. 

* The Austin airport reported a [52% decrease](http://austintexas.gov/sites/default/files/images/Airport/news_releases/activity_report_year/2020/March_2020.pdf) in passenger traffic in March 2020 as compared to March 2019. KLM permanently canceled its new route of Amsterdam-Austin that was scheduled to launch this coming Monday. March 2020 was the least amount of passenger traffic for any 1-month period since February 2014. 

***

### April 29th thoughts & takeaways:

* Austin has seen about a 50% in traffic volumes and 10% increase in speeds since the beginning of the lockdown. It's hard to see if the speed data is at all interesting as the data is collected at signalized intersections. Some increased speeds may be caused by speeding drivers, but it also may be caused by decreased congestion. Something to look into later.

* Lyft scooters has decided to pull out of Austin permanently. The amount of shared mircomobility trips that we saw before COVID-19 may not return, ever. Many other providers were in shaky finaincal situations before the current crisis. 

* Traffic incident reports are down, but are fatalities or serious injuries down as well? Who knows for now, as the data takes a long time to collect and to be reported. However, higher speed vehicles and more pedestrians & cyclists is generally a bad combination.
