---
title:  "xG Model"
date:   2018-2-21
layout: single
author_profile: true
comments: true
tags: [analytics, data analytics, soccer analytics, xG, expected goals]
---

This is a blog post for all soccer analytics enthusiasts, even the beginners. :)

### What ?

One of the more enthusiastic experts and analysts, Michael Caley, defined the metric in layman’s terms:

“The idea is to quantify the likelihood of a goal being scored from a particular shot attempt (or other scoring chance). This is an idea that I think is quite intuitive. ‘We need to create better scoring chances’ is something managers have said forever, and xG is basically just a quantification of that notion. The broad concept has probably been around for a long time in football — Charles Reep’s notion that ‘one of every nine shots is scored’ is a sort of early version of xG.”

Ted Knuston, of Statsbomb, intererstingly said:

“It will also bring a new kind of fan to the game, absolutely. This kind of data overlaps with people who play Football Manager or fantasy league. It’s exactly the same thing, you take information about players and you evaluate them. If you want to be better in fantasy league then you need data. In the US almost everyone grows up with fantasy sports as much as the real thing now.”

### How ?

The most common factors used in an xG model are distance and angle of the shot. As you can guess, there are differences even within this. For instance, some people measure distance as where the shot was taken from or even how it was delivered to the location before the shot was taken (11tegen11 and Pleuler). Other factors, may be through-balls, free-kicks, corner kicks, whether it was a header or a normal shot, time of the game and so on. This means the factors available for analysis in a model like this could reach anywhere to 50+ factors I suspect.

<img src="https://cdn-images-1.medium.com/max/800/0*9xh7Dx3PyJepKJQs.jpg" width="75%">

<img src="https://cdn-images-1.medium.com/max/800/0*zlxSYb8rMenzhE7V.png" width="75%">

### My xG Model:

The idea is to be able to predict what will happen to particular chances and events, whether they will be converted or not, using particular attributes of data. I also use this opportunity to understand the importance of features through machine learning. All of this gives us an idea as to whether an event, if it occurs is likely to be a goal or not.

Data: Data provision courtesy of Stratabet. Here, I’ve used English Championship, English Premiership, Bundesliga, France, Spain, Italy, division 1 data. It dates from the beginning of season 16–17 to the current 17–18.

Attributes: For now, I’ve used attributes such as ‘icon’ (type of event), ‘shotQuality’ (used values defined by Stratabet), ‘defPressure’, ‘numDefPlayers’, ‘numAttPlayers’, ‘chanceRating’ (used values as defined by Stratabet), ‘type’ (defines passage of play). All attributes are encoded to particular values. The ‘outcome’ variable is binary encoded, ofcourse.

Although I’ve used the parameter chanceRating & shotQuality which covers the idea of a shot going in or not, I would also like to incorporate Shot location later on, myself.

Now I’ve implemented it in Python and it gets really ugly exporting all of that code to medium so I implemented it in the form of a Jupyter notebook and it’s pretty heavy. I’ve also added some shot location visualizations as a confirmatory bias. <a href="https://github.com/abhinavralhan/xG">Please take a look here for the code.</a>

### This article was written with the aid of StrataData, which is property of Stratagem Technologies. StrataData powers the StrataBet Sports Trading Platform, in addition to StrataBet Premium Recommendations.









