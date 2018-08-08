---
layout: post
title: Stop & Frisk in DC
author: August Warren & Mahkah Wu
---	

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_header.png)

Summary
--------------

This analysis sets out to answer a few simple, yet complex, set of questions: 1) Who is being stopped and frisked by the DC Metropolitan Police Department (MPD)? 2) How does the stop and frisk population compare to the overall population in DC? 3) How much are different groups of people being disproportionally targeted by stop and frisk? 

The major takeaways from this analysis are:

* Overall, black residents, and particularly young black male residents, were stopped at a rate well in excess of both the proportion of black residents living in DC and the proportion of reported crime committed by black residents. At the same time, white residents were stopped at rate lower than their population and crime rate. This disproportionality persists within each of Washington DC's 39 racially diverse neighborhoods. 

* There exists a powerful linear relationship between the previous year's crime level and the current year's stop and frisk within each neighborhood in DC. However, neighborhoods with higher black populations have greater rates of stop and frisk than a crime-only model would suggest.

---

*A few caveats to some of the claims mentioned above and throughout this research. Firstly, a higher crime rate in a specific neighborhood does not necessarily reflect the behavior of the residents in that neighborhood; people are transient and cross borders frequently. Secondly, stop and frisk is very prone to the [observer effect](https://en.wikipedia.org/wiki/Observer_effect_(physics)); as a community is increasingly surveilled and has forcible contact with the police there might be more crime reported/observed by police. Finally, even if reported crime rates are higher among a certain group, that does not warrant increased harassment by law enforcement.* 

---	

The analysis also provides a number of interactive visualizations that can allow users to look for specific trends and patterns not covered in the analysis.  

Background & Introduction
--------------

A stop and frisk, or Terry stop, are investigatory detentions that police may initiate based on reasonable suspicion that the detained individual is engaged, or about to engage, in criminal conduct. In addition, police may conduct a limited search for weapons in order to protect the officer or public safety when the officer has reasonable suspicion that a stopped individual is “armed and dangerous.” While police may only initiate a frisk to search for weapons, they may seize contraband discovered during the frisk. In both cases, the standard of reasonable suspicion means that police must point to specific and articulable facts, although a set of individually innocuous facts may meet the standard for reasonable suspicion.

Named for the Supreme Court case that defined this authority, Terry v. Ohio, 392 U.S. 1 (1968), Terry stops rose to prominence through controversy over racial profiling in the NYPD’s “stop, question, and frisk” policing strategy. At its height in 2011, the NYPD made 685,724 stops; the vast majority, over 85%, of these stopped were African American or Latino. Proponents argue that it preempts crime by allowing officers to intervene and check for illegal weapons that may be used in future crimes, while opponents argue that the law allows police officers to harass people of color with weak, or non-existent, reasonable suspicion of criminal conduct. [Research shows inconclusive evidence that NYPD’s stops had few effects on robbery and burglary, though most research cautions from drawing definite conclusions on the impact of stop and frisk.](https://doi.org/10.1080/07418825.2012.712152)

[Racial bias in the NYPD’s policing program has been studied extensively]( https://doi.org/10.1080/07418825.2012.712152), but incident-level data on the MPD's use of stop and frisk was only released earlier this year. The full dataset, [found here along with further documentation](https://mpdc.dc.gov/publication/stop-and-frisk-data-and-explanatory-notes) spans from 2010 through 2017 and contains demographic information about the person stopped as well as the time and location of the stop. 

This dataset provides some opportunity to examine policing policy in the District, but ultimately falls well short of documenting MPD’s stop and frisk to the extent required by law.  In 2016, the DC City Council passed the Neighborhood Engagement Achieves Results Amendment Act of 2016, or the NEAR Act. The legislation was designed to be a "comprehensive, public health-based approach to crime prevention and intervention", as described by its author [Kenyan R. McDuffie, Council-member for Ward 5](http://www.kenyanmcduffie.com/nearact/). Collecting richer data on felony crimes, stops and frisks, and use of force incidents was a key element of the law. Since 2016, [the MPD has failed to comply with this provision by omitting critical data on stop and frisk incidents, including what facts justified the stop, whether a frisk was initiated, and whether an arrest was made](https://www.wusa9.com/article/news/investigations/dc-police-not-following-law-requiring-stop-and-frisk-data-collection-2-years-after-it-was-passed/65-532319128).

Various DC advocacy organizations, including Black Lives Matter DC, Stop Police Terror Project DC, and the American Civil Liberties Union of the District of Columbia, have petitioned and FOIA-ed the MPD to release the data. However, as the [Washington City Paper reports](https://www.washingtoncitypaper.com/news/city-desk/article/21001436/councilmembers-and-activists-demand-to-see-mpds-stopandfrisk-data), the MPD denied the initial FOIA request in 2017 because the data collection systems (required by law) had not been put in place. A year later, these  organizations again requested this information and were denied for the same season. Now the groups are further [suing the Mayor's office](https://www.acludc.org/en/cases/black-lives-matter-dc-v-bowser) to either release the detailed data or, if the data is truly lost, begin collecting the data, as required by law.

DC Judiciary and Public Safety Chairman Charles Allen questioned DC Police Chief Peter Newsham as to why the mandated data had not been collected earlier this year; Newsham stated that the MPD [was "guilty" of not following the stop and frisk data collection](https://www.wusa9.com/article/news/local/dc/dc-police-chief-police-guilty-of-not-following-stop-and-frisk-data-collection-law/65-533509822), but it has worked to develop other data systems mandated by the NEAR Act. The MPD has found the resources and time to building other data systems, including those that highlight crime rather than enforcement, like [DC Crime Cards](https://dcatlas.dcgis.dc.gov/crimecards/).

We didn't come into this project familiar with the inner workings of the NEAR Act or the steps the MPD has taken towards compliance. Rather, all of this is to say that there are questions other researchers have tackled that we wanted to investigate in DC, like [this really incredible research on racial disparities in "hit-rates," or arrest rates](https://5harad.com/papers/frisky.pdf), but we were confronted with a lack of detailed data. We will follow the ongoing lawsuit against the MPD and the Mayor's office and update the work below if further data is provided. If you want to see the NEAR Act fully implemented or want to hold law enforcement accountable and transparent, please consider supporting the work being done by organizations like [Black Lives Matter DC](http://www.blacklivesmatterdmv.org/), [Stop Police Terror Project DC](https://www.sptdc.com/), and [the American Civil Liberties Union of the District of Columbia](https://www.acludc.org/en) in their legal fight.

This a living piece of research that attempts to provide a sense coe understanding of a very complex social issue, and we are open to new ideas and viewpoints that we might have missed.  

Stop & Frisk: Overview
--------------

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/01_monthly_sf.png)

The number of monthly stop and frisk incidents generally has increased  since the MPD started collecting and reporting data in 2010. Interestingly, there was a noticeable drop in incidents near the end of 2014.  However, since that initial drop, there has been a rapid increase in monthly stop and frisk incidents across the city, peaking in the summer of 2016. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/03_census_sf_race.png)

Overall, the vast majority of these incidents involve people of color, specifically black people. Between 2010 and 2016, ~80% of all stop and frisk incidents involved black residents, while black residents account for ~48% of the DC population, as of the last decennial census in 2010. Certain racial/ethnic groups such as Asian and people classified as "Unknown" in the police report represent a very small portion of the overall population and in order to not draw misleading statistical conclusions from a very small subgroup, they were dropped from subsequent analysis.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_race_youths.png)

Age is another important factor in this conversation. Many of the stories underwriting the national conversation about race and policing have involved black youths and the police, often with fatal results. DC does not present a different story. Nearly 1 in 5 black residents stopped from 2010-2017 were children, compared to 2% among whites. This gap represents a difference in how people in different communities view policing and forcible interactions with the police starting from a young age. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_age_dist.png)

Among adults stopped by police, black and Hispanic/Latino residents skew younger than white residents. The graph above shows the overall distribution of people stopped by police by race/ethnicity. The median age of black and Hispanic/Latino people stopped by police is 27, compared to 30 for whites. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/02_time_of_day_sf.png)

Generally, the majority of stop and frisk incidents occur after 5:00 PM and before 6:00 AM. There are some minor differences among racial lines. Incidents among whites peak in the late/early hours between 1:00 AM - 4:00 AM, while black residents experience higher frequency of incidents during the evening, with the highest proportion of incidents occurring around 9:00 PM.

Forcible vs. Non-Forcible Incidents 
--------------

Along with the stop and frisk data, the MPD also reported on "field contact reports" from 2012 to 2016. The main difference between a field contact and stop and frisk, as the [documentation reports](https://go.mpdconline.com/GO/GO_OPS_304_10.pdf), is that field contact incidents are non-forcible stops and/or questioning between MPD and a citizen. Forcible contacts make up the lion's share of all interactions, accounting for more than 28,000 incidents over the five years data was collected, compared to about 11,000 non-forcible stops. 

For the majority of the preceding and later analysis, we made the decision to only look at forcible stop and frisks. However, we'll spend a bit of time looking at both forcible and non-forcible stops now.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/race_contact.png)

Overall, there is little difference in contact type by race. Black people comprised ~81% of both non-forcible and forcible; however, the proportion of non-forcible stops was slightly higher than the proportion of forcible stops among white people, around 2.6% higher (though the total number of forcible stops in general is much higher than the non-forcible stops). 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/gender_race_contact.png)

Across all racial groups and stop types, people identified by MPD as male comprise a majority of incidents. However, there are some notable gender differences by contact type. Overall, women, especially white women, made up a greater proportion of non-forcible than forcible contact with the police. 

Unlike the forcible stop and frisk incidents, the field contact incident data contains a record of what led to the contact, along with the standard demographics.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/reason_for_stop.png)

Keeping the important difference between forcible and non-forcible stops in mind, we see that moving violations are the catalyst for nearly half of the non-forcible encounters among whites, while blacks and Hispanic/Latinos were cited more frequently for "Suspicious Vehicles/Persons/Activities" and "Call for Service" (or, someone calling the police).

Mapping Stop & Frisk Incidents
--------------

A critical part of the data provided by the MPD is a rough location of where the incident took place, something along the lines of '4200 BLOCK OF 7TH STREET SE.' In order to get a mappable dataset, we extracted the incident street name and address then merged the data to a full list of block centroids (provided by [DC OpenData](http://opendata.dc.gov/datasets/block-centroids)).

Overall, we were able to match ~95% of the incidents provided by MPD to a latitude and longitude (The remaining addresses were either missing or not specific enough to be matched).

Once we were able to transform the addresses to latitude and longitude, for this analysis, we used the R geospatial package 'sp' to classify each matched incident to one of 39 neighborhood clusters in DC to conduct the rest of the analysis presented here. Mahkah created a district-wide map of stop and frisk incidents over the years by race/ethnicity and gender broken out by ward, neighborhood, police sector, police service area, and census tract. The mapping and data can be found here: (https://github.com/mahkah/dc_stop_and_frisk)

<figure class="video_container">
<iframe width="800" height="600" src="https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>

Stop & Frisk: Neighborhoods
--------------

For the remainder of the analysis, we will use DC's 39 neighborhood clusters as the unit for analysis and comparison, looking at trends across and within neighborhoods.

If anyone [feels strongly about the neighborhood boundaries used](https://www.popville.com/2018/01/official-north-boundary-petworth-is-kennedy-street/) and wants more information on the boundaries of the neighborhood clusters, check out the [DC OpenData Portal](http://opendata.dc.gov/datasets/neighborhood-clusters).

The interactive visualization below lets you dig into some basic trends and demographic profiles of each of the 39 neighborhood clusters in DC, which we'll be digging into in more depth shortly. For example, there are notable differences in stops by time of day in more residential neighborhoods like Brightwood Park/Crestwood/Petworth versus neighborhoods with a more active nightlife like Kalorama/Adams Morgan/Lanier Heights.

<figure class="video_container">
<iframe width="800" height="600" src="https://dc-stop-frisk.herokuapp.com/" frameborder="0" allowfullscreen="true"></iframe>
</figure>


![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/05_nbh_sf.gif)

Since 2010, Petworth, Columbia Heights, Congress Heights, and Downtown/Chinatown have racked up the highest amount of stop and frisk incidents among DC neighborhood clusters. However, I wanted to make sure that the analysis wasn't simply measuring neighborhood population density (or where all the people are), so I also ran the number of stop and frisk incidents as a function of neighborhood population (again using 2010 census).

Once we adjust for neighborhood population, we see some big changes in stop and frisk patterns. Columbia Heights/Petworth and Congress Heights/Bellevue no longer stand out, while neighborhoods like Historic Anacostia and Brookland/Brentwood become more prominent once normalized for their relatively low populations.

Another important note: population in DC is a weird thing. Some areas, like Downtown/Chinatown are densely populated during work hours and happy hour, but have a relatively small residential population. This is part of the reason why the Chinatown neighborhood's relative position doesn't change much after controlling for population. It has a relatively low census population but gets a high amount of foot traffic to museums and sports events.

Using neighborhood census data, we can look at the neighborhood-level breakdown of stop and frisk incidents by race compared to the neighborhood racial composition. The idea here is to see if we can identify disproportionality in stop and frisk at a neighborhood level -- whether certain racial groups are stopped or targeted at a greater rate than their actual representation in the neighborhood -- or, walking while black. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/06_nbh_sf_race.png)

Each dot represents a racial group in a given neighborhood. If the dot is  below the diagonal line, then that racial group is stopped at a greater rate than actually live in that neighborhood. The dots are sized by number of total number of incidents from 2010 to 2016.

We can see that, for the black racial cohort, there are a few clusters. First, there is a cluster of neighborhoods at the very bottom of the plot that have less than 10% black residents, but black residents make up more than 50% of reported stop and frisk incidents. Second, there are a number of neighborhoods with 25% to 50% black residents with 60% to 90% of stop and frisk incidents involving black people.  

On the other hand, there are a number of neighborhoods with a white population hovering around 75% where white residents are involved with 25-30% of all stop and frisk incidents within the neighborhood.

Falling between these two polar examples, stop and frisk rates with neighborhood tend to line up roughly with population proportion among Hispanic/Latinos.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/07_nbh_diff_black.png)

This chart shows the same disproportionality as the previous chart but focuses specifically on black residents stopped by MPD. It displays the proportion of stop and frisk incidents minus the census proportions, which is the distance between the points and the diagonal line in the previous chart. 

The biggest disproportions are apparent in whiter, more affluent neighborhood clusters in Northwest DC, including Cleveland Park, Friendship Heights, Kalorama Heights, and Georgetown.

Additionally, the table below lists out the actual numbers compared to the census 2010 proportions for each neighborhood in more searchable and accessible format for finding patterns by race within neighborhoods.

<iframe src="https://gwarrenn.shinyapps.io/stop_frisk_neighborhood_summary/" style="border:none;width:1000px;height:500px;"></iframe>

The Relationship between Crime and Stop & Frisk
--------------

Throughout this section it's important to keep the words of [Hadley Wickham](https://github.com/hadley/r4ds/blob/drafts/model-basics.Rmd) in mind: 

> "The goal of a model is not to uncover truth, but to discover a simple approximation that is still useful."

How would you answer the question, "what’s the best way to allocate police to reduce crime in the city?" Many might answer: send more officers to areas with the highest amount of reported crimes. 

I think that's how no-nonsense detective Lennie Briscoe might respond, at least.

In order to answer this question, I used crime data provided by the MPD, again through [OpenData DC](http://opendata.dc.gov/datasets?q=crime). Using a similar method as with the stop and frisk data, I matched individual reported crimes to each of the 39 neighborhoods using latitude and longitude provided by the MPD.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/08_crime_frisks.png)

The chart above illustrates a pretty linear relationship between the previous year's reported crime level and stop and frisk in each neighborhood of DC. Of course, there are dozens and dozens of other confounding variables that influence crime and policing behavior not being considered in this simplistic approach, but if you were only to use this one variable to predict stop and frisk, you would end up with a model<sup>1</sup> like this:

<table style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td>Average Stop & Frisk</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Average previous year crime</td><td>0.094<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.007)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>-0.469</td></tr>
<tr><td style="text-align:left"></td><td>(8.602)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>39</td></tr>
<tr><td style="text-align:left">R<sup>2</sup></td><td>0.814</td></tr>
<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.809</td></tr>
<tr><td style="text-align:left">Residual Std. Error</td><td>31.901 (df = 37)</td></tr>
<tr><td style="text-align:left">F Statistic</td><td>161.745<sup>***</sup> (df = 1; 37)</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>

The "crime-only" model that we've created shows a pretty strong relationship between the previous year's crime level and current year's stop and frisk level with an R-squared of about .81. More specifically, for one unit of increase in a neighborhood's previous year crime rate, the number of stop and frisks in the current year will increase by a factor of 0.09. So, for example, if a neighborhood with 100 more crimes in the previous year than another neighborhood, the "crime-only" model estimates that neighborhood will have nine more stop and frisk incidents in the current year, on average.

With that in mind, we can use this model to predict the next year's rate of stop and frisk in any given neighborhood and then use the current year stop and frisk to test/validate the model's performance. We'll look more closely at the model's residuals and how they vary by neighborhood. A model's residuals essentially measure how far off the predicted value was from the actual value. In this case, they measure how many stop and frisk incidents did the model predicted versus how many actually occurred. 

The chart below plots the neighborhood-level crime-only model residuals by the neighborhood proportion of residents of color (again from the 2010 census). 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/09_crime_model_residuals.png)

When viewed through a racial context, this "crime-only" approach to modeling stop and frisk appears to have its limits; it generally overpredicts the number of stop and frisk incidents in whiter neighborhoods and under predicts the amount of stop and frisk in neighborhoods with higher concentrations of people of color. If police were solely to use crime as a decision-making data point then we would expect to see equal distribution of residuals across neighborhoods with varying levels of residents of color. This indicates that there is something else driving the relationship between stop and frisk and crime (and it might have something to do with race).

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/10_sf_crime_nbh_race.png)

Despite having lower levels of crime than racially diverse neighborhoods, the neighborhoods with the highest concentration of residents of color -- like Ivy City/ Arboretum/Trinidad/Carver, Langston/Woodridge/Fort, and Lincoln/Gateway -- have astoundingly high rates of stop and frisk. This tracks with what we saw earlier in the chart showing total stop and frisk adjusted for neighborhood population; specifically, the neighborhoods that have higher proportions of non-white residents tend to have lower populations but higher levels of stop and frisk per capita. As a reminder, this chart does not take into account the race of the crime/stop and frisk incident, but we'll get into that next.

The Benefit (and lack thereof) of the Doubt
: Person-level Crime and Stop & Frisk Relationship
--------------

While the previous analyses were illuminating, there were certain limitations inherent in the data. Specifically, all of the charts and models were looking at all crime and stop and frisk in each neighborhood, regardless of race on the incident-level. This method was used because of the available data; the MPD releases all years of crime stripped of any demographic data of the assailant, with one exception. In March 2018 (shortly after starting this analysis endeavor), the MPD released person-level crime data with demographic data of [felony crime incidents in 2016](http://opendata.dc.gov/datasets/felony-crime-incidents-in-2016).

We can use this data to test a burning question: Is the stop and frisk rate higher/lower than the reported crime rate for various racial groups in DC? 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/11_nbh_crime_sf_race_scatter.png)

Similarly to how we looked at stop and frisk as it compares to neighborhood racial composition, the chart above shows the relationship between the proportion of stop and frisk and crime by neighborhood and racial group. If a dot is below the diagonal line, then the group is stop and frisked at a higher rate than the crime rate for that group in that neighborhood, and vice versa. We find a similar, but more pronounced disproportionality across all neighborhoods in DC, where black residents are stopped at a higher rate than their racial group accounts for in the overall neighborhood crime rate. On average, the stop and frisk rate among black residents is ~30% higher than the reported crime rate among blacks.

Likewise, the stop and frisk rate is lower than the reported crime rate among whites across the majority of DC neighborhoods, with a crime rate 5% higher than the stop and frisk rate. A further breakdown by neighborhood and racial group is below. A guide to interpretation: if a racial group is plotted at less than 0, then the group is stopped at a greater rate than the reported crime rate in the neighborhood for that group. The reverse is true if the group is plotted at greater than 0. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/12_nbh_diff_crimes.png)

