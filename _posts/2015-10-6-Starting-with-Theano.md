---
layout: post
title: Starting with Theano
---


Hello everyone!

Here we go, my first post. Since I have to learn theano in order to approach my bioinformatics project, these first few posts will be related to the Theano tool.
Besides the posts related to Theano, I will be sharing posts related to the Machine Learning, because that is also one of the pillars of my future projects. Afterwards, there are going to be posts straight from the field of bioinformatics. 


Okay, let's first briefly define what is Theano?

**Theano is a Python library that allows you to define, optimize, and evaluate mathematical expressions involving multi-dimensional arrays efficiently. 

Now we will start with the basic use of theano.

**Get started with Theano: add two numbers together: (open python)

import theano.tensor as T
       from theano import function
       x = T.dscalar('x')
       y = T.dscalar('y')
       z = x + y
       f = function([x,y],z)

**Not that you created your function, apply it:

       f(2,3)
       array(5.0)
       f(16.3, 12.1)
       array(28.4)

**Okay, let's go now and see the explanation behind the function.

First step was to define two symbols(variables) representing the quntities thatyou want to add. The output of the function f is numpy.ndarray with zero dimensions. 
-While typing into an interpreter, you probably noticed the slight delay in executing the function instruction, that is because f function was compiled into C code.

Step 1 

       x = T.dscalar('x')
       y = T.dscalar('y')
**In Theano all symbols must be typed. T.dscalar is the type we assign to "O-dimensional arrays (scalar) of doubles (d)". It is a Theano Type.
dscalar is not a class, neither x nor y are actually instances of dscalar, they are instnces of TensorVariable. 
By calling T.dscalar, with a string argument, you created a Variable representing a floating-point scalar quantity with the given name. If you dont provide any argument, the symbol will remain unname, names are not necessary but are very helpful. 

Step 2

       z = x + y
**Combine the x and y into their sum z.
z is another Variable which represents the adition of x and y. You can use pp() function to check the computational part of z. 
       print pp(z)
       (x + y)

Step 3

       f = function([x,y], z)
**Last step is to create a function taking x and y inputs and giving z as output. First argument of the function is the list of Variables, that will be the input of function. The second argument is a single Variable or a list of Variables, second argument is what we want to see as an output. 

<Extra>
Instead of step 3, you can use eval() method, it is not flexible as function() but it can do everything we covered.
It works this way:

       import theano.tensor as T
       x = T.dscalar('x')
       y = T.dscalar('y')
       z = x + y
       z.eval({x:16.3, y: 12.1})

      array(28.4)


Adding two Matrices

**Let's add two matrices using theano

This is very similar to the previous example, we will use matrix type with x and y.

       x = T.dmatrix('x')
       y = T.dmatrix('y')
       z = x + y
       f = function([x,y], z)

*dmatrix is the Type for matrices of doubles. 

So let's use our new function on 2D arrays:

      f([[1,2], [3,4]], [[10,20], [30,40]])
      array([[11., 22.], [33., 44.]])

**We can also use the NumPy array as inputs:
       import numpy
       f(numpy.array([[1,2], [3,4]]), numpy.array([[10,20], [30,40]]))
       array([[11., 22.], [33., 44.]])

<It is possible to add scalars to matrices, vectors to matrices, scalars to vectors, etc. The behavior of these operations is defined by broadcasting. 

Available type:

-byte: bscalar, bvector, bmatrix, brow, bcol, btensor3, btensor4
-16-butintegers: wscalar, wvector, wmatrix, wrow, wcol, wtensor3, wtensor4
-32-bit-integers: iscalar, ivector, imatrix, irow, icol, itensor3, intesor4
-64-bi-integers: lscalar, lvectro, lmatric, lrow, lcol, ltensor3, ltensor4
-float: fscalar, fvector, fmatrix, frow, fcol, ftensor3, ftensor4
-double: dscalar, dvectro, dmatrix, drow, dcol, dtensor3, dtensor4
-complex: cscalar, cvector, cmatrix, crow, ccol, ctensor3, ctensor4

Exercise

       import theano
       a = theano.tensor.vector()     # declare variable
       out = a + a ** 10              # build symbolic expression
       f = theano.function([a], out)  # compile function
       print(f([0,1,2]))

[  0.   2.  1026.]

Task for you:
Modify and execute this code to compute this expression: a ** 2 + b ** 2 + 2 * a * b.
