---
layout: post
title: The N-D conv net
---

Following on from my previous post on convolving over rotations (in the z axis), I want to expand on the idea of adding other dimensions to convolve.

# Feature invariance in new dimensions

The motivation for this is; if we can make our features invariant to more irrelevant variables then we can learn faster, or from less data (as there are less parameters). 

A face is still a face, regardless of its size, position, rotation, position, colour, if half of it is occluded, 

### Position (x,y)

It is common practice to convolve over the two spatial dimensions of an image. The motivation being that the location of a feature in an image (e.g. face) does not effect whether or not it is that feature. 

A car is still a car if it is shyly in the bottom corner of the image and if it is proudly in the middle.

### Rotation (z)

The idea of convolving over rotations is what inspired this line of thought. And it makes a lot of sense to me. 

A cat is still a cat, regardless of whether it is upside down, or sideways...

For more information see;

* this deepmind [paper](http://arxiv.org/pdf/1602.02660.pdf) on Exploiting Cyclic Symmetry in Convolutional Neural Networks
* this [paper](http://arxiv.org/abs/1602.07576) by Max Wellings ML group on Group Equivariant Convolutional Networks

### Scale (z)

Scale invariance would be a nice feature of a conv net.

So to make a feature of a different scale we would need to interpolate or remove weights from our kernels. Given the current architecture of conv net this could get quite messy. Especially if we are also convolving over multiple other dimensions.

An algorithm to do this could be: 
Take kernel, K, of size 3x3 and map it onto a 6x6 weight space. Use the values of K and interpolate between them to fill in the new, larger kernel. 


### Occlusion

Partial features? Would it be effective to block a part of the inputs to some kernels? In a way this is like dropout? Where we are dropping some weights between every convolution. But really we would be doing it in a more systematic way, and pooling the results based on the original permutation.

So a set of permutation operations could be occluding half, a quarter, a diagonal, ???

### Depth (Colour invariance)

What would be a reason to keep the colours separated or to integrate them?

* Do we want to detect colour specific features? Yes.
* Does merging them effect the nets ability to do this? Kind of, the network could still learn features, but it may take longer?

Keeping them seperate for the first layer will mean that we would have edge, hot spot, gradient, ... detectors specific to each colour. The net would not have to learn these.

*****

Other dimensions to consider;

* Depth (z), in the first layer this would be colour but after it becomes a little unclear.
* Rotations in x and y


# Trade-off

Fundamentally, there is a trade off between the computations required for each convolution and the nets invariance to irrelevant variables.

Which approach is better?  

N-D conv would test every possible orientation of a feature, whereas vanilla CNNs learn only orientations of features that are relevant. So although a vanilla CNN may have to learn the same feature multipule different times in slightly different orientations, it doesnt have to learn every orientation of a feature. Thus saving computations on the forward pass of an image.

But, having more convolutions would mean we would need less parameters, as each kernerl represents more features. Thus less space would be required and we could train the net faster. 

# Issues, questions and thoughts

* How does having less parameters relate to optimisation in the sense of convexity? Does it make it closer or more tractable?
* Could we design an attention system to predict which convolutions are relevant?
* Having a 7D tensor for each image poses its own problems...