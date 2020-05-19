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

This is the first post in a series on the use of the Variable Projection methhod (VarPro) in digital image processing. The method is interesting because it makes clever use of linear algebra to potentially speed up and increase the robustness of nonlinear least squares fitting problems. It does so by separating the linear from the nonlinear parameters.

# Foreword and Literature
Variable Projection was introduced by Gene Golub and Victor Pereyra[^golub_pereyra2002]. I personally find the original publications hard to understand because I am not very familiar with high dimensional tensor algebra. This is why I based this article on the publication of Dianne O'Leary and Bert Rust[^oleary_rust], who do an excellent job of breaking the method down in terms of familiar linear algebra. Plus they give illuminating insights into the numerics. Assume that this post is a condensed summary of their work at best[^errors_notation]. So let's dive in.

# The Idea of VarPro
[Nonlinear Least Squares Fitting](https://en.wikipedia.org/wiki/Non-linear_least_squares) is the process of fitting a function to data by minimizing the sum of squares of the residuals. It's called *nonlinear* least squares as opposed to *linear* least squares because the function in question can be nonlinear in the fitting parameters. If the function were purely linear in the fitting parameters we could take advantage of the fact that linear least squares problems can be [very efficiently solved](https://en.wikipedia.org/wiki/Linear_least_squares). The fundamental idea of VarPro is to separate the purely linear parameters from the nonlinear parameters during the fitting process. In doing so we can take advantage of the efficient solutions for the linear parameters and reduce the fitting problem to a purely nonlinear least squares minimization. We still have to solve this reduced problem using standard nonlinear minimization algorithms like [Levenberg-Marquardt](https://en.wikipedia.org/wiki/Levenberg%E2%80%93Marquardt_algorithm).

That means VarPro is in essence not a nonlinear least squares minimizer like Levenberg-Marquardt but a clever way of rewriting the fitting problem before tackling it with a least squares minimization algorithm.

# The Math of VarPro
Let's now translate the principle above into maths. All the contents in this section are taken from O'Leary and Rust 2013.

## The Fitting Function

VarPro is concerned with fitting model functions $$\eta$$ that can be written as a linear combination of $$n$$ functions that are nonlinear[^nonlinear_base] in their fitting parameters:

$$\eta(\boldsymbol{\alpha},\mathbf{c},t) = \sum_{j=1}^{n} c_j\phi_j(\boldsymbol{\alpha},t).$$

We group the parameters in vectors $$\mathbf{c}=(c_1,...,c_n)^T\in\mathbb{R}^n$$ for the linear parameters, and $$\boldsymbol{\alpha}=(\alpha_1,...,\alpha_q)^T\in\mathcal{S}_\alpha \subseteq \mathbb{R}^q$$ for the nonlinear parameters. In total we have $$n$$ linear parameters and $$q$$ nonlinear parameters. The independent variable of model function $$\eta$$ is $$t$$. It could, for example, represent physical quantities such as time or space. It is important to note that when I use the terms *linear* or *nonlinear* it refers behaviour of the functions $$\eta$$ and $$\phi_j$$ with respect to the parameter vectors $$\boldsymbol{\alpha}$$ and $$\mathbf{c}$$ but not the independent variable $$t$$. For the fitting process it is completely irrelevant if the model is linear or nonlinear in $$t$$.

## The Weighted Least Squares Problem
We want to fit our model to a vector $$\mathbf{y}$$ of observations

$$\mathbf{y}=(y_1,...,y_m)^T,$$

where $$y_i$$ is the observation at a coordinate $$t_i$$, $$i=1,...,m$$. The total number of observations is $$m$$. Let's write the function values for $$\eta$$ at those coordinates as a vector, too:

$$\boldsymbol{\eta}(\boldsymbol{\alpha},\mathbf{c}) = (\eta(\boldsymbol{\alpha},\mathbf{c},t_1),...,\eta(\boldsymbol{\alpha},\mathbf{c},t_m))^T.$$

We want to minimize the weighted sum of the squared residuals:

$$R_{WLS}(\boldsymbol{\alpha},\mathbf{c}) = \lVert{\mathbf{W}(\mathbf{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\mathbf{c}))}\rVert_2^2, \label{1_RWLS}\tag{1}$$

with the *diagonal* weight matrix $$\mathbf{W}=\text{diag}(w_1,...,w_m)\in\mathbb{R}^{m \times m }$$. Our minimization problem is formally written as

$$\min_{\mathbf{c}\in \mathbb{R}^n, \boldsymbol{\alpha}\in\mathcal{S}_\alpha} R_{WLS}(\boldsymbol{\alpha},\mathbf{c}) \Leftrightarrow \min_{\mathbf{c}\in \mathbb{R}^n, \boldsymbol{\alpha}\in\mathcal{S}_\alpha} \lVert{\mathbf{W}(\mathbf{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\mathbf{c}))}\rVert_2^2 \label{2_FullMinimization}\tag{2}.$$

Note that the nonlinear parameters can be constrained on a subset $$\mathcal{S}_\alpha$$ of $$\mathbb{R}^q$$ while the linear parameters are unconstrained[^unconstrained].

## Separating Linear from Nonlinear
Now for the fundemental idea of VarPro, which is that we can eliminate all linear parameters $$\mathbf{c}$$ from the minimization problem. We do that by solving the linear subproblem separately. Assume that for a fixed $$\boldsymbol{\alpha}$$ we have a solution $$\hat{\mathbf{c}}(\boldsymbol{\alpha})$$ to the problem

$$ \min_{\hat{\mathbf{c}} \in \mathbb{R}^n} \lVert{\mathbf{W}(\mathbf{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\hat{\mathbf{c}}))}\rVert_2^2 \label{3_LSMinimization} \tag{3}.$$

Then obviously the full problem $$\eqref{2_FullMinimization}$$ is equivalent to the following reduced problem:

$$ \min_{\boldsymbol{\alpha} \in \mathcal{S}_\alpha} \lVert{\mathbf{W}(\mathbf{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\hat{\mathbf{c}}(\boldsymbol{\alpha})))}\rVert_2^2 \label{4_ReducedMinimization} \tag{4},$$

where, as stated above, $$\hat{\mathbf{c}}(\boldsymbol{\alpha})$$ solves minimization problem $$\eqref{3_LSMinimization}$$. We have reduced a minimization problem with respect to $$\boldsymbol{\alpha}$$ and $$\mathbf{c}$$ to a minimization problem with respect to $$\boldsymbol{\alpha}$$ only. However, the reduced minimization problem requires a solution of a minimization problem with respect to $$\mathbf{c}$$ as part of the expression to minimize. At first it looks like not much is gained. Until we realize that problem $$\eqref{3_LSMinimization}$$ is a *linear* least squares problem that can be efficiently solved using linear algebra.

The additional brilliance of VarPro is that it gives us expressions for the derivatives of the function $$R_{WLS}(\boldsymbol{\alpha},\hat{\mathbf{c}}(\boldsymbol{\alpha}))$$, too. $$R_{WLS}(\boldsymbol{\alpha},\hat{\mathbf{c}}(\boldsymbol{\alpha}))$$ is the expression we want to minimize for the nonlinear problem $$\eqref{4_ReducedMinimization}$$, which we have to solve using our favorite minimization algorithm. The nice thing is that we can feed the algorithm with derivatives and that is almost always preferrable.

## Enter the Matrix
To rewrite problem $$\eqref{3_LSMinimization}$$ using linear algebra we introduce the matrix of function values $$\boldsymbol{\Phi}(\boldsymbol{\alpha}) \in \mathbb{R}^{m \times n}$$:

$$\boldsymbol{\Phi}(\boldsymbol{\alpha}) =  (\Phi_{ik})

= \left(\begin{matrix}
\phi_1(\boldsymbol{\alpha},t_1) & \dots & \phi_n(\boldsymbol{\alpha},t_1) \\
\vdots & \ddots & \vdots \\
\vdots & \ddots & \vdots \\
\phi_1(\boldsymbol{\alpha},t_m) & \dots & \phi_n(\boldsymbol{\alpha},t_m) \\
\end{matrix}\right),$$

so for the matrix elements we have $$\Phi_{ik} = \phi_k(\boldsymbol{\alpha},t_i)$$. For fitting problems we can usually assume $$m>n$$, which means the matrix has more rows than colums[^matrix_shape_phi]. The linear problem $$\eqref{3_LSMinimization}$$ can now be written as

$$ \min_{\hat{\mathbf{c}} \in \mathbb{R}^n} \lVert{(\mathbf{y_w}-\boldsymbol{\Phi_w}(\boldsymbol{\alpha})\,\hat{\mathbf{c}}}\rVert_2^2 \label{5_LSMinimizationLinAlg} \tag{5},$$

where I have absorbed have defined the weighted observations $$\mathbf{y_w}$$ and the weighted function matrix $$\boldsymbol{\Phi_w}(\boldsymbol{\alpha})$$ as

$$\boldsymbol{y_w} = \mathbf{W}\boldsymbol{y} \,\text{ and }\, \boldsymbol{\Phi_w}(\boldsymbol{\alpha}) = \mathbf{W} \boldsymbol{\Phi}(\boldsymbol{\alpha}).$$


The solution to this problem is given using the symmetric generalized pseudoinverse $$\boldsymbol{\Phi}(\boldsymbol{\alpha})^\dagger$$ of $$\boldsymbol{\Phi}(\boldsymbol{\alpha})$$.








DAS HIER SPÄTER MACHEN

I will follow O'Leary by giving the solution to this problem using [Singular Value Decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition).



# References and Endnotes
[^golub_pereyra2002]: See [here](https://pdfs.semanticscholar.org/3f20/1634276f9c1c79e421355b4915b69b4aae24.pdf) for a review paper on Variable Projection by Golub and Pereyra in 2002. In there you can also find references to their original work as well as the contributions by Linda Kaufman. There is also [a follow-up by Pereyra](http://vpereyra.com/wp-content/uploads/2019/08/Surveypaper2019.pdf) covering the time from 2002 until 2019.
[^oleary_rust]: O’Leary, D.P., Rust, B.W.: Variable projection for nonlinear least squares problems. *Comput Optim Appl* **54**, 579–593 (2013). [https://doi.org/10.1007/s10589-012-9492-9](https://doi.org/10.1007/s10589-012-9492-9). The article is behind a paywall. You can find the manuscript by O'Leary and Rust [publicly available here](https://www.cs.umd.edu/users/oleary/software/varpro.pdf).
[^errors_notation]: Errors are mine of course. I will also use their notation to make it easy to go back and forth from this article and their publication. This is why I am sparing you the references to their publication in the next sections. Assume everything is taken from O'Leary and Rust unless stated otherwise.
[^nonlinear_base]: These functions could also be linear in their parameters but it makes little sense to have them be linear without good reason. One such reason could be that the parameter space is constrained, because the derivatives presented in here are only true for unconstrained linear parameters.
[^unconstrained]: This is not a principal limitation of the method. But in this post I am only reproducing the expressions for unconstrained fitting of the linear parameters. If the linear parameters were constrained, this would influence the derivatives presented later.
[^notation_c_alpha]: In their manuscript, O'Leary and Rust refer to  $$\hat{\mathbf{c}}(\boldsymbol{\alpha})$$ as $$\mathbf{c}(\boldsymbol{\alpha})$$. I decided to add the hat to emphasize that this is the particular value that solves the linear least squares problem.
[^sima_vanHuffel2003]:Sima, D.M., Van Huffel, S.: Separable nonlinear least squares fitting with linear bound constraints and its application in magnetic resonance spectroscopy data quantification, *J Comput Appl Math*.**203**, 264-278 (2007) [https://doi.org/10.1016/j.cam.2006.03.025](https://doi.org/10.1016/j.cam.2006.03.025).
[^matrix_shape_phi]: which is why I made the matrix rectangular in the equaltion above.
