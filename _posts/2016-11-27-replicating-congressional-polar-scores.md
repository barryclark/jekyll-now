---
layout: post
title: 'Replication Study: #Polar Scores for Members of Congress"
author: carol
---

My final project is a replication study of a forthcoming paper by Libby Hemphill, et al. titled *#Polar Scores: Measuring Partisanship Using Social Media Content*. The paper uses CASM Lab’s <a href = "https://github.com/casmlab/purpletag">purpletag</a> repository to collect, parse, and analyze tweets from our congressional representatives' official Twitter accounts. Members of congress are given a #polar score based on the liklihood that the hashtags they have used come from Democrats or Republicans. While the existing paper uses data from the 2012 presidential election, I will use data previously collected by CASM Lab from the 2014 midterm election as well as data I collected myself from the 2016 election. So far I have completed the following steps:

* Locate original #Polar Scores paper (thanks, <a href = "https://telegram.me/scihubbot">scihub bot</a>!)
* Launch and configure an <a href = "https://aws.amazon.com/">AWS</a> instance for 2016 election purpletag data
* Collect, parse, score and serve <a href = "https://telegram.me/scihubbot">2016 election data</a> using purpletag
* Create a table from existing #polar scores showing members of congress scores by date

![](https://libbyh.github.io/methods-f16/images/purpletag2016.png)
*PurpleTag data: 2016 election*


<img src="https://libbyh.github.io/methods-f16/images/purpletag2016.png">

Next steps include:


* Clean up code to generalize table of member of congress scores from small working sample to larger data set, in separate script
* Run new script on 2016 data
* Find 2014 data on CASM Lab’s server & run new script on that data
* Compare #polar scores of members of congress 6 weeks prior to 2014 election (i.e. six 7-day windows) with similar period prior to 2016 election
* Create a table from existing #polar scores showing hashtag scores by date
* Generalize hashtag code into separate script and run hashtag script on 2014 and 2016 data
* Compare hashtag scores with member of congress scores
* Write scripts to perform additional analysis: which members of congress are using which hashtags, how many times per date is a hashtag used


I will finish by writing a paper that summarizes my findings and compares them to the original paper results. I will begin with only #polar scores of members of congress in 2016 and 2014 for six 7-day periods prior to the election. If time permits I will add analysis of hashtag scores, and possibly additional detail showing which members of congress use which hashtags, and how many times those hashtags are used.


