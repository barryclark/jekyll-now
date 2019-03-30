---
id: 72
title: Why I chose Messenger
date: 2017-06-02T06:09:51+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/newblog/?p=72
permalink: /why-i-chose-messenger-to-build-a-bot/
ampforwp_custom_content_editor:
  - ""
ampforwp_custom_content_editor_checkbox:
  - null
ampforwp-amp-on-off:
  - default
dsq_thread_id:
  - "5859004670"
instant_articles_force_submit:
  - "1"
instant_articles_submission_id:
  - "1875402652697850"
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:38;}'
dpsp_networks_shares_total:
  - "38"
dpsp_networks_shares_last_updated:
  - "1553829605"
dsq_needs_sync:
  - "1"
image: /newblog/wp-content/uploads/2017/05/robots-764951_960_720.png
categories:
  - "I'm building a bot"
---
_I recently built a Messenger Bot. This is the second in a series describing how I built it and what I learned. My first post was about [why I started down this path of building a bot.]({{ site.baseurl }}{% post_url 2017-05-27-im-building-a-bot %})_

## Why Messenger?

I decided on a Messenger bot mostly because I have a head start on familiarity with the Facebook platform (disclosure: yes I work at Facebook but don&#8217;t touch anything remotely related to messaging).

  1. It&#8217;s **integrated** with products like [Facebook Analytics](https://analytics.facebook.com/blog/bots-for-messenger-adding-analytics-and-fbstart-program/) and [Facebook ads](https://www.facebook.com/business/a/messenger-news-feed-ads).</p> 
  2. Messenger works **cross-platform** (iOS, Android, web). I use the Messenger app all the time. Like it&#8217;s probably my #1 app by usage. It&#8217;s my preferred method of communication. I also have friends that work on Messenger, so there&#8217;s a personal connection.

  3. Messenger is easy to integrate with <wit.ai> for **NLP (Natural Language Processing)**. NLP is a short way of saying that my bot can understand that &#8220;what is my power production this month?&#8221; and &#8220;how much power did I produce this month&#8221; are the same question. NLP is one of the hotter areas of artificial intelligence these days.

## Alternatives to Messenger

Before committing, I thought about some other technologies that could push my solar power data on a regular interval or notify me of disruptions:

**Twitter**. I could build a tweet bot that would tweet my solar production every hour. I could also setup push notifications. But there&#8217;s little value in broadcasting my solar data. Nobody else cares about my power production. I&#8217;d rather build a system that can scale to serve other people with the same needs as myself, than a system that just works for me but tells everyone about my system.

**iOS push notifications**. This is my preferred way to receive notifications. I&#8217;d have to build an iOS app which requires a lot more decisions and coding than a bit (it&#8217;s a whole different adventure that I&#8217;ve been wanting to try). It also wouldn&#8217;t work cross-platform e.g. Android.

**e-mail**. This is probably the easiest, via an SMTP server or some cloud service. But it&#8217;s so 90&#8217;s. I also don&#8217;t check email often enough, and the idea of archiving these notifications in gmail feels wasteful.

**twilio**. Twilio is what lots of startups are using to call and SMS their users. [Uber was their biggest customer](https://customers.twilio.com/208/uber/), sending the &#8220;your car is arriving&#8221; message via SMS. This would have been easy for me to implement, and I am familiar with Twilio&#8217;s API a bit from an intern project I did. But I despise SMS and phone calls.

**bot aggregators**. There are a bunch of platforms that aggregate bots across multiple channels. [message.io](https://message.io/home) and [engati.com](https://engati.com) let you communicate via Slack, Skype and more by building to a single spec. I suppose this is useful if you&#8217;re a business serving customers all over the world. But systems like are often lowest common denominator and don&#8217;t include all the latest and greatest from each messaging platform.

**slack**. Slack is cool. But I don&#8217;t use it much, if ever. There is also no team element to what I need in a bot, though I suppose there are use cases where a team, business, or family all want to interact with the same solar power system. This could be an interesting v2.

_Plot twist: I actually started with Amazon&#8217;s Alexa and will share that experience in my next post. But what else should I have looked into?_