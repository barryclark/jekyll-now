---
title: "Documenting Python Tests"
date: 2020-03-06T09:56:13+01:00
---

Automated tests assure the quality of your software and provide a guide how to use the modules.
In Python, you can combine documentation and tests in the same module, using the [doctest](https://docs.python.org/3/library/doctest.html) library:

```python
from functools import reduce
import operator


def scalar_product(vec_a, vec_b):
    """
    Calculate the scalar product of two vectors

    >>> scalar_product(3, 4)
    Traceback (most recent call last):
        ...
    AssertionError: Can only multiply scalars.

    >>> v_a = [1, 0, 2]
    >>> v_b = [1, 1, 3]
    >>> scalar_product(v_a, v_b)
    7
    """
    assert type(vec_a) is list and type(vec_b) is list, "Can only multiply scalars."
    assert len(vec_a) == len(vec_b), "Vectors must have the same dimension."

    return reduce(operator.add, map(operator.mul, vec_a, vec_b))


if __name__ == '__main__':
    import doctest
    doctest.testmod()
```

Then, issue the following command:

      $ python vector.py -v
      Trying:
        scalar_product(v_a, v_b)
        Expecting:
            7
        ok
        1 items had no tests:
            __main__
        1 items passed all tests:
           3 tests in __main__.scalar_product
        3 tests in 2 items.
        3 passed and 0 failed.
        Test passed.
