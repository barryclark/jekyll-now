---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2020-12-29
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Discrete Fourier Transform '
comments_id:
---

It has been a while since I worked in Fourier space, so like everyhting in life my skills have atrophied. In a series of posts I plan to re-introduce the Fourier transform to myself and even put it on a more rigorous foundation than I've had before. We'll start with how the Discrete Fourier Transform (DFT) relates to the continuous Fourier Transform. The discrete transform is what we actually used in image processing and it's clearly related to the continuous transform, but the devil is in the detail.

First a disclaimer: during the series I will try to be precise in my notation, but I will be using math like a physicist. For example, I won't be bothered with checking if reordering integrals, partial derivatives and such is one hundred percent mathematically sound. I'll just do it. Although my aim is to use the 2D DFT for image processing, I'll start with the 1D transform, because it's instructive to do so. I'll be following the structure of Gonzalez and Woods[^Gonzalez_Woods] closely.

# The Fourier Series
Assume we have a periodic function $$f(t)$$ with period $$T$$, which means $$f(t+kT)=f(t)$$ for all $$k\in \mathbb{Z}$$. Any reasonably well behaved[^well_behaved] *periodic* function $$f(t)$$ can be expressed as a linear combination of plain waves with different frequencies:

$$f(t) = \sum_{n=-\infty}^{\infty}c_n \exp\left(i 2\pi \frac{n}{T}\right)$$

with the *Fourier coefficients*

$$c_n = \frac{1}{T} \int_{-\frac{T}{2}}^{\frac{T}{2}} \text{d}t f(t)\exp\left(-i 2\pi \frac{n}{T}\right) .$$

This series is applicable only to periodic functions, so the next logical step is to [extend the period to infinity](https://en.wikipedia.org/wiki/Fourier_transform#Introduction). This is how we get to the Fourier *Transform*.


# The Fourier Transform
Given any function $$f(t)$$, which does not need to be periodic, with $$f:\mathbb{R}\rightarrow \mathbb{C}$$, we can define its [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) (FT) as

$$F(\nu) := \mathcal{F}\left[f(t)\right](\nu) =  \int_{-\infty}^{\infty} \text{d}t f(t) \exp(-i\, 2\pi\nu t) .$$

If $$t$$ is a time, then $$\nu$$ is a frequency. The FT of a function can be inverted and inverse Fourier Transform (IFT) as

$$ \mathcal{F}^{-1}\left[F(\nu)\right](t) = \int_{-\infty}^{\infty} \text{d}\nu F(\nu) \exp(i\, 2\pi\nu t)=f(t).$$

This is the *continuous Fourier Transform of a continuous function*[^notation]. Again, this is not what we use in image processing, where we use the *discrete* Fourier Transform (DFT) of discretely sampled functions. The aim of this post is to show how these transforms are related.

# The Fourier Transform of a Sampled Function
In this step we'll cover half the distance to get from the continuous FT to the DFT. We'll do that by looking at the *continuous* FT of a sampled function.

## Sampling
When we measure function values in an experiment, we are only measuring the function values at discrete intervals. This is called sampling.   Let's spend a second on this topic, before we go any further. The value of the sampled function we obtain at an index $$n$$ corresponding to position $$t_n$$ is $$f_n=\int_{-\infty}^{\infty}f(t)w(t-t_n)$$. It is the integral of the function and some impulse function that weighs the function values around the position $$t_n$$. If the weights decay[^weights_decay] fast enough we can write the *sampled function* as the sum of all the weights multiplied by the function itself, i.e. $$\tilde{f(t)} = \sum_{n=-\infty}^{\infty}f(t)w(t-t_n)$$, which is again a continuous function for which the aforementioned integral equation holds[^sampling].

We'll consider the simplest case for the weights, which assumes $$\delta$$ distributions centered around the sample points $$t_n$$. Furthermore we only consider uniform sampling at intervals $$\Delta T$$ so that $$t_n = n\Delta T, n \in \mathbb{Z}$$. So we'll write our sampled function as

$$\tilde{f}(t) = \sum_{n=-\infty}^{\infty} f(t)\delta(t-n\Delta T) = f(t)\cdot s_{\Delta T}(t), $$

where

$$s_{\Delta T} = \sum_{n=-\infty}^{\infty} f(t)\delta(t-n\Delta T)$$

is the [Dirac comb](https://en.wikipedia.org/wiki/Dirac_comb) or *impulse train* with period $$\Delta T$$. Although the sampled function looks like a collection of discrete values, it is a continuous function. Mathematically, it is the original function periodically superimposed with itself and multiplied with a weighting function. This has profound implications for its Fourier Transform.


## Fourier Transforming a Sampled Function
Let's find an expression for how the FT of a sampled function $$\tilde{f}(t)$$ relates to the FT of the original function $$f(t)$$. This is best done using the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem), which lets us write a multiplication in $t$-space as a convolution in Fourier space and vice versa.



FOURIER TRAFO of Dirac Comb: https://en.wikipedia.org/wiki/Dirac_comb#Fourier_transform

# Endnotes
[^Gonzalez_Woods]: Gonzalez, RC, Woods, RE. 2018.  *Digital Image Processing*. (4<sup>th</sup> ed.). Pearson.
[^well_behaved]: See, this is what I meant when I said I'll use math like a physicist.
[^notation]: I'll stick to the definition of the Fourier transform where I write out $$2\pi\nu$$ instead of absorbing that into the circular frequency $$\omega$$. The reason is that the discrete Fourier Transform (DFT) library [FFTW](www.fftw.org) also uses [this notation](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) and that allows me to re-use equations directly without having to worry about $$2\pi$$ factors.
[^sampling]: This is not a completely rigorous justification for the sampling. If you are looking for different mental models look [here](https://dsp.stackexchange.com/questions/13563/why-is-dirac-delta-used-in-continuous-signal-sampling) and [here](https://dsp.stackexchange.com/questions/2948/sampling-of-a-continuous-function-kroneckers-or-diracs-delta).
[^weights_decay]: Here we assume that the weights decay so rapidly that there is no overlap between weighting functions of adjacent samples.
