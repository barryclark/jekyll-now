---
layout: post
title: Day 3-6 Intro Level CNN
permalink: /30ddlf/intro-level-CNN
comment: true
---
#### Project Content &rarr;  *[30 Days Of Deep Learning Fundamentals](/blog/30-days-of-deep-learning-fundamentals/)*
#### Github repo for today &rarr; *[CIFAR10 with Alexnet and VGG](https://github.com/6ixNugget/CIFAR10-with-Alexnet-and-VGG)*
## Day 3

#### Focus of the day: Set up base code for cifar10
[The CIFAR-10 and CIFAR-100 dataset](https://www.cs.toronto.edu/~kriz/cifar.html) are labelled subsets of the [Tiny Images Dataset](http://groups.csail.mit.edu/vision/TinyImages/). They were collected by three UofT fellows Alex Krizhevsky, Vinod Nair, and Geoffrey Hinton. 

#### Tasks done
1. Set up base training code for CIFAR10
2. Study the [tensorflow example](https://www.tensorflow.org/tutorials/deep_cnn) of building a CNN and training it on multiple GPU cards.
3. Study [the Alexnet paper](https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf)

#### Q & A: 
1. What is parallelism in Machine Learning? How does training on multiple GPUs work?

    After digging a bit I found this is too broad a question. There is an entire department of science and engineering behind the parallelism used in Machine Learning and related fields. Here's [an article](https://www.kdnuggets.com/2016/11/parallelism-machine-learning-gpu-cuda-threading.html) from KDNugget touching breifly on this topic. It is worth noting that some commonly used libraries, like CUDA and OpenCL, are examples of parallel computing platforms.

2. What role does input normalization play?

    Normalization is useful to prevent neurons from saturating when inputs may have varying scale, and to aid generalization. Training a deep neural network is often complicated by the fact that distributions of each layer's input or each datapoint changes during training. This forces to use smaller learning rates and careful parameter initialization and consequently slows down the learning process. Oftentimes, by fixing the distribution of inputs to a network would have positive consequences such as accelerating learning and better generalization results.

3. What is saturating nonlinearity?

    Here's a nice post on [What does the term saturating nonlinearities mean?](https://stats.stackexchange.com/questions/174295/what-does-the-term-saturating-nonlinearities-mean)

    You might have heard of ReLU, or rectified linear unit, being a non-saturating non-linear activation function.  
    Examples of other commonly seen saturating (smooth, everywhere differentiable) nonlinearities are sigmoid, tanh and elu.

4. Why does relu not require input normalization?

    To clearify the question, in 3.3 of [the Alexnet paper](https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf), it says
    > "ReLUs have the desirable property that they do not require input normalization to prevent them from saturating."

    Why is that?  

    Because of the property of non-saturating. Saturating nonlinearity "squashes" the real number range into a smaller subset of it. For example, tanh to [-1, 1] and sigmoid to [0, 1]. The gradient on these saturating functions, when |x| increases, tends to zero. This means that for all dimensions of x, except for those with small absolute values, the gradient will flow down and vanish, and the model will train extremely slowly or even stop training in some cases.

    Non-saturating nonlinearity such as ReLU, is not constrained by this gradient vanishing problem.  
    Unfortunately, Relu has its own problem. It can be fragile during training and can “die”. For example, a large gradient flowing through a ReLU neuron could cause the weights to update in such a way that the neuron will never activate on any datapoint again. If this happens, then the gradient flowing through the unit will forever be zero from that point on. 

## Day 4
#### Focus of the day: Build a model similar to Alexnet on cifar10

#### Tasks done
1. Build up an Alexnet like model for cifar10

#### Q&A
1. What does Local Responce Normalization do?
2. How does a dying ReLU look like?
3. Is there any universal solution to the dying ReLU problem? If there is, why didn't people start using it yet?
4. What is learning rate schedule and how important is it?

## Day 5
#### Focus of the day: Train the Alexnet-like model and build a model similar to VGG on cifar10

#### Tasks done
1. Train the Alexnet like model
2. Build up an VGG like model for cifar10

#### Q&A
1. Moving averages, what's the deal?
2. What's the connection between consecutive convolutional layers and the filter sizes?
## Day 6

#### Focus of the day: Train the models and play with the hyperparameters

#### Tasks done
1. Train the VGG like model

#### Q&A
1. In what way does the metrics of sparsity aid learning process?
