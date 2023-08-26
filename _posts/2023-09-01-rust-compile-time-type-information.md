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

For this post, let's consider a slightly simplified problem and just
check that the two types `T` and `U` have the same size and not bother with
the alignment. This is just to keep the examples concise, because once we 
know out how to check for size, adding an alignment requirement is trivial.
So what we want is this:

```rust
fn do_somehting<T,U>() 
    // where: T and U have same size 
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

# Using Associated Constants

My first intuition was that associated constants would help me elegantly enforce trait bounds
that allow me to restrict my `do_something` to types with same size.

There are many ways to skin this cat and my ideas were definitely influenced
by how metaprogramming in C++ uses associated types and compile time constants
to give us metafunctions. I married this with a more Rusty idea of 
trait bounds and I came up with the following.

```rust
pub trait SameSizeAs<T> {
    const VALUE: bool;
}

impl<T,U> SameSizeAs<T> for U {
    const VALUE: bool = 
        std::mem::size_of::<T>() == std::mem::size_of::<U>();
}
```
So what we do is implement a trait `SameSizeAs<T>` for every type `U`, which
indicates whether `T` and `U` have the same size via an associated constant. That's
not too bad. We can use the trait like so:

```rust
pub fn do_something<T,U>() 
where U: SameSizeAs<T,VALUE=true>

{
    // do something
}
```

I find this pretty elegant and concise and it turns out the error messages are
very readable if we try to call the function with two types of different size.
There's just one problem with this: it does not compile on stable Rust. Current stable Rust 
(1.71.1 at the time of writing) does not allow us to compare associated
constants for equality. We need the feature
[`associated_const_equality`](https://github.com/rust-lang/rust/issues/92827)
to compile it which is unfortunate because I really would want my solution to work
on stable Rust. 

For completeness let me mention another [known way](https://github.com/rust-lang/rfcs/issues/3162)
of using compile time booleans in where clauses via a clever combination of 
Const Generics and Traits. However, it requires the unstable feature
[`generic_const_exprs`](https://github.com/rust-lang/rust/issues/76560). I won't 
go into detail here but we will see this feature pop up in a different context.

# Using Associated Types

There was a time (before [Rust 1.51](https://blog.rust-lang.org/2021/03/25/Rust-1.51.0.html))
when there was no Const Generics in Rust and all metaprogramming
(not invoking macros) had to be done with types only. So that's what I tried next.
Coming from C++ I know that metaprogramming with types can
get a bit hairy at times, but I was pretty confident that I could find a solution.
Because after all I was only trying to make the compiler enforce something 
that it already knows! 

Now, since I did not intend to use actual boolean values at compile time 
I had to translate the idea of booleans into types:

```rust
struct TrueType;
struct FalseType;

trait BoolType {}
impl BoolType for TrueType;
impl BoolType for FalseType;
```

Strictly speaking, the whole `BoolType` trait is not necessary but I feel it makes the
downstream code easier to read. Now we can define a trait that 
tells us whether a type `T` that implements it has the same size as another
type `U`:

```rust
pub trait SameSizeAs<U> {
    type Value : BoolType;
}
```

You can see why I like the `BoolType` trait here: it mirrors the syntax we would use to define
the type of a struct field. So at compile time, traits are for types what types
are for values at runtime. Kind of... anyways, we can now put a nice `where` clause into
our function definition:

```rust
pub fn do_something<T,U>() -> bool
where T: SameSizeAs<U,Value=TrueType> {
    println!("T and U are the same size");
    true
}
```

This reads very similar to the enum code above but now it is fine to write 
`Value=TrueType`  in the `where` clause in stable Rust. The reason is that
we are testing for equality of an associated _type_ and not a compile time 
constant _value_. 

Now there is just one thing missing and that is to write a blanket implementation for `SameSizeAs`
that serves our purpose. That is where the trouble lies, because any way we slice
it we need to have some way to go from a compile time known condition (a `const bool`)
to a type. Although I did not want to initially, I saw no other way than using Const 
Generics. So I want a metafunction that goes from a compile time known
condition `const C: bool` to a type depending on the condition. In C++ we would
use a templated struct with boolean template parameters and associated types for
that and in Rust we can to a very similar thing when we bring traits into the
mix:

```rust
pub struct Condition<const B: bool>;

