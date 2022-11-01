---
layout: post
title: Active GNSS antenna design (Part III)
---

Alright, welcome to the third and last post about the generation I Active GNSS antenna design saga. In this one I'll post about the actual results obtained from the constructed antenna. But first, I'll briefly explain something I forego in my previous two posts concerning the impedance match of the amplifier and was asked by a friend who happen to read this blog. 

The input matching of the LNA is pretty miserable, and I really didn't care to match it to 50 Ohm but was solely concerned to match it to the lowest possible NF. Now, it's common to have LNAs with input and output matching to 50 $\Omega$, and is generally a good approach. This is very relevant since the LNAs can be integrated with band-pass filters at input and/or output, and these filters are usually designed for an input and output impedance of 50 $\Omega$, and when this is not the case, that can change the frequency response of the filter and completely alter its expected performance, hence ruining your receiver. In my particular case, there's no filter, the antenna is directly driving the LNA, so the input matching is not so critical. Now, of course, having a high input return loss will reflect the signal back to the antenna and may cause other sources of disturbance, plus reduce the possible amount of power being delivered to the LNA for amplification, which can be determined from the matching loss:

$$
ML_{dB}=-10 \times log_{10}(1-\ro^2)
$$
where $\ro$ is the reflection coefficient, or the $|S_{11}|$ in this case.

Before moving on to the measured results, here's some nice pictures of the fabricated PCBs of the antenna and the LNA.

|![antpcb](/images/post15/antenna_pcb.png)|![lnapcb](/images/post15/lna_pcb.png)|
|:-------------------------:|:-------------------------: |
|Ring antenna PCB | LNA PCB |





Having this completed I had some ideas on how to improve this antenna, making it more compact and having more active gain, therefore,  I'll keep posting more updates on GNSS antennas in the future. I have an upgrade for the LNA board design, and I'm working on a new, more compact version of the radiating element!

I'll try to diversify, and my next post will be about something different than GNSS, but I'll come back to GNSS in the future for sure.

So stay tuned folks!