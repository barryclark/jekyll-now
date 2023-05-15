---
title: 100KataChallenge — Day 5 Solutions
date: 2018-12-14
---

# \#100KataChallenge — Day 5 Solutions

![Declarative Programming Challenge Flyer](https://miro.medium.com/max/1100/0*y2nro5tmOphWECO8.png)

Hey there!

Today’s challenges are quite fun. Let’s take on the first one:

#### Problem 1 — Validate Code with Simple Regex
Basic regex tasks. Write a function that takes in a numeric code of any length. The function should
check if the code begins with 1, 2, or 3 and return true if so. Return false otherwise.

You can assume the input will always be a number.

#### Solution
Using the trick of first converting our number to a string, we can easily check the value of the character at index 0 and return `True` if it is 1, 2 or 3.

This is our code:
```
def validate_code(code):
    code_str = str(code)
    if code_str[0] == '1' or code_str[0] == '2' or code_str[0] == '3':
        return True
    else:
        return False
```

That was quite easy, but let’s look at an even easier solution, using the string method `startswith()`
```
def validate_code(code):
    return str(code).startswith(('1', '2', '3'))
```

This one-liner shows the advantages of getting familiar with already-built string methods.

There are still many more ways to do this, including hard-core **regular expressions (REGEX)** but we’ll leave that as a topic for another day.

You may submit whichever piece of code makes sense to you.

Let’s move on to our second problem.

#### Problem 2 — Array Madness
_Don’t worry, it’s not as mad as it sounds._

Given two integer arrays `a, b`, both of `length >= 1`, create a program that returns `true` if the sum of the squares of each element in `a` is strictly greater than the sum of the cubes of each element in `b`.

Example:
```
array_madness([4, 5, 6], [1, 2, 3]) => True #because 4 ** 2 + 5 ** 2 + 6 ** 2 > 1 ** 3 + 2 ** 3 + 3 ** 3
```

If you know about **lambda functions** as well as the popular **map, reduce** and **filter** functions, then you can probably figure out a way to do this in one line.

_Since this is a beginner kata tutorial, we will think through the problem and use loops, but you are encouraged to try out map, reduce and filter in your own time._

#### Solution
To solve our problem we have to do a few things:

1. Find the square of every element in array1 (a)
2. Calculate the sum of the squared elements
3. Find the cube of every element in array2 (b)
4. Calculate the sum of the cubed elements
5. Compare the sums and return True if they the sum of squares is greater than the sum of cubes

Let’s do this quickly shall we?
```
def array_madness(a,b):
    #your code here
```

Step 1: Find the square of every element in array1 (a)
```
def array_madness(a,b):
    for i in range(len(a)):
        a[i] = a[i] ** 2 #square of elements in a
```

Step 2: Calculate the sum of the squared elements
```
def array_madness(a,b):
    for i in range(len(a)):
        a[i] = a[i] ** 2 #square of elements in a
    sum_a = sum(a)
```

Step 3: Find the cube of every element in array2 (b)
```
def array_madness(a,b):
    for i in range(len(a)):
        a[i] = a[i] ** 2 #square of elements in a
    sum_a = sum(a)
    for i in range(len(b)):
        b[i] = b[i] ** 3 #cube of elements in 
```

Step 4: Calculate the sum of the cubed elements
```
def array_madness(a,b):
    for i in range(len(a)):
        a[i] = a[i] ** 2 #square of elements in a
    sum_a = sum(a)
    for i in range(len(b)):
        b[i] = b[i] ** 3 #cube of elements in b
    sum_b = sum(b)
```

Step 5: Compare the sums and return True if they the sum of squares is greater than the sum of cubes
```
def array_madness(a,b):
    for i in range(len(a)):
        a[i] = a[i] ** 2 #square of elements in a
    sum_a = sum(a)
    for i in range(len(b)):
        b[i] = b[i] ** 3 #cube of elements in b
    sum_b = sum(b)
    if sum_a > sum_b:
        return True
    else:
        return False
```

And just like that, we are all done. I’m sure you can find simple ways to reduce the number of lines of code.

Have fun! See you at the next challenge.

KayO