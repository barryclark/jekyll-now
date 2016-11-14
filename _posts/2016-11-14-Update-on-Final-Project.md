---
layout: post
title: Update on Final Project
author: dslezak
published: true
---

So far I have focused on taking Jackson Pollock's splatter art and deconstructing it down to its RGB components. 

Below, is an example of one of the Jackson Pollock splatter art painting used in analysis.

![Jackson Pollock](https://qph.ec.quoracdn.net/main-qimg-23393d420a077fb1ae23750c4e5e0d04-c?convert_to_webp=true)

The reason that Jackson Pollock's paintings were used as reference was because he is considered the inventor of splatter art so the assumption is that his painting are what splatter art should look like. His paintings will be used to find the average of each component which will create an average looking painting. Then, the average painting will be compared to splatter art and regular paintings, hopefully the splatter art will be closer to the average painting than the regular art.

I have so far been working on getting the average of each component. My problem is that I can do the average manually but I can't automate it. I will briefly go through the process. First, five Jackson Pollock paintings were found and imported into MATLAB. Then, the paintings were all converted to be 100 by 100, which does lose some accuracy but it makes the task much easier. Next, the red component of each picture was put into a vector. A 100 by 100 vector of zeros was made to keep the average red component. Afterwards, two while loops were used to find the average of red at each location and put into the average red component vector. The problem is that the average red vector comes out to be almost all zero expect a few lines of 51. I think the problem is that the picture vector and the zeros vector use different data types. I couldn't find a solution, Dr. Hemphill found one using Python which I have not had time to test, I will also have to learn a bit of Python to use it.

As mentioned before the average Jackson Pollock splatter art will be used as a comparison between splatter art and regular art. If this is not successful, then machine learning will be attempted. Jackson Pollock splatter and regular art will be used in supervised learning. The next, step would be to give each color a range of RGB values and then find the area of connection in the image, like splatter art might have a certain average space for color which could be a feature of splatter art. And the other possibility would be to use an already created program like ImageMagick to do analysis and look for similarities. Also a note on why I think images are converted to gray scale for similarity analysis, I think its converted to gray scale because than if an image has a different tone it can still be similar. Note, I have not done much research into this.

References: 

Pollock, Jackson. Jackson Pollock Splatter Art. Digital image. N.p., n.d. Web. 14 Nov. 2016. 
