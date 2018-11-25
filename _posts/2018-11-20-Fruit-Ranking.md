---
layout: post
title: Fruit Ranking!
---

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_header.png)


About The Survey
--------------

A few weeks ago on a late-night walk home after getting ice cream with a friend, we started talking about the best/worst kinds of fruit in ice cream, which led to a large conversation about fruits. We started asking each other fruits and assigning them to a category using a [tier list system](https://en.wikipedia.org/wiki/Tier_list), ranging from A to F. This was the genesis of an informal fruit ranking process that I unleashed in just about any social situation that would generally lead to a good argument. So after a few weeks of asking the friends to rank fruits, I decided to write a survey to definitively prove what a non-random sample of people in my network think about fruits. The first obstacle was picking the fruit; I wanted to have a lot of options without overwhelming respondents or selecting obscure fruits, leading respondents to just pick randomly to get through the survey. Some shortcuts were taken, such as only having an option for red and green apples and not splitting up grapes, leading to a fair amount of outcry.

As of writing this, the survey fielded 450(!) completes within the first few days and is currently still open and can be found here: (https://goo.gl/forms/92TnNIjexX4Maam63). I will continue to collect responses for the foreseeable future, updating the analysis whenever possible. So if you are reading this and haven't taken the survey yet, please stop and take the survey now to contribute your closely held fruit opinions. Thank you to everyone who took the time to complete and share this completely frivolous but important bit of research. 

A note of caution for those seeking to draw larger conclusions from this data, the survey is in no way representative of a larger population (Unless the US is suddenly much more female and <i>way</i> more liberal than the current affairs would have me believe). For a full breakdown of the survey demographics, see the [table in the Appendix](#footnote-demo-table). 

In order to account for the demographic skew in the data, I weighted the results on gender, age and race to the US adult population. However, since this survey wasn't fielded using any random sampling methods, I decided that any post-stratification weighting or extrapolation to the general population would be a stretch. The weighted results can be [found in the Appendix](#appendix-weighted), but won't be the the focus of the following analysis.

Fruit Ranking
--------------

On average, it's clear that most people like most of the fruits presented. The majority of respondents rated the fruit items in the highest tiers: A & B, while only 16% of respondents ranked certain fruits in lowest tiers: D & F.  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/overall_bar_plot.png)

Overall, strawberries appear to be the crowd favorite (88% of respondents ranked the fruit as A or B-tier), narrowly beating out raspberries.

At the other end of the scale, the palpable hatred of honeydew stands out. 27% of respondents ranked the fruit F-tier -- that's equal to the total number of people ranking bananas as A-tier. Next in line at second from last are Apricots. However, unlike honeydew, apricots aren't strongly disliked, rather they are a good example of a C-tier fruit.

Along with honeydew, cantaloupe and grapefruit have the highest proportion of F-tier ratings among the fruits tested.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_heatmap_plot.png)

Next, to examine the relationship between fruits, I ran a correlation matrix for all of the fruits tested. The green shading represents positive relationships, while the red indicates negative. Most of the fruits have positive, if weak, relationships with one another. 

The strongest positive relationship is observed between honeydew and cantaloupe, with an R-squared of 0.65; meaning that if a respondent rated honeydew/cantaloupe favorably, then they most likely rated the other fruit favorably. Interestingly, cantaloupe and honeydew have some of the strongest negative correlations with raspberries.

The two citrus fruits tested, oranges and clementines, are both positively correlated. This validates what we'd expect; if you like clementines, then you most likely also like oranges.  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/correlations_matrix.png)

Fruit Ranking by Demographics
--------------

For the remainder of this analysis, I'm going to introduce a new unit of measurement: the Fruit GPA<sup>TM</sup>. Because survey respondents were asked to assign fruits to a grade-level tier, we can convert these values into a numerical scale and take the average, like a GPA.

The plot below shows the overall distribution of the fruits by their Fruit GPA score. We see a ranking that is relatively similar to the previous chart with the proportion of tiers order by the fruit's A-tier percent. More importantly this chart also shows the standard error calculated from the standard deviation for each of the fruits. Fruits such as grapefruit, honeydew, and cantaloupe have the largest standard deviations (1.34, 1.32, and 1.30 respectively) compared to the more popular fruits like  strawberries and raspberries with smaller standard deviations (.88 and .92). The higher standard deviation for our relatively unpopular fruits indicates a relatively wider distribution of ratings from the average, while the opposite is true for our popular fruits.  

Lastly, you can probably notice that all the standard error bars are overlapping, indicating that there isn't a statistically significant difference in opinions towards the fruit. Guess there goes any shot I had at getting this study published :disappointed:

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/overall_gpa_se.png)

Across the board, men tend to be more lukewarm towards the fruit tested. Women show stronger preference towards strawberries and raspberries, and a much stronger aversion towards honeydew and cantaloupe. The highest rating of all fruits tested goes to Cherries at 3.53 among non-binary respondents.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_gender_recode_plot.png)

