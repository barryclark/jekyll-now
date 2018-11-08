---
layout: post
title: Background Subtraction
---

The idea behind background subtraction (also commonly referred to as foreground detection) is to separate the image's foreground from the background. If we have a good idea of what the foreground is, we can extract these segments from the image and perform any post-processing that we choose.

We construct a histogram of the RGB values of every pixel. Once we find the histogram we fit a unimodal normal distribution curve on it.

We assume that if a certain pixel is a background then it's frequency distribution should be very similar to the unimodal normal distribution curve. That is one pixel value is highly pre dominat over any other pixel values.

If we keep track of the mean and variance of the distribution we can separte the foreground from the background using the threshold of the Mahalanobis Distance (Distance is measured in terms of standard deviation).
