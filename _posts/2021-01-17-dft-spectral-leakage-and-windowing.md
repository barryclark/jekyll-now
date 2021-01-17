---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2021-01-17
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Understanding the DFT: Spectral Leakage, Windowing, and Periodicity'
comments_id:
---
I was going to write something about how windowing could be used to mitigate the effects of spectral leakage in the DFT. However, I went down a rabbit hole trying to truly understand where spectral leakage comes from and how it relates to the periodicity of the DFT. What I ended up writing, is a post that is more about understanding the DFT and less about windowing, although it plays an important role in this post.

# I. Recap: The Discrete Fourier Transform

## The Implicit Window and What the DFT Actually Computes
In the [previous article](/blog/2020/the-discrete-fourier-transform/) on the subject we saw how the DFT of a finite sequence of function values $$f[n]$$, $$n=0,1,\dots N-1$$ was related to the Fourier Transform of the sampled and windowed function $$f(t)$$ with $$f[n]=f(n\Delta\!T)$$.

$$\mathcal{DFT}\{f[n]\}[k] = \left.\mathcal{F}\{f(t)\cdot W(t)\cdot III_{\Delta\!T}(t)\}(\nu)\right|_{\nu=\nu_k=\frac{k}{N}\frac{1}{\Delta\!T}},$$

where $$III_{\Delta\!T}$$ is the Dirac comb with period $$\Delta\!T$$, which originates from the sampling, and $$W(t)$$ is a windowing function. Even if we are not explicitly windowing our sampled data, we are always implicitly applying a rectangular window by restricting our samples to some finite interval $$[0,T)$$.

## How The Implicit Window Leads to Spectral Leakage

In the Fourier domain, the presence of $$W(t)$$ leads to a convolution with the FT of the window function in Fourier space. This is the origin of spectral leakage and that could be all she wrote. However, we don't always observe the effects of spectral leakage, e.g. when taking the DFT of a whole period of a periodic function[^whole_period]. We'll explore this subject further.

# Spectral Leakage and Periodic Functions
There is a special case where spectral leakage is not apparent for the DFT. This is the case when we calculate the DFT of a periodic function, for which we have sampled an integer number of periods. We'll gain a deeper understanding of what the DFT actually computes by exploring this subject.

## The Fourier Transform of a Periodic Function
Let's look at the Fourier Transform (FT) of a periodic function $$f(t)$$ with period $$T$$, which implies $$f(t+mT)=f(t)$$ for all $$m\in\mathbb{Z}$$. Without knowing anything else about $$f(t)$$, the one thing we do know is that we can write it as a [Fourier Series](https://en.wikipedia.org/wiki/Fourier_series)

$$f(t) = \sum_{m\in \mathbb{Z}} c_m \exp\left(i\, \frac{2\pi m}{T}t\right),$$

with the Fourier coefficients

$$c[m] := c_m = \frac{1}{T}\int_{-T/2}^{T/2}\text{d}t\,f(t)\exp\left(-i \frac{2\pi m}{T}t\right), \, m\in\mathbb{Z}.$$

Using the definition of the FT from the [previous post](/blog/2020/the-discrete-fourier-transform/) we know that the FT of any plane wave is a delta peak, i.e. $$\mathcal{F}\{\exp(-i\,2\pi \nu_0 t)\}(\nu)=\delta(\nu-\nu_0)$$, such that

$$F(\nu) := \mathcal{F}\{f(t)\}(\nu) = \sum_{m\in \mathbb{Z}} c[m] \delta(\nu-\frac{m}{T}) \label{FT_of_periodic_function}. $$

That means the FT of a periodic function is nonzero only at a discrete (but infinite) number of frequencies which are integer multiples of the inverse period $$\frac{1}{T}$$.

Now let's make some observations which are going to be helpful later. Let's assume that our function is bandlimited, which means that $$F(\nu)=0,\, \forall \nu>\nu_{max}$$. If that is the case, this means there exists an $$M_{max} \in \mathbb{N}$$, such that $$c[m]=0$$ for all $$\vert m \vert>M_{max}$$.

