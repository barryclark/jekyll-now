---
layout: post
title: Writing a variadic currying function using dependent types
---

Oftentimes in programming, there will be a function that can obviously be generalized to an arbitrary number of arguments, and it would be convenient to be able to handle each of the generalized versions of this function in some sort of uniform manner.

One common approach is to use template metaprogramming, which allows for source code creation at compile-time.  In this post, I will demonstrate how one can leverage a sufficiently expressive dependently-typed type system to write such "variadic functions" at the term level, without using any metaprogramming.  As an example, I will write a function that can curry a function of arbitrary arity (and whose tupled argument can be entirely heterogeneous).  I wrote my currying function in Coq, although this approach should translate to most other dependently-typed languages out there. You can find the source code [here](https://gist.github.com/emarzion/ec801f049b40645085ad8ea37df78921).

I don't claim that this approach is practically useful, but hopefully it can give some people a better idea of how powerful true dependent types can be.

# Typing the variadic function

Before we can even begin writing out the function, we need to be able to express its type.  Using informal ellipsis-based notation, we would say that such a function should have the type

![equation](https://latex.codecogs.com/gif.latex?\forall&space;n&space;\forall&space;X_1&space;\ldots&space;X_n&space;Y.&space;(X_1&space;\times&space;\ldots&space;\times&space;X_n&space;\rightarrow&space;Y)&space;\rightarrow&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y.)

We see then that we'll need some way to handle an arbitrary number of universal quantifiers, as well as arbitrarily-sized versions of the product and exponential on types.

As a first step, let's define the type of n-ary functions on types:

![equation](https://latex.codecogs.com/gif.latex?\begin{align*}&space;\mathsf{Ty}&space;&:&space;\mathsf{nat}&space;\rightarrow&space;\mathsf{Type}\\&space;\mathsf{Ty}_0&space;&:=&space;\mathsf{Type}\\&space;\mathsf{Ty}_{n&plus;1}&space;&:=&space;\mathsf{Type}&space;\rightarrow&space;\mathsf{Ty}_n&space;\end{align*})

Given such a type-level function, we can turn it into a type via the universal closure, which captures each type variable under a universal quantifier:

![equation](https://latex.codecogs.com/gif.latex?%5Clambda%20X_1%20%5Cldots%20%5Clambda%20X_n.%20%5CPhi%5BX_1%2C%5Cldots%2CX_n%5D%20%5Cmapsto%20%5Cforall%20X_1%20%5Cldots%20%5Cforall%20X_n.%20%5CPhi%5BX_1%2C%5Cldots%2C%20X_n%5D)

Once again, this can be defined recursively in a fairly straightforward fashion:

![equation](https://latex.codecogs.com/gif.latex?\begin{align*}&space;\mathsf{UC}&space;&:&space;\forall&space;n.&space;\mathsf{Ty}_n&space;\rightarrow&space;\mathsf{Type}\\&space;\mathsf{UC_0}(T)&space;&:=&space;T\\&space;\mathsf{UC_{n&plus;1}}(F)&space;&:=&space;\forall&space;X.&space;\mathsf{UC_n}(FX)&space;\end{align*})

With that out of the way, we see that it suffices now to define the follow type-level function:

![equation](https://latex.codecogs.com/gif.latex?\lambda&space;X_1&space;\ldots&space;\lambda&space;X_n&space;\lambda&space;Y.&space;(X_1&space;\times&space;\ldots&space;\times&space;X_n&space;\rightarrow&space;Y)&space;\rightarrow&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y&space;:&space;\mathsf{Ty}_{n&plus;1})

For the sake of brevity, I won't go into exact detail on how to define this, but it's worth mentioning some of the combinators on type-level functions that are required:

Given a type-level function, increase the arity by one by adding an unused argument at the end:

![equation](https://latex.codecogs.com/gif.latex?%5CPhi%20%5Cmapsto%20%5Clambda%20X_1%5Cldots%5Clambda%20X_n%5Clambda%20Y.%5CPhi%20X_1%20%5Cldots%20X_n)

Given a unary type-level function and a type-level function, apply the unary function underneath all the lambda abstracted arguments:

![equation](https://latex.codecogs.com/gif.latex?F%2C%20%5CPhi%20%5Cmapsto%20%5Clambda%20X_1%5Cldots%5Clambda%20X_n.%20F%28%5CPhi%20X_1%20%5Cldots%20X_n%29)

Given a binary type-level function and two type-level functions of matching arity, apply the binary function to both underneath all the lambda abstracted arguments:

![equation](https://latex.codecogs.com/gif.latex?F%2C%20%5CPhi%2C%5CPsi%20%5Cmapsto%20%5Clambda%20X_1%5Cldots%5Clambda%20X_n.%20F%28%5CPhi%20X_1%20%5Cldots%20X_n%29%28%5CPsi%20X_1%5Cldots%20X_n%29)

# Defining the currying function

With the type defined, we can finally move on to actually defining the function in question.

![equation](https://latex.codecogs.com/png.latex?({\color{Blue}&space;X_1&space;\times&space;\ldots&space;\times&space;X_n}&space;\rightarrow&space;{\color{Green}&space;Y})&space;\rightarrow&space;{\color{Orange}&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Red}&space;X_0}&space;\times&space;{\color{Blue}&space;X_1&space;\times&space;\ldots&space;\times&space;X_n}&space;\rightarrow&space;{\color{Green}&space;Y})&space;\rightarrow&space;{\color{Red}&space;X_0}&space;\rightarrow&space;{\color{Orange}&space;X_1&space;\rightarrow&space;\ldots&space;\rightarrow&space;X_n&space;\rightarrow&space;Y}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Orange}&space;R}.)

![equation](https://latex.codecogs.com/png.latex?({\color{Red}&space;S}&space;\times&space;{\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Red}&space;S}&space;\rightarrow&space;{\color{Orange}&space;R}.)

![equation](https://latex.codecogs.com/png.latex?(({\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Orange}&space;R})&space;\rightarrow&space;({\color{Red}&space;S}&space;\times&space;{\color{Blue}&space;P}&space;\rightarrow&space;{\color{Green}&space;Q})&space;\rightarrow&space;{\color{Red}&space;S}&space;\rightarrow&space;{\color{Orange}&space;R}.)
