---
layout: post
title: Non-negative Matrix Factorization
tags: tutorials bioinformatics R
---

In this post, I will be discussing Non-negative Matrix Factorization
(NMF). NMF is a low-rank approximation algorithm that discovers latent
features in your data. It is similar to PCA in the sense that they both
reduce high-dimensional data into lower dimensions for better
understanding of the data. The major difference is that PCA projects
data onto a subspace that maximizes variability for the discovered
features, while NMF discovers non-negative features that are additive in
nature. NMF is formally defined as:

$$V \\approx WH$$

where *V* is a non-negative matrix and both *W* and *H* are unique and
non-negative matrices. In other words, the matrix *V* is factorized into
two matrices *W* and *H*, where *W* is the features matrix or the basis
and *H* is the coefficient matrix. Typically, this means that *H*
represents a coordinate system that uses *W* to reconstruct *V*. We can
consider that *V* is a linear combination of column vectors of *W* using
the coordinate system in *H*, *v*<sub>*i*</sub> = *W**h*<sub>*i*</sub>.

Here, I will describe two algorithms to solve for NMF using iterative
updates of *W* and *H*. First, we will consider the cost function. A
cost function is a function that quantifies or measures the error
between the predicted values and the expected values. The Mean Squared
Error (MSE), or L2 loss is one of the most popular cost functions in
linear regressions. Given an linear equation *y* = *m**x* + *b*, MSE is:
$$
$MSE = \\frac{1}{N}\\Sigma\_{i=1}^{n}(y\_{i}-(mx\_{i}+b))^{2} $
$$
For the cost function in NMF, we use a similar function called the
Frobenius Norm. It is defined as:
$$
$||A||\_{F} = \\sqrt{\\Sigma\_{i=1}^{m}\\Sigma\_{j=1}^{n} |a\_{ij}|^{2}}$
$$
In the case of NMF, we are using the square of the Forbenius norm to
measure how good of an approximation *W**H* is for *V*.
$$
$||V - WH||\_{F}^{2} = \\Sigma\_{i,j}(V - WH)^{2}\_{ij}$
$$
We can see that as *W**H* approaches *V*, then the equation will slowly
converge to zero. Therefore, the optimization can be defined as the
following:
$$
$Minimize ||V - WH||\_{F}^{2} with respect to W and H, subject to the constraints W,H \\ge 0$
$$
In the paper by Lee & Seung, they introduced the multiplicative update
rule to solve for NMF. Please see their original paper for details on
the proof. Essentially the update causes the function value to be
non-increasing to converge to zero.
$$
$H\_{ik} \\leftarrow H\_{ik}\\frac{(W^{T}V)\_{ik}}{(W^{T}WH)\_{ik}}$
$$
$$
$W\_{kj} \\leftarrow W\_{kj}\\frac{(VH^{T})\_{kj}}{(WHH^{T})\_{kj}}$
$$
Here we will implement NMF using the multiplicative update rule. To get
started, make sure you have installed both
[R](https://www.r-project.org/) and [RStudio](https://rstudio.com/). In
addition, we will also be using the package
[NMF](https://cran.r-project.org/web/packages/NMF/index.html) to
benchmark our work.

Here I write a function to solve for NMF using the multiplicative update
rule. I added a `delta` variable to the denominator update rule to
prevent division by zero. `K` specifies the column length of *W* and the
row length of *H*. `K` can also be considered as the number of hidden
features we are discovering in *V*. `K` is less than *n* in a *n* × *m*
matrix. After iterating for `x` number of `steps`, the function returns
a `list` containing `W` and `H` for *W* and *H* respectively.

    nmf_mu <- function(R, K, delta = 0.001, steps = 5000){
      N = dim(R)[1]
      M = dim(R)[2]
      K = N
      W <- rmatrix(N,K) #Random initialization of W
      H <- rmatrix(K,M) #Random initialization of H
      for (step in 1:steps){
        W_TA = t(W) %*% R
        W_TWH = t(W) %*% W %*% H + delta
        for (i in 1:dim(H)[1]){
          for (j in 1:dim(H)[2]){
            H[i, j] = H[i, j] * W_TA[i, j] / W_TWH[i, j] #Updating H
          }
        }
        RH_T = R %*% t(H)
        WHH_T = W %*% H %*% t(H) + delta
        for (i in 1:dim(W)[1]){
          for (j in 1:dim(W)[2]){
            W[i, j] = W[i, j] * RH_T[i, j] / WHH_T[i, j] #Updating W
          }
        }
      }
      list <- list('W'=W, 'H'=H)
      return(list)
    }

Let’s initialize a random *n* × *m* matrix and test our function.

    require(NMF)

    ## Loading required package: NMF

    ## Loading required package: pkgmaker

    ## Loading required package: registry

    ## Loading required package: rngtools

    ## Loading required package: cluster

    ## NMF - BioConductor layer [OK] | Shared memory capabilities [NO: bigmemory] | Cores 3/4

    ##   To enable shared memory capabilities, try: install.extras('
    ## NMF
    ## ')

    R <- rmatrix(5,6)
    R

    ##            [,1]      [,2]      [,3]      [,4]       [,5]       [,6]
    ## [1,] 0.08030134 0.7736751 0.6147097 0.3821339 0.25783252 0.09393022
    ## [2,] 0.16079032 0.3683525 0.3307749 0.6997108 0.31585960 0.19085707
    ## [3,] 0.15405991 0.2730767 0.5833103 0.9711216 0.50227916 0.65214771
    ## [4,] 0.33023836 0.1448116 0.8095771 0.9622800 0.94068573 0.91623198
    ## [5,] 0.78166656 0.5044251 0.6082143 0.2519404 0.01336723 0.05333997

    nmf_mu_results <- nmf_mu(R)
    cat('\fMatrix W is:\n')

    ## Matrix W is:

    print(nmf_mu_results$W)

    ##              [,1]         [,2]         [,3]         [,4]         [,5]
    ## [1,] 1.167587e-04 1.329076e-01 2.599640e-02 0.0001678918 1.025284e+00
    ## [2,] 2.052156e-02 2.859312e-01 7.373567e-01 0.0003832145 3.975573e-01
    ## [3,] 1.700277e-03 1.012723e+00 3.202575e-03 0.0211059341 3.497042e-01
    ## [4,] 9.738447e-01 1.041818e+00 7.147977e-06 0.2858207010 4.754010e-02
    ## [5,] 1.390106e-28 1.434810e-12 7.460885e-02 1.3170228004 5.280082e-05

    cat('Matrix H is:\n')

    ## Matrix H is:

    print(nmf_mu_results$H)

    ##            [,1]         [,2]         [,3]        [,4]         [,5]         [,6]
    ## [1,] 0.03579354 4.166747e-16 2.657444e-01 0.001040474 4.967329e-01 2.432669e-01
    ## [2,] 0.11943848 8.821448e-04 3.760689e-01 0.867085183 4.289237e-01 6.397364e-01
    ## [3,] 0.13708628 9.199461e-02 5.654246e-06 0.477286237 1.434496e-01 2.952987e-51
    ## [4,] 0.58530795 3.772524e-01 4.613812e-01 0.163568764 2.577633e-40 4.008819e-02
    ## [5,] 0.05871216 7.519125e-01 5.495100e-01 0.248016163 1.915549e-01 8.376156e-03

Let’s see if we can reconstruct our original matrix and compare it to
the `nmf` function.

    R

    ##            [,1]      [,2]      [,3]      [,4]       [,5]       [,6]
    ## [1,] 0.08030134 0.7736751 0.6147097 0.3821339 0.25783252 0.09393022
    ## [2,] 0.16079032 0.3683525 0.3307749 0.6997108 0.31585960 0.19085707
    ## [3,] 0.15405991 0.2730767 0.5833103 0.9711216 0.50227916 0.65214771
    ## [4,] 0.33023836 0.1448116 0.8095771 0.9622800 0.94068573 0.91623198
    ## [5,] 0.78166656 0.5044251 0.6082143 0.2519404 0.01336723 0.05333997

    nmf_mu_results$W %*% nmf_mu_results$H

    ##            [,1]      [,2]      [,3]      [,4]       [,5]       [,6]
    ## [1,] 0.07973713 0.7734960 0.6134949 0.3819646 0.25719259 0.09364891
    ## [2,] 0.15953297 0.3671579 0.3316260 0.6985416 0.31476396 0.19125819
    ## [3,] 0.15434338 0.2720972 0.5832094 0.9698322 0.50267252 0.65206480
    ## [4,] 0.32937582 0.1444922 0.8085853 0.9629038 0.93970869 0.91524936
    ## [5,] 0.78109487 0.5037533 0.6076790 0.2510467 0.01071272 0.05279750

We get the same results using the `nmf` function with the `lee` method.

    nmf <- nmf(R, dim(R)[1], method = 'lee')
    basis(nmf) %*% coefficients(nmf)

    ##            [,1]      [,2]      [,3]      [,4]       [,5]       [,6]
    ## [1,] 0.08029379 0.7737373 0.6146599 0.3821554 0.25776427 0.09400846
    ## [2,] 0.16070437 0.3682799 0.3309470 0.6997236 0.31574884 0.19091673
    ## [3,] 0.15407763 0.2730310 0.5833494 0.9711158 0.50232406 0.65210356
    ## [4,] 0.33022632 0.1448832 0.8095541 0.9622771 0.94069326 0.91624162
    ## [5,] 0.78168749 0.5043936 0.6081637 0.2519126 0.01503493 0.05338208

Now we will take a look at another method of implementing NMF. This one
is called Stochastic Gradient Descent (SGD). A gradient descent is a
first-order iterative optimization algorithm to finding a local minimum
for a function that is differentiable. In fact, we used the Block
Coordinate Descent in the multiplicative update rule. In SGD, we take
the derivative of the cost function like before. However, we will now be
focusing on taking the derivative of each variable, setting them to zero
or lower, solving for the feature variables, and finally updating each
feature. We also add a regularization term in the cost function to
control for overfitting.

$$
$||V - WH||\_{F}^{2} = \\Sigma\_{i,j}(V - WH)^{2}\_{ij}$
$$

$$
$e\_{ij}^{2} = \\Sigma\_{i,j}(v\_{ij}- \\hat v\_{ij})^{2} = (v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj})^{2}$
$$

$$
$e\_{ij}^{2}  = (v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj})^{2} + \\lambda\\Sigma\_{k=1}^{K}(||W||^{2} + ||H||^{2})$
$$

