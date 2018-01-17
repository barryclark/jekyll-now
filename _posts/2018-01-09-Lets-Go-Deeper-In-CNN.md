---
layout: post
title: Day 7-10 Let's go deeper in CNN
permalink: /30ddlf/lets-go-deeper-in-CNN
comment: true
---
#### Project Content &rarr;  *[30 Days Of Deep Learning Fundamentals](/blog/30-days-of-deep-learning-fundamentals/)*
#### Github repo for today &rarr; *[Resnet_cifar10_pytorch](https://github.com/6ixNugget/Resnet_cifar10_pytorch)*

If you've been paying close attention, you probably have noticed that the models we have covered so far are not exactly new. The multilayered perceptron algorithms can be dated back to the late 70s. Alexnet from 2012 essentially marked the beginning of the recent deep learning boom in computer vision, and VGG gave us an answer to how deep a plain CNN can be. And that's all before 2014.

![History Pic](https://s3.us-east-2.amazonaws.com/hosted-downloadable-files/pic.png)
<center>Common models and their performance</center>

So what followed after the year of 2014? Nothing much, but we have gone much deeper (In the arena of new network architectures. Developments in other areas like Faster R-CNN are also worth mentioning, but I'll skip it in this post.)

Alexnet from 2012 had 5 convolutional layers. The network took between 5 to 6 days to train on two GTX 580s. It may sound scary but remember Nvidia only debuted its consumer-level products of Maxwell (namely, GTX 900 series) in late 2014, and that is almost two generation old at the time of writing (Volta is now out on Titan, but still no GeForce yet.) Computational power has exponentially exploded since then. These structures can now be trained on your gaming PC for less than a few hours. In 2014 we also see VGG nets swept ImageNet 2014 competition. They varied in depths but the top performance came out from the VGG-16, which is a 16 layer architecture. 

So how deep are we now? It might make your jaw drop. I still remember when I first took my neural network course in the 3rd year of uni (late 2015), the prof showed us a picture of the structure of GoogleNet. It was a whopping 22 layer network and the entire class was stunned by how deep it was. But take a look at what we have now. We have the four versions of Inception on one hand (Inception v1 is GoogleNet), with depths varying from several tens of convolutional layers. And then we have the monstrous 152 layer Resnet-152 on the other hand. Oh, how wonderful life is.

![Resnet pic](https://s3.us-east-2.amazonaws.com/hosted-downloadable-files/Screen+Shot+2018-01-17+at+3.37.14+PM.png)
<center>Blocks used in ResNet</center>
<center>Left, a "building block" for ResNet-34 </center>
<center>Right, a "bottleneck block" for ResNet-50/101/152 </center>

After digging around a little bit, I decided to code up the Resnet architecture and see how good it performs on CIFAR-10/100 datasets. I'll write a bit in Q&A about Inceptions, and its comparison with ResNets.

## Day 7

#### Focus of the day: Set up base code for cifar10 in pytorch
#### Tasks done
1. Study the difference between pytorch and tensorflow
2. Code up the base training code for CIFAR10/100

#### Q & A: 
1. What is the difference between Pytorch and TensorFlow?

    The single most important difference is that Pytorch uses automatic differentiation while TensorFlow uses static computational graph (SCG). That means, in TensorFlow, you first define everything before you run the data through the graph. The pros of SCG are that it's much easier to optimize. You can do tricks on a much lower level like preallocating resources and precompiling models. The cons are pretty obvious too: You practically can't debug. It's extremely cumbersome to debug in an SCG setting as the data is not there yet and you have no idea what could go wrong at runtime.

    Pytorch on the other hand, lets you debug like a breeze. Even if you don't use an IDE or debugger, simply printing out the stack would probably help you catch any tiny bug you have written. Autograd is another mechanism that separate Pytorch and TensorFlow. Autograd is a define-by-run framework that's used as the core of Pytorch differentiation logics. The backprop steps are defined by how the code is run, which means that every single iteration can be different, and you can change the model mid training. 

    I may sound biased on this topic as a short answer won't be able to cover all the pros and cons that these two frameworks have. I'd recommend an ML learner to use Pytorch simply because how easy it is to set up and get started. It's also much easier to test out new models in Pytorch. TensorFlow is a production-ready framework that provides important features like distributed training and mobile device support. If you are not a learner, you may want to dig deeper and decides which to go for based on your use cases.

2. What is Batch Normalization?

    [Batch Normalization Original Paper](https://arxiv.org/abs/1502.03167)

    BatchNorm is a method of input normalization, refer to my last blog for what that means. It's a technique to make the data inputs to any layer in a network "zero mean and unit variance". The similar concept appears in data preprocessing and augmentation too.

    So why is "zero mean and unit variance" a good thing? By having a fixed distribution of input data, we effectively eliminate the problem of forcing the layers to continuously adapt to new distribution during training. When the distribution to a specific layer changes, it could slow down the training by requiring lower learning rates and saturating non-linearities.

    In short, BatchNorm enables faster training and potentially improve the performance of a model.

    I decided to test it out, and the results are exactly like what the paper claimed. 

    ![Loss](https://s3.us-east-2.amazonaws.com/hosted-downloadable-files/Screen+Shot+2018-01-13+at+5.54.50+PM.png)
    <center><span style="font-family: 'Bebas Neue'; font-size: 0.8em;">Orange line: ResNet-18</span></center>
    <center><span style="font-family: 'Bebas Neue'; font-size: 0.8em;">Grey line: ResNet-18 without BatchNorm</span></center>

    ![Top1 Performance](https://s3.us-east-2.amazonaws.com/hosted-downloadable-files/Screen+Shot+2018-01-17+at+3.56.41+PM.png)
    <center><span style="font-family: 'Bebas Neue'; font-size: 0.8em;">Red line: With BN top1 performance</span></center>
    <center><span style="font-family: 'Bebas Neue'; font-size: 0.8em;">Orange line: Without BN top1 performance</span></center>

    Here's the step-by-step list of operations of how you do a BatchNorm. 
    <div style="text-align:center"><img src="https://cdn-images-1.medium.com/max/1600/1*Uxf8JXeE9u0mrl4f5QAr5Q.png"/></div>

    It may be really confusing if you are looking at the list for the first time. The original paper has given some intuition behind it, but if you still find it hard to comprehend, I recommend the [video lectures from Andrew's course on Coursera](https://www.coursera.org/learn/deep-neural-network/lecture/4ptp2/normalizing-activations-in-a-network).

3. Batch Norm vs Dropout?

    Simply put, when using the dropout technique, you intentionally ignore a **random** selected set of neurons during a certain iteration of training process. At each iteration of training, each node is either dropped or preserved with a pre-set possibility of P (usually a number somewhat around 0.5, which means a 50% dropout rate.)

    Dropout is a training regularizer, it prevents overfitting and regularizes the network.
    Batch Norm is an input normalizer, it's mostly about improving optimization and "stabilize" the network. 
    Usually, overfitting won't be a *huge* problem if you have a large enough dataset. Then optimization has a higher priority in this kind of scenarios. But when you have a relatively small dataset or overly complicated network, you will have a higher risk of overfitting the model. Then it won't matter how faster or well you train (which is improved by using optimizing techniques), the performance of your model will be capped by overfitting.

    Although BatchNorm is an input normalizer, in practice, people often find it also helps regularize the training as well. You can safely reduce the strength of the dropout in your network or even remove it when you are using BN. If you still find overfitting behaviour in training, try to increase the strength of your regularizers and it would help.

## Day 8-9

#### Focus of the day: Code up the ResNet models
#### Tasks done
1. Code up the ResNet models
2. Case study: Residual network vs Inception network

#### Q & A: 
1. What's inception network.
2. What's the difference between each version of Inception?
3. How does Inception differ from resnet?

## Day 10

#### Focus of the day: Adjust the hyperparameters and test model performances
#### Tasks done
1. Try different sets of hyperparameters and depths of models, record the performances

#### Q & A: 
1. What is data augmentation and preprocessing and is it helpful?
2. What's training regularization and why does it work?
3. What are deep ConvNets learning?