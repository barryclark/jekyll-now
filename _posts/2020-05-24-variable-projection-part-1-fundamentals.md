---
layout: post
tags: least-squares image-processing algorithm math varpro
#categories: []
date: 2020-05-24
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'The Variable Projection Method - Fundamentals of Nonlinear Least Squares Fitting with VarPro'
comments_id: 11
---

This is the first post in a series on the use of the Variable Projection methhod (VarPro) in digital image processing. The method is interesting because it makes clever use of linear algebra to potentially speed up and increase the robustness of nonlinear least squares fitting. It does so by separating linear from nonlinear parameters. I will recap the method based on the literature and put my own spin on it at the end.

# Before We Dive In
Variable Projection was introduced by Gene Golub and Victor Pereyra[^golub_pereyra2002]. I based much of the content of this article on the publication of Dianne O'Leary and Bert Rust (O'Leary 2007). They do an excellent job of breaking the method down in terms of familiar linear algebra. Furthermore, they give helpful practical tips on the implementation. However, there are errors and typos in some crucial formulas in their publication, which I have hopefully corrected. I will, for the most part, use the notation of O'Leary and Rust so that it is easy to go back and forth. So let's dive in.

# The Idea of VarPro
[Nonlinear Least Squares Fitting](https://en.wikipedia.org/wiki/Non-linear_least_squares) is the process of fitting a function to data by minimizing the sum of the squared residuals. It's called *nonlinear* least squares as opposed to *linear* least squares because the function in question can be nonlinear in the fitting parameters. If the function was purely linear in the fitting parameters we could take advantage of the fact that linear least squares problems can be [very efficiently solved](https://en.wikipedia.org/wiki/Linear_least_squares). The fundamental idea of VarPro is to separate the linear parameters from the nonlinear parameters during the fitting process. In doing so we can take advantage of efficient solutions for the linear parameters and reduce the fitting problem to a purely nonlinear least squares minimization. We still have to solve this reduced problem using a nonlinear minimization algorithm of our choice (e.g. [Levenberg-Marquardt](https://en.wikipedia.org/wiki/Levenberg%E2%80%93Marquardt_algorithm)).

That means VarPro is *not* a nonlinear least squares minimization algorithm in and of itself, but a clever way of rewriting the problem before tackling it numerically.

# The Math of VarPro
Let's now translate the principle above into formulas. Many of the contents in this section are taken from O'Leary and Rust (O'Leary 2007).

## The Fitting Function

VarPro is concerned with fitting model functions $$\eta$$ that can be written as a *linear combination* of $$n$$ functions that are *nonlinear*[^nonlinear_base] in their parameters:

$$\eta(\boldsymbol{\alpha},\boldsymbol{c},t) = \sum_{j=1}^{n} c_j\phi_j(\boldsymbol{\alpha},t).$$

I will refer to the $$\phi_j$$ as the *model base functions*[^model_base_functions]. We group the linear parameters in the vector $$\boldsymbol{c}=(c_1,\dots,c_n)^T\in\mathbb{R}^n$$ and the nonlinear parameters in $$\boldsymbol{\alpha}=(\alpha_1,\dots,\alpha_q)^T\in\mathcal{S}_\alpha \subseteq \mathbb{R}^q$$. So we have $$n$$ linear parameters and $$q$$ nonlinear parameters. The independent variable of the model function is $$t$$. It could, for example, represent physical quantities such as time or space. It is important to note that when I use the terms *linear* or *nonlinear* it refers to the behaviour of the function $$\eta$$ with respect to the parameter vectors $$\boldsymbol{\alpha}$$ and $$\boldsymbol{c}$$, but not the independent variable $$t$$. It is completely irrelevant if the model is linear or nonlinear in $$t$$.

## Weighted Least Squares
We want to fit our model to a vector $$\boldsymbol{y}$$ of observations

$$\boldsymbol{y}=(y_1,\dots,y_m)^T \in \mathbb{R}^m,$$

where $$y_i$$ is the observation at a coordinate $$t_i$$, $$i=1,\dots,m$$. The total number of observations is $$m$$. Let's write the function values for $$\eta$$ at those coordinates as a vector, too:

$$\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{c}) = (\eta(\boldsymbol{\alpha},\boldsymbol{c},t_1),\dots,\eta(\boldsymbol{\alpha},\boldsymbol{c},t_m))^T \in \mathbb{R}^m.$$

We want to minimize the weighted sum of the squared residuals:

$$R_{WLS}(\boldsymbol{\alpha},\boldsymbol{c}) = \lVert{\boldsymbol{W}(\boldsymbol{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{c}))}\rVert_2^2, \label{RWLS}\tag{1}$$

with the weight matrix $$\boldsymbol{W}$$. Our minimization problem is formally written as

$$\min_{\boldsymbol{c}\in \mathbb{R}^n, \boldsymbol{\alpha}\in\mathcal{S}_\alpha} R_{WLS}(\boldsymbol{\alpha},\boldsymbol{c}) \Leftrightarrow \min_{\boldsymbol{c}\in \mathbb{R}^n, \boldsymbol{\alpha}\in\mathcal{S}_\alpha} \lVert{\boldsymbol{W}(\boldsymbol{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{c}))}\rVert_2^2 \label{FullMinimization}\tag{2}.$$

Note that the nonlinear parameters can be constrained on a subset $$\mathcal{S}_\alpha$$ of $$\mathbb{R}^q$$ while the linear parameters are unconstrained[^unconstrained].

## Separating Linear from Nonlinear Parameters
The fundemental idea of VarPro is that we can eliminate all linear parameters $$\boldsymbol{c}$$ from the minimization problem. We do that by solving the linear subproblem separately. Assume that for a fixed $$\boldsymbol{\alpha}$$ we have a coefficient vector $$\boldsymbol{\hat{c}}(\boldsymbol{\alpha})$$ which is

$$ \boldsymbol{\hat{c}}(\boldsymbol\alpha) = \arg \min_{\boldsymbol{c} \in \mathbb{R}^n} \lVert{\boldsymbol{W}(\boldsymbol{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{c}))}\rVert_2^2 \label{LSMinimization} \tag{3},$$

for any fixed $$\boldsymbol{\alpha}$$. Then obviously the full problem $$\eqref{FullMinimization}$$ is equivalent to the following reduced problem:

$$ \min_{\boldsymbol{\alpha} \in \mathcal{S}_\alpha} \lVert{\boldsymbol{W}(\boldsymbol{y}-\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha})))}\rVert_2^2 \label{ReducedMinimization} \tag{4},$$

