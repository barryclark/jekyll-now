---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2021-01-15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The DFT: Spectral Leakage, Windowing, and Periodic Functions'
comments_id:
---
TODO introduction: this post is not so much about different windowing strategies, because there is already excellent work on it. More about where this effect comes from and why it does not seem to appear when the functions are periodic.

# The DFT and Spectral Leakage

## The Implicit Window and What the DFT Actually Computes
Let's first do a tiny recap on what the DFT actually computes based on my [previous post](/blog/2020/the-discrete-fourier-transform/) on the subject.

TODO add recap. Also explain what F is: Fourier transfom of f(t).

## How The Implicit Window Leads to Spectral Leakage

TODO write this up: basically the fact that we are convolving the DTFT with the a window in F-space is the reason. Illustrate that for one frequency, where we don't sample a whole period of a sin. As a lead in to the next section say, that there is one case where the stars align.


# Spectral Leakage and Periodic Functions
There is a special case where spectral leakage is not apparent for the DFT, which is when we calculate the DFT of a periodic function where we have sampled an integer number of periods. This fact has often handwavingly been explained to me by the DFT somehow implying a periodicity and that TODO do further

## The Fourier Transform of a Periodic Function
Let's look at the Fourier Transform (FT) of a periodic function $$f(t)$$ with period $$T$$, which implies $$f(t+mT)=f(t)$$ for all $$m\in\mathbb{Z}$$. Without knowing anything else about $$f(t)$$, the one thing we do know is that we can write it as a [Fourier Series]

$$f(t) = \sum_{n\in \mathbb{Z}} c_n \exp\left(i\, \frac{2\pi n}{T}t\right),$$

with the Fourier coefficients

$$c[n] := c_n = \frac{1}{T}\int_{-T/2}^{T/2}\text{d}t\,f(t)\exp\left(-i \frac{2\pi n}{T}t\right), \, n\in\mathbb{Z}.$$

Using the definition of the FT from the [previous post](/blog/2020/the-discrete-fourier-transform/) we know that the FT of any plane wave is a delta peak, i.e. $$\mathcal{F}\{\exp(-i\,2\pi \nu_0 t)\}(\nu)=\delta(\nu-\nu_0)$$, such that

$$F(\nu) := \mathcal{F}\{f(t)\} = \sum_{l\in \mathbb{Z}} c[l] \delta(\nu-\frac{l}{T}).$$

That means the FT of a periodic function is nonzero only at discrete (but infinite) sequence of frequencies which are integer multiples of the inverse period $$\frac{1}{T}$$. Note that if the function f(t) is bandlimited this means there exists an $$n_0 \in \mathbb{N}$$, such that $$c[n]=0$$ for all $$\vert n \vert>n_0$$.

## The DFT of a Periodic Function
Let's assume we have, as above, a bandlimited periodic function $$f(t)$$ with period $$T$$. Lets denote our uniform sampling period with $$\Delta T$$ and assume that we have [sampled fine enough](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem) so we won't run into aliasing issues. We sample a full period[^full_period] $$[0,T)$$ using $$N$$ samples on sampling points $$t_n$$ so that

$$\begin{eqnarray}
t_n &=& n \Delta\!T,\,n=0,1,\dots,N-1 \\
\Delta T &=& \frac{T}{N}
\end{eqnarray}$$

From !!EQUATION!! above we know that the DFT actually calculates provided that we apply an additional, explicit window function to our data:

$$\mathcal{DFT}\left\{ f[n]\right\}[k]=  \left(\left.\frac{1}{\Delta\! T}\sum_{m\in\mathbb{Z}} F\left(\nu-m\cdot \frac{1}{\Delta\! T}\right) \star \mathcal{F}\left\{\text{rect}\left(\frac{t-\frac{T}{2}}{T}\right)\right\}(\nu)\right)\right|_{\nu=\nu_k},\, k\in \mathbb{Z}. \label{DFT_expression_convolution_sum} $$

So now lets look at the convolution term separately. We just have to calculate the convolution of $$F(\nu)$$ with the FT of the window function and can then use the translation property of the convolution to find an expression for the convolution with $$F(\nu-\frac{m}{\Delta T})$$. Let's first find an expression for the FT of the rectangular function:


!!!!!!!!!!!!TODO !!!!!!!!!!!!!!!!!!!!!
CAUTION Wolfram uses the other convention +i for the forward fourier transform
https://www.wolframalpha.com/input/?i=fourier%28f%28t%2FT-1%2F2%29%2Ct%29
The result I obtained is correct, but we cannot just use the scale and shift as I did.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

