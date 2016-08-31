---
layout: post
title: Install Caffe With Anaconda
---

If you want to install [Caffe](http://caffe.berkeleyvision.org/) on Ubuntu 16.04along with Anaconda, here is an installation instructions:


# Install Nvidia driver and Cuda (Optional)

Follow instructions [here](http://yangcha.github.io/GTX-1080/) to install Nvidia drivers, CUDA 8RC and cuDNN 5.

# Install Anaconda

Download Anaconda from [here](https://www.continuum.io/downloads). Choose Python 2.7 version 64-BIT INSTALLER to install it. Then update it:

```
conda update conda
conda update anaconda
```

If you want to create an environment, run:

```
conda create -n testcaffe python
source activate testcaffe
```


