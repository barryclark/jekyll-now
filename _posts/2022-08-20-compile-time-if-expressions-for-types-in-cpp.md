---
layout: post
tags: c++11 template-metaprogramming functional-programming
#categories: []
date: 2022-08-20
last_updated: 2023-03-24
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Compile-Time If-Expressions for Types in C++11'
comments_id: 37
---

The other day I wondered if there is a way to metaprogam a syntax that returns 
a type based on a conditional expression akin to an `if`...`else if`...`else` expression.
The idea came to me when I searched for a programmatic way to choose the right 
size of integer for a bitset, given a certain number of bits. And yes, I know 
there's `std::bitset`, but I'll take any excuse to investigate an interesting metaprogramming problem.

# Simple Conditionals
The standard library already gives us a metafunction 
[`std::conditional<C,T,F>`](https://en.cppreference.com/w/cpp/types/conditional), 
which is the semantic equivalent of a ternary operator for types: if the 
(compile time known) boolean condition `C` evaluates to `true` we get the 
type `T`, otherwise `F`. There's nothing like an `else if` logic in there,
but it is still instructive to see how to implement this ourselves. 
We go about this by first defining a structure template `Conditional` like so

```cpp
template<bool Condition, typename T, typename E>
struct Conditional {}
```
Then we specialize this for the boolean cases `true` and `false`, respectively:

```cpp
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

All of this might look unwieldy at first, but is from the standard metaprogramming 
bag of tricks. Now we can use this expression to switch a type based on a compile 
time known condition like so:

```cpp
// assuming BIT_COUNT is compile time known
using MyType = Conditional_t<BIT_COUNT <= 8,int8_t,int64_t>;
```

This conditional enables simple logic with only two branches. Furthermore, 
without looking up how `Conditional` (or `std::conditional` for that matter) works, 
I don't find this code very readable[^nested_conditionals].
So I set out to do something both more powerful and more readable.

# The Goal
A few years ago I have implemented [if expressions for values](/blog/2020/if-expressions-for-cpp-part1), 
which are also `constexpr`. So they work for compile time known _values_, but not 
for _types_. However, I like the syntax and I wanted to see whether I can come 
up with a similar syntax that allows us to choose types at compile time. 
The syntax I ended up implementing looks like this[^first_try]:

```cpp
using IntType = If<(BIT_COUNT <= 8)>
                ::Then<uint8_t>
                ::ElseIf<(BIT_COUNT <= 16)>
                ::Then<uint16_t>
                ::ElseIf<(BIT_COUNT <= 32)>
                ::Then<uint32_t>
                ::Else<uint64_t>;
IntType my_integer = 0;
```

Whether this construct is useful in other circumstances than this particular 
example I don't know. But I find it very readable and was excited to challenge 
myself with the implementation.

We can build on the general idea of the `Conditional` implementation above 
which uses specialization to select for types. Additionally, we can draw 
inspiration from the [if expressions implementation](/blog/2020/if-expressions-for-cpp-part1),
where we have created transient types for the _if_, _then_, _else if_,
and _else_ parts of the expression.

# The Implementation

Let's have a look at the implementation and then walk through it. I suggest 
to only skim this code for now and jump to the next paragraph where we walk 
through the code in detail. The layout of the code is so that the compiler is happy. 
The declarations need to be in a particular order that is less intuitive to a human reader.

```cpp
// (1)
template <bool Condition, typename T>
struct ThenType {};

// (2)
template <bool IfCondition,
 typename T,
  bool ElifCondition>
struct ElifType {
  // (3)
  template <typename E>
  using Then = typename Conditional<IfCondition,
                        ThenType<true, T>,
                        ThenType<ElifCondition, E>
                        >::type;
};

// (4)
template <typename T>
struct ThenType<true, T> {
  //(5)
  template <typename E>
  using Else = T; 
  // (6)
  template <bool ElifCondition>
  using ElseIf = ElifType<true, T, ElifCondition>;
};

// (7)
template <typename T>
struct ThenType<false, T> {
  // (8)
  template <typename E>
  using Else = E;
  // (9)
  template <bool ElifCondition>
  using ElseIf = ElifType<false, T, ElifCondition>;
};

// (10)
template <bool Condition>
struct If {
  // (11)
  template <typename T>
  using Then = ThenType<Condition, T>;
};
```
Let's start at the bottom with the &#9321; `If` structure template, 
which takes a compile time known boolean condition `Condition`. It is the entry 
point to our metafunction and the key trick here is that we have an associated 
templated type &#9322; `Then<T>`. It evaluates to the `ThenType<Condition,T>` type, 
which we'll discuss in a moment. We can think about this templated associated 
type like a function in type space. It is only possible with `using` declarations 
in C++11 and up. Before that we would have had to use a `typedef` and I know 
of no way to make the typedef generic on a template parameter.

The &#9312; `ThenType<C,T>` structure template remembers the condition `C` from 
the original &#9321; `If<C>` and takes a type `T` that should be returned if 
this `C` is true. If we look at the template specializations &#9315; `ThenType<true,T>` 
and &#9318; `ThenType<false,T>` we can see that we have &#9316;&#9319;`Else<E>` 
associated types that take a type parameter `E`. Since _else_ is the last piece 
of the chain, this `Else` metafunction evaluates to a concrete type depending on 
the condition. If the condition is true, it will evaluate to `T`, which is the 
original type from the if condition, and otherwise it will evaluate to `E`, which 
is the type given to `Else`. These pieces enable us to write `If<(X<3)>::Then<int>::Else<float>`. 
This is already more readable than `std::conditional` to my mind, but we want to go further.

To enable the _else if_ part of the expression we add &#9317;&#9320; 
`ElseIf` associated types in the `ThenType` structure template specializations. 
This type is the reason we have to have this weird out of order declaration of `ThenType` 
in the first place. You surely noticed that we declared the `ThenType` template on top, 
then the `ElifType` template and only after that we specialized the `ThenType` template 
for the possible outcomes of the condition. This is because we want to use `ThenType` 
from `ElifType` but also `ElifType` from `ThenType`. Since the compiler needs to see those 
declarations before usage, we help it by essentially forward declaring the `ThenType` 
template. &#9313; `ElifType` has one member metafunction &#9314; `Then` which uses our 
`Conditional` in such a way that we propagate the correct logic and types through the chain.

# Conclusions and Code
In summary, we have enabled a syntax for using an _if_..._else if_..._else_ 
logic to expressively select _types_ at compile time based on logical conditions 
in C++11. This nicely complements my previous 
[if expressions implementation](/blog/2020/if-expressions-for-cpp-part1), 
which we can use to select _values_ (but not types) at compile time. Both 
implementations are available as part of my [func++ repository](https://github.com/geo-ant/funcpp) 
repository on GitHub.

# Endnotes
[^first_try]: For my first try I used `constexpr` functions on the `If` type which can be made to return (instances of) different types using `if constexpr`. There's many problems with this approach, but the biggest problem is that we have to extract the return _type_ using `decltype`, which does not make for a pretty syntax
[^nested_conditionals]: I know we can nest `std::conditional` to get an _else if_ logic but that only exacerbates the problems with readability.
