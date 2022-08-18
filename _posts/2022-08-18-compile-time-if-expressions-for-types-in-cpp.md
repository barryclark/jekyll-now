---
layout: post
tags: c++11 template-metaprogramming functional-programming
#categories: []
date: 2022-08-18
last_updated:
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Compile-Time If-Expressions for Types in C++11'
comments_id: 
---

The other day I wondered if there is a way to metaprogam a syntax that returns a type based on a conditional expression akin to an `if`...`else if`...`else` expression.
The idea came to me when I searched for a programmatic way to choose the right size of integer for a bitset, given a certain number of needed bits. And yes,
I know there's `std::bitset`, but I'll take any excuse to investigate an interesting metaprogramming problem. Let's take this as an excuse to recap some metaprogramming paradigms. 

# Simple Conditionals
The standard library always gives us a metafunction [`std::conditional<C,T,F>`](https://en.cppreference.com/w/cpp/types/conditional), which is the semantic equivalent of a ternary operator for types: if the 
(compile time known) boolean condition `C` evaluates to `true` we get the type `T`, otherwise `F`. There's nothing like an `else if` logic in there, but it is still instructive to see how to implement this ourselves.

We go about this by first defining a structure template `Conditional` like so

```c++
template<bool Condition, typename T, typename E>
struct Conditional {}
```
Then we specialize this for the boolean cases `true` and `false`, respectively:

```c++
template<typename T, typename E>
struct Conditional<true,T,E> {
    using type = T;
}

template<typename T, typename E>
struct Conditional<false,T,E> {
    using type = E;
}

template<bool Condition, typename T, typename E>
using Conditional_t = Conditional<Condition,T,E>::type;
```
All of this might look unwieldy at first, but is from the standard metaprogramming bag of tricks. Now we can use this
expression to switch a type based on a compile time known condition like so:

```c++
// assuming BIT_COUNT is compile time known
using MyType = Conditional_t<BIT_COUNT <= 8,int8_t,int64_t>;
```
This conditional allows only the simplest of logic with only two branches. Furthermore, without looking up how `Conditional` 
(or `std::conditional` for that matter) works, I don't find this code very readable. So I set out to do something more powerful and more readable.

# The Goal
A few years ago I have implemented [if expressions for values](/blog/2020/if-expressions-for-cpp-part1), which are also `constexpr`. So they work for compile time known
values, but not for types. However, I like the syntax and I wanted to see whether I can come up with a similar syntax that allows us to choose types at compile time. The syntax
I ended up with looks like this:

```c++
using IntType = If<(BIT_COUNT <= 8)>
                ::Then<uint8_t>
                ::ElseIf<(BIT_COUNT > 8 && BIT_COUNT <= 16)>
                ::Then<uint16_t>
                ::ElseIf<(BIT_COUNT > 16 && BIT_COUNT <= 32>)>
                ::Then<uint32_t>
                ::Else<uint64_t>;
IntType my_integer = 0;
```

Whether this construct is useful in other circumstances than this I don't know. But I find it very readable and wondered whether something like this was possible to implement.

# The Implementation
We can build on the general idea of the `Conditional` implementation above which uses specialization to select for types. Also we take ideas from the [if expressions implementation](/blog/2020/if-expressions-for-cpp-part1), where we have created transient types for the _if_, _then_, _else if_, and _else_ parts of the expression. It's obvious we need an
`If` structure template, but the hard part for me was figuring out how to enable the `Then`, `ElseIf`, and `Else` parts of the expression[^first_try].


# Endnotes


[^first_try]: For my first try I used `constexpr` functions on the `If` type which can be made to return (instances of) different types based on a compile time known condition using `if constexpr`. There's many problems with this approach,
but the biggest problem is that we have to extract the return _type_ using `decltype`, which does not make for a nice syntax