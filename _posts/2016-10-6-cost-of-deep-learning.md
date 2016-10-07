---
layout: post
title: Cost of Deep Learning
author: Mike Kroutikov
---

DRAFT

Deep Learning is coool. But expensive.

# How expensive, exactly?

1. Local machine training

   Use your local machine with NVIDIA GPU to train your model.

2. Google Cloud ML

   https://cloud.google.com/ml/pricing
   
   BASIC
   STANDARD
   PREMIUM
   CUSTOM

   Rent a cluster of GPU workers

3. Rescale

   http://www.rescale.com/pricing/

   Cloud GPU
   
   Jade: 4CPU cores, Keppler GK104
   $0.96 per hour
   
   Tungsten: Tesla T40
   $?? per hour

4. Amazon

   https://aws.amazon.com/ec2/instance-types/

   g2.2xlarge
   g2.8xlarge
   p2.xlarge
   p2.8xlarge
   p2.16xlarge

# ML tasks to test

1. MNIST
2. Language modelling lstm-char-cnn