## Calculating the FT of a Periodic, Windowed, And Sampled Function
Let's assume we have, as above, a bandlimited periodic function $$f(t)$$ with period $$T$$. Lets denote our uniform sampling period with $$\Delta T$$ and assume that we have [sampled finely enough](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem) so we won't run into aliasing. We sample a full period $$[0,T)$$ using $$N$$ samples on sampling points $$t_n$$ so that[^full_period]

$$\begin{eqnarray}
t_n &=& n \Delta\!T,\,n=0,1,\dots,N-1 \\
\Delta T &=& \frac{T}{N}.
\end{eqnarray}$$

This implies that we are sampling the interval $$[0,\frac{1}{\Delta\!T})$$ of the Discrete Time Fourier Transform uniformly at the frequencies

$$\nu_k = \frac{k}{N} \frac{1}{\Delta\!T} = \frac{k}{T}, k=0,1,\dots,N-1.$$

Using a rectangular window function to "clip" $$f(t)$$ to the interval $$[0,T)$$ we know from the recap above, that the DFT actually computes

$$\begin{eqnarray}\mathcal{DFT}\left\{ f[n]\right\}[k]
&=&  \mathcal{F}\left\{f(t)\cdot III_{\Delta\!T}(t) \cdot \text{rect}\left(\frac{t}{T}-\frac{1}{2}\right)\right\}(\nu_k)\\
&=& \left. F(\nu) \star \mathcal{F}\left\{III_{\Delta\!T}(t)\right\}(\nu) \star \mathcal{F}\left\{\text{rect}\left(\frac{t}{T}-\frac{1}{2}\right)\right\}(\nu)\right|_{\nu=\nu_k}, \\
\end{eqnarray}$$

with $$F(\nu)$$ as in eq. $$\eqref{FT_of_periodic_function}$$. Let's look at the Fourier Transforms separately and perform the convolution step by step from right to left. The Fourier Transform of the shifted and scaled rectangular function is[^shifted_rect_ft]

$$
\mathcal{F}\left\{\text{rect}\left(\frac{t}{T}-\frac{1}{2}\right)\right\}(\nu) = T\,\exp(-i\pi T\nu)\,\text{sinc}(T\nu),
$$

where $$\text{sinc}(t)=\frac{\sin(\pi t)}{\pi t}$$ is the *normalized* sinc function. Next, the [FT of the Dirac comb](https://en.wikipedia.org/wiki/Dirac_comb#Fourier_transform) is

$$
\mathcal{F}\left\{III_{\Delta\!T}(t)\right\}(\nu) = \frac{1}{\Delta\!T}III_{\Delta\!T}(\nu).
$$

Now let's convolve the Dirac comb with the FT of the rectangular function:

$$\begin{eqnarray}
&\mathcal{F}&\left\{III_{\Delta\!T}(t)\right\}(\nu) \star \mathcal{F}\left\{\text{rect}\left(\frac{t}{T}-\frac{1}{2}\right)\right\}(\nu) \\
 &=& \frac{T}{\Delta\!T} \sum_{l \in \mathbb{Z}} \delta\left(\nu-\frac{l}{\Delta\!T}\right) \star \exp(-i\pi T\nu)\,\text{sinc}(T\nu) \\
 &=& N \sum_{l \in \mathbb{Z}} \exp(-i\pi (T\nu-l N))\,\text{sinc}(T\nu-l N).
\end{eqnarray}$$

So far so good. Now for the final step of the convolution, which is to convolve $$F(\nu)$$ with this expression. For that, we'll plug in the representation of $$F(\nu)$$ from the Fourier series. Furthermore, we'll evaluate the result of this convolution at $$\nu=\nu_k=\frac{k}{T}$$.

$$\begin{eqnarray}
&\mathcal{F}&\left\{f(t)\cdot III_{\Delta\!T}(t) \cdot \text{rect}\left(\frac{t}{T}-\frac{1}{2}\right)\right\}(\nu_k) \\
 &=& N \left. \sum_{l\in \mathbb{Z}}\sum_{m \in \mathbb{Z}} c[m] \, \delta\left(\nu-\frac{m}{T}\right)\star (\exp(i \,\pi (T\nu-l N))\,\text{sinc}(T\nu - l N)) )\right|_{\nu=\nu_k=\frac{k}{T}} \\
 &=& N \sum_{l\in \mathbb{Z}}\sum_{m \in \mathbb{Z}} c[m] \,\exp(i \,\pi (k-l N -m))\,\text{sinc}(k - l N -m))  \\
 &=& N \sum_{l \in \mathbb{Z}} c[k-l N] \\
 &=& N \cdot \widetilde{c}[k], \text{ with } \widetilde{c}[k] := \sum_{l \in \mathbb{Z}} c[k-l N] \tag{1} \label{DFT_Periodic}
