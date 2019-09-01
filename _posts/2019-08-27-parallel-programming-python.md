---
layout: post
title: "Talk: Parallel Processing in Python"
description: "Quick speaker notes on parallel processing in Python + talk reflection"
excerpt: Sometimes, we just can't make things run indefinitely faster on a single worker.
---
---
Where: [Python User Group Singapore, August 2019 Meetup](https://www.meetup.com/Singapore-Python-User-Group/events/263765155/)
When: 27 August 2019
Location: Zendesk Singapore

Resources used:
[Official Python documentation on concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html)
[Built-in Functions](https://docs.python.org/3/library/functions.html#map)
[Accelerating Batch Processing of Images in Python — with gsutil, numba and concurrent.futures](2019-05-27-accelerating-batch-processing.md)

## Recap

A recap of what I went through during my talk:

1. What is parallel processing?
    - Sequential vs parallel processing
2. Synchronous vs asynchronous execution
3. When should you go for parallelism?
    - Practical considerations
        - Is your code already optimised?
        - A little bit on problem architecture
        - Overhead in parallelism
            - Amdahl's Law
4. Parallel processing in Python
    - Why is parallelism so tricky in Python?
        - A little bit on Global Interpreter Lock (GIL)
    - concurrent.futures module
        - ThreadPoolExecutor vs ProcessPoolExecutor
        - multithreading vs multiprocessing
        - map() in concurrent.futures
    - Case: Image Processing for Shopee Data Science Challenge
5. Key Takeaways

## Slides

[Python User Group Singapore Meetup - 27 Aug 2019 - Parallel Processing in Python](https://docs.google.com/presentation/d/1B_gQxqIWOsqJFogw_F5e_6qd9jZFPlIKvCNtLe8tKP4/edit?usp=sharing)

## Quick reflection

For my first-ever public tech meetup talk, I was initially thinking of starting small by speaking at relatively more "beginner-friendly" meetups such as JuniorDevSG Code and Tell or Women Who Code Singapore Talks.dev. To my surprise, my first-ever CFP submission on How to Make Your Data Processing Faster was accepted by late June and I needed to find a meetup where I could practice part of my conference talk and get relevant feedback - fast!

I have attended Python User Group Singapore meetups (on-and-off) since November 2018, and I find the local Python community pretty welcoming in general. Hence, I booked a speaking slot with Martin for the August 2019 meetup to speak on Parallel Processing in Python, expecting to deliver my talk in front of around 50-60 people. One day before the talk, the RSVP for the meetup went close to 200 people. Wow.

### Things that could have been improved

1. Actual turnout on the day itself was over 100 people - which was way more than expected. I wasn't exactly prepared for that, so I got a bit nervous on stage.
2. As it was only the 2nd meetup that Zendesk hosted at their new office at Marina One, there were technical issues with using my USB-C and HDMI-to_USB-C adapter to display my screen on the projector.
3. Majority of the audience wasn't in the data field (save for around 10-20 people), so my "tech-y jokes" on Apache Spark and GIL kinda fell flat on the audience.
4. Questions from the audience during and after Q&A were on threading and parallel + async I/O operations/executions - topics that I have yet to explore extensively.
5. Time management - my talk overran slightly beyond 30 minutes as someone in the audience interrupted halfway to clarify about Spark and parallel processing, so it got a bit late and people started leaving.
6. I need a taller standing tripod to record my own talks when Engineers.SG is not recording. My mini-tripod was positioned on a table facing the stage at a really weird angle, and the recording was marred by people walking around blocking the camera view. Much thanks to Ka Ho for being my temporary video-recording tech support (and effective stand-in for Engineers.SG) while I was on stage.

### Things that went well

1. There were around more than 100 people when I started my talk, and there were still around 100 people left by the end of my talk.
2. There were plenty of questions asked by the audience on- and off- stage - plenty of interesting ones, which means my talk was interesting enough for them to ask questions.
3. A few people in the audience approached me off-stage and/or on LinkedIn to thank me for the talk, request for the slides, and give positive feedback on how much they learnt from the talk.
4. Some people loved my toasts and coffee analogies. :)
5. Speaking to more than 100 people for my first-ever tech meetup talk is no mean feat!
