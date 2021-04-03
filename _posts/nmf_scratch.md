In this post, I will be discussing Non-negative Matrix Factorization
(NMF). NMF is a low-rank approximation algorithm that discovers latent
features in your data. It is similar to PCA in the sense that they both
reduce high-dimensional data into lower dimensions for better
understanding of the data. The major difference is that PCA projects
data onto a subspace that maximizes variability for the discovered
features, while NMF discovers non-negative features that are additive in
nature. NMF is formally defined as:

*V* ≈ *W**H*

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

$$MSE = \\frac{1}{N}\\Sigma\_{i=1}^{n}(y\_{i}-(mx\_{i}+b))^{2} $$

For the cost function in NMF, we use a similar function called the
Frobenius Norm. It is defined as:

$$||A||\_{F} = \\sqrt{\\Sigma\_{i=1}^{m}\\Sigma\_{j=1}^{n} |a\_{ij}|^{2}}$$

In the case of NMF, we are using the square of the Forbenius norm to
measure how good of an approximation *W**H* is for *V*.

||*V* − *W**H*||<sub>*F*</sub><sup>2</sup> = *Σ*<sub>*i*, *j*</sub>(*V* − *W**H*)<sub>*i**j*</sub><sup>2</sup>

We can see that as *W**H* approaches *V*, then the equation will slowly
converge to zero. Therefore, the optimization can be defined as the
following:

*M**i**n**i**m**i**z**e*||*V* − *W**H*||<sub>*F*</sub><sup>2</sup>*w**i**t**h**r**e**s**p**e**c**t**t**o**W**a**n**d**H*, *s**u**b**j**e**c**t**t**o**t**h**e**c**o**n**s**t**r**a**i**n**t**s**W*, *H* ≥ 0

In the paper by Lee & Seung, they introduced the multiplicative update
rule to solve for NMF. Please see their original paper for details on
the proof. Essentially the update causes the function value to be
non-increasing to converge to zero.

$$H\_{ik} \\leftarrow H\_{ik}\\frac{(W^{T}V)\_{ik}}{(W^{T}WH)\_{ik}}$$

$$W\_{kj} \\leftarrow W\_{kj}\\frac{(VH^{T})\_{kj}}{(WHH^{T})\_{kj}}$$

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

    ##           [,1]       [,2]      [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6098249 0.07780033 0.5036427 0.9293312 0.8763953 0.07508534
    ## [2,] 0.9900919 0.51159727 0.2987921 0.3844445 0.9479624 0.64727933
    ## [3,] 0.4075321 0.35962654 0.0671921 0.2037331 0.2009836 0.53029448
    ## [4,] 0.2101542 0.22512785 0.2195100 0.7888367 0.5983068 0.32782503
    ## [5,] 0.7724956 0.13354221 0.4274080 0.9029237 0.5749455 0.90710130

    nmf_mu_results <- nmf_mu(R)
    cat('\fMatrix W is:\n')

    ## Matrix W is:

    print(nmf_mu_results$W)

    ##              [,1]        [,2]         [,3]         [,4]         [,5]
    ## [1,] 4.008066e-02 0.681538267 0.0002102327 2.791705e-07 8.039092e-01
    ## [2,] 1.573856e-01 0.893470958 0.7526048585 3.068366e-01 8.012390e-02
    ## [3,] 1.696904e-01 0.150865217 0.6220248653 6.327136e-20 1.097122e-07
    ## [4,] 2.625651e-05 0.001427029 0.4108411522 3.573843e-01 5.855591e-01
    ## [5,] 1.017114e+00 0.113626656 0.2198269206 6.742698e-02 7.318530e-01

    cat('Matrix H is:\n')

    ## Matrix H is:

    print(nmf_mu_results$H)

    ##              [,1]         [,2]         [,3]       [,4]       [,5]       [,6]
    ## [1,] 5.185594e-01 4.542570e-04 1.163725e-01 0.01470670 0.03503039 0.70859578
    ## [2,] 7.211187e-01 1.116940e-01 2.820801e-01 0.05517102 0.66063831 0.01280601
    ## [3,] 3.374528e-01 5.476077e-01 1.227339e-10 0.31034710 0.15609930 0.65632639
    ## [4,] 2.229573e-06 3.781990e-15 1.186333e-21 0.03157505 0.62147530 0.08389397
    ## [5,] 1.205935e-01 1.753873e-07 3.780682e-01 1.10823195 0.52900902 0.04670004

Let’s see if we can reconstruct our original matrix and compare it to
the `nmf` function.

    R

    ##           [,1]       [,2]      [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6098249 0.07780033 0.5036427 0.9293312 0.8763953 0.07508534
    ## [2,] 0.9900919 0.51159727 0.2987921 0.3844445 0.9479624 0.64727933
    ## [3,] 0.4075321 0.35962654 0.0671921 0.2037331 0.2009836 0.53029448
    ## [4,] 0.2101542 0.22512785 0.2195100 0.7888367 0.5983068 0.32782503
    ## [5,] 0.7724956 0.13354221 0.4274080 0.9029237 0.5749455 0.90710130

    nmf_mu_results$W %*% nmf_mu_results$H

    ##           [,1]       [,2]       [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6092713 0.07625718 0.50084515 0.9291737 0.8769625 0.07480937
    ## [2,] 0.9895441 0.51199902 0.30063802 0.3836613 0.9463331 0.64640252
    ## [3,] 0.4066903 0.35755341 0.06230341 0.2038627 0.2027094 0.53042521
    ## [4,] 0.2102976 0.22513927 0.22178685 0.7878022 0.5969472 0.32701079
    ## [5,] 0.7718105 0.13353248 0.42710628 0.9026418 0.5740719 0.90629037

