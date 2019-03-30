---
id: 130
title: I started with Alexa
date: 2017-06-06T02:15:17+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=130
permalink: /how-i-got-started-building-a-messenger-bot-with-alexa/
ampforwp_custom_content_editor:
  - ""
ampforwp_custom_content_editor_checkbox:
  - null
ampforwp-amp-on-off:
  - default
instant_articles_force_submit:
  - "1"
dsq_thread_id:
  - "5873749287"
instant_articles_submission_id:
  - "1911316682423672"
enclosure:
  - |
    http://www.scottshapiro.com/newblog/wp-content/uploads/2017/06/img_7797.trim_.mp4
    25313507
    video/mp4
    
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:19;}'
dpsp_networks_shares_total:
  - "19"
dpsp_networks_shares_last_updated:
  - "1553829605"
image: /newblog/wp-content/uploads/2017/06/img_8878.jpg
categories:
  - "I'm building a bot"
---
_I recently built a Messenger Bot. This is the third post in a series describing how I built it and what I learned._

My first encounter with my solar power system&#8217;s API was not with Messenger but with Alexa. Alexa is the voice recognition and processing system behind the [Amazon Echo](https://www.amazon.com/Amazon-Echo-Bluetooth-Speaker-with-WiFi-Alexa/dp/B00X4WHP5E).

## Starting with Alexa

Shortly after I setup my Alexa, I was geeking out on things to do with it. After setting up a [wifi lightbulb](https://www.amazon.com/TP-Link-Dimmable-Equivalent-Assistant-LB100/dp/B01HXM8XF6), I started thinking about other household tasks for Alexa. This was right around the time of the [$300 power bill](http://www.scottshapiro.com/im-building-a-bot/). Putting two and two together, I figured Alexa could help me get smarter about my solar power system.

The first Google search result for &#8220;Enphase Alexa&#8221; was a winner.&nbsp;I found a [github project](https://github.com/dzimmanck/enphase-echo) that did exactly this, except it&#8217;s pull not push. It wouldn&#8217;t notify me. But it would let me see examples of working with my Enphase solar system&#8217;s API. I&#8217;m fascinated by what Amazon is doing with Alexa and am always looking for new use cases for my Echo. This was a turnkey opportunity.

It was straightforward to setup. I had to:  
1. Configure an AWS Lamba instance.  
2. Create an Alexa skill.  
3. Provision a developer account with Enphase  
4. Enable API access on my solar system.

## The human element

I spent around four hours total to get this going. Our landlord owns our rooftop solar power system, which we are very lucky to have! But we had to work together to figure out how to enable system-level API access. The Enphase help center didn&#8217;t have clear instructions on how to do this &#8211; I provisioned a token and didn&#8217;t realize until hours later that the system owner also has to flip a switch.

## The technical part

I&#8217;m also pretty rusty on tools like vim, bash, and python. But it&#8217;s like riding a bike. It&#8217;s amazing how some tools are the same as they&#8217;ve been for decades but others turnover so quickly.

**AWS [Lambda](https://aws.amazon.com/lambda/)** is a pretty awesome service. It lets you run stateless python code, taking an input and providing outputs. No data is stored anywhere. The way it works: Lambda receives the processed query from Alexa, pulls data from the solar system&#8217;s API, and then returns it to Alexa who speaks the answer back to me through my echo device. All this happens in a matter of milliseconds. I already have an AWS account from a backup S3 storage system, so there was no friction to get this going.

The **[Enphase solar system&#8217;s API](https://developer.enphase.com/docs)** is straightforward. Their documentation is okay &#8211; I got stuck on figuring out that I had to replace the systemID with my own. They also have a testing endpoint where you can query a fake solar system if you don&#8217;t have a real one to query.

Setting up the **[Alexa skill](https://developer.amazon.com/edw/home.html#/)** was easy, just copy/pasting node.js code and linking it to my Lambda instance. Most of this is around recognizing and mapping semantics. I had to redo the Lambda setup a few times as it would only work from US-East and not other AWS datacenter locations.

<img src="/wp-content/uploads/2017/06/Screen-Shot-2017-05-28-at-5.05.19-PM-300x154.png" alt="" width="300" height="154" class="alignnone size-medium wp-image-135" /> 

Here&#8217;s a demo where I ask Alexa how much power I produced last month!​ All I do is ask my echo a simple question.&nbsp;

<div style="width: 640px;" class="wp-video">
  <!--[if lt IE 9]><![endif]--><video class="wp-video-shortcode" id="video-130-1" width="640" height="360" preload="metadata" controls="controls"><source type="video/mp4" src="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/06/img_7797.trim_.mp4?_=1" />
  
  <a href="http://www.scottshapiro.com/newblog/wp-content/uploads/2017/06/img_7797.trim_.mp4">http://www.scottshapiro.com/newblog/wp-content/uploads/2017/06/img_7797.trim_.mp4</a></video>
</div>​

## Next step: Push notifications

This was a big step forward &#8211; having a talking speaker ask my solar system how much power it&#8217;s producing in realtime. Or how much I produced in January. Ten years ago, I never thought I&#8217;d have solar power. I definitely didn&#8217;t think Amazon would produce a hockey puck sized conversation for $49.99 (Echo Dot).

It works great when I&#8217;m home, but I need something I can access from anywhere. I also need something that would push notify me.

_Next post I&#8217;ll share how I used this experience to get started with Messenger_
