---
layout: post
title: Project Benson - A Subway Traffic Analysis
published: true
---
This blog, and this analysis was created as the first real step in my data science journey, as part of the [metis bootcamp](https://www.thisismetis.com/).  With four others - [Gray Davidson](https://github.com/Gray-Davidson-00/), [Arthur Meng](https://github.com/massdropper/), [Nicholas Beshouri](https://github.com/nbeshouri/), and [Joyce Tang](https://github.com/joyceetng00/) - we formed __Scrappy Data Solutions__, a (clearly) deeply knowledgable and experienced data science consultancy.  Our mission: to lay the groundwork for establishing a dynamic pricing model for subway advertisements based upon traffic through the station.  

## The Data
Our primary data source was the cumulative bulk turnstile entries in and out of each subway station, provided by the [MTA itself](http://web.mta.info/developers/turnstile.html).  Each turnstile nominally reports in every four hours - it would not take long for us to find some deviations from that pattern.  As a lifetime cumulative count, each turnstile's count ought only to increase with time.  Yet, there were a large number of turnstiles in which the counts decreased with time, suggesting a count in reverse.

![Reverse-counting turnstile](/images/benson/reverse.png)
**Figure 1.** A Turnstile at the 57 ST-7 AV station counting in reverse.


From the MTA, we took **1 year** of data, corresponding to the entirety of 2017.  In conducting our analysis, we made the decision to add entries and exits within a station together.  This would not only simplify our workflow, but also made sense within our advertising context - coming or going, commuters through a station would still pass by the advertisements.

In addition to considering time-of-day and day of the week, we wanted to examine the impact of weather on subway ridership, specifically rainfall.  For this, we queried the National Oceanic and Atmospheric Administration (NOAA), which conveniently operates a number of weather stations located across the country.  From this data, we were able to line up precipitation with changes in subway ridership.

## The Results
After joining our two datasets, and crunching the numbers, we were able to ascertain some relationships within the data.  Our first order of business was simply plotting the traffic of a sample of stations.  Other than a difference in magnitude between the busiest stations and others, which was to be expected, we noted that not all stations exhibited the typical morning and evening workday rush with a midday lull; some stations, such as the Canal St. station, maintained their traffic level throughout the day.

![Differences in traffic between stations](/images/benson/sample.png)
**Figure 2.** A sample of 5 MTA stations, with hourly entries and exits summed.


We were able to find some positive correlation between MTA ridership and precipitation.  At low levels of rainfall, there was little or no real impact, but as the level of rainfall increased past a certain point, more New Yorkers were inclined to ride.

![Precipitation correlated with ridership](/images/benson/rain.png)
**Figure 3.** Precipitation plotted against MTA ridership.



## The Takeaways
Our work for this project was relatively limited in scope - time constraints certainly restricted the amount of data we were able to pull in and examine.  Obvious extensions to the work already done would be to incorporate additional years of data, as well as additional variables, such as hourly wind or temperature.  Despite this, the work we completed sufficed to illustrate some of the factors that determine ridership on the MTA.   
[A more detailed presentation can be found here.](https://drive.google.com/open?id=1Fl8qNeVvkTOhQHpIoFnz1984CT7I-Y_0)
