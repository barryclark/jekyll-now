---
layout: project
title: Ball Tracker
date: September 29, 2014
image: tracker.png
---

## Background
Object tracking is a valuable topic in the computer vision world, especially given the billion+ camera-enabled devices in existence today.  While it could be used for a wide variety of applications, the procedure could potentially be relatively similar across the board.  

## Description
Using OpenCV, an image is first converted into grayscale, such that each pixel assumes a value between 0 and 255.  From there, the image can very easily be thresholded to a binary classification, such that pixels below the threshold appear completely black, whereas pixels over the threshold are completely white.  In my studies, I calculated an image moment and derived a center X and Y position based on the centroid.  With this information, a 2 DoF servo-enabled camera was configured to autonomously follow the object, using PI control to stabilize the motion.

Much more could be done from this work, especially in fields of discrete classification of objects using machine learning support vector machines, smooth target tracking using kalman filtering, or image processing for quantitative analysis.  