*λ* is used to control the magnitudes of *w* and *h* such that they
would provide a good approximation of *v*. We will update each feature
with each sample. We choose a small *λ*, such as 0.01. The update is
given by the equations below:
$$
$w\_{ik} \\leftarrow w\_{ik} - \\eta \\frac{\\partial}{\\partial w\_{ik}}e\_{ij}^{2}$
$$

$$
$h\_{kj} \\leftarrow h\_{kj} - \\eta \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2}$
$$

*η* is the learning rate and modifies the magnitude that we update the
features. We first solve for $ e\_{ij}^{2}$.

$$
$Using the chain rule, \\frac{\\partial}{\\partial h\_{kj}}(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) = \\frac{\\partial u^{2}}{\\partial v} \\frac{\\partial u}{\\partial v}, where u = (v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) and \\frac{\\partial u^{2}}{\\partial v} = 2u$
$$

$$
$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = 2(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) \\frac{\\partial}{\\partial h\_{kj}}(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) + 2\\lambda h\_{kj} $
$$

$$
$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = -2e\_{ij}w\_{ik} + 2\\lambda h\_{kj} $
$$

The final update rules for both *W* and *H*:

$$
$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = -2e\_{ij}w\_{ik} + 2\\lambda h\_{kj} $
$$

$$
$ \\frac{\\partial}{\\partial w\_{ik}}e\_{ij}^{2} = -2e\_{ij}h + 2\\lambda w\_{ik} $
$$

    frob_norm <- function(M){
      norm = 0
      for (i in 1:dim(M)[1]){
        for (j in 1:dim(M)[2]){
          norm = norm + M[i,j] ** 2
        }
      }
      return(sqrt(norm))
    }
    nmf_sgd <- function(A,steps = 50000, lam = 1e-2, lr = 1e-3){
      N = dim(A)[1]
      M = dim(A)[2]
      K = N
      W <- rmatrix(N,K)
      H <- rmatrix(K,M)
      for (step in 1:steps){
        R =  A - W %*% H 
        dW = R %*% t(H) - W*lam
        dH = t(W) %*% R - H*lam
        W = W + lr * dW
        H = H + lr * dH
        if (frob_norm(A - W %*% H) < 0.01){
          print(frob_norm(A - W %*% H))
          break
        }
      }
      list <- list(W, t(H))
      return(list)
    }

    nmf_sgd_results <- nmf_sgd(R)
    R

    ##            [,1]      [,2]      [,3]      [,4]       [,5]       [,6]
    ## [1,] 0.08030134 0.7736751 0.6147097 0.3821339 0.25783252 0.09393022
    ## [2,] 0.16079032 0.3683525 0.3307749 0.6997108 0.31585960 0.19085707
    ## [3,] 0.15405991 0.2730767 0.5833103 0.9711216 0.50227916 0.65214771
    ## [4,] 0.33023836 0.1448116 0.8095771 0.9622800 0.94068573 0.91623198
    ## [5,] 0.78166656 0.5044251 0.6082143 0.2519404 0.01336723 0.05333997

