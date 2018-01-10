---
layout: post
title: General introduction of deep learning architecture for Computer Vision in OtoNhanh.vn
author: hoangbm
---
Nowadays, Deep Learning become more and more popular in many domains like Finance, 
E-Commerce. At [OtoNhanh.vn](https://otonhanh.vn), we employ Deep Learning to tackle the problems of Natural Language Processing to deal with 
the requests of the user in our site or of Computer Vision in the illustration of cars. In this blog, we will focus on 
the network architecture that we consider to use in our Computer Vision application.  

# I. Convolutional Neural Network (ConvNet)  
The heart of Deep Learning in Computer Vision is ConvNet, a sub-division of Neural
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

<p align="center">
 <img src="/images/Introduction_CNN/cnn.jpeg" alt="" align="middle">
 <div align="center">In each layer of ConvNet, it transform a 3-D input block to 3-D output block. <a href="http://cs231n.github.io/assets/cnn/cnn.jpeg">Source</a></div>
</p>  


##### Convolutional Layer  
It plays the roles of feature detector in ConvNet. In more detailed, it computes the 
dot product of 3-D kernel with local region from input image. This sliding-window method can be considered as 
convolution operation, this is the origin of its name. Each kernel will detect a same feature in every region of the 
image and send it to the higher layer to construct more delicate feature detector. After the convolution, we prefer to 
apply some sorts of activation function like ReLU or tanh... to adapt to the non-linearity  

<p align="center">
 <img src="/images/Introduction_CNN/conv-layer.gif" alt="" align="middle">
 <div align="center">Illustration of convolution operation. <a href="http://cs231n.github.io/convolutional-networks/">Source</a></div>
</p> 

##### Pooling Layer  
The most two popular pooling operation is average pooling and max pooling. This 
layer is used to achieve the invariance during the training. It means that if we modify the input a little bit, it won't
affect the overall result much. This invariance is very important in the task of classification as we may capture the 
same object but from the different pose or it may have capture the noise as well.  
However, the way it achieve the invariance by losing the information raises a lot of arguments in the Deep Learning 
community. Recently, G.Hinton, a "god father" in this domain, has public his research about Capsule Net, a way to 
achieve the pose invariance without using pooling.  

<p align="center">
 <img src="/images/Introduction_CNN/maxpool.jpeg" alt="" align="middle">
 <div align="center">Maxpool operation <a href="http://cs231n.github.io/assets/cnn/maxpool.jpeg">Source</a></div>
</p>    

##### Fully-Connected Layer  
At the end of ConvNet, we always put this layer, accompanied by a softmax loss 
function in case of multi-classification. It will measure the score for each label so that we could choose the label for 
the input image.  

<p align="center">
 <img src="/images/Introduction_CNN/neural_net2.jpeg" alt="" align="middle">
 <div align="center">Fully-Connected Layer in Regular Neural Network <a href="http://cs231n.github.io/assets/nn1/neural_net2.jpeg">Source</a></div>
</p>  

Generally speaking, Convolutional Layer, Pooling Layer and Fully-Connected Layer are 
the principal components of ConvNet in the image classification task. To make use these layers at its best, the 
researchers in Deep Learning community try to contruct different network architectures. The arrival of ConvNet has 
changed the fundamental tasks of Computer Vision from *feature enfineering* to *network engineering* to find the best 
representation for the classification. One of the most popular benchmark is the ImageNet challenge. In the next part, 
we will focus on the architectures that we have implemented in our business.  

# II. Network Architectures
### 1. AlexNet  
It is developped by _Alex Krizhevsky and al._. It was submitted to the ImageNet 
Challenge in 2012 and really made an echo in Deep Learning society by its superiority in the contest. In fact, it is 
pretty similar to the famous LeNet but bigger and deeper.  

Furthermore, it introduced local response normalization to improve the performance 
and some techniques like data augmentation or dropout to enhance the generalization. Also, it provides us an
implementation technique to carry out the training in limited hardware.  

Detail of AlexNet architecture used in ImageNet Challenge:  
- There are 8 main layers in AlexNet: the first five layer are Convolutional Layer and their dependencies. The remaining 
three layers are the fully-connected layer. The outputs of the last fully-connected layer are brought to 1000-way 
soft-max classifier.
- The kernel of the second, fourth and fifth convolutional layer are connected to the kernel from the previous layer. 
Local response normalization follow only the first two convolutional layer. Max pooling operation follows both 
normalization layer and the fifth convolution layer. ReLU non-linearity is applied to every output of convolutional 
layer and fully connected layer.  

<p align="center">
 <img src="/images/Introduction_CNN/Figure-7-An-illustration-of-the-architecture-of-AlexNet-CNN-14.ppm" alt="" align="middle">
 <div align="center">AlexNet Architecture<a href="https://www.researchgate.net/profile/Walid_Aly/publication/312188377/figure/fig4/AS:448996423540740@1484060497977/Figure-7-An-illustration-of-the-architecture-of-AlexNet-CNN-14.ppm"> Source</a></div>
</p>  
 

- One thing to notice: The above architecture is suitable for ImageNet whose sizes are large, for other datasets like 
MNIST or CIFAR10, we have to reduce some layers to avoid Vanish Gradient.  
 
### 2. VGG-Net  
This architecture is, from my point of view, a deeper version of AlexNet. Its main 
contribution is that a better performance of the network can be achieved by simply increasing its layers for more 
sophisticated representation.  

<p align="center">
 <img src="/images/Introduction_CNN/vgg16.png" alt="" align="middle">
 <div align="center">VGG-Net Architecture <a href="https://www.cs.toronto.edu/~frossard/post/vgg16/vgg16.png"> Source</a></div>
</p>

Its detailed architecture can be found in the paper [Very deep convolutional networks for 
large-scale image recognition](https://arxiv.org/pdf/1409.1556.pdf).  

### 3. Inception
Along with VGGNet, Inception is also a contestant in the 2014 ILSVRC who gained much 
attention from the community. While VGGNet give us a simple way to reinforce the result by stacking more layers, 
Inception gives us many new notions which, in my opinion, inspires many successors. Inception architecture sticks to a 
very famous meme in the internet:  

<p align="center">
 <img src="/images/Introduction_CNN/a88.jpg" alt="" align="middle">
</p>


There are two papers about this architecture that worth noticing:  
[Going Deeper with Convolutions](https://static.googleusercontent.com/media/research.google.com/vi//pubs/archive/43022.pdf)  
[Rethinking the Inception Architecture for Computer Vision](https://static.googleusercontent.com/media/research.google.com/vi//pubs/archive/44903.pdf)  

Personally, I recommend you to take time with the second paper, it gives us some insights about Inception. Now I may 
summarize the idea of the paper:  
##### General Design Principles:
- **Avoid representational bottlenecks**: We shouldn't reduce the size as well as the dimension of the input to abruptly, 
especially in the first layers. The representation size ought to be shrinked mildly thoughout the network in order to 
avoid the loss of information.  
- **Higher dimensional representations are easier to process**: Adding more filters per tile is encouraged for the 
purpose of faster training.  
- **Spatial aggregation can be done over lower dimensional embeddings without much or any loss in representational power**.  
Considering adjacent layers are highly correlated, it results in much less loss of information during dimension 
reduction. So why not reducing the dimension for a faster learning?
- **Balance the width and depth of the network**: We should increase both the depth of the network and the number of 
filters per stage for the optimal improvement.  

##### Factorizing Convolution:
In my own experience, before reading this paper, I had always had an impression that a larger filter size will lead to 
a faster training due to the fact that larger filter size make smaller feature maps. However, it turns out that instead 
of using a large filter, we should factorize it into smaller filter layers. For instance, a two 3x3 layer is more 
preferable than a 5x5 filter.  

<p align="center">
 <img src="/images/Introduction_CNN/rethinking-inception-fig-1.jpeg" alt="" align="middle">
 <div align="center">Factorzing 5x5 filter into two 3x3 filters <a href="https://adriancolyer.files.wordpress.com/2017/03/rethinking-inception-fig-1.jpeg?w=480"> Source</a></div>
</p>


Furthermore, althought it seem logical when we don't introduce ReLU layer between the two small convolutional layer to 
simulate the large layer at its best, the author advised us to employ the ReLU layer after each convolution.  

##### Auxiliary Classifiers:  
Inception also introduce a new concept of auxiliary classifiers. We add some classifiers at the intermediate layers: 
Their loss is added to the total loss with a specific weights. In the inference, these classifiers are discarded. They 
act as the regularizer and also a way to combat vanishing gradient. However, it is proved that their contribution is 
quite limited, and in most case, just a secondary classifier is sufficient.  
<p align="center">
 <img src="/images/Introduction_CNN/ijfis-17-026f7.gif" alt="" align="middle">
 <div align="center">Concept of auxiliary classifier <a href="http://www.e-sciencecentral.org/upload/ijfis/thumb/ijfis-17-026f7.gif"> Source</a></div>
</p>
 

##### Grid Size Reduction:
Traditionally, to reduce the size of the feature map, we use pooling operator before entering a module, which is 
contrast to the principle of avoiding representational bottlenecks. We may reverse the order by executing the module 
first and then applying the pooling, however, it is computationally expensive.  

<p align="center">
 <img src="/images/Introduction_CNN/12.png" alt="" align="middle">
 <div align="center">The left block violates the design principle, 
 while the right one is computationally expensive <a href="https://raw.githubusercontent.com/stdcoutzyx/Blogs/master/blogs2016/imgs_inception/12.png"> Source</a></div>
</p>

The author proposed to use concatenation as a way to bypass the bottleneck but still reduce the size:  


##### Inception Architecture:  
<p align="center">
 <img src="/images/Introduction_CNN/googlenet_diagram.png" alt="" align="middle">
 <div align="center"> <a href="http://joelouismarino.github.io/images/blog_images/blog_googlenet_keras/googlenet_diagram.png"> Source</a></div>
</p>


Its core element is Inception module. In this module, we use different filter size to the same input and combine the 
feature map using concatenation. In the module, we also implement some above tricks to improve the trainign process.  
<p align="center">
 <img src="/images/Introduction_CNN/inception.jpg" alt="" align="middle">
 <div align="center">Inception block <a href="https://cpmajgaard.com/blog/assets/images/parking/inception.jpg"> Source</a></div>
</p>


Basically, it is the concept of Inception architecture that we want to introduce. In the paper, they also talk about 
a regularization technique called *Label Smoothing*, but it is out of scope of this article.  



### 4. ResNet
Unlike the last architectures when they simply increase the depth of the network to 
enhance the performance, this time, _Kaiming He and al_ have done something ground-breaking to improve the 
classification. It really make a way for us to train hyper deep network with compelling performance. After VGGNet, Deep 
Learning community has the impression that a deeper network will definitely bring us to a better 
performance. Nevertheless, Kaiming He discovered that it is only true to some extent, after that the error rate may be 
up. This fact is against our intuition: A deeper architecture must have a more representational power or at least have 
a same performance with the shallow one in case the added layers are identity mappings. Based on that observation, he 
wondered that instead of mapping the function $$f(x)$$, it may be easier to map the residual function _h(x) = f(x) - I_ 
(in which I is the identity mapping). After obtaining the approximation $$\hat{h}$$, we could easily add I back to get the 
representation $$\hat{f}$$ of the underlying function $$f(x)$$.  

<p align="center">
 <img src="/images/Introduction_CNN/1_pUyst_ciesOz_LUg0HocYg.png" alt="" align="middle">
 <div align="center">Residual Block <a href="https://cdn-images-1.medium.com/max/1600/1*pUyst_ciesOz_LUg0HocYg.png"> Source</a></div>
</p>  

To be more precise, in the original paper, the authors indicated that it exists the 
degradation in performance when we deepen the network. Overfitting is not the cause since the training error is also 
higher in case of deeper network.   

<p align="center">
 <img src="/images/Introduction_CNN/Figure 1.bmp" alt="" align="middle">
 <div align="center">Error rate between the 20-layer network and 56-layer network 
 <a href="https://wiki.tum.de/download/attachments/22578294/Figure%201.bmp?version=1&modificationDate=1485208088253&api=v2"> Source</a></div>
</p> 


Kaiming He had an impression that the neural networks have difficulties in mapping 
the identity function. With residual blocks, when identity mapping is sufficient, the neural networks may drive the 
weights of theirs layers towards zero so as to approach the identity mappings.  

In practice, it is rare that identity mappings are optimal but arcording to the 
authors:  
>... our reformulation may help to precondition the problem. If the optimal function is closer to an identity mapping 
than to a zero mapping, it should be easier for the solver to find the perturbations with reference to an identity 
mapping, than to learn the function as a new one  


Based on our experience, ResNet is still one of the most powerful Deep Learning 
architecture in term of error rate and efficiency computation.  


### 5. ResNeXt  
As ResNet performance in 2015 ILSVRC blewed people's mind, its architecture is getting studied heavily 
and some refinements have been made in the architecture. ResNeXt is one of them.  
Its core element is called ResNext building block:  

<p align="center">
 <img src="/images/Introduction_CNN/1_7JzJ1RGh1Y4VoG1M4dseTw.png" alt="" align="middle">
 <div align="center"> Comparison between ResNet block and ResNeXt block
 <a href="http://img.blog.csdn.net/20170614224816128"> Source</a></div>
</p>

As you can see, ResNext building block is a fusion of residual block and Inception block. ResNeXt resembles Inception 
that input will go though several convolution path, the outputs of these path are merged by the addition, unlike the 
concatenation in Inception. Before leaving the block, it will be added with the input like the ResNet in order to 
produce the overall output of the block. All the path in the ResNeXt block share the same *topology*, which help to 
simplify the hyper-parameters tuning.  
>The transformations to be aggregated are all of the same topology. This design allows us to extend to any large number 
of transformations without specialized design.  

The authors argue that this architecture is more easily tuned than its predecessors since it has a simple paradigm and 
only one hyper-parameter to be adjusted. They also state that modifying the cardinality is more effective than modifying 
width/depth of the network.  
More details about the implementation can be found in the paper [Aggregated Residual Transformations for Deep Neural 
Networks](https://arxiv.org/pdf/1611.05431.pdf)  

##### 4. DenseNet  
DenseNet is the latest Deep Learning architecture published by _Gao Huang and al._. 
From their point of view, the degradation in error rate when the network become deeper comes from the fact that the 
information from input vanishes while passing the layers. So we consider that the shortcut in the residual blocks from 
ResNet is one way to  maintain the information from the input till the end of the network.  

The authors of DenseNet pushed the idea of ResNet to its limit. They divide DenseNet 
into the dense blocks





