---
layout: post
title: UHF RFID Antennas - VII - Quadrifilar antenna (Part II)
---

To continue on the topic of the printed quadrifilar antennas, as promised, this post will be about the feeding network. Last post I've shown the antenna part and a quick explanation as to what the feeding network should look like, this time I'm going to cover the power distribution network that makes it all work. More specifically, I'll explore an alternative that allows the antenna construction to be more compact and with better performance.

So the idea is to create a system which has one single input port and four output ports, where all the outputs have the same power and 90º sequential phase difference between them, as explained in the last post. 

![pdn](/images/pdn.png)

But how exactly does that work and why the antenna becomes circularly polarized, when the single element of the antenna has linear polarization? Well, if you generate two orthogonal electric field components with a 90º phase difference between them, then the resulting field in the direction of radiation varies circularly. To the left or to the right depending on which component comes first. Here's two poor animations I've put together in Python to illustrate the effect (I made an effort alright?):

![efield-linear](/images/linear_pol_corr.gif)

Electric field components with 0º phase

![efield-circular](/images/circular_pol_corr.gif)

Electric field components with 90º phase

So, since we have elements generating linear polarization but one orthogonal to the other, if they're fed in phase, they'll generate a linear, but slant polarization, like the animation on the left. But, if they're fed with a 90º phase difference we get a circular polarization, like the one shown on the right.

If you'd like to see something with better looks and a more detailed explanation, then look no further and check out [this video](https://youtu.be/8YkfEft4p-w) about polarization of electromagnetic waves. 

And now you're wondering, "Wait, but if you only need to excite two fields with 90º phase between them, then why do you have an antenna with 4 elements, what are the other two elements for?"

![chaotic](/images/playing_alignment.gif)

Now seriously, the other two elements are there to balance the main-lobe direction. You see, the only way to make it with only two elements, is if the two elements are physically co-located, so that their phase centers are in the same spot. SPOILER ALERT: This is possible, but that's another pots.
Since in the example of the quadrifilar antenna each element is apart from another, their phase-centers are separated, this will cause the radiation pattern to tilt towards the opposite side of the fed elements.

![two-elements](/images/two_ports_90.png)

Only two elements fed.

![efield-circular](/images/four_ports_90.png)

All four elements fed.

The continuous phase progression is easy to understand given that the other elements are in opposition of phase. The element in the bottom is generating an electric field with the exact same polarization component, but in opposition of phase, the same happens to the element of the left side in relation to the element on the right. If these were to be fed in phase, the field components would cancel between them, and you end up with...

![ramsey](/images/pieces_of.gif)

With that out of the way, let's get back to the point of this post, which is about the feeding network as shown in the first figure. Now, as my grandma used to say, "there's many ways to tie a tie", so there's many ways to produce said feeding network. The most obvious and straightforward method is as I've shown in my previous post:

![wilkinson](/images/wilkinson_nw.jpg)

It's a Wilkinson power divider, followed by delay lines. The main issue with this implementation, is that a microstrip line with quarter-wavelength length (90 degrees of electrical length) in FR-4 substrate at 900 MHz, is 46.1 mm long, and for that implementation you have one branch with 180º, that's 92.2 mm and the other with 270º, that's a whooping 138.3 mm length. Of course you can make curves and meander it around, but that's still a lot of track to cover. And when you think that these lines have a huge loss given FR-4 being a very poor substrate material for RF tracks, you really start to look for better alternatives.

One alternative is as shown in [Qiang Liu's paper](https://ieeexplore.ieee.org/document/7042302), which is actually a combination of two structures, first an out-of-phase (180º) power splitter, described in [J. X. Chen's paper](https://digital-library.theiet.org/content/journals/10.1049/el_20061767), plus two miniaturized arbitrary phase difference couplers, as described in [Yongle Wu's paper](https://ieeexplore.ieee.org/document/6515706). As in the following picture:

![qiangliu](/images/qiangliu_nw.jpg)

