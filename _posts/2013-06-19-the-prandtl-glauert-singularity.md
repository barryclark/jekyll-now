---
title: The Prandtl–Glauert Singularity
link: https://literals.wordpress.com/2013/06/19/the-prandtl-glauert-singularity/
author: jamesbuckland
description: 
post_id: 7
created: 2013/06/19 01:00:35
created_gmt: 2013/06/19 06:00:35
comment_status: open
post_name: the-prandtl-glauert-singularity
status: publish
post_type: post
layout: post
---

# The Prandtl–Glauert Singularity

The [Prandtl-Glauert Singularity](http://en.wikipedia.org/wiki/Prandtl%E2%80%93Glauert_singularity) is a scientific falsehood, the mathematically valid prediction of a physically invalid technique carried too far. In short, the Prandtl-Glauert Singularity predicts that the _flow resistance_ — the latent force pushing back on an object moving in fluid — will approach infinity as the Mach speed of the object approaches 1; that is, the object approaches the speed of sound. Of course, objects such as supersonic airplanes, bullets, and even whips regularly break the sound barrier. This discrepancy arises from the application of the [Prandtl-Glauert Transformation](http://en.wikipedia.org/wiki/Prandtl%E2%80%93Glauert_transformation), which can simplify problems in fluid dynamics, allowing the application of incompressible-flow methods to compressible-flow problems. Roughly, compressibility is the ability of a substance to increase its density (and decrease its volume) under pressure, like a sponge. To a lesser degree, fluids such as air and water are compressible, and will respond in kind to higher speeds and more massive local pressure. In the Prandtl-Glauert Transformation, a problem is reduced by a factor of $latex \beta = \sqrt{1-M_\infty^2}$, where $latex M_{\infty}^2$ is the freestream Mach number, the speed of the entire airplane relative to the bulk motion of the surrounding air, as opposed to the speed of a local part of the airplane relative to a local portion of air. This allows for the _transformation_ of a set of dimensions and properties, so that they may be treated as though the fluid around them is incompressible. Critically, this transformation is accurate only for small Mach numbers, of less than 0.7; once the airplane begins to move at more than 7/10 the speed of sound. At these speeds, some of the airflow around the plane begins to move at Mach 1 (the speed of sound), while some of the airflow remains at subsonic speeds. This discrepancy, known as transsonic flow, is not accounted for by the transformation One of the linearizations of the P-G Transformation applies to the in/compressible pressure coefficient; the correction is given as 

$latex c_p = \dfrac{c_{p0}}{\sqrt{|1-M_\infty^2|}}$

where $latex c_p$ is the compressible pressure coefficient, and $latex c_{p0}$ is the incompressible pressure coefficient. At subsonic speeds, when transsonic flow is not an issue, this transformation works fine; however, as $latex M_{\infty} \rightarrow 1, c_p \rightarrow \infty$. This is an unphysical and easily disprovable result; thus, while breaking the sound barrier is possible in reality, it is not possible in the simplified terms of the Prandtl-Glauert Transformation.