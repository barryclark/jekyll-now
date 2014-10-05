---
layout: post
title: Super simple blurriness detection
---

Detecting blurriness in a picture is useful for determining image quality since people rarely ever consider a blurry picture to be a good one. 

We're going to use the Fourier transform to easily analyze the overall spectrogram of a given picture. We'll do this for several pictures, manually mark them as blurry or not (the method itself will 'rate' the blurriness, we're just creating a cut-off point), and then feed the transformed images to a very simple model that will learn to classify the pictures as blurry or not.
