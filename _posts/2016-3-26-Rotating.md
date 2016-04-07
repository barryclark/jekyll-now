---
layout: post
title: Rotating convolutions
comments: True
---

Given a typical 3x3 matrix of weights, also known as a kernel, we can rotate/flip it in 8 different ways. So for each rotation of our matrix we can convolve it with the image thus creating rotational invariance.

### Exploiting Cyclic Symmetry in Convolutional Neural Networks

This post is mainly about the work done in this [paper](http://arxiv.org/pdf/1602.02660v1.pdf) by deepmind.

In my opinion, and in hindsight, this idea makes data augmentation (at least rotating) seem quite silly. Reducing the amount of parameters required to learn each rotational orientation of a feature, seems to me, to be a big improvement. The idea of weight tying seems to be particularly powerful and the more you constrain your model the easier it is to learn.

##### Room for improvement

 The rotations can only occur at 45, 90, 135, ... degrees. What about in between? I think the fundamental problem the our representation of the image and kernels. A hxdxw grid in matrix representation is great for convolving across the x,y (and even depth) axes, and for learning to recognise straight or diagonal lines. 

But given the felxibility (depth) of the CNNs used in practice the fact that it is harder to learn to recognise a curved line over a straight one doesnt seem to effect the accuracy of the CNN. (However, I do think there are different representations that may help reduce the parameters required, as it would make learning curves, or other types of features easier.

I see the current approach as: trying to make a representation of a face from only very small straight lines.

### Aggregating convolution outputs

##### Spatial assumptions

So in a more traditional convolutional neural network (one with 2D convolutions over the x and y axes) positional invariance is gained by sliding the same kernel (matrix of weights) over an image (aka convolution) to create a layer of features. 

We then use another convolution on these features to sum them together. So we are making the assumption that features that are close (spatially in x,y) are somehow related/linked. 

The main point is that we have some way of combining spatially distrubuted features.

##### Rotating symmetries?

How does this apply to rotations? How can two premutations be meaningfully combined? As if we cannot, then for each layer we convolve with rotations the process increases its size by a factor of eight.

In the paper, this issue is solved by their operations, pool and stack. 

However, I think we can do better than permutation invariant pooling. I would want to use the symmetries of the dihedral group to allow us to aggregate the generated features based on rotation. 

For example. 

* For each permutation of each kernel do the usual 2D convolution. Thus giving 8 times our spatial feature maps (8xNxdxwxw). 
* Now for the next layer do the same again over each feature map, giving 8x(8xNxdxwxw) = 64xNxdxwxw. 
	* We can easily see that this will get out of hand quickly.
* Now take each of our 64 permutations, which is really the product of two permutations and map it back onto the original rotation space. 
	* We know that two left rotations = two right rotations = a vertical and a horizontal flip.
	* Thus we are now back with 8xNxdxwxw.

What are we really doing if we map back into the dihedral permutation space? So, we would be making the assumption that a feature map produced by two right rotations is somehow in the same space as a feature map produced by a vertical and horizontal flip. This makes sense to me.

