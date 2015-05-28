---
title: A Walkthrough of the Advection-Differencing Scheme
layout: post
---

*Disclaimer*: This is something a little different. I'm going to step through solving a practice problem for the MJ2424 Numerical Methods final exam, partially as practice teaching (and understanding) the material, partially as practice writing scientifically, and partially for fun. I'll be working off my own derivation, but checking my answers, so I really hope the material is accurate.

##What is Computational Fluid Dynamics?
CFD is the process of reducing problems in Fluid Dynamics to stepwise, iterative processes computers can solve. Specifically, it involves taking a real-life continuum and reducing it to a finite-volume calculation with a set number of cells, across each of which a very simple calculation will be performed. This allows us to turn a complex calculus problem, difficult for computational problem solving, into a linear algebra problem, which is much simpler.


##The Problem
As seen in Classroom Example 3 of Section 4.7 **Discretising Advection** of David D Apsley's [CFD Notes](http://personalpages.manchester.ac.uk/staff/david.d.apsley/lectures/comphydr/scalar.pdf):

![The Problem](https://photos-5.dropbox.com/t/2/AABz77XvSbD_xbKDjdQ-m3-6e4ehyYyPiTZuLFTY0W9UIw/12/7983802/png/32x32/1/_/1/2/Screenshot%202015-05-28%2018.53.20.png/CLql5wMgASACIAMgBCAFIAYoASgCKAM/8R67slaPk1cK_udgd72-dqARwJ0iz3BaOhLQlbLmAEE?size=1024x768&size_mode=2)


A pipe of cross-section $A = 0.01 m^2$
and length $L = 1 m$ carries water (density $\rho = 1000 kg m^{–3}$ at velocity $u = 0.1 m s^{–1}$.
A faulty valve introduces a reactive chemical into the pipe half-way along its length at a rate of $0.01 kg s^{–1}$. The diffusivity of the chemical in water is $\Gamma = 0.1 kg m^{–1} s^{–1}$. The chemical is subsequently broken down at a rate proportional to its concentration $\Phi$ (mass of chemical per unit mass of water), this rate amounting to $–\gamma\Phi$ per metre, where $\gamma = 0.5 kg s^{–1} m^{–1}$.
Assuming that the downstream boundary condition is $\d{\Phi}{x}=0$, set up a finite-volume calculation with 7 cells to estimate the concentration along the pipe using:
 - (a) central
 - (b) upwind
differencing schemes for advection.

##The Method
From the normal steady-state one-dimensional advection diffusion equation

$$\pd{\rho\phi}{t} + \div(\rho\phi\v u) = div(\Gamma\grad\phi) + S_\phi $$

We make the equation steady-state and one-dimensional:

$$\d{}{x}\left(\rho u A \phi - \Gamma A \d{\phi}{x} \right)=S$$

We must now introduce the east/west convention. The current cell in question is $P$; its east and west neighbors are $E$ and $W$. Its east and west *faces* - that is, the boundaries it shares with those neighbors - are designated as the lowercase versions of those cardinal directions, $e$ and $w$. We can then write:

$$\d{}{x}\left( \rho u \phi \right)^e_w = \d{}{x}\left( \Gamma \d{\phi}{x} \right)^E_W$$

Integrating the transport equation, we find:

$$(\rho u A \phi)_e - (\rho u A \phi)_w = (\Gamma A)\left(\d{\phi}{x}\right)_E - (\Gamma A)\left( \d{\phi}{x} \right)$$

We define the constants:
$$ F = \rho A u_w^e \qquad D = \left( \d{\Gamma A}{\Delta x} \right)_w^e$$

Such that the integrated convection-diffusion equation reads:

$$F_e \Phi_e - F_w \Phi_w = D_e(\Phi_E - \Phi_P) - D_w(\Phi_P - \Phi_W)$$

##The Central Differencing Scheme (CDS)
Here we introduce a scheme for finding the values of a given property - in this problem, a chemical concentration - at a boundary between two cells, given its value at the centers of those two cells. We introduce:

$$\phi_e = \frac{\phi_E + \phi_P}{2} \qquad \phi_w = \frac{\phi_P + \phi_W}{2} \qquad \text{(This is the CDS)}$$

Expanding generally - we will expand a little more specifically in a moment - we find:

$$F_e \phi_e - F_w \phi_w = D_e (\phi_E - \phi_P) - D_w (\phi_P - \phi_w)$$

Expanding out for our CDS:

$$\frac{F_e}{2}(\phi_P + \phi_E) - \frac{F_w}{2}(\phi_W + \phi_P) = D_e(\phi_E - \phi_P) - D_w (\phi_P - \phi_W)$$

And, finally, gathering by $\phi$:

$$\left(\left(D_w + \frac{F_w}{2}\right)+\left(D_e - \frac{F_e}{2}\right)+\left(F_e - F_w\right)\right)\phi_P = (D_w + \frac{F_w}{2})\phi_W + (D_e - \frac{F_e}{2}) \phi_E$$