While the average rating of fruit between men and women is relatively similar, there is a much wider distribution of ratings among women compared to men. This indicates that women are more polarized about the fruit they like/don't like, while men are more middle of the road, rating each one close to the overall average. The plot below shows the distribution of the average rating of each fruit along with quartile ranges by gender.  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_ridges_gender_recode_plot.png)

There are some interesting variations in opinion towards fruit among racial lines. For example, white respondents seem to like clementines more than black respondents, however black respondents ranked oranges more favorably than white respondents. However, neither racial group seems to like clementines as much the Hispanic/Latino survey participants.

There is also a sizable gap in views towards raspberries between black and white respondents. Fitting the data to a logistic regression reveals that black respondents are 80% less likely to rate raspberries favorably  compared to white respondents, controlling for gender, age, income, and daily fruit servings. 

Watermelon and peaches are rated the most favorably among Asian respondents compared to other races.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_race_recode_plot.png)

At face-value, age appears to be a driving factor in attitudes towards fruits. Survey respondents over the age of 50 actually rated cantaloupe above the 3.0 threshold, while younger respondents put it just above and below the 2.0 threshold. Add that to the ever growing list of things that Millennials are killing. Respondents over 50 also rated strawberries, the people's champion of this survey, and Mango as 2.5 fruits.

In general there appears to be much more of an intensity/polarization among younger age groups (25-39) towards specific fruits compared to those over 50.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_age_plot.png)

As a part of the survey, respondents were asked how many servings of fruit they eat per day on average. This question is subject to some social desirability bias, but I wanted a proxy way to measure how familiar people are with fruit.

On average, those who eat more fruit a day tend to have more favorable ratings towards fruit. Respondents who eat four or more rated all of the fruit items 2.91 on average, compared to those who eat 0 servings a day at 2.65. Notably, there is little difference in attitudes towards cantaloupe among different levels of fruit consumption. <b>Even those who love fruit hate cantaloupe and honeydew.</b>

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_fruit_servings_plot.png)

The survey also asks a number of political questions, such as Party ID, ideology, and 2016 presidential vote. However, because of my massive and apparent political bubble, there aren't enough conservative/Trump voters to really look at them in detail. So if you get into a political argument with your family over the holidays, you can deflect by having them take this survey. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_ideo_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_pres_plot.png)

