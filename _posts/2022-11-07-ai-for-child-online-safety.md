---
title: AI For Online Child Safety
date: 2022-11-07
---

The internet is not a safe place, especially not for kids. The amount of distateful content--sexually explicit material, hate speech, graphic violence, profanity, and cyber bullying, to name a few--available online today makes it really hard for any well-meaning adult to let a child browse the internet without supervision.

We cannot feasibly be present 100% of the time, looking over our kids' shoulders, and even if we somehow managed to flag every site notorious for this kind of content, social media is still freely available to all kinds of predators. 

At the end of 2018 I figured that this was a problem AI could solve, and I worked with my friend, [Ngunyi Macharia](https://github.com/ngunyimacharia), to build a prototype of a browser extension that used computer vision to monitor online content and flag sexually explicit material. My expertise in Deep Learning was very limited at the time (I was mostly an Android developer back then), and we had to rely on Computer Vision API's. The API usage was not free, even for our noble cause.

Guess what? A few years later, I'm still interested in solving the problem, and with the new tools available, like [Timm + FastAI](https://timm.fast.ai/) and [Gradio + 🤗](https://huggingface.co/gradio) a whole lot more is possible!

As a proof of concept, I have trained a quick and dirty classifier (pun intended) to classify images with sexually explicit content.  
Hmmm 🤔, maybe I should call it "Dirty". LOL. I haven't thought of an official name yet.

#### Demo

It's a simple and intutive interface (I promise not to show you any dirty images), that takes a web URL, scrapes and classifies all the available images, and lets you know whether the site is considered safe or not based on the images.

![](https://raw.githubusercontent.com/KayO-GH/blog/main/assets/images/safety-analyzer-screenshot.PNG)

You can test it out [here](https://huggingface.co/spaces/KayO/WebsiteImageSafetyAnalyzer) with your own examples. Feedback is welcome.

#### Current Limitations
There's quite a number of limitations. These are the ones off the top of my head:
1. This classifier works just for just sexually explicit images right now, there is more work to be done with violence, substance abuse, etc.
2. The internet is made up of more txt than images, so there is a lot of NLP work to do in terms of profanity, hate speech, etc.
3. Don't get me started on video analysis.
4. Model compression and inference time. (Ideally this should run in a browser. I'll be working on re-doing the browser extension to work with this. 🙂)

Finally, I'm happy to collaborate on this. So if you're interested in helping, reach out.

KayO
