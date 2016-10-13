---
layout: post
title: My Electric Bill over the Past Year
tags: [money]
keywords: [electric, cost, average, DP&L, dayton power and light, chart, charts]
javascripts: [/js/d3.min.js, /js/c3.min.js]
csses: [/css/c3.css]
image: /images/electric.jpg
thumbnail: true
---

I'm always looking for ways to reduce my expenses. Looking at my electric bill, there's not much there to cut. My average bill over the last eleven months was about $28.00:

{% include electric/cost.min.html %}

It stays low for a few reasons. First, all my lightbulbs are [CFLs](https://en.wikipedia.org/wiki/Compact_fluorescent_lamp), and I also make sure to turn them off when I'm not in the room. Second, I keep my TV and PlayStation on a power strip, and I power them down and turn off the strip when they're not in use. Finally, and this probably has the greatest impact, I don't have air conditioning at my house. I use fans during the summer to help cool off. In the winter I have gas heat, so that money is offset into another bill.

Because of this, my average usage over the last eleven months was just shy of 200 (kilowatt hours, I believe, but my bill doesn't put a unit on the usage number):

{% include electric/usage.min.html %}

I recently switched my energy supplier from Dayton Power and Light to AEP Energy. Since I live in Ohio, I was able to use the [Apples to Apples Comparison Chart](http://www.energychoice.ohio.gov/ApplesToApplesComparision.aspx?Category=Electric&TerritoryId=9&RateCode=1) on Ohio's Energy Choice website. DP&L was charging me 7.3&cent; per kilowatt (actually something more like 7.279&cent;, but 7.3&cent; is what was on the bill). AEP charges 4.59&cent; per kilowatt.

It took two bills before AEP appeared on my DP&L bill - I signed up for AEP on July 28th and the first bill affected was on the September 26th. DP&L still bills me. The bill is split into two charges: "delivery" and "supply." "Supply" is what was affected the supplier change (not surprisingly). "Delivery" I believe is still going to DP&L. On the charts in this post, only the 11th month (which is September) is the supplier AES - all the rest are DP&L. You'll notice the sharp decrease in the supply over usage line in the last month on the chart below.

{% include electric/cost_over_usage.min.html %}

DP&L didn't have a constant rate over the last 11 months, as evidenced by the chart above. I'm locked into the AEP rates for six months, afterwards I'm going to have to pay close attention to make sure the rates don't skyrocket.

Oh, and just for the curious, if I had paid the 4.59&cent; rate the ten months I was with DP&L in the charts, I would've paid $89.60 in supply charges instead of $135.95. A savings of $46.35 in under a year, with an already low electric bill!
