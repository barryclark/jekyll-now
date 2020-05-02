---
layout: post
tags: c++ c++17 null-conditional template-metaprogramming functional-programming
#categories: []
date: 2020-06-01
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Implementing a Pipe Syntax for Optionals - Part 1'
#comments_id: 
---

I set out to implement [my high concept null conditional operator](/blog/2020/01/23/null-conditional-operator-for-optionals/) for ``std::optional`` and ended up with something significantly more low concept. Still, I did learn a lot about template metaprogramming and ran into some interesting pitfalls. Let's see how to build the operator from scratch.

# The Basics
If you haven't read my [first post](/blog/2020/01/23/null-conditional-operator-for-optionals/) on the subject it makes sense to do that now. Although we will not accomplish exactly what I set out to do, it makes sense to know where I was heading. Let's first assume we want apply a callable ``F:T``$$\rightarrow$$``U`` to an object of type ``std::optional<T>``. We first assume that ``T`` and ``U`` are not ``void``. We will deal with that case later.

## Calling Any Callable

Before we get into the pipe operator itself we need to find out a syntax to call any callable in C++. Surely it can be realised with templates[^stdfunction], but if we think about how to call any callable using a unified template syntax it gets tricky. Think for example how to pass in and call a member function on an object without the ``object.memberfunction()`` syntax. This is where C++17 comes to the rescue with [``std::invoke``](https://en.cppreference.com/w/cpp/utility/functional/invoke) in the ``<functional>`` header. Here is how it can be used:

```c++
using std::string;
using std::cout;
using std::endl;

string str("test");

auto print_lambda = [](const auto & arg){cout << arg << endl;};
std::invoke(, str);
//prints "test"

size_t size = std::invoke(&string::size, str);
cout << "size = " << size << endl;
//prints: size = 4
```
This seems a little complicated at first. Note, however, that it allows us to call a member function as well as a *generic* lambda using the same syntax. This is one piece of the puzzle that will come in handy later.

## Finding the Return Type of A Callable
The next thing we need is to find the return type of a callable object of type ``F`` when applied to argument of type ``T``. This is what [``std::invoke_result``](https://en.cppreference.com/w/cpp/types/result_of) is for. The helper type ``std::invoke_result_t<F,T>`` gives us exactly what we wanted to know.

# A First Try
So now that we have the ingredients together, a first try of our optional chaining operator could look like this:

```c++
template<typename T, typename F>
std::optional<std::invoke_result_t<F, T>> operator|(const std::optional<T> & arg, F&& func)
{
  if(arg.has_value())
  {
    return std::invoke(std::forward<F>(func), arg.value());
  }
  else
  {
    return std::nullopt;
  }
}
```
The operator applies returns  ``nullopt`` if the optional argument was empty. If the given optional is not empty, the function is applied to the value and returned as an optional. So the signature of the operator is ``operator|: const std::optional<T> &``$$\rightarrow$$``std::optional<U>``, where ``U`` is the return type of the callable. This operator is already quite useful and it can be chained. However, there is one problem with it.

## The Problem
If the callable ``func`` itself returns a type ``std::optional<V>``, then our operator will return ``std::optional<std::optional<V>>``, which is not what I intended. I rather want to return ``std::optional<V>``.

# Endnotes
[^stdfunction]: I could have chosen ``std::function`` to hold the function instead of a template argument. I did try this approach and ran into another set of problems. See e.g. [here](https://stackoverflow.com/questions/36104638/passing-stdfunction-type-which-has-a-templated-return-type).