where, as stated above, $$\boldsymbol{\hat{c}}(\boldsymbol{\alpha})$$ solves minimization problem $$\eqref{LSMinimization}$$. We have reduced a minimization problem with respect to $$\boldsymbol{\alpha}$$ and $$\boldsymbol{c}$$ to a minimization problem with respect to $$\boldsymbol{\alpha}$$ only. However, the reduced minimization problem requires the solution of a subproblem, which is finding $$\boldsymbol{\hat{c}}(\boldsymbol\alpha)$$. At first it looks like nothing is gained. Until we realize that problem $$\eqref{LSMinimization}$$ is a *linear* least squares problem, which can be efficiently solved using linear algebra.

The additional brilliance of VarPro is that it gives us expressions for the derivatives of the function $$R_{WLS}(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}))$$, too[^derivatives]. $$R_{WLS}(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}))$$ is the target we want to minimize for the nonlinear problem $$\eqref{ReducedMinimization}$$, which we have to solve using our favorite numerical algorithm. The nice thing is that we can feed the algorithm with derivatives and that is almost always a good thing. But we are getting ahead of ourselves. Let's dive into some linear algebra to solve the linear subproblem.

## Enter the Matrix
To rewrite problem $$\eqref{LSMinimization}$$ using linear algebra we introduce the of *model function matrix* $$\boldsymbol{\Phi}(\boldsymbol{\alpha}) \in \mathbb{R}^{m \times n}$$:

