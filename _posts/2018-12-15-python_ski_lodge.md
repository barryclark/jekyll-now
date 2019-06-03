---
layout: post
title: Python program for Ski Lodge TV (Part 1)
---

Over my three years of working and living on ski resorts, I have learned so much about snowsports, avalanche safety and generally living in the unforgiving land of a 3500 metre mountain.

However, one thing I have noticed is the lack of use of technology in the chalets and homes that guests stay in.

I find there is almost always a television next to where guests eat breakfast that is often off all morning. The announcement of weather, avalanche safety and lift status is left to the workers or for the guests to find out themselves. This info is of utmost importance, especially when touring, and is very visual. This lends well to big screens and can be hard to look at on small phone screens.

For this reason, I thought I could build a program for my spare raspberry pi, hopefully, to solve the problems discussed above:

Step one was to consider what I would like the program to achieve:

1. Between certain times in the morning it should show weather, lift status and avalanche web pages on a rotating carousel.
2. After a certain time when most guests have left switch to a loop of snow films for the guests left behind.

Step two was to work backwards from step one and figure out what I would need to know to achieve this:

1. Basic coding language skills (I used Python)
2. A way to control web pages from the code
3. A way to control VLC from the code

Step three was to collect the objects needed:

1.Television with HDMI input
2. Rapsberry Pi, Power and WiFi
3. HDMI lead

I used a Raspberry Pi which is a tiny credit card sized computer that is incredibly cheap to buy. They are low powered but are perfect for this kind of job. Find more info about them here. 


Raspberry Pi

On the next post I will talk about how I used Python to manipulate a browser to cycle through different URL's, refresh them, focus certain objects and more automatically.
