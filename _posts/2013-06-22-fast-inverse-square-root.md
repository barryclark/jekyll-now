---
title: Fast Inverse Square Root
link: https://literals.wordpress.com/2013/06/22/fast-inverse-square-root/
author: jamesbuckland
description: 
post_id: 23
created: 2013/06/22 12:00:31
created_gmt: 2013/06/22 17:00:31
comment_status: open
post_name: fast-inverse-square-root
status: publish
post_type: post
layout: post
---

# Fast Inverse Square Root

[code language="c"] float Q_rsqrt( float number ) { long i; float x2, y; const float threehalfs = 1.5F; x2 = number * 0.5F; y = number; i = * ( long * ) &y; // evil floating point bit level hacking i = 0x5f3759df - ( i >> 1 ); // what the fuck? y = * ( float * ) &i; y = y * ( threehalfs - ( x2 * y * y ) ); // 1st iteration // y = y * ( threehalfs - ( x2 * y * y ) ); // 2nd iteration, this can be removed return y; } [/code] The _[Fast Inverse Square Root_ ](https://en.wikipedia.org/wiki/Fast_inverse_square_root)is a bit-level hack for calculating $latex Q_\text{rsqrt}(x) = x^{-1/2}$ at massively efficient speeds. The problem it is designed to solve is as follows: modern [physics engines](https://en.wikipedia.org/wiki/Physics_engine) calculate (among other things) the reflections of light off an object; this reflection takes the form of a vector [normal](https://en.wikipedia.org/wiki/Surface_normal) to the surface. This [vector normalization](https://en.wikipedia.org/wiki/Vector_normalization) requires, among its many steps, the calculation of $latex \hat{v} = v / \sqrt{v_1^2 + v_2^2 + v_3^2}$. In floating-point arithmetic, addition and multiplication are easy, but fast square roots and fast division produce a bottleneck of sorts; thus, the need arises for a solution on the processor-level. Even to the casual programmer, it should be evident that the power — and weirdness — of  $latex Q_\text{rsqrt}(x)$ lies in its use of the 'magic number'_ 0x5f3759df_, a hexadecimal constant which, in context, is able to calculate $latex y = y^{-1/2}$ with only a few quick steps, in contrast to the time-consuming (if simple) process of calculating it by normal means. A caveat: this magic number produces a value which is _generally close_ to the accurate value. __For a diligent explanation of the machinery behind _0x5f3759df, _read [Christian Hansen's lengthy post](http://blog.quenta.org/2012/09/0x5f3759df.html) on the matter; in short, it exploits an underlying feature of the machinery behind [floating-point](https://en.wikipedia.org/wiki/Floating_point)\- and long- type numbers on the processor level. Writing $latex y = x^{-1/2}$ as $latex \log_2 y = - \frac{1}{2} \log_2 x$ allows us to manipulate the numbers along a logarithmic path; at small scales, this path is mostly straight, and can be approximated by $latex y = x + \sigma$, where $latex \sigma$, in hexadecimal, ends up being _0x5f3759df__ _itself. This method ends up being so accurate and so close to the ideal number that, for a sufficient level of precision, [Newton's Method ](https://en.wikipedia.org/wiki/Newton's_method)needs to be run only once in order to refine the value to within a reasonable amount. In order to fix a problem at the bit-level scale, a hack had to be found at the bit-level scale. This is called [bit manipulation](http://en.wikipedia.org/wiki/Bit_manipulation); it is incredible and [can seem like magic](http://aggregate.org/MAGIC/) to even an experienced programmer.