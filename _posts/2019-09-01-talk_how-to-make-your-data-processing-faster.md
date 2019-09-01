---
layout: post
title: "Talk: How to Make Your Data Processing Faster - Parallel Processing and JIT in Data Science"
description: "Quick speaker notes on parallel processing and JIT in data science + talk reflection"
excerpt: .
---
---
Where: [Women Who Code CONNECT Asia 2019](https://asia.womenwhocode.dev/)

When: 31 August 2019

Location: Lifelong Learning Institute

Resources used:
- [Official Python documentation on concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html)
- [Built-in Functions](https://docs.python.org/3/library/functions.html#map)
- [5-minute Guide to Numba](http://numba.pydata.org/numba-doc/latest/user/5minguide.html)
- [Accelerating Batch Processing of Images in Python — with gsutil, numba and concurrent.futures](_posts/2019-05-27-accelerating-batch-processing.md)

## Recap

A recap of what I went through during my talk:

1. Bottlenecks in a data science project
2. What is parallel processing?
    - Sequential vs parallel processing
    - Synchronous vs asynchronous processing (with input from the #javascript folks this time)
3. When should you go for parallelism?
    - Practical considerations
        - Is your code already optimised?
        - A little bit on problem architecture
        - Overhead in parallelism
            - Amdahl's Law
4. Parallel processing in data science
    - A little overview of what the data science folks have and need
        - Most data folks use Python -- GIL comes into play
        - Spark? The Python data folks use that too.
        - Data processing tends to be more compute-intensive
    - How to do parallel processing in Python
        - concurrent.futures module in Python
        -   map() in concurrent.futures
5. JIT Compilation in Data Science
    - Compiled vs Interpreted Languages
    - JIT Compilation
        - JIT Compilation in Data Science: numba module in Python
6. Putting Them All Together
    - Case: Image Processing
7. Key Takeaways

## Slides

[Women Who Code Connect Asia - 31 Aug 2019 - How to Make Your Data Processing Faster](https://docs.google.com/presentation/d/12WzT3thMJbFJ_W4FMkAyKgnYdQhFcak9plL_c9VIg2w/edit?usp=sharing)

## Quick reflection

This talk started out as a by-product from the Shopee Data Science Challenge which two of my colleagues and I participated in. As this was our first data science challenge, we faced loads of challenges processing our images and using them as our model inputs - so I wrote a Medium post about it and used whatever I wrote as a CFP idea with the intention to submit to multiple conferences (after all, only 1 in 10 CFPs typically get accepted). To my surprise, my first-ever CFP submission on How to Make Your Data Processing Faster was accepted by late June - which is pretty crazy no matter how I think of it.

As this was my first-ever conference talk, I had a practice talk on the Parallel Processing portion at the Python User Group Singapore August 2019 meetup. Based on the questions and feedback collated from the audience, I made some improvements to the slides and even sought the help of the Javascript/Node.JS folks on Twitter for some ideas on how to explain async to the general audience. Speaking on stage behind a podium in front of more than 100 people for my first-ever tech meetup talk + doing the open pose as suggested by the WWCode Taipei folks did help significantly with the nerves before the talk too. I could have done better next time though - if there will be a next time after this conference talk.

### Things that could have been improved

1. I don't have the exact figures for the actual turnout for my talk, but it seemed to be less than 100. I might need to improve on my social media outreach before my speaking slot.
2. I think I kinda stumbled on my "256-core" repeatedly throughout my talk.
3. I might not have handled the Q&A very well this time, since no one has any other questions after the first 2 questions.
4. A very interesting question asked by a data engineer after Q&A on parallel + sync/async + multithreading/multiprocessing I/O operations/executions - and unfortunately he has to wait for the complete HTML request output before he can do anything else. I don't think I gave a very good response besides suggesting that he try out asyncio instead of concurrent.futures module...

### Things that went well

1. I reached my speaking venue early to test out the projector, microphones and wireless presenter and check that they were in working condition.
2. My attempts to engage the audience were pretty successful this time - especially the kopi + async part!
3. There were 4 questions asked by the audience on- and off- stage in total - the two off-stage ones were interesting enough for me to consider exploring further as a future talk topic.
4. Quite a number of people in the audience approached me off-stage, throughout the conference (including lunchtime) and/or on LinkedIn to thank me for the talk and give positive feedback on how much they learnt from the talk. Having someone come up to you and say "hey I attended your talk and it was really interesting" makes all the preparation work for the conference talk worth it.
5. I received a special Twitter mention from a WWCode Taipei Director for "transforming complicated idea into simple example". :)
6. I managed to get plenty of photos of myself speaking on the conference stage from the conference attendees - on Twitter. I got more followers on Twitter too!
7. Time management was much better this time - I kept to the 40-minute speaking slot, including Q&A!
