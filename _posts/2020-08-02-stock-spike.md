---
layout: post
title: How to Find the Next HTZ or KODK
---

Been a while since I posted! COVID has resulted in a lot more time at home, but almost less time overall. With all my cycling events getting cancelled I've doubled down on training, so I'm up to about 10+ hours a week on the bike. Disappointing for this year, but should have some good fitness if we can ever sort this virus out and get back to racing.

I've been using the extra time in quarantine to mess around a bit more in the stock market, and have been able to have a lot of fun with some more volatile stocks. With no trip to Vegas this year for DEFCON, I need to get a bit of gambling in, right?

While I love reading about options strategies, I'm a very casual investor and mainly focus on stop-limit orders. These let me target a certain return while accepting a quantified risk, and then just waiting. I don't tend to stare at tickers all day (or even every day) so it's nice to get a notification that an order executed and go check it out.

Anywho, one thing that was very interesting about KODK this past week is the trading volume spiked days before any significant news articles came out about it. A savvy Redditor charted everything out, and produced a script that would scan through the ticker symbols and identify any securities displaying similar behavior. He listed it as open source, so I had to check it out.

While it worked, the script was cumbersome, required the user to download Python and all the dependencies, and then run it from the command line where the results would print to the console. This was not ideal.

Naturally I reimplemented it, removed a number of dependencies, and stuffed it behind a web app that will update each night after pulling a list of ticker symbols from the NASDAQ FTP server.

[Stock Spike](https://stock-spike.com)

I've been playing around with the script that identifies the stock, as there have been a few interesting cases. The biggest change I had to make was to identify IPOs, as they would definitely show a spike in volume as they have incomplete history.

This will be a fun side project to run, especially since I'm keeping it as a 100% static site running on Netlify for free. This forced a different solution as I can't just run a database to dynamically update. My plans are to continue to add to this site (I love the url I was able to get) so I might end up putting an API together on the VPS I use for little projects like this.
