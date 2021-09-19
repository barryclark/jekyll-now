---
layout: post
title: The Usage of *args and **kwargs in Python
category: Dev
tags: [python, syntax]
---

### What
In a python function, we need to pass params but sometimes you may find two weird thing like `*args` or `**kwargs`. These two special charactors means we can pass  multiple arguments or keyword arguments to a function.

### How
Let's start a very simple example:
```
def sum_numbers(a, b):
    return a + b
```
In this function, we wil add two numbers by passing two params in the function. However, what if we don't know how many numbers we will add up when define the function? Can we pass some unsured number of params in some way?

Of course, some people may think of a idea like this:
```
def sum_numbers(number_lists):
    result = 0
    for x in number_lists:
        result += x
    return result

list_of_integers = [1, 2, 3]
print(sum_numbers(list_of_integers))
```
This way works but not that neat because you have to seperately create a list everytime when you want to pass it to the function. So now we introduce the `*args`.
```
def sum_numbers(*args):
    result = 0
    for x in args:
        result += x
    return result

print(sum_numbers(1, 2, 3))
```
Now we can see we can pass whatever length of numbers we like. 

**Notes**: `args` is not forced to use. It's allowed to use whatever word we like, such as `*integer` or `*numbers` but `*args` is the most common way.

Compared to `*args`, `**kwargs` is not a tuple of params but a dictionary that contains keys and values. The keys will be the params' name while the values will be the params' values. See the example below:
```
def sum_numbers(**kwargs):
    result = 0
    for arg in kwargs.values():
        result += arg
    return result

print(sum_numbers(a=1, b=2, c=3, d=4, e=5))
```

### Why
This is very useful in real world. Just imagine a case when we include another function that have many params in our defined function, we actually don't know how many params we will use when we call this function. Then we can define the function with this. For example:
```
def plot_func(df, **kwargs):
    df.plot(**kwargs)
```
Here, we define a function that will use a matplotlib plot function inside. There are a lot of params defined in the `plot` function. If we don't use `**kwargs`, we have list them all(say 50 params) at the `plot_func` defination and set the default values otherwise we have to give a value to all of them when we call the function.
