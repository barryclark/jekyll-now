---
layout: post
title: Background Subtraction
---

# Background-Subtraction
Background Subtraction is widely used in motion tracking and analysis. This is my work on differnt Background Subtraction algorithms.

# Getting Started
I have coded in python lanngauge and used opencv Library for the subtractor.
Python Version: 3.6.2
Opencv Version : 3.4.1

# What is Background Subtraction?

The idea behind background subtraction (also commonly referred to as foreground detection) is to separate the image's foreground from the background. If we have a good idea of what the foreground is, we can extract these segments from the image and perform any post-processing that we choose.

We construct a histogram of the RGB values of every pixel. Once we find the histogram we  fit a unimodal  normal distribution curve on it.

We assume that if a certain pixel is a background then it's frequency distribution should be very similar to the unimodal  normal distribution curve. That is one pixel value is highly pre dominat over any other pixel values.

If we keep track of the mean and variance of the distribution we can separte the foreground from the background using the threshold of the Mahalanobis Distance (Distance is measured in terms of standard deviation).
 
 ![alt text](https://blog.kickview.com/content/images/2017/08/bg_img_1.jpg)
 
 ## Implementation
 # OpenCV 
 
 *Opencv Library has implemented few of the background subtraction algorithm based on Gaussina Mixture Model and Bayesian Segmentation.*


An usual applicable assumption is that the images of the scene without the intruding objects exhibit some regular behavior that can be well described by a statistical model. If we have a statistical model of the scene, an intruding object can be detected by spotting the parts of the image that don't fit the model.

However pixel values often have complex distribution and more elaborate models unlike simple density function are needed. Gaussian Mixture Model(GMM) has been proposed for this purpose.(ref. *Zoran Zivkovic| Improved Adaptive Gaussian Mixture Model for Background Subtraction*.).



**Background Subtractor MOG**

It is a Gaussian Mixture-based Background/Foreground Segmentation Algorithm. It was introduced in the paper "An improved adaptive background mixture model for real-time tracking with shadow detection" by P. KadewTraKuPong and R. Bowden in 2001. It uses a method to model each background pixel by a mixture of K Gaussian distributions (K = 3 to 5). The weights of the mixture represent the time proportions that those colours stay in the scene. The probable background colours are the ones which stay longer and more static.

While coding, we need to create a background object using the function, cv2.createBackgroundSubtractorMOG(). It has some optional parameters like length of history, number of gaussian mixtures, threshold etc. It is all set to some default values. Then inside the video loop, use backgroundsubtractor.apply() method to get the foreground mask.

**Adaptive Gaussian Background Subtractor MOG**

It is also a Gaussian Mixture-based Background/Foreground Segmentation Algorithm. It is based on two papers by Z.Zivkovic, "Improved adaptive Gausian mixture model for background subtraction" in 2004 and "Efficient Adaptive Density Estimation per Image Pixel for the Task of Background Subtraction" in 2006. One important feature of this algorithm is that it selects the appropriate number of gaussian distribution for each pixel. (Remember, in last case, we took a K gaussian distributions throughout the algorithm). It provides better adaptibility to varying scenes due illumination changes etc.

As in previous case, we have to create a background subtractor object. Here, you have an option of selecting whether shadow to be detected or not. If detectShadows = True (which is so by default), it detects and marks shadows, but decreases the speed. Shadows will be marked in gray color.




**Background Subtraction using Stastical Model and Bayesian Segmentation**

This algorithm combines statistical background image estimation and per-pixel Bayesian segmentation. It was introduced by Andrew B. Godbehere, Akihiro Matsukawa, Ken Goldberg in their paper "Visual Tracking of Human Visitors under Variable-Lighting Conditions for a Responsive Audio Art Installation" in 2012. As per the paper, the system ran a successful interactive audio art installation called “Are We There Yet?” from March 31 - July 31 2011 at the Contemporary Jewish Museum in San Francisco, California.

It uses first few (120 by default) frames for background modelling. It employs probabilistic foreground segmentation algorithm that identifies possible foreground objects using Bayesian inference. The estimates are adaptive; newer observations are more heavily weighted than old observations to accommodate variable illumination. Several morphological filtering operations like closing and opening are done to remove unwanted noise. You will get a black window during first few frames.

It would be better to apply morphological opening to the result to remove the noises.

# Results

As you can see in the [video](https://drive.google.com/open?id=1vL5SpxeqFaBUuLEpeFHl4Eske-F-L13a)

First we observed the adpater is seen as the new object and classified as background, but after some time when it is not moving it is assumed to be a static object and classified as foreground. Then after some time it is once again moved and it's again classified as intuding foreground. Video can be seen on pressing the link.

The Code can be seen in this [link](https://github.com/stgstg27/Background-Subtraction/blob/master/backgroundsubtraction.py)
# References
1. https://docs.opencv.org/3.3.0/db/d5c/tutorial_py_bg_subtraction.html
2. Image Source - https://blog.kickview.com/background-subtraction/
