---
layout: post
title: Prediction the value of a convolution
---

Following on from the posts exploring more dimensions to convolve in CNNs. I wonder if it is reasonable to use a net to learn to select which dimensions should be convolved.

To solve the problem that a N-D net would need more computations than the standard (2D conv) CNN, at least in forward propagation. I think a good solution would be to let the conv net learn which convolutions are important given the image and a kernel.


### Value estimation

I would want a network to learn to look at an input image , and the kernel to be convolvedm, and estimate the value, in relation to ???, of doing a convolution in certain dimensions. 

### Probable convolutions

We could also use statistics from???


*****

So, we will choose which convolution to do depending on, each convolutions expected value (towards accuracy), how probable it is we should do this (stats on similar images?) and ??? some factor of training resources, time, space, error, data remaining, ...

# Notes


No point convolving over a feature that is already symmetric in that dimension. E.g. rotating a circle, … 

And there is no point convolving over a feature that never never vases in that dimension. E.g. a person standing. As … seperate feature?


### Questions, thoughts and notes

* Largely inspired by game playing tree search algorithms, like AlphaGO or Giraffe (just two papers I happen to have read).