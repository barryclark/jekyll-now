## Overview and purpose

With the recent market volatility due to COVID-19, I found myself checking stocks too often.
Whether it's smart or not to be checking frequently during volatile times, it's definitely a pain to google
individual tickers each day and see what's happening.

I'm not trying to do day trading, but I would like to be relatively up to date on daily movements for the time being.
I also don't feel like paying for a service to do this. Are there free services that would send me daily quote info for
several stocks for free? Probably, but I thought it'd be fun to write it myself.

In short, I used a Python wrapper around [Finnhub](https://finnhub.io/) to get daily quote info. I specified
the stocks I'm interested in tracking and price limits for them. I made a gmail account to send relevant alerts to
my personal gmail account. I set it up on a daily schedule by putting it in launchd on my laptop.

Note:

I'm not interested in doing day trading, and I'm also not using this to set up automated trading.
I only care about getting daily alerts if any stocks I care about exceed price limits I set for them.

Also note that this is an extremely barebones simple thing going on here. The price limits I set are hardcoded absolute numbers
and not derivatives of any previous or current values. If you want to do any remotely automated or frequent trading,
you should definitely use a much more robust system than what's here.

### Getting stock info

I used [Finnhub](https://finnhub.io/) to get daily price info. It has a free API for several things.
Notably, you can't get tick data for free though.
There's also a small [Python wrapper](https://github.com/s0h3ck/finnhub-api-python-client) that I'm using.

I don't want to pay for anything, and I'm not interested in using any of this for intra-daily trading,
so I'm satisfied with just getting the OHLC prices per day.

- use finnhub to grab quote info
- don't want to pay for tick data, and also not interested in intra-daily trading, so only care about ohlc
- _not_ doing auto trading off this info, just notifying me if price limits are exceeded
- use gmail to send email
- set it up on launchd to get it going daily, even if laptop is off

### Specifying stocks and limits

### Sending alerts

### Scheduling
