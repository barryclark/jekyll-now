# Numpy Cheatsheet

---

## Remove axes that the length is 1

[https://numpy.org/doc/stable/reference/generated/numpy.squeeze.html](https://numpy.org/doc/stable/reference/generated/numpy.squeeze.html)

```python
import numpy as np
a = np.array([[
    [[1],[2],[1]],
    [[2],[3],[4]],
    [[1],[2],[1]]
]])
print(f"shape: {a.shape}")
print(a.squeeze())
print(f"shape: {a.squeeze().shape}")
"""output:
shape: (1, 3, 3, 1)
[[1 2 1]
 [2 3 4]
 [1 2 1]]
shape: (3, 3)
"""
```