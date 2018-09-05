---
layout: post
title: Stop & Frisk in DC
author: August Warren & Mahkah Wu
---

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_header.png)

Key Findings
--------------

* Overall, black residents, and particularly young black male residents, were forcibly stopped by police at a rate well in excess of both the proportion of black residents living in DC and the proportion of reported crime committed by black residents. White residents were stopped at a rate lower than the analogous population and crime proportions. Each of Washington DC's 39 neighborhoods have distinct racial makeups, but these disproportionalities persist in nearly all neighborhoods with fewer then 90% black residents.

* There exists a strong linear relationship between a neighborhood's annual crime level and that neighborhood's stop and frisk level over the subsequent year. However, neighborhoods with the highest concentration of residents of color (90-100% residents of color) have, on average, ~47 more stop and frisk incidents per year compared to whitest neighborhoods (0-40% residents of color) when crime is held constant.

* In 2016, black and Hispanic/Latino residents were stopped at 4.0 and 4.3 times higher rates, respectively, than white residents across all DC neighborhoods when controlling for each racial cohort's reported crime level. The rate generally increases in neighborhoods with a higher proportion of white residents.

* This analysis includes an [interactive map](https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html) and [neighborhood explorer application](https://dc-stop-frisk.herokuapp.com/) that enable users to look for trends and patterns not covered in this analysis.

Background & Introduction
--------------

A stop and frisk, or [Terry stop](https://www.law.cornell.edu/wex/terry_stop_stop_and_frisk), is an investigatory detention that police may initiate based on reasonable suspicion that the detained individual is engaged, or about to engage, in criminal conduct. In addition, police may conduct a limited search for weapons in order to protect the officer or public safety when the officer has reasonable suspicion that a stopped individual is "armed and dangerous." While police may only initiate a frisk to search for weapons, they may seize contraband discovered during the frisk. In both cases, the standard of reasonable suspicion means that police must point to specific and articulable facts, although a set of individually innocuous facts may meet the standard for reasonable suspicion when considered together.

Named for the Supreme Court case that defined this authority, Terry v. Ohio, 392 U.S. 1 (1968), Terry stops rose to prominence through controversy over racial profiling in the New York Police Department’s (NYPD) "stop, question, and frisk" policing strategy. At its height in 2011, the NYPD made 685,724 stops; the vast majority—over 85%—of those stopped were black or Hispanic/Latino. Proponents argue that it preempts crime by allowing officers to intervene and check for illegal weapons that may be used in future crimes, while opponents argue that the law allows police officers to harass people of color with weak, or non-existent, reasonable suspicion of criminal conduct. [Some research shows that the NYPD’s stops had few effects on robbery and burglary, though most research cautions against drawing definite conclusions on the impact of the NYPD's stop and frisk program on crime](https://doi.org/10.1080/07418825.2012.712152).

[Racial bias in the NYPD’s policing program has been studied extensively]( https://doi.org/10.1080/07418825.2012.712152), but incident-level data on DC Metropolitan Police Department's (MPD) use of stop and frisk was only released earlier this year. The full dataset, [found here along with further documentation](https://mpdc.dc.gov/publication/stop-and-frisk-data-and-explanatory-notes), spans from 2010 through 2017 and contains demographic information about the person stopped as well as the time and location of the stop.

This dataset provides some opportunity to examine policing policy in the District, but ultimately falls well short of documenting MPD’s stop and frisk to the extent required by law. In 2016, the DC City Council passed the Neighborhood Engagement Achieves Results Amendment Act of 2016, or the NEAR Act. The legislation was designed to be a "comprehensive, public health-based approach to crime prevention and intervention," as described by its author [Kenyan R. McDuffie, Council-member for Ward 5](http://www.kenyanmcduffie.com/nearact/). Collecting richer data on felony crimes, stops and frisks, and use of force incidents is a key element of the law. Since 2016, [the MPD has failed to comply with this provision by omitting critical data on stop and frisk incidents, including what facts justified the stop, whether a frisk was initiated, and whether an arrest was made](https://www.wusa9.com/article/news/investigations/dc-police-not-following-law-requiring-stop-and-frisk-data-collection-2-years-after-it-was-passed/65-532319128).

Various DC advocacy organizations, including Black Lives Matter DC, Stop Police Terror Project DC, and the American Civil Liberties Union of the District of Columbia, have petitioned and submitted FOIA request for the MPD to release this data. However, as the [Washington City Paper reports](https://www.washingtoncitypaper.com/news/city-desk/article/21001436/councilmembers-and-activists-demand-to-see-mpds-stopandfrisk-data), the MPD denied the initial FOIA request in 2017 because the data collection systems (required by law) had not been put in place. A year later, these organizations again requested this information and were denied for the same reason. These groups [filed suit against the Mayor's office](https://www.acludc.org/en/cases/black-lives-matter-dc-v-bowser) to either release the detailed data or, if the data is truly lost, begin collecting the data, as required by law. The outcome of this litigation is pending.

DC Judiciary and Public Safety Chairman Charles Allen questioned MPD Chief Peter Newsham as to why the required data had not been collected earlier this year; Newsham stated that the MPD [was "guilty" of not following the stop and frisk data collection mandate](https://www.wusa9.com/article/news/local/dc/dc-police-chief-police-guilty-of-not-following-stop-and-frisk-data-collection-law/65-533509822) but had worked to develop other data systems prescribed by the NEAR Act. Although the Council allocated $150,000 specifically for stop and frisk data collection in fiscal year 2018, the MPD found [the work of reviewing and sorting the data to be overly "laborious and costly" and did not utilize the funding](https://www.scribd.com/document/374911762/NEAR-Act-Inquiry). The MPD has found the resources and time to build other data systems, including those that highlight crime rather than enforcement, like [DC Crime Cards](https://dcatlas.dcgis.dc.gov/crimecards/).

Other cities have collected data analogous to what the NEAR Act mandates, and it has driven lots of important research, like [this work on racial disparities in arrest rates](https://5harad.com/papers/frisky.pdf). We came to this project to do similar research in DC but were confronted with a lack of detailed data.

The available data did allow us to explore the following research questions: 1) Who is being stopped and frisked by the MPD? 2) How does the stop and frisk population compare to the overall population in DC? 3) Are different groups of people being disproportionally targeted by stop and frisk, and if so, by how much and where?

Along with the stop and frisk data, the MPD also reported on "field contact reports" from 2012 to 2017. According to the [documentation](https://go.mpdconline.com/GO/GO_OPS_304_10.pdf), a field contact is a non-forcible stop and/or questioning between MPD and a citizen, although it is unclear whether citizens stopped non-forcibly know they do not need to speak with police. Forcible contacts make up the lion's share of all interactions, accounting for more than 28,000 incidents over the five years data was collected, compared to about 11,000 non-forcible stops.

For the majority of the analysis, we made the decision to specifically examine forcible stops. However, we spent a bit of time looking at both forcible and non-forcible stops; this analysis can be found in the [appendix](#appendix).

This a living piece of research that attempts to provide a sense of understanding of a very complex social issue, and we are open to new ideas and viewpoints that we might have missed. We will follow the ongoing litigation against the MPD and the Mayor's office and update the work below if further data is provided.

Stop and Frisk: Overview
--------------

In order to get a sense of the data, we'll start by looking at some descriptive statistics, specifically who was and stopped and when and where stops took place. [WUSA9's special report](https://www.wusa9.com/article/news/local/dc-police-stopping-frisking-innocent-people-necessary-to-fight-crime/65-518657856) on stop and frisks found similar patterns in the descriptive statistics. They complemented these conclusions with interviews highlighting the human side of the issue. We will delve deeper into the quantitative side of things.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/01_monthly_sf.png)

The number of monthly stop and frisk incidents generally has increased since the MPD started collecting and reporting data in 2010. Interestingly, there was a noticeable drop in incidents near the end of 2014. However, since that initial drop, there has been a rapid increase in monthly stop and frisk incidents across the city, peaking in the summer of 2017.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/03_census_sf_race.png)

Overall, the vast majority of incidents targeted people of color, specifically black people. Between 2010 and 2017, ~80% of all stop and frisk incidents involved black residents, while black residents account for ~48% of the DC population, as of the last decennial census in 2010.

@@@ Quantifying race and ethnicity has some inherent limitations. Add notes about Hisp. Certain racial/ethnic groups such as Asian and people classified as "Unknown" in the police report represent a very small portion of the overall population and in order to not draw misleading statistical conclusions from a very small subgroup, they were dropped from subsequent analysis.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_race_youths.png)

Racial disparity in police stops are particularly striking among children. Nearly 1 in 5 black residents stopped from 2010-2017 were children, compared to 2% among whites. Other research suggests a possible driver of this disparity: [police tend to overestimate the age of black and Hispanic/Latino juvenile felony suspects by an average of five years while underestimating the age of white juvenile suspects by @@@ years](https://www.apa.org/pubs/journals/releases/psp-a0035663.pdf).

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_age_dist.png)

Reflecting the disparity among juveniles, black and Hispanic/Latino adults stopped by police skewed younger than white adults stopped by police. The graph above shows the overall distribution of adults stopped by police by race/ethnicity. Stop and frisk incident counts peak at age for black and Hispanic/Latino residents at @@@ and at @@@ for white residents. The median age of black and Hispanic/Latino adults stopped by police is 27, compared to 30 for whites.

<figure class="video_container">
<iframe width="800" height="600" src="https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

@@@ Map description and link to footnote

Stop and Frisk: Neighborhoods
--------------

For the remainder of the analysis, we will use DC's 39 neighborhood clusters@@@(footnote) as the unit for analysis and comparison, looking at trends across and within neighborhoods.

<figure class="video_container">
<iframe width="800" height="600" src="https://dc-stop-frisk.herokuapp.com/" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

The interactive visualization above lets you dig into some basic trends and demographic profiles of each neighborhood, which we'll explore in more depth shortly. For example, there are notable differences in stops by time of day in more residential neighborhoods like Brightwood Park/Crestwood/Petworth versus neighborhoods with a more active nightlife like Kalorama/Adams Morgan/Lanier Heights.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/05_nbh_sf.gif)

Since 2010, neighborhood clusters containing Petworth, Columbia Heights, Congress Heights, and Chinatown have experienced the most stop and frisk incidents among DC neighborhood clusters. To make sure the analysis wasn't simply measuring neighborhood population density, the graph also shows the number of stop and frisk incidents divided by the neighborhood population (again using the 2010 census).

Adjusting for neighborhood population leads to some big changes in stop and frisk patterns. Clusters containing Columbia Heights, Petworth, and Congress Heights no longer stand out, while neighborhoods like Historic Anacostia and Brookland/Brentwood/Langdon become more prominent. Census population in DC doesn't capture that some neighborhoods become more populated during business or nighttime hours but have comparatively small residential populations. Neighborhoods like Chinatown draw significant traffic, so the graph above likely overestimates the stop and frisk incidents per person in these neighborhoods.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/06_nbh_sf_race.png)

The figure above shows neighborhood-level breakdown of stop and frisk incidents by race compared to the neighborhood racial composition. The intent is to identify disproportionality in stop and frisk at a neighborhood level—whether certain racial groups are stopped at a greater rate than their actual representation in a neighborhood. Each dot represents a racial group in a given neighborhood. If the dot is below the diagonal line, then that racial group is stopped at a disproportionate rate relative to the residential population. The dots are sized by the total number of incidents from 2010 to 2017. The points corresponding to Columbia Heights are labeled above, but these trends and the raw data can be explored for all neighborhoods in appendix @@@.

There are a few clusters among the neighborhood points for black residents. The cluster at the bottom of the plot corresponds to neighborhoods where less than 10% of residents are black but where more than 50% of those stopped are black. Another cluster, including Columbia Heights, exists at neighborhoods where 25-50% of residents are black, but black residents are targeted in 60-90% of stop and frisk incidents.

Neighborhood points for Hispanic/Latino residents generally fall along the reference line—population and stop and frisk rates are roughly equal. Regardless of neighborhood composition, white residents make up less than 25% of stop and frisk incidents in nearly all neighborhoods.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/change_in_sf.png)

Across DC, the yearly count of stop and frisk incidents rose 42% from 2010 to 2017, but these changes were not evenly divided among the city's neighborhoods. The more racially diverse DC neighborhoods saw the greatest increases in stop and frisk. Stop and frisk rose, on average, over 130% in neighborhoods comprised of 25-75% black residents, which includes the rapidly gentrifying neighborhoods of Shaw, Bloomingdale, Columbia Heights, and Petworth, from 2010 to 2017. While the number of stop and frisk incidents in neighborhoods with 95-100% black residents remained relatively stable from 2010 to 2017, these neighborhoods were among those with the highest rate of stops per person.

The above figure groups neighborhoods according to the portion of black residents in each neighborhood in order to compare trends across neighborhoods with different racial compositions. These groups will be used in subsequent modeling and the designation of particular neighborhoods is found in appendix @@@.

Appendix @@@

The Relationship between Crime and Stop and Frisk
--------------

For the remainder of this analysis, it's important to keep the words of [Hadley Wickham](https://github.com/hadley/r4ds/blob/drafts/model-basics.Rmd) in mind:

> "The goal of a model is not to uncover truth, but to discover a simple approximation that is still useful."

The descriptive statistics have so far suggested racial biases in stop and frisk practices. Over 80% of those stopped were black, and within nearly all neighborhoods, the rate of stops for black residents is higher than their neighborhood representation. However, stop and frisk advocates might counter that enforcement focuses on where crimes are being committed, and any disproportionality is incidental to that. The models in the following sections explore the degree to which the disproportionality can be ascribed to differences in crime rates. While this model is useful for demonstrating that bias exists beyond crime rates, we do not believe that a higher crime rate among particular groups warrants overpolicing their communities or profiling individuals.

Crime is more complex than available data captures, so some caveats are required here. Crime rates used here only include reported crime. The [Bureau of Justice Statistics estimates that over 3 million—or 52%—of all violent crimes went unreported nationally from 2006-2010](https://www.bjs.gov/content/pub/pdf/vnrp0610.pdf). There are myriad social reasons why reported crimes might vary from the actual number of crimes committed, such as fear of not being believed or taken seriously and fear of reprisal. Criminal statistics are also highly prone to the [observer effect](https://en.wikipedia.org/wiki/Observer_effect_(physics)): as a community is increasingly surveilled and subject to forcible contacts by the police, more crime may be reported to or observed by police.

We used crime data collected during the same time period as the stop and frisk data provided by the MPD, again retrieved through [OpenData DC](http://opendata.dc.gov/datasets?q=crime).

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/08_crime_frisks.png)

The chart above illustrates a relatively linear relationship between a given year's reported crime level and the subsequent year's number of stop and frisk incidents in each neighborhood of DC. Ivy City in 2014 is labeled as an example above. Predicting stop and frisk incidents with only the previous year's crime data results in the blue line above. There are many confounding variables that influence crime and policing behavior not being considered in this simplistic approach, but the "crime-only" model<sup>2</sup> shows a relatively strong relationship between a given year's crime level and the subsequent year's stop and frisk level with an R-squared of about .81. It predicts that, if 100 more crimes are committed in a particular neighborhood then are committed in another neighborhood over the course of a year, then that neighborhood will have nine more stop and frisk incidents over the course of the following year. The full model parameters are shown below:

<table style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td>Number of stops in subsequent year</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Number of reported crimes</td><td>0.094<sup>*** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.007)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>-0.469</td></tr>
<tr><td style="text-align:left"></td><td>(8.602)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>39</td></tr>
<tr><td style="text-align:left">R<sup>2</sup></td><td>0.814</td></tr>
<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.809</td></tr>
<tr><td style="text-align:left">Residual Std. Error</td><td>31.901 (df = 37)</td></tr>
<tr><td style="text-align:left">F Statistic</td><td>161.745<sup>*** </sup> (df = 1; 37)</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>* </sup>p<0.1; <sup>** </sup>p<0.05; <sup>*** </sup>p<0.01</td></tr>
</table>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/09_crime_model_residuals.png)

We can use this model to predict the level of stop and frisk in any given neighborhood based on the previous year's crime data and then validate the model's performance against the actual stop and frisk numbers. This is accomplished using the residual—how many stop and frisk incidents the model predicted minus how many actually occurred. The chart above plots the model residuals by the neighborhood proportion of black residents. To make the trend more clear, one point represents the residual for one neighborhood averaged across all years.

When viewed through a racial context, this approach to modeling stop and frisk appears to have its limits; it generally overpredicts the number of stop and frisk incidents in whiter neighborhoods and underpredicts the number of incidents in neighborhoods with higher concentrations of black residents. If police were solely to use crime as a decision-making data point then we would expect to see equal distribution of residuals across all neighborhoods. This indicates that there is something else driving the relationship between stop and frisk and crime (and it might have something to do with race). Bearing this in mind, we can update the model to consider the proportion of black residents in each neighborhood.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/crime_frisk_yearly_race.png)

The plot above shows the same linear relationship between a given year's crime numbers and the subsequent year's stop and frisk numbers, now controlling for the neighborhood's racial composition. Each line shows the model's estimation of the number of stop and frisk incidents in the following year for a neighborhood with a proportion of black residents in the given range. Outputs from the crime and race linear model are shown below alongside the crime-only model outputs.

The regression shows a fairly similar overall relationship between crime and stop and frisk, but it also indicates there is a statistically significant difference between the amount of stop and frisk in neighborhoods with a majority of black residents. As the model and the plot both show, neighborhoods with a majority of black residents have greater stop and frisk rates than neighborhoods with the lowest proportion of black residents and a comparable level of crime. Specifically, neighborhoods comprised of over 95% black residents had an average of 47 more stop and frisk incidents per year compared to neighborhoods comprised of fewer then 25% black residents. This comparison is statistically significant at 99% confidence interval.

<details><summary><b>Click for an explanation of how the regression model output estimates 47 incidents</b></summary>
<p>
@@@ Update numbers
$Total Stop and Frisk = (Prev. Year Crime * 0.102) + N$

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

@@@
<table style="text-align:center"><tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td colspan="2"><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="2" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td colspan="2">Number of stops in subsequent year</td></tr>
<tr><td style="text-align:left"></td><td>Crime-Only Model</td><td>Crime and Race Model</td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:center">Number of reported crimes</td><td>0.095<sup>*** </sup><br>(0.008)</td><td>0.102<sup>*** </sup><br>(0.007)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 40% - 60%</td><td></td><td>-5.778<br>(15.275)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 60% - 90%</td><td></td><td>20.212<br>(12.689)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Neighborhood<br>Percent POC: 90% - 100%</td><td></td><td>46.732<sup>*** </sup><br>(11.046)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:center">Constant</td><td>0.419<br>(9.013)</td><td>-26.181<sup>** </sup><br>(9.596)</td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td style="text-align:left"></td><td></td><td></td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>39</td><td>39</td></tr>
<tr><td style="text-align:left">R<sup>2</sup></td><td>0.803</td><td>0.885</td></tr>
<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.798</td><td>0.871</td></tr>
<tr><td style="text-align:left">Residual Std. Error</td><td>33.425 (df = 37)</td><td>26.643 (df = 34)</td></tr>
<tr><td style="text-align:left">F Statistic</td><td>150.666<sup>*** </sup> (df = 1; 37)</td><td>65.342<sup>*** </sup> (df = 4; 34)</td></tr>
<tr><td colspan="3" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td colspan="2" style="text-align:right"><sup>* </sup>p<0.1; <sup>** </sup>p<0.05; <sup>*** </sup>p<0.01</td></tr>
</table>

The Benefit (and lack thereof) of the Doubt: Person-level Crime and Stop and Frisk Relationship
--------------

While the previous section demonstrated neighborhood level racial bias, these models do not take into account the race of the individual involved in either the crime or the stop and frisk incident. Most available DC crime data is stripped of the assailant's demographic data. However, the MPD released [2016 felony crime data](http://opendata.dc.gov/datasets/felony-crime-incidents-in-2016) that includes the race of the assailant. This enables us to add another dimension to the previous section's analysis: rather than comparing the total crime to total stop and frisk for each neighborhood, we can compare a specific racial group's crime rate to that racial group's stop and frisk. This is one avenue to attempt to quantify overpolicing. This section examines the extent to which stop and frisk rates exceed the reported crime rate for various racial groups, but only for a single year.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/12_nbh_diff_crimes.png)

The figure above shows the difference between a racial cohort's rate of stop and frisk and that racial cohort's crime rate for each DC neighborhood cluster. For example, in Capitol Hill/Lincoln Park, black residents account for 89% of stops and only 47% of reported crime, resulting in a rounded difference of 41%. Across all neighborhoods, black residents are stopped at a higher rate than their racial group accounts for in the overall neighborhood crime rate. On average, black residents are targeted for stops at a ~30% higher rate than their reported crime rate.@@@footnote[ about "other" cat in reports.] Likewise, the stop and frisk rate is lower than the reported crime rate among whites across the majority of DC neighborhoods, with a crime rate 5% higher than the stop and frisk rate. The neighborhood clusters containing Cleveland Park, Chinatown, and Shaw have the greatest disproportionality between black and white residents.

Turning again to modeling, we can add the demographic crime data to the crime and race model used previously. Instead of using overall neighborhood level crime data, this model incorporates crime levels by racial group. This work is built off the research conducted by [Gelman, Fagan and Kiss (2007)]("http://www.stat.columbia.edu/~gelman/research/published/frisk9.pdf") examining stop and frisks in New York City. It utilizes a Poisson regression, a variation on the linear regression used previously. The other difference from the previous model is that we're using crime and stop and frisk rates, rather than totals. To make this change, we'll utilize an offset, an additional term that essentially allows the model's constant term to vary along the rate's denominator. The model parameters are shown below, and a plot of its output follows. @@@footnote[add to existing footnote #3: ].

<table style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
<tr><td style="text-align:left"></td><td>Stop and Frisk</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Race: Black</td><td>1.375<sup>*** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.206)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Race: Hispanic/Latino</td><td>1.458<sup>*** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.245)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 10% - 40%</td><td>-0.281<sup>* </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.163)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 40% - 60%</td><td>-0.053</td></tr>
<tr><td style="text-align:left"></td><td>(0.181)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 60% - 80%</td><td>-0.380<sup>** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.172)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Neighborhood Percent Black: 80% - 100%</td><td>-0.629<sup>*** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.159)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td style="text-align:left">Constant</td><td>-2.598<sup>*** </sup></td></tr>
<tr><td style="text-align:left"></td><td>(0.220)</td></tr>
<tr><td style="text-align:left"></td><td></td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>93</td></tr>
<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>* </sup>p<0.1; <sup>** </sup>p<0.05; <sup>*** </sup>p<0.01</td></tr>
</table>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/13_poisson_plot.png)

Following in the footsteps of Gelman et al., the chart above shows the number of times a stop was initiated against a member of a racial group per reported crimes committed by a member of that racial group for any neighborhood proportion of black residents. Based on the rates of crime and stop and frisk in actual DC neighborhoods, the model estimates that in a hypothetical neighborhood with 25% black residents, a white resident would be stopped 0.07 times for every reported crime committed by a white person while a black resident would be stopped 0.27 times for every reported crime committed by a black resident. In this hypothetical neighborhood, a black resident would be stopped 3.9 times as often per reported crime committed by a black resident 

0.28 hisp

The regression shows a fairly similar overall relationship between crime and stop and frisk, but it also indicates there is a statistically significant difference between the amount of stop and frisk in neighborhoods with a majority of black residents. As the model and the plot both show, neighborhoods with a majority of black residents have greater stop and frisk rates than neighborhoods with the lowest proportion of black residents and a comparable level of crime. Specifically, neighborhoods comprised of over 95% black residents had an average of 47 more stop and frisk incidents per year compared to neighborhoods comprised of fewer then 25% black residents. This comparison is statistically significant at 99% confidence interval.



There are plenty of [great (better*) resources](http://www.jerrydallal.com/lhsp/poisson.htm) that can explain the details of Poisson regressions. However, if you're like me and just want to skim the relevant [Cross-Validated/Stack Overflow](https://stats.stackexchange.com/questions/11096/how-to-interpret-coefficients-in-a-poisson-regression) posts to know the gist of how the model should be interpreted, then here's a quick explanation of the results above: The parameters displayed represent the multiplicative increase in stop and frisk for all neighborhood race compositions compared to the specific base factor. For the race independent variable, the base category is white and for the neighborhood black compositions, the base category is 0% - 10% black.

Translation: Across all neighborhoods in the District, black and Hispanic/Latino residents are stopped at a rate 3.95 (exp(1.375)) and 4.3 (exp(1.458) - 1) times higher than their crime rate, compared white residents respectively, controlling for each group's previous year crime rate and neighborhood racial composition.

Following in the footsteps of Gelman et al., the chart above shows the estimated rates each racial group were stopped by neighborhood racial composition. The pattern we observed at the District-level tends to hold true across neighborhoods of varying racial composition; Black and Hispanic/Latino residents are stopped at higher rates than white residents across all neighborhood types.

While the previous research illustrated that stop and frisk is generally concentrated in neighborhoods with higher proportions of residents of color, this model shows that the ratio of stop and frisk to crime is <i>higher</i> in whiter neighborhoods among black and Hispanic/Latino residents because of a disproportionately lower crime rate coupled with a relatively higher amount of stop and frisk in these neighborhoods.

Conclusion
--------------

The availability of stop and frisk data in DC provides a unique and thought-provoking opportunity to examine how different areas of the city experience policing. This research found, consistent with other research, racial inequity and disproportionality in who was stopped and frisked in DC.

This finding is not surprising; likely the first thing that any casual observer of this data would notice is that over 80% of the MPD's 30,000 stops involved black residents. The observer would likely discover shortly thereafter that nearly 1 in 5 of this 80% were juveniles and 9 in 10 were male. These numbers are so obviously disproportionate that it would be shocking if modeling uncovered an explanation justifying this policing.

This is not a practice that's waning, like the NYPD's stop and frisk program, or even one that is static. Rather, the MPD has steadily increased the frequency of these stops, while failing to comply with a law requiring them to collect and release data about, among other things, the legal basis for the stops.

If you want to see the NEAR Act fully implemented or want to hold law enforcement accountable and transparent, please consider supporting the work being done by organizations like [Black Lives Matter DC](http://www.blacklivesmatterdmv.org/), [Stop Police Terror Project DC](https://www.sptdc.com/), and [the American Civil Liberties Union of the District of Columbia](https://www.acludc.org/en) in their legal fight.

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

Appendix: Stop and Frisk by Time of Day
--------------
![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/02_time_of_day_sf.png)

Each line above represents the percent of stop and frisks within reach racial cohort that occurred at that time. Generally, the majority of stop and frisk incidents occur after 5:00 PM and before 6:00 AM. There are some minor differences among racial lines. Incidents among whites peak in the late/early hours between 1:00 AM - 4:00 AM, while black residents experience higher frequency of incidents during the evening, with the highest proportion of incidents occurring around 9:00 PM.

Appendix @@@
--------------
![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/07_nbh_diff_black.png)

This chart shows the same disproportionality as the previous chart but focuses specifically on black residents stopped by MPD. This chart displays the proportion of stop and frisk incidents minus the census proportions. This is the same disproportionality in the previous chart measured by the vertical distance between the points and the diagonal line.

We can take a closer look at just the black residents stopped by the MPD. The above chat shows the proportion of stop and frisk incidents minus the census proportions, which is the vertical distance between the points and the diagonal line in the previous chart.

The biggest disproportions are apparent in whiter, more affluent neighborhood clusters in Northwest DC, including Cleveland Park, Friendship Heights, Kalorama Heights, and Georgetown.


Appendix @@@
--------------
Finally, the table below lists the actual numbers compared to the census 2010 proportions for each neighborhood in a more searchable and accessible format for finding patterns by race within neighborhoods.

<iframe src="https://gwarrenn.shinyapps.io/stop_frisk_neighborhood_summary/" style="border:none;width:1000px;height:500px;"></iframe>
<br>

Appendix @@@
--------------
![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/10_sf_crime_nbh_race.png)

Similarly, despite having lower levels of crime than racially diverse neighborhoods, the neighborhoods with the highest concentration of residents of color -- like Ivy City/ Arboretum/Trinidad/Carver, Langston/Woodridge/Fort, and Lincoln/Gateway -- have astoundingly high rates of stop and frisk. This tracks with what we saw earlier in the chart showing total stop and frisk adjusted for neighborhood population; specifically, the neighborhoods that have higher proportions of non-white residents tend to have lower populations but higher levels of stop and frisk per capita.

Appendix @@@
--------------
![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/11_nbh_crime_sf_race_scatter.png)

Similarly to how we looked at stop and frisk as it compares to neighborhood racial composition, the chart above compares stop and frisk rates to neighborhood crime rates for that racial group. Each dot represents a racial group in a given neighborhood. If a dot is below the diagonal line, then that group is stopped at a higher rate relative to their crime rate in that neighborhood, and vice versa.


Footnotes
--------------
<sup>1</sup> A critical part of the data provided by the MPD is a rough location of where the incident took place, generally either a reference to a block (e.g. '4200 BLOCK OF 7TH STREET SE') or a corner (e.g. '46TH STREET NE / CENTRAL AVENUE NE'). In order to get a mappable dataset, we cleaned up these addresses and extracted the incident street names. We merged this data to a full list of block centroids (provided by [DC OpenData](http://opendata.dc.gov/datasets/block-centroids)). We've published the [geocoded data](https://github.com/mahkah/dc_stop_and_frisk/blob/master/transformed_data/SF_Field%20Contact_locations.csv), as well as [scripts to match the data](https://github.com/mahkah/dc_stop_and_frisk/blob/master/location_matching.py).

Overall, we were able to match ~96% of forcible and ~82% of non-forcible incidents provided by MPD to a latitude and longitude (The remaining addresses were either missing or not specific enough to be matched).<sup>1</sup> Again, this analysis deals primarily with forcible stops, but both can be toggled on and off in the map below.

Once we transformed the addresses to latitude and longitude, we used the R geospatial package 'sp' to classify each matched incident to one of 39 neighborhood clusters in DC to conduct the rest of the analysis presented here. We also created a district-wide map of stop and frisk incidents over the years by race/ethnicity and gender broken out by ward, neighborhood, police sector, police service area, and census tract. The mapping and associated data can be found [here](https://github.com/mahkah/dc_stop_and_frisk).

<sup>1</sup> If anyone [feels strongly about the neighborhood boundaries used](https://www.popville.com/2018/01/official-north-boundary-petworth-is-kennedy-street/) and wants more information on the boundaries of the neighborhood clusters, check out the [DC OpenData Portal](http://opendata.dc.gov/datasets/neighborhood-clusters).

<sup>1</sup> ![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/nbh_racial_profiles.png)

<sup>1</sup> Because we employed different matching methods, there are some slight variations in the overall number of matched@@@

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