\end{eqnarray}$$

Here, we have used the fact that the normalized sinc of any integer argument is $$1$$ if and only if the argument is zero; for all other integer arguments, the normalized sinc evaluates to $$0$$. This allows us to sift the sum over $$m$$, because the only nonzero term occurs for $$m = k- l N$$. Note also, that we introduced the periodic summation $$\widetilde{c}[k]$$, which is a concept that we encountered in the previous article in the context of the finite sequence of function values.

We assumed that our original function $$f$$ is bandlimited and further that our sampling frequency is higher than twice the Nyquist frequency. We can easily see that this means that the Fourier coefficients satisfy $$c[k]=0 \; \forall \; \vert k\vert>\frac{N}{2}$$, which means that the (non periodized) sequence $$c[k]$$ has at most $$N$$ nonzero values. This, in turn, means that the periodic summation $$\widetilde{c}[k]$$ is just the infinite repetion of the $$N$$ nonzero values of $$c[k]$$.

## Significance for the DFT
The expression in eq. $$\eqref{DFT_Periodic}$$ is exactly the expression for the DFT that we are looking for:

$$\mathcal{DFT}\{f[n]\}[k]=N \widetilde{c}[k],$$

where we have assumed that a $$T$$-periodic function $$f(t)$$ was sampled on $$N$$ points which span exactly one period $$[0,T)$$ of said function. We can interpret this result in two ways, which will each teach us something about the DFT.

Before we do that, we'll have a quick look at the value of the Fourier Transform $$F(\nu)$$ of $$f(t)$$ evaluated at our sampling frequencies:

$$F[k] := F(\nu_k) = \sum_{m \in \mathcal{Z}} c[m] \delta\left(\frac{k-m}{T}\right) = c[k]\delta(0),$$

which (pretty much) means that the FT of $$f(t)$$ at frequency $$\nu_k$$ is the corresponding $$c[k]$$ Fourier coefficient[^sampling_delta].

### Spectral Leakage and the DFT of Periodic Signals
My primary motivator was to learn something about spectral leakage. We already saw that spectral leakage is caused by windowing, which is always implicit in the DFT. It leads to the FT of the sampled function being convolved with the FT of the windowing function. This, in turn, will always alter the shape of the calculated FT compared to the FT of the non-windowed function.

<figure>
 <img src="/blog/images/fourier-dft-periodic/sinc-and-leakage.svg" alt="Leakage and Sinc" style="width:100%">
 <figcaption>Figure 1. Illustration of the effect of sampling and windowing on a single plane wave. <b>A</b> An integer number of  periods of the plane wave is sampled. Here, the sampling points and the sinc in the Fourier domain align in such a way, that only the expected frequency of the original plane wave is visible. <b>B</b> When we don't sample an integer number of periods, the sampling points do not align with the zero crossing of the sinc function in Fourier space. Now we observe <i>spectral leakage</i>, because frequencies other than the expected are nonzero.</figcaption>
