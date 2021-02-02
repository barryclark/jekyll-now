---
layout: post
title: First Python Contribution, hopefully
date: 29 November 2020
time: 21:00 UTC-4
---

I have been writing Python since 2011, it has a special place in my heart as it is the only one I still use. My first languages were BASIC, PHP, and then Python. Since then I've seen so many great changes, my personal favorites have been lambdas and list comprehensions, which make code just so much more beautiful. Like below I wrote out a not so quick, quicksort(not in place).

```python
quicksort = lambda array:\
    array if len(array) <= 1 else\
    quicksort([i for i in array[1:] if i <= array[0]])\
    + [array[0]] +\
    quicksort([i for i in array[1:] if i > array[0]])
```

The continued rollout of functional style programming has been just a joy to watch, currently [PEP-0622](https://www.python.org/dev/peps/pep-0622/) is being implemented, and this is going to be such a great addition that will allow for much more efficient and readable code. One of the examples from the PEP is laid below:

```python
def make_point_3d(pt):
    match pt:
        case (x, y):
            return Point3d(x, y, 0)
        case (x, y, z):
            return Point3d(x, y, z)
        case Point2d(x, y):
            return Point3d(x, y, 0)
        case Point3d(_, _, _):
            return pt
        case _:
            raise TypeError("not a point we support")
```


Coming from an OCaml, Erlang, and Haskell background, the introduction of pattern matching to Python will be so warmly welcomed, and the dev team at Python are gods for bringing this feature in my eyes. After years of writing Python, I've decided that I will start picking up a good bit of the low lying issues and try and become a contributor, in my opinion it's the least I can do to a language that I use the most alongside OCaml, Haskell and C++.

## Why I would want to contribute

I have a feeling it is easy to write off someone when they do not have a professional background in certain technologies. I've always felt that if you can be fundamentally sound, technologies come and go. I can see in the next 10 or 20 years, Python and C/C++ being replaced by Golang and Rust respectively. So I think going forward I will be trying to get involved and contribute back to the Python community, as it has treated me well over the last 7 years. So currently I've pushed up a pull request to add support for Python's doctest to ignore case on matching. The reason this is most likely wanted, is on Windows the operating system returns `NaN` and on POSIX the operating system returns `nan` for not a number floating points.

I honestly would be somewhat surprised if it gets merged because mostly you can emulate these functionalities likewise.

```python
# test.py
from math import isnan
def someFunctionReturningNan():
    """
    On POSIX this should fail

    >>> someFunctionReturningNan()
    NaN

    On Windows the following should fail.

    >>> someFunctionReturningNan()
    nan

    >>> isnan(someFunctionReturningNan())
    True
    """
    return float("NaN")

if __name__ == "__main__":
    import doctest
    doctest.testmod()
```

When run `python3 test.py -v`:

```
$ python3 test.py -v
**********************************************************************
File "/Users/justinbaum/justinba1010.github.io/test.py", line 7, in __main__.someFunctionReturningNan
Failed example:
    someFunctionReturningNan()
Expected:
    NaN
Got:
    nan
**********************************************************************
1 items had failures:
   1 of   3 in __main__.someFunctionReturningNan
***Test Failed*** 1 failures.
```


The links to the [pull request bpo-13337](https://github.com/python/cpython/pull/23547), and [Python issue #13337](https://bugs.python.org/issue13337), can be found here.

