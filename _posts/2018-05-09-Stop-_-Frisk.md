---
layout: post
title: Stop & Frisk in DC
author: August Warren & Mahkah Wu
---	

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_header.png)

Key Findings
--------------

* Overall, black residents, and particularly young black male residents, were stopped at a rate well in excess of both the proportion of black residents living in DC and the proportion of reported crime committed by black residents. White residents were stopped at a rate lower than the analogous population and crime proportions. Each of Washington DC's 39 neighborhoods have distinct racial makeups, but these disproportionalities persist within a majority of neighborhoods.

* There exists a strong linear relationship between a neighborhood's annual crime level and that neighborhood's stop and frisk level over the subsequent year. However, neighborhoods with higher black populations have a higher stop and frisk level than this relationship would suggest. Specifically, neighborhoods with the highest concentration of residents of color (90-100% residents of color) have, on average, ~47 more stop and frisk incidents per year compared to whitest neighborhoods (0-40% residents of color) when crime is held constant.

* In 2016, black residents were stopped at a rate 3 times higher than white residents across all DC neighborhoods when attempting to account for criminality by using the respective racial cohort's crime level as an offset. The rate generally increases in neighborhoods with a lower proportion of black residents.

* This analysis includes an [interactive map](https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html) and [neighborhood explorer application](https://dc-stop-frisk.herokuapp.com/) that enable users to look for trends and patterns not covered in this analysis.

---

*This research explores claims that seemingly racially skewed policing numbers are the result of police responding race neutrally to crime committed at racially disproportionate levels rather than implicit or explicit racial bias. This should not be conflated with suggesting that a higher crime rates among a particular group warrants over policing certain communities or profiling individuals. Additionally, because of data collection gaps, this analysis aggregated stop and frisk and crime levels at the neighborhood level, so a few caveats are warranted: Firstly, a higher crime rate in a specific neighborhood does not necessarily reflect the behavior of the residents in that neighborhood; people are transient and cross borders frequently. Secondly, criminal statistics are highly prone to the [observer effect](https://en.wikipedia.org/wiki/Observer_effect_(physics)): as a community is increasingly surveilled and forcibly contacted by the police, more crime may be reported to/observed by police.* 

---

Background & Introduction
--------------

A stop and frisk, or Terry stop, is an investigatory detention that police may initiate based on reasonable suspicion that the detained individual is engaged, or about to engage, in criminal conduct. In addition, police may conduct a limited search for weapons in order to protect the officer or public safety when the officer has reasonable suspicion that a stopped individual is "armed and dangerous." While police may only initiate a frisk to search for weapons, they may seize contraband discovered during the frisk. In both cases, the standard of reasonable suspicion means that police must point to specific and articulable facts, although a set of individually innocuous facts may meet the standard for reasonable suspicion when considered together.

Named for the Supreme Court case that defined this authority, Terry v. Ohio, 392 U.S. 1 (1968), Terry stops rose to prominence through controversy over racial profiling in the NYPD’s "stop, question, and frisk" policing strategy. At its height in 2011, the NYPD made 685,724 stops; the vast majority, over 85%, of these stopped were African American or Latino. Proponents argue that it preempts crime by allowing officers to intervene and check for illegal weapons that may be used in future crimes, while opponents argue that the law allows police officers to harass people of color with weak, or non-existent, reasonable suspicion of criminal conduct. [Research shows inconclusive evidence that NYPD’s stops had few effects on robbery and burglary, though most research cautions against drawing definite conclusions on the impact of the NYPD's stop and frisk program.](https://doi.org/10.1080/07418825.2012.712152)

[Racial bias in the NYPD’s policing program has been studied extensively]( https://doi.org/10.1080/07418825.2012.712152), but incident-level data on the MPD's use of stop and frisk was only released earlier this year. The full dataset, [found here along with further documentation](https://mpdc.dc.gov/publication/stop-and-frisk-data-and-explanatory-notes), spans from 2010 through 2017 and contains demographic information about the person stopped as well as the time and location of the stop. 

This dataset provides some opportunity to examine policing policy in the District, but ultimately falls well short of documenting MPD’s stop and frisk to the extent required by law. In 2016, the DC City Council passed the Neighborhood Engagement Achieves Results Amendment Act of 2016, or the NEAR Act. The legislation was designed to be a "comprehensive, public health-based approach to crime prevention and intervention", as described by its author [Kenyan R. McDuffie, Council-member for Ward 5](http://www.kenyanmcduffie.com/nearact/). Collecting richer data on felony crimes, stops and frisks, and use of force incidents was a key element of the law. Since 2016, [the MPD has failed to comply with this provision by omitting critical data on stop and frisk incidents, including what facts justified the stop, whether a frisk was initiated, and whether an arrest was made](https://www.wusa9.com/article/news/investigations/dc-police-not-following-law-requiring-stop-and-frisk-data-collection-2-years-after-it-was-passed/65-532319128).

Various DC advocacy organizations, including Black Lives Matter DC, Stop Police Terror Project DC, and the American Civil Liberties Union of the District of Columbia, have petitioned and FOIA-ed the MPD to release this data. However, as the [Washington City Paper reports](https://www.washingtoncitypaper.com/news/city-desk/article/21001436/councilmembers-and-activists-demand-to-see-mpds-stopandfrisk-data), the MPD denied the initial FOIA request in 2017 because the data collection systems (required by law) had not been put in place. A year later, these organizations again requested this information and were denied for the same reason. These groups [filed suit against the Mayor's office](https://www.acludc.org/en/cases/black-lives-matter-dc-v-bowser) to either release the detailed data or, if the data is truly lost, begin collecting the data, as required by law. The outcome of this litigation is pending.

DC Judiciary and Public Safety Chairman Charles Allen questioned DC Police Chief Peter Newsham as to why the mandated data had not been collected earlier this year; Newsham stated that the MPD [was "guilty" of not following the stop and frisk data collection](https://www.wusa9.com/article/news/local/dc/dc-police-chief-police-guilty-of-not-following-stop-and-frisk-data-collection-law/65-533509822) but had worked to develop other data systems mandated by the NEAR Act. Although the Council allocated $150,000 specifically for stop and frisk data collection in fiscal year 2018, the MPD found [the work of reviewing and sorting the data to be overly "laborious and costly" and did not utilize the funding](https://www.scribd.com/document/374911762/NEAR-Act-Inquiry). The MPD has found the resources and time to building other data systems, including those that highlight crime rather than enforcement, like [DC Crime Cards](https://dcatlas.dcgis.dc.gov/crimecards/).

If you want to see the NEAR Act fully implemented or want to hold law enforcement accountable and transparent, please consider supporting the work being done by organizations like [Black Lives Matter DC](http://www.blacklivesmatterdmv.org/), [Stop Police Terror Project DC](https://www.sptdc.com/), and [the American Civil Liberties Union of the District of Columbia](https://www.acludc.org/en) in their legal fight.

We didn't come into this project familiar with the inner workings of the NEAR Act or the steps the MPD has taken towards compliance. Rather, there were questions other researchers have tackled that we wanted to investigate in DC, like [this really incredible research on racial disparities in "hit-rates," or arrest rates](https://5harad.com/papers/frisky.pdf), but we were confronted with a lack of detailed data.

The available data did allow us to explore the following research questions: 1) Who is being stopped and frisked by the DC Metropolitan Police Department (MPD)? 2) How does the stop and frisk population compare to the overall population in DC? 3) How much are different groups of people being disproportionally targeted by stop and frisk? 

Along with the stop and frisk data, the MPD also reported on "field contact reports" from 2012 to 2017. According to the [documentation](https://go.mpdconline.com/GO/GO_OPS_304_10.pdf), a field contact is a non-forcible stop and/or questioning between MPD and a citizen, although it is unclear whether citizens stopped non-forcibly know they do not need to speak with police. Forcible contacts make up the lion's share of all interactions, accounting for more than 28,000 incidents over the five years data was collected, compared to about 11,000 non-forcible stops. 

For the majority of the analysis, we made the decision to specifically examine forcible stops. However, we spent a bit of time looking at both forcible and non-forcible stops; this analysis can be found in the [appendix](#appendix).

This a living piece of research that attempts to provide a sense of understanding of a very complex social issue, and we are open to new ideas and viewpoints that we might have missed. We will follow the ongoing litigation against the MPD and the Mayor's office and update the work below if further data is provided. 

Stop & Frisk: Overview
--------------

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/01_monthly_sf.png)

The number of monthly stop and frisk incidents generally has increased since the MPD started collecting and reporting data in 2010. Interestingly, there was a noticeable drop in incidents near the end of 2014. However, since that initial drop, there has been a rapid increase in monthly stop and frisk incidents across the city, peaking in the summer of 2017. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/03_census_sf_race.png)

Overall, the vast majority of these incidents involve people of color, specifically black people. Between 2010 and 2017, ~80% of all stop and frisk incidents involved black residents, while black residents account for ~48% of the DC population, as of the last decennial census in 2010. Certain racial/ethnic groups such as Asian and people classified as "Unknown" in the police report represent a very small portion of the overall population and in order to not draw misleading statistical conclusions from a very small subgroup, they were dropped from subsequent analysis.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_race_youths.png)

Age is another important factor in this conversation. Many of the stories underwriting the national conversation about race and policing have involved black youths and the police, often with fatal results. DC does not present a different story. Nearly 1 in 5 black residents stopped from 2010-2017 were children, compared to 2% among whites. This trend is supported by [previous research](https://www.apa.org/pubs/journals/releases/psp-a0035663.pdf), which finds that the perceived age of black and Latino juvenile felony suspects is, on average, overestimated by five years.

Of all the trends analyzed here, we found this disparity to be the most striking because of the effect of the trauma during the critical developmental period of childhood. These interactions between police and young black children have a [significant impact on their personal development and views towards police](http://digitalcommons.law.uga.edu/cgi/viewcontent.cgi?article=2059&context=fac_artchop), compounding existing tensions between the police and the communities that they serve. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_age_dist.png)

Reflecting the disparity among juvenile residents, black and Hispanic/Latino adults stopped by police skewed younger than white adults stopped by police. The graph above shows the overall distribution of adults stopped by police by race/ethnicity. The median age of black and Hispanic/Latino adults stopped by police is 27, compared to 30 for whites. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/02_time_of_day_sf.png)

Generally, the majority of stop and frisk incidents occur after 5:00 PM and before 6:00 AM. There are some minor differences among racial lines. Incidents among whites peak in the late/early hours between 1:00 AM - 4:00 AM, while black residents experience higher frequency of incidents during the evening, with the highest proportion of incidents occurring around 9:00 PM.

Mapping Stop & Frisk Incidents
--------------

A critical part of the data provided by the MPD is a rough location of where the incident took place, generally either a reference to a block (e.g. '4200 BLOCK OF 7TH STREET SE') or a corner (e.g. '46TH STREET NE / CENTRAL AVENUE NE'). In order to get a mappable dataset, we cleaned up these addresses and extracted the incident street names. We merged this data to a full list of block centroids (provided by [DC OpenData](http://opendata.dc.gov/datasets/block-centroids)). We've published the [geocoded data](https://github.com/mahkah/dc_stop_and_frisk/blob/master/transformed_data/SF_Field%20Contact_02202018_locations.csv), as well as scripts to match the data in [R](https://github.com/GWarrenn/dc_data/blob/master/03_stop_frisk/scripts/stop_and_frisk.R) and [python](https://github.com/mahkah/dc_stop_and_frisk/blob/master/location_matching.py).

Overall, we were able to match ~96% of forcible and ~82% of non-forcible incidents provided by MPD to a latitude and longitude (The remaining addresses were either missing or not specific enough to be matched).<sup>1</sup>

Once we transformed the addresses to latitude and longitude, we used the R geospatial package 'sp' to classify each matched incident to one of 39 neighborhood clusters in DC to conduct the rest of the analysis presented here. We also created a district-wide map of stop and frisk incidents over the years by race/ethnicity and gender broken out by ward, neighborhood, police sector, police service area, and census tract. The mapping and associated data can be found [here](https://github.com/mahkah/dc_stop_and_frisk)

<figure class="video_container">
<iframe width="800" height="600" src="https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

Stop & Frisk: Neighborhoods
--------------

For the remainder of the analysis, we will use DC's 39 neighborhood clusters as the unit for analysis and comparison, looking at trends across and within neighborhoods.

If anyone [feels strongly about the neighborhood boundaries used](https://www.popville.com/2018/01/official-north-boundary-petworth-is-kennedy-street/) and wants more information on the boundaries of the neighborhood clusters, check out the [DC OpenData Portal](http://opendata.dc.gov/datasets/neighborhood-clusters).

The interactive visualization below lets you dig into some basic trends and demographic profiles of each of the 39 neighborhood clusters in DC, which we'll explore in more depth shortly. For example, there are notable differences in stops by time of day in more residential neighborhoods like Brightwood Park/Crestwood/Petworth versus neighborhoods with a more active nightlife like Kalorama/Adams Morgan/Lanier Heights.

<figure class="video_container">
<iframe width="800" height="600" src="https://dc-stop-frisk.herokuapp.com/" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/05_nbh_sf.gif)

Since 2010, Petworth, Columbia Heights, Congress Heights, and Downtown/Chinatown have racked up the most stop and frisk incidents among DC neighborhood clusters. However, I wanted to make sure that the analysis wasn't simply measuring neighborhood population density (or where all the people are), so I also ran the number of stop and frisk incidents as a function of neighborhood population (again using 2010 census).

Adjusting for neighborhood population leads to some big changes in stop and frisk patterns. Columbia Heights/Petworth and Congress Heights/Bellevue no longer stand out, while neighborhoods like Historic Anacostia and Brookland/Brentwood become more prominent once normalized for their relatively low populations.

Another important note: population in DC is a weird thing. Some areas, like Downtown/Chinatown are densely populated during work hours and happy hour, but have a relatively small residential population. This is part of the reason why the Chinatown neighborhood's relative position doesn't change much after controlling for population. It has a relatively low census population but draws significant traffic to museums and sports events.

Using neighborhood census data, we can look at the neighborhood-level breakdown of stop and frisk incidents by race compared to the neighborhood racial composition. The idea here is to see if we can identify disproportionality in stop and frisk at a neighborhood level -- whether certain racial groups are stopped or targeted at a greater rate than their actual representation in the neighborhood -- or, walking while black. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/06_nbh_sf_race.png)

Each dot represents a racial group in a given neighborhood. If the dot is below the diagonal line, then that racial group is stopped at a greater rate than actually live in that neighborhood. The dots are sized by number of total number of incidents from 2010 to 2017.

We can see that, for the black racial cohort, there are a few clusters. First, there is a cluster of neighborhoods at the very bottom of the plot that have less than 10% black residents, but black residents make up more than 50% of reported stop and frisk incidents. Second, there are a number of neighborhoods with 25% to 50% black residents with 60% to 90% of stop and frisk incidents involving black people.

On the other hand, there are several neighborhoods with a white population hovering around 75% where white residents are involved with 25-30% of all stop and frisk incidents within the neighborhood.

Falling between these two polar examples, stop and frisk rates with neighborhood tend to line up roughly with population proportion among Hispanic/Latinos.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/07_nbh_diff_black.png)

This chart shows the same disproportionality as the previous chart but focuses specifically on black residents stopped by MPD. This chart displays the proportion of stop and frisk incidents minus the census proportions. This is the same disproportionality in the previous chart measured by the vertical distance between the points and the diagonal line. 

We can take a closer look at just the black residents stopped by the MPD. The above chat shows the proportion of stop and frisk incidents minus the census proportions, which is the vertical distance between the points and the diagonal line in the previous chart.

The biggest disproportions are apparent in whiter, more affluent neighborhood clusters in Northwest DC, including Cleveland Park, Friendship Heights, Kalorama Heights, and Georgetown.

Additionally, the table below lists the actual numbers compared to the census 2010 proportions for each neighborhood in a more searchable and accessible format for finding patterns by race within neighborhoods.

<iframe src="https://gwarrenn.shinyapps.io/stop_frisk_neighborhood_summary/" style="border:none;width:1000px;height:500px;"></iframe>
<br>

The Relationship between Crime and Stop & Frisk
--------------

Throughout this section it's important to keep the words of [Hadley Wickham](https://github.com/hadley/r4ds/blob/drafts/model-basics.Rmd) in mind: 

> "The goal of a model is not to uncover truth, but to discover a simple approximation that is still useful."

How would you answer the question, "what’s the best way to allocate police to reduce crime in the city?" Many might answer: send more officers to areas with the highest amount of reported crimes. 

That's how no-nonsense detective [Lennie Briscoe](https://en.wikipedia.org/wiki/Lennie_Briscoe) might respond, at least.

In order to answer this question, we used crime data collected during the same time period as the stop and frisk data provided by the MPD, again through [OpenData DC](http://opendata.dc.gov/datasets?q=crime). Using a similar method as with the stop and frisk data, we matched individual reported crimes to each of the 39 neighborhoods using latitude and longitude provided by the MPD.

This section will test the theory that stop and frisk is used not to target or profile specific neighborhoods based on their racial composition, but rather is used purely as a method to reduce crime by targeting high crime areas by preemptively stopping and questioning potential criminals.   

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/08_crime_frisks.png)

The chart above illustrates a pretty linear relationship between the previous years' reported crime level and stop and frisk in each neighborhood of DC. Of course, there are dozens and dozens of other confounding variables that influence crime and policing behavior not being considered in this simplistic approach, but if you were only to use this one variable to predict stop and frisk, you would end up with a model<sup>2</sup> like this:

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

The "crime-only" model that we've created shows a pretty strong relationship between the previous years' crime level and current years' stop and frisk level with an R-squared of about .81. More specifically, for one unit of increase in a neighborhood's previous year crime rate, the number of stop and frisks in the current year will increase by a factor of 0.09. So, for example, if 100 more crimes are committed in a particular neighborhood then are committed in another neighborhood over the course of a year, the "crime-only" model estimates that neighborhood will have nine more stop and frisk incidents over the course of the following year.

With that in mind, we can use this model to predict the level of stop and frisk in any given neighborhood based on the previous year's crime data and then use the actual stop and frisk level to test/validate the model's performance. We'll do this by looking at the residual -- essentially a measure how far the predicted value is from the actual value. Here, they measure how many stop and frisk incidents the model predicted minus how many actually occurred. 

The chart below plots the neighborhood-level crime-only model residuals by the neighborhood proportion of residents of color (again from the 2010 census). 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/09_crime_model_residuals.png)

When viewed through a racial context, this "crime-only" approach to modeling stop and frisk appears to have its limits; it generally overpredicts the number of stop and frisk incidents in whiter neighborhoods and under predicts the amount of stop and frisk in neighborhoods with higher concentrations of people of color. If police were solely to use crime as a decision-making data point then we would expect to see equal distribution of residuals across neighborhoods with varying levels of residents of color. This indicates that there is something else driving the relationship between stop and frisk and crime (and it might have something to do with race).

Now that we see a clear need to incorporate the neighborhood's racial composition into the model, we can update our "crime-only" model to control for the proportion of residents of color in each neighborhood. The plot below shows the same linear relationship between the previous years' crime rate and stop and frisk now controlling for the neighborhood's racial composition. Additionally, the updated crime & race linear model is shown side-by-side along with the "crime-only" model below.

<table style="text-align:center"><tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td colspan="2"><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="2" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td colspan="2">Average Stop & Frisk</td></tr>
<tr><td style="text-align:left"></td><td>"Crime-Only" Model</td><td>Crime & Race Model</td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:center">Average previous<br>year crime</td><td>0.095<sup>***</sup><br>(0.008)</td><td>0.102<sup>***</sup><br>(0.007)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 40% - 60%</td><td></td><td>-5.778<br>(15.275)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 60% - 90%</td><td></td><td>20.212<br>(12.689)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 90% - 100%</td><td></td><td>46.732<sup>***</sup><br>(11.046)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Constant</td><td>0.419<br>(9.013)</td><td>-26.181<sup>**</sup><br>(9.596)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>39</td><td>39</td></tr>
<tr><td style="text-align:left">R<sup>2</sup></td><td>0.803</td><td>0.885</td></tr>
<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.798</td><td>0.871</td></tr>
<tr><td style="text-align:left">Residual Std. Error</td><td>33.425 (df = 37)</td><td>26.643 (df = 34)</td></tr>
<tr><td style="text-align:left">F Statistic</td><td>150.666<sup>***</sup> (df = 1; 37)</td><td>65.342<sup>***</sup> (df = 4; 34)</td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td colspan="2" style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>

The regression output below shows a fairly similar overall relationship between crime and stop and frisk. However, the crime & race model indicates that there is a statistically significant difference between the amount of stop and frisk in neighborhoods with 90% - 100% residents of color compared to the base category -- neighborhoods with 10% - 40% residents of color. There is no statistically significant difference observed with the intermediate neighborhood types.

<details><summary><b>Click for an explanation of the regression model output</b></summary>
<p>

$Total Stop & Frisk = (Prev. Year Crime * 0.102) + N$

So, if we're comparing a neighborhood with identical levels of crime in the previous year and starkly different racial compositions...

Neighborhood 1: 10% - 40% resident of color & 1000 crimes in previous year

$Total Stop \& Frisk = (1000 * 0.102) + 0$

$Total Stop \& Frisk = 102$

Neighborhood 2: 90% - 100% resident of color & 1000 crimes in previous year

$Total Stop \& Frisk = (1000 * 0.102) + 46.732$

$Total Stop \& Frisk = 148.72$

This shows that, holding the amount of crime in a neighborhood constant, the crime & race model predicts that, on average, there are ~47 more incidents in neighborhoods with the highest concentrations of residents of color compared to the whiter neighborhoods of DC.

</p>
</details>
<br>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/crime_frisk_yearly_race.png)

As the model and the plot both show, after we control for racial composition, neighborhoods with the highest percentages of people of color have higher stop and frisk rates (around 47 more stop and frisk incidents on average when crime is held constant) relative to whiter neighborhoods, despite having similar levels of crime in the preceding year. The model also shows that this is generally only predictive in the neighborhoods with the highest proportion of residents of color.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/10_sf_crime_nbh_race.png)

Similarly, despite having lower levels of crime than racially diverse neighborhoods, the neighborhoods with the highest concentration of residents of color -- like Ivy City/ Arboretum/Trinidad/Carver, Langston/Woodridge/Fort, and Lincoln/Gateway -- have astoundingly high rates of stop and frisk. This tracks with what we saw earlier in the chart showing total stop and frisk adjusted for neighborhood population; specifically, the neighborhoods that have higher proportions of non-white residents tend to have lower populations but higher levels of stop and frisk per capita. As a reminder, this chart does not take into account the race of the crime/stop and frisk incident, but we'll get into that next.

The Benefit (and lack thereof) of the Doubt: Person-level Crime and Stop & Frisk Relationship
--------------

While the previous analyses were illuminating, there were certain limitations inherent in the data. Specifically, all of the charts and models were looking at all crime and stop and frisk in each neighborhood, regardless of race on the incident-level. This method was used because of the available data; the MPD releases all years of crime stripped of any demographic data of the assailant, with one exception. In March 2018 (shortly after starting this analysis endeavor), the MPD released person-level crime data with demographic data of [felony crime incidents in 2016](http://opendata.dc.gov/datasets/felony-crime-incidents-in-2016).

We can use this data to test a burning question: Is the stop and frisk rate higher/lower than the reported crime rate for various racial groups in DC? 

<details><summary><b>Click for slight detour on the crime data</b></summary>
<p>

Before we get into the personal level relationship between stop and frisk and crime, we'll take a look at the relationship between crime and neighborhood racial composition. It's also important to note that this is displaying reported crimes, something we'll stress heavily. The [Bureau of Justice Statistics estimates](https://www.bjs.gov/content/pub/pdf/vnrp0610.pdf) that over 3 million crimes, or 52% of all violent crimes, went unreported nationally from 2006 to 2010. There are a myriad of social reasons why reported crimes might vary from the actual number of crimes in a city, such as fear of not being believed or taken seriously and fear of reprisal.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/crime_and_census_plot.png)

One of the more apparent patterns we find is that black residents make up a larger proportion of <i>reported</i> crime in less black DC neighborhoods. The reasons for this are not apparent in the data; there are certain social factors that could cause this, such as [white residents being more likely to call the police](https://www.vox.com/first-person/2018/5/17/17362100/starbucks-racial-profiling-yale-airbnb-911) or black residents may simply commit a disproportionate share of crimes in these neighborhoods. The answers to this question are not immediately available and any conclusive takeaways are cautioned.

---

</p>
</details> 
<br>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/11_nbh_crime_sf_race_scatter.png)

Similarly to how we looked at stop and frisk as it compares to neighborhood racial composition, the chart above shows the relationship between the proportion of stop and frisk and crime by neighborhood and racial group. If a dot is below the diagonal line, then the group is stop and frisked at a higher rate than the crime rate for that group in that neighborhood, and vice versa. We find a similar, but more pronounced disproportionality across all neighborhoods in DC, where black residents are stopped at a higher rate than their racial group accounts for in the overall neighborhood crime rate. On average, the stop and frisk rate among black residents is ~30% higher than the reported crime rate for the racial group.

Likewise, the stop and frisk rate is lower than the reported crime rate among whites across the majority of DC neighborhoods, with a crime rate 5% higher than the stop and frisk rate. A further breakdown by neighborhood and racial group is below. A guide to interpretation: if a racial group is plotted at less than 0, then the group is stopped at a greater rate than the reported crime rate in the neighborhood for that group. The reverse is true if the group is plotted at greater than 0. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/12_nbh_diff_crimes.png)

As in the population comparison, Cleveland Park/Woodley Park, Downtown Chinatown, and Shaw/Logan Circle stand out as containing the highest disproportionality between black and white residents.

Building off the "crime-only" model, now that we have access to demographic crime data, we can start to look at the relationship between stop and frisk using individual demographics of those stopped, rather than at a neighborhood level as we did previously. Except rather than using a linear regression to model the data, we'll use a Poisson regression<sup>3</sup>, which is specifically geared toward modeling count data and, when combined with an offset, rate data. This work is largely built off the research conducted by [Gelman, Fagan and Kiss (2007)]("http://www.stat.columbia.edu/~gelman/research/published/frisk9.pdf") examining stop and frisk in New York City in the late 1990's. The specific Poisson model used here will estimate stop and frisk for each neighborhood and take the total number of crimes for that racial group as an offset, establishing a stop & frisk to crime ratio. The model controls for the race of the person stopped and the racial composition of the neighborhood in which they were stopped.

<table style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td>Stop & Frisk</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Race: Black</td><td>1.375<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.206)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Race: Hispanic/Latino</td><td>1.458<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.245)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 10% - 40%</td><td>-0.281<sup>*</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.163)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 40% - 60%</td><td>-0.053</td></tr>
<tr><td style="text-align:left"></td><td>(0.181)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 60% - 80%</td><td>-0.380<sup>**</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.172)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 80% - 100%</td><td>-0.629<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.159)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>-2.598<sup>***</sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.220)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>93</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>

There are plenty of [great (better*) resources](http://www.jerrydallal.com/lhsp/poisson.htm) that can explain the details of Poisson regressions. However, if you're like me and just want to skim the relevant [Cross-Validated/Stack Overflow](https://stats.stackexchange.com/questions/11096/how-to-interpret-coefficients-in-a-poisson-regression) posts to know the gist of how the model should be interpreted, then here's a quick explanation of the results above: The parameters displayed represent the multiplicative increase in stop and frisk for all neighborhood race compositions compared to the specific base factor. For the race independent variable, the base category is white and for the neighborhood black compositions, the base category is 0% - 10% black.

Translation: Across all neighborhoods in the District, black and Hispanic/Latino residents are stopped at a rate 3.95 (exp(1.375)) and 4.3 (exp(1.458) - 1) times higher than their crime rate, compared white residents respectively, controlling for each group's previous year crime rate and neighborhood racial composition. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/13_poisson_plot.png)

Following in the footsteps of Gelman et al., the chart above shows the estimated rates each racial group were stopped by neighborhood racial composition. The pattern we observed at the District-level tends to hold true across neighborhoods of varying racial composition; Black and Hispanic/Latino residents are stopped at higher rates than white residents across all neighborhood types. 

While the previous research illustrated that stop and frisk is generally concentrated in neighborhoods with higher proportions of residents of color, this model shows that the ratio of stop and frisk to crime is <i>higher</i> in whiter neighborhoods among black and Hispanic/Latino residents because of a disproportionately lower crime rate coupled with a relatively higher amount of stop and frisk in these neighborhoods. 

Conclusion
--------------

The availability of stop and frisk data in DC provides a unique and thought-provoking opportunity to examine how different areas of the city experience policing. This research found, consistent with other research, racial inequity and disproportionality in who was stopped and frisked in DC.

This finding is not surprising; likely the first thing that any casual observer of this data would notice is that over 80% of the MPD's 30,000 stops involved black residents. The observer would likely discover shortly thereafter that nearly 1 in 5 of this 80% were juveniles and 9 in 10 were male. These numbers are so obviously disproportionate that it would be shocking if modeling uncovered an explanation justifying this policing.

This is not a practice that's waning, like the NYPD's stop and frisk program, or even one that is static. Rather, the MPD has steadily increased the frequency of these stops, while failing to comply with a law requiring them to collect and release data about, among other things, the legal basis for the stops. 

Notes & Thanks
--------------

All of the code used for this project can be found [here](https://github.com/GWarrenn/dc_data/tree/drafts/03_stop_frisk) and [here](https://github.com/mahkah/dc_stop_and_frisk). All of the geographical data can be accessed through the [DC OpenData Portal](http://opendata.dc.gov/).

Thank you to the DC Office of the Chief Technology Officer and the DC Metropolitan Police Department for making the [stop and frisk data](https://mpdc.dc.gov/publication/stop-and-frisk-data-and-explanatory-notes) used in this analysis readily available and accessible. We hope that you find the resources and labor necessary to collect and release the remaining data fields required by law.

Finally, thank you to Mika Weinstein, Caroline Chen, and Nicole McAllister  for providing critical insights and perspectives that helped shape and hone this research. 

<a name="appendix"></a>
Appendix: Forcible vs. Non-Forcible Incidents 
--------------

As previously mentioned, we decided to only look at stop and frisk incidents, classified as forcible encounters, for the analysis. However,  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/race_contact.png)

Overall, there is little difference in contact type by race. Around 80% of both non-forcible and forcible involved black residents; however, a slightly greater proportion (2.6%) of non-forcible stops involved white residents (though the total number of forcible stops in general is much higher than the non-forcible stops). 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/gender_race_contact.png)

Across all racial groups and stop types, people identified by MPD as male comprise a majority of incidents. However, there are some notable gender differences by contact type. Overall, women, especially white women, made up a greater proportion of non-forcible than forcible contact with the police. 

Unlike the forcible stop and frisk incidents, the field contact incident data contains a record of what led to the contact, along with the standard demographics.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/reason_for_stop.png)

