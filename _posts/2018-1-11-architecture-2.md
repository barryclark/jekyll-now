---
layout: post
title: ConvNet architectures (2)
author: hoangbm
---

Second introduction of ConvNet architecture in [OtoNhanh.vn](https://www.otonhanh.vn/)  

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


Based on our experience, ResNet is still one of the most powerful Deep Learning architecture in term of error rate and 
efficiency computation.  
Source code for Residual Block:  
<div style="font-size: 75%;">
 {% highlight python %}
    def bottleneck_residual(x,
                        nin_feature_maps,
                        nout_feature_maps,
                        strides,
                        activate_before_residual=False,
                        is_training=True,
                        relu_leakiness=0.0,
                        name='bottleneck_v2'):
    """Bottleneck residual unit with 3 sub layers"""
    with tf.variable_scope(name):
        if activate_before_residual:
            x = slim.batch_norm(x, is_training=is_training, scope='preact')
            x = chappiedl.nn.leaky_relu(x, relu_leakiness)
            orig_x = x
        else:
            orig_x = x
            x = slim.batch_norm(x, is_training=is_training, scope='preact')
            x = chappiedl.nn.leaky_relu(x, relu_leakiness)

        x = slim.conv2d(x,
                        nout_feature_maps / 4,
                        (1, 1),
                        strides,
                        biases_initializer=None,
                        activation_fn=None,
                        scope='conv1')
        x = slim.batch_norm(x, is_training=is_training, scope='conv1/BatchNorm')
        x = chappiedl.nn.leaky_relu(x, relu_leakiness)

        x = slim.conv2d(x,
                        nout_feature_maps / 4,
                        (3, 3),
                        (1, 1),
                        biases_initializer=None,
                        activation_fn=None,
                        scope='conv2')
        x = slim.batch_norm(x, is_training=is_training, scope='conv2/BatchNorm')
        x = chappiedl.nn.leaky_relu(x, relu_leakiness)

        x = slim.conv2d(x,
                        nout_feature_maps,
                        (1, 1),
                        stride=(1, 1),
                        activation_fn=None,
                        scope='conv3')

        if nin_feature_maps != nout_feature_maps:
            orig_x = slim.conv2d(orig_x,
                                nout_feature_maps,
                                (1, 1),
                                stride=strides,
                                scope='shortcut')

        x += orig_x

    return x
{% endhighlight %}
 </div>  
Its detailed architecture can be found in the paper [Deep Residual Learning for Image Recognition](https://arxiv.org/pdf/1512.03385.pdf).  


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
<div style="font-size: 75%;">
 {% highlight python %}
    def _resneXt_bottleneck_B(
                x,
                nin_feature_maps,
                nout_feature_maps,
                strides,
                base_width=None,
                cardinality=None,
                is_training=True,
                relu_leakiness=0.0):
    origin_x = x
    d = (nout_feature_maps * base_width / 128)
    c = cardinality
    with tf.variable_scope('bottleneck_residual'):
        x = slim.conv2d(x,
                        d,
                        (1, 1),
                        strides=(1, 1),
                        activation_fn=None,
                        biases_initializer=None,
                        scope='conv1')

        x = slim.batch_norm(x, is_training=is_training, scope='conv1/BatchNorm')
        x = chappiedl.nn.leaky_relu(x, relu_leakiness)

        with tf.variable_scope('conv2'):
            x = _split(x, c,
                       strides=strides,
                       is_training=is_training,
                       relu_leakiness=relu_leakiness)

        x = slim.conv2d(x,
                        nout_feature_maps,
                        (1, 1),
                        strides=(1, 1),
                        activation_fn=None,
                        scope='conv3')
        x = slim.batch_norm(x, is_training=is_training, scope='conv3/BatchNorm')

        origin_x = _shortcut(origin_x,
                             nin_feature_maps,
                             nout_feature_maps,
                             strides,
                             is_training=is_training,
                             shortcut_type='B')
        x += origin_x
        x = chappiedl.nn.leaky_relu(x, relu_leakiness)

    return x

{% endhighlight %}
 </div> 
More details about the implementation can be found in the paper [Aggregated Residual Transformations for Deep Neural 
Networks](https://arxiv.org/pdf/1611.05431.pdf)  

##### 4. DenseNet  
DenseNet is the latest Deep Learning architecture published by _Gao Huang and al._. 
From their point of view, the degradation in error rate when the network become deeper comes from the fact that the 
information from input vanishes while passing the layers. So we consider that the shortcut in the residual blocks from 
ResNet is one way to  maintain the information from the input till the end of the network.  

The authors of DenseNet pushed the idea of ResNet to its limit. To maximize the information flow between layers in the 
network, they divide DenseNet into the dense blocks in which all the layers are directed connected. However, in contrast 
to ResNet, DenseNet combines the feature map not by adding them but by concatenating them. Due to its dense connection 
in the block, they named this architecture as *Dense Convolution Network (DenseNet)*  

As I have stated above, Dense Block is the core element of Dense Convolution Network.  

<p align="center">
 <img src="/images/Introduction_CNN/1_KOjUX1ST5RnDOZWWLWRGkw.png" alt="" align="middle">
 <div align="center"> Dense connection in Dense Block
 <a href="https://cdn-images-1.medium.com/max/1600/1*KOjUX1ST5RnDOZWWLWRGkw.png"> Source</a></div>
</p>  

As you can see, Dense Block is divided again into several groups of (1x1 convolution and 3x3 convolution). The number of 
groups is block depth. The input of each group is the concatenation of its previous groups's output. 1x1 convolution is 
optional; if we equip this dimension reduction to a group, we could call it bottleneck layer. The below code is the 
Dense Block we implement in our classification.   

<div style="font-size: 75%;">
 {% highlight python %}
    def dense_block(
        incoming, block_depth,
        growth_rate, scope,
        drop_out,
        keep_prob=None,
        is_training=True):
    """ Dense block

    :param incoming: block input
    :param block_layers: number of block layers
    :param growth_rate: Growth rate
    :param scope: Scope of dense block
    :param keep_prob: (1 - keep_prob) dropout prob
    :param is_training: Is training process or not
    :return:
    """
    x = incoming
    with tf.variable_scope(scope):
        for i in range(block_depth):
            conn = x
            with tf.variable_scope('%d_th_layer' % (i+1)):
                with tf.variable_scope('sub1'):
                    x = slim.batch_norm(x, is_training=is_training, fused=True)
                    x = tf.nn.relu(x)
                    x = slim.conv2d(x, 4 * growth_rate, 1, 1, activation_fn=None, padding='VALID')
                    if drop_out:
                        x = tf.nn.dropout(x, keep_prob)
                with tf.variable_scope('sub2'):
                    x = slim.batch_norm(x, is_training=is_training, fused=True)
                    x = tf.nn.relu(x)
                    x = slim.conv2d(x, growth_rate, 3, 1, activation_fn=None)
                    if drop_out:
                        x = tf.nn.dropout(x, keep_prob)
            x = tf.concat([x, conn], 3)
    return x
{% endhighlight %}
 </div>  

Between the Dense Blocks, we add Transition Layer to further improve the model compactness. If the previous Dense Block 
produces $$m$$ feature maps, we let the Trasition Layer generate $$\theta m$$, $$\theta \in $$ \[0, 1\].  

<div style="font-size: 75%;">
 {% highlight python %}
    def transition_block(
        incoming, compression_rate, drop_out,
        keep_prob, scope, is_training=True):
    """Trainsition block
    :param incoming: block input
    :param compression_rate: Compression rate
    :param keep_prob: (1 - keep_prob)
    :param is_training: Is training process
    """
    imcoming_channel = incoming.get_shape().as_list()[3]
    with tf.variable_scope(scope):
        x = slim.conv2d(incoming, int(compression_rate * imcoming_channel), 1, 1, activation_fn=None)
        if drop_out:
            x = tf.nn.dropout(x, keep_prob)
        x = slim.avg_pool2d(x, 2, 2)
    return x
{% endhighlight %}
 </div>  
 
Even though DenseNet seems potential, the implementation into production is quite complicated in aspect of training time 
and memory consumption. According to the author:
>One of the reasons why DenseNet is less memory/speed-efficient than Wide ResNet, is that in our paper, we mainly aimed 
to compare the connection pattern between DenseNets (dense connection) and ResNets (residual connection), so we build 
our DenseNet models in the same "deep and thin" fashion as the original ResNets (rather than Wide ResNets). Based on our 
experiments, on GPUs, those "deep and thin" models are usually more parameter-efficient, but less memory/speed-efficient, 
compared with "shallow and wide" ones.  

>Backprop requires storing all layer's outputs, therefore the number of such layers (and their respective output sizes) 
is the main culprit for memory bottlenecks.  

[Source](https://www.reddit.com/r/MachineLearning/comments/67fds7/d_how_does_densenet_compare_to_resnet_and/)  

So it seems that there is a trade-off between parameter efficiency and memory/speed efficiency. We choose *shallow and 
wide* version in deployment.  
Its detailed architecture can be found in the paper [Densely Connected Convolutional Networks](https://arxiv.org/pdf/1608.06993.pdf).  

 