$$\boldsymbol{\Phi}(\boldsymbol{\alpha}) =  (\Phi_{ik})
= \left(\begin{matrix}
\phi_1(\boldsymbol{\alpha},t_1) & \dots & \phi_n(\boldsymbol{\alpha},t_1) \\
\vdots & \ddots & \vdots \\
\vdots & \ddots & \vdots \\
\phi_1(\boldsymbol{\alpha},t_m) & \dots & \phi_n(\boldsymbol{\alpha},t_m) \\
\end{matrix}\right),$$

so for the matrix elements we have $$\Phi_{ik} = \phi_k(\boldsymbol{\alpha},t_i)$$. For fitting problems I assume we have more observations than model base functions, i.e. $$m>n$$. That means that the matrix has more rows than colums, which in turn implies that $$\text{rank}\boldsymbol{\Phi}(\boldsymbol{\alpha})\leq n$$. The matrix might or might not have full rank[^rank_of_Phi]<sup>,</sup>[^full_rank_Phi]. This fact will be important later, when giving an expression for its pseudoinverse.

We can now write

$$\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{c})=\boldsymbol{\Phi}(\boldsymbol{\alpha})\boldsymbol{c},$$

so the linear problem $$\eqref{LSMinimization}$$ becomes

$$ \boldsymbol{\hat{c}}(\boldsymbol\alpha) = \arg \min_{\boldsymbol{c} \in \mathbb{R}^n} \lVert{\boldsymbol{y_w}-\boldsymbol{\Phi_w}(\boldsymbol{\alpha})\,\boldsymbol{c}}\rVert_2^2 \label{LSMinimizationLinAlg} \tag{5},$$

where I have defined the *weighted observations* $$\boldsymbol{y_w}$$ and the *weighted model function matrix* $$\boldsymbol{\Phi_w}(\boldsymbol{\alpha})$$ as

$$\boldsymbol{y_w} = \boldsymbol{W}\boldsymbol{y} \,\text{ and }\, \boldsymbol{\Phi_w}(\boldsymbol{\alpha}) = \boldsymbol{W} \boldsymbol{\Phi}(\boldsymbol{\alpha}).$$

A solution to problem $$\eqref{LSMinimizationLinAlg}$$ is[^mistake_paper] [^L2Solution]

$$\boldsymbol{\hat{c}} = \boldsymbol{\Phi_w}^\dagger(\boldsymbol{\alpha}) \boldsymbol{y_w}, \label{c_hat_solution} \tag{6}$$

using the pseudoinverse $$\boldsymbol{\Phi_w}^\dagger(\boldsymbol{\alpha})$$ of $$\boldsymbol{\Phi_w}(\boldsymbol{\alpha})$$. This allows us to rewrite the nonlinear problem by plugging in $$\boldsymbol{\hat{c}}$$ from above

$$ \min_{\boldsymbol{\alpha} \in \mathcal{S}_\alpha} \lVert \boldsymbol{P}(\boldsymbol{\alpha})\boldsymbol{y_w} \rVert_2^2 \label{NonlinProblemMatrix} \tag{7},$$

using the matrix

$$\boldsymbol{P}(\boldsymbol{\alpha}) := \boldsymbol{1}-\boldsymbol{\Phi_w}(\boldsymbol{\alpha})\boldsymbol{\Phi_w}^\dagger(\boldsymbol{\alpha}) \in \mathbb{R}^{m \times m}$$

which is called the *projection onto the orthogonal complement of the range of* $$\boldsymbol{\Phi_w}$$ and is often written $$\boldsymbol{P}^\perp_{\boldsymbol{\Phi_w}(\boldsymbol{\alpha})}$$ in other publications (Kaufman 1975). Using this matrix we have written the squared sum of residuals as

$$R_{WLS}(\boldsymbol{\alpha},\boldsymbol{c}) = \lVert \boldsymbol{y_w}-\boldsymbol{\Phi_w}(\boldsymbol{\alpha})\boldsymbol{\hat{c}}\rVert_2^2 = \lVert{\boldsymbol{P}(\boldsymbol{\alpha})\boldsymbol{y_w}}\rVert_2^2.$$

This is called the *projection functional* and the reason why the method is called *Variable Projection* (Mullen 2009).

