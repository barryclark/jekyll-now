---
title: Backing up Oracle optimizer statistics
author: kgorman
comments: true
layout: post
permalink: backing-up-oracle-optimzer-stats
fave-post_views:
  - 46
categories:
  - Oracle
tags:
  - Oracle
---
Oracle 10g has some neat features for keeping track of old statistics. Pre-10g It used to be important to backup your statistics before you analyzed a table just in case your plans went crazy. Now Oracle does this for you automatically. There is a great post onÂ <a href="http://oracledoug.com/serendipity/index.php?/archives/1000-Saving-Optimiser-Stats-10g.html" target="_blank">Doug&#8217;s Oracle Blog</a>Â that talks about this with some examples. So now one can analyze as needed without fear of not being able to roll back the statistics to the previous value. In a crisis, it might be something to check to see if analyze recently ran and now plans are bad by selecting from tab\_stats\_history. Then simply back out the stats with <span style="font-style: italic" class="Apple-style-span">dbms_stats.restore_schema_stats</span> to revert back to a known good statistics state. Be sure to check <span style="font-style: italic" class="Apple-style-span">dbms_stats.get_stats_history_retention</span> and make sure you are keeping a long enough record of stats, you can adjust with <span style="font-style: italic" class="Apple-style-span">dbms_stats.alter_stats_history_retention</span> as needed to keep yourself sleeping at night.
