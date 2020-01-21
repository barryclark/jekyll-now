---
layout: post
tags: c++ null-conditional template-metaprogramming functional-programming
#categories: []
date: 2020-01-14 00:00:00
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'A conditional pipe operator for `std::optional`' 
---

In C++, `std::optional<T>` is a great way to represent a value that could hold a value of type `T` or nothing. However, it is somewhat clumsy to work with optional types when you want to chain operations on them, because you have to account for the `nullopt` case.

Inspired by the C# Elvis operator (also [null-conditional operator](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-)) I set out to implement a pipe operator that allows us to chain optional expressions in a more expressive fashion. The case of an optional being `nullopt` is handled implicitly.

#  The Null-Conditional Operator in C#
There are two null-conditional operators in C# but I am only concerned by the null-conditional member access operator `?.` which is also referred to as the Elvis operator. From the Microsoft Docs:

> Available in C# 6 and later, a null-conditional operator applies a member access, `?.`, or element access, `?[]`, operation to its operand only if that operand evaluates to non-null; otherwise, it returns null.

This allows for a rather neat syntax where we can write code like this, e.g. for two `String` objects
```c#
String str2 = str1?.Insert(0, "preamble:")?.ToUpper();
```
In that case `str2` will contain the upper case version of str1 with "PREAMBLE:" prepended, or `null` if str1 is `null`. The ability to chain expressions is where the real power of the null-condional operator comes into play: it allows for more expressive code without the need to check for `null` before each function call.

Using template metaprogramming techniques we can implement our own operator in C++ that does very similar things, conceptually. I want the oprator to apply functions to optionals. The class `std::optional` represents nullable types in C++ in a way that is in line with the ideas of functional programming. 

# Defining the Intended Behaviour in C++
I will use `%` as the operator in C++. It takes an `opt` of type `std::optional<T>` and applies a function to it. The C++ of the example above might look like this:
```c++
//std::optional<std::string> str1 = ... (given elsewhere)
std::optional<std::string> str2 = str1 % insert_at_begin("preamble:") % to_upper;
```
Where `insert_at_begin` and `to_upper` are functions that are defined appropriately. Lets have a look at the different kinds of functions that the operator can encounter.

Since I want to have my C++ implementation be a tool for functional programming, it is natural to talk about applying functions to optionals in a math-y way. As a notation I use $f$ for a type of function, and `T`, `U` for C++ types, which are not `void`.  I can think of the following types of functions we would want to apply to an object `opt` of type `std::optional<T>`:

1. $f_1: $ `T` $\rightarrow$ `U`.
2. $f_2: $ `T` $\rightarrow$ `void`
3. $f_3: $ `std::optional<T>` $\rightarrow$ `std::optional<U>`
4. $f_4: $ `std::optional<T>` $\rightarrow$ `void`
5. $f_5: $ `std::optional<T>` $\rightarrow$ `U`, where `U` is not an optional type.

There are two main types of functions: functions taking a `T` and those taking an `std::optional<T>`. We will discuss the intended behaviour separately. 

## Functions Taking `T`
The functions $f_1$ and $f_2$ know nothing of optionals. They might be implemented to work on type `T`,  `(const) T&`, or `T&&`, but they have no way of dealing with optional *input arguments*. So this is what we have to implement. 
 
We denote the operator by $op$, which is itself a function which takes two parameters. Those two parameters are an optional and one of the function types defined above. The first case the easiest but it is instructive to think about it briefly: What do we want to happen when we apply function $f_1: $ `T` $\rightarrow$ `U` to an `std::optional<T>` using the C++ null-conditional operator? Well, in C# the operator just returns the result of the function or `null` if the object was `null` to begin with. We can do an analogous  thing in C++: we always return an `std::optional<U>` instead of a `U`. The return value is `nullopt` if the input value was `nullopt` and otherwise is such that the wrapped value is $u = f($`t`$)$ where `t` is the input argument of type `T`. The pseudocode looks like this:

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
The function signature of the optional operator in this case is thus: $op: ($`std::optional<T>`$,f_1)\rightarrow$`std::optional<U>`. This signature makes sense even if the return type of the function is itself an optional. Although other implementations could be useful as well.

So far so good. We can do pretty much the same implementation for functions of type $f_2$: Apply the (effectful) function only if the optional has a value. However, what do we return? We could return `void`, but I would like to be able to chain the operator and returning `void` would break this chain. So I would like to implement the operator like this (pseudocode):

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
The function signature of the optional operator in this case is $op: ($`std::optional<T>`$,f_2)\rightarrow$`std::optional<T>`. Functions of type $f_2$ are purely effectful functions and should not modify its argument, because that would get us into all kinds of trouble in the implementation. More on that later. A possible function of type $f_2$ would be to print its argument to the console.

## Functions Taking Optionals
For functions taking optionals, the behaviour of the operator should be different, because whoever designed the functions intended them to work on optionals.  For cases 3,4 we can pretty much take the corresponding implementations from above. The difference is that the functions are always applied to the operand even if it is `nullopt`. The respective signatures are: $op: ($`std::optional<T>`$,f_3)\rightarrow$`std::optional<U>` and $op: ($`std::optional<T>`$,f_4)\rightarrow$`std::optional<T>`.

The only case that requires some thought is number 5. Here the implementor expects an optional and guarantees a return value that is not an optional. There are also several ways to handle this. In the `void` return case I opted for a solution that was chainable and returns an optional. I am not going to do the same here. This function was designed to transform an optional to a different (non-optional) type. It is the end of a chain of calls. This is why I want to look the signature of the operator like this in this particular case: $op: ($`std::optional<T>`$,f_5)\rightarrow$`U`.

## Summary
This is a quick summary of the function signatures of the C++ null-conditional operator `%` we developed above:

1. 
	a. $op($`std::optional<T>`$,f_1)\rightarrow$`std::optional<U>` if `U` is not an optional type
	b. $op($`std::optional<T>`$,f_1)\rightarrow$`std::optional<V>` if `U` is an optional type of `V`.
2. $op($`std::optional<T>`$,f_2)\rightarrow$`std::optional<T>`
3. $op: ($`std::optional<T>`$,f_3)\rightarrow$`std::optional<U>`
4. $op: ($`std::optional<T>`$,f_4)\rightarrow$`std::optional<T>`
5. $op: ($`std::optional<T>`$,f_5)\rightarrow$`U`

# To Be Continued

I will write a post on the implementation in the next part and link to it here when its done. The function body of this operator is trivial but the tricky part of the implementation is getting the metaprogramming right.
