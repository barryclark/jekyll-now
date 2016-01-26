---
layout: post
title: Fatal crashes by city
date: August 23, 2015
tags: [transportation]
permalink: Crashes-by-city
---

In [my last post]({{site.url}}/Crashes-in-Austin-and-Travis-Co/) I looked at the number of fatal automobile crashes in Austin over the past decade or so, to get a sense of just how unusual this past year has been (with [69 fatalities so far](http://kxan.com/2015/08/19/southbound-i-35-closed-at-airport-blvd-after-fatal-crash/)). Since I now know where to get data, I thought it would be interesting to look at how Austin compares to other cities in Texas. Making comparisons to other large cities in Texas is useful for a couple of reasons. First, it provides additional context for interpreting the number of crashes in Austin. Second, looking at changes in a couple of cities over time provides a better sense of how much year-to-year variability exists. 

I'm going to look at crashes for the six largest cities in Texas (in descending order of population: Houston, San Antonio, Dallas, Austin, Fort Worth, El Paso). The cities differ pretty dramatically in terms of their current population (from Houston, with over 2.2 million residents, to El Paso, with about 680 thousand) and in terms of their current population growth rates (Houston is growing by about 35,000 residents per year; Austin and San Antonio by 24-25,000; Dallas by about 20,000; Fort Worth by 16,000; and El Paso by 6,600). In order to make the crash statistics more comparable across cities, I calculate the number of crashes (or fatalities) per 100,000 residents. (I use Census Bureau data for the population statistics.) Since the population of each city is increasing over time, standardizing by the number of residents also adjusts for the differing rates of population grown. 

The chart below plots the annual rate (per 100,000 residents) of fatal crashes, fatalities, crashes in which incapacitating injuries occurred, incapacitating injuries, and total crashes, for each of the six cities. The 2015 numbers are based on a back-of-the-envelope projection (just multiplying the total as of July 31 by 12/7). Notes and sources are at the end of the post. If you prefer the un-standardized numbers, a version of the chart using the raw totals instead of standardizing by population [can be seen here]({{site.url}}/figure/2015-08-23-Crashes-by-city/crash_by_city-2-1.png).



![plot of chunk crash_by_city]({{site.url}}/figure/2015-08-23-Crashes-by-city/crash_by_city-1.png) 



The graph of the number of fatal crashes (per 100,000 residents) has several interesting features:

* Prior to 2015, Austin apparently had one of the lowest rate of fatal crashes and fatalities per capita. The city then jumped to second place (after Dallas, just ahead of Fort Worth) in 2015.
* Austin has also consistently had one of the lowest rates of total crashes per capita. 
* Austin's 2015 rate of fatal crashes per capita is not without precedent: Dallas and San Antonio have seen similar rates over the past several years.
* Dallas saw a very large decline in the rate of fatal crashes between 2008 and 2009, and has been creeping back up ever since. I haven't the slightest idea why the decline might have occurred---was it a change in transportation infrastructure? Or policing or first-responder time? Initially I thought that it could be due to some glitch with the Census Bureau population figures, but this seems unlikely because the decline is visible in [the raw numbers]({{site.url}}/figure/2015-08-23-Crashes-by-city/crash_by_city-2-1.png) too. It could be due to some change in how crashes were classified, though this too seems unlikely, considering that the data are collected state-wide and no drastic changes are apparent for other cities.
* The increase in the per capita rate of fatal crashes in Austin from 2014 to 2015 (projected) is the largest year-to-year change in any of the cities during this period. Same with fatalities per capita.

Standardizing by the total number of crashes instead of population size is one way---admittedly, a very rough one---to get at how hazardous it is to drive in each city. The chart below plots the number of fatal crashes as a proportion of the total number of crashes, for each city in each year. 

![plot of chunk fatality_rate_by_city]({{site.url}}/figure/2015-08-23-Crashes-by-city/fatality_rate_by_city-1.png) 

This figure demonstrates that Austin, over the past decade, been among the higher of the comparable cities in terms of the proportion of all crashes that are fatal. This year's spike in fatal crashes put Austin's fatality rate substantially higher than the other cities, at a level that is comparable only to Dallas over the period of 2006 through 2008. 

### Methods and caveats

Here's how I constructed these figures:

* The crash data for 2006 through 2009 are drawn from the [Texas Motor Vehicle Crash Statistics reports](http://www.txdot.gov/government/enforcement/annual-summary.html) and the crash data for 2010 through 2015 are drawn from the [CRIS Public File Extract](http://www.txdot.gov/government/enforcement/data-access.html).
* Population data for 2006 through 2009 are drawn from the [Census Bureau's historical intercensal City and Town estimates](http://www.census.gov/popest/data/intercensal/cities/cities2010.html). Population data for 2010 through 2014 are from the [Census Bureau's current City and Town estimates for Texas](http://www.census.gov/popest/data/intercensal/cities/cities2010.html). 2015 population estimates are projected by linear regression on 2010 through 2014.
* The incapacitating crashes and injuries numbers are only available starting in 2010, as prior to that time a different set of classifications was used that does not appear to be directly comparable.
* For 2015, projections are calculated by multiplying the actual number by 12 / 7 = 1.71 because the actuals are based on 7 out of 12 months. 
* The underlying crash data (drawing from both the annual reports and the CRIS database) are [available here]({{site.url}}/data/Yearly_crash_data_by_city.csv). 
* The code to re-create the figures is [available in this Gist](https://gist.github.com/2825b7e2a2b49ff2e61a.git).

Just as in my previous post, it is important to note that the major limitation of the above is that it is all based on annual figures. The very simple approach to projecting the annual totals for 2015 would be compromised by seasonal patterns in crashes or fatalities. 
