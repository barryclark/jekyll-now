---
layout: post
tags: fourier-transform image-processing
#categories: []
date: 2020-12-29
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Fourier Transform: Fundamental Properties'
comments_id:
---

This post is the beginning of a series of posts with the aim of getting my Fourier-Mojo back. I used to be quite handy with the Fourier transform, but it has been a couple of years since I have really worked in Fourier space. So like everyhting in life my skills have atrophied and this post is the beginning of a series where I re-introduce the Fourier transform to myself and maybe even put it on a more rigorous foundation than I've had before. We'll start with some bread and butter properties of the Fourier Transform.

**Disclaimer**: During the series I will try to be precise in my notation, but I will be using math like a physicist. For example, I won't be bothered with checking if reordering integrals, partial derivatives and such is one hundred percent mathematically sound. I'll just do it.

# The 1D Fourier Transform
Let's start with the 1D Fourier Transform and assume we have a function $$f(t)$$ with $$f:\mathbb{R}\rightarrow \mathbb{C}$$, then we can define its [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) (FT) as

$$F(\nu) := \mathcal{F}\left[f(t)\right](\nu) =  \int_{-\infty}^{\infty} \text{d}t f(t) \exp(-i\, 2\pi\nu t)$$

and its inverse Fourier Transform (IFT) as

$$ \mathcal{F}^{-1}\left[F(\nu)\right](t) = \int_{-\infty}^{\infty} \text{d}\nu F(\nu) \exp(i\, 2\pi\nu t)=f(t).$$

This is the *continuous Fourier Transform of a continuous function*. It is not the same thing that we use in image processing. In image processing we use the *discrete* Fourier Transform (DFT) of discretely sampled functions. How these transforms relate is part of this series but for this post we are just concerned with the continuous Fourier Transform[^notation]. Let's look at some important properties.

## Linearity
From the definition of the FT and the IFT follows that they are linear transforms and thus

$$\begin{eqnarray}
\mathcal{F}\left[a\cdot f(t)+b\cdot g(t)\right](\nu) &=& a \mathcal{F}\left[f(t)\right](\nu) + b \mathcal{F}\left[g(t) \right](\nu) \\
\mathcal{F}^{-1}\left[a\cdot F(\nu)+b\cdot G(\nu)\right](t) &=& a \mathcal{F}^{-1}\left[F(\nu)\right](t) + b \mathcal{F}^{-1}\left[G(\nu) \right](\nu),
\end{eqnarray}$$

for functions $$f,g,F,G:\mathbb{R}\rightarrow\mathbb{C}$$ and constants $$a,b \in \mathbb{C}$$.

## Relating FT and IFT
From the definition of the transforms we can see (by change of variables in the integral) that the FT and the IFT are related by the [following equation](https://en.wikipedia.org/wiki/Fourier_inversion_theorem#Inverse_transform_in_terms_of_flip_operator)

$$\mathcal{F}^{-1} = \mathbb{R}$$ where R flip operator






# Endnotes
[^notation]: I'll stick to the definition of the Fourier transform where I write out $$2\pi\nu$$ instead of absorbing that into the circular frequency $$\omega$$. The reason is that the discrete Fourier Transform (DFT) library [FFTW](www.fftw.org) also uses [this notation](http://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html#The-1d-Discrete-Fourier-Transform-_0028DFT_0029) and that allows me to re-use equations directly without having to worry about $$2\pi$$ factors.
