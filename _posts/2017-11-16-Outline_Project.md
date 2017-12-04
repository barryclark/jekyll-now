---
layout: post
title: Voter Behavior
---

  In a democracy, voting is the minimal political participation requested from its citizens. Yet America is notorious for its low voter turnout rates. So why do so many people choose not to vote? The common explanation for this is that Americans take representation for granted and believe that a single vote doesn’t matter in a country so large. In additional there is a theory that informed voting takes effort that many people do not wish to make. There are many political and social campaigns to increase voting numbers. In an attempt to examine one potential factor of political involvement this paper investigates the correlations between the relationship that unemployment has on voting. 

  This project aims to investigate the reasons for this and explain some of the variance between counties, and for specific counties between years.
  
  By looking at unemployment rates next to voter turnout to examine possible correlation, we can begin to understand some of the concerns and circumstances which motivate people to go to the polls. Unemployment is a particularly interesting factor because it functions as both a practical and political factor in the decision to vote. Some possible effects could include that when the unemployment rate is up fewer people have work keeping them from the polls on election day. High unemployment rates also unset the populous either because they personally don’t have a job or the general state of the economy worries them, possibly driving more people to vote in an election for a candidate believed to expand the economy. To examine the relationship between unemployment and voter turnout in the United States over four separate years, a regression analysis will be conducted. 

  During election years it can feel like you are drowning in data about the election between primaries, polls, and new reports. However it is suprisingly hard to come across useable data to use for statistical modeling. The Freedom of Information Act mandates that election information be availible but it does not dictate how each state provides it. As a result there is no official government site hosting county level presidental election results. 
  
  I scraped voter data from a third party site choosen for it's realitively consistent html base and format.Unemployment Rates for the election months were taken from the Bureau of Labor Statistics and reformated in a notebook attach to this project. As well as census data by county, and land area of each county.
   
  To add depth to the project I plan to find importance the campaigns placed on jobs or unemployment rate relative to the other elections. As well as the polarization of issues related to density. I plan to take major candidates speeches and advertisements transcrips and analyize with natural language processing to accompish this.
  
  The goal of this project is to explain how campaign rhetoric is reflected in voting behavior. This is based on the thesis that candidates focus on a topic influences voting behavior in counties with indicators relatd to the topic. In other words, campaign rhetoric affects the decision to vote.
  
  I will be using linear regression models and time series regression on the voting data incorporating the results fo the natural langage processing. 

  ![an image alt text](/images/2004_dem_scatter.png "2004 Democratic Votes")