We get the same results using the `nmf` function with the `lee` method.

    nmf <- nmf(R, dim(R)[1], method = 'lee')
    basis(nmf) %*% coefficients(nmf)

    ##           [,1]       [,2]       [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6084876 0.07844284 0.50533154 0.9280752 0.8773358 0.07898822
    ## [2,] 0.9913057 0.51082670 0.29777237 0.3860115 0.9469057 0.64704144
    ## [3,] 0.4006564 0.36086829 0.07738822 0.1998359 0.2023975 0.53398146
    ## [4,] 0.2176980 0.22470198 0.22004825 0.7892087 0.5980991 0.32226412
    ## [5,] 0.7734192 0.13348486 0.42399109 0.9041169 0.5749759 0.90674397

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

||*V* − *W**H*||<sub>*F*</sub><sup>2</sup> = *Σ*<sub>*i*, *j*</sub>(*V* − *W**H*)<sub>*i**j*</sub><sup>2</sup>

*e*<sub>*i**j*</sub><sup>2</sup> = *Σ*<sub>*i*, *j*</sub>(*v*<sub>*i**j*</sub> − *v̂*<sub>*i**j*</sub>)<sup>2</sup> = (*v*<sub>*i**j*</sub> − *Σ*<sub>*k* = 1</sub><sup>*K*</sup>*w*<sub>*i**k*</sub>*h*<sub>*k**j*</sub>)<sup>2</sup>

*e*<sub>*i**j*</sub><sup>2</sup> = (*v*<sub>*i**j*</sub> − *Σ*<sub>*k* = 1</sub><sup>*K*</sup>*w*<sub>*i**k*</sub>*h*<sub>*k**j*</sub>)<sup>2</sup> + *λ**Σ*<sub>*k* = 1</sub><sup>*K*</sup>(||*W*||<sup>2</sup> + ||*H*||<sup>2</sup>)

*λ* is used to control the magnitudes of *w* and *h* such that they
would provide a good approximation of *v*. We will update each feature
with each sample. We choose a small *λ*, such as 0.01. The update is
given by the equations below:

$$w\_{ik} \\leftarrow w\_{ik} - \\eta \\frac{\\partial}{\\partial w\_{ik}}e\_{ij}^{2}$$

$$h\_{kj} \\leftarrow h\_{kj} - \\eta \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2}$$

*η* is the learning rate and modifies the magnitude that we update the
features. We first solve for $ e\_{ij}^{2}$.

$$Using the chain rule, \\frac{\\partial}{\\partial h\_{kj}}(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) = \\frac{\\partial u^{2}}{\\partial v} \\frac{\\partial u}{\\partial v}, where u = (v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) and \\frac{\\partial u^{2}}{\\partial v} = 2u$$

$$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = 2(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) \\frac{\\partial}{\\partial h\_{kj}}(v\_{ij} - \\Sigma\_{k=1}^{K}w\_{ik}h\_{kj}) + 2\\lambda h\_{kj} $$

$$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = -2e\_{ij}w\_{ik} + 2\\lambda h\_{kj} $$

The final update rules for both *W* and *H*:

$$ \\frac{\\partial}{\\partial h\_{kj}}e\_{ij}^{2} = -2e\_{ij}w\_{ik} + 2\\lambda h\_{kj} $$

$$ \\frac{\\partial}{\\partial w\_{ik}}e\_{ij}^{2} = -2e\_{ij}h + 2\\lambda w\_{ik} $$

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

    ##           [,1]       [,2]      [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6098249 0.07780033 0.5036427 0.9293312 0.8763953 0.07508534
    ## [2,] 0.9900919 0.51159727 0.2987921 0.3844445 0.9479624 0.64727933
    ## [3,] 0.4075321 0.35962654 0.0671921 0.2037331 0.2009836 0.53029448
    ## [4,] 0.2101542 0.22512785 0.2195100 0.7888367 0.5983068 0.32782503
    ## [5,] 0.7724956 0.13354221 0.4274080 0.9029237 0.5749455 0.90710130

The reconstructed method using our NMF function looks like this:

    nmf_sgd_results[[1]] %*% t(nmf_sgd_results[[2]])

    ##           [,1]      [,2]       [,3]      [,4]      [,5]       [,6]
    ## [1,] 0.6054398 0.0787467 0.50257864 0.9232417 0.8735125 0.08053042
    ## [2,] 0.9859360 0.5085472 0.29746681 0.3886026 0.9410181 0.64467713
    ## [3,] 0.4032156 0.3529533 0.07115558 0.2009204 0.2050974 0.52864963
    ## [4,] 0.2157033 0.2218354 0.21809204 0.7842372 0.5941222 0.32581115
    ## [5,] 0.7699819 0.1373426 0.42455340 0.8991921 0.5757325 0.90003975

As you can see, it is a near approximation of the original matrix. In
another post, I will go into detail the differences between each
dimensional reduction technique. See below for more information on NMF.

Sources and additional information:

<a href="https://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf" class="uri">https://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf</a>

<a href="https://github.com/hpark3910/nonnegative-matrix-factorization" class="uri">https://github.com/hpark3910/nonnegative-matrix-factorization</a>

<a href="https://www.almoststochastic.com/2013/06/nonnegative-matrix-factorization.html" class="uri">https://www.almoststochastic.com/2013/06/nonnegative-matrix-factorization.html</a>

<a href="https://github.com/carriexu24/NMF-from-scratch-using-SGD" class="uri">https://github.com/carriexu24/NMF-from-scratch-using-SGD</a>

<a href="https://albertauyeung.github.io/2017/04/23/python-matrix-factorization.html" class="uri">https://albertauyeung.github.io/2017/04/23/python-matrix-factorization.html</a>
