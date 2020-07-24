---
layout: post
title: Find the Memory Usage of a Python Object with Single Dispatch
---

In reading this post, my hope is that you will understand:
* what single dispatch is
* why single dispatch is useful for computing the memory usage of a python object
* a well-written real-world implementation (in the Dask codebase) that showcases the above two items

----

### What is Single Dispatch 

A fancy name for a simple concept. You leverage Single Dispatch when you have different implementations for a given method based on the type of the argument to that method. Essentially you are _dispatching_ the argument to the method (for single dispatch, we are specifically talking about a _single_ argument) to an implementation that can handle that argument's type. 

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

Chances are, when you are interested in "the memory usage of an object", you have the recursive interpretation, meaning you want the sum of the memory usage of the original object plus the memory usage of all other objects it refers to. 

When dealing with a list or a primitive type, `sys.getsizeof` will work just fine. But if you want a generic method to compute the size of any object, that method will need to have different implementations depending on the type of the object, because it'll need to know which outbound pointers to follow to get an accurate sum. Since the implementation is type-dependent, we have a perfect use case for single-dispatch.


### Dask's Implementation: A Simple Case 

Note: I did not write any of the below code, I just encountered it and thought it was worth reflecting on.

There are two general pieces of Dask's dispatch solution to this problem. The first piece is the various implementations of the sizeof method, which are located [in `dask/sizeof.py`](https://github.com/dask/dask/blob/master/dask/sizeof.py). The second piece is the actual dispatch mechanism, which is located [here](https://github.com/dask/dask/blob/master/dask/utils.py#L442). The dispatch mechanism is responsible for routing a call to `sizeof` to the appropriate method in `sizeof.py` at runtime, depending on the type of the argument. So if a user calls `sizeof({"a": list(range(1000))})`, since the type of the argument is a `dict`, the Dispatch mechanism needs to use the correct `sizeof` implementation (in this case, located [here](https://github.com/dask/dask/blob/master/dask/sizeof.py#L41) and return the result of that method call.

Let's step through how the memory usage for a dictionary would be computed: 

1. Some code imports the `dask.sizeof` module. 
2. The top-level code in the module gets run, including the various calls to `@sizeof.register(<type>)`. For the dictionary example, `@sizeof.register(dict)` gets run. 
3. The `register` method, defined [here](https://github.com/dask/dask/blob/master/dask/utils.py#L451) then populates an internal dictionary, stored in `self._lookup` that maps the argument to the `register` function to the function object. So after the call to , the `self._lookup` dictionary in the `Dispatch` object will contain the following entry: 
```
{
	'dict': <function that computes sizeof for dict>
}
```
4. Later on, some code calls `sizeof(<dictionary object>)`. 
5. This calls `__call__`, which then calls `dispatch` with `type(<dictionary object>)` (which should be `dict`), which then looks up the previously registered function implementation in the internal dictionary, and then runs that function that with the arguments supplied.

The "narrative" version of this code is probably more complicated to follow than the code itself. The gist of the code described above: register a `sizeof` implementation for objects of a certain type, and then when you call `sizeof` later on, figure out the type of the argument and run the appropriate implementation (which should have been previously registered). In this way, you can have different `sizeof` implementations for different types.


### Dask's Implementation: A Slightly More Complex Case

In order to register a `sizeof` implementation in the above scheme, you need to know the type of the argument you want to register an implementation for. Importantly, this means that you have to import that type to be able to register the appropriate `sizeof` implementation. This might not always be feasible to do. Why? Because each user of Dask might not have the same packages installed (see [here](https://github.com/dask/dask/blob/master/setup.py#L11-L27)). So if you're only using Dask for the `bag` functionality, you won't have numpy installed, and so you can't eagerly register an implementation for a numpy array because that package hasn't been installed. 

I think Dask has an elegant solution to this problem that relies on lazily registering the implementation for a specific type. It's harder to describe than it is to step through it, so let's walk through how this works for a numpy array.

1. Some code imports the `dask.sizeof` module. 
2. The top-level code in `dask.sizeof.py` gets run, including the various calls to `@sizeof.register_lazy`. For the numpy array example, `@sizeof.register_lazy("numpy")`. Note: the argument to `register_lazy` is just a string -- the numpy package hasn't been imported yet (if it had, it would have resulted in an `ImportError` for users who don't have numpy installed).
3. This calls the `register_lazy` method in the `Dispatch` object, which populates a separate internal dictionary `self._lazy`. After this call to `register_lazy`, the `self._lazy` dict should contain the following mapping: 
```
{
	"numpy": [function object representing this code](https://github.com/dask/dask/blob/master/dask/sizeof.py#L82-L89)
}
```
4. Later on, some code calls `sizeof(<numpy array object>)`.
5. As before, this calls into the `dispatch` method. Except this time, when it looks up the implementation in the `self._lookup` dictionary, it will raise a `KeyError`, which is expected. 
6. As the code marches through the `dispatch` method, it will now determine the toplevel package that the type came from. For a numpy array object, this should be "numpy". It will then pop that implementation from the `_lazy` dict, which returns the function object from step 3. 
7. Next, that function object is called, which registers an appropriate `sizeof` implementation for a numpy array, which will populate the `self._lookup` dict that was used in the simpler case.
8. Finally, the `dispatch` method is called again with the same argument (the type of the numpy array object). During the next pass through this method, we should not `KeyError` when looking up an implementation for a numpy array, since it was just registered in step 7. 

Again, the narrative, step-by-step description of this code might be more complicated than the code itself, but laboring through it in this fashion certainly helps me understand it better. The gist is: for types in packages that might not be installed, wait until you know the package is indeed installed (when the `sizeof` method is called for a type in that package) to register the appropriate implementation.

### Wrapping Up

Hopefully you can now appreciate:
- What single dispatch is
- Why it can be useful for computing the memory of a Python object
- A simple and complex example of how this pattern is implemented in a real open-source project