Although it's not very difficult to get pretty much any fruit throughout the country thanks to our advance agricultural infrastructure, I was curious to see if geography played a role in attitudes towards specific fruits. In most states, raspberries and strawberries are ranked the highest, with the exception of a few states. Washingtonians in particular rated blueberries the highest, which might have something to do with the [state's high production of blueberries](https://www.worldatlas.com/articles/the-top-blueberry-states-in-america.html).

Why Pennsylvanians hate Kiwis so much is beyond me.

<i>States/regions with less than 10 respondents were excluded from the analysis.</i> 

<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
</head>
<body>
<div style="margin: 0 auto; display: table; margin-top: 1em;">
<table align="center" class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >
<thead>
<tr><td colspan='4' style='text-align: left;'>
Highest/Lowest Rated Fruits by State</td></tr>
<tr>
<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'></th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'></th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Fruit</th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Average GPA</th>
</tr>
</thead>
<tbody> 
<tr><td colspan='4' style='font-weight: 900;'>California</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Raspberries</td>
<td style='text-align: center;'>3.58</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.6</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>District of Columbia</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Strawberries</td>
<td style='text-align: center;'>3.54</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.3</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Illinois</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.62</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Pineapple</td>
<td style='text-align: center;'>3.77</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Maryland</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Strawberries</td>
<td style='text-align: center;'>3.5</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.78</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Massachusetts</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Strawberries</td>
<td style='text-align: center;'>3.6</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.6</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Michigan</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Raspberries</td>
<td style='text-align: center;'>3.4</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.77</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>New York</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Strawberries</td>
<td style='text-align: center;'>3.31</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.96</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Outside of US</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Raspberries</td>
<td style='text-align: center;'>3.39</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.44</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Pennsylvania</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Raspberries</td>
<td style='text-align: center;'>3.69</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Kiwi</td>
<td style='text-align: center;'>1.85</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Virginia</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Strawberries</td>
<td style='text-align: center;'>3.31</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.38</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Washington</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Green Apples</td>
<td style='text-align: center;'>1.27</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Blueberries</td>
<td style='text-align: center;'>3.45</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Wisconsin</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Highest Rated</td>
<td style='text-align: center;'>Raspberries/Cherries</td>
<td style='text-align: center;'>3.35</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Lowest Rated</td>
<td style='text-align: center;'>Honeydew</td>
<td style='text-align: center;'>1.73</td>
</tr>
</tbody>
</table>
</div>
</body>
</html>

Next, by aggregating states within regions, we can see the most popular fruits by [census region.](https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf) Not surprisingly, strawberries and raspberries reign supreme across the country, with an interesting East/West divide.

<figure class="video_container">
<iframe width="800" height="600" src="https://rawgit.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/region_map.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

While many articles are written about the ever growing rift between Urban and Rural America, one thing unites us all: our hatred of honeydew. Respondents who grew up in urban zip codes rated the fruit exactly the same as those who grew up rural zip codes.

On average, urban respondents rated most fruits higher than their rural counterparts. However, fruits like Apricots, Red Apples, and Pears are more popular among rural respondents. 

If a fruit falls below the diagonal line in the chart below, that means that the fruit is ranked <i>higher</i> among respondents that grew up in urban areas compared to those who grew up in rural areas. And the opposite is true if a fruit is above the diagonal line. The [2010 Urban Area Relationship file](https://www.census.gov/geo/maps-data/data/ua_rel_download.html) provided by the US Census was used to define urban/rural zip codes. Like most parts of this analysis, there is a demographic skew: less than 10% of respondents that put in a valid zip code grew up in a rural area. 

<figure class="video_container">
<iframe width="600" height="600" src="https://rawgit.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/urban_rural.html" frameborder="0" allowfullscreen="true"></iframe>
</figure>
<br>

Fruit or Not Fruit!
--------------

After ranking fruit, respondents were then asked to weigh in on the question: are these items fruit or not fruit? 

Despite the fact that all of the items presented are technically classified as fruits, the consensus appears to be that all but one of the items are not fruits. Respondents were more divided on tomato and avocado, split nearly down the middle, while overwhelmingly rejecting pumpkin, cucumber, and bell pepper. Coconuts are the lone food item that a majority of respondents agree is actually a fruit.  

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_not_fruit_plot.png)

Men and women are unified in their opinions towards the resounding not-fruits pumpkin, Cucumber, and Bell Pepper. However things start to fall apart with avocado and tomato. Men and non-binary respondents tend to view avocado and tomato as a fruit more than women.

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_demo_gender_recode_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_demo_race_recode_plot.png)

Again, there is an apparent and interesting ideological divide on attitudes towards fruit by age. On average, respondents over 50 years old stated that each item was more of fruit than respondents under 50. The schisms are most apparent with tomatoes, avocados, and pumpkins. 

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_demo_age_plot.png)

Thanks & Conclusions
--------------

In conclusion, if you wanted to make the "best" smoothie (as determined by everyone who took this survey), grab a bunch of strawberries, raspberries, peaches, mangoes, and pineapple. If you're a monster and want to make the "worst" smoothie, well just grab honeydew, cantaloupe, green apples, and apricots. 

Thank you again to everyone who shared this survey. The fact that I was able to collect the opinions of 450 people in only three days while spending no money blows my mind. This work wouldn't have been possible without all of you.

I hope to use this data in a few more projects in the future and will update this website with more fruit related things.

I'll end this with a link to the survey in case you missed it: (https://goo.gl/forms/92TnNIjexX4Maam63)

Survey Demographics
--------------

