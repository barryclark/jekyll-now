---
layout: post
tags: least-squares-fitting image-processing numerics math
#categories: []
date: 2020-05-31
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Variable Projection Method - Fundamentals of Nonlinear Least Squares Fitting with VarPro '
#comments_id:
---

This is the first post in a series on the use of the Variable Projection (VarPro) in digital image processing. The method is interesting because it makes clever use of linear algebra to potentially speed up and increase the robustness of nonlinear least squares fitting problems. It does so by separating the linear from the nonlinear parameters.

# Foreword and Literature
Variable Projection was introduced by Gene Golub and Victor Pereyra[^golub_pereyra2002]. I personally find the original publications hard to understand because I am not very familiar with high dimensional tensor algebra. This is why I based this article on the publication of Dianne O'Leary and Bert Rust[^oleary_rust_free], who do an excellent job of breaking the method down in terms of familiar linear algebra. Plus they give illuminating insights into the numerics. Assume that this post is a condensed summary of their work at best[^errors_notation]. So let's dive in.

# The Idea of VarPro
[Nonlinear Least Squares Fitting](https://en.wikipedia.org/wiki/Non-linear_least_squares) is the process of fitting a function to data by minimizing the sum of squares of the residuals. It's called *nonlinear* least squares as opposed to *linear* least squares because the function in question can be nonlinear in the fitting parameters. If the function were purely linear in the fitting parameters we could take advantage of the fact that linear least squares problems can be [very efficiently solved](https://en.wikipedia.org/wiki/Linear_least_squares). The fundamental idea of VarPro is to separate the linear parameters from the purely nonlinear parameters during the fitting process. In doing so we can take advantage of the efficient solutions for the linear parameters and reduce the complexity of the nonlinear problem. We still have to solve this reduced nonlinear problem using standard nonlinear minimization algorithms like [Levenberg-Marquardt](https://en.wikipedia.org/wiki/Levenberg%E2%80%93Marquardt_algorithm).

# The Math of VarPro
HIER WEITER UND ETWAS UMSCHREIBEN: WOHER KOMMT t variable
VarPro is concerned with fitting functions $$\eta$$ that look like this:
$$\eta(\mathbf{\alpha},\mathbf{c},t) = \sum_j c_j\Phi_j(\mathbf{\alpha})






# References and Endnotes
[^golub_pereyra2002]: See [here](https://pdfs.semanticscholar.org/3f20/1634276f9c1c79e421355b4915b69b4aae24.pdf) for a review paper of the inventors at approximately the 30<sup>th</sup> birthday of their method. In there you can also find references to their original work as well as the contributions by Linda Kaufman. See [here](http://vpereyra.com/wp-content/uploads/2019/08/Surveypaper2019.pdf) for a follow-up by Pereyra covring the time up to 2019.
[^oleary_rust_free]: You can find the manuscript by O'Leary and Rust [publicly available here](https://www.cs.umd.edu/users/oleary/software/varpro.pdf). You can also find the official publication behind a paywall [here](https://link.springer.com/article/10.1007/s10589-012-9492-9).
[^errors_notation]: Errors are mine of course. I will also use their notation to make it easy to go back and forth from this article and their publication. This is why I am sparing you the references to their publication in the next sections. Assume everything is taken from O'Leary and Rust unless stated otherwise.
