---
layout: post
title: "11/28 Project Update"
author: Josh
---

### Completed Components

At writing, I've completed data collection.  This has entailed pulling ~40,00 tweets using [Twitter Archiver](https://chrome.google.com/webstore/detail/twitter-archiver/pkanpfekacaojdncfgbjadedbggbbphi?hl=en), extracting the hashtags from each of those tweets, sorting the data by user ID, and getting the complete list of friends and followers for each user in the data [my collection/parsing scripts are available here](https://github.com/jbguberman/dh_final_project).  

### Problems

Along the way, I lost a *lot* of data.  Carol taught me how to use `screen` so I could run and then forget about my scripts on a server instead of on my local machine (Thanks Carol!).  My hashtag extraction script reliably broke roughly after running for about 16 hours, so I ended up with hashtags for only half of the tweets for which I had data.   I tried debugging, but decided to just go with what I have in the interest of time.  I had similar issues with my next script that retrieved the friends of followers for each of the users for which I had been able to get hashtags for.  After three days of running, my script crashed.  I ended up with complete data for ~1000 users.  This is a sizable number of users, but it likely represents only a small proportion of the total number of users for which I originally had data.  I'll definitely have to acknowledge these shortcomings in my report.

### What's Left


Now, I'm working on getting the data I *do* have into [Gephi](https://gephi.org/).  This is the part where I'll figure out what my data mean (or don't mean, as the case may be).  From there, I've got to make some pretty graphics.
