---
layout: post
title: My First Post
---

Testing: Copied from my personal notes - Normal Distribution

Source: https://en.wikipedia.org/wiki/Normal_distribution

|Notation	|	$$ N(\mu,\sigma^2) $$|
|Parameters	|	$$ \mu\in\bold{R} $$ -- mean (location) <br> $$ \sigma^2>0 $$ -- variance (squared scale)|
|pdf	|	{{Normal Distribution pdf}}|
|CDF	|	$$ \dfrac{1}{2}\left[1+erf\left(\dfrac{x-\mu}{\sigma\sqrt{2}}\right)\right] $$ or<br> $$ \Phi\left(\dfrac{x-\mu}{\sigma}\right) $$|
|Quantile	|	$$ F^{-1}(p)=\mu+\sigma\Phi^{-1}(p)  $$ for $$ p\in(0,1) $$|
|Support Type	|	Continuous infinite|
|Support	|	$$ x\in\bold{R} $$|
|Mean	|	$$ \mu $$|
|Median	|	$$ \mu $$|
|Mode	|	$$ \mu $$|
|Variance	|	$$ \sigma^2 $$|
|Skewness	|	0|
|Kurtosis	|	3|
|Ex. kurtosis	|	0|
|MGF	|	$$ \exp{\left\{\mu t+\dfrac{1}{2}\sigma^2t^2\right\}} $$|
|CF	|	$$ \exp{\left\{i\mu t-\dfrac{1}{2}\sigma^2t^2\right\}} $$|

$$ erf(x)=\dfrac{2}{\sqrt{\pi}}\int_{0}^{x} e^{-t^2} dt $$
