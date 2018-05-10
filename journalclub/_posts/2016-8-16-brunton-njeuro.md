---
layout: post
title: Extracting spatial temporal coherent patterns in large scale neural recordings using dynamic mode decomposition, J Neurosci Methods (2016)
category: journalclub
olddate: August 23, 2016
---

* [Paper](http://www.sciencedirect.com/science/article/pii/S0165027015003829) Bingni W. Brunton ,Lise A. Johnson, Jeffrey G. Ojemann , J. Nathan Kutz, Extracting spatial-temporal coherent patterns in large-scale neural recordings using dynamic mode decomposition, J. Neurosci Methods 258 (2016), 1-15

* Abstract

 There is a broad need in neuroscience to understand and visualize large-scale recordings of neural activity, big data acquired by tens or hundreds of electrodes recording dynamic brain activity over minutes to hours. Such datasets are characterized by coherent patterns across both space and time, yet existing computational methods are typically restricted to analysis either in space or in time separately. 

* New method 

Here we report the adaptation of dynamic mode decomposition (DMD), an algorithm originally developed for studying fluid physics, to large-scale neural recordings. DMD is a modal decomposition algorithm that describes high-dimensional dynamic data using coupled spatial–temporal modes. The algorithm is robust to variations in noise and subsampling rate; it scales easily to very large numbers of simultaneously acquired measurements. 

* Results 

We first validate the DMD approach on sub-dural electrode array recordings from human subjects performing a known motor task. Next, we combine DMD with unsupervised clustering, developing a novel method to extract spindle networks during sleep. We uncovered several distinct sleep spindle networks identifiable by their stereotypical cortical distribution patterns, frequency, and duration. 

* Comparison with existing methods 

DMD is closely related to principal components analysis (PCA) and discrete Fourier transform (DFT). We may think of DMD as a rotation of the low-dimensional PCA space such that each basis vector has coherent dynamics. 

* Conclusions 

The resulting analysis combines key features of performing PCA in space and power spectral analysis in time, making it particularly suitable for analyzing large-scale neural recordings.