At this point we are almost halfway there. Our aim is to minimize the projection functional using a (possibly constrained) minimization algorithm. To achieve this we need two things: First we need a way of calculating the projection functional. We calculate it as $$\lVert \boldsymbol{y_w}-\boldsymbol{\Phi_w}(\boldsymbol{\alpha})\boldsymbol{\hat{c}}\rVert_2^2$$, rather than using the equivalent matrix expression in equation $$\eqref{NonlinProblemMatrix}$$. For that we need to calculate $$\boldsymbol{\hat{c}}$$ in a numerically feasible way, which can be achieved by either [QR Decomposition](https://en.wikipedia.org/wiki/QR_decomposition#Rectangular_matrix) or [Singular Value Decomposition (SVD)](http://www.omgwiki.org/hpec/files/hpec-challenge/svd.html). Good linear algebra libraries, like [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page), allow us to find the solution $$\boldsymbol{\hat{c}}$$ without the need to explicitly use the decompositions. I will give algebraic expressions involving the decompositions in the Appendix.

### Analytical Derivatives

It is possible to use derivative-free algorithms to minimize the projection functional, but we might want to use an algorithm which uses the derivatives. Common implementations of the Levenberg-Marquardt algorithm need the Jacobian matrix $$\boldsymbol{J}(\boldsymbol{\alpha})\in \mathbb{R}^{m \times q}$$ of $$\boldsymbol{\eta}(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}))$$:

$$\boldsymbol{J}(\boldsymbol{\alpha}) =  (J_{ik})
= \left(\begin{matrix}
\frac{\partial}{\partial \alpha_1}\eta(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}),t_1) & \dots & \frac{\partial}{\partial \alpha_q}\eta(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}),t_1) \\
\vdots & \ddots & \vdots \\
\vdots & \ddots & \vdots \\
\frac{\partial}{\partial \alpha_1}\eta(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}),t_m)) & \dots & \frac{\partial}{\partial \alpha_q}\eta(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}),t_m) \\
\end{matrix}\right),$$

with matrix entries $$J_{ik} = \frac{\partial\eta}{\partial \alpha_k}(\boldsymbol{\alpha},\boldsymbol{\hat{c}}(\boldsymbol{\alpha}),t_i)$$. The Jacobian can be expressed as a sum of two matrices

$$\boldsymbol{J}(\boldsymbol{\alpha}) = -(\boldsymbol{A}(\boldsymbol{\alpha})+\boldsymbol{B}(\boldsymbol{\alpha})),$$

where the $$k$$-th column of $$\boldsymbol{A}(\boldsymbol{\alpha})$$ is given as

$$\boldsymbol{a_k}(\boldsymbol\alpha) = \boldsymbol{P} \, \boldsymbol{D_k} \, \boldsymbol{\Phi_w}^\dagger \, \boldsymbol{y_w}
= \boldsymbol{P} \, \boldsymbol{D_k} \, \boldsymbol{\hat{c}},$$

and the $$k$$-th column of $$\boldsymbol{B}(\boldsymbol{\alpha})$$ is

$$\begin{eqnarray}
\boldsymbol{b_k}(\boldsymbol\alpha) &=& (\boldsymbol{P}\, \boldsymbol{D_k}\, \boldsymbol{\Phi_w}^\dagger)^T \boldsymbol{y_w} \\
&=& (\boldsymbol{\Phi_w}^\dagger)^T \boldsymbol{D_k}^T \, \boldsymbol{P}^T \boldsymbol{y_w} \\
&=& (\boldsymbol{\Phi_w}^\dagger)^T \boldsymbol{D_k}^T \,  \boldsymbol{r_w}.
\end{eqnarray}$$

In the last line we have used that $$\boldsymbol{P}^T=\boldsymbol{P}$$ [due to the properties of the pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse#Definition). We have also used the *weighted residual vector*

$$\boldsymbol{r_w}(\boldsymbol\alpha) = \boldsymbol{y_w}-\boldsymbol{\Phi_w}(\boldsymbol\alpha)\boldsymbol{\hat{c}}(\boldsymbol\alpha) = \boldsymbol{P}(\boldsymbol\alpha) \boldsymbol{y_w} \label{weighted_residual_vector} \tag{8}$$

and the *matrix of model function derivatives*

$$\boldsymbol{D_k}(\boldsymbol\alpha) := \frac{\partial \boldsymbol{\Phi_w}}{\partial \alpha_k} (\boldsymbol\alpha) =\boldsymbol{W} \frac{\partial \boldsymbol{\Phi}}{\partial \alpha_k} (\boldsymbol\alpha) \in \mathbb{R}^{m\times n},$$

where the derivative is performed element-wise for $$\boldsymbol{\Phi_w}$$. If the weight matrix is diagonal $$\boldsymbol{W}=\text{diag}(w_1,\dots,w_m)$$, then  $$(i,j)$$ element of $$\boldsymbol{D_k}$$ is $$ w_i \frac{\partial\phi_j}{\partial\alpha_k} (\alpha,t_i)$$. If we want to use Levenberg-Marquardt to find a solution, then it is necessary to know the Jacobian of $$\eta$$. However, we might want (for some reason) to minimize the weighted residual $$R_{WLS}=\lVert \boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))\rVert_2^2$$ using a general purpose minimization algorithm. In this case we need to calculate the gradient

$$\nabla R_{WLS} = (\partial R_{WLS}/\partial\alpha_1,\dots,\partial R_{WLS}/\partial\alpha_q)^T.$$

The $$k$$-th component is calculated using [the product rule for the dot product](https://math.stackexchange.com/questions/159284/product-rule-for-the-derivative-of-a-dot-product):

$$\begin{eqnarray}
\frac{\partial}{\partial \alpha_k} R_{WLS} &=& \frac{\partial}{\partial \alpha_k} \lVert \boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))\rVert_2^2 \\
&=& 2 (\boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))) \cdot \frac{\partial}{\partial \alpha_k} (\boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))) \\
&=& 2 (\boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))) \cdot (-\frac{\partial}{\partial \alpha_k} \boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))) \\
&=& -2 (\boldsymbol{y_w}-\boldsymbol\eta(\boldsymbol\alpha,\boldsymbol{\hat{c}}(\boldsymbol\alpha))) \cdot \boldsymbol{j_k} \\
&=& -2 \boldsymbol{r_w}\cdot \boldsymbol{j_k} \\
&=& +2 \boldsymbol{r_w}\cdot (\boldsymbol{a_k}+\boldsymbol{b_k})
\end{eqnarray}$$

where $$\boldsymbol{j_k}=-(\boldsymbol{a_k}+\boldsymbol{b_k})$$ is the $$k$$-th column of the Jacobian $$\boldsymbol{J}(\boldsymbol\alpha)$$, and $$\boldsymbol{r_w}$$ is the weighted residual vector as defined above.

## Approximating the Jacobian and Gradient
Many authors use the approximation by Kaufman to reduce the computational burden of calculating the Jacobian while still retaining good numerical accuracy (Kaufman 1975). It is given as

$$\boldsymbol{J}(\boldsymbol{\alpha}) \approx -\boldsymbol{A}(\boldsymbol{\alpha}) \Rightarrow \boldsymbol{j_k} \approx - \boldsymbol{a_k}$$