Keeping the important difference between forcible and non-forcible stops in mind, we see that moving violations were the catalyst for nearly half of the non-forcible encounters among whites, while non-forcible stops of black and Hispanic/Latino residents were initiated more frequently for "Suspicious Vehicles/Persons/Activities" and "Call for Service" (or, someone calling the police).

Footnotes
--------------
<sup>2</sup> For the "crime-only" & "crime & race" models, I created a simple linear regression in R using the lm() function. The independent variable was the previous years' average amount of crime in the neighborhood and the dependent variable was the current years' average amount of stop and frisk, as illustrated below. Rather than run the model for all years and neighborhoods, I rolled up each neighborhood and took the average crime and stop and frisk. 

```R
yearly_model <- lm(formula = avg_sf ~ avg_prev_yr_crime,
   data = nbh_sf_avg)

yearly_model_w_race <- lm(formula = avg_sf ~ avg_prev_yr_crime + coll_bins,
                   data = nbh_sf_avg)                      
```

<sup>3</sup> Poisson model details below:

```R
stop_model <- glm(stop_frisks ~ race_ethn + nbh_black_bins, family=quasipoisson,
                  offset=log(prev_yr_crimes), data = stops_crimes_nbh,subset=prev_yr_crime>0 & stop_frisks>0)
```                  

