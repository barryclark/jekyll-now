---
layout: post
title: Training Production-Grade Machine Learning Pipelines 
---
A few thoughts on how machine learning models can be scaled, stored, and used in production applications. 


Choosing, training, and testing the right machine learning classifier is a difficult task: you have to preprocess 
and analyze your dataset's features, possibly extract new features, tune hyperparameters, and perform cross-validation, just to name a few tasks. 
After you've trained and tested a reliable classifier, it's ready to be deployed to serve new predictions at scale. 
These machine learning systems that are trained on a massive amount of data coming from a variety of sources can be hard to maintain and scale up. This post is a few of my thoughts on deploying a machine learning architecture, specifically using Amazon Web Services. 

### The Multi-Model Architecture
Our machine learning system has to be capable of a few different tasks: 
- It needs to efficienty store data, as well as pull data from several different sources. 
- It should be capable of automatically re-training and testing itself. Since new data is always flowing to our system, it's probably not a good idea to train our model only once on an initial dataset. 
- The time-consuming training phase should occur offline. When the model is trained, it should be deployed such that any arbitrary event can trigger it.
- A user-friendly interface is essential for developers to manage the training, testing, and deployment phases of the machine learning system. 

For the above reasons, I've found the tools and infrastructure offered by AWS to be very helpful. Specifically, I'll be talking about how we can use EC2, RDS, S3, and Lambda to build out a production-grade architecture. 