The reconstructed method using our NMF function looks like this:

    nmf_sgd_results[[1]] %*% t(nmf_sgd_results[[2]])

    ##            [,1]      [,2]      [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.08367952 0.7661573 0.6105105 0.3829393 0.2564913 0.09472266
    ## [2,] 0.15941655 0.3659676 0.3332958 0.6926317 0.3128113 0.19522354
    ## [3,] 0.15570117 0.2726540 0.5813932 0.9650066 0.5057873 0.64668788
    ## [4,] 0.32858050 0.1468413 0.8065566 0.9614898 0.9332285 0.91218084
    ## [5,] 0.77304809 0.5024013 0.6048022 0.2522307 0.0158955 0.05409287

As you can see, it is a near approximation of the original matrix. In
another post, I will go into detail the differences between each
dimensional reduction technique. See below for more information on NMF.

Sources and additional information:

<a href="https://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf" class="uri">https://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf</a>

<a href="https://github.com/hpark3910/nonnegative-matrix-factorization" class="uri">https://github.com/hpark3910/nonnegative-matrix-factorization</a>

<a href="https://www.almoststochastic.com/2013/06/nonnegative-matrix-factorization.html" class="uri">https://www.almoststochastic.com/2013/06/nonnegative-matrix-factorization.html</a>

<a href="https://github.com/carriexu24/NMF-from-scratch-using-SGD" class="uri">https://github.com/carriexu24/NMF-from-scratch-using-SGD</a>

<a href="https://albertauyeung.github.io/2017/04/23/python-matrix-factorization.html" class="uri">https://albertauyeung.github.io/2017/04/23/python-matrix-factorization.html</a>
