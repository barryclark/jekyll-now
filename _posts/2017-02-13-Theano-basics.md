---
layout: post
title: Theano basics   
published: true
---   
This post provides a cheatsheet about the basics in Theano for quick deployment. This note does not replace the Theano official documentation but rather a summary on imporant features in Theano.   


### `theano.tensor.nnet.softmax(x)`  
* `x`: 1-D or 2-D tensor only (not higher)
* softmax taken over dim 1
* Example:
```
x = theano.tensor.dmatrix('x')
y = theano.tensor.nnet.softmax(x)
f = theano.function([x],y)
# evaluate
a = np.random.randn(20,16)
b = f(a)
b.shape # (20,16)
b.sum(1) #[1., 1., ..., 1.]
b.sum(1).shape #(20,)
```

### Understand shared variables

* In Theano memory, there are two types of variables: `TensorVarible` (usually symbolic variable or data holder) and `SharedVariable` (actually contain numerical values but in theano memory). There is `TensorVariable` containing numerical data. For example, `theano.tensor.alloc(1., 4,4)`
* Shared variables are usually used to initialize variables with predefined numerical values (e.g., weight matrices in networks). If it is done [correctly](http://deeplearning.net/software/theano/tutorial/aliasing.html), Theano will sends these variables to GPU memory for fast computation.  

* We can view `SharedVariable` using `.eval()`

* It seems that we cannot feed as input shared variables to `theano.function` ? (I am getting more confident in it) If so, data can only be stored in numpy memory.
* Initialize a shared variable in GPU using `dtype=theano.config.floatX`and show its values using `.get_value()`
e.g.,  
```
a = np.array([[1,2],[3,4]], dtype=theano.config.floatX)
x = theano.shared(a)
print x # <CudaNdarrayType(float32, matrix)>
x.get_value()
```
* As compared to `TensorVariable` object, SharedVariable is not symbolic. It has specific numerical values but stored in GPU(?)  
* When numerical values are fed to Theano symbolic variables, in which memory are these variables stored (Theano memory or Numpy memory) ?


### Looping in Theano with `theano.scan`  
* Why use `theano.scan`?
  * number of iterations can be part of symbolic computational graph  
  * Computes graidents through sequential steps  
  * Slightly faster than `for` loop in Python  
  * minimizes GPU transfers  
* Note:
  * `theano.scan` itself builds a symbolic computational graph which can be called by further using `theano.function`
* Usage:
  * Scan a function along some input sequence (e.g., the leading dimension of a matrix, i.e., each row in order starting from row 0 at a time) producing an output at each timestep  
  * Scan a *recurrence* function along some input sequences

* General syntax:

```
scan(fn, sequences = [ dict(input= Sequence1, taps = [-3,2,-1])
                     , Sequence2
                     , dict(input =  Sequence3, taps = 3) ]
                     , outputs_info = [ dict(initial =  Output1, taps = [-3,-5])
                                      , dict(initial = Output2, taps = None)
                                      , Output3 ]
                     , non_sequences = [ Argument1, Argument2])
```
`fn` expects the following arguments in this given order:  
```
    Sequence1[t-3]
    Sequence1[t+2]
    Sequence1[t-1]
    Sequence2[t]
    Sequence3[t+3]
    Output1[t-3]
    Output1[t-5]
    Output3[t-1]
    Argument1
    Argument2
```
where
  * `sequences` keyword is for sequential input with given taps. The function scans over the leading dimension of the input tensor sequentially with given taps.  
  * `outputs_info` keyword is for initial values of recurrent variables. `theano.scan` automatically puts the function result with predefined taps to `outputs_info` after each timestep to perform recurrence (Yes, somehow `theano.scan` is smart enough to remeber those recurrent variables with predefined taps after each timestep). In another word, `theano.scan` sees variables in `outputs_info` and their corresponding position in the function and realizes 'Hey! these guys (at some specific positios in the function) are recurrent variables and I'm gonna compute them recurrently following the logic it is provided inside `theano.scan`'.
  *  `non_sequences` is for non-sequential input.

### Convention in Theano  
* When writing an optimizers, every variables are either `SharedVariable` or *symbolic*, and every function is *symbolic*, too.

* In `train` function, every variables are either `SharedVariable` or *symbolic* and every function is *symbolic* until the epoch loop. Recall that `theano.function` is used to realize symbolic functions with actual numerical values  
* To check some `TensorVariable` in a function (e.g, its dimensionality), identify which of the function's args are `SharedVariable` and usually the rest are `TensorVariable` (symbolic). Build a `theano.function` and supply numerical values to `TensorVariable`s to get numerical results of `TensorVariable`s of interest.
* A convenient way to define a `theano.scan` function is that
  * Firstly, define a onestep function , e.g, `oneStep(x_tm1, A, b)` for recurrent formula `x(t) = A x(t-1) + b`
  * Then, construct all `TheanoVariable`s as needed and define a `theano.scan` properly using `oneStep` (of course, the resulting `theano.scan` is a symbolic function)  
* Data tensor for LSTM is `(timesteps, samples, features)` since in Theano, recurrent models make use of `theano.scan` which processes data sequentially along the leading dimension of the sequential data tensor
* Remember `oneStep` function to actually construct symbolic computational graph for a recurrent formular at one step.
* Very importantly, `theano.grad` can compute gradient automatically through sequential steps in `theano.scan`. That is why `theano.scan` is so beautiful :)
* Some important functions to write in Theano:
  * `build_model`: construct symbolic computational graph for cost and prediction
  * `optimizers`: given parameters, cost function, computes updates for parameters
  * `prediction`: compute appropriate prediction scores to new data from the saved model
  * `train`: train the model for some epoches and make validation and test prediction frequently.
