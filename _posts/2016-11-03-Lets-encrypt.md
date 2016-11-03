---
layout: post
title: Let's Encrypt!
tag: misc
published: true
---

I run a bunch of websites off of my server, and I always kind of felt bad for not serving HTTPS. Some of the things I serve use passwords and even though none of the sites I host deal with politically-charged content, it still felt wrong to serve HTTP. 

### Why you should care about serving HTTPS
Google says it better than I could, so check out what they wrote about [why HTTPS is important](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

### Why do people still serve HTTP?

In my case, it was sheer laziness. None of the sites I run make me a single cent, and setting up HTTPS is work. Not a whole lot, but it is enough work that the incentive to switch to HTTPS (me feeling bad) was not sufficient. And once you've set things up once, you have to renew certificates and make sure the transition is handled well.

Oh and it costs money.

### That was before the EFF's "Let's Encrypt" project

I looked at the [EFF](https://www.eff.org/)'s ["Let's Encrypt"](https://letsencrypt.org/) project a while ago, and got interested: basically, in an effort to get people to use HTTPS, the EFF started a project aimed at automating the generation and installation of certificates. Coolio.

I tried to use it early on, but my server was so old that their scripts wouldn't run. But recently I updated everything, and gave it another try. And boy did it work.

Basically, following the [instructions](https://certbot.eff.org/) you install the client script package, run it, answer a couple of simple questions, and boom, you're done. Then if you add a cron job to renew the certs, you're done forever. Amazing.

### No more excuses
Thanks so much to the EFF for this, I'm convinced it'll make a huge difference over the coming years.

Now if only Github pages with custom domain names would work over HTTPS...