</figure>

For periodic functions this is no different, but the math aligns in a special way for them. The Fourier Series lets us write every periodic function as a sequence of plane waves, whose FT is a delta peak. Because of the implicit rectangular window they will be convolved with a sinc function. However, by sampling exactly one period we have aligned the samples in Fourier space in such a way that we are only sampling the central peak of the sinc; all other samples fall on zero crossings. So while periodic signals are just as affected by windowing, this "coincidence" makes the DFT free of the effects of spectral leakage. Figure 1, which is inspired by [this great article](https://www.edn.com/windowing-functions-improve-fft-results-part-i/), gives a visual explanation.

### The Inherent Periodicity of the DFT
If you're like me, you have probably thought of $$f(t)$$ as some kind of infinite periodic function like $$f(t)=\sin(t)$$, where we have just "clipped" one period $$T=2\pi$$. The calculations above tell us that we won't *observe* any effects of the windowing (i.e. spectral leakage), if we have sampled an integer number of periods for the DFT. But there is another way of looking at things.

Just assume that we sample and window any (possibly aperiodic) function $$f(t)$$ as above and then periodically extend this function[^periodic_summation]. Lets call this periodized function $$\widetilde{f}(t)$$. Obviously, the DFT of the discrete samples of $$\widetilde{f}(t)$$ and our windowed function $$f(t)$$ will produce the same results. That is why people go on about the periodic nature of the DFT. For this periodic function we would not observe spectral leakage, but for the clipped function we will. So it's all a matter of expectation management. If you compare the resulting DFT with the FT of the unclipped (and non-periodic) function, then you will observe leakage; otherwise you get exactly what you expect[^gibbs_phenomenon]. So at the end of the day, the DFT gives us the sampled values of the Fourier Transform of a periodic extension of the windowed function.

# Conclusion
By going through some calculations, we could see that --as so often in life-- whether something is an artifact or not, is a matter of expectation. All joking aside, this really helped me understand why the periodic nature of the DFT is always emphasized and how it manifests. For some further reading on spectral leakage and how to mitigate its effects by applying an explicit window to the sampled data, I'll refer you to [this series of articles](https://www.edn.com/windowing-functions-improve-fft-results-part-i/).


# Endnotes
[^full_period]: We can do an analogous calculation for when $$[0,T)$$ contains an integer number of periods. So I am going to stick to sampling one period without loss of generality.
[^shifted_rect_ft]: See [this answer](https://dsp.stackexchange.com/questions/1389/how-does-shift-and-scaling-inside-of-a-function-affect-its-fourier-transform) on StackExchange and [this calculation](https://www.wolframalpha.com/input/?i=Fourier%28f%28t%2FT-1%2F2%29%2Ct%29) on Wolfram Alpha. Note that both derivations use a different sign convention and the circular frequency $$\omega$$ instead of $$2 \pi \nu$$. Note also, that trying to derive this with using the shifting and scaling property one after the other will lead to [wrong results and sadness](https://www.quora.com/How-can-I-calculate-the-Fourier-transform-of-a-scaled-and-shifted-signal-Which-order-should-I-respect).
[^exponential_term]: Note, that for $$m = k- l N$$, the exponential term becomes $$\exp(0)=1$$.
[^periodic_summation]: If we wrote this formally, this will give us the periodic summation of the function $$f$$, which is something that should be familiar from the last article. The DFT actually operates on one period of this periodic summation. We've come full circle.
[^gibbs_phenomenon]: If the periodic continuation introduces discontinuous jumps, then we'll also observe the [Gibbs Phenomenon](https://en.wikipedia.org/wiki/Gibbs_phenomenon).
[^sampling_delta]: Except for the $$\delta$$-distribution in there, which gets integrated away if we apply a finite binning. See also the [discussion on sampling](/blog/2020/the-discrete-fourier-transform/#sampling) in the previous article.
[^whole_period]: More generally, an integer number of periods.
