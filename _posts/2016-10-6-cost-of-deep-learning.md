---
layout: post
title: Cost of Deep Learning
author: Mike Kroutikov
---

DRAFT

Deep Learning is coool. But expensive.

# How expensive, exactly?

Lets see what options do we have for training deep models. Naturally, one would need a big iron machine to do real interesting stuff.

![Mainframe](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Front_Z9_2094.jpg/1200px-Front_Z9_2094.jpg)

Here are the options to consider:

* Buy a server
    - For example, from [System76](https://system76.com/desktops/silverback)
* Rent from
    - [Amazon EC2](https://aws.amazon.com/ec2/instance-types/)
    - [Google Cloud ML](https://cloud.google.com/products/machine-learning/)
    - [Rescale](http://www.rescale.com/pricing/)

Let us look in some more details on cloud ML providers. With the goal to use TensorFlow as ML tool.

<red>The opinions herein are based on my limited experience using each of the mentioned platforms. I may be grossly off
in my analysis. Take with a grain of salt! You've been warned!</red>

## Amazon EC2
Here we have a choice of older systems, with K520 GPU, for just $0.65/hour, and up to the bleeding-edge monster of 16GPUs+64CPUs at $14.40/hour.

EC2 is an established platform, with a lot of tools built on top of it

### Pros

* Full cloud linux platform, no limitations
* Very familiar

### Cons

* Instancies with older GPU will need TensorFlow re-compiled to support the GPU compute capability < 3.5.
* Not a managed platform: if cluster of instancies is needed, have to use fairly low-level AWS api to configure, provision, and manage the cluster.

## Google Cloud ML
Just out of **beta**, Google Cloud ML platform is very promising offering. It is right from the company behind TensorFlow - we can expect all the latest bells and whistles.

Even though ML is a recent product, Google Cloud is itself very mature platform, with App Engine, multiple storage options, management and logging tools.

In ML training, there are several tiers of workers. I tried the standard (cheapest) one, and was somewhat disappointed by the performance --- time per batch was 7 times(!) slower that the cheapest EC2 machine (g2.xlarge). Looks like to get anywhere one needs to write training code for distributed architecture from the start.

### Pros

* Managed platform
* Distributed TensorFlow is built-in
* $300 credit to get started

### Cons

* One worker seem to be pretty weak. 
* Locks you down into Google cloud infrastructure (have to use Google Storage for data).

## Rescale
Very easy to start, has nice no-nonsense dashboard. GPU workers with GPU are pretty fast (at par or better than EC2 g2.xlarge). Startup time is considerble (I've seen timings between 4 minutes and 8 minutes). 

One problem that I did not really looked into is that making a typo in the startup script leads to the failure (takes 4-8 minutes to realise that there was an error as cluster starts and stops), and **charge of about $1**. Not sure if its a bug or I missed something in the pricing sheet. As configured, worker should cost about $1 per hour.

The credit of $10 to start playing with the platform is really pretty small. Especially after you make few mistakes typing
the startup commands...

### Pros

* Semi-managed platform. Can be seen as a middle ground between Google Cloud ML (completely managed) and EC2 (completely unmanaged).
* Powerful workers

### Cons

* Meager $10 free credit to get started

# What is next?

For me, personally, EC2 still seems like the best option, because:
* one GPU worker is still sufficient for my tasks
* EC2 provides training environment that is closest to the development machine (my laptop). So no surprises when deploying for real training.
* amount of training data is still pretty low

Must keep an eye on cloud platforms for ML.
