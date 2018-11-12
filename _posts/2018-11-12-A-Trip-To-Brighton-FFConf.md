---
layout: post
title: A Trip To Brighton&#58; FFConf 2019
---

# Getting There

I absolutely love the journey to Brighton. I had set off early in the morning from Dundee and around 8 hours later after beautiful scenes down the east coast main line, then through London onto the Brighton mainline, I arrive at a very cosy Airbnb.

Above all, the thing I enjoy most is the atmosphere of the city. When you leave the station, you're met with a bunch of food trucks and stalls, it's a busy place but not a rushed place. It's got a creative flair which results in all kinds of utility boxes having artwork across them, and it's got a great feel to the city and I've barely left the station. While there I couldn't help but think that Dundee is to Edinburgh as Brighton is to London.

![A slide from Charlie Owen's 'Dear Developer, the Web Isn't About You' talk](/images/MVIMG_20181108_151732.jpg "A slide from Charlie Owen's 'Dear Developer, the Web Isn't About You' talk")

# FFConf
This isn't my first FFConf, I first attended last year and had such great time that I knew I'd be back at the first opportunity. Apparently I was so keen that I bought the [first ticket to the conference](https://twitter.com/ffconf/status/1016609655253020672).

The two halves of FFConf are Remy and Juile Sharp, who this year are celebrating 10 years of FFConf. The pair, and the entire team, really know how to put on a show. The atmosphere they have created, it's like they have invited a huge group of strangers into their front room to watch a bunch of really interesting stuff. Remy often admits as such, he curates a conference filled with talks that are interesting to him and invites everyone along for the ride.

## Mentoring: Being the help you wish you'd had by [Jo Franchetti](https://twitter.com/ThisIsJoFrank)

Personally, I find myself in this neat little position where I'm a final year student so I'm able to support students in the years below me but I also recognise that there's so much I don't know, and I've been fortunate to have mentors at various times.

At it's core, Jo's talk was encouraging people to "Be the help you wish you had" and that's such a relatable sentiment. She told us how she was self taught and that most of Jo's learning was by copying and pasting bits of code she liked --- the most common method of learning. But when something didn't work, and she couldn't understand why, she had nowhere to turn.

Once Jo knew the answers to those questions and found herself mentoring, it made her more confident in her own skills and ability, and her mentee got equally gained value from it.

> Everyone should mentor and everybody should have a mentor.

A mentor doesn't have to be a senior 500 year experience developer, they can be anybody, even the most junior developers still have experience that those just entering the industry don't. Becoming a one person cheer squad to help push and improve people, and celebrate victories is something we should all be considering.

## The Future of JavaScript & Machine Learning by [Eleanor Haproff](https://twitter.com/EleanorHaproff)

This is pretty exciting.

For so long the entire domain of Machine Learning pretty much belonged to the Python community, maybe a little bit of the Java community. Mostly closed to JavaScript developers. Eleanor took us through TensorFlowJS, a complete rewrite of TensorFlow in JavaScript which **_allows for machine learning in the browser_**.

Nothing to setup, no driver for GPUs, just a `<script>` or `require` and you're ready to start. TensorflowJS takes advantage of WebGL which already has GPU acceleration, and that allows it to have great performance.

TensorflowJS will work with models that has been trained by any flavour of Tensorflow, but what I'm personally most excited about is the fact that since Tensorflow can now work in the browser, Machine Learning can happen on device without being send to a server reducing concerns about personal data and GDPR worries.

## Practical Web Animation by [Lisi Linhart](https://twitter.com/lisi_linhart)

Many projects don't prioritise animation, infact many neglect it entirely. I know this is something I'm guilt of doing.

Web animations are two fold; first, for the user they provide a means of orientating then, drawing their attention, providing meaningful feedback, or even perceiving the performance of applications. As long as they're not [obnoxious](http://tholman.com/obnoxious/) or misleading then they'll mostly be fine.

The other consideration is the browser. Animations need to have good performance or they can seriously degrade the experience of an application. There are four CSS properties where animation is 'cheap': transform's scale, translate, rotate, and the opacity property. These can be animated with minimal affect on the application.

This isn't to that other properties can't be animated with disastrous consequences. The [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) property can be used to hint to a browser that a property will change. However too many of these will result in crazy large memory usage so they should be used sparingly.

Also dev tools provide a crazy level of insight into web animations, and Chrome allow for CPU throttling to simulate animations on weaker devices.

## Is it possible to build a truly diverse community? by [Jenny Wong](https://twitter.com/miss_jwo)

Short Answer: **Yes**

Jenny spoke about her experience of organising WordCamp London in 2016 & 2017, as lead organiser she was able to call the shots. The first thing that Jenny highlighted was that everyone wants to throw around the word diversity but why don't we think of inclusively instead? Made a concious effort to _include_ everyone. Be proactive to include.

The WordCamp London team started to look at other environments in other industries which do a good job at being accessible to everybody - airports, supermarkets, train stations and so on. Learning from how they accomplish this and take inspiration to adapt already successful approaches for their event.

Jenny then went onto explain a number of ways they handled inclusively at WordCamp London such as childcare, additional spaces for people away from the event for religious or personal reasons, wider aisles for wheelchair users, the event signage. Jenny was able to cover a lot in her 200+ slidedeck.

It all boiled down to providing people with the things they need to feel included and comfortable. If the team weren't sure how to accommodate for a persons needs they would ask.

Inclusively and Accessibility should _always_ be first class citizens at community events.

## Lunch

I had a Mozzarella and Tomato Panini, which isn't particularly interesting.

FFconf do this wonderful thing. Many people go to conferences on their own, and this is mostly fine since a lot of the day is spent watching talks. But few people want to spend the whole day themselves. During the lunch, nearby FFConf host a "lunch with strangers", an opportunity for lone attenders to meet and talk.

The lunch is one the many opportunities I had to meet other developers from the widest range of backgrounds and experiences, it's easy to get caught up in the conversation.

## Back to the future of JS: the next features and amazing proposals by [Willian Martins](https://twitter.com/wmsbill)

Willian's talk was so captivating that I found myself with much fewer notes than I usually would take at a conference talk, right on the cutting edge of JavaScript.

Willian showed off various proposals on how pipelining could work in future JavaScript. At the moment there are two proposals for smart pipelines and F# Pipelines.

Both of these proposals seem like incredibly powerful features and they absolutely deserve some further reading but each come with their own gotchas.

## Dear Developer, the Web Isn't About You by [Charlie Owen](https://twitter.com/sonniesedge)

Charlie delivered a very powerful talk, starting off with a history of how the internet came to be. She led up to the Internet Explorer/Netscape browser wars, how this killed innovation by providing a barrier to development and how it wasn't really until the iPhone came along that it really changed the game.

The point Charlie was really trying to drive home is that as developers, we should _always_ have the user at the center of what we do. As developers, we have a tendency to think more about the cool tech that's on offer than how this is going to impact our users but the early 2000s browsers wars forced developers to pick which group of users they were going to support and even now developers can be guilt of that - the frequency of "Best Viewed in Google Chrome" banners come to mind.

Our typical users also don't have the super spec devices that we develop on to perform intense operations, they don't always have fast internet connections, they don't have cheap access to data.

The average webpage is 2MB, which takes roughly 12 seconds to load on a typical 3G connection. This kind of thing is prohibitory to some users, and as developers we should ensure we are creating webpages that work in the absolutely most hostile environments.

## Using a Modern Web to Recreate 1980s Horribly Slow & Loud Loading Screens by [Remy Sharp](https://twitter.com/rem)

I'm pretty bad for getting myself down a Wiki Rabbit Hole but Remy blew it out of the park with his ZX Spectrum Rabbit hole.

So I've never owned a ZX Spectrum, but I know how significant they are. The TL;DR is that when they loaded a game, they would make a _horrendous_ noise, and the loading screen would appear in bars and the colour would fall down the screen.

Remy wanted to recreate this in JavaScript... because funny?. The [World of Spectrum](https://www.worldofspectrum.org/) website documents absolutely everything you could imagine about the Spectrum including a reserve engineering of the device.

Using this, Remy was able create a JavaScript application that allowed him to take a photo of the audience, encode that in the same way files were stored for the spectrum and then actually load that onto a real ZX Spectrum and show us a horrible sounding hyper low res image of the FFConf crowd.

## Weird Web & Curious Creation by [Tim Holman](https://twitter.com/twholman)

Tim's talk was wonderful and entertaining and the ideal way to end the day. He showcased some of the projects he's created: A website where the DVD Logo _always_ hits the corner exactly, a [zen garden of play things](https://thezen.zone/), a creepy browser extension called Buddy to keep him company and countless more --- [Elevator JS had me in tears](http://tholman.com/elevator.js/).

Why though? These are _mostly_ useless things, they don't provide any value really.

Tim absolutely admitted this completely, but have a think about the skills he picked up along the way. For the creepy browser extension he was able to learn about browser extensions, the text-to-speech api, he's got something interesting to talk about. It's something I really want to spend more time doing rather than focusing on big project.

## Wrap Up

As always, I take many more notes for these talks than I cover on my posts but I hope you've gotten the jist.

I might always struggle to properly articulate how much I love coming to Brighton for FFConf, hopefully I've done it some justice. The people, the place, and the content are all outstanding and I absolutely plan on being back next year.