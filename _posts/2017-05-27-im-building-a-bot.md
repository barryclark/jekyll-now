---
id: 67
title: 'I&#8217;m building a bot'
date: 2017-05-27T23:54:09+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/newblog/?p=67
permalink: /im-building-a-bot/
dsq_thread_id:
  - "5858354333"
ampforwp_custom_content_editor:
  - ""
ampforwp_custom_content_editor_checkbox:
  - null
ampforwp-amp-on-off:
  - default
instant_articles_submission_id:
  - "1922789687993566"
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:164;}'
dpsp_networks_shares_total:
  - "164"
dpsp_networks_shares_last_updated:
  - "1553829605"
categories:
  - "I'm building a bot"
---
_I recently started building a Messenger Bot. This is a series describing how I approached it and what I learned._

## Why build a bot?

I had a specific problem to solve: was my rooftop solar power system working?

Wait, what does a [bot](http://www.webopedia.com/TERM/C/chat_bot.html) have to do with power production? That sounds like a ridiculous question today. 10 years from now it won&#8217;t. Bots are going to be the future of how we interact with products and services.

In addition to solving a real problem, I chose to go down this path for several reasons:  
1. I wanted to understand this trend around bots: how you build them, what you could have them do  
2. I haven&#8217;t coded anything in years, and wanted to see what I could still accomplish  
3. Get my hands dirty on a bunch of new technologies like Heroku and Git (okay, these are not so new but very new to me)

## Problem

My rooftop solar power system sometimes trips the circuit breaker. But there were no quick ways to be notified of a problem. The only way was by looking at my power bill. My surprise-almost-three-hundred-dollar-bill!

<img class="alignnone size-medium wp-image-75" src="/wp-content/uploads/2017/05/Screen-Shot-2017-05-27-at-4.50.30-PM-300x147.png" alt="" width="300" height="147"/> 

I had stopped looking at these bills several years ago because we are a net producer of power. I never have a bill to pay and in fact over produce by several hundred dollars a year (separate topic on how I could monetize that power). This all changed last year when our system stopped producing power for several months. This all could have been avoided.

## What I need in a solution

Notifications above everything else are a must have. Alerts and monitoring. Push is way more valuable than pull in my case.

The sooner I get notified of a problem, the faster I can fix it. The faster I&#8217;m producing power again. So I need a notification channel beyond the monthly reports that the system (now finally) e-mails me.

A very secondary use case is reporting. This is a nice to have. There is a mobile app for my solar system but it&#8217;s awful. Something that summarizes reports and doesn&#8217;t ask me to log in each time would be much nicer than PG&E&#8217;s system too.

_Next post I&#8217;ll talk about why I chose messenger over alternatives._

&nbsp;
