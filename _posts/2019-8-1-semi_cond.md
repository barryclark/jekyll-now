---
layout: post
title: Mask Defect Classification of Scanning Electron Microscope (SEM) Images and Generation of SEM images using GANs
---
In semiconductor manufacturing, one of the major task is printing patterns on
Wafer (silicon). To print patterns on wafer, we create its corresponding counterpart
which is 4 times the size of wafer with same patterns also know as 'Mask'. Given the mask
image, light (i.e. electron beam) shines through the mask and prints patterns
on wafer. The figure below shows a pattern to be printed on the wafer and
for it the corresponding mask with same pattern

<p align="center">
  <img width="460" height="300" src="{{ site.baseurl }}/images/mask_and_wafer_image.png">
</p>

Mask is like a stencil but 4 times the size of wafer in terms of width and height.
The reason for creating the mask is that there might be features or patterns
that are too small to print (i.e. 40 nm) but the electron beam itself is of 193 nm.
Good analogy to this is that you have to draw a thin line but have a big brush.
Having a mask allows us to print very small patterns /
features. There is a machine through which the electron beam passes and it has
deflectors that deflect the beam to print specific patterns.
This deflectors have amplifier that control the amount of deflection.
In some cases, the amplifier breaks as it grows old, this results in error
while printing patterns on the mask. The figure below shows error in the printed pattern because
of shape amplifier

<p align="center">
  <img width="460" height="300" src="{{ site.baseurl }}/images/shape_amp_error_pattern.png">
</p>



Before printing any patterns on the wafer we have to create mask. This mask creation
process can take more than 48 hours depending on how big and varied are the
patterns. During this process some defects might occur, which can result in
incorrect patterns being printed on the mask. The goal here is to identify the
defect that occurs on the mask and its type using deep learning.

Deep learning models usually need lot of data to train. One of the major constraint
here is that we do not have lot of defect mask images. One thing to note, we do not
actually look at the mask image, we take picture of mask image using Scanning
Electron Microscope and the corresponding image is called SEM image of the mask, which
will be called as SEM from now on. Rather than directly looking
at the mask image we look at a SEM image. This SEM image is used to identify what the defect is and
the experts use it to analyze what in the mask printing machine might cause this
defect. Getting defect SEM images for training is a major crunch and so we need
to simulate them. Once we successfully simulate SEM images with and without defects
we can train our deep learning model to identify defects.

## SEM image generation using Generative Adversarial Networks
First, we need to find a way to create SEM images given a mask image. Mask image is
an image with black and white pixels like show below

<figure>
<p align="center">
  <img width="256" height="256" src="{{ site.baseurl }}/images/mask_image.png">
</p>
<figcaption>
<p align="center"> Mask Image</p>
</figcaption>
</figure>

Since we always get SEM image of the mask to identify defects, we need to find
a way to create this SEM image from mask image. We can create mask image using
[TMDS](https://design2silicon.com/products/truemask-ds/), now we need to create SEM image for it. This
problem can be seen as an Image-Translation problem.
There are many methods for image translation like Style Transfer or GAN based
methods. Given few samples of SEM images, we create a method that can
successfully create SEM image using its mask counterpart. Creating SEM image
is non-trivial task and when it comes to high-resolution images its even more
difficult. First, as we move to high resolution it is very easy to distinguish
between fake and real SEM image. Second, SEM images have noise that is the noise from the machine
that takes SEM pictures. To simulate the noise in an artificial or generated SEM is a challenge.
For creating artificial SEM, I use GANs as they have shown promising results in
image translation problems. Most of the existing work focuses on images of resolution
256 * 256 * C, however as we move to high resolution, GANs fail to produce realistic
images, we modify the existing GAN architecture both of discriminator and generator and loss function.
The end result of the model is shown below



<figure>
<p align="center">
  <img width="512" height="512" src="{{ site.baseurl }}/images/mask_image_1.png">
</p>
<figcaption>
<p align="center"> Mask Image</p>
</figcaption>
</figure>


<figure>
<p align="center">
  <img width="512" height="512" src="{{ site.baseurl }}/images/gen_sem_tripleclear_w200s100f50_vNAoNA_2956500_3847500_width_X_0.jpg">
</p>
<figcaption>
<p align="center"> GAN Generated SEM Image</p>
</figcaption>
</figure>


<figure>
<p align="center">
  <img width="512" height="512" src="{{ site.baseurl }}/images/original_tripleclear_w200s100f50_vNAoNA_2956500_3847500_width_X_0.jpg">
</p>
<figcaption>
<p align="center"> Original SEM Image</p>
</figcaption>
</figure>



## Mask Defect Classification
As we are able to generate SEM images using Mask images, we can now create as
much data as we want by simulating defects in mask images and creating SEM images for the mask images.
The figure below shows simulated mask image and corresponding SEM image.

<figure>
<p align="center">
  <img width="512" height="512" src="{{ site.baseurl }}/images/defect_mask_sem_images.png">
</p>
<figcaption>
<p align="center"> Left: Simulated mask defect image Right: SEM image for the mask image</p>
</figcaption>
</figure>

GAN generated SEM images are used to train deep learning algorithm. We did not use
any pre-trained network, we create our own custom deep learning network. To come
up with number of layers and filters, we use visualization techniques like
[Grad CAM](https://arxiv.org/pdf/1610.02391.pdf), [Guided Back Prop](https://arxiv.org/abs/1412.6806).
We train the deep learning network with SEM images generated by generator with and
without defects. We test our trained model with actual defect and no defect SEM images
and achieve very good results. The SEM images can be of varying resolution like
(512 * 512, 1024 * 1024, 4096 * 4096), thus the classification architecture does
not classify the entire image. Also, with increase in the resolution of images, the
memory consumption also increases and it becomes a bottle neck for classification.
As a result, we do patch wise classification by cropping patches from original big image
and classifying each patch and taking a vote across the patches, whether it is a defect or no-defect SEM image patch.
The following shows visualization of the network when it classifies a defect image

<figure>
<p align="center">
  <img width="512" height="512" src="{{ site.baseurl }}/images/vis_merge_defect_image.png">
</p>
<figcaption>
<p align="center"> Left: Defect region in image Right: Network visualization </p>
</figcaption>
</figure>