This approximation is widely used and seems to do very well for many applications (O'Leary 2007, Mullen 2009, Warren 2013). We can use the approximation to calculate the gradient of $$R_{WLS}$$. This simplifies the numerical calculations a bit:

$$\begin{eqnarray}
\frac{\partial}{\partial \alpha_k} R_{WLS} &\approx& 2\, \boldsymbol{r_w}\cdot \boldsymbol{a_k} \\
&=& 2\,\boldsymbol{P}\boldsymbol{y_w} \cdot \boldsymbol{P}\,\boldsymbol{D_k} \boldsymbol{\hat{c}} \\
&=& 2\,\boldsymbol{P}^T\boldsymbol{P}\,\boldsymbol{y_w} \cdot \boldsymbol{D_k} \boldsymbol{\hat{c}} \\
&=& 2\,\boldsymbol{P}\boldsymbol{y_w} \cdot \boldsymbol{D_k} \boldsymbol{\hat{c}} \\
&=& 2\,\boldsymbol{r_w} \cdot \boldsymbol{D_k} \boldsymbol{\hat{c}}, \label{Kaufman_Approx_Gradient_RWLS} \tag{9}
\end{eqnarray}$$

where we have used $$\boldsymbol{P}^T \boldsymbol{P}=\boldsymbol{P} \boldsymbol{P}=\boldsymbol{P}$$ and the fact that [we can write](https://books.google.de/books?id=sMfjDwAAQBAJ&lpg=PA22&dq=scalar%20product%20X*Ay&hl=de&pg=PA22#v=onepage&q&f=false) $$\boldsymbol{x}\cdot \boldsymbol{A} \boldsymbol{y} = \boldsymbol{A}^T\boldsymbol{x}\cdot\boldsymbol{y}$$ for all vectors $$\boldsymbol{x},\boldsymbol{y} \in \mathbb{R^m}$$ and square matrices $$\boldsymbol{A} \in \mathbb{R}^{m\times m}$$. The last expression for the partial derivative is very easy to calculate because it does not require the matrix $$\boldsymbol{P}$$ explicitly.

Now I have all ingredients together to implement VarPro using a linear solver and a general purpose minimizer, which may or may be gradient based.

# VarPro with General Purpose Nonlinear Minimization
The commonly available implementations of VarPro use a least squares minimizer, like Levenberg-Marquardt, to solve the nonlinear problem. In that case we need an expression for the Jacobian using a numerically feasible decomposition of the matrix $$\boldsymbol{\Phi_w}$$. I will give these expressions in the Appendix for completeness, but at this point I want to deviate from the script a little bit. In my implementation I want to use a general purpose algorithm to minimize $$R_{WLS}$$.

For a general purpose minimizer I just need to provide the function to minimize, i.e. $$R_{WLS}$$, and its gradient as functions of $$\boldsymbol\alpha$$. Every decent linear algebra solver will use some form of matrix decomposition to obtain the result $$\boldsymbol{\hat{c}}(\boldsymbol\alpha)$$ for eq. $$\eqref{c_hat_solution}$$. But it does so without me having to deal with the decomposition directly. That means I can calculate $$R_{WLS}=\lVert\boldsymbol{r_w}\rVert_2^2$$, with $$\boldsymbol{r_w}$$ according to eq. $$\eqref{weighted_residual_vector}$$. Then I can calculate the the gradient using approximation $$\eqref{Kaufman_Approx_Gradient_RWLS}$$. I merely need three things for that: first, the matrix $$\boldsymbol{D_k}(\boldsymbol\alpha)$$, which I can calculate from the model function derivatives. Second, the solution for the coefficient vector $$\boldsymbol{\hat{c}}(\boldsymbol\alpha)$$, which I have already obtained using the solver. Third, I need the vector of weighted residuals $$\boldsymbol{r_w}(\boldsymbol\alpha)$$, which I have already calculated as part of $$R_{WLS}$$. At no point do I have to deal with the matrix decomposition directly. This is very neat, because it allows for a lot of flexibility in the implentation. I can change the linear solver without changing any of the calculations.

This concludes my first article on Variable Projection. In the next part of the series I will go into more detail on how to implement this with the aim of fitting large problems with multiple right hand sides. This is also termed *global analysis* in the time resolved microscopy literature (Mullen 2009). There are other ways to achieve this and if you are interested I suggest you also read up on *Partitioned* Variable Projection (Mullen 2009).

# Literature
**(Kaufman 1975)** Kaufman, L. "A variable projection method for solving separable nonlinear least squares problems." *BIT* **15**, 49–57 (1975). [https://doi.org/10.1007/BF01932995](https://doi.org/10.1007/BF01932995)

**(O'Leary 2007)** O’Leary, D.P., Rust, B.W. "Variable projection for nonlinear least squares problems." *Comput Optim Appl* **54**, 579–593 (2013). [https://doi.org/10.1007/s10589-012-9492-9](https://doi.org/10.1007/s10589-012-9492-9). The article is behind a paywall. You can find the manuscript by O'Leary and Rust [publicly available here](https://www.cs.umd.edu/users/oleary/software/varpro.pdf). *Caution*: There are typos / errors in some important formulas in the paper and manuscript. I have (hopefully) corrected these mistakes in my post.

**(Sima 2007)** Sima, D.M., Van Huffel, S. "Separable nonlinear least squares fitting with linear bound constraints and its application in magnetic resonance spectroscopy data quantification," *J Comput Appl Math*.**203**, 264-278 (2007) [https://doi.org/10.1016/j.cam.2006.03.025](https://doi.org/10.1016/j.cam.2006.03.025).

**(Mullen 2009)** Mullen, K.M., Stokkum, I.H.M.v.: The variable projection algorithm in time-resolved spectroscopy, microscopy and mass spectrometry applications. *Numer Algor* **51**, 319–340 (2009). [https://doi.org/10.1007/s11075-008-9235-2](https://doi.org/10.1007/s11075-008-9235-2).

**(Warren 2013)** Warren, S.C *et al.* "Rapid global fitting of large fluorescence lifetime imaging microscopy datasets." *PloS one* **8,8 e70687**. 5 Aug. 2013, [doi:10.1371/journal.pone.0070687](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0070687).

# Appendix: Matrix Expressions for the Jacobian
To express the Jacobian matrix, we need a numerically efficient decomposition of $$\boldsymbol{\Phi_w}$$ to express the pseudoinverse. This is done by either QR Decomposition or SVD, as mentioned above. I will follow O'Leary and use the SVD, although most other implementations use the QR Decomposition (O'Leary 2007 Sima 2007, Mullen 2009, Kaufman 1975, Warren 2013).

For a rectangular matrix $$\boldsymbol{\Phi_w}$$ with *full rank*, we can write $$\boldsymbol{\Phi_w}=(\boldsymbol{\Phi}^T \boldsymbol{\Phi})^{-1} \boldsymbol{\Phi}^T$$, which is [usually a bad idea](https://eigen.tuxfamily.org/dox/group__LeastSquares.html) numerically. Furthermore, if $$\boldsymbol{\Phi_w}$$ does not have full rank, then $$(\boldsymbol{\Phi}^T \boldsymbol{\Phi})^{-1}$$ does not exist and we need a different expression for the pseudoinverse. This can be given in terms of the [*reduced* Singular Value Decomposition](http://www.omgwiki.org/hpec/files/hpec-challenge/svd.html) of $$\boldsymbol{\Phi_w}$$:

$$\boldsymbol{\Phi_w} = \boldsymbol{U}\boldsymbol\Sigma\boldsymbol{V}^T,$$

with $$\boldsymbol{U}\in \mathbb{R}^{m\times \text{rank}\boldsymbol{\Phi_w}}$$, $$\boldsymbol{V}\in \mathbb{R}^{\text{rank}\boldsymbol{\Phi_w} \times \text{rank}\boldsymbol{\Phi_w}}$$ and the diagonal matrix of nonzero eigenvalues $$\boldsymbol\Sigma$$. Note that the matrix $$\boldsymbol{U}$$ is not the square matrix from the *full* Singular
Value Decomposition. That means it is not unitary, i.e. $$\boldsymbol{U}\boldsymbol{U}^T$$ is not the identity matrix. For the matrix $$\boldsymbol{V}$$, however, we have $$\boldsymbol{I} = \boldsymbol{V}^T\boldsymbol{V}$$. The pseudoinverse of can be expressed as

$$\boldsymbol{\Phi_w}^\dagger = \boldsymbol{V}\boldsymbol\Sigma^{-1}\boldsymbol{U}^T.$$

This implies $$\boldsymbol{P}=\boldsymbol{I}-\boldsymbol{U}\boldsymbol{U}^T$$ and the expressions for the columns $$\boldsymbol{a_k}$$ and $$\boldsymbol{b_k}$$ can be written as

$$\begin{eqnarray}
\boldsymbol{a_k} &=& \boldsymbol{D_k}\boldsymbol{\hat{c}} - \boldsymbol{U}(\boldsymbol{U}^T(\boldsymbol{D_k}\boldsymbol{\hat{c}})) \\
\boldsymbol{b_k} &=& \boldsymbol{U}(\boldsymbol{\Sigma^{-1}}(\boldsymbol{V}^T(\boldsymbol{D_k}^T\boldsymbol{r_w})).
\end{eqnarray}$$

The expressions are grouped in such a way that only matrix vector products need to be calculated (O'Leary 2007).

# Endnotes
[^golub_pereyra2002]: See [here](https://pdfs.semanticscholar.org/3f20/1634276f9c1c79e421355b4915b69b4aae24.pdf) for a review paper on Variable Projection by Golub and Pereyra in 2002. In there you can also find references to their original work as well as the contributions by Linda Kaufman. There is also [a follow-up by Pereyra](http://vpereyra.com/wp-content/uploads/2019/08/Surveypaper2019.pdf) covering the time from 2002 until 2019.
[^errors_notation]: Errors are mine of course. I will also use their notation to make it easy to go back and forth from this article and their publication. This is why I am sparing you the references to their publication in the next sections. Assume everything is taken from O'Leary and Rust unless stated otherwise.
[^nonlinear_base]: These functions could also be linear in their parameters but it makes little sense to have them be linear without good reason. One such reason could be that the parameter space is constrained, because the derivatives presented in here are only true for unconstrained linear parameters.
[^unconstrained]: This is not a principal limitation of the method. But in this post I am only reproducing the expressions for unconstrained fitting of the linear parameters. If the linear parameters were constrained, this would influence the derivatives presented later. See (Sima 2007) for more information.
[^notation_c_alpha]: In their manuscript, O'Leary and Rust refer to  $$\boldsymbol{\hat{c}}(\boldsymbol{\alpha})$$ as $$\boldsymbol{c}(\boldsymbol{\alpha})$$. I decided to add the hat to emphasize that this is the particular value that solves the linear least squares problem.
[^mistake_paper]: In the published version of the paper it is mistakenly stated that $$\boldsymbol{\hat{c}}$$ equals $$\boldsymbol{\Phi_w}(\boldsymbol{\alpha})^\dagger \boldsymbol{y}$$ instead of $$\boldsymbol{\Phi_w}(\boldsymbol{\alpha})^\dagger \boldsymbol{y_w}$$. This mistake is corrected in the online manuscript. However the mistake also occurs when the expression for the derivatives are given and is not corrected in either version. In both expressions for $$\boldsymbol{a_k}$$ and $$\boldsymbol{b_k}$$ the symbol $$\boldsymbol{y}$$ needs to be replaced by $$\boldsymbol{y_w}$$. Unless I am completely mistaken, which is always possible\dots
[^rank_of_Phi]: For any $$m \times n$$ matrix witn $$n<m$$ the rank is less than or equal to $$n$$. The matrix is [considered to have full rank](https://www.cds.caltech.edu/~murray/amwiki/index.php/FAQ:_What_does_it_mean_for_a_non-square_matrix_to_be_full_rank%3F) if its rank equals $$n$$.
[^full_rank_Phi]: Ideally the function matrix $$\boldsymbol{\Phi}(\boldsymbol{\alpha})$$ should have full rank, since the model is not well designed if the model base functions are linearly dependent. However, there are cases under which that could happen for particular values $$\boldsymbol{\alpha}$$. For example when fitting sums of exponential models with background terms.
[^model_base_functions]: This name might not always be accurate because the functions don't necessarily have to be linearly independent. However, for a good model they should be. See also the discussions later on the rank of $$\boldsymbol{\Phi}$$.
[^derivatives]: Under the condition that we have analytical expressions for the partial derivatives $$\partial/\partial\alpha_k \phi_j(\boldsymbol\alpha,t)$$ of the model base functions.
[^L2Solution]: The solution $$\boldsymbol{\hat{c}}$$ is not unique. The solution given here (using the pseudoinverse) has the smallest 2-Norm $$\lVert\boldsymbol{\hat{c}}\rVert_2^2$$ among all solutions that minimize the problem, see [here](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse#Linear_least-squares)
