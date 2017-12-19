---
layout: post
title: Voter Behavior
---

# Summary
In a democracy, voting is the minimal political participation requested from its citizens. Yet America is notorious for its low voter turnout rates. So why do so many people choose not to vote? The common explanation for this is that Americans take representation for granted and believe that a single vote doesn’t matter in a country so large. In additional there is a theory that informed voting takes effort that many people do not wish to make. There are many political and social campaigns to increase voting numbers. In an attempt to examine one potential factor of political involvement this paper investigates the correlations between the relationship that unemployment has on voting. 

This project aims to investigate the reasons for this and explain some of the variance between counties, and for specific counties between years. 

I scraped voter data from a third party site chosen for it's relatively consistent html base and format. Unemployment Rates for the election months were taken from the Bureau of Labor Statistics and reformatted in a notebook attach to this project. As well as census data by county, and land area of each county.

To add depth to the project I plan to find importance the campaigns placed on jobs or unemployment rate relative to the other elections. As well as the polarization of issues related to density. I plan to take major candidates speeches and advertisements transcripts and analyze with natural language processing to accomplish this.

The goal of this project is to explain how campaign rhetoric is reflected in voting behavior. This is based on the thesis that candidates focus on a topic that influences voting behavior in counties with indicators related to the topic. In other words, campaign rhetoric affects the decision to vote.

# Conclusions

I was able to predict the Election a speech was made in with an Accuracy Score of 97%. Below are the left are the most frequent words per election, and on the right are the coefficients for that election. The goal is to find the topics in each election's speechs reflected in wht factors influence voter participation.


![an image alt text](/images/Voter_images/words_2008.png "Coefficients Graph 2008") 
![an image alt text](/images/Voter_images/total_feat_2008.png "Word Frequency Graph")


![an image alt text](/images/Voter_images/words_2012.png "Coefficients Graph 2008") 
![an image alt text](/images/Voter_images/total_feat_2012.png "Word Frequency Graph")
The most interesting features in the 2012 election were the Unemployment Rates for October and November. The November Unemployment Rate has a negative coefficient, while the October Rate has a relatively high positive one. The October rate show what people are reacting to conceptually, and the November Rate show the Actual Unemplayment they face on election day. So in counties with 


![an image alt text](/images/Voter_images/words_2016.png "Coefficients Graph 2008") 
![an image alt text](/images/Voter_images/total_feat_2016.png "Word Frequency Graph")
In the 2016 Election the higher the percent on people in the country who lived under the poverty line, the lower Voter Participation was. Interestingly the most common word by far was people. This may a a coincidence or it oculd be that those who lived above the poverty line reacted favorably to the nominees talking about the people.

