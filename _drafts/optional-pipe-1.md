---
layout: post
tags: c++ c++17 null-conditional template-metaprogramming functional-programming
#categories: []
date: 2020-06-01
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Implementing a Pipe Syntax for `std::optional` - Part 1: Fundamentals'
#comments_id: 
---

I set out to implement [my high concept null conditional operator](/blog/2020/01/23/null-conditional-operator-for-optionals/) for ``std::optional`` and ended up with something significantly more low concept. Still, I did learn a lot about template metaprogramming and ran into some interesting pitfalls. Let's see what I did in this multi-part series.

# The Basics
If you haven't read my [first post](/blog/2020/01/23/null-conditional-operator-for-optionals/) on the subject it makes sense to do that now. Although we will not accomplish exactly what I set out to do, it makes sense to know where I was heading. Let's first assume we want apply a callable ``F:T``$$\rightarrow$$``U`` to an object of type ``std::optional<T>``. We first assume that ``T`` and ``U`` are not ``void``. We will deal with that case in the later parts of the series.

Note that I changed the operator from `%` (modulo) to `|` (pipe) in this post compared to the previous article.

## Calling Any Callable

Before we get into the pipe operator itself we need to find a unified syntax to call any callable in C++. Surely it can be realised with templates[^stdfunction]. But if we stop to think about how to call any callable using a the same template syntax it gets tricky. Think, for example, how to pass in and call a member function on an object without the ``object.memberfunction()`` syntax. This is where C++17 alleviates us from going into the nitty-gritty details: we can just use [``std::invoke``](https://en.cppreference.com/w/cpp/utility/functional/invoke) in the ``<functional>`` header. Here is how it can be used:

```c++
using std::string;
using std::cout;
using std::endl;

string str("test");

auto print = [](const auto & arg){cout << arg << endl;};
std::invoke(print, str);
//==> prints "test"

size_t size = std::invoke(&string::size, str);
cout << "size = " << size << endl;
//==> prints: size = 4
```
This seems a little complicated at first. Note, however, that we have used `std::invoke` to call a member function as well as a *generic* lambda using the same syntax. This is one piece of the puzzle that will come in very handy.

## Finding the Return Type of A Callable
The next thing we need is to find the return type of a callable object of type ``F`` when applied to an argument of type ``T``. This is what [``std::invoke_result``](https://en.cppreference.com/w/cpp/types/result_of) is for. The helper type ``std::invoke_result_t<F,T>`` gives us exactly the desired return type.

# A First Try
So now that we have the ingredients together, a first try of our optional chaining operator could look like this:

```c++
template<typename T, typename F>
auto operator|(const std::optional<T> & arg, F&& func)
-> std::optional<std::invoke_result_t<F, T>>
{
  if(arg.has_value())
  {
    return std::invoke(std::forward<F>(func), *arg);
  }
  else
  {
    return std::nullopt;
  }
}
```

The operator returns  ``nullopt`` if the optional argument was empty. If the given optional is not empty, the callable is applied to the value inside the argument and an optional containing the result is returned. So the signature of the operator is ``operator|: const std::optional<T> &, F&&``$$\rightarrow$$``std::optional<U>``, where ``U`` is the return type of the callable. This operator is already quite neat to use because it can be chained. Let's look at an example.

## Example Usage
Let's say we are given an optional of type `std::string` that may or may not contain a value. We are (for some reason) interested in the square of the length of the contained string. This is how we can implement it using the pipe operator:

```c++
//lambda takes an argument and squares it
auto square = [](const auto & val){return val*val;};

//optional values of type string:
std::optional<std::string> optstr1 = std::string("Hello");
std::optional<std::string> optstr2; //empty;
//optionals of type size_t:
auto optsize1  = optstr1 | &std::string::size | square;
//==> optsize1 will contain value 5*5=25
auto optsize2 = optstr2 | &std::string::size | square;
//==> optisize2 will not contain a value
```
We arrive at the desired result y chaining the `std::string::size` member function and a generic lambda that squares its argument. The result is itself an optional of type `size_t`. It contains a value only if the initial argument contains a value. The pipe syntax allows for a neat way to chain operations on optional values. It relieves us of the responsibility of checking whether the intermediate results contain values before operating on them. However, there is (at least) one major issue with the implementation. It has to do with the return type.

# The Issue with the Return Type
The return type of the callable `func` is always wrapped in an optional. This is usually what we want, but it becomes a problem if the return type of `func` is itself an optional. Consider a callable ``func`` which returns ``std::optional<V>``. Our operator will then return a nested optional, namely ``std::optional<std::optional<V>>``. I'd rather have the operator return ``std::optional<V>`` because there is no information to be gained from nesting two optionals. So we have to unravel the return type somehow. In the next post we'll see how to achieve this with bread and butter template metaprogramming techniques.

# Endnotes
[^stdfunction]: I could have chosen ``std::function`` to hold the function instead of a template argument. I did try this approach but it has it's own set of problems. See e.g. [here](https://stackoverflow.com/questions/36104638/passing-stdfunction-type-which-has-a-templated-return-type).


