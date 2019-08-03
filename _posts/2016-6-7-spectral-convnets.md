---
layout: post
title: Spectral Convolutional Neural Network
---

![_config.yml]({{ site.baseurl }}/images/SpectralConvnet_1.png)

Implemented Spectral Convolutional Neural Networks. The convolution operation in
spatial domain is quite expensive, so the idea here was to perform convolution
operation in spectral domain. This gave significant speed up in computation and
also in convergence of neural network compared to performing convolution in spatial domain.
SpectralConvnet_1.png

[Code](https://github.com/suhaspillai/SpectralConvoNets)
