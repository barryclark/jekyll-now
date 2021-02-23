---
layout: post
title: Stock Spike Update!
---

Added a new look to [Stock Spike](https://stock-spike.com) and split it up into a true front end and back end.

This makes the process of updating the data much easier, and not reliant on a hacked-together git-push-to-update thing that I had going.

Most of the same info is still there, so you can see volume spikes after the days trading, and a slightly refined best-return-on-risk puts list. I'm retooling the twitter components at the moment, so hopefully will have that posting alerts again soon.

I'm excited to keep adding scanners to the page, so as I see ideas that result in good trades here and there I'll keep putting them up. After the shenanigans of the GME and AMC "War Against Hedge Funds" I've taken a keen interest in the Max Pain theory, so that will be the next major update. I think Max Pain Analsysis as much voodoo as a lot of Technical Analysis, but it's a fun calculation and I have some ideas for interesting visualizations that should be pretty cool to look at the very least.

I had a blast implementing Black Scholes in Python to calculate deltas for the puts page, and then promptly found a library that did the heavy lifting for me. Classis Python. I'll put a post up about that soon, it's a pretty cool process to get this info for free. I had previously been scraping Greeks from Robinhood but don't plan on using them for anything in the future.

Anywho, like usual, all entertainment purposes only. I'm using Yahoo Finance for all my data which is free. And the site is provided for free. You get what you pay for, but maybe you can glean some inspiration from some of the companies that pop up. 