pub trait TruthType {
    type ValueType : BoolType;
}

impl TruthType for Condition<true> {
    type ValueType = TrueType;
}

impl TruthType for Condition<false> {
    type ValueType = FalseType;
}
```

We can use the struct and the trait together to go from a compile time
known condition to a type. Unfortunately, as of the time of writing
we cannot simply use it as `Condition<Cond>::ValueType` but we have to use
the fully qualified type so that the compiler can understand the associated
type, even if it should be unambiguous. That means we must use it as
`<Condition<Cond> as TruthType>::ValueType` which is a bit cumbersome but
does the trick [^where-clause]:

```rust
impl<T,U> SameSizeAs<U> for T 
where Condition<{core::mem::size_of::<T>() 
        == core::mem::size_of::<U>()}>: TruthType {
    type Value = <Condition<{core::mem::size_of::<T>() 
        == core::mem::size_of::<U>()}> as TruthType>::ValueType;
}
```

We have now created a metafunction that transforms a compile time known
boolean into a type. We can use it to find out whether two given types are of 
the same size. That's great and all, but we again have to use an unstable feature
for that. This where the feature [`generic_const_exprs`](https://github.com/rust-lang/rust/issues/76560)
pops up again. We need this to use generic parameters `T` and `U` as part of
the condition that checks that the size is equal. It's a bit unfortunate since
the whole exercise was to go from a compile time boolean to a type and it seems to me
we need an unstable feature to accomplish that. I would be happy to be proven
wrong here.

Be that as it may, we can now use our type and trait to restrict the generic 
types passed to our `do_something` function:

```rust
pub fn do_something<T,U>() 
where T: SameSizeAs<U,Value=TrueType> {
    // do something 
}
```

Now the compiler will only let us invoke `do_something` with types of the
same size and will give an error otherwise. I find it hard to compare which
unsafe feature has a better chance of making it to stable soon, but it is
worth noting that at the time of writing, `generic_const_exprs` is still
described as "highly experimental" in the [associated tracking issue](https://github.com/rust-lang/rust/issues/76560)
and that the compiler issues a dedicated warning when it is used.

# Making it Work on Stable

There is another way to go about the whole problem, which does not involve
traits. [For a while](https://github.com/rust-lang/rust/pull/89508) stable Rust
has offered the possibility of panicking in `const` evaluated contexts. A
panic in `const` context will produce a compile error, though
I can't find the exact Rust version that stabilized it. Framing the problem like
this makes it something like a `static_assert` in C++, though it is not quite 
as straightforward.

What we need to do to invoke a `const` panic is to force the compiler to 
constant evaluate the panic. What we do is:

```rust
const ASSERTION : () = assert!(Cond,"condition was not satisfied");
```

Here, `Cond` needs to be a compile time known condition. So now we might just
try this in our function:

```rust
fn do_something<T,U>() {
    const ASSERTION : () = assert!(core::mem::size_of::<T>()
                            ==core::mem::size_of::<U>(),
                           "T and U must have the same size");
    // do something
}
```

However, this does not compile becaues the compiler points to `T` and
`U` with the error message _use of generic parameter from outer function_.
What does that mean? The way [it was explained to me](https://users.rust-lang.org/t/cant-use-type-parameters-of-outer-function-but-only-in-constant-expression/96023)
is that `const` items exist as if they were global, even if they were defined
inside a function. That is why we cannot access the generic parameters of the
function in the `const` item `ASSERTION`. But there is a way around it. Let's
make `ASSERTION` an associated constant of a struct:

```rust
struct SameLayout<T, U> {
    phantom: std::marker::PhantomData<(T, U)>,
}

