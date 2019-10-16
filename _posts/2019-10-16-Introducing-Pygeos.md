---
layout: post
title: Introducing PyGEOS
---

In this blogpost I present my new Python package: *PyGEOS*. PyGEOS ([documentation](https://pygeos.readthedocs.org)) is a library that exposes geospatial operations from GEOS into Python. Arrays of geometries can be operated on with almost zero Python interpreter overhead, leading to performance increases of up to 100 times compared to current *shapely* or *geopandas* usage.

I aim to keep the API (and performance) of PyGEOS close to that of PostGIS: the de facto standard library of geospatial analysis on large datasets.

This work has been inspired by the efforts of Joris Van den Bossche and Matthew Rocklin on accelerating *geopandas*. I recommend reading their earlier blogposts on this subject:

- https://jorisvandenbossche.github.io/blog/2017/09/19/geopandas-cython/
- http://matthewrocklin.com/blog/work/2017/09/21/accelerating-geopandas-1

Also, thanks Joris for combining efforts on turning PyGEOS into a mature project.

## PyGEOS

PyGEOS aims to provide vectorized geospatial operations to the Python ecosystem. "vectorized" means that the operations not only work on single geometry objects: they work on N-dimensional arrays in an elementwise fashion. A short example:

```python
import pygeos
import numpy as np

points = [
    pygeos.Geometry("POINT (1 9)"),
    pygeos.Geometry("POINT (3 5)"),
    pygeos.Geometry("POINT (7 6)")
]
box = pygeos.box(2, 2, 7, 7)
pygeos.contains(box, points)
```
```
>>> array([False,  True, False])
```

Here, we computed whether the three `points` are contained in `box` in one go.

## GEOS (Geometry Engine - Open Source)
PyGEOS merely wraps [GEOS](https://geos.osgeo.org/) in Python. The core `pygeos.Geometry` object contains a C-pointer to the actual `GEOSGeometry` struct.

```python
box._ptr
```
```
94625728372472
```

Working with raw C-pointers has a big advantage: there is no overhead from the Python interpreter when accessing the object. This is why PyGEOS is fast. The flip side is that memory leaks and segfaults are very easy to come by.

### Garbage collecting
The `pygeos.Geometry` uses the Python internals to be able to clean the underlying `GEOSGeometry` when it is not used anymore. In general, each Python object keeps a *reference count*, which is increased when you make another reference (`box2 = box`), and decreased when the variable goes out of scope.

Whenever the reference count becomes zero, Python (more specifically: the *garbage collector*) automatically calls the deallocation method on `pygeos.Geometry`, which destroys the underlying `GEOSGeometry`. The bottomline is that once this is set up, we do need to worry about memory management anymore.

This was the first time I actually did something with the Python C-API. I recommend reading [the Python docs](https://docs.python.org/3/c-api/typeobj.html) or having a look at the [PyGEOS source](https://github.com/pygeos/pygeos/blob/master/src/pygeom.c) if you're interested in how this works exactly.

## NumPy ufuncs
The functions in PyGEOS are Numpy *universal functions* or *ufuncs* ([further reading](https://docs.scipy.org/doc/numpy/user/c-info.ufunc-tutorial.html)). This makes them array-aware and able to do all the broadcasting gymnastics you may know from NumPy. An example:

```python
import pygeos
import numpy as np

# create a 5 boxes that have increasing x-coordinates
poly_x = np.array([pygeos.box(0 + i, 0, 10 + i, 10) for i in range(5)])
# create a 5 boxes that have increasing y-coordinates
poly_y = np.array([pygeos.box(0, 0 + i, 10, 10 + i) for i in range(5)])
# intersect all combinations
squares = pygeos.intersection(poly_x[:, np.newaxis], poly_y[np.newaxis, :])
# compute the areas
pygeos.area(squares)
```
```
array([[100.,  90.,  80.,  70.,  60.],
       [ 90.,  81.,  72.,  63.,  54.],
       [ 80.,  72.,  64.,  56.,  48.],
       [ 70.,  63.,  56.,  49.,  42.],
       [ 60.,  54.,  48.,  42.,  36.]])
```

## Reprojections using PyPROJ
PyGEOS provides a way to `apply` functions to coordinates directly. This can be used to translate, scale, or reproject you geometries. An example using `pyproj` to project a point from lat/lon to webmercator:

```python
import pyproj

def transform(coords):
    x, y = pyproj.transform(
        pyproj.CRS("EPSG:4326"),  # WGS84 lat/lon
        pyproj.CRS("EPSG:3857"),  # webmercator
        *coords.T,
    )
    return np.array([x, y]).T

pygeos.apply(pygeos.Geometry("POINT (5.2 52)"), transform)
```
```
<pygeos.Geometry POINT (5.79e+05 6.8e+06)>
```

## Performance
PyGEOS adds almost no overhead on the underlying GEOS operations. As a demonstration, I compare performance with looping over *shapely* objects. 

```python
from shapely.geometry import Point, Polygon

points = [Point(i, i) for i in range(10000)]
poly = Polygon([(10, 10), (10, 100), (100, 100), (100, 10)])
%timeit [poly.contains(point) for point in points]
%timeit [poly.distance(point) for point in points]
```
```
28.9 ms ± 354 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
43.9 ms ± 551 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
```

```python
points2 = pygeos.points(np.arange(10000), np.arange(10000))
poly2 = pygeos.polygons([(10, 10), (10, 100), (100, 100), (100, 10)])
%timeit pygeos.contains(poly2, points2)
%timeit pygeos.distance(poly2, points2)
```
```
212 µs ± 1.1 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
10.1 ms ± 86.5 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
```

As you can see, the performance increase is significant: a factor 4 for `distance` and a whopping `136` for `contains`! Note that this example poses a very lightweight GEOS operation, in which case the Python overhead is the dominating factor. But still, the results show that PyGEOS's approach to wrapping Geometry objects works. Please also refer to [this blogpost](https://jorisvandenbossche.github.io/blog/2017/03/18/vectorized-shapely-cython/) to see that the reported performance is the same as the performance on geopandas' Cython branch.

## Outlook
To summarize, PyGEOS provides performant geospatial operations using the familiar NumPy array interface.

Stuff we want to do in the future:
- let [geopandas](http://geopandas.org/) make use of PyGEOS
- possible integration with [shapely](https://shapely.readthedocs.io)
- multithreading: release the GIL during GEOS operations for better performance
- spatial joins using geospatial indexes 
- providing "prepared geometries" to increase performance when multiple
  predicates are applied on the same geometries 
- wrapping more GEOS functions
- and more, see https://github.com/pygeos/pygeos/issues
