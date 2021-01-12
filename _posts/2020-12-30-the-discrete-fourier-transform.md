---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2020-12-30
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Back to Basics: The (Discrete) Fourier Transform'
comments_id: 19
---

I have extensively worked with the Fourier transform and the DFT but never really taken the time to understand how these two things are truly connected and how that connection explains some of the properties of the DFT. In this article I explore this connection with the aim of answering one question: what does the DFT actually compute?

I have based this article on [Gonzalez2018], [Langton2019] and countless pieces of valuable information collected from the internet and linked within this article. And a final disclaimer before we dive in: I will try to be precise in my notation, but I will be using math like a physicist[^math_rigor].

# Motivation and Goal
I have often used formulas that were derived by using the Fourier Transform and applied them to image processing using the Discrete Fourier Transform[^FFT]. This is often fine, but it can lead to [surprising results](http://www.nrbook.com/a/bookcpdf/c13-1.pdf) if one is not paying attention to the properties of the Discrete Fourier Transform. The whole post is concerned with this one question: what does the Discrete Fourier Transform actually compute and how does it relate to the continuous Fourier Transform?

# I. The Three Big Fouriers

## The Fourier Transform (FT / CTFT)
Given any function $$f(t)$$, which does not need to be periodic, with $$f:\mathbb{R}\rightarrow \mathbb{C}$$, we can define its [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) (FT) as

$$F(\nu) := \mathcal{F}\left\{f(t)\right\}(\nu) =  \int_{-\infty}^{\infty} \text{d}t \, f(t) \exp(-i\, 2\pi\nu t) .$$

I'll use $$t$$ as a time and consequently refer to $$\nu$$ as a frequency just for convenience. The FT of a function can be inverted and inverse Fourier Transform (IFT) is given as

$$ \mathcal{F}^{-1}\left\{F(\nu)\right\}(t) = \int_{-\infty}^{\infty} \text{d}\nu \, F(\nu) \exp(i\, 2\pi\nu t)=f(t).$$

The Fourier transform has [all kinds of properties](https://en.wikipedia.org/wiki/Fourier_transform#Properties_of_the_Fourier_transform) that make it worthwhile as a tool for signal analysis[^notation]. Although it is obvious from the notation, it is important to note that the Fourier Transform is continuous in time and in frequency. Thus it is sometimes also referred to as the Continuous Time Fourier Transform (CTFT). This is not what we use in signal processing, where we use the *Discrete* Fourier Transform (DFT) of a finite number of discrete samples.

## The Discrete Fourier Transform (DFT)
This is the transform that we are actually using in all kinds of signal processing. It is defined for a finite sequence $$f[n], n=0,1,\dots,N-1$$ with $$N$$ elements. At this point in the article just assume that the DFT has nothing to do with the FT. It just falls out of the sky as some kind of transformation applied to a finite sequence of numbers. Of course it is not a coincidence that I named the finite sequence $$f[n]$$, but at this point just assume it has nothing to do with the function $$f(t)$$ above[^dft_ft]. So the DFT of the sequence $$f[n], n=0,1,\dots,N-1$$ is defined as

$$F[k] := \mathcal{DFT}\{f[n]\}[k] = \sum_{n=0}^{N-1}f[n]\exp\left(-i\,\frac{2\pi}{N} k n\right),$$

which is an infinite sequence with index $$k\in \mathbb{Z}$$. Note that the sequence is $$N$$-periodic in $$k$$, because of the exponential term. So the DFT is completely defined e.g. by its values on $$k=0,1,\dots,N-1$$, which is why we usually only give it on these values. The Inverse DFT (IDFT) is an operation that converts the DFT $$F[k],\, k=0,1,\dots,N-1$$ back to the original sequence:

$$f[n] = \mathcal{DFT}^{-1}\{F[k]\}[n] = \frac{1}{N}\sum_{k=0}^{N-1}F[k]\exp\left(i\,\frac{2\pi}{N} k n\right).$$

Again, view this as some transformation on sequences which is (yet) unrelated to the FT. It is just an [invertible transform](https://math.stackexchange.com/questions/3454134/simple-proof-of-inverse-discrete-fourier-transformation-idft) on finite sequences. It is worth noting that the sequence reproduced by the DFT is also $$N$$-periodic, whereas the original sequence was only given on $$n=0,1,\dots,N-1$$. We will understand in the course of the article how the DFT and the FT relate and what the reason for the periodicity is.

## The Fourier Series (FS / CTFS)
Before we go on, I'll mention the Fourier Series (FS) for completeness. The Fourier Series lets us write periodic functions as a linear combination of plane waves. It is not absolutely vital for this article to understand the FS, but it is connected to both the FT and the DFT. Furthermore it is sometimes useful to write a periodic function as a Fourier Series to easier calculate its Fourier Transform.

Assume we have a periodic function $$g(t)$$ with period $$T$$, which means $$g(t+kT)=g(t)$$ for all $$k\in \mathbb{Z}$$. Any reasonably well behaved *periodic* function $$g(t)$$ can be expressed as a linear combination of plane waves with different frequencies[^well_behaved]:

$$g(t) = \sum_{n\in\mathbb{Z}}c_n \exp\left(i 2\pi \frac{n}{T}\right),$$

which is the Fourier Series of $$g(t)$$ with the *Fourier coefficients*

$$c_n = \frac{1}{T} \int_{-\frac{T}{2}}^{\frac{T}{2}} \text{d}t \, g(t)\exp\left(-i 2\pi \frac{n}{T}\right), \, n \in \mathbb{Z} .$$

This series is applicable only to periodic functions which are *continuous* in time. This is why the FS is sometimes referred to as the Continuous Time Fourier Series (CTFS)[^ctfs_resource]. The series of Fourier coefficients $$c_n$$ is discrete but infinite. [Extending the period](https://en.wikipedia.org/wiki/Fourier_transform#Introduction) of the function to infinity is what gets us from the Fourier Coefficients to the Fourier Transform.


# II. The Connections
Now let's have a look at how to get from the FT to the DFT. We'll do that by calculating the *continuous* FT of a sampled function, which  gives us the [Discrete Time Fourier Transform (DTFT)](https://cnx.org/contents/xkitXNix@1/Lecture-8-The-Discrete-Time-Fourier-Transform-DTFT). We'll use this variant of the Fourier Transform to make a little detour into the [Sampling Theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem) and related equations.

## Sampling
Sampling is related to an integral transformation of a continuous time signal[^sampling]. A useful mental model of sampling is that a "measured" function value at a given sampling point $$t_k$$ is given as an integral $$f_n = \int_{t_n -\epsilon}^{t_n + \epsilon} \text{d}t \,p(t-t_n)f(t)$$ in a neighborhood of $$t_n$$. Here $$p(t)$$ is some peak or impulse function. Let's now say we are sampling our function on infinitely many equidistant time points with sampling period $$\Delta\! T$$ such that $$t_n = n \Delta\! T, \, n\in \mathbb{Z}$$. Then our sampled function $$\widehat{f}(t)$$ is given as the product of our function $$f(t)$$ with an infinitely long, periodic impulse train $$\sum_{n\in\mathbb{Z}} p(t-n \Delta\! T)$$. The integral is part of the measurement process and not of the sampled function.

The simplest conceivable sampling ([ideal sampling](https://www.tutorialspoint.com/signals_and_systems/signals_sampling_techniques.htm)) is when the impulse train $$III_{\Delta\! T}(t)$$ consists of infinitely narrow peaks[^peaks_convolve]

$$ III_{\Delta\! T}(t) = \sum_{n\in\mathbb{Z}} \delta(t-n\Delta\! T),$$

which is the [Dirac comb](https://en.wikipedia.org/wiki/Dirac_comb). Our sampled function $$\widehat{f}(t)$$ is written as

$$\widehat{f}(t) = f(t)\cdot III_{\Delta\! T}(t) = \sum_{n\in\mathbb{Z}} f(t)\delta(t-n\cdot\Delta\! T). \label{f_hat_sampling_def}\tag{1}$$

Although the sampled function might look like a collection of discrete values, it is a continuous function, which is nonzero only at an infinite sequence of discrete points. Mathematically, it is the original function periodically superimposed with itself and multiplied with a weighting function. This has profound implications for its Fourier Transform.

## The Fourier Transform of a Sampled Function
Now let's look at the FT of the function $$\widehat{f}(t)$$ which is a sampling of $$f(t)$$ at an infinite number of discrete time points. The FT we are looking for is

$$\widehat{F}(\nu) := \mathcal{F}\{\widehat{f}(t)\}(\nu) = \int_{-\infty}^{\infty} \text{d}t\, \widehat{f}(t)\exp(-i\, 2\pi \nu t).$$

There is two ways to express this FT. One way will lead us closer to the DFT, while the other will teach us about sampling and the properties of the FT of a sampled function. We'll take the latter way now and come back to the other way in due time.

$$\begin{eqnarray}
\widehat{F}(\nu) &=& \mathcal{F}\{f(t)\cdot III_{\Delta\! T}(t)\}(\nu) \label{Fourier_of_Sampled_Calc}\tag{2}\\
             &=& \mathcal{F}\{f(t)\}(\nu) \star \mathcal{F}\{III_{\Delta\! T}(t)\}(\nu) \\
             &=& \mathcal{F}\{f(t)\}(\nu) \star \frac{1}{\Delta\! T}III_{\frac{1}{\Delta\! T}}(\nu) \\
             &=& F(\nu) \star \frac{1}{\Delta\! T}III_{\frac{1}{\Delta\! T}}(\nu).
\end{eqnarray}$$

I have used the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem) and then the [FT of the Dirac](https://en.wikipedia.org/wiki/Dirac_comb#Fourier_transform) comb, which is again a Dirac comb with inverse periodicity[^dirac_conv]. This leaves us with

$$\widehat{F}(\nu) = \frac{1}{\Delta\! T}\sum_{n\in\mathbb{Z}} F(\nu-n\cdot \frac{1}{\Delta\! T}). \label{Fourier_of_Sampled}\tag{3}$$

We can see that this is an infinite superposition of the Fourier transform of the continuous function. It is periodic in $$\nu$$-space with period $$1\over\Delta\! T$$. Sampling in the time domain leads to this periodic superposition in the Fourier domain (and vice versa). Figure 1 visualizes this connection between the Fourier Transforms of the continuous and the sampled function[^sampling_continouos].

<figure>
 <img src="/blog/images/fourier-dft/fourier-of-sampled.svg" alt="Visualization of the FT and DTFT" style="width:100%">
 <figcaption>Figure 1. <b>A</b> The continuous and bandlimited function f(t) is sampled with a Dirac comb with period &Delta;T. This is the sampling period. The sampled function is nonzero only at the sampling points. <span style="white-space: nowrap;"><b>B</b> Schematic</span> Fourier Transformation F(&nu;) of the continuous function f(t). Since the function is bandlimited, the Fourier Transform is nonzero only in a finite interval [-&nu;<sub>max </sub>,&nu;<sub>max</sub>].  <span style="white-space: nowrap;"><b>C</b> Schematic</span> Fourier Transform of the sampled function. It is a periodic superposition of the Fourier Transform of the continuous function with period 1/&Delta;T. If the Nyquist sampling criterion is satisfied, then the copies of the Fourier Transform will not overlap. Otherwise they will overlap and lead to aliasing. </figcaption>
</figure>

### The Sampling Theorem

From Figure 1 we learn that if a function is bandlimited in such a way that the individual Fourier Transforms $$F(\nu)$$ do not overlap in $$\widehat{F}(\nu)$$, then we can obtain the original Fourier Transform by clipping $$\widehat{F}(\nu)$$[^bandlimited] . We just have to clip one period, e.g. in the interval $$\left[-\frac{1}{2} \frac{1}{\Delta\! T}, \frac{1}{2} \frac{1}{\Delta\! T}\right]$$. This yields the original Fourier Transform and thus a way to reconstruct the original, *non-sampled* function $$f(t)$$. We'll do that in a more formal way in a moment, but we'll first have a quick look at what the non-overlapping condition implies. Formally it is stated as

$$\frac{1}{\Delta\! T} > 2 \nu_{max} \label{Nyquist_Shannon}\tag{4}$$

and it means the sampling *frequency* (inverse of the sampling period) must be greater than twice the maximum frequency in the signal. Only then are we able to reconstruct a continuos function from a sampled version, because no information is lost or distorted. This is the famous [Nyquist-Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem).

### The Whittaker-Shannon Interpolation Formula
Above we saw that we can reconstruct a bandlimited function $$f(t)$$ by clipping one period from $$\widehat{F}(\nu)$$ if we sampled in accordance with equation $$\eqref{Nyquist_Shannon}$$ . We can see from equation $$\eqref{Fourier_of_Sampled}$$ that we have to multiply by $$\Delta\! T$$ and clip e.g. the interval $$[-\frac{1}{2}\frac{1}{\Delta\! T},\frac{1}{2}\frac{1}{\Delta\! T}]$$. To obtain the original function from this clipped $$\widehat{F}(\nu)$$ we have to apply an inverse Fourier Transform. In more formal terms

$$f(t) = \mathcal{F}^{-1}\left\{\Delta\! T \cdot \Pi(\nu\, \Delta\! T\ ) \widehat{F}(\nu)\right\}(t),$$

where $$\Pi(\nu)$$ is the [rectangular function](https://en.wikipedia.org/wiki/Rectangular_function). Let's use the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem) and write

$$\begin{eqnarray}
f(t) &=& \Delta\! T \cdot \mathcal{F}^{-1}\left\{\Pi(\nu\, \Delta\! T)\right\}(t) \star \mathcal{F}^{-1}\left\{\widehat{F}(\nu)\right\}(t) \\
     &=& \text{sinc}\left(\frac{t}{\Delta\! T}\right) \star \widehat{f}(t) \\
     &=& \text{sinc}\left(\frac{t}{\Delta\! T}\right) \star \sum_{n\in\mathbb{Z}}f(t)\delta(t-n \Delta\! T) \\
     &=& \sum_{n\in\mathbb{Z}} f(n \Delta\! T) \, \text{sinc}\left(\frac{t-n \Delta\! T}{\Delta\!T}\right),
\end{eqnarray}$$

where we have used that the FT of the rectangular function is a [*normalized* sinc function](https://en.wikipedia.org/wiki/Sinc_function) $$\text{sinc}(t)=\sin(\pi t)/(\pi t)$$ and the [scaling property](https://www.thefouriertransform.com/transform/properties.php) of the FT. The result which we arrived at is the [Whittaker-Shannon interpolation formula](https://en.wikipedia.org/wiki/Whittaker%E2%80%93Shannon_interpolation_formula). A bandlimited function can be reconstructed from infinitely many samples by interpolating with a $$\text{sinc}$$-kernel, if we have respected the sampling theorem. This theorem concludes our little detour and we will get back on track on how to relate the DFT with our sampled function now.

## The Discrete Time Fourier Transform (DTFT) and the Discrete Fourier Transform (DFT)
Let's revisit the Fourier Transform of a sampled function and write it in an alternative way using the original definition of the Fourier Transform.

$$\begin{eqnarray}
\widehat{F}(\nu) &=& \mathcal{F}\{\widehat{f}(t)\} = \int_{-\infty}^{\infty}\text{d}t\,\widehat{f}(t)\exp\left(-i\,2\pi \nu t\right)\\
             &=& \int_{-\infty}^{\infty}\text{d}t\,\left(f(t) \sum_{n\in\mathbb{Z}} \delta(t-n \Delta\! T) \right) \exp\left(-i\,2\pi \nu t\right) \\
             &=&  \sum_{n\in\mathbb{Z}}  \int_{-\infty}^{\infty}\text{d}t\, f(t) \exp\left(-i\,2\pi \nu t\right) \delta(t-n \Delta\! T) \\
             &=& \sum_{n\in\mathbb{Z}} f(n \Delta\! T) \exp\left(-i\,2\pi \nu n \Delta\! T\right)
\end{eqnarray}$$

This expression is called the *Discrete Time Fourier Transform* (DTFT) and it is a function that takes an infinite sequence of sampled function values and transforms them to a function that is continuous in frequency. This is already getting us close to the DFT, but not quite there. We would want both the time and the frequency to be a finite number of samples. Let's tackle the problem of discrete frequecies first. From equation $$\eqref{Fourier_of_Sampled}$$ we already know that the DTFT is periodic in $$\nu$$ with period $$1\over\Delta\! T$$, so that we only have to sample one period of it. We could sample the period $$\left[-\frac{1}{2} \frac{1}{\Delta\! T}, \frac{1}{2} \frac{1}{\Delta\! T}\right)$$, but for notational convenience one usually samples the period $$[0,\frac{1}{\Delta\! T})$$. We will also do that here. Note that by doing so, we sample two adjacent half periods with the zero frequency at the first index, as seen in Figure 2.

<figure>
 <img src="/blog/images/fourier-dft/sampling-fourier.svg" alt="Sampling the DTFT" style="width:100%">
 <figcaption>Figure 2. Sampling one period of the periodic DTFT. We uniformly sample two adjacent half periods of the DTFT in the Interval [0,&Delta;T<sup>-1</sup>). The zero frequency component is at index 0 followed by the positive frequency components up to the Nyquist frequency 0.5 &Delta;T<sup>-1</sup> and finally the negative frequency components in reverse order.</figcaption>
</figure>

This way of sampling is the reason for the [common layout of the FFT frequecies](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029), which are so often a source of confusion. We uniformly sample the interval $$[0,\frac{1}{\Delta\! T})$$ at $$N$$ points using the discrete frequencies $$\nu_k$$ with

$$\nu_k = \frac{k}{N} \frac{1}{\Delta\! T},\, k=0,1,\dots,N-1.$$

Now we switch to sequence notation using

$$\begin{eqnarray}
\widehat{F}[k] &:=& \widehat{F}(\nu_k) = \widehat{F}\left(\frac{k}{N} \frac{1}{\Delta\! T}\right) \,k=0,1,\dots,N-1 \label{Sequence_F_and_Function_F} \tag{5}\\
      f[n] &:=& f(n \Delta\! T), \, n \in \mathbb{Z} \label{sequence_f_and_function_f_t} \tag{6}
\end{eqnarray}$$

Note that the first sequence is of finite length, but the second one is still infinite. Now let's look at $$\widehat{F}[k]$$ again:

$$\widehat{F}[k] = \sum_{n\in\mathbb{Z}} f[n]\exp\left(-i\,\frac{2\pi}{N}kn\right).$$

We can see that the exponential term in the series is $$N$$-periodic in both $$k$$ and $$n$$. Next, we rearrange the series using a nifty little trick. For any suitable series we can rearrange the infinite sum as an infinite sum of finite sums[^sum_convergence]<sup>,</sup>[^sum_subranges]. We'll use that trick here and sum over sub-sequences of length $$N$$:

$$\begin{eqnarray}
\widehat{F}[k] &=& \sum_{l\in\mathbb{Z}} \sum_{n=0}^{N-1} f[n-lN]\exp\left(-i\,\frac{2\pi}{N}kn + i\,2\pi lk\right) \\
           &=& \sum_{l\in\mathbb{Z}} \sum_{n=0}^{N-1} f[n-lN]\exp\left(-i\,\frac{2\pi}{N}kn\right) \\
           &=& \sum_{n=0}^{N-1} \left(\sum_{l\in\mathbb{Z}} f[n-lN]\right) \exp\left(-i\,\frac{2\pi}{N}kn\right)\\
           &=& \sum_{n=0}^{N-1} \widetilde{f}[n] \exp\left(-i\,\frac{2\pi}{N}kn\right) \label{DFT_from_DTFT} \tag{7} \\
           &=& \mathcal{DFT}\{\widetilde{f}[n]\}[k] \label{DFT_and_DTFT} \tag{8}\\
           \text{with } \widetilde{f}[n] &:=& \sum_{l \in \mathbb{Z}} f[n-lN] , n \in \mathbb{Z} \label{f_tilde_sequence_def} \tag{9} \\
\end{eqnarray}$$

So in equation $$\eqref{DFT_from_DTFT}$$ we have reproduced our DFT expression, but we had to define a new sequence $$\widetilde{f}[n]$$, which is clearly related to the sequence of function values $$f[n]$$ but is not the same. The key to understanding what the DFT really computes is understanding this new sequence.

## What the DFT Actually Computes
Now for the final piece of the puzzle[^dsp_answer]. From equation $$\eqref{f_tilde_sequence_def}$$ we know that the sequence $$\widetilde{f}[n]$$ is $$N$$-periodic in $$n$$, i.e. $$\widetilde{f}[n+mN]=\widetilde{f}[n],\, m\in \mathbb{Z}$$. The DFT of this *periodized* sequence (eq. $$\eqref{DFT_and_DTFT}$$) is related to the values of the Fourier Transform of the function $$f(t)$$ via equations $$\eqref{Sequence_F_and_Function_F}$$ and $$\eqref{Fourier_of_Sampled}$$. But how is the periodized sequence, also called [periodic summation](https://en.wikipedia.org/wiki/Periodic_summation), related to the function values? Well, by equation $$\eqref{f_tilde_sequence_def}$$ of course, but that is an infinite sum and does not really help us, or does it? Let's take one step back.

What if we were windowing $$f(t)$$ by making it go to zero outside the interval $$t\in[0,T)$$[^windowing_constant]? This would enable us to describe our function values using only a finite sequence. Lets call our windowing function

$$W_T(t) = \Pi\left(\frac{t-\frac{T}{2}}{T}\right) \cdot w(t)= \begin{cases}
    w(t),& \text{if } t \in [0,T) \\
    0,              & \text{else.}
\end{cases}$$

The simplest windowing function is of course the rectangular function with $$w(t)=1$$. The rectangular window *is implicit in any sampling* due to the finite length of the sampling. We can write the sampled window values as

$$w[n] := W_T(n \Delta\! T), \text{ where } w[n] = 0 \, \forall \, n \not\in [0,N-1].$$

Lets denote with $$\widehat{f^{(w)}}(t)$$ the sampled and windowed version of our function $$f(t)$$:

$$\widehat{f^{(w)}}(t)= f(t)\cdot III_{\Delta\! T}(t)  \cdot W_T(t) = \widehat{f}(t)\cdot W_T(t).$$

We sample the function in such a way that $$t_n=n \Delta\! T \in [0,T)$$ with $$n=0,1,\dots,N-1$$. Then the discrete sequence corresponding to the function values of the sampled and windowed function is

$$f^{(w)}[n] := \widehat{f^{(w)}}(n\Delta\!T) = f[n] \, w[n] = \begin{cases}
    w(n \Delta\! T)\cdot f(n \Delta\! T),& \text{if } n \in [0,N-1] \\
    0,              & \text{else.}
\end{cases}$$

Now the periodized version of this sequence is

$$\widetilde{f^{(w)}}[n]=\sum_{l\in \mathbb{Z}}f^{(w)}[n-lN] = f[n \text{ mod } N] \cdot w[n \text{ mod } N], \, n \in \mathbb{Z}$$

which is just the sequence of weighted function values inside the window repeated *ad infinitum*. In analogy to equation $$\eqref{DFT_and_DTFT}$$ we have

$$\begin{eqnarray}
F^{(w)}[k] &=& \mathcal{DFT}\left\{\widetilde{f^{(w)}}[n]\right\} \\
           &=&\sum_{n=0}^{N-1}w[n] \,f[n]\exp\left(-i\,\frac{2\pi}{N} kn\right) \\
           &=& \mathcal{DFT}\left\{(w\cdot f)[n]\right\}
\end{eqnarray}$$

This periodic extension is the reason for the periodicity of the DFT. It is not the sequence of windowed function values that is periodic. The periodicity arises from the fact that the periodized version of a windowed infinite sequence is the infinite repetition of the values inside the window.

Now lets see how $$F^{(w)}[k]$$ relates to the Fourier Transform of the original function. By proceeding analogous to the calculations in equations $$\eqref{Fourier_of_Sampled_Calc}$$ and $$\eqref{Fourier_of_Sampled}$$, we arrive at

$$\begin{eqnarray} F^{(w)}[k] &=& \left(\left.\frac{1}{\Delta\! T}\sum_{m\in\mathbb{Z}} F\left(\nu-m\cdot \frac{1}{\Delta\! T}\right) \star \mathcal{F}\left\{W_T(t)\right\}(\nu)\right)\right|_{\nu=\nu_k} \\
 &=& \mathcal{DFT}\left\{(w\cdot f)[n]\right\}[k],\, k\in \mathbb{Z}
\end{eqnarray}$$

which is what the Discrete Fourier Transform actually computes. The Discrete Fourier Transform of a finite sequence always implies a windowing of the underlying continuos function.

It is easy to forget that the windowing exists when we don't *explicitly* apply a weighting function to the sampled data, because setting $$w(t)=1$$ leaves us just with the sequence of sampled function values on the right hand side. But the window does not vanish on the left hand side, because for $$w(t)=1$$ it becomes the rectangular function. In the Fourier domain we are *always* convolving with a windowing function. If we don't apply an explicit window, the implicit rectangular window will result in a normalized $$\text{sinc}$$ function in the Fourier domain. Any window leads to a smearing of the Fourier Transform of the continuos function, which is a phenomenon that is known as [spectral leakage](https://en.wikipedia.org/wiki/Spectral_leakage). By [explicitly modifying the window function](https://www.edn.com/windowing-functions-improve-fft-results-part-i/) we can combat the effects of spectral leakage, but never remove it entirely. See also the famous work by Albert Nuttall on window functions [Nuttall1981].

# III. Conclusion
This is it. We have seen what the DFT actually computes and how it is related to the Fourier Transform of a continuous function. There is loads more to say about the FT and the DFT, but I'll leave that for a later article.

# Links and Further Reading
- [dsprelated.com](https://www.dsprelated.com/) and specifically the selection of [free ebooks](https://www.dsprelated.com/freebooks.php).
- [dspillustrations.com](https://dspillustrations.com/pages/index.html): hands-on explanations with equations, images and numerical examples in Python.
- [dsp.stackexchange](https://dsp.stackexchange.com/): the StackExchange community on all things DSP.

# Literature
[Gonzalez2018] Gonzalez, RC, Woods, RE. 2018.  *Digital Image Processing*. (4<sup>th</sup> Edition). Pearson.

[Langton2019] Langton, C, Levin, V. 2019. *Intuitive Guide to Fourier Analysis and Spectral Estimation*. (2<sup>nd</sup> Edition). Mountcastle Academic.

[Nuttall1981] Nuttall, A. 1981. *Some windows with very good sidelobe behavior*. IEEE Transactions on Acoustics, Speech, and Signal Processing. [doi: 10.1109/TASSP.1981.1163506](https://ieeexplore.ieee.org/document/1163506).

# Endnotes
[^dsp_answer]: This answer to [my question](https://dsp.stackexchange.com/questions/72231/how-is-the-dtft-of-a-periodic-sampled-signal-linked-to-the-dft) on [dsp.stackexchange](https://dsp.stackexchange.com/) really helped me overcome a mental block I had.
[^sum_subranges]: Specifically $$\sum_{k=-\infty}^{\infty} a[k]= \sum_{k=-\infty}^{\infty} \sum_{l=0}^{L-1} a[l-kL]$$ for any suitable infinite series. Think of this like splitting a `for` loop over one running index into two for loops over two indices total. Just like accessing a 2D array.
[^sum_convergence]: Convergence of infinite series is [its own beast](https://math.stackexchange.com/questions/357224/absolutely-convergent-series-and-conditionally-convergent-series-rearrangement). I won't bother with the details and assume the conditions are fulfilled for what I am doing.
[^dft_ordering]: [FFTW](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) explains it nicely: "[That means that the] positive frequencies are stored in the first half of the output and the negative frequencies are stored in backwards order in the second half of the output".
[^bandlimited]: A bandlimited function has a FT that is nonzero only on a finite interval. In general, functions that are finite in time cannot be bandlimited, so this fact will always introduce a residual amount of aliasing. A notable exception are bandlimited functions that are also periodic, provided that the finite time interval encompasses an integer amount of periods [Gonzalez2018, ch. 4].
[^sampling_continouos]: Make no mistake, the sampled function is still continuous but it is nonzero only on an infinite, discrete sequence of sampled time points.
[^dirac_conv]: Also note that the *convolution* of a function $$g(t)$$ with the delta distribution $$\delta(t-t_0)$$ is $$g(t) \star \delta(t-t_0) = g(t-t_0)$$. Do not confuse the convolution with the delta function with the [sifting property](https://mathworld.wolfram.com/SiftingProperty.html).
[^peaks_convolve]: If we want to sample using a peak function with finite width, we just have to convolve the dirac comb with an appropriate peak. This, of course, has consequences in Fourier space, see the [Convolution Theorem](https://en.wikipedia.org/wiki/Convolution_theorem).
[^dft_ft]: Of course the DFT and the FT are related and so are $$f(t)$$ and $$f[n]$$, but the whole point of this article is to show how exactly they are related.
[^ctfs_resource]: See [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/06%3A_Continuous_Time_Fourier_Series_(CTFS)/6.02%3A_Continuous_Time_Fourier_Series_(CTFS)) for a nice resource on the CTFS and its properties.
[^FFT]: In image processing we commonly use the [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) which just a fast implementation of the DFT.
[^math_rigor]: For example, I won't be bothered with checking if reordering integrals, partial derivatives, sums  etc. is one hundred percent mathematically sound. I also won't not bother with stating convergence criteria for integrals, series and such.
[^well_behaved]: See, this is what I meant when I said I'll use math like a physicist.
[^notation]: I'll stick to the definition of the Fourier transform where I write out $$2\pi\nu$$ instead of absorbing that into the circular frequency $$\omega$$. The reason is that the numeric library [FFTW](www.fftw.org) also uses [this notation](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) and that allows me to re-use equations directly without having to worry about $$2\pi$$ factors.
[^sampling]: For additional information on sampling see e.g. [here](https://dsp.stackexchange.com/questions/13563/why-is-dirac-delta-used-in-continuous-signal-sampling), [here](https://dsp.stackexchange.com/questions/2948/sampling-of-a-continuous-function-kroneckers-or-diracs-delta), and [here](https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Signal_Processing_and_Modeling/Book%3A_Signals_and_Systems_(Baraniuk_et_al.)/10%3A_Sampling_and_Reconstruction). Also [here](http://mmust.elimu.net/BSC(ELEC_COMM)/Year_4/ECE%20421_Comm_Systems_II/Signal_Digitization/Sampling/Sampling_Techniques.htm).
[^weights_decay]: Here we assume that the weights decay so rapidly that there is no overlap between weighting functions of adjacent samples.
[^windowing_constant]: We could also model windowing by setting the function values outside the window function to some other constant. But the only constant that leaves us with a convergent periodized sequence is good old Zero.
