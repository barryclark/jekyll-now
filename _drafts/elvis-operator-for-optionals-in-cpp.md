---
layout: post
tags: c++11 c++17 constexpr functional-programming
#categories: []
date: 2020-01-14 00:00:00
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'A conditional pipe operator for `std::optional`' 
---

In C++ `std::optional<T>` is a great way to represent a value that could be of type `T` or nothing. However, it is somewhat clumsy to work with optional types because you need to call member functions to gain access to their underlying value. Inspired by the C# Elvis Operator (also [null-conditional operator](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-)) I implemented a pipe operator that allows us to chain optional expressions in a more expressive fashion. The case of an optional being `nullopt` is handled implicitly.

#  The Null-Conditional Operator in C#
Actually there is two such operators in C# but I am only concerned by the null-conditional member access operator `?.`. From the Microsoft Docs:

> Available in C# 6 and later, a null-conditional operator applies a member access, `?.`, or element access, `?[]`, operation to its operand only if that operand evaluates to non-null; otherwise, it returns null.

This allows for a rather neat syntax where we can write code like this, e.g. for two `String` objects
```c#
String str2 = str1?.ToUpper();
```
In that case `str2` will contain the upper case version of str1 or `null` if str1 is `null`. Expressions like this can be chained, of course. This is where the real power of the null-condional operator comes into play, because it allows for more expressive code without the need to check for `null` before each function call. Using template metaprogramming techniques we can implement our own operator in C++ that does very similar things conceptually.

# Defining the Intended Behaviour in C++

Since I want to have my C++ implementation be a useful tool for functional programming, it is quite natural to talk about applying functions to optionals. I can think of these types of functions we want to apply to an object `opt` of type `std::optional<T>`. I will use $f$, $g$ for a function and `T`, `U` for C++ types, which are not `void`.
1. $f_1: $ `T` $\rightarrow$ `U`
2. $f_2: $ `T` $\rightarrow$ `void`
3. $f_4: $ `std::optional<T>` $\rightarrow$ `std::optional<U>`
4. $f_5: $ `std::optional<T>` $\rightarrow$ `void`
5. $f_3: $ `std::optional<T>` $\rightarrow$ `U`, where `U` is not an optional type.

There are two main types of functions: functions taking a `T` and those taking an `std::optional<T>`. We will discuss the intended behaviour separately. 

## Functions Taking `T`
The functions $f_1$ and $f_2$ know nothing of optionals. They might be implemented to work on type `T`,  `const T&`, `T&`, or `T&&`, but they have no way of dealing with optional input arguments. So this is what we have to implement. This is true even if the return value is of optional type.
 
Let us denote the operator by $op$, which is itself a function which takes two parameters. Those two parameters are an optional and one of the function types defined above. The first case the easiest but it is instructive to think about it briefly: What do we want to happen when we apply function $f_1: $ `T` $\rightarrow$ `U` to an `std::optional<T>` using the C++ null-conditional operator? Well, in C# the operator just returns the result of the function or `null` if the object was `null` to begin with. We can do an analogous  thing in C++: we always return an `std::optional<U>` instead of a `U`. The return value is `nullopt` if the input value was `nullopt` and otherwise is such that the wrapped value is $u = f($`t`$)$ where `t` is the input argument of type `T`. The pseudocode looks like this:

```
std::optional<U> operator% (opt: optional<T> type, f: function type 1)
{
if t has value
then 
return f(value of opt)
else 
return nullopt
endif
}

```
The function signature of the optional operator in this case is thus: $op($`std::optional<T>`$,f_1)\rightarrow$`std::optional<U>`.

Here I have just decided that I want to use `%` as the chaining null-conditional operator in C++. So far so good. We can do pretty much the same implementation for functions of type $f_2$: Apply the (effectful) function only if the optional has a value. However, what do we return? We could return `void`, but I would like to be able to chain the operator and returning `void` would break this chain. So I would like to implement the operator like this (pseudocode):

```
std::optional<T> operator% (opt: optional<T> type, f: function type 2)
{
if thas value
then 
apply f to value opt
endif
 
return f(t)
}

```
The function signature of the optional operator in this case is thus: $op($`std::optional<T>`$,f_2)\rightarrow$`std::optional<T>`. Functions of type $f_2$ are purely effectful functions and should not modify its argument, because that would get us into all kinds of trouble in the implementation. More on that later. A possible function of type $f_2$ would be to print its argument to the console.

## Functions Taking Optionals
For functions taking optionals, the behaviour of the operator should be different, because whoever designed the functions intended them to work on optionals.  For cases 3,4 we can pretty much take the corresponding implementations from above. The difference is that the functions are always applied to the operand even if it is `nullopt`. The function signatures should be FUNCTION SIGNATURES HERE!!!!!!!!!!!!

The only case that requires some thought is number 5. Here the implementor expects an optional and guarantees a return value that is not an optional. There are also several ways to handle this. I am going to stay consistens 

# To Be Continued

I will write a post on the implementation in the next part. The function body of this operator is trivial but the tricky part of the implementation is getting the metaprogramming right.
