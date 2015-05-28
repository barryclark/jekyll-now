---
title: A Walkthrough of the Advection-Differencing Scheme
layout: post
---

<!-- $$
  \let\vaccent=\v % rename builtin command \v{} to \vaccent{}
  \renewcommand{\v}[1]{\ensuremath{\mathbf{#1}}} % for vectors
  \newcommand{\gv}[1]{\ensuremath{\mbox{\boldmath $ #1 $ }}} % for greek vectors
  \newcommand{\abs}[1]{\left| #1 \right|} % for absolute value
  \let\underdot=\d % rename builtin command \d{} to \underdot{}
  \renewcommand{\d}[2]{\frac{d #1}{d #2}} % derivatives
  \newcommand{\dd}[2]{\frac{d^2 #1}{d #2^2}} % double derivatives
  \newcommand{\pd}[2]{\frac{\partial #1}{\partial #2}} % partial derivatives
  \newcommand{\pdd}[2]{\frac{\partial^2 #1}{\partial #2^2}} % double partial 
  \newcommand{\degrees}{\ensuremath{^\circ}}

  \newcommand{\dotsref}[1]{\dotfill\textbf{pp.\pageref{#1}}}
  \newcommand{\partrule}{\rule{0.5\textwidth}{.4pt}}
  \newcommand{\lap}{\mathcal{L}}
  \let\t = \widetilde
  \newcommand{\Tau}{\mathrm{T}}
$$ -->

*Disclaimer*: This is something a little different. I'm going to step through solving a practice problem for the MJ2424 Numerical Methods final exam, partially as practice teaching (and understanding) the material, partially as practice writing scientifically, and partially for fun. I'll be working off my own derivation, but checking my answers, so I really hope the material is accurate.

##What is Computational Fluid Dynamics?
CFD is the process of reducing problems in Fluid Dynamics to stepwise, iterative processes computers can solve. Specifically, it involves taking a real-life continuum and reducing it to a finite-volume calculation with a set number of cells, across each of which a very simple calculation will be performed. This allows us to turn a complex calculus problem, difficult for computational problem solving, into a linear algebra problem, which is much simpler.


##The Problem
As seen in Classroom Example 3 of Section 4.7 **Discretising Advection** of David D Apsley's [CFD Notes](http://personalpages.manchester.ac.uk/staff/david.d.apsley/lectures/comphydr/scalar.pdf):

![The Problem](https://photos-5.dropbox.com/t/2/AABz77XvSbD_xbKDjdQ-m3-6e4ehyYyPiTZuLFTY0W9UIw/12/7983802/png/32x32/1/_/1/2/Screenshot%202015-05-28%2018.53.20.png/CLql5wMgASACIAMgBCAFIAYoASgCKAM/8R67slaPk1cK_udgd72-dqARwJ0iz3BaOhLQlbLmAEE?size=1024x768&size_mode=2)


* A pipe of cross-section $A = 0.01 m^2$
and length $L = 1 m$ carries water (density $\rho = 1000 kg m^{–3}$ at velocity $u = 0.1 m s^{–1}$. *
* A faulty valve introduces a reactive chemical into the pipe half-way along its length at a rate of $0.01 kg s^{–1}$. The diffusivity of the chemical in water is $\Gamma = 0.1 kg m^{–1} s^{–1}$. The chemical is subsequently broken down at a rate proportional to its concentration $\Phi$ (mass of chemical per unit mass of water), this rate amounting to $–\gamma\Phi$ per metre, where $\gamma = 0.5 kg s^{–1} m^{–1}$. *
* Assuming that the downstream boundary condition is $\d{\Phi}{x}=0$, set up a finite-volume calculation with 7 cells to estimate the concentration along the pipe using: *
 - * (a) central *
 - * (b) upwind *
* differencing schemes for advection. *

##The Method
From the normal steady-state one-dimensional advection diffusion equation
$$\gv \alpha$$