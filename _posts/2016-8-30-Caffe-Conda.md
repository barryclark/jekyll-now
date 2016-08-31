---
layout: post
title: Install Caffe With Anaconda
---

If you want to install [Caffe](http://caffe.berkeleyvision.org/) on Ubuntu 16.04 along with Anaconda, here is an installation guide:


# Install Nvidia driver and Cuda (Optional)

Follow instructions [here](http://yangcha.github.io/GTX-1080/) to install Nvidia drivers, CUDA 8RC and cuDNN 5.

# Install Anaconda

Download Anaconda from [here](https://www.continuum.io/downloads). Choose Python 2.7 version 64-BIT INSTALLER to install it. Then update it:

```
conda update conda
conda update anaconda
```

If you want to create an environment and install OpenCV, run:

```
conda create -n testcaffe python
source activate testcaffe
conda install -c menpo opencv3
```

# Install Dependencies

```
sudo apt-get update

sudo apt-get upgrade

sudo apt-get install -y build-essential cmake git pkg-config

sudo apt-get install -y libprotobuf-dev libleveldb-dev libsnappy-dev protobuf-compiler

sudo apt-get install -y libatlas-base-dev 

sudo apt-get install -y --no-install-recommends libboost-all-dev

sudo apt-get install -y libgflags-dev libgoogle-glog-dev liblmdb-dev
```

# Build Caffe

Go to [https://github.com/BVLC/caffe](https://github.com/BVLC/caffe), download zip archive and unpack it. Or clone the source code. Enter the caffe-master directory in the terminal window.

```
mkdir build
cd build
cmake ..
make all
make install
make runtest
```

Add the module directory to your `$PYTHONPATH` by 

```
export PYTHONPATH=/path/to/caffe/python:$PYTHONPATH`.
```

# Test Run

First install protobuf as follows:

```
conda install protobuf
```

Then execute command: `python` from caffe-master directory, make sure the python is from Anaconda package:

```
import caffe
```

Change directory to `examples`, execute command:

```
jupyter notebook
```

Choose one of the notebook examples to test the Caffe installation.



