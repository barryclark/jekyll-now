---
layout: post
tags: rust unstable traits const
#categories: []
date: 2023-07-24
last_updated: 2023-08-07
#excerpt: ''
#description:
#permalink:
title: 'Conditional Compilation xxxxxxxxxxxxx'
#
#
# Make sure this image is correct !!!
og_image: 
#
#
# Make sure comments are enabled !!!	
comments_id: 
---

This article is a deep(ish) dive into how to use traits for some special 
applications that require conditional compilation. I'll try to explore some
limitations of Rust's current metaprogramming capabilities using the example
of making sure at compile time that two types have the size in memory.

# Motivation

In my [last article](/blog/2023/unsafe-rust-exploration/)
I wrote a function to perform an in place mapping from a `Vec<T>` to a `Vec<U>`
where the important precondition was that `T` and `U` have the same size and
alignment. The function looked something like this:

```rust
fn map_in_place<T,U,F>(v: Vec<T>, mut f: F) -> Vec<U> 
    where F: FnMut(T) -> U {
    assert_eq!(std::alloc::Layout::<T>::new(), 
        std::alloc::Layout::<U>::new());

    // loads of unsafe code here
}
```
I won't go into the unsafe code here because that was the topic of the aforementioned
article. The one thing that bugged me was that I had to have this `assert_eq!` in there.
Not the fact that it was in there but it was a condition that would be checked at runtime.
As a die-hard metaprogramming fan it felt weird to check a condition at runtime
that we can clearly check at compile time. It would be great if we
can stick this condition into the function signature using Rust's trait system 
to make it blatantly obvious that we want the types `T` and `U` to have the same
size. 

## Today's Problem: Same Size for Two Types

For this article I will simplify the problem. I just want to make sure two types `T` and
`U` have the same size and I won't bother with the alignment. This is just to keep the
examples concise, because once we figure out how to check for size, adding an
alignment requirement is trivial. So what we want is this:

```rust
fn do_somehting<T,U>() 
    // where T and U have same size 
{
    // do something
}

// this compiles
do_something<u8,u8>();
// this also compiles
do_somehting<f32,i32>();
// this must not compile
do_something<u8,u32>();
```

The compiler knows the sizes of the types `T` and `U` at compile time so it 
should be simple enough to find a solution to enforce identical size at compile time,
right? Right?

# Using Associated Types

So before [Rust 1.51](https://blog.rust-lang.org/2021/03/25/Rust-1.51.0.html) there
was no Const Generics feature in Rust and any form of metaprogramming (not involving
macros) had to work with types only. So I thought I'd try it this way and see how
far I can push it. Coming from C++ I know that metaprogramming with types can
get a bit hairy at times, but I was pretty confident that I could find a solution.
Because after all I was only trying to make the compiler enforce something 
that it already knows! Let's see how that turned out. For reference, I am using
the current stable Rust version, which is 1.71.1 at the time of writing.

Okay, since we cannot use actual boolean values at compile time (without const
generics) we have to translate the concept of booleans into types:

```rust
struct TrueType;
struct FalseType;

trait BoolType {}
impl BoolType for TrueType;
impl BoolType for FalseType;
```
Arguably, the whole `BoolType` trait is not necessary but I feel it makes the
downstream code easier to read. Now what we can do is define a trait that
tells use whether the type it is implemented for has the same size as 
another type `T`:

```rust
pub trait SameSizeAs<U> {
    type Value : BoolType;
}
```
I like the `BoolType` trait because it mirrors the syntax we would use to define
the type of a struct fields. So at compile time traits are for types what types
are for values. Kind of... anyways, we can now put a nice where clause into
our function definition:

```rust
pub fn do_something<T,U>() -> bool
where T: SameSizeAs<U,Value=TrueType> 
{
    println!("T and U are the same size");
    true
}
```
As an aside, if you are wondering whether we can add a second variant
of the function that restricts on `T: SameSizeAs<U, Value=FalseType>`, I can recommend
my article on [mutually exclusive traits](/blog/2021/mutually-exclusive-traits-rust/).
Anyways, great this is pretty reasonable considering the fact that we expressed everything in the
type system. There is just one tiny thing missing: we need to make the compiler
implement the `SameSizeAs<U>` trait correctly for every type `T`. 


