---
layout: post
title: RealSense D435i Basical Visual Odometry
usemathjax: true
---

__Visual Odometry is the estimation of the motion of a camera using visual changes across images. This article investigates a basic visual odometry approach used to estimate the trajectory of an Intel RealSense D435i camera.__

While the Intel RealSense D435i camera (RealSense) does come with an IMU, this article has chosen to focus exclusively on visual odometry. The main reason for this is to firstly try an establish how well pure visual odometry performs, before we attempting to use other approaches to suppliment its performance. A second reason is that the the techniques explored in this work can also be applied to other camera systems that produce RGBD images, but don't necessarily have an Inertial Motion Unit (IMU) attached.

In order to be explict the approach that is the focus of this article is as follows:

* Given: The first frame in the sequence as $I_1$. This frame consists of 4 channels as follows: $I_1(p_i) = [r_i, g_i, b_i, d_i]^{\top}$, where pixel $p_i = [u_i, v_i]^{\top}$ is a 2D index that the image function $I_1$ maps color channels to Red, Green, Blue (RGB) and a depth channel $d_i$.
* Given: The second frame in the sequence is $I_2$. This frame consists of 3 channels as folows: $I_2(p_i') = [r_i', g_i', b_i']^{\top}$, where pixel $p_i = [u_i', v_i']^{\top}$ is mapped by function $I_2$ to 3 color channels $[r_i', g_i', b_i']^{\top}$.
* It is assumed that there is only a small amount of motion between $I_1$ and $I_2$, and therefore there is a large area of corresponding points. 
* The goal is to find the pose difference of the RealSense camera between frames, which is assumed to be a rigid motion represented by the $4 \times 4$ matrix $T$ that consists of a rotation component (indicating orientation) and a translation component (indicating position).

Note that in theory both frames will be captured as ``RGBD frames'', however, we are trying to keep this work as general as possible, and assuming that a new frame arrives to the system without a depth estimate expands our work to be applicable to camera systems that are passive systems as well.

## Approach

The goal of this work is to setup a fairly ``standard'' approach to visual odometry, to be used as benchmark. Future work is intended to investigate more advanced machine learning approaches that are expected to make significant performances improvements over the the basic algorithm were developed here.

In terms of the development of a basic odometry algorithm, the most traditional approach that one can implement is a feature point approach. A modern flavour of such an algorithm with start with a Fast Feature Point Detector [(Link)[https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=4674368&casa_token=Q9MohxdeVj8AAAAA:i6aB22wqO7kQPDZxq3YPfRjsK_Q0q3XjMjppok8xRWsaYQSB-lprL1fPuTPM43tZS_BQJ6JN6A&tag=1]]. This detector would detect a set of corner points that would, in theory, be easy to match across images. Matching of images could then be done via optical flow using a sparse pyramidal implementation of the lucas kanade feature tracker [(Link)[https://www.semanticscholar.org/paper/Pyramidal-implementation-of-the-lucas-kanade-Bouguet/aa972b40c0f8e20b07e02d1fd320bc7ebadfdfc7?p2df]].   
