---
layout: post
title: Gerrymandering
---

Anthony Kennedy said that he would vote to put an end to the dirty political tactic known as gerrymandering if a "workable standard" could be created to determine if partisan gerrymanding had taken place. Here, we present several workable standards that will be submitted in an amicus briefing during the Gill v. Whitford SCOTUS case. This is our time for action.




To do so, we're going to compare the results from the district that is thought to be highly gerrymandered with alternatives and use a t test to compare the difference.


To run the code, you will need to provide the following inputs:

* The year you are interested in
* The specific states of interest [Currently as a number]
* THe year you are going to compare against (Why wouldn't this always be the same year?)
* The state to compare with (Again, when wouldn't this be the same?)
* The imputed uncontested variable (which seems to be 0.75 for the demo)
* The symm (which is 0)
* The state label (Which should be automatically generated)
* The output file name (This should have a default value)

gerrymander_tests(year,states,yearbaseline,statebaseline,imputeduncontested,symm,state_label,outputfilename)

For example:

gerrymander_tests(2012,38,2012,0,0.75,0,'Pennsylvania','foo');


Let's set aside what  happens when year = 0 for the moment and talk about when we have a real year

gerrymander_tests_part1 will then call gerrymander_readresults on the year and the state. Gerrymander_readresults extracts the relevant data from a csv file. The file contains:

* "Year" gives the year of the election.
* "State" gives a numeric state code.
* "District" gives the Congressional district.
* "D_voteshare" gives the fraction of the two-party vote (Democrats plus Republicans) won by the Democratic candidate. Third-party candidates are not included.
* "Incumbent" indicates whether the winner was a re-elected incumbent. +1=Democrat, -1=Republican, 0=not an incumbent.
* "Winner" indicates the party affiliation of the winner. +1=Democrat, -1=Republican.

Then we extract D_voteshare, which is the fraction won by Democrats

nationaldata appears to be the data that we are comparing to - can we call it that? It takes a specific state as well







**The Meat**

OK, let's talk about the meat of it. The first statistical test is a two-sided t test. If there's a lopsided advantage that will become apparent in the winning margins. Let's see if we can detect a systematic difference. The party with the smaller winning margin has the advantage (it took them less to win)



