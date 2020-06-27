---
layout: post
tags: constexpr c++11 image-processing algorithm math varpro
#categories: []
date: 2020-07-15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Replacing the Ternary Operator with Rust-style If Expressions in C++11'
#comments_id:
---
Right now I am getting into Rust, which lets me see things in C ++ in a new light. For example: C++ has `if` *statements* and Rust has `if` *expressions*. I set out to implement an expressive syntax mimicking Rust's if expressions in C++. To keep things simple, I only targeted the use case of replacing nested ternary operators. What I ended up with is a teeny tiny domain specific language with a very limited use scenario that was, however, very fun to implement.

# `if` Expressions in Rust versus C++
Before we get into the `if` expression of Rust, let's see what the distinction between an expression and a statement is. Broadly speaking, we can say that an expression evaluates to something (i.e. has a value) and a statement does not. Many more things are expressions in Rust than in C++. The `if ... else if ... else` control structure in Rust is an expression and returns a value[^rust_void]. So it is perfectly fine to use it to initialize a variable:

```rust
//let x = ... (some integer value)
let sign_of_x = if x>0 {1} else if x==0 {0} else {-1};
```
This code implements the [sign function](https://en.wikipedia.org/wiki/Sign_function) in the initialization of a variable. We could argue that we might want to encapsulate that functionality in its own function and we would not be wrong. But that is not the point today. The point here is that the code is pretty easy to read although it is a conditional statement with three branches (`if`, `else if` and `else`). It's clear that we cannot trivially copy that behaviour in C++ because `if ... else if ... else` is not an expression in C++. So we have three ways of producing the same behaviour in C++: Firstly, we could use a function to initialize the variable[^cpp_uninitialized]. Let's exclude that because while it is a very good solution, it doesn't lead to anything interesting here. Secondly, we could use a nested ternary operator, which is the C++ way of expressing `if ... else` as an expression. However, the ternary operator is missing an `else if`, so we need to nest it like this:
```c++
int sign_of_x = (x>0)?1:( (x==0)?0:-1 );
```
Even if you like the ternary operator you can hardly argue that this is legible. Once we are dealing with conditions with more than two branches it gets confusing very quickly. That leaves us with the third option, which is to design something ourselves. Todays goal is to make this expression work in C++:
```c++
int val = If(x>0).Then(1).ElseIf(x==0).Then(0).Else(1);
```
Now let's get into how to achieve this (and a little bit more) using C++11 and later.

# Implementation in C++
Let's first assume we are using C++17 to implement our feature. This won't make much of a difference but it does make some things a bit simpler. At the end we will adapt everything to C++11.

## First Steps: `If`, `Then`, `Else`
...
by value OR BY REFERENCE! ELSE RETURNS BY VALUE
## Additional Branches with `ElseIf`

## `constexpr` Everything

## C++11 and C++17
-single return statement in C++11

-copy elision und probleme mit constructoren in c++17

## Problems and Limitations
- Problem mit den Lifetimes und Copies
-Problem: es werden temporaries für alle wege erzeugt. Das ist ggf speicherintensiv oder langsam!


# Endnotes
[^rust_void]: It can also return `()`, which is the Rust equivalent of a `void` value.
[^cpp_uninitialized]: Of course we could also try and declare the variable without initializing it and then assign it afterwards in an `if` statement. This, for many reasons, is a very bad solution.
