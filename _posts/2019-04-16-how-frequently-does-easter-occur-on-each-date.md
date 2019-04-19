---
layout: post
title: How Frequently Does Easter Occur on Each Date?
tags: [religion, math]
keywords: [easter, easter dates, easter rules]
hashtags: [easter, easterdates]
image: /images/easter/easters-by-date.png
---

I'm a data-minded guy. Being that it's Easter time (technically Lent right now, Easter season begins on Easter) I was wondering... How frequently does Easter occur for each date?

First, let's review [the rules of Easter](https://www.timeanddate.com/calendar/determining-easter-date.html).

## The Rules of Easter

Easter in on the first Sunday after the first full moon after the Spring Equinox. Easter also cannot be on the Spring Equinox nor can there be a full moon on Easter. The first full moon can be on the Spring Equinox, however.

A few nitpicks, however. It's not actually after the Spring Equinox - that date can vary from March 19 to March 22 and can be different in different timezones. So that date used is March 21.

Again, full moons may appear on different dates in different time zones, which occasionally may cause ambiguities in the date of Easter. Therefore the first [ecclesiastical full moon](https://en.wikipedia.org/wiki/Ecclesiastical_full_moon) is used. In either case, the amount of time from full moon to full moon is [approximately 29 to 30 days](https://www.lpi.usra.edu/education/skytellers/moon-phases/).

This means the earliest Easter may occur is March 22. This will happen if there is a full moon on March 21 and if March 21 is a Saturday. This last happened in 1818 and will happen again in 2285.

The latest Easter may occur is April 25. This will happen if there is a full moon the day before March 21 (in other words, March 20) and the next full moon falls on a Sunday, which so happens to be April 19. This last happened in 1943 and will happen again in 2038.

## Frequencies of Easter

Thankfully, I don't have to go and calculate Easter dates - the work has already been done for me. I combined the datasets from [an online source](http://tlarsen2.tripod.com/thomaslarsen/easterdates.html) and [The US Census Bureau's website](https://www.census.gov/srd/www/genhol/easter500.html) to give me the dates of Easter for 700 years from 1600 through 2299. There's also a dataset that gives [the dates of Easter from 329 through 4099](http://www.kevinlaughery.com/east4099.html).

Anyway, I through those dates into an Excel file and used Pivot Tables to determine both how many times Easter occurs in either March or April:

![Easters by Month](/images/easter/easters-by-month.png)
*Easters by Month*

and how many times Easter occurs on each date from March 22 through April 25:

![Easters by Date](/images/easter/easters-by-date.png)
*Easters by Date*

It turns out Easter will occur at least once on every date between the earliest possible date and latest possible date. In fact, the most infrequent date (March 24) has two occurrences - once in 1799 and again in 1940.

The date with the most occurrences is April 16 with Easter occurring 31 times on that date. That's about 4.4% of the time.

Also - as you would expect with more possible dates - Easter occurs more often in April than it does in March. Easter occurs 161 times in March and 539 times in April - which is 23% in March and 77% in April if you don't feel like doing the math. If you're wondering (and lazy), there are ten possible days in March and 25 possible days in April - corresponding to about 29% and 71%.

## Conclusion

There's not really a conclusion here. I just felt like playing with numbers.
