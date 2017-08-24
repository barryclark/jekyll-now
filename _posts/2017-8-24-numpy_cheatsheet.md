---
layout: post
title: Numpy Cheatsheet
---

A list of all the most commonly used features in Python's Numpy library. Numpy is a highly optimized library perfect for linear algebra, such as vector and matrix operations.

All examples assume that numpy has already been imported: ```import numpy as np```


**Finding the mean**
```python
num = [1,2,3,4,5]
numpy.mean(num)
Out[1]: 3.0
```

**and standard deviation**
```python
numpy.std(num)
Out[1]: 1.4142135623730951
```

## Numpy arrays

Numpy arrays are the primary object class of Numpy. They are similar to lists in Python but require that every element of the array be the same type, like an int or a float.

*Forcing data type*
```python
np.array([1, 1, 2, 3], [5, 8, 13, 21], float)
```

Numpy arrays are indexed like Python lists: [beggining(inclusive):end(exclusive):step]
a = np.arange(10)
a[3:7:2]
Out:
[3 5]

Matrices can be sliced in rows or columns

```python
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(matrix[1, :])
print(matrix[:, 2])
Out:
[4 5 6]
[3 6]
```




Basics for neural networks:
