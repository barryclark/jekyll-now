---
layout: post
title: Caffe stuck at runtest
---

There are two Nvidia graphics cards installed on my machine. When I execute:

```bash
cd ..

(now you are in caffe-master directory)

make all

make test

make runtest
```

The run test stuck at *TestRMSPropLeastSquaresUpdateWithRmsDecay*. According to [link here](https://github.com/BVLC/caffe/issues/3109), it is due to multi-GPUs. The fix is to set this before execution of runtest:

```bash
export CUDA_VISIBLE_DEVICES=0
```