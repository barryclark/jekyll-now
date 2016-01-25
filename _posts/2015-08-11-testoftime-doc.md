---
title: Scraping Wikipedia to Build a Historical Trivia Game
description: The Test Of Time is a historical trivia game where you order events chronologically, guessing which events came before and after each other. 
layout: post

project_title: The Test of Time
project_url: http://the-test-of-ti.me

github: http://github.com/ambuc/test-of-time
---

<!-- [<img src="/images/lindenmayer_thumbnail.png">](/lindenmayer) -->

**[The Test of Time](http://the-test-of-ti.me)** is a historical trivia game where you order events chronologically, guessing which events came before and after each other. As the round goes on, it becomes harder to pinpoint exactly when obscure events happened. That's pretty much all there is to it.

[Julian](http://julianrosenblum.com) and I decided to build this after thinking about how much excellent data was locked up inside Wikipedia as unformatted plaintext. We found a fantastic corpus created by [Dr. Daniel Heinert](http://www.gesis.org/das-institut/mitarbeiterverzeichnis) for [extracting chronological events](http://vizgr.org/historical-events/), downloaded a bunch of events, and reformatted them into JSON. The interface uses the [Materialize](http://vizgr.org/historical-events/) CSS library and Google's [Material Icons](www.google.com/design/icons/).

The Javascript source can be found [on Github](https://github.com/ambuc/test-of-time).

Play the game at **[http://the-test-of-ti.me](http://the-test-of-ti.me).**
