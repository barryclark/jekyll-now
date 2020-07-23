---
layout: post
title: Find the Memory Usage of a Python Object with Single Dispatch
---

In reading this post, my hope is that you will understand:
* what single dispatch is
* why we need it to compute the memory usage of a python object
* a well-written real-world implementation (in the Dask codebase) that showcases the above two items

----

### What is Single Dispatch 

A fancy name for a simple concept. You leverage Single Dispatch when you have different implementations for a given function/method based on the type of the argument to that function/method. Essentially you are _dispatching_ the argument to the method (for single dispatch, we are specifically talking about a _single_ argument) to a method implementation that can handle that argument's type. 

If all that sounds a little abstract, we'll see an example soon that should clarify.


### Computing the Memory Usage of a Python Object

If you search around for how to compute the memory usage of a Python object, you might happen upon the `getsizeof` method in the `sys` module. However, you have to read the docs closely: 

> Only the memory consumption directly attributed to the object is accounted for, not the memory consumption of objects it refers to.

Consider this example:
```
In [1]: import sys

In [2]: sys.getsizeof(list(range(1000)))
Out[2]: 9112

In [3]: sys.getsizeof({"a": list(range(1000))})
Out[3]: 240
```

In the second example, the memory consumption of the list is clearly not being accounted for. The list is an object that the dictionary `refers to`, so its memory consumption is not reported when calling `sys.getsizeof` and passing the dictionary as an argument. 

Chances are, when you are interested in the memory usage of an object, you have the recursive interpretation, meaning you want the sum of the memory usage of the original object plus the memory usage of all other objects it refers to. 

When dealing with a list or a primitive type, `sys.getsizeof` will work just fine. But if you want a generic method to compute the size of any object, that method will need to have different implementations depending on the type of the object, because it'll need to know which outbound pointers to follow to get an accurate sum. Since the implementation is type-dependent, we have a perfect use case for single-dispatch.


### Dask's Implementation: A Simple Case 

There are two general pieces of Dask's dispatch solution. The first piece is the various implementations of the sizeof method, which are located [in `dask/sizeof.py`](https://github.com/dask/dask/blob/master/dask/sizeof.py). The second piece is the actual dispatch mechanism, which is located [here](https://github.com/dask/dask/blob/master/dask/utils.py#L442). The dispatch mechanism is responsible for routing a call to `sizeof` to the appropriate method in `sizeof.py` at runtime, depending on the type of the argument. So if a user calls `sizeof({"a": list(range(1000))})`, since the type of the argument is a `dict`, the Dispatch mechanism needs to use the correct `sizeof` implementation (in this case, located [here](https://github.com/dask/dask/blob/master/dask/sizeof.py#L41) and return the result of that method.

Let's step through how the memory usage for a dictionary would be computed: 

1. Some code imports the `dask.sizeof` module. 
2. The top-level code in the module gets run, including the various calls to `sizeof.register(<type>)` are run. For the dictionary example, `sizeof.register(dict)` gets run. 
3. The `register` method, defined [here](https://github.com/dask/dask/blob/9cb6f98132d892707dc6c71c6e2581966d31a20b/dask/utils.py#L451) then populates an internal dictionary that maps the argument to the `register` function to the function object. So after the call to , the `self._lookup` dictionary in the `Dispatch` object will contain the following entry: 
```
{
	'dict': <function that computes sizeof for dict>
}
```
4. Later on, some code calls `sizeof(<dictionary object>)`. 
5. This calls `__call__`, which then calls `dispatch` with `type(<dictionary object>)` (which should be `dict`), which then looks up the previously registered function implementation in the internal dictionary, and then runs that function that with the arguments supplied.

The "narrative" version of this code is probably more complicated to follow than the code itself. Basically: register a `sizeof` implementation for objects of a certain type, and then when you call `sizeof` later on, figure out the type of the argument and run the appropriate implementation (which should have been previously registered).


### Dask's Implementation: A Slightly More Complex Case