$$\begin{eqnarray}
\mathcal{F}\left\{\text{rect}\left(\frac{t-\frac{T}{2}}{T}\right)\right\}(\nu)
 &=& T \cdot  \mathcal{F}\left\{\text{rect}\left(t-\frac{T}{2}\right)\right\}(T\nu) \\
 &=& T \exp\left(-i\,2\pi \frac{\nu T}{2}\right) \cdot \mathcal{F}\{\text{rect}(t)\}(T \nu) \\
 &=& T \, \exp(-i\,\pi \nu T) \cdot \text{sinc}(T\nu),
\end{eqnarray}$$

where we have first used the [scaling property](https://en.wikipedia.org/wiki/Fourier_transform#Time_scaling) property and second the [time shifting](https://en.wikipedia.org/wiki/Fourier_transform#Translation_/_time_shifting) of the Fourier Transform. With $$\text{sinc}$$ we denote the *normalized* sinc function $$\text{sinc(x)} = \frac{sin(\pi x)}{\pi x}$$. Next, let's see what the convolution with $$F(\nu)$$, the bandlimited Fourier Transform of $$f(t)$$, results in. We use the fact that we can express $$F(\nu)$$ as a Fourier Series because $$f(t)$$ is periodic.

$$\begin{eqnarray}
F(\nu) \star \mathcal{F}\left\{\text{rect}\left(\frac{t-\frac{T}{2}}{T}\right)\right\}(\nu)
 &=& T \, \exp(-i\,\pi \nu T)\cdot F(\nu) \star \text{sinc}(T\nu) \\
 &=& T \, \exp(-i\,\pi \nu T) \cdot \sum_{l\in \mathbb{Z}} c[l] \delta\left(\nu-\frac{l}{T}\right)\star\text{sinc}(T\nu) \\
 &=& T \, \exp(-i\,\pi \nu T) \cdot \sum_{l\in \mathbb{Z}} c[l] \text{sinc}(T\nu-l). \\
\end{eqnarray}$$

Now we can apply [translational equivalence](https://en.wikipedia.org/wiki/Convolution#Translational_equivariance) property of the convolution to obtain

$$\begin{eqnarray}
F\left(\nu - \frac{m}{\Delta\!T}\right) &\star& \mathcal{F}\left\{\text{rect}\left(\frac{t-\frac{T}{2}}{T}\right)\right\}(\nu) \\
  &=& \left.T \, \exp(-i\,\pi \nu' T) \cdot \sum_{l\in \mathbb{Z}} c[l] \text{sinc}(T\nu'-l)\right|_{\nu'=\nu-\frac{m}{\Delta\!T}} \\
  &=& T \, \exp(-i\,\pi (T \nu-m N)) \cdot \sum_{l\in \mathbb{Z}} c[l] \text{sinc}(T\nu-m N-l), \label{convolution_inside_dft}
\end{eqnarray}$$

To calculate the value of the DFT at index $$k$$ we have to evaluate this expression at the frequency $$\nu = \nu_k = \frac{k}{N} \frac{1}{\Delta\!T} = \frac{k}{T}$$. Let's have a look at the sinc expression first.

$$
\text{sinc}(T\nu_k-m N-l) = \text{sinc}(k-mN-l) = \delta[k-mN-l],
$$

because $$\text{sinc}(j)=\delta [j], j\in \mathbb{Z}$$, using the single index [Kronecker Delta](https://en.wikipedia.org/wiki/Kronecker_delta) or unit sample function $$\delta[j] = \delta_{j0},\, j\in \mathbb{Z}$$. Next, we'll use the [sifting property](https://en.wikipedia.org/wiki/Kronecker_delta#Properties_of_the_delta_function) of the Kronecker delta to simplify equation $$\eqref{convolution_inside_dft}$$ at $$\nu=\nu_k$$:

$$\begin{eqnarray}
\left.F\left(\nu - \frac{m}{\Delta\!T}\right) \star \mathcal{F}\left\{\text{rect}\left(\frac{t-\frac{T}{2}}{T}\right)\right\}(\nu)\right|_{\nu = \nu_k}
 &=&  T \, \exp(-i\,\pi (T\nu_k-m N)) \cdot c[k-mN] \\
 &=&  T \, \exp(-i\,\pi (k-m N)) \cdot c[k-mN] \\
 &=& T \cdot (-1)^{(k-m N)}  \cdot c[k-mN]
\end{eqnarray}$$

so that we have for the DFT at index $$k$$

$$\begin{eqnarray}
\mathcal{DFT}\{f[n]\}[k]
 &=& \frac{T}{\Delta\!T} \sum_{m \in \mathbb{Z}} (-1)^{(k-m N)} \cdot c[k-mN] \\
 &=& N \cdot (-1)^k \cdot \sum_{m \in \mathbb{Z}} (-1)^{m N} \cdot c[k-mN]
\end{eqnarray}$$

# Endnotes
[^full_period]: We can do an analogous calculation for when $$[0,T)$$ contains an integer number of periods. So I am going to stick to sampling one period without loss of generality.
