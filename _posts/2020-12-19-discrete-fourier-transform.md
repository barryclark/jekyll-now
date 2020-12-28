---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2020-12-29
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Fourier Transforms: FS, FT, DTFT, and DFT'
comments_id:
---

**TODO WRITE INTRO** SOMETHING LIKE: I have extensively worked with the Fourier transform and the DFT but never really taken the time to understand how these two things are truly connected. And what we imply about our signal if we use the DFT to approximate the FT.

I have based this article on [Gonzalez2018], [Langton2019] and countless pieces of valuable information collected from the internet. And a final disclaimer before we dive in: I will try to be precise in my notation, but I will be using math like a physicist[^math_rigor].

# Motivation and Goal
I have often used formulas that were derived by using the Fourier Transform and applied them to image processing using the Discrete Fourier Transform[^FFT]. This is mostly fine, but it can lead to [wrong results](http://www.nrbook.com/a/bookcpdf/c13-1.pdf) if we are not paying close attention. So want to increase my understanding of how the Fourier Series (FS), the Fourier Transform (FT), the Discrete Time Fourier Transform (DTFT) and the Discrete Fourier Transform (DFT) are connected by putting it on a more rigorous foundation.

Let's start with Fourier Series of a function $$f(t)$$. I'll call $$t$$ a time coordinate just so that I can refer to the Fourier space as frequency.

# The Three Big Fs

## The Fourier Transform (FT / CTFT)
Given any function $$f(t)$$, which does not need to be periodic, with $$f:\mathbb{R}\rightarrow \mathbb{C}$$, we can define its [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) (FT) as

$$F(\nu) := \mathcal{F}\left\{f(t)\right\}(\nu) =  \int_{-\infty}^{\infty} \text{d}t f(t) \exp(-i\, 2\pi\nu t) .$$

I'll use $$t$$ as a time and consequently refer to $$\nu$$ as a frequency just for convenience. The FT of a function can be inverted and inverse Fourier Transform (IFT) is given as

$$ \mathcal{F}^{-1}\left\{F(\nu)\right\}(t) = \int_{-\infty}^{\infty} \text{d}\nu F(\nu) \exp(i\, 2\pi\nu t)=f(t).$$

The Fourier transform has all kinds of [properties](https://en.wikipedia.org/wiki/Fourier_transform#Properties_of_the_Fourier_transform) that make it worthwhile as a tool for analysing functions[^notation]. Although it is obvious from the notation, it is very important to note that the Fourier Transform is continuous in time and in frequency. Thus it is sometimes also referred to as the Continuous Time Fourier Transform (CTFT). This is not what we use in signal processing, where we use the *discrete* Fourier Transform (DFT) of a finite number of discrete samples.

## The Discrete Fourier Transform (DFT)
This transform is what we are actually using in all kinds of signal processing. It is defined on a finite sequence $$f[n], n=0,1,\dots,N-1$$ with $$N$$ elements. At this point in the article just assume that the DFT has nothing to do with the FT and just falls out of the sky as some kind of transformation applied to a finite sequence of numbers. Of course is not a coincidence that I named the finite sequence $$f[n]$$, but at this point just assume it has nothing to do with the function $$f(t)$$ above[^dft_ft]. So the DFT of the sequence $$f[n], n=0,1,\dots,N-1$$ is defined as

$$F[k] := \mathcal{DFT}\{f[n]\}[k] = \sum_{n=0}^{N-1}f[n]\exp\left(-i\,\frac{2\pi}{N} k n\right),$$

which is an infinite discrete sequence of index $$k\in \mathbb{Z}$$. Note that the sequence is $$N$$-periodic in $$k$$, because of the exponential term. So the DFT is completely defined e.g. by its values on $$k=0,1,\dots,N-1$$, which is why we usually only give it on these values. The Inverse DFT (IDFT) is an operation that converts the DFT $$F[k],\, k=0,1,\dots,N-1$$ back to the original sequence:

$$f[n] = \mathcal{DFT}^{-1}\{F[k]\}[n] = \frac{1}{M}\sum_{k=0}^{N-1}F[k]\exp\left(i\,\frac{2\pi}{N} k n\right).$$

Again, see this as some transformation on sequences which is (yet) unrelated to the FT. Just see this as an [invertable transform](https://math.stackexchange.com/questions/3454134/simple-proof-of-inverse-discrete-fourier-transformation-idft) on finite sequences. It is worth noting that the sequence reproduced by the DFT is also $$N$$-periodic, whereas the original sequence was only given on $$n=0,1,\dots,N-1$$. We will understand in the course of the article how the DFT and the FT relate and what the reason for the periodicity is.

## The Fourier Series (FS / CTFS)
Before we dive into how the FT and the DFT relate, let's mention the Fourier Series (FS) for completeness. The Fourier Series lets us write periodic functions as a linear combination of plane waves. It is not absolutely vital for this article to understand the FS, but it is connected to both the FT and the DFT. Furthermore it is sometimes useful to write a periodic function as a Fourier Series to easier calculate its Fourier Transform.

Assume we have a periodic function $$g(t)$$ with period $$T$$, which means $$g(t+kT)=f(t)$$ for all $$k\in \mathbb{Z}$$. Any reasonably well behaved[^well_behaved] *periodic* function $$g(t)$$ can be expressed as a linear combination of plane waves with different frequencies:

$$g(t) = \sum_{n=-\infty}^{\infty}c_n \exp\left(i 2\pi \frac{n}{T}\right),$$

which is the Fourier Series of $$g$$ with the *Fourier coefficients*

$$c_n = \frac{1}{T} \int_{-\frac{T}{2}}^{\frac{T}{2}} \text{d}t \, g(t)\exp\left(-i 2\pi \frac{n}{T}\right), \, n \in \mathbb{Z} .$$

This series is applicable only to periodic functions which are *continuous* in time. This is why the FS is sometimes referred to as the Continuous Time Fourier Series (CTFS)[^ctfs_resource]. The series of Fourier coefficients $$c_n$$ is discrete but infinite. [Extending the period](https://en.wikipedia.org/wiki/Fourier_transform#Introduction) of the function to infinity is what gets us from the Fourier Coefficients to the Fourier Transform.


# The Discrete Time Fourier Transform (DTFT)
In this step we'll cover half the distance to get from the continuous FT to the DFT. We'll do that by looking at the *continuous* FT of a sampled function, which is gives us the [Discrete Time Fourier Transform (DTFT)](https://cnx.org/contents/xkitXNix@1/Lecture-8-The-Discrete-Time-Fourier-Transform-DTFT).

**TODO** DTFT of impulse train: https://lmb.informatik.uni-freiburg.de/lectures/old_lmb/bildverarbeitung/Exercise07/GibbsPhenomena.pdf . TODO: the DTFT of the impulse train above in openstax only gives a finite sum....

https://en.wikipedia.org/wiki/Discrete_Fourier_series TODO CHECK THIS OUT

https://dsp.stackexchange.com/questions/16586/difference-between-discrete-time-fourier-transform-and-discrete-fourier-transfor

## Sampling
Sampling is related to an integral transformation of a continuous time signal. A useful mental model of sampling[^sampling] is that a "measured" function value a given sampling point $$t_k$$ is given as an integral $$f_k = \int_{t_k -\epsilon}^{t_k + \epsilon} \text{d}t \,p(t-t_k)f(t)$$ in a neighborhood of $$t_k$$. Here $$p(t)$$ is some peak or impulse function. Let's now say we are sampling our function on infinitely many equidistant time points with sampling interval $$\Delta T$$ such that $$t_k = k \cdot \Delta T, \, k\in \mathbb{Z}$$. Then our sampled function $$\bar{f}(t)$$ is given as the product of our function $$f(t)$$ with an infinitely periodic impulse train $$\sum_k p(t-k\cdot \Delta T)$$. The integral is part of the measurement process and not of the sampled function.

The simplest conceivable sampling (ideal sampling) is when the impulse train $$III_{\Delta T}(t)$$ consists of infinitely narrow peaks:

$$ III_{\Delta T}(t) = \sum_{n=-\infty}^{\infty} \delta(t-n\Delta T),$$

which is the [Dirac comb](https://en.wikipedia.org/wiki/Dirac_comb). Our sampled function $$\bar{f}(t)$$ is written as

$$\bar{f}(t) = f(t)\cdot III_{\Delta T}(t) = \sum_{n=-\infty}^{\infty} f(t)\delta(t-n\Delta T) , $$

Although the sampled function looks like a collection of discrete values it is a continuous function, which is nonzero only at an infinite sequence of discrete points. Mathematically, it is the original function periodically superimposed with itself and multiplied with a periodic weighting function. This has profound implications for its Fourier Transform.

## The Discrete Time Fourier Transform (DTFT)
Now let's look at the FT of the function $$\bar{f}$$ which a sampling of $$f$$ at an infinite number of discrete time points. 

Let's find an expression for how the FT of a sampled function $$\bar{f}(t)$$ relates to the FT of the original function $$f(t)$$. This is best done using the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem), which lets us write a multiplication in $t$-space as a convolution in Fourier space and vice versa.



FOURIER TRAFO of Dirac Comb: https://en.wikipedia.org/wiki/Dirac_comb#Fourier_transform

# Literature
[Gonzalez2018] Gonzalez, RC, Woods, RE. 2018.  *Digital Image Processing*. (4<sup>th</sup> Edition). Pearson.
[Langton2019] Langton, C, Levin, V. 2019. *Intuitive Guide to Fourier Analysis and Spectral Estimation*. (2<sup>nd</sup> Edition). Mountcastle Academic.

# Endnotes
[^dft_ft]: Of course the DFT and the FT are related and so are $$f(t)$$ and $$f[n]$$, but the whole point of this article is to show how exactly they are related.
[^ctfs_resource]: See [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/06%3A_Continuous_Time_Fourier_Series_(CTFS)/6.02%3A_Continuous_Time_Fourier_Series_(CTFS)) for a very good resource on the CTFS and its properties.
[^FFT]: In image processing we commonly use the [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) which just a fast implementation of the DFT.
[^math_rigor]: For example, I won't be bothered with checking if reordering integrals, partial derivatives, sums  etc. is one hundred percent mathematically sound. I also won't not bother with stating convergence criteria for integrals, series and such.
[^well_behaved]: See, this is what I meant when I said I'll use math like a physicist.
[^notation]: I'll stick to the definition of the Fourier transform where I write out $$2\pi\nu$$ instead of absorbing that into the circular frequency $$\omega$$. The reason is that the discrete Fourier Transform (DFT) library [FFTW](www.fftw.org) also uses [this notation](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) and that allows me to re-use equations directly without having to worry about $$2\pi$$ factors.
[^sampling]: For additional information on sampling see e.g. [here](https://dsp.stackexchange.com/questions/13563/why-is-dirac-delta-used-in-continuous-signal-sampling), [here](https://dsp.stackexchange.com/questions/2948/sampling-of-a-continuous-function-kroneckers-or-diracs-delta), and [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/10%3A_Sampling_and_Reconstruction). Also [here](http://mmust.elimu.net/BSC(ELEC_COMM)/Year_4/ECE%20421_Comm_Systems_II/Signal_Digitization/Sampling/Sampling_Techniques.htm).
[^weights_decay]: Here we assume that the weights decay so rapidly that there is no overlap between weighting functions of adjacent samples.
