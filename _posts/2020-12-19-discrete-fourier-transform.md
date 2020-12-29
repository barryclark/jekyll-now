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

**HELPFUL LINKS**

dspillustrated

dsprelated freebok: https://www.dsprelated.com/freebooks/mdft/

**TODO** DTFT of impulse train: https://lmb.informatik.uni-freiburg.de/lectures/old_lmb/bildverarbeitung/Exercise07/GibbsPhenomena.pdf . TODO: the DTFT of the impulse train above in openstax only gives a finite sum....

https://en.wikipedia.org/wiki/Discrete_Fourier_series TODO CHECK THIS OUT

https://dsp.stackexchange.com/questions/16586/difference-between-discrete-time-fourier-transform-and-discrete-fourier-transfor


# Motivation and Goal
I have often used formulas that were derived by using the Fourier Transform and applied them to image processing using the Discrete Fourier Transform[^FFT]. This is mostly fine, but it can lead to [wrong results](http://www.nrbook.com/a/bookcpdf/c13-1.pdf) if we are not paying close attention. So want to increase my understanding of how the Fourier Series (FS), the Fourier Transform (FT), the Discrete Time Fourier Transform (DTFT) and the Discrete Fourier Transform (DFT) are connected by putting it on a more rigorous foundation.

Let's start with Fourier Series of a function $$f(t)$$. I'll call $$t$$ a time coordinate just so that I can refer to the Fourier space as frequency.

# F is for Fourier

## The Fourier Transform (FT / CTFT)
Given any function $$f(t)$$, which does not need to be periodic, with $$f:\mathbb{R}\rightarrow \mathbb{C}$$, we can define its [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) (FT) as

$$F(\nu) := \mathcal{F}\left\{f(t)\right\}(\nu) =  \int_{-\infty}^{\infty} \text{d}t f(t) \exp(-i\, 2\pi\nu t) .$$

I'll use $$t$$ as a time and consequently refer to $$\nu$$ as a frequency just for convenience. The FT of a function can be inverted and inverse Fourier Transform (IFT) is given as

$$ \mathcal{F}^{-1}\left\{F(\nu)\right\}(t) = \int_{-\infty}^{\infty} \text{d}\nu F(\nu) \exp(i\, 2\pi\nu t)=f(t).$$

The Fourier transform has all kinds of [properties](https://en.wikipedia.org/wiki/Fourier_transform#Properties_of_the_Fourier_transform) that make it worthwhile as a tool for analyzing functions[^notation]. Although it is obvious from the notation, it is very important to note that the Fourier Transform is continuous in time and in frequency. Thus it is sometimes also referred to as the Continuous Time Fourier Transform (CTFT). This is not what we use in signal processing, where we use the *discrete* Fourier Transform (DFT) of a finite number of discrete samples.

## The Discrete Fourier Transform (DFT)
This transform is what we are actually using in all kinds of signal processing. It is defined on a finite sequence $$f[n], n=0,1,\dots,N-1$$ with $$N$$ elements. At this point in the article just assume that the DFT has nothing to do with the FT. It just falls out of the sky as some kind of transformation applied to a finite sequence of numbers. Of course it is not a coincidence that I named the finite sequence $$f[n]$$, but at this point just assume it has nothing to do with the function $$f(t)$$ above[^dft_ft]. So the DFT of the sequence $$f[n], n=0,1,\dots,N-1$$ is defined as

$$F[k] := \mathcal{DFT}\{f[n]\}[k] = \sum_{n=0}^{N-1}f[n]\exp\left(-i\,\frac{2\pi}{N} k n\right),$$

which is an infinite discrete sequence of index $$k\in \mathbb{Z}$$. Note that the sequence is $$N$$-periodic in $$k$$, because of the exponential term. So the DFT is completely defined e.g. by its values on $$k=0,1,\dots,N-1$$, which is why we usually only give it on these values. The Inverse DFT (IDFT) is an operation that converts the DFT $$F[k],\, k=0,1,\dots,N-1$$ back to the original sequence:

$$f[n] = \mathcal{DFT}^{-1}\{F[k]\}[n] = \frac{1}{M}\sum_{k=0}^{N-1}F[k]\exp\left(i\,\frac{2\pi}{N} k n\right).$$

Again, see this as some transformation on sequences which is (yet) unrelated to the FT. It is just an [invertible transform](https://math.stackexchange.com/questions/3454134/simple-proof-of-inverse-discrete-fourier-transformation-idft) on finite sequences. It is worth noting that the sequence reproduced by the DFT is also $$N$$-periodic, whereas the original sequence was only given on $$n=0,1,\dots,N-1$$. We will understand in the course of the article how the DFT and the FT relate and what the reason for the periodicity is.

## The Fourier Series (FS / CTFS)
Before we dive into how the FT and the DFT relate, let's mention the Fourier Series (FS) for completeness. The Fourier Series lets us write periodic functions as a linear combination of plane waves. It is not absolutely vital for this article to understand the FS, but it is connected to both the FT and the DFT. Furthermore it is sometimes useful to write a periodic function as a Fourier Series to easier calculate its Fourier Transform.

Assume we have a periodic function $$g(t)$$ with period $$T$$, which means $$g(t+kT)=f(t)$$ for all $$k\in \mathbb{Z}$$. Any reasonably well behaved[^well_behaved] *periodic* function $$g(t)$$ can be expressed as a linear combination of plane waves with different frequencies:

$$g(t) = \sum_{n=-\infty}^{\infty}c_n \exp\left(i 2\pi \frac{n}{T}\right),$$

which is the Fourier Series of $$g$$ with the *Fourier coefficients*

$$c_n = \frac{1}{T} \int_{-\frac{T}{2}}^{\frac{T}{2}} \text{d}t \, g(t)\exp\left(-i 2\pi \frac{n}{T}\right), \, n \in \mathbb{Z} .$$

This series is applicable only to periodic functions which are *continuous* in time. This is why the FS is sometimes referred to as the Continuous Time Fourier Series (CTFS)[^ctfs_resource]. The series of Fourier coefficients $$c_n$$ is discrete but infinite. [Extending the period](https://en.wikipedia.org/wiki/Fourier_transform#Introduction) of the function to infinity is what gets us from the Fourier Coefficients to the Fourier Transform.


# Going Discrete
Now we'll have a look at how to get from the FT to the DFT. We'll do that by looking at the *continuous* FT of a sampled function, which  gives us the [Discrete Time Fourier Transform (DTFT)](https://cnx.org/contents/xkitXNix@1/Lecture-8-The-Discrete-Time-Fourier-Transform-DTFT). We'll use this variant of the Fourier Transform to make a little detour into the [Sampling Theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem) and related equations.

## Sampling
Sampling is related to an integral transformation of a continuous time signal. A useful mental model of sampling[^sampling] is that a "measured" function value at a given sampling point $$t_k$$ is given as an integral $$f_n = \int_{t_n -\epsilon}^{t_n + \epsilon} \text{d}t \,p(t-t_n)f(t)$$ in a neighborhood of $$t_n$$. Here $$p(t)$$ is some peak or impulse function. Let's now say we are sampling our function on infinitely many equidistant time points with sampling period $$\Delta T$$ such that $$t_n = n \cdot \Delta T, \, n\in \mathbb{Z}$$. Then our sampled function $$\hat{f}(t)$$ is given as the product of our function $$f(t)$$ with an infinitely periodic impulse train $$\sum_{n\in\mathbb{Z}} p(t-n\cdot \Delta T)$$. The integral is part of the measurement process and not of the sampled function.

The simplest conceivable sampling ([ideal sampling](https://www.tutorialspoint.com/signals_and_systems/signals_sampling_techniques.htm)) is when the impulse train $$III_{\Delta T}(t)$$ consists of infinitely narrow peaks[^peaks_convolve]

$$ III_{\Delta T}(t) = \sum_{n=-\infty}^{\infty} \delta(t-n\Delta T),$$

which is the [Dirac comb](https://en.wikipedia.org/wiki/Dirac_comb). Our sampled function $$\hat{f}(t)$$ is written as

$$\hat{f}(t) = f(t)\cdot III_{\Delta T}(t) = \sum_{n=-\infty}^{\infty} f(t)\delta(t-n\Delta T). \label{f_hat_sampling_def}$$

Although the sampled function looks like a collection of discrete values it is a continuous function, which is nonzero only at an infinite sequence of discrete points. Mathematically, it is the original function periodically superimposed with itself and multiplied with a periodic weighting function. This has profound implications for its Fourier Transform.

## The Fourier Transform of a Sampled Function
Now let's look at the FT of the function $$\hat{f}(t)$$ which is a sampling of $$f(t)$$ at an infinite number of discrete time points. The FT we are looking for is

$$\hat{F}(\nu) := \mathcal{F}\{\hat{f}(t)\}(\nu) = \int_{-\infty}^{\infty} \text{d}t\, \hat{f}(t)\exp(-i\, 2\pi \nu t).$$

There is two ways to express this FT of which one way will teach us about more about sampling, and the other one will lead us closer to the DFT. We'll take a slight detour to learn something about sampling and write:

$$\begin{eqnarray}
\hat{F}(\nu) &=& \mathcal{F}\{f(t)\cdot III_{\Delta T}(t)\}(\nu) \\
             &=& \mathcal{F}\{f(t)\}(\nu) \star \mathcal{F}\{III_{\Delta T}(t)\}(\nu) \\
             &=& \mathcal{F}\{f(t)\}(\nu) \star \frac{1}{\Delta T}III_{\frac{1}{\Delta T}}(\nu) \\
             &=& F(\nu) \star \frac{1}{\Delta T}III_{\frac{1}{\Delta T}}(\nu)
\end{eqnarray}$$

I have used the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem) and then the [FT of the Dirac](https://en.wikipedia.org/wiki/Dirac_comb#Fourier_transform) comb, which is again a Dirac comb[^conv_delta] with inverse periodicity. This leaves us with

$$\hat{F}(\nu) = \frac{1}{\Delta T}\sum_{n=-\infty}^{\infty} F(\nu-n\cdot \frac{1}{\Delta T}).$$

We can see that this is an infinite superposition of the Fourier transform of the continuous function. It is periodic in $$\nu$$-space with period $$1/\Delta T$$. Sampling in the time domain leads to this superposition in the Fourier domain (and vice versa). Figure 1 visualizes this connection between the Fourier Transforms of the continuous and the sampled function[^sampling_continouos].

<figure>
 <img src="/blog/images/fourier-dft/fourier-of-sampled.svg" alt="Visualization of the FT and DTFT" style="width:100%">
 <figcaption>Figure 1. <b>A</b> The continuous and bandlimited function f(t) is sampled with a Dirac comb with period &Delta;T. This is the sampling period. The sampled function is nonzero only at the sampling points. <span style="white-space: nowrap;"><b>B</b> Schematic</span> Fourier Transformation F(&nu;) of the continuous function f(t). Since the function is bandlimited, the Fourier Transform is nonzero only in a finite interval [-&nu;<sub>max </sub>,&nu;<sub>max</sub>].  <span style="white-space: nowrap;"><b>C</b> Schematic</span> Fourier Transform of the sampled function. It is a periodic sum of the Fourier Transform of the continuous function with period 1/&Delta;T. If the Nyquist sampling criterion is satisfied, then the copies of the Fourier Transform will not overlap. Otherwise they will overlap and lead to aliasing. </figcaption>
</figure>

### The Sampling Theorem

From Figure 1 we learn that if a function is bandlimited[^bandlimited] in such a way that the individual Fourier Transforms $$F(\nu)$$ do not overlap in $$\hat{F}(\nu)$$, then we can obtain the original Fourier Transform by clipping $$\hat{F}(\nu)$$. We just have to clip one period, e.g. in the interval $$\left[-\frac{1}{2} \frac{1}{\Delta T}, \frac{1}{2} \frac{1}{\Delta T}\right]$$. This yields the original Fourier Transform and thus a way to reconstruct the original, *non-sampled* function $$f(t)$$. We'll do that in a more formal way in a moment, but we'll first have a quick look at what the non-overlapping condition implies. Formally it is stated as

$$\frac{1}{\Delta T} > 2 \nu_{max}$$

and it means the sampling *frequency* (inverse of the sampling period) must be greater than twice the maximum frequency in the signal. Only then are we able to reconstruct a continuos function from a sampled version, because no information is lost or distorted. This is the famous [Nyquist-Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem).

### The Whittaker-Shannon Interpolation Formula
!!!!!!!!!TODO ADD THIS SECTION ON INVERTING THAT!!!!!!!!!

IE Inverse FT of sampled! Whittaker Shannon interpolation formula https://en.wikipedia.org/wiki/Whittaker%E2%80%93Shannon_interpolation_formula

## The Discrete Time Fourier Transform (DTFT) and the Discrete Fourier Transform (DFT)
This concludes our little detour into the sampling theorem and interpolation. Let's now revisit the Fourier Transform of a sampled function !!EQUATION!! and write it in an alternative way using the original definition of the Fourier Transform.

$$\begin{eqnarray}
\hat{F}(\nu) &=& \mathcal{F}\{\hat{f}(t)\} = \int_{-\infty}^{\infty}\text{d}t\,\hat{f}(t)\exp\left(-i\,2\pi \nu t\right)\\
             &=& \int_{-\infty}^{\infty}\text{d}t\,\left(f(t) \sum_{n=-\infty}^{\infty} \delta(t-n\cdot \delta T) \right) \exp\left(-i\,2\pi \nu t\right) \\
             &=&  \sum_{n=-\infty}^{\infty}  \int_{-\infty}^{\infty}\text{d}t\, f(t) \exp\left(-i\,2\pi \nu t\right) \delta(t-n\cdot \Delta T) \\
             &=& \sum_{n=-\infty}^{\infty} f(n\cdot \Delta T) \exp\left(-i\,2\pi \nu n \cdot \Delta T\right)
\end{eqnarray}$$

The infinite sum expression is called the *Discrete Time Fourier Transform* (DTFT) and it is a function that takes function values at infinitely many discrete time points and transforms them to a function that is continuous in frequency. This is already getting us close to the DFT, but not quite there. We the time sequence to be finite and furthermore we also want discrete frequencies. Let's tackle the problem of discrete frequecies first. From !!EQUATION!! we already know that the DTFT is periodic in $$\nu$$ with period $$1/\Delta T$$, so we only have to sample one period of it. We could sample the period $$\left[-\frac{1}{2} \frac{1}{\Delta T}, \frac{1}{2} \frac{1}{\Delta T}\right)$$, but for notational convenience one usually samples the period $$[0,1/\Delta T)$$. So we will also do that here. It is important to remember that we sampled two adjacent half periods with the zero frequency at the first index[^dft_ordering], as seen in Figure 2.

<figure>
 <img src="/blog/images/fourier-dft/sampling-fourier.svg" alt="Sampling the DTFT" style="width:100%">
 <figcaption>Figure 2. Sampling one period of the periodic DTFT. We uniformly sample two adjacent half periods of the DTFT in the Interval [0,&Delta;T<sup>-1</sup>). The zero frequency component is at index 0 followed by the positive frequency components up to the Nyquist frequency 0.5 &Delta;T<sup>-1</sup> and finally the negative frequency components in reverse order.</figcaption>
</figure>

This sampling is the reason for the [layout of the FFT frequecies](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029), which are so often a source of confusion. We uniformly sample the interval $$[0,1/\Delta T)$$ at $$M$$ points using the discrete frequencies $$\nu_m$$ with

$$\nu_m = \frac{m}{M} \frac{1}{\Delta T},\, m=0,1,\dots,M-1.$$

Now we switch to sequence notation using

$$\begin{eqnarray}
\hat{F}[m] &:=& \hat{F}(\nu_m) = \hat{F}\left(\frac{m}{M} \frac{1}{\Delta T}\right) \,m=0,1,\dots,M-1\\
      f[n] &:=& f(n\cdot \Delta T), \, n \in \mathbb{Z} \label{sequence_f_and_function_f_t}
\end{eqnarray}$$

Note that the first sequence is of finite length, but the second one is still infinite. Now let's look at $$\hat{F}[m]$$ again:

$$\hat{F}[m] = \sum_{n=-\infty}^{\infty} f[n]\exp\left(-i\,\frac{2\pi}{M}mn\right).$$

We can see that the exponential term in the series is $$M$$ periodic in both $$m$$ and $$n$$. We now rearrange the series using a nifty little trick. For any suitable[^sum_convergence] series we can rearrange the infinite sum as an infinite sum of finite sums of-sub sequences[^sum_subranges]. We'll use that trick here and sum over sub-sequences of length $$M$$:

$$\begin{eqnarray}
\hat{F}[m] &=& \sum_{k=-\infty}^{\infty} \sum_{n=0}^{M-1} f[n-kM]\exp\left(-i\,\frac{2\pi}{M}mn + i\,2\pi k\right) \\
           &=& \sum_{k=-\infty}^{\infty} \sum_{n=0}^{M-1} f[n-kM]\exp\left(-i\,\frac{2\pi}{M}mn\right) \\
           &=& \sum_{n=0}^{M-1} \left(\sum_{k=-\infty}^{\infty} f[n-kM]\right) \exp\left(-i\,\frac{2\pi}{M}mn\right)\\
           &=& \sum_{n=0}^{M-1} \tilde{f}[n] \exp\left(-i\,\frac{2\pi}{M}mn\right) \label{DFT_from_DTFT} \\
           &=& \mathcal{DFT}\{\tilde{f}[n]\}[m] \label{DFT_and_DTFT}\\
           \text{with } \tilde{f}[n] &:=& \sum_{k=-\infty}^{\infty} f[n-kM] , n \in \mathbb{Z} \label{f_tilde_sequence_def}  \\
\end{eqnarray}$$

So in equation $$\eqref{DFT_from_DTFT}$$ we have reproduced our DFT expression, but we had to define a new sequence $$\tilde{f}[n]$$, which is clearly related to the sequence $$f[n]$$ of function values but is not quite the same. The key to understanding what the DFT really computes is understanding this new sequence.

## What the DFT Really Computes
So now for the final piece of the puzzle, where the answer to [this question](https://dsp.stackexchange.com/questions/72231/how-is-the-dtft-of-a-periodic-sampled-signal-linked-to-the-dft) on [dsp.stackexchange](https://dsp.stackexchange.com/) really helped me overcome a mental block I had. From equation $$\eqref{f_tilde_sequence_def}$$ we see that the sequence $$\tilde{f}[n]$$ is $$M$$-periodic in $$n$$, i.e. $$\tilde{f}[n+lM]=\tilde{f}[n],\, l\in \mathbb{Z}$$. So the DFT of this *periodized* sequence is related to the values of the Fourier Transform of the function $$f(t)$$ via the equations we derived above. But how is the periodized sequence related to the function values? Well, of course by equation $$\tilde{f_tilde_sequence_def}$$, but that is an infinite sum and does not really help us, or does it? Let's take one step back.

In we sample a function in reality, we are not really sampling by equation $$\eqref{f_hat_sampling_def}$$. Apart from the fact that we are not sampling ideally, the key fact here is that we are not sampling infinitely many points. We are only sampling $$f(t)$$ on an interval. That means we are *always implicitly* multiplying the function with a rectangular windowing function $$W_T(t)$$ that sets the function values outside this window to zero

$$W_T(t) = \begin{cases}
    1,& \text{if } t \in [0,T] \\
    0,              & \text{else}
\end{cases}.$$

So actually we could have written our sampled and windowed function as

$$\hat{f}^{\prime}(t) := \hat{f}(t)\cdot W_T(t) =   W_T(t)\cdot f(t) \cdot III_{\Delta T}.$$

If we sample M samples using a sampling interval

$$\Delta T = \frac{T}{M},$$

If we now let $$f[n]$$ describe the values of the windowed function, instead of the function itself, then we have

$$f[n] = W_T(n\cdot\Delta T) f(n\cdot \Delta t),$$

for which we have $$f[n]=0 \,\forall\, n \not\in [0,M-1]$$. The sequence $$\tilde{f}[n]$$ for this windowed function values is just the infinite repetition of the sequence values in $$[0,M-1]$$, where the $$f[n]$$ are the function values at the sample points. This is what the DFT really computes. The DFT computes the values of the Fourier Transform of a *windowed* function. The rectangular windowing is always implicit in the DFT, because of the finite sampling. We can see the effects of windowing on the computed Fourier Transform by repeating the calculations in !!!EQUATION!!! while including a window function. I won't repeat the calculations here, but for a rectangular window our DTFT will be folded with a $$sinc$$ function. We can [modify the window function](https://www.edn.com/windowing-functions-improve-fft-results-part-ii/) by multiplying the samples with an extra windowing function, but we can never get rid of the windowing itself. It is inherent in our finite sampling interval. See also the famous paper by Albert Nuttall [Nuttall1981].



# Literature
[Gonzalez2018] Gonzalez, RC, Woods, RE. 2018.  *Digital Image Processing*. (4<sup>th</sup> Edition). Pearson.

[Langton2019] Langton, C, Levin, V. 2019. *Intuitive Guide to Fourier Analysis and Spectral Estimation*. (2<sup>nd</sup> Edition). Mountcastle Academic.

[Nuttall1981] Nuttall, A. 1981. *Some windows with very good sidelobe behavior*. IEEE Transactions on Acoustics, Speech, and Signal Processing. [doi: 10.1109/TASSP.1981.1163506](https://ieeexplore.ieee.org/document/1163506).
# Endnotes
[^sum_subranges]: Specifically $$\sum_{k=-\infty}^{\infty} a[k]= \sum_{k=-\infty}^{\infty} \sum_{l=0}^{L-1} a[l-kL]$$ for any suitable infinite series. Think of this like splitting a `for` loop over one running index into two for loops over two indices total, just like accessing a 2D array.
[^sum_convergence]: Convergence of infinite series is [its own beast](https://math.stackexchange.com/questions/357224/absolutely-convergent-series-and-conditionally-convergent-series-rearrangement). I won't bother with the details and assume the conditions are fulfilled for what I am doing.
[^dft_ordering]: [FFTW](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) explains it nicely: "[That means that the] positive frequencies are stored in the first half of the output and the negative frequencies are stored in backwards order in the second half of the output".
[^bandlimited]: A bandlimited function has a FT that is nonzero only on a finite interval. In general, functions that are finite in time can be bandlimited in frequency, so this fact will always induce an amount of aliasing. A notable exceptions are bandlimited functions that are also periodic, provided that the finite time interval encompasses an integer amount of periods.
[^sampling_continouos]: Make no mistake, the sampled function is still continuous but it is nonzero only on an infinite, discrete sequence of sampled time points.
[^conv_delta]: Also not that the *convolution* of a function $$g(t)$$ with the delta distribution $$\delta(t-t_0)$$ is $$g(t) \star \delta(t-t_0) = g(t-t_0)$$. Do not confuse the convolution with the delta function with the [sifting property](https://mathworld.wolfram.com/SiftingProperty.html).
[^peaks_convolve]: If we want to sample with another function with finite width, we just have to convolve the dirac comb with an appropriate peak. This, of course, has consequences in Fourier space, see the [Convolution Theorem](https://en.wikipedia.org/wiki/Convolution_theorem).
[^dft_ft]: Of course the DFT and the FT are related and so are $$f(t)$$ and $$f[n]$$, but the whole point of this article is to show how exactly they are related.
[^ctfs_resource]: See [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/06%3A_Continuous_Time_Fourier_Series_(CTFS)/6.02%3A_Continuous_Time_Fourier_Series_(CTFS)) for a nice resource on the CTFS and its properties.
[^FFT]: In image processing we commonly use the [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) which just a fast implementation of the DFT.
[^math_rigor]: For example, I won't be bothered with checking if reordering integrals, partial derivatives, sums  etc. is one hundred percent mathematically sound. I also won't not bother with stating convergence criteria for integrals, series and such.
[^well_behaved]: See, this is what I meant when I said I'll use math like a physicist.
[^notation]: I'll stick to the definition of the Fourier transform where I write out $$2\pi\nu$$ instead of absorbing that into the circular frequency $$\omega$$. The reason is that the discrete Fourier Transform (DFT) library [FFTW](www.fftw.org) also uses [this notation](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) and that allows me to re-use equations directly without having to worry about $$2\pi$$ factors.
[^sampling]: For additional information on sampling see e.g. [here](https://dsp.stackexchange.com/questions/13563/why-is-dirac-delta-used-in-continuous-signal-sampling), [here](https://dsp.stackexchange.com/questions/2948/sampling-of-a-continuous-function-kroneckers-or-diracs-delta), and [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/10%3A_Sampling_and_Reconstruction). Also [here](http://mmust.elimu.net/BSC(ELEC_COMM)/Year_4/ECE%20421_Comm_Systems_II/Signal_Digitization/Sampling/Sampling_Techniques.htm).
[^weights_decay]: Here we assume that the weights decay so rapidly that there is no overlap between weighting functions of adjacent samples.
