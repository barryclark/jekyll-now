---
layout: post
title: Using @Context in JAX-RS
excerpt: The _@Contex_t annotation gives, to a JAX-RS implementation, the ability to inject ...
---

The _@Contex_t annotation gives, to a JAX-RS implementation, the ability to inject contextual information (e.g. Configuration, Security Context, etc. ) in a JAX-RS end-point. This capability is available since the early day of the specification, since JAX-RS 1.0. There are many scenarios where this feature is useful (e.g. access one of the HTTP header parameter of the consuming client, etc.).


To get more information, you can check the [JAX-RS Specification](https://jcp.org/en/jsr/detail?id=339) (_@Context__ is described in Chapter 9 & 10) or alternatively, you can read this _'Using @Context in JAX-RS'_ piece written by [Abhishek Gupta](https://twitter.com/abhi_tweeter) (see first instalment [here](https://abhirockzz.wordpress.com/2015/05/03/using-context-in-jax-rs-part-1/)).

*Originaly posted on the [Aquarium](https://blogs.oracle.com/theaquarium/using-context-in-jax-rs) blog.*

