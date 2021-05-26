---
layout: post
tags: rust varpro
#categories: []
date: 2021-05-31
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Project Spotlight: `varpro` - Nonlinear Fitting with A Simple Interface '
comments_id: 
---

In the last months, I have been developing three crates for Rust. Those crates use different aspects of the language. The first crate is a numerics library, focussing on providing interfaces that are powerful but simple to use. The second one is a fluent coding library using mostly declarative macros and the third crate uses procedural macros to write more expressive tests. In this post I want to briefly introduce the `varpro` numerics library.


# VarPro for Rust
The [varpro crate](https://crates.io/crates/varpro) is a library that allows nonlinear least squares fitting of separable model functions to data in one dimension. The library uses the Variable Projection (VarPro) method, which I explained in an [article on VarPro](/blog/2020/variable-projection-part-1-fundamentals/). The documentation of the crate goes into detail of how to use the crate (and what to use it for), so I won't repeat it all here. However, there is one feature I want to highlight, because I am very happy how it turned out.

## Creating a Simple Interface

Variable Projection is about fitting a function[^notation] $$\eta(t,\boldsymbol{\alpha},\boldsymbol{c}) = \sum_{j=1}^{n} c_j\phi_j(t,\boldsymbol{\alpha})$$, which is a linear combination of nonlinear *model base functions* $$\phi_j(t,\boldsymbol{\alpha})$$. The *model function* $$\eta(t,\boldsymbol{\alpha},\boldsymbol{c})$$ depends on the linear parameters $$\boldsymbol{c}$$ and the nonlinear parameters $$\boldsymbol{\alpha}$$ and the independent variable $$t$$. The model base functions, however, only depend on the nonlinear parameters $$\boldsymbol{\alpha}$$ and the independent variable $$t$$. The VarPro algorithm completely absolves the user from caring about the linear parameters. The user does not even have to provide initial guesses. All that the user has to provide is the set of basis functions $$\phi_j(t,\boldsymbol{\alpha})$$ and the partial derivatives of the base functions with respect to the parameters they depend on. So the main design goal for the interface of the library was to make the process of creating a set of basis functions (including their derivatives) simple and safe. 

If we look at the basis functions $$\phi_j(t,\boldsymbol{\alpha})$$, it looks like this suggests a function signature like `Fn(Scalar,Vector)->Scalar`. But since we are dealing with a collection of one dimensional data, it makes sense to give the whole set of independent values at once. That means we give `t` as a vector of the independent values and have the function return a vector which just means that the underlying functions is applied to all values in the set. This allows us to take advantage of batch operations on vectors in the function implementation[^nalgebra]. So does that mean we use `Fn(Vector,Vector)->Vector` as the function signature? Almost, but not quite. Let me explain why.

Assume we have a model that depends on 2 nonlinear parameters $$\mu,\nu$$, which means $$\boldsymbol{\alpha}=(\mu,\nu)^T$$. Furthermore, we have 2 base functions, which depend on a subset of the parameters $$\phi_1=\phi_1(t,\mu,\nu)$$ and $$\phi_1=\phi_2(t,\nu)$$. We can see that the base functions each depend on their own subset of the total model parameters. Not all functions might depend on all parameters. Furthermore, the number of parameters that each base function can depend on is variadic. So instead of making model functions take their parameters as a vector, I decided I would make a variadic function interface that allows me to pass the functions in a way that is intuitive and easy to read. How I did that is the content of this [previous post](/blog/2021/rust-traits-and-variadic-functions/).

What I ended up with, is a pretty simple interface for building a model function from base functions and a set of derivatives. I can implement the functions
$$\phi_1=\phi_1(t,\mu,\nu)$$ and $$\phi_1=\phi_2(t,\nu)$$ in Rust like so [^types]:

```rust
fn phi1(t: &Vector, mu : Scalar, nu: Scalar) -> Vector {
    /**calculations**/
}
fn phi2(t: &Vector, nu : Scalar) -> Vector {
    /**calculations**/
}
```
Also we have to provide the partial derivatives with respect to all the parameters that the functions depend on. For our example that would be $$\partial/\partial_\mu \phi_1$$, $$\partial/\partial_\nu \phi_1$$, and $$\partial/\partial_\nu \phi_2$$. We could implement them like so:
```rust
fn phi1_dmu(t: &Vector, mu : Scalar, nu: Scalar) -> Vector {
    /**calculations**/
}
fn phi1_dnu(t: &Vector, mu : Scalar, nu: Scalar) -> Vector {
    /**calculations**/
}
fn phi2_dnu(t: &Vector, nu : Scalar) -> Vector {
    /**calculations**/
}
```
Now we can build our model function set using these base functions and their derivatives. We do that by using the `SeparableModelBuilder` like so
```rust
let model =
   SeparableModelBuilder::new(&["mu", "nu"]) //(1)
  .function(&["mu", "nu"], phi1)             //(2)
  .partial_deriv("mu", phi1_dmu)             //(3)
  .partial_deriv("nu", phi1_dnu)             //(4)
  .function(&["nu"], phi2)                   //(4)
  .partial_deriv("nu", phi2_dnu)             //(5)
  .build()                                   //(6)
  .unwrap();
``` 
In line (1) we are creating an empty model with the parameters $$\boldsymbol{\alpha}=(\mu,\nu)^T$$. In line (2) we are adding the function `phi1` and telling the model which parameters this function depends on (order left to right). In line (3) and (4) we are providing the partial derivatives of the function `phi1` and then we are repeating the process for `phi2`. The base functions can be any callables with the correct signature, including --of course-- lambdas.

# Conclusion
This concludes my spotlight on the varpro crate. I am pretty happy with how the interface turned out, because it allows me some compile time sanity checks and a lot of runtime error checking. I think it is pretty straightforward to build model functions using the faux-variadic solution I mentioned earlier. If you like to use `varpro` for you nonlinear fitting needs, do give it a try.



# Endnotes
[^nalgebra]: I used the [nalgebra](https://www.nalgebra.org/) package to take care of linear algebra.
[^notation]: In my article on varpro, I used the notation $$f(\boldsymbol{\alpha},t)$$, but to be consistent with how I implemented it in the library (for reasons that will become apparent later), I'll pull $$t$$ in the front and use  $$f(t,\boldsymbol{\alpha})$$ notation here. This changes nothing semantically.
[^types]: Here `Vector` is an appropriate column vector type from nalgebra and `Scalar` is an appropriate scalar type. E.g. `type Vector = nalgebra::DVector<f64>` and `type Scalar = f64`.