Similar to the population comparison, Cleveland Park/Woodley Park, Downtown Chinatown, and Shaw/Logan Circle stand out as containing the highest disproportionality between black and white residents.

Building off the "crime-only" model, now that we have access to demographic crime data, we can start to look at the relationship between stop and frisk using individual demographics of those stopped, rather than a neighborhood level as we did previously. Except rather than using a linear regression to model the data, we'll use a Poisson regression, which is specifically geared toward modeling count data. This work is largely built off the research conducted by [Gelman, Fagan and Kiss (2007)]("http://www.stat.columbia.edu/~gelman/research/published/frisk9.pdf") examining stop and frisk in New York City in the late 1990's. The specific Poisson model used here will estimate stop and frisk for each neighborhood and take the total number of crimes for that racial group as an offset (Gelman et al. used the previous year, however we only have access to the same year's crime data by race). The model controls for the race of the person stopped and the racial composition of the neighborhood in which they were stopped.

<table style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td>Stop & Frisk</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Race: Black</td><td>1.280<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.189)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Race: Hispanic/Latino</td><td>1.188<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.232)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 10% - 40%</td><td>-0.149</td></tr>
<tr><td style="text-align:left"></td><td>(0.157)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 40% - 60%</td><td>-0.143</td></tr>
<tr><td style="text-align:left"></td><td>(0.178)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 60% - 80%</td><td>-0.446<sup>**</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.169)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 80% - 100%</td><td>-0.595<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.154)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>-2.669<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.207)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>89</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>


