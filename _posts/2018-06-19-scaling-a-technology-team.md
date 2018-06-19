---
layout: post
title: Scaling a Technology Team (to help scale business)
author: jonathan_wilson
comments: true
---

We’ve been helping customers buy their next car on finance for a long time, 2006 is the official start date, but technically much longer than that.  The initial business idea was generated out of another business, Netcars.com, but that’s a whole other blog post.

![Logo Iterations]({{ site.baseurl }}/images/logo-iterations.jpg)

Getting approved for finance is relatively complicated.  Getting approved for an asset backed finance agreement is really complicated.  In 2012 the decision was made by Reg and Louis Rix, the founders of CarFinance247, to take advantage of what they saw as an opportunity - we would scale the small business we had created, we were on to something… a better way.

To scale the business, it was obvious we needed to do one thing really well.  We needed to remove complexity.  Not only from our customers (our advisors were already doing an amazing job at shielding some of that complexity from our customer), but also our advisors.  The journey was clunky to say the least, particularly from our advisors point of view.  Many 3rd party systems that included lenders, credit bureaus, vehicle history checking, vehicle valuations, identity verification providers, the list was exhaustive, and still is.

Since 2012 we’ve grown from around 30 people to just short of 500 people today.  Half of those you could say are on the front line; guiding customers through the niches of securing an asset backed loan agreement. For example, the age of the vehicle may affect the maximum duration the lender is willing to offer the customer, which in turn effects the monthly payment which in turn means we need to consider affordability… again.

In 2015 we had 2 software engineers.  No Product Managers, UX Designers, Data Analysts, Data Scientists, DBA’s, BI Developers etc.  A team of 2.  We had work to do.  To scale the business, we had to scale the technology team.

One of my first tasks when I re-joined CarFianance247 (that’s another story) as Technology Director in 2015 was to address our communications platform, our phone system.  I won’t go in to the detail (you can read all about this [here](https://www.twilio.com/learn/contact-center/carfinance-247-omnichannel-contact-center) if you wish), the short version is we replaced our on premise VOIP solution with our bespoke omni channel communication platform built on top of Twilio baked right into the very centre of our CRM (a bespoke AngularJS SPA).  By 2016, all of our advisors where now communicating by voice and the technology team had now grown to around 8 software engineers.  I’ll probably do another post on how we moved to a full omni-channel platform (not just voice) but the reason I mention this here is that I knew we had only just started, we needed more people in the team, and not just software engineers.

It’s easy to operate with a team of 8 or so engineers.  There’s lots of cohesion and it’s easy to provide a vision and motivate the team on the “why”.  We're working very hard on the "why" right now.  Across the whole business. And then also down into each and every product team, giving them autonomy to succeed in their purpose with mearsurable results.  [OKRs](https://en.wikipedia.org/wiki/OKR) are something that really interests us right now.

![Brand Refresh Launch]({{ site.baseurl }}/images/brand-refresh.jpg)
> Amazing goals can be acheived working in small groups of people.  Here we are launching our brand refresh in December 2016... at 3am..!

As time progressed we began to work with Twilio closer, they wanted to learn and understand our use cases and our plans for future iterations with our contact centre.  We wanted to learn and understand how to scale a team and talk to as many companies as possible that have done just that.  When I first met Jeff Lawson and Ott Kaukver in 2016 I had lots of questions for them both, but one stood out:  How do you motivate, inspire and organise 300 software engineers?  Ott’s answer was direct with no time needed to think.  Small Teams.  Focussed on making their product the best product in the world.  Push responsibility down, he said.  We’ve also met with other businesses that talked about a similar approach such as JustEat, LateRooms, Simply Business and many more.  I suppose you can say these discussions with other like-minded companies is what has pushed myself, and our wider team to participate more in the wider community to share experiences and stimulate discussion.  This blog is our first step in that.  

![Native App]({{ site.baseurl }}/images/mobile-app.jpg)
> We built a lot over the past few years.  As part of the brand refresh (if that wasn't enough) we also launched our first native mobile app on iOS and Android.  That was fun!

There is the famous Spotify video that inspired many companies on how they structure their squads, tribes etc. And we also took inspiration from ‘that’ series of video posts.  But for me, to get out and speak with other companies and organisations is where the magic happens.  Strip away the BS and talk openly about the success, the struggles, the niggles, what works, what doesn’t.

We are always tweaking; planning, retro’s, team members, team structures.  But never change for change sake.  Try it, small, minimise the risk.

![Moving Again]({{ site.baseurl }}/images/moving-again.jpg)
> Over the past few years we've moved offices... A LOT!  In total our team has moved 6 times... 6 times!  I've just had to recount that to be sure.  As a business we are now all located under one roof split over 3 floors at Universal Square.  We'll blog about our new super space soon and how we structure our team spaces.

We’re almost there with our cross functional product teams.  We call them POGs (Product Ownership Groups) mainly because we have 10’s of products and limited resource to focus on each product.  The teams maintain, improve and discover opportunities for a set of related products.  We often struggle with this concept; our business from the outside, particularly our customers point of view, is that we are one business, one service, one product.  Yet internally we split these up into many.  Acquisition, Journey, Native Mobile, CRM etc.  When a business objective is highlighted, when building out we often have cross team dependencies.  Sometimes they are minimal, sometimes not, but one thing that is always evident, if the blocking product/team does not understand the “why” then we find ourselves in a world of pre-product team teams.  A world where silos existed.  Can one team write to another team’s repo? Does that mean the other team is reviewing the change?  Do they understand fully what is intended, or does the other team just get given some ‘requirements’?  We have been trying a solution to this for some time now and everyone loves it.  Rather than stealing Tim Carpenters thunder, I’ll allow him to write a post on that.  In the meantime, I’d love to hear if you’ve been experiencing these problems and if you have, how you overcome the cross-team dependencies?  Are they a problem at all?

It would be great to hear how different teams cope with that challenge?  Cross functional teams when there aren’t enough individuals of different disciplines to go around.  For example, if the business only has 3 data analysts yet there are 6 product teams that require a data analyst. 

Hopefully this first post gives you a feel for the journey we have been on.  We've been busy and now we'd like to share our experiences with as many people as possible, but more importantly for me, learn how to do things better.