impl<T,U> SameLayout<T,U> {
    const ASSERTION: () = assert!(std::mem::size_of::<T>() == std::mem::size_of::<U>() 
                && std::mem::align_of::<T>() == std::mem::align_of::<U>()
                ,"types do not have the same size");
}
```

Now what we have to do is force the creation of that constant inside the
function. But we can't just use another `const` item to do that inside the function
because that would, again, not allow us to access the types `T` and `U` for the
reasons stated above. However, we _can_ do it in a context that is not `const`
evaluated and whose only purpose force the [monomorphization](https://en.wikipedia.org/wiki/Monomorphization)
of the compile time assertion we are interested in.

```rust
pub fn do_something<T,U>() {
    _ = SameLayout::<T,U>::ASSERTION;
    // do something
}
```

Now when we try to invoke `do_something` with types of different sizes 
the compiler will print an error message. Also this works on stable Rust, which
is pretty satisfying. However, while it is nice that this does work at compile
time, there is no indication in the function signature that we require
`T` and `U` to be of the same size. We must relegate this fact to the documentation.

# Providing Fallback Implementations

The stated goal of this article was to enforce that `T` and `U` have the same
size at compile time and we have achieved that in different ways, only one of
which works on stable. But what if we did not want to issue a compile error in 
case `T` and `U` have different sizes but rather provide a fallback function?
Let's go very briefly through the presented solutions starting with the last one:

I see no way of using compile time assertions for branching in code generation
because its only purpose is to emit a compile error. So that one is out. The case
is different when using associated types in traits, because in principle we could
write two incarnations of `do_something`: one where `T: SameSizeAs<U,Value=TrueType>`
and one where `T: SameSizeAs<U,Value=FalseType>`. However, currently the
trait solver in Rust does not recognize these two things as disjoint cases so
that one won't work yet. There's some clever ways around those current limitations,
but I am not sure they'll work for this case. You can read all about it --shameless
plug incoming-- in my article on [mutually exclusive traits in Rust](/blog/2021/mutually-exclusive-traits-rust/).
Lastly, using associated constants. Again we could in theory write two implementations,
but as of now the cases `U: SameSizeAs<T,VALUE=true>` and `U: SameSizeAs<T,VALUE=false>`
are not recognized as disjoint although it is stated as a [future goal](https://github.com/rust-lang/rust/issues/92827#issuecomment-1260486226)
in the associated tracking issue.

If you are aware of [specialization](https://github.com/rust-lang/rust/issues/31844)
you'll recognize that this would offer another way of going about providing
a fallback implementation. It does not work quite like the solutions outlined 
above but it can be used to achieve something like the same effect in spirit. Specialization
is a big complex of features that is as of the time of this writing unsound
and even [a minimal subset](https://github.com/rust-lang/rust/pull/68970) is
still unstable.

# Final Thoughts

First of all, I'm happy to hear all things I got wrong in this article
because this is indeed a complex topic. Secondly, I would be interested in other 
ways to solve this problem that I missed here, especially ones that work on stable.

While this writeup has been fun, it has demonstrated to me that metaprogramming
in Rust is not straightforward and that the trait system still has some rough 
edges [^rough]. Not trying to say that it sucks or anything because when it works
(which is most of the time) it works _amazingly_, but this whole exercise would
have been a oneliner in Modern C++&trade; [^cpp]. 

# Endnotes
[^where-clause]: If it strikes you as odd that we have to repeat the exact same condition in the where clause that we used in the body, you are not alone. In principle the compiler should know that `TruthType` is implemented for all incarnations of `Condition<C>`. It also does not help if we write `where Condition<true>: TruthType, Condition<false>:TruthType`. I suspect those are limitations in the current trait solver.
[^cpp]: I _know_ C++ has massive problems and I will choose Rust over it any time but the (non macro based) metaprogramming and compile time programming is as of yet stronger in C++. Though for normal (non-meta) usecases traits beat concepts so brutally its not even funny.