There are plenty of great (better*) resources on the internet/in the public domain that can explain the details of Poisson regressions. However, if you're like me and just want to skim the relevant Cross-Validated/Stack Overflow posts to know the gist of how the model should be interpreted, then here's a quick explanation of the results above: The parameters displayed represent the multiplicative increase in stop and frisk for all neighborhood race compositions compared to the specific base factor. For the race independent variable, the base category is white and for the neighborhood black compositions, the base category is 0% - 10% black.

Translation: Across all neighborhoods in the District, black and Hispanic/Latino residents are stopped at a rate higher than their crime rate and are stopped 3.6 (\exp(1.28)) and 3.3 (\exp(1.188)) times more than white residents respectively, controlling for each group's crime rate and neighborhood racial composition.

Similarly to how we previously looked at the residuals of the "crime-only" linear model by neighborhood racial composition, we can investigate how well this model performs through a racial lens.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/poisson_residuals.png)

Seeing as we included both neighborhood race and individual incident race/ethnicity into this model, it makes sense that we see marked improvements in the model's residuals. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/13_poisson_plot.png)

Following in the footsteps of Gelman et al., the chart above shows the estimated rates each racial group were stopped by neighborhood racial composition. The pattern we observed at the District-level tends to hold true across neighborhoods of varying racial composition; Black and Hispanic/Latino residents are stopped at higher rates than white residents across all neighborhood types. 

Notes & Thanks
--------------

All of the code used for this project can be found here: (https://github.com/GWarrenn/dc_data/tree/drafts/03_stop_frisk) and all of the data can be accessed through the DC OpenData Portal.

Thank you to the DC Office of the Chief Technology Officer and the DC Metropolitan Police Department for making the data used in this analysis readily available and accessible.

Footnotes
--------------
<sup>1</sup> For the "crime-only" model I created a simple linear regression in R using the lm() function. The independent variable was the previous year's average amount of crime in the neighborhood and the dependent variable was the current year's average amount of stop and frisk, as illustrated below.  

```R
yearly_model <- lm(formula = avg_sf ~ avg_prev_yr_crime,
   data = nbh_sf_avg)
```
