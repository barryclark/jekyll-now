---
layout: post
title: Stop & Frisk in DC
---	

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/sf_header.png)

About the Data
--------------

Earlier this year, the DC Metropolitan Police Department (MPD) released incident-level stop and frisk data, documenting individual stop and frisk encounters between 2010 and 2016. The full dataset, which can be found [here along with further documentation](https://mpdc.dc.gov/publication/stop-and-frisk-data-and-explanatory-notes) contains demographic information about the subject that was stopped, as well as the time and block where there subject was stopped by police. This data provided an opportunity to examine the policing behavior in the District.  

In 2016, DC City Council passed the Neighborhood Engagement Achieves Results Amendment Act of 2016, or NEAR Act. The legislation was designed to be a "comprehensive, public health-based approach to crime prevention and intervention", as described by its author [Kenyan R. McDuffie, who represents Ward 5](http://www.kenyanmcduffie.com/nearact/). One of the key elements of the law was to require the MPD to collect richer data on felony crimes, stops and frisks, and use of force incidents.

Since 2016, [the MPD has failed to collect and report the additional stop and frisk data](https://www.wusa9.com/article/news/investigations/dc-police-not-following-law-requiring-stop-and-frisk-data-collection-2-years-after-it-was-passed/65-532319128) as required by the NEAR Act. This data includes critical information that demonstrates the basis of the stop and frisk incident, including what grounds led to the stop and whether an arrest was made. 

Various DC advocacy organizations, including Black Lives Matter D.C., Stop Police Terror Project D.C., and the American Civil Liberties Union of the District of Columbia, have petitioned and FOIA-ed the MPD to release the data. However, as the Washington City Paper reports, the MPD denied the initial FOIA request in 2017 because the data collection systems (required by law) had not been put in place. A year later, the information was again requested and the organizations were met with the same response. Now the groups are further [pressing the Mayor's office](https://www.acludc.org/en/cases/black-lives-matter-dc-v-bowser) to either release the detailed data or, if the data is truly lost, put in place a process to start collecting the data, as required by law.

When questioned by DC Judiciary and Public Safety Chairman Charles Allen as to why the additional data had not been collected earlier this year, DC Police Chief Peter Newsham stated that the MPD [was guilty of not following the data collection under the law](https://www.wusa9.com/article/news/local/dc/dc-police-chief-police-guilty-of-not-following-stop-and-frisk-data-collection-law/65-533509822), but has worked to develop other data systems under the NEAR Act. This is disheartening and frustrating considering that the MPD has invested resources and time in building out other data systems, like [DC Crime Cards](https://dcatlas.dcgis.dc.gov/crimecards/).

It is important to note that I am not familiar with the inner workings of the NEAR Act and the steps the MPD have taken towards compliance. Rather, all of this is to say, there are a lot of questions that I wanted to investigate and to answer, that other researchers have tackled, like [this really incredible research on racial disparities in "hit-rates," or when an arrest is made](https://5harad.com/papers/frisky.pdf), but I was confronted with a lack of detailed data. I will be following the ongoing lawsuit against the MPD and Mayor's office and updating the work below if any further data is provided. If you live in DC and want to see the NEAR Act fully implemented and want to hold law enforcement accountable and transparent, please consider supporting the work being done by organizations like [Black Lives Matter D.C.](http://www.blacklivesmatterdmv.org/), [Stop Police Terror Project D.C.](https://www.sptdc.com/), and [the American Civil Liberties Union of the District of Columbia](https://www.acludc.org/en) in their legal fight.

While I'm also discussing data shortcomings, I should also flag an equally important factor in the analysis: my demographic background, mostly my race. My interactions with police as a white man are starkly different than that of people of color. How I framed this analysis is based on previous academic research and reports, as well as what I've heard and learned about how different communities view policing. However, there are perspectives that I am frankly missing and that may be evident in my analysis to many. I consider this a living piece of research and am open to hearing new ideas and viewpoints that might have been missed.  

Stop & Frisk: Overview
--------------

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/01_monthly_sf.png)

The number of monthly stop and frisk incidents, on average, has increased  since the MPD started collecting and reporting data in 2010. Interestingly, there was a noticeable drop in incidents near the end of 2014. This roughly coincides with Mayor Bowser's inauguration in 2015, indicated by the vertical reference line on the chart, possibly suggesting a change in policing policy. However, since that initial drop, there has been a rapid increase in monthly stop and frisk incidents across the city. This isn't to say that there is a causal relationship between the two or that the mayor has a giant "conduct more unconsitutional stops across the city" button on her desk that she slapped upon becoming mayor (though the ball is in her court to prove there isn't one); there are obviously more factors at play here, just an interesting pattern in the data.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/02_time_of_day_sf.png)

Generally, the majority of stop and frisk incidents occur after 5:00 PM and before 6:00 AM. There are some minor differences among racial lines. Incidents among white subjects peak in the late/early hours between 1:00 AM - 4:00 AM, while black subjects experience higher frequency of incidents during the evening, with the highest proportion of incidents occurring around 9:00 PM.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/03_census_sf_race.png)

While we're talking about race and stop and frisk, it's important to note that, overall, the majority of these incidents involve people of color, specifically black people. Between 2010 and 2016, ~80% of all stop and frisk incidents involved black subjects, while black residents account for ~48% of the DC population, as of the last decennial census in 2010.

Along with the stop and frisk data, the MPD also reported on "field contact reports" from 2012 to 2016. The main difference between a field contact and stop and frisk, as the documentation reports, is that field contact incidents are non-forcible stops and/or questioning between MPD and a citizen. I made the decision to group them together because a forcible/non-forcible stop still represented police intervention in the community. For the majority of the analysis we will consider the two to be one in the same as we are interested in any and all contact between police and the public. However, we'll spend a bit of time looking at the differences now.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/race_contact.png)

Overall, there is little difference in contact type by race. Black people comprised ~81% of both non-forcible and forcible, however white people were slightly more likely to experience non-forcible encounters with police than forcible encounters.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/gender_race_contact.png)

Across all racial groups and stop types, subjects identified by MPD as male comprise a majority of incidents. However, there are some notable gender differences by contact type. Overall, women, especially white women, experienced more non-forcible than forcible contact with the police. 



![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/reason_for_stop.png)

Unlike the forcible stop and frisk incidents, the field contact incident data contains a record of what led to the contact, along with the standard demographics.

Keeping the important difference between forcible and non-forcible stops in mind, we see that moving violations are the the catalyst for a majority of non-forcible encounters among white subjects, while black & Hispanic/Latino subjects were cited more frequently for "Suspicious Vehicles/Persons/Activities"

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/04_sf_age_dist.png)

Turning back to all stop and frisk incidents, people of color skew younger than white people that were stopped and frisked by MPD. The average age of black and Hispanic/Latino subjects was 28, compared to 33 for white subjects. (Data/analysis note: MPD doesn't record ages for juveniles, instead categorizing them as "juveniles." I opted to code all juveniles as 16) 

Mapping Stop & Frisk Incidents
--------------

Part of the data provided by the MPD includes a rough location of where the incident took place, something along the lines of '4200 BLOCK OF 7TH STREET SE.' In order to get a more precise/mappable dataset to map each incident to a latitude and longitude, along with the help of a friend and collaborator, [Mahkah Wu](https://github.com/mahkah/), I extracted the incident street name and address then joined the data to a full list of block centroids containing latitude and longitude (provided by [DC OpenData](http://opendata.dc.gov/datasets/block-centroids)).

Overall, I was able to match ~95% of the incidents provided by MPD to a latitude and longitude (The remaining addresses were not specific enough or correct addresses to be matched). I then used the R geospatial package 'sp' to classify each incident I was able to match to a latitude and longitude to one of 39 neighborhood clusters in DC.

Once we were able to map the addresses to lattitude and longitude, Mahkah then created a district-wide map of stop and frisk incidents over the years by race/ethnicity and gender broken out by ward, neighborhood, police sector, police service area, and census tract. The mapping and data can be found here: (https://github.com/mahkah/dc_stop_and_frisk)

<figure class="video_container">
<iframe width="800" height="600" src="https://rawgit.com/mahkah/dc_stop_and_frisk/master/index.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>

Stop & Frisk: Neighborhoods
--------------

For the remainder of the analysis, I will use DC's 39 neighborhood clusters as the unit for analysis and comparison, looking at trends across and within neighborhoods.

If anyone [feels strongly about the neighborhood boundaries used](https://www.popville.com/2018/01/official-north-boundary-petworth-is-kennedy-street/) and wants more information on the boundaries of the neighborhood clusters, check out the the [DC OpenData Portal](http://opendata.dc.gov/datasets/neighborhood-clusters)

The interactive visualization below let's you dig into some basic trends and demographic profiles of each of the 39 neighborhood clusters in DC, which we'll be diggin into in more depth shortly. For example, we can see notable differences in stops by time of day in more residential neighborhoods like "Brightwood Park, Crestwood, Petworth" and neighborhoods with a more active nightlife like "Kalorama, Adams Morgan, Lanier Heights"

<figure class="video_container">
<iframe width="800" height="600" src="https://dc-stop-frisk.herokuapp.com/" frameborder="0" allowfullscreen="true"></iframe>
</figure>


![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/05_nbh_sf.gif)

Since 2010, Petworth, Columbia Heights, Congress Heights, and Downtown/Chinatown have racked up the highest amount of stop and frisk incidents among DC neighborhood clusters. However, I wanted to make sure that the analysis wasn't simply measuring neighborhood population density (or where all the people are), so I also ran the number of stop and frisk incidents as a function of neighborhood population (again using 2010 Census).

Once we adjust for neighborhood population, we see some big changes in stop and frisk patterns. Columbia Heights/Petworth & Congress Heights/Bellevue no longer stand out, while neighborhoods like Historic Anacostia and Brookland/Brentwood increase once normalized for population.

Another important note: population in DC is a weird thing. Some areas, like Downtown/Chinatown are densely populated during work hours and happy hour, but have a relatively smaller residential population. This is part of the reason why there is little change for the Chinatown neighborhood while controlling for population, it has a relatively lower Census population, but gets a high amount of foot traffic to museums and sports events.

Using neighborhood Census data, we can look at the neighborhood-level breakdown of stop and frisk incidents by race compared to the neighborhood racial composition. The idea here is to see if we can identify disproportionality in stop and frisk at a neighborhood level -- whether certain racial groups are stopped or targeted at a greater rate than their actual representation in the neighborhood -- or, walking while black. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/06_nbh_sf_race.png)

Each dot represents a racial group in a given neighborhood. If the dot is  below the diagonal line, then that racial group is stopped at a greater rate than actually live in that neighborhood. The dots are sized by number of total number of incidents from 2010 to 2016.

We can see that, for the black racial cohort, there are a few clusters. First, there is a cluster of neighborhoods that have less than 10% black residents, but black subjects make up more than 50% of reported stop and frisk incidents. Second, there are a number of neighborhoods with 25% to 50% black residents with 60% to 90% of stop and frisk incidents involving black people.  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/07_nbh_diff_black.png)

This chart shows the same disproportionality as in the previous chart specifically among the black subjects, displaying the proportion of stop and frisk incidents minus the census proportions, with neighborhood names listed. The biggest disproportions are apparent in whiter, more affluent neighborhood clusters in Northwest DC, including Cleveland Park, Friendship Heights, Kalorama Heights, and Georgetown.

The Relationship between Crime and Stop & Frisk
--------------

If you were to answer the question, "How would you go about reducing crime in the city?" How would you answer it? Myself, after wondering how in the hell I found myself in the position to be making such a decision, I might respond: send officers to areas with the highest amounts of crime, right? 

I think that's how Lennie Briscoe might respond, at least.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/08_crime_frisks.png)

Throughout this section it's important to keep the words of [Hadley Wickham](https://github.com/hadley/r4ds/blob/drafts/model-basics.Rmd) in mind: 

> "The goal of a model is not to uncover truth, but to discover a simple approximation that is still useful."

The chart above illustrates a pretty linear relationship between the previous year's crime level and stop & frisk in each neighborhood of DC. Of course, there are dozens and dozens of other confounding variables that are not being considered in this simplistic approach, but if you were only to use this one variable to predict stop and frisk, you would end up with a model like this:

<table align="center" style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
		<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
		<tr><td style="text-align:left"></td><td>Average Stop & Frisk</td></tr>
		<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Average previous year crime</td><td>1.461<sup>***</sup></td></tr>
		<tr><td style="text-align:left"></td><td>(0.117)</td></tr>
		<tr><td style="text-align:left"></td><td></td></tr>
		<tr><td style="text-align:left">Constant</td><td>4.170</td></tr>
		<tr><td style="text-align:left"></td><td>(11.255)</td></tr>
		<tr><td style="text-align:left"></td><td></td></tr>
		<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>39</td></tr>
		<tr><td style="text-align:left">R<sup>2</sup></td><td>0.808</td></tr>
		<tr><td style="text-align:left">Adjusted R<sup>2</sup></td><td>0.803</td></tr>
		<tr><td style="text-align:left">Residual Std. Error</td><td>41.543 (df = 37)</td></tr>
		<tr><td style="text-align:left">F Statistic</td><td>156.007<sup>***</sup> (df = 1; 37)</td></tr>
		<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>

The "crime-only" model that we've created shows a pretty strong relationship between the previous year crime rate and current year stop and frisk with an R-squared of about .80. More specifically, for one unit of increase in a neighborhood's previous year crime rate, the number of stop and frisks in the current year will increase by a factor of 1.46.

With that in mind, we can take this model to predict the next year's level of stop and frisk in any given neighborhood and then use the current year stop and frisk to test/validate how the model performed.

To test specifically how well the model performed we'll look more closely at the model's residuals and how they vary by neighborhood. What a model's residuals essentially measures is how far from the expected/predicted value was the actual value. That is to say, how many stop and frisk incidents did the model predict vs. how many actually occurred. 

The chart below plots the neighborhood-level crime-only model residuals along the y-axis by the neighborhood proportion of residents of color (again from the 2010 Census) along the x-axis. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/crime_model_residuals.png)

When viewed through a racial context, this "crime-only" approach to modeling stop and frisk appears to have its limits; it generally over predicts the number of stop and frisk incidents in whiter neighborhoods and under predicts the amount of stop and frisk in neighborhoods with higher concentrations of people of color. If police were only to use crime as a decision making data point then we would expect to see equal distribution of residuals across neighborhoods with varying levels of residents of color. This indicates that there is something else driving the relationship between stop and frisk and crime (and it might have something to do with race).

In order to understand what might be causing the model to inaccurately predict stop and frisk purely based off the previous crime level alone, we need to look at the underlying data a bit further.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/10_sf_arrests_nbh_race.png)

Despite having lower levels of crime than racially diverse neighborhoods, the neighborhoods with the highest concentration of residents of color have astoundingly high rates of stop and frisk. In neighborhoods like Ivy City/ Arboretum/Trinidad/Carver Langston/Woodridge/Fort Lincoln/Gateway, and Historic Anacostia, over 1 in 10 people were stopped and frisked yearly, on average, from 2012 through 2016. This tracks with what we saw earlier in the chart showing total stop and frisk adjusted for neighborhood population; specifically, the neighborhoods that have higher proportions of non-white residents tend to have lower populations but higher levels of stop and frisk per capita. Reminder, this chart does not take into account the race of the crime/stop and frisk incident -- we'll get into that next.

The Benefit (and lack thereof) of the Doubt
: Person-level Crime and Stop & Frisk Relationship
--------------

While the previous analyses were illuminating, there were certain limitations inherent in the data. Specifically, all of the charts and models were looking at all crime and stop and frisk in each neighborhood, regardless of race. This method was used because of the available data; the MPD releases all years of crime stripped of any demographic data of the assailant, with one exception. In March 2018 (shortly after starting this analysis endeavor), the MPD released person-level crime data with demographic data of [felony crime incidents in 2016](http://opendata.dc.gov/datasets/felony-crime-incidents-in-2016)

We can use this data to test a burning question: Is the stop and frisk rate higher/lower than the crime rate for various racial groups in DC? 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/11_nbh_crime_sf_race_scatter.png)

Similar to how we previously looked at stop and frisk as it compares to neighborhood racial composition, the chart above looks at the relationship between proportion of stop and frisk and crime by neighborhood and racial group. If a dot is below the diagonal line, then the group is stop and frisked at a higher rate than the crime rate for that group in that neighborhood, and vice versa if the dot is above the line. We find a similar, but more pronounced disproportionality across all neighborhoods in DC, where black residents are stopped at a higher rate than their racial group accounts for in the overall neighborhood crime rate. On average, the stop and frisk rate among black residents is ~30% higher than the crime rate among blacks.

Likewise, the stop and frisk rate is lower than the crime rate among whites acorss the majority of DC neighborhoods, with a crime rate 5% higher than the stop and frisk rate. A further breakdown by neighborhood and racial group is below. A guide to interpretation: if a racial group is less than 0 than the group is stopped at a greater rate than the crime rate in the neighborhood for that group, and vice versa if the group is greater than 0. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/12_nbh_diff_crimes.png)

Similar to to the population comparison, Cleveland Park/Woodley Park, Downtown Chinatown, and Shaw/Logan Circle stand out as containing the highest disproportionality among black and white residents.

Building off the "crime-only" model, now that we have access to demographic crime data, we can start to look at the relation between stop and frisk on an individual level, rather than a neighborhood level as we did previously. Except rather than using a linear regression to model the data, we'll use a Poisson regression, which is specifically geared toward modeling count data. This work is largely built off the research conducted by [Gelman, Fagan and Kiss (2007)]("http://www.stat.columbia.edu/~gelman/research/published/frisk9.pdf") examining stop and frisk in New York City in the late 1990's. The specific Poisson model we'll be using will estimate stop and frisk for each neighborhood while controlling for the race of the subject, the racial composition of the neighborhood in which they were stopped, and will use the crime rate for that racial group as an offset (Gelman et al. used the previous year, however we're only have access to the same year's crime data by race).

<table align="center" style="text-align:center"><tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"></td><td><em>Dependent variable:</em></td></tr>
	<tr><td></td><td colspan="1" style="border-bottom: 1px solid black"></td></tr>
	<tr><td style="text-align:left"></td><td>Total Stop Frisk</td></tr>
	<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Subject Race: Black</td><td>1.074<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.187)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Subject Race: Hispanic/Latino</td><td>0.856<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.249)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Neighborhood Percent Black: 10% - 40%</td><td>-0.519<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.162)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Neighborhood Percent Black: 40% - 60%</td><td>-0.312<sup>*</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.182)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Neighborhood Percent Black: 60% - 80%</td><td>-0.775<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.178)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Neighborhood Percent Black: 80% - 100%</td><td>-0.994<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.159)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td style="text-align:left">Constant</td><td>-1.716<sup>***</sup></td></tr>
	<tr><td style="text-align:left"></td><td>(0.197)</td></tr>
	<tr><td style="text-align:left"></td><td></td></tr>
	<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left">Observations</td><td>98</td></tr>
	<tr><td colspan="2" style="border-bottom: 1px solid black"></td></tr><tr><td style="text-align:left"><em>Note:</em></td><td style="text-align:right"><sup>*</sup>p<0.1; <sup>**</sup>p<0.05; <sup>***</sup>p<0.01</td></tr>
</table>

There are plenty of great (better*) resources on the Internet/public domain that can explain the details of Poisson regressions. However, if you're like me and just want to skim the relevant cross-validated/stack overflow posts to know the gist of how the model should be interpreted, then here's a quick explanation of the results above. The parameters displayed represent the multiplicative increase in stop and frisk for all neighborhood race compositions compared to the specific base factor. In the case of race, the base is white and in the case of neighborhood percent black, it's 0% - 10% black.

Translation: Across all neighborhoods in the District, black and Hispanic/Latino residents are stopped at a rate higher than their crime rate and are stopped 2.9 (exp(1.074)) and 2.4 (exp(0.856)) times more than white residents, controlling for each group's crime rate and neighborhood racial composition.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/stop_and_frisk/13_poisson_plot.png)

Following in the footsteps of Gelman et al., the chart above shows the estimated rates each racial group were stopped by neighborhood racial composition. The pattern we observed at the District-level tends to hold true across neighborhoods of varying racial composition, Black and Hispanic/Latino residents are stopped at higher rates than white residents across all neighborhood types. 

Notes
--------------

All of the code used for this project can be found here: (https://github.com/GWarrenn/dc_data/tree/drafts/03_stop_frisk) and all of the data can be accessed through the DC OpenData Portal.

As always, thank you to the DC Office of the Chief Technology Officer for making the data used in this analysis readily available and accessible.