<a name="footnote-demo-table"></a>
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
</head>
<body>
<div style="margin: 0 auto; display: table; margin-top: 1em;">
<table align="center" class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id=''>
<thead>
<tr><td colspan='4' style='text-align: left;'>
Demographic Summary Table</td></tr>
<tr>
<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'></th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Response</th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>N</th>
<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Percent</th>
</tr>
</thead>
<tbody> 
<tr><td colspan='4' style='font-weight: 900;'>Gender</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Male</td>
<td style='text-align: center;'>144</td>
<td style='text-align: center;'>32%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Female</td>
<td style='text-align: center;'>283</td>
<td style='text-align: center;'>64%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Other</td>
<td style='text-align: center;'>17</td>
<td style='text-align: center;'>4%</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Race/Ethnicity</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>White/Caucasian</td>
<td style='text-align: center;'>360</td>
<td style='text-align: center;'>81%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Black or African American</td>
<td style='text-align: center;'>12</td>
<td style='text-align: center;'>3%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Hispanic or Latino</td>
<td style='text-align: center;'>11</td>
<td style='text-align: center;'>2%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Asian/Pacific Islander</td>
<td style='text-align: center;'>29</td>
<td style='text-align: center;'>7%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>American Indian or Alaskan Native</td>
<td style='text-align: center;'>3</td>
<td style='text-align: center;'>1%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Multiple ethnicity/Other</td>
<td style='text-align: center;'>29</td>
<td style='text-align: center;'>7%</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Household Income</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Under $50,000</td>
<td style='text-align: center;'>160</td>
<td style='text-align: center;'>36%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>$50,000 to $100,000</td>
<td style='text-align: center;'>147</td>
<td style='text-align: center;'>33%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Over $100,000</td>
<td style='text-align: center;'>94</td>
<td style='text-align: center;'>21%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Not sure/Refuse</td>
<td style='text-align: center;'>43</td>
<td style='text-align: center;'>10%</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>2016 Presidential Vote</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Democrat Hillary Clinton</td>
<td style='text-align: center;'>374</td>
<td style='text-align: center;'>84%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Republican Donald Trump</td>
<td style='text-align: center;'>3</td>
<td style='text-align: center;'>1%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Green Party Jill Stein</td>
<td style='text-align: center;'>10</td>
<td style='text-align: center;'>2%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Libertarian Gary Johnson</td>
<td style='text-align: center;'>2</td>
<td style='text-align: center;'>0%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Did not vote</td>
<td style='text-align: center;'>37</td>
<td style='text-align: center;'>8%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Refuse</td>
<td style='text-align: center;'>18</td>
<td style='text-align: center;'>4%</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Party ID Initial</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Democrat</td>
<td style='text-align: center;'>346</td>
<td style='text-align: center;'>78%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Independent</td>
<td style='text-align: center;'>61</td>
<td style='text-align: center;'>14%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Republican</td>
<td style='text-align: center;'>7</td>
<td style='text-align: center;'>2%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Not sure</td>
<td style='text-align: center;'>30</td>
<td style='text-align: center;'>7%</td>
</tr> 
<tr><td colspan='4' style='font-weight: 900;'>Ideology</td></tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Liberal</td>
<td style='text-align: center;'>369</td>
<td style='text-align: center;'>83%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Moderate</td>
<td style='text-align: center;'>52</td>
<td style='text-align: center;'>12%</td>
</tr>
<tr>
<td style='text-align: left;'>&nbsp;&nbsp;</td>
<td style='text-align: center;'>Conservative</td>
<td style='text-align: center;'>4</td>
<td style='text-align: center;'>1%</td>
</tr>
<tr>
<td style='border-bottom: 2px solid grey; text-align: left;'>&nbsp;&nbsp;</td>
<td style='border-bottom: 2px solid grey; text-align: center;'>Not sure</td>
<td style='border-bottom: 2px solid grey; text-align: center;'>19</td>
<td style='border-bottom: 2px solid grey; text-align: center;'>4%</td>
</tr>
</tbody>
</table>
</div>
</body>
</html>

<a name="appendix-weighted"></a>
Weighted Results
--------------

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/fruit_heatmap_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_gender_recode_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_race_recode_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_age_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_income_recode_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_pres_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_ideo_wtd_plot.png)

![](https://raw.githubusercontent.com/GWarrenn/gwarrenn.github.io/drafts/images/fruit_ranking/demo_fruit_servings_wtd_plot.png)
