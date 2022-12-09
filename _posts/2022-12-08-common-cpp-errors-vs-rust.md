---
layout: post
tags: rust errors c++
#categories: []
date: 2022-12-08
last_updated:
#excerpt: ''
#description:
#permalink:
title: Facebook's Most Common C++ Errors in Rust
#
#
# Make sure this image is correct !!!
og_image: 
#
#
# Make sure comments are enabled !!!	
comments_id:
---

I used to like C++. I still do, but I used to, too. Furthermore, I am not one of 
those people that tells C++ developers to just use Rust, because there are a ton 
of valid reasons why companies or individuals decide to use C++. What I am trying
to do in this article is see how Rust handles a handful of very common (and 
severe) bugs that are easy to produce in C++.

I use Louis Brandy's CppCon 2017 Talk [Curiously Recurring C++ Bugs at Facebook](https://youtu.be/lkgszkPnV8g)
as the basis for what constitutes a common and scary bug in C++. I am aware that
facebook does not represent every C++ use case, but my experience is very compatible
with the given list. I'll try to not repeat the talk too much --because it is an 
excellent talk that I urge you to wath yourself-- and I'll take some liberties
in ordering and enumerating the bugs. However, this article aims to be self
contained, so there is necessarily going to be some repetition. So without further 
ado, let's jump in.

# Bug \#1: Vector Out of Bounds Access Using `[]`

We all know array or vector access using operator `[]` runs the danger of out of
bounds access. On `std::vector`[^arrays] it does [not perform bounds checking](https://en.cppreference.com/w/cpp/container/vector/operator_at),
so an illegal memory access can occurr unnoticed. The problem is not that this
is possible at all, since a low level language that cares about performance
must offer these kinds of unchecked accesses. My problem is that this is 
the simplest way to access a vector element, in every programmers DNA, that is
inherently unsafe.

There is, of course a bounds-checked API for element access 
`std::vector::at`, that programmers do not seem to use. Rust does the trade-off
differently. On slices, arrays, vectors and such the `[]` operator is bounds-checked
and will panic [^panic]. There is a method [`get_unchecked`](https://doc.rust-lang.org/std/primitive.slice.html#method.get_unchecked)
that allows unchecked access to the elements if you tell the compiler _trust me,
I know what I am doing_ using the `unsafe` keyword. I personally think this is 
the correct default to have, since the other way leads to the most common bug 
contained in this presentation.

# Bug \#2: `std::map` Acccess using `[]`

This one is a pretty well known confusing API, because on a map in C++ the operator
`[]` actually means get me a reference to the element _or insert the default value_
and then get me a reference to that. This is surely a useful API, but I feel that 
it should, again, not use the simplest operator because it violates the [principle
of least surprise](https://en.m.wikipedia.org/wiki/Principle_of_least_astonishment).
Louis Brandy has an excellent example of how that can be a problem:

```c++
Ẁidget::Widget(
  const std::map<std::string, int>& settings) :
    m_settings(settings) {
      std::cout << "Widget initialized..."
                << "timeout is:"
                << m_settings["timeout"]
                << "\n";
}
```

Here the programmers mindset is _let me just log the timeout real quick_, but it 
is easy to forget that this operation inserts a timeout of `0` (which in their
case means _infinite wait_), if no such key was already present.
Rust's [BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#)
exposes a much less surprising API, which makes this kind of error impossible.


# Endnotes

[^arrays]: This is true for other array like containers in the STL as well as C-style arrays.
[^panic]: A panic is an early, but orderly termination of the program with stack unwinding.
