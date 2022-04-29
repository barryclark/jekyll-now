---
layout: post
title: Nonlinear Optimization Solvers
usemathjax: true
---

__This article is about the implementation of a basic nonlinear optimization solver in C++__

![_config.yml]({{ site.baseurl }}/images/NonLinear_Optimization/minima.png)

After a long time of thinking about other problems, this year I am fully focused on the 3D reconstruction problem once again. There have been some changes since I last working in the 3D reconstruction space:
 * I have now moved fully to a Linux Ubuntu environment.
 * I have decided to target C++ as my main development language. 

 Right now I am at phase where I am gathering the algorithmic tools that I need to do my work, and one of those tools is a nonlinear optimizer. Essentially I have 3 choices this article is about the process I am going through to select the best of these choices. The choices that I have decided to focus on are as follows:
  * cminpack [[Link](https://github.com/devernay/cminpack)].
  * OpenCV's LMSolver [[Link](https://docs.opencv.org/4.x/d3/d6d/classcv_1_1LMSolver.html)].
  * My own attempt at an implementation of a Gauss-Newton solver [[Link](https://github.com/wildboar-dev/RefinerLib)].

## Background

If you are new to nonlinear optimization and want to find out more, here is a document which I think is useful in explaining some of the background theory [[Link](https://web.mit.edu/15.053/www/AMP-Chapter-13.pdf)].

## Methodology

In order to figure out which algorithm is best, I decided to see how each algorithm performed against a toy problem that was common in 3D reconstruction, namely a bundle adjustment problem. In terms of evaluation, the best algorithm will converge to a solution quickly (the least number of iterations).



