---
layout: post
title: Improvement in Distributed Training
author: hoangbm
---

In the last blog about [Distributed TensorFlow](/distributed-tensorflow), we have provided some  
fundamental knowledge of Distributed Training in this framework. However, it is not enough if we want to apply it 
efficiently. Today, we will five some additional tricks to make use of Distributed Computing better.  

# I) Facebook's tricks to train ImageNet faster.  

> On June 8, 2017, the age of distributed deep learning began. On that day, Facebook released a paper showing the 
methods they used to reduce the training time for a convolutional neural network (RESNET-50 on ImageNet) from two weeks 
to one hour, using 256 GPUs spread over 32 servers.  

Surely, the above statement is a bit exaggerated but it still indicates that this [paper](https://arxiv.org/pdf/1706.02677.pdf) 
has helped to boost the performance of Distributed Deep Learning. In this part, let me introduce some insights of this 
paper.  
Back to Stochastic Gradient Descent, the heart of Deep Learning, the idea is to estimate the gradient of the loss 
function $$\bigtriangledown L$$ using training input. There are two common strategies: Using all the training data to 
compute the gradient - *Batch Gradient Descent* and randomly choosing a small subset of training data to compute the 
gradient - *Mini-batch Gradient Descent*. The first method estimate the gradient more exactly but more computationaly 
expensive. This trade-off is really popular in Deep Learning. Recently, people argue that mini-batch brings another 
advantage: it acts as a regularizer in training process: more accurate gradient means better adaptation to training set 
and to some extent, means a worse generalization.  

> While distributed synchronous SGD is now commonplace, no existing results show that validation accuracy can be 
maintained with minibatches as large as 8192 or that such high-accuracy models can be trained in such short time.  

Nonetheless, limitting the batch size is really a waste since the hardware is more and more powerful and distributed 
computing is available. In this circumstance, Facebook tries to *demonstrate the feasibility of and to communicate 
a practical guide to large-scale training with distributed synchronous stochastic gradient descent*. In short, they aim 
to keep the validation error low in the shortest time while using a large batch-size to utilize Distributed Computing. 
The key idea is to modify the learning rate so that the training curves in the case of large batch-size imitate that of 
small batch-size.  

## Linear Scaling Rule  
> When the minibatch size is multiplied by k, multiply the learning rate by k.  

To interpret this rule, we come back to the fundamental expression of *Gradient Descent*:  
Consider a network at iteration $$t$$ with weight $$w_t$$, and a sequence of k minibatches $$\beta_j$$ for $$0 \le j < 
k$$ each of size n. We want to compare the effect of executing $$k$$ SGD iterations with small minibatches $$\beta_j$$ 
and learning rate $$\eta$$ versus a single iteration with large minibatch $$\cup_j\beta_j$$ of size kn and learning rate 
$$\hat\eta$$. In the first case, after k iterations of SGD, we have:  
<center> $$w_{t+k} = w_t - \eta\frac{1}{n} \sum_{j<k} \sum_{x\in\beta_j} \bigtriangledown l(x, w_t+j)$$ </center>  
On the other hand, taking a single step with a large minibatch and learning rate $$\hat\eta$$ will result in:  
<center> $$ \hat w_{t+1} = w_t - \hat\eta\frac{1}{kn} \sum_{j<k} \sum_{x\in\beta_j} \bigtriangledown l(x, w_t)$$ </center>  

As we can see, there is unlikely that $$w_{t+k} = \hat w_{t+1}$$. However, if we could guarantee that 
$$ \bigtriangledown l(x, w_t+j) \approx  \bigtriangledown l(x, w_t) $$, we can set $$\hat\eta = k\eta$$ to yield 
$$w_{t+k} \approx \hat w_{t+1}$$.  
The assumption that $$ \bigtriangledown l(x, w_t+j) \approx  \bigtriangledown l(x, w_t) $$ is strong and often does not 
hold, however, according to *Facebook*, this works really well in practice: not only the final accuracies stay similar, 
the learning curve match closely. There are two cases that we may not apply this rule: the initial training epochs when 
the network changes rapidly (we could use *warmup* strategy to address this issue) and k becomes enormous. The minibatch
size limit, according to *Facebook*, is ~8k in ImageNet experiment.  

## Warmup 
As we have discussed, the linear scaling rule breaks down in the early stage of learning when the network changes rapidly. 
*Facebook* thinks that this matter can be alleviated by using *less aggressive learning rate at the start of the training*.  
There are 2 types of warmup:
- Constant warmup: We use a low constant learning rate during a first few training epochs. However, *Facebook* observed 
that strategy is not sufficient in case of large k. Furthermore, an abrupt transition out of low learning rate can cause 
the training error to spike. So they propose the following gradual warmup.  
- Gradual warmup: In this setting, we gradually ramp up the learning rate from a small to large value. In practice, we
start the learning rate from a value $$\eta$$ and inscrease it by a constant amount at each iteration so that the 
learning rate could reach $$\hat\eta = k\eta$$ after a number of epochs(normally 5 epochs). This setting avoids a 
sudden inscrease in the value of learning rate, allows a healthy convergence at the beginning of learning. After the 
warmup phase, we could go back to the original learning rate schedule.  


# II) Uber's framework for Distributed Training
To begin with, Uber is one of the most active company in the field of Deep Learning. They apply Deep Learning in 
to pair the drivers and the customers. With the augmentation of the dataset, they invest strongly to increase the 
computational power of their Deep Learning engine. And [Horovod](https://github.com/uber/horovod) is one of the most 
remarkable solutions of theirs. Horovod, in short, is a framework which helps to exploit the computational power of 
distributing system much more effeciently than standard [Distributed Tensorflow](/distributed-tensorflow).  
Back to *Distributed Tensorflow*, we have to admit that there are many new concepts like: **worker, parameter server, 
tf.ClusterSpec(), etc.**: it is hard for a newbie to understand fully and also hard for an expert to debug his program. 
So we are in need of a simpler wrapper.  
Another issue is, the standard *Distributed Tensorflow* cannot exploit fully the hardware power.  
<p align="center">
 <img src="/images/distributed-improvement/image4-1.png" alt="" align="middle">
 <div align="center">Comparision between Distributed Tensorflow and ideal computation <a href="http://eng.uber.com/wp-content/uploads/2017/10/image4-1.png">Source</a></div>
</p>  

Obviously, we cannot expect that the real performance can reach the theoretical one. However, according to the above 
illustration, we can't ignore the fact that the conventional mechanism is wasting the hardware capacity. Motivated by 
Facebook's paper, Uber opensourced their distributed framework named Horovod in Tensorflow.   
