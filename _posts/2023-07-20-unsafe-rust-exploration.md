---
layout: post
tags: rust unsafe
#categories: []
date: 2023-07-20
last_updated:
#excerpt: ''
#description:
#permalink:
title: '(How to) Think about Unsafe Rust'
#
#
# Make sure this image is correct !!!
og_image:
#
#
# Make sure comments are enabled !!!	
comments_id:
---

A project of mine required me to dive into unsafe Rust and
when I finished the project I had understood something that I wanted to share.
However, since I do have a healthy dose of humility I did ask the community to
review my code and _oh boy_ did it turn out that I had missed some vital things. 
Bear with me and hopefully you'll gather something useful, too.

# A Warning

Be warned that most (possibly all) the examples in this post contain
unsafe code with bugs of varying subtlety. _Do not_ blindly copy code
from here. If you read till the end you'll learn why you will likely
never have to bother with the code within this post... and also that you've 
been using it already (probably without knowing it).

# The Task At Hand: In Place Mapping

The task we're trying to tackle here is to transform a `Vec<T>` into a `Vec<U>` 
in place, given that types `T` and `U` have the same memory layout. Transforming
_in place_ means we are reusing the storage of the initial vector. This is what
our function will look like:

```rust
fn map_in_place<T,U,F>(v: Vec<T>, f: F) -> Vec<U> 
    where F :FnMut(T) -> U {
    assert_eq!(std::alloc::Layout::<T>::new(), std::alloc::Layout::<U>::new());

    todo!()
}
```

`Vec<T>` does not expose an obvious high level and safe API to accomplish what
we want [^safeapi], so we have to dive into unsafe. The rest of this article is 
concerned with replacing the `todo()` with somehting more useful,
but let's take a higher level look at `unsafe` first.

# Unsafe Rust Confusion

I've struggled a lot with understanding when and how to use unsafe Rust. Part
of the reason is that there is a (very justified) hesitation to use unsafe code
within the Rust ecosystem and it's a clear plus when a crate advertises
itself as _written in 100% safe Rust_ [^safe-rust]. But add to that some overly
simplistic semtiments swirling around about the relation of `unsafe` and the
borrow checker, e.g. _unsafe Rust is not about circumventing the borrow checker_.
That's not necessarily wrong, but it's not constructive. Because clearly
you _can_ use `unsafe` to make the compiler accept programs that you could
not formulate in safe Rust only. Some of those programs are sound, some are not.

## Unsafe Is Not About Circumventing Anything

A very important realization for me was to get rid of the mental model of
circumventing the borrow checker with unsafe Rust. I'll try to reframe it
in this section. Let's look at the following example:

```rust
// borrow checker will
// reject this
let x = 10;
let r1 = &mut x;
let r2 = &mut x;
// ...
```

The compiler will reject this code because we are violating one of Rust's
basic assumptions by trying to take two mutable references to one piece of 
data [^mutref]. It's also a well known fact that the compiler will
reject the code even if we place it inside an unsafe block like so:

```rust
unsafe {
  // still rejected
  let mut x = 10;
  let r1 = &mut x;
  let r2 = &mut x;
  // ...
}
```

So in that sense we cannot simply use `unsafe` to turn off fundamental language
rules. I think that's a well known fact and The Book !!!!!!!!!! does mention it, too.
Now look at this example:

```rust
let mut x = 10;
let ptr: *mut i32 = &mut x;
unsafe {
  let r1 = &mut *ptr;
  let r2 = &mut *ptr;
  // ...
}
```

This compiles, so we have just circumvented Rust's Borrow Checker using `unsafe`,
haven't we? In a way yes, but that is not a helpful way to think about it. The 
problem is not that we have circumvented the borrow checker. Indeed there are
completely sound ways of using `unsafe` that could be considered circumventing the borrow
checker. The problem is that we have broken a promise to the compiler when we used the 
powers bestowed upon us via the `unsafe` keyword. We should have upheld the 
fundamental rules of the language and we did not.

The compiler always assumes that the language rules (link !!!!ALIASING RULES!!!!)
apply and subsequently that two mutable references can never point to the same memory.
It is allowed to optimize our program as if that assumption is always true and that will,
in turn, result in the dreaded _undefined behavior_. Meaning anything can happen.

## Unsafe as a Gateway

Among other things, `unsafe` gives us the power to dereference raw pointers and to
call unsafe functions [^unsafe-powers]. The language rules that apply to references
are not enforced on raw pointers. That is not an accident but one of the defining
_features_ of pointers. We are able to use them to write correct programs that the borrow
checker would reject because it errs on the side of caution. We still have to make sure
that the language rules are obeyed everywhere in the code. It is especially
easy to make mistakes is when transitioning from unsafe constructs to safe constructs, 
like we did above transitioning from pointers to references. 

In unsafe land we are able to express things that we cannot in safe Rust, such
as _I need multiple mutable accesses to one piece of memory_. For those problems,
pointers are exactly what we should use, because
there is no way[^no-way-arc-mutex] to express the same in safe Rust.

```rust
let mut x = 10;
let p1: *mut i32 = &mut x;
let p2: *mut i32 = &mut x;
unsafe {
  // ...
}
```

This is perfectly fine Rust code and the compiler will not break our code simply by making
assumptions about what the pointers can and can't point to. Again, it would not
be very helpful to frame this as circumventing the borrow checker, because the same
thing could be said about the broken code futher above. We have now stepped into unsafe land
and there is things we can do in unsafe land that we cannot simply do in safe
land. If you only think of the part where we are "circumventing" the borrow 
checker both code snippets would be equivalent, but they are not. So unsafe code
should not be judged on whether it circumvents the borrow checker, which is actually
the major use case of unsafe in this article . It makes 
sense to see as unsafe as a gateway into a special part of the language where
we have to be very careful how to interact with the safe part of the language.

While we can surely write broken code inside the unsafe block above, one particular danger is at the
border when transitioning back to safe language constructs. I've found the ergonomics
of using unsafe constructs (such as pointers) much more cumbersome than using 
safe language constructs (such as references) and that makes it very tempting
to cross the border prematurely and write broken code. Let's take a look how
all of this applies to our in place transformation problem.

# The Transformative Unsafe Journey


# Further Reading

While pretty long, this article is an abridged version of my journey through this
problem. !!!!HERE!!!! is my forum post were a lot of people pointed out mistakes and
provided help, for which I am very grateful. There is also the !!!!RUSTONIMICON!!!
which provides a thorough treatise of unsafe Rust.

# Endnotes

[^mutref]: As a matter of fact, even if `r2` had merely been an immutable reference, this code would have been rejected by the compiler.
[^safeapi]: It will turn out that there is, in fact, a high-level API to achieve this. Well... it turns out the API is pretty obvious but the fact that it does what I want it to do is not.
[^unsafe-powers]: There's a couple more things that `unsafe` lets us do, the Rust Book lovingly calls them _unsafe  superpowers_.
[^ub-unsafe]: To be clear, we can still introduce all kinds of UB ourselves by not being careful.
[^no-way-arc-mutex]: Of course there are safe wrappers, like `Arc<Mutex<T>>` that serve a conceptually similar, but very different use case. If we want to manipulate data on a low level, pointers are what we want.
[^safe-rust]: I also see this as an advantage because it means I can trust that someone's code is free of many classes of bugs. That's great.
