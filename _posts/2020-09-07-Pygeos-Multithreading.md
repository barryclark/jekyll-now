---
layout: post
title: Multithreading PyGEOS
---

In this blogpost I describe how to make use of multithreading in the latest version of PyGEOS (version 0.8).
For information about PyGEOS, please read my [previous blogpost](https://caspervdw.github.io/Introducing-Pygeos/), or consult the [documentation](https://pygeos.readthedocs.org).


## Multithreading

Multithreading is a technique to parallelize workload on a single CPU core. In contrast to multiprocessing, resources are shared amongst threads: the threads run on the same CPU core and use the same RAM. Because of this, the overhead of multithreading is much smaller than of multiprocessing. However, for Python code, mulithreading is blocked by the Global Interpreter Lock (GIL).

Luckily, PyGEOS runs mostly in C++ (GEOS). In PyGEOS 0.8 we now safely lift the Global Interpreter Lock, so that you can now take advantage of multithreading.

## Example

We are going to dive in straight away and measure the distance between 120000 points and a complex geometry.
We vary the amount of threads and correspondingly reduce the compute 'portions' each thread receives.
The total work stays the same for all tests.

```python
import pygeos
import dask.array
import time

# array with pygeos geometries
arr =  pygeos.points(np.random.randn(120000, 2) * 100)
# complex geometry
poly = pygeos.buffer(pygeos.multipoints(np.random.randn(20, 2) * 100), 0.2, quadsegs=20)

time_mean = []
time_std = []

for n in (1, 2, 3, 4, 6, 8):
    # define the operation
    arr_dask = dask.array.from_array(arr, chunks=int(len(arr) / n))
    res = arr_dask.map_blocks(pygeos.distance, poly, dtype=float)

    # run the benchmark 10 times
    times = []
    for _ in range(10):
        before = time.time()
        if n == 1:
            res.compute(scheduler="single-threaded", optimize_graph=False)
        else:
            res.compute(scheduler="threads", optimize_graph=False, num_workers=n)
        times.append(time.time() - before)

    time_mean.append(np.mean(times))
    time_std.append(np.std(times))
```

Note that this example uses [dask](https://dask.org/) for the multithreading.
This is just for convenience: this example runs just as well using the Python built-in ``threading`` module.


| threads | compute time [s] |
|---------|------------------|
| 1       | 3.03             |
| 2       | 1.33             |
| 3       | 0.90             |
| 4       | 0.73             |
| 6       | 0.77             |
| 8       | 0.74             |


What we see is that the multithreading improves performance by a factor of 4. This is no surprise: my CPU allows 4 threads per core. 
In PyGEOS 0.7 there is no advantage of multithreading.

## Technicalities

Of course, the [GIL](https://wiki.python.org/moin/GlobalInterpreterLock) is there for a reason. Python depends on it. You cannot use Python when there is no GIL. So, after we made sure that there were no Python C API calls from our extension code, we wrapped our C code in ``Py_BEGIN_ALLOW_THREADS`` and ``Py_END_ALLOW_THREADS``, which releases the GIL (see for example [the distance function](https://github.com/pygeos/pygeos/blob/77123ff4f8c7d065db49b045df3f3796a60d40f1/src/ufuncs.c#L848)).

However, this was not all. In PyGEOS we are in the situation that we loop over an array with Python objects. So we do in fact make use of Python object while the GIL is released! Of course we could collect the underlying C structs in a seperate loop (while holding the GIL), but there appeared to be a more elegant way to doing this. Access to the ``GEOSGeometry`` is via a static attribute ``geom->ptr`` on each Python Geometry object. So to retrieve the object, we do not actually need the Python interpreter.

So are we safe? No. We were able to crash the interpeter by constructing a test with 1 thread doing a computation on the ndarray, and the other thread deleting objects from the ndarray. This lead to a Segfault; the first thread was trying to access a geometry that did not exist anymore.

To guarantee the existence of the python objects, we therefore wrap each function (on the Python level) with a decorator that makes the ndarray read-only ([link](https://github.com/pygeos/pygeos/blob/77123ff4f8c7d065db49b045df3f3796a60d40f1/pygeos/decorators.py#L33)). So, during the functions that release the GIL internally, arrays are locked.

## Summary

PyGEOS 0.8 allows multithreading, giving a factor 4 performance improvement on most systems.
