---
layout: post
title: 90 Degree angle traces - Do you even RF?
---

Hey there folks. Today I'm going to talk about curves in PCB tracks. I've seen a few topics here and there trying to demystify the way that tracks should curve in order to avoid all sorts of magic stuff. There seems to be a large consensus about avoiding 90º degrees bend at all costs, then there's a lot of people already claiming we've been doing stuff based on tradition only and that there's no solid reason nor practical argument to not use 90º bent tracks. So I thought I should give my two cents on this subject. If you want to indulge in such a discussion, check out [this EDA stack overflow thread](https://electronics.stackexchange.com/questions/226582/pcb-90-degree-angles).

The most voted answer of said thread is certainly very detailed and mostly demystifies religious beliefs about the 90 degree angles in the tracks. But I also feel it ends up going overboard with statements such as:

"In fact, this is true even at very high frequencies, which I will address further down in this post. If I am wrong, by all means, show me measurements demonstrating that 90 degree corners are worse. Or better yet, if there is a measurable difference, surely it would be straight forward to build a meter that could determine if a trace had a right angle or 45 degree angle corner in it entirely by performing measurements on the input and output. Or picking up the EMI. I will eat my words if anyone can build a meter to do that."

That's where it messed up. You don't just go out and start talking about high frequency if you know jack about that business. Unless you consider 10 MHz to be high frequency...


I'll not indulge in philosophical discussions, nor unearth ancient documents with references to processes that are no longer in use since your grandma wear bikinis (you can check that thread I mentioned before for that). I'm gonna be more pragmatic... I'll use a damn expensive EM simulation tool and compare some PCB tracks!

I'll start simple. I picked a 100 mm long microstrip line, with 50  Ω  characteristic impedance, calculated for a FR-4 substrate with 60 mil (1.6 mm) thickness, and designed a 180º path using four different curve types. Let's see how it bends!
