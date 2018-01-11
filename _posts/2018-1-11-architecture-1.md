---
layout: post
title: ConvNet architectures (1)
author: hoangbm
---
First introduction of ConvNet architecture in [OtoNhanh.vn](https://www.otonhanh.vn/)  

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
Source code for AlexNet:

<div style="font-size: 75%;">
 {% highlight python %}
    with tf.device('/gpu:0'):
        with tf.variable_scope('1st_conv'):
            net = slim.conv2d(images, num_outputs=96, kernel_size=[7, 7], stride=1)
            net = conv_2d(images, 96, [7, 7], [1, 1])
        net = tf.nn.lrn(net, alpha=1.e-3, beta=0.75, bias=2)
        net = max_pooling(net, [2, 2], [1, 1])
        with tf.variable_scope('2nd_conv'):
            net = slim.conv2d(net, num_outputs=256, kernel_size=[5, 5], stride=2)
            net = conv_2d(net, 256, [3, 3], [2, 2])
        net = tf.nn.lrn(net, alpha=1.e-3, beta=0.75, bias=2)
        net = max_pooling(net, [2, 2], [1, 1])
        with tf.variable_scope('3rd_conv'):
            net = slim.conv2d(net, num_outputs=384, kernel_size=[3, 3], stride=2)
            net = conv_2d(net, 384, [3, 3], [2, 2])
        net = tf.nn.lrn(net, alpha=1.e-3, beta=0.75, bias=2)
        net = max_pooling(net, [2, 2], [1, 1])
        net = fully_connected(net, 2048, activation=None)
        net = slim.fully_connected(net, num_outputs=4096, activation_fn=None)
        with tf.variable_scope('1st_bn'):
            net = batch_norm(net, mode='train')
            net = slim.batch_norm(net)
        net = tf.nn.tanh(net)
        net = slim.fully_connected(net, num_outputs=2048, activation_fn=None)
        net = fully_connected(net, 2048, activation=None)
        with tf.variable_scope('2nd_bn'):
            # net = batch_norm(net, mode='train')
            net = slim.batch_norm(net)
        net = tf.nn.tanh(net)
        net = fully_connected(net, 10, activation='None')
        net = slim.fully_connected(net, num_outputs=10, activation_fn=None)
        loss_op = tf.nn.sparse_softmax_cross_entropy_with_logits(
            labels=labels,
            logits=net
        )
{% endhighlight %}
 </div>  
Its detailed architecture can be found in the paper [ImageNet Classification with Deep Convolutional Neural Networks](https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf).  

### 2. VGG-Net  
This architecture is, from my point of view, a deeper version of AlexNet. Its main 
contribution is that a better performance of the network can be achieved by simply increasing its layers for more 
sophisticated representation.  

<p align="center">
 <img src="/images/Introduction_CNN/vgg16.png" alt="" align="middle">
 <div align="center">VGG-Net Architecture <a href="https://www.cs.toronto.edu/~frossard/post/vgg16/vgg16.png"> Source</a></div>
</p>  

<div style="font-size: 75%;">
 {% highlight python %}
        with slim.arg_scope(arg_scope):
            x = slim.conv2d(x, 64, 3, 1, activation_fn=tf.nn.relu, scope='conv1_1')
            x = slim.conv2d(x, 64, 3, 1, activation_fn=tf.nn.relu, scope='conv1_2')
            x = slim.maxpool2d(x, 2, 2, padding='SAME', scope='pool1')

            x = slim.conv2d(x, 128, 3, 1, activation_fn=tf.nn.relu, scope='conv2_1')
            x = slim.conv2d(x, 128, 3, 1, activation_fn=tf.nn.relu, scope='conv2_2')
            x = slim.max_pool2d(x, 2, 2, padding='SAME', scope='pool2')

            x = slim.conv2d(x, 256, 3, 1, activation_fn=tf.nn.relu, scope='conv3_1')
            x = slim.conv2d(x, 256, 3, 1, activation_fn=tf.nn.relu, scope='conv3_2')
            x = slim.conv2d(x, 256, 3, 1, activation_fn=tf.nn.relu, scope='conv3_3')
            x = slim.max_pool2d(x, 2, 2, padding='SAME', scope='pool3')

            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv4_1')
            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv4_2')
            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv4_3')
            x = slim.max_pool2d(x, 2, 2, padding='SAME', scope='pool4')

            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv5_1')
            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv5_2')
            x = slim.conv2d(x, 512, 3, 1, activation_fn=tf.nn.relu, scope='conv5_3')
            x = slim.max_pool2d(x, 2, 2, padding='SAME', scope='pool5')

            pool_shape = x.get_shape().as_list()
            flat_size = pool_shape[1] * pool_shape[2] * pool_shape[3]
            x = tf.reshape(x, [pool_shape[0], flat_size])

            x = slim.fully_connected(x, 4096, activation_fn=tf.nn.relu, scope='fc1')
            x = slim.fully_connected(x, 4096, activation=tf.nn.relu, scope='fc2')

            if self.model_cfg['is_training']:
                if dropout_prob > 0.:
                    x = tf.nn.dropout(x, 1.0 - self.model_cfg['dropout_prob'])

            logits, probs = predict_layer(x, num_classes, using_logistic_regression)
{% endhighlight %}
 </div>  

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
Inception also introduces a new concept of auxiliary classifiers. We add some classifiers at the intermediate layers: 
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

<div style="font-size: 75%;">
 {% highlight python %}
    with tf.variable_scope('Mixed_7a'):
        with tf.variable_scope('Branch_0'):
            tower_conv = slim.conv2d(x, 256, 1, scope='Conv2d_0a_1x1')
            tower_conv_1 = slim.conv2d(tower_conv, 384, 3, stride=2,
                                       padding='VALID', scope='Conv2d_1a_3x3')
        with tf.variable_scope('Branch_1'):
            tower_conv1 = slim.conv2d(x, 256, 1, scope='Conv2d_0a_1x1')
            tower_conv1_1 = slim.conv2d(tower_conv1, 288, 3, stride=2,
                                        padding='VALID', scope='Conv2d_1a_3x3')
        with tf.variable_scope('Branch_2'):
            tower_conv2 = slim.conv2d(x, 256, 1, scope='Conv2d_0a_1x1')
            tower_conv2_1 = slim.conv2d(tower_conv2, 288, 3,
                                        scope='Conv2d_0b_3x3')
            tower_conv2_2 = slim.conv2d(tower_conv2_1, 320, 3, stride=2,
                                        padding='VALID', scope='Conv2d_1a_3x3')
        with tf.variable_scope('Branch_3'):
            tower_pool = slim.max_pool2d(x, 3, stride=2, padding='VALID',
                                         scope='MaxPool_1a_3x3')
        x = tf.concat(3, [tower_conv_1, tower_conv1_1,
                            tower_conv2_2, tower_pool])
{% endhighlight %}
 </div>  
Basically, it is the concept of Inception architecture that we want to introduce. In the paper, they also talk about 
a regularization technique called *Label Smoothing*, but it is out of scope of this article.  

