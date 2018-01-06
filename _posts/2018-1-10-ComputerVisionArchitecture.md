---
layout: post
title: Test Mathematic Equations
---
##GENERAL INTRODUCTION OF DEEP LEARNING ARCHITECTURE FOR COMPUTER VISION IN OTONHANH.VN
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nowadays, Deep Learning become more and more popular in many domains like Finance, 
E-Commerce. At OtoNhanh.vn, we employ Deep Learning to tackle the problems of Natural Language Processing to deal with 
the requests of the user in our site or of Computer Vision in the illustration of cars. In this blog, we will focus on 
the network architecture that we consider to use in our Computer Vision application.  

###I. Convolutional Neural Network (ConvNet)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The heart of Deep Learning in Computer Vision is ConvNet, a sub-division of Neural
Network designed specifically to cope with the images. Regular Neural Network is made of fully-connected layers: each 
unit from one layer have the access to every units from the previous layer, which leads to the explosion in the number 
of parameters of the network. For example, if we have a RGB image whose size is 200x200 as an input, each neuron in the 
first hidden layer will have 200x200x3 = 120000 weights to compute the output. This redundancy of the parameters is 
really a catastrophe for the training procedure: it doesn't help to generalize the problems well and conduct the slow 
convergence due to the large amount of the parameters.  
In this context, Yann LeCunn developped a biologically-inspired neural network called ConvNet. ConvNet comprises 3 main 
types of layer: Convolutional Layer, Pooling Layer and Fully Connected Layer.  
> A ConvNet is made up of Layers. Every layer has a simple API: It transforms an input 3D volume to an output 3D Volume
with some differentiable function that may or may not have parameters.  
>

#####Convolutional Layer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It plays the roles of feature detector in ConvNet. In more detailed, it computes the 
dot product of 3-D kernel with local region from input image. This sliding-window method can be considered as 
convolution operation, this is the origin of its name. Each kernel will detect a same feature in every region of the 
image and send it to the higher layer to construct more delicate feature detector. After the convolution, we prefer to 
apply some sorts of activation function like ReLU or tanh... to adapt to the non-linearity  

#####Pooling Layer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The most two popular pooling operation is average pooling and max pooling. This 
layer is used to achieve the invariance during the training. It means that if we modify the input a little bit, it won't
affect the overall result much. This invariance is very important in the task of classification as we may capture the 
same object but from the different pose or it may have capture the noise as well.  
However, the way it achieve the invariance by losing the information raises a lot of arguments in the Deep Learning 
community. Recently, G.Hinton, a "god father" in this domain, has public his research about Capsule Net, a way to 
achieve the pose invariance without using pooling  

#####Fully-Connected Layer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At the end of ConvNet, we always put this layer, accompanied by a softmax loss 
function in case of multi-classification. It will measure the score for each label so that we could choose the label for 
the input image.  

Generally speaking, Convolutional Layer, Pooling Layer and Fully-Connected Layer are the principal components of ConvNet 
in the image classification task. To make use these layers at its best, the researchers in Deep Learning community try 
try to contruct different network architectures. One of the most popular benchmark is the ImageNet challenge. In the 
next part, we will focus on the architectures that we have implemented in our business.  

###II. Network Architectures
#####1. AlexNet  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is developped by _Alex Krizhevsky and al._. It was submitted to the ImageNet 
Challenge in 2012 and really made an echo in Deep Learning society by its superiority in the contest. In fact, it is 
pretty similar to the famous LeNet but bigger and deeper.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Furthermore, it introduced local response normalization to improve the performance 
and some techniques like data augmentation or dropout to enhance the generalization. Also, it provides us an
implementation technique to carry out the training in limited hardware.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Detail of AlexNet architecture used in ImageNet Challenge:  
- There are 8 main layers in AlexNet: the first five layer are Convolutional Layer and their dependencies. The remaining 
three layers are the fully-connected layer. The outputs of the last fully-connected layer are brought to 1000-way 
soft-max classifier.
- The kernel of the second, fourth and fifth convolutional layer are connected to the kernel from the previous layer. 
Local response normalization follow only the first two convolutional layer. Max pooling operation follows both 
normalization layer and the fifth convolution layer. ReLU non-linearity is applied to every output of convolutional 
layer and fully connected layer.
![](https://www.researchgate.net/profile/Walid_Aly/publication/312188377/figure/fig4/AS:448996423540740@1484060497977/Figure-7-An-illustration-of-the-architecture-of-AlexNet-CNN-14.ppm)  
*AlexNet Illustration*  

- One thing to notice: The above architecture is suitable for ImageNet whose sizes are large, for other datasets like 
MNIST or CIFAR10, we have to reduce some layers to avoid Vanish Gradient.  
 
#####2. VGG-Net  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This architecture is, from my point of view, a deeper version of AlexNet. Its main 
contribution is that a better performance of the network can be achieved by simply increasing its layers for more 
sophisticated representation. Its detailed architecture can be found in the paper [Very deep convolutional networks for 
large-scale image recognition](https://arxiv.org/pdf/1409.1556.pdf).  

#####3. ResNet
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unlike the last architectures when they simply increase the depth of the network to 
enhance the performance, this time, _Kaiming He and al_ have done something new to improve the classification. After 
VGGNet, Deep Learning community has the impression that a deeper network will definitely bring us to a better 
performance. Nevertheless, Kaiming He discovered that it is only true to some extent, after that the error rate may be 
up. This fact is against our intuition: A deeper architecture must have a more representational power or at least have 
a same performance with the shallow one in case the added layers are identity mappings. Based on that observation, he 
wondered that instead of mapping the function $$f(x)$$, it may be easier to map the residual function _h(x) = f(x) - I_ 
(in which I is the identity mapping). After obtaining the approximation $$\hat{h}$$, we could easily add I back to get the 
representation $$\hat{f}$$ of the underlying function $$f(x)$$.  
![](https://cdn-images-1.medium.com/max/1600/1*pUyst_ciesOz_LUg0HocYg.png)  
*Residual Block*  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To be more precise, in the original paper, the authors indicated that it exists the 
degradation in performance when we deepen the network. Overfitting is not the cause since the training error is also 
higher in case of deeper network.   
![Error rate between the 20-layer network and 56-layer network](https://wiki.tum.de/download/attachments/22578294/Figure%201.bmp?version=1&modificationDate=1485208088253&api=v2)  
*Error rate between the 20-layer network and 56-layer network*  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kaiming He had an impression that the neural networks have difficulties in mapping 
the identity function. With residual blocks, when identity mapping is sufficient, the neural networks may drive the 
weights of theirs layers towards zero so as to approach the identity mappings.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In practice, it is rare that identity mappings are optimal but arcording to the 
authors:  
>... our reformulation may help to precondition the problem. If the optimal function is closer to an identity mapping 
than to a zero mapping, it should be easier for the solver to find the perturbations with reference to an identity 
mapping, than to learn the function as a new one
>  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Based on our experience, ResNet is still one of the most powerful Deep Learning 
architecture in term of error rate and efficiency computation.  

#####4. DenseNet  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DenseNet is the latest Deep Learning architecture published by _Gao Huang and al._. 
From their point of view, the degradation in error rate when the network become deeper comes from the fact that the 
information from input vanishes while passing the layers. So we consider that the shortcut in the residual blocks from 
ResNet is one way to  maintain the information from the input till the end of the network.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The authors of DenseNet pushed the idea of ResNet to its limit. They divide DenseNet 
into the dense blocks



