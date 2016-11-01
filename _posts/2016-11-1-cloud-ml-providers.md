---
layout: post
title: The Emergence of Cloud Machine Learning
author: Mike Kroutikov
---

Deep Learning is coool. But expensive.
Lets see what options do we have for training deep models. 

Naturally, one would need a pretty big machine to do real interesting stuff.

<p><a href="https://commons.wikimedia.org/wiki/File:Inside_Z9_2094.jpg#/media/File:Inside_Z9_2094.jpg"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Inside_Z9_2094.jpg" alt="Inside Z9 2094.jpg" height="480" width="384"></a></p>

Here are some options to consider:

* Buy a server
    - For example, from [System76](https://system76.com/desktops/silverback)
* Rent from
    - [Amazon EC2](https://aws.amazon.com/ec2/instance-types/)
    - [Google Cloud ML](https://cloud.google.com/products/machine-learning/)
    - [Rescale](http://www.rescale.com/pricing/)

Let us look in some more details on cloud ML providers. With the goal to use TensorFlow as the ML tool.

**Disclaimer:** *The opinions herein are based on my limited experience using each of the mentioned platforms. 
I may be grossly off in my analysis. Take with a grain of salt! You've been warned!*

## Amazon EC2
Here we have a choice from older systems for just $0.65/hour, and up to the bleeding-edge monster of 16GPUs+64CPUs at $14.40/hour.

EC2 is an established platform, with a lot of tools built on top of it.

### Pros

* Full cloud linux platform, no limitations
* Very familiar

### Cons

* Instancies with older GPUs will need TensorFlow re-compiled to support the GPU compute capability < 3.5.
* Not a managed platform: if cluster of instancies is needed, have to use fairly low-level AWS api to configure, provision, and manage the cluster.

## Google Cloud ML
Just out of **beta**, Google Cloud ML platform is a very promising offering. It is right from the company behind the TensorFlow --- we can expect all the latest bells and whistles.

Even though Cloud ML is a recent product, Google Cloud itself is a very mature platform, with App Engine, multiple storage options, management and logging tools.

One can choose among several different types of workers. I tried the standard (cheapest) one, and was somewhat disappointed by the performance --- time per batch was **7 times(!) slower** than the cheapest EC2 machine (`g2.xlarge`). Looks like to get anywhere one needs to write training code for distributed architecture from the start.

### Pros

* Managed platform
* Distributed TensorFlow is built-in
* $300 credit to get started

### Cons

* A single worker seem to be pretty weak. 
* Locks you down into Google cloud infrastructure (have to use Google Storage for data).

## Rescale
Very easy to start, has nice no-nonsense dashboard. GPU workers are pretty fast (at par or better than EC2 `g2.xlarge`).
TensorFlow is pre-installed. Cluster startup time is considerble (4--8 minutes). 

I experienced this problem: just making a typo in the startup script leads (understandably)
to the failure. But you have to wait for the cluster to start (takes 4-8 minutes) to realise this. 
And, most strangely, such an error incurres a **charge of about $1**. Not sure if its a bug in the billing or I missed something in the pricing sheet. As configured, worker should cost about $1.20 per hour.

The credit of $10 to start playing with the platform is too small. After making few configuration mistakes, 
and training a sample model for less than 4 hours, the free credit is gone. 
Again, as configured, I should have had about 8-10 hours of "free" play time.

### Pros

* Semi-managed platform. Can be seen as a middle ground between Google Cloud ML (completely managed) and EC2 (completely unmanaged).
* Powerful workers

### Cons

* Meager $10 free credit to get started
* Billing mechanism is not clear as they apparently charge for configuration errors(!?)

## The Cost of Learning is Hidden Deep
All cloud ML providers quote cost per worker and per hour. Workers are wildly different. Comparing pricing at its face value is misleading.

A mental experiment:
Would you pay twice more per hour to make your model train four times faster? Sure you would! You will spend less 
money to train your model on a more expensive (per hour) machine.

What one really wants is the cost per model per epoch of training. And it still may vary significantly depending on your model. Such an analysis is yet to be done.

## Summary

For my tasks EC2 still seems like the best option, because:

* A single GPU worker is still sufficient for my tasks
* EC2 provides training environment that is identical to the development machine (my laptop). 
  So no surprises when deploying in the cloud
* My amount of training data is still pretty small --- no need to go for cloud storage yet

We should get prepared to write **distributed** TensorFlow training code. Sooner or later data will grow over the capabilities of a single worker.
