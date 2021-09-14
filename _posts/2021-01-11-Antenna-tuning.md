---
layout: post
title: Antenna tuning - How to juggle two bands
---

Hello folks. 

There's been some time since I've written my last post. I've been very busy with work and other side projects, which eventually will find their way here, but since they're far from completion, I thought to make a smaller post about a subject that is useful and I've had had in my notes for a long time. So I figured I'd just put it up on the blog so it could be useful as reference for someone, or even myself one of these days.

The subject is simple, how to tune a dual-band antenna. There's a fair amount of articles and tutorials, even on YouTube, about matching networks, either LC and Pi networks. They'll teach you all you need to know about Smith charts and what not. That's all very useful, but they all have one problem, they usually focus on having impedance  Z1=R1+jX1  become  Z0   Ω  at one single frequency. But how do you do it when your antenna is suppose to operate at two different frequency bands? How to tune both bands to 50  Ω  (or other complex frequency for that matter)? 

It's rather common if you think about it: WiFi systems operate at 2.4 GHz as well as 5 GHz frequency bands (and now since WiFi 6 has been introduced, the 6 GHz band has been added). So you got to have a frontend that operates in both bands, but you probably only want to use a single antenna for everything. A single antenna that covers the frequency range between 2.4 to 6 GHz is certainly possible, but not at the size you'd appreciate for a small embedded system. Mobile systems also, with GSM/GPRS, UMTS and LTE and now 5G bands coming into place, that's lot of bands to cram into the smaller number of antennas possible. Small antennas are inherently narrowband, so the only option is to make them operate at the correct bands, to aid it, you have to design appropriate matching networks that make the antenna operate at all those multiple bands, and that means you need to juggle the matching at different frequencies.

Let's try to make it simple and not delve into the black magic arts... seriously this is engineering!
