---
layout: post
tags: constexpr c++11 c++17 if-expression rust
#categories: []
date: 2020-07-06
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Replacing the Ternary Operator with Rust-style If Expressions in C++11 - Part 1'
#comments_id:
---
Right now I am getting into Rust, which lets me see the paradigms of C++ in a new light. This is a small thing, but for example: C++ has `if` *statements* and Rust has `if` *expressions* which can return a value. This inspired me to implement an expressive syntax for mimicking Rust's `if` expressions in C++. To keep things simple, I only targeted the use case of replacing nested ternary operators.

# `if` Expressions in Rust versus C++
Before we get into the `if` expression of Rust, let's clarify what the distinction between an expression and a statement is. Broadly speaking, we can say that an expression evaluates to something (i.e. has a value) and a statement does not. Many more things are expressions in Rust than in C++. The `if ... else if ... else` control structure in Rust is an expression and returns a value[^rust_void]. So it is perfectly fine to use it to initialize a variable:

```rust
//let x = ... (some integer value)
let sign_of_x = if x>0 {1} else if x==0 {0} else {-1};
```
This code implements the [sign function](https://en.wikipedia.org/wiki/Sign_function) in the initialization of a variable. We could argue that we might want to encapsulate that functionality in its own function. That is a perfectly fine way of doing it, but that is not what we want to do today. The point here is that the code is pretty easy to read although it is a conditional statement with three branches. It's clear that we cannot trivially copy that behaviour in C++ because `if ... else if ... else` is not an expression in C++. So we have two other[^cpp_uninitialized] ways of producing the same behaviour in C++: First, we could use a nested ternary operator, which is the C++ equivalent of an `if ... else` expression. However, the ternary operator is missing an `else if`, so we need to nest it like this:
```c++
int sign_of_x = (x>0)?1:( (x==0)?0:-1 );
```
Even if you are a fan of the ternary operator, you can hardly argue that this is legible. Once we are dealing with conditions involving more than two branches it gets confusing. That leaves us with the second option, which is to design something ourselves. Our goal is to make the following expression work in C++:
```c++
int sign_of_x = If(x>0).Then(1).ElseIf(x==0).Then(0).Else(-1);
```
Now let's get into how to achieve this (and a little bit more) using C++11 and above.

# Implementation in C++

We'll disregard the `else if` brach for now and focus on making a simple `if...else` expression work without the explicit use of the ternary operator. Something like this:
```c++
int val = If(x>0).Then(1).Else(-1);
```
This looks weird at first, but is a type of expression we encounter daily in C++. The weirdness, at least to me, stems from the fact that the parts are named "If", "Then" and "Else". Just compare this expression to something like this:
```c++
int val = std::string("Hello").append(" World").length();
```
This looks way more familiar, but it is not much different from the expression above. It's just calling methods on an object.

So we can see that `If(x>0)` is just an object of class `If`. It is a temporary *expression proxy*, i.e. an object that is useful only in the context of this expression. When we call its `Then` method we return an instance of a class carrying the information for the `If` and the `Then` part. I'll just call this class `If_Then`. That class has an `Else` method that finally returns the value that we want, depending on the initial condition. The user never has to explicitly use the `If_Then` expression proxy, but its `Else` method is what transforms it into a value that we can assign to something. Therefore every `If`-expression needs to be terminated with an `Else` statement.

## The If Type
The most bare-bones implementation of an `If` class could look like this:
```c++
class If
{
public:
    constexpr explicit If(bool _condition)
    :condition(_condition){}

    template<typename T>
    constexpr If_Then<T> Then(T t) const &&    {
        return If_Then<T>(condition, t);
    }
private:
    bool condition;
};
```
This is just a class with a templated `Then` method, which passes information about the condition and the value to the `If_Then` instance. I have used the `const &&`-qualifier so that the method cannot simply be used on lvalues. Why? I want the user to write out the expression in one statement, because I feel that storing parts of the expression would be error prone. Note that the constructor and the `Then` method are declared `constexpr`. I *will* get into that, but not in this article.

## The If-Then Type
This class manages the condition and the value for the `If`-branch. When it's `Else` method is invoked it decides whether to return the value for the `If` or the `Else` branch depending on the condition.
```c++
template<typename T>
class If_Then
{
public:
    constexpr T Else(T t_else) const &&    {
        return (condition)?t:t_else;
    }
private:
    constexpr If_Then(bool _condition, T _t)
    : condition(_condition), t(_t){}

    bool condition;
    T t;
    friend class If;
};
```
Note that this is a template class and not a class with a templated call operator, because the type is fixed by the first call to the `Then` method. Note further that I used the ternary operator to return the value in the `Else` function. This is for C++11 compatibility, since `constexpr` functions in C++11 can only have one return statement. Finally, I have made the constructor private because I only ever want the befriended `If` class to use it directly.

# To Be Continued

And this is how we can translate the ternary operator with two branches. However, the expression only gets useful once the `ElseIf` case is also allowed. We will look into that in the next article, where we will also discuss some improvements.

# Endnotes
[^rust_void]: It can also return `()`, which is the Rust equivalent of a `void` value.
[^cpp_uninitialized]: I have deliberately left out another option: We could try and declare a pointer to the variable without initializing it (we could default initialize variable itself) and then (re)assign to it afterwards in an `if` statement. This, for many reasons, is a very bad solution and I will discount it completely here.
