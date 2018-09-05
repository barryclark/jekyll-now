---
layout: post
title: Python Itertools
---

# Python 中的库函数itertools源码



# Reference

[python itertools](https://docs.python.org/2/library/itertools.html)

神奇的itertools函数几乎可以一句话解决很多leetcode上的题。

# permutations

Itertools.permutations(iterable, r=None)

根据输入序列输出一个打乱的全排列。

相当于：

```python
def permutations(iterable, r=None):
    # permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
    # permutations(range(3)) --> 012 021 102 120 201 210
    pool = tuple(iterable)
    n = len(pool)
    r = n if r is None else r
    if r > n:
        return
    indices = list(range(n))
    cycles = list(range(n, n-r, -1))
    yield tuple(pool[i] for i in indices[:r])
    while n:
        for i in reversed(range(r)):
            cycles[i] -= 1
            if cycles[i] == 0:
                indices[i:] = indices[i+1:] + indices[i:i+1]
                cycles[i] = n - i
            else:
                j = cycles[i]
                indices[i], indices[-j] = indices[-j], indices[i]
                yield tuple(pool[i] for i in indices[:r])
                break
        else:
            return
```

也相当于：

这个函数很好玩，相当于取出0, 1, 2三个索引的所有全排列，在取出对应的值。

```python
def permutations(iterable, r=None):
    pool = tuple(iterable)
    n = len(pool)
    r = n if r is None else r
    for indices in product(range(n), repeat=r):
        if len(set(indices)) == r: # set性质，只有元素全不相同时长度才等于r
            yield tuple(pool[i] for i in indices)
```



# product

Itertools.product()

输入迭代的笛卡尔积即两个序列对应的所有组合

```python
def product(*args, **kwds):
    # product('ABCD', 'xy') --> Ax Ay Bx By Cx Cy Dx Dy
    # product(range(2), repeat=3) --> 000 001 010 011 100 101 110 111
    # kwds.get('repeat', 1)获取第二个参数repeat的值
    pools = list(map(tuple, args)) * kwds.get('repeat', 1) 
    result = [[]]
    for pool in pools:
        result = [x+[y] for x in result for y in pool]
    for prod in result:
        yield tuple(prod)
```

