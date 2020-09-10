---
layout: post
title: Webscraping BTO application info
---

In recent discussion with friends regarding BTO applications, it seems that no one has much luck in getting a good queue number. I leave open the question of what is considered a "good" queue number, but for disclosure I should say that in recent ballots I do not personally know anyone who obtained a queue number < number of units. The nature of a ballot means that we could all just be unlucky, but the perception that I take away from these chats is that it appears to be more difficult for young couples (relatively) now to successfully ballot for a BTO flat than before. Is there data to back this up? 

Well, kinda. For those who are like me, you would be aware of the [application status page on HDB's website](https://www.hdb.gov.sg/cs/infoweb/residential/buying-a-flat/new/buying-process/manage-my-application/application-status). It provides, for each BTO project-flat type, the number of units, applicants, as well as the respective application rates. In particular, I think the application rates give us a measure of excess demand. So, if we can compare the application rates over time, then we can get a sense of how excess demand has evolved over time. Helpfully, although HDB only puts up the links for the three most recent BTO ballot, a quick check of the URL structure allow us to look up past ballot information (up to a point). 

In turn, that means that we can use web scraping from all these different pages to put together a dataset for analysis.

A few comments on scope at this point:
* I will be focusing on the first-timer application rate for the rest of this post, because I am a first-timer myself, and I am most concerned with the first-timer application rate (basically my "competitors" in the ballot). Worth noting though that the definition of first-time application rate differs slightly for mature vs non-mature estates.
* I will also be focusing on 4-room or 5-room flats (henceforth referred to as "4R" or "5R"). Again this is driven by personal interest - I am interested in balloting only for 4R or 5R flats.

The high-level summary of the overall approach is as follows: The idea is to leverage on patterns in both the URL structure and the content layout in the respective pages to scrape data. Having done that, we would then need to apply some cleaning, possibly with some cross-checks, before producing visualisations in ggplot2. The libraries used are tidyverse, rvest, and lubridate.

One final note - this is my first time webscraping so I may not have implemented it as well as possible, but it also shows that perhaps this isn't as hard as it seems.

### Webscraping to build the dataset

Let's go through the key parts of the webscraping approach.

We first need to identify the patterns in the URL structure. The first thing to note is that the URL structure is different for the latest launch (Aug 2020 at the point of writing) compared to previous launches. For Aug 2020, the URL is `https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/AR_Aug2020_BTO?strSystem=BTO`, but the ones for Feb 2020 and Nov 2019 are `https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/BP13J011BTOFeb20.jsp` and `https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/BP13J011BTONov19.jsp` respectively. So a reasonable guess is that we could amend the URL for Feb 2020/Nov 2019 and replace it with a previous month in which there was a BTO ballot to access the earlier BTO application information. That does turn out to be the case! For example, if we replace the `20` in the URL for Feb 2020 with `16` we can [access the Feb 2016 info](https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/BP13J011BTOFeb16.jsp). Knowing the URL pattern means that we can subsequently feed the source URLs in easily.

```
period <- #define some period here, e.g. "Feb20"
  
  if(period != "Aug20"){
     
    base_url <- "https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/BP13J011BTO"
    url <- paste0(base_url, period, ".jsp")
    
    } else if(period == "Aug20") {
    
      url <- "https://services2.hdb.gov.sg/webapp/BP13BTOENQWeb/AR_Aug2020_BTO?strSystem=BTO"
  }
```

Next, we need to identify where in each page we can obtain the information from. At a glance, the webpage looks reasonably static (a more dynamic website might present complications), and if we view the page source (right click -> view page source), we can see that the information does appear within the HTML code. This means that if we can identify patterns in the HTML code which isolates the information we want, then we can scrape that information without also bringing in things that we _don't_ want. In this case, it looked to me like the information was sitting within the `<table class = "scrolltable">` tag, and that's what I rely on to identify the relevant part of the HTML code.

```
 raw <- read_html(url)

 raw_tables <- html_nodes(raw, css = ".scrolltable") %>% 
    html_table(trim = TRUE, fill = TRUE)
```
Believe it or not, at this point most of the webscraping is done. The code segments above provide the structure for scraping one table from one page, and the rest of the work lies in cleaning the raw data that has been scraped, and identifying where there needs to be different treatment in either scraping or cleaning the data when expanding this to cover the other pages.
