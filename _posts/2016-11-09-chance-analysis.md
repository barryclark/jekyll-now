---
title:  "Goal Chance Analysis"
date:   2017-12-21
layout: single
author_profile: true
comments: true
tags: [Soccer Analytics, Data Analytics]
---

In this article, I explore the number of shots/chances that result in goals given their location and quality of chance. Analysis is done on teams based in Chinese Super League, the data is provided by StrataGem, and used Python library Plotly for the visualisations. This analysis was particularly done for a competition hosted by Chance Analytics.

Being a beginner into Football Analytics, the idea behind this is to create/validate an xG model based on factors like shot location, shot quality, defensive pressure, and a few more. This particular analysis here, helps provide insight into factoring the positional strength of the chance. There are models out there which suggest that the chance percentage of a goal only relies on the position of chance, and while that remains highly true it is not the only factor to take in.

The data is relatively less and that leaves us susceptible to discrepancies, but the model remains same and can be used for bigger datasets. Current top 5 have been analysed (just for the sake of greater number of chances).

Here, the coordinates (0,0) represent the mid point of a goal while the coordinates (0,44) representing the penalty spot.

<img src="https://cdn-images-1.medium.com/max/800/1*4BWm8m7qbaKypm5h_jQikA.png">

<img src="https://cdn-images-1.medium.com/max/800/1*xTHKG0CPkEWHHyHeksBMeg.png">

<img src="https://cdn-images-1.medium.com/max/800/1*xWnTgBAUS43Jb58CygduPA.png">

<img src="https://cdn-images-1.medium.com/max/800/1*cZgHzlT4vmyQ28W8RidwZg.png">


The take away from this analysis is to validate the scoring chance percentage from the scatter plot. Sometimes you would find that a chance with greater chance percentage of scoring is further away from goal than a chance with lesser percentage of scoring. If anything it reinforces my belief that factoring weight provided to all types of chances should be slightly modified while calculating our xG model.

An excerpt on the same from
StrataGem:

<i> This is a subjective measure on the quality of the shot. If the shot is particularly well struck and gave the keeper no chance then this would be rated as 5, while a scuffed effort that was poorly hit, or a wild swing that goes well wide would be rated as 1.</i>

That’s it for now folks.

### This article was written with the aid of StrataData, which is property of Stratagem Technologies. StrataData powers the StrataBet Sports Trading Platform, in addition to StrataBet Premium Recommendations.

