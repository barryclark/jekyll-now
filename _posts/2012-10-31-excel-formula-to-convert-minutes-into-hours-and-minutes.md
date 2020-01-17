---
layout: post
title: Excel formula to convert minutes into Hours and Minutes
permalink: /how-to/excel-formula-to-convert-minutes-into-hours-and-minutes
post_id: 804
categories:
- Excel
- Formula
- How to
- Microsoft
---

On occasion I end up with an Excel spreadsheet that has a list of items, each of which has a duration. It's easy to sum up the minutes and get a total number of minutes (see B7 in the picture below).

But it would be nice to see that in "x hours y minutes." don't you think? Yup, so do I. And that's what I've done in the C9 cell in the picture below.


![Screen snippet showing a column of minutes summed up, and then convert that into human readable hours and minutes](/images/Excel_HoursMinutes.png)

Human Readable Hours and Minutes

So without further ado, here is the Excel formula to do this

`=ROUNDDOWN(B7/60,0)&" hours "&MOD(B7,60)&" minutes."`

Let me know if you find this helpful.
