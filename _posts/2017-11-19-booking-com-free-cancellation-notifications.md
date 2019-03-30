---
id: 361
title: Never miss a Booking.com free cancellation
date: 2017-11-19T17:02:31+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=361
permalink: /booking-com-free-cancellation-notifications/
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:94;}'
dpsp_networks_shares_total:
  - "94"
dpsp_networks_shares_last_updated:
  - "1553829603"
categories:
  - Hacking
---
I love Booking.com. It&#8217;s my favorite travel reservation site.

I often book way more reservations than I&#8217;ll ever use. Sometimes I&#8217;m not sure I&#8217;ll actually be able to travel. Other times I&#8217;m not sure where the weather will be best. I love optionality.

But it&#8217;s hard to keep track of all the reservations I make. Specifically, when I can still cancel without a fee. Booking heavily markets &#8220;free cancellation&#8221; as a feature, but doesn&#8217;t want to incentivize cancellations.

I searched around for apps that might scan your gmail or connect to Booking.com and notify you. But I couldn&#8217;t find anything. This is just like when [I struggled to get notified if my solar power system was down]({{ site.baseurl }}{% post_url 2017-05-27-im-building-a-bot %}).
So I built a tiny app that solves this problem.

<img src="/wp-content/uploads/2017/11/Screen-Shot-2017-11-19-at-4.57.55-PM-1024x505.png" alt="" width="1024" height="505" /> 

I used Google Scripts, which is just like JavaScript. It has a bunch of features that work directly with gmail and Google Calendar. Two apps that I use all the time. So long as I could scan my email for incoming Booking.com reservations and then create a notification in my calendar, I&#8217;d be set.

This was pretty simple once I figured out the object model. Fewer than 100 lines of code and I&#8217;m all set. [I put the project up on GitHub](https://github.com/scottshapiro/bookingNotifications) if anyone wants to use it or improve it.

The next step would be to create a hosted app, but it&#8217;s easy enough to set up on your own. [See the README](https://github.com/scottshapiro/bookingNotifications/blob/master/README.md).
