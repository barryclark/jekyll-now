---
layout: post
tags: functional-programming immutability c++
#categories: []
date: 2020-02-19
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Immutability in C++: Two Ways to Constness'
#comments_id: 2
---

In an attempt to increase my functional programming skills in C++, I went full functional when writing a simulation for a childrens game. Trying to implement a game state using the paradigms of functional programming presents some interesting challenges, because its defining characteristic is that it changes at every turn. In this post I will explore the concept of *immutability* and how we can implement it in C++ not only for simple games but for all kinds of stateful objects.

# Immutability and Functional Programming

The value of an immutable object cannot be changed after creation. Immutability is a big deal in functional programming for many reasons. I took a liking to it because of two reasons:

First it forces me to learn something that is completely counterintuitive to my usual, imperative style of programming. So it forces me to think about solving problems in a different way than I am used to. That is always a good thing. Secondly, it is more in line with the mathematical foundations of functional programming. If I have a variable $$x$$ and pass it to a function $$f(x)$$ then I expect two things:

1. $$f(x)$$ has a value, say $$f(x)=y$$,
2. $$x$$ does not change by applying $$f(x)$$.

There is more than one thing hidden here (e.g. [pure functions](https://en.wikipedia.org/wiki/Pure_function) and [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)) but the main point today is that $$x$$ is immutable.

# The Dangers of Mutability in C++

While it is so fundamental in mathematics that the value of $$x$$ does not change when evaluating $$f(x)$$, this is not so in C++. Consider

```c++
int f(int & x)
{
  return ++x;
}
```

Invoking `f(x)` on an integer `x` will return the value of `x+1`, but it will change the value of `x` in the process. To make matters worse: lets assume we only knew the signature of the function from a header and the documentation for `f` states: "*calculates the next integer value for x*". Depending on the implementation it could change the value of `x` or not (`return x+1`). A signature `T f(T&)` should always make us suspicious and most programmers would hopefully use `T f(const T &)` or `T f(T)`. In other languages however, [like Java](https://stackoverflow.com/questions/41361252/const-function-arguments-in-java), objects are always passed by a non-const reference.

So although this example is silly and contrived, it illustrates some of the danger of mutability: it makes code harder to reason about.

# Immutability in C++
Immutability in C++ is realized by the `const` keyword. Let's see how that helps us in implementing an immutable object. Assume we have a class that holds a state which is comprised of one integer `number`. Let's say the number
