---
layout: post
title:  Multi-Task Learning, a Sentiment Analysis Example
author: Wang Shenghao
date:   2022-10-23 15:40:00 +0800
categories: jekyll update
excerpt_separator: <!--more-->
post_description: The article explains the concept of multi-task learning using an example of aspect based sentiment analysis. This POC solution can be used to generate rating scores for pre-defined aspects of real world product or services out of the customer reviews.
---

<div class="img-div-any-width">
  <img src="https://raw.githubusercontent.com/shenghaowang/absa-for-restaurant-reviews/main/absa-network.png" style="max-width: 80%;" />
  <br />
</div>

<!--more-->

Imagine at an autonomous driving company, you are tasked with building an object detection solution to identify pedestrians, vehicles, traffic lights, and stop signs in images. How will you tackle this problem?

One simple approach is to frame a multi-label classification problem, which can be solved by building 4 binary classifiers. In this case, each classifier will be in charge of identifying one of the aspects within our interest, such as traffic lights. However, building multiple independent models can be tedious especially if there are dozens of aspects you need to work on. Given the fact that we aim to solve multiple problems with the same nature of image classification, is it possible for us to develop an all-in-one solution to simultaneously address all the problems? This leads to the topic of this blog post, **multi-task learning (MTL)**.

The general idea of multi-task learning is to learn multiple tasks in parallel by allowing the lower-level features to be shared across the tasks. The training signals learned from one task can help improve the generalization of the other tasks. Let's take a look at an example using MTL for sentiment analysis.

## Problem Statement

We have a restaurant review dataset 


## References

* [An Overview of Multi-Task Learning in Deep Neural Networks](https://arxiv.org/abs/1706.05098)
