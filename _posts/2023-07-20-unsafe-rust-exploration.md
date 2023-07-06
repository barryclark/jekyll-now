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

A pet project of mine required me to dive into unsafe Rust and
when I finished the project I had understood something that I wanted to share.
However, since I do have a healthy dose of humility I did ask the community to
review my code and _oh boy_ did it turn out that I had missed some things. Not
necessarily that the mysterious thing I had understood (and will share) was 
wrong but it was only a small puzzle piece. If you bear with me, I hope you'll
learn something, too.

# Safety Warning

Be warned that most (maybe even all) the examples in this post contain
unsafe code with bugs of varying subtlety. _Do not_ blindly copy code
from here. If you read till the end you'll learn why you will likely
never have to bother with the code within this post and also that you've 
been using it already (probably without knowing it).

# The Task: Transforming a Vector in Place

The task we're trying to tackle is to transform a `Vec<T>` into a `Vec<U>` 
in place (meaning we're reusing the memory allocated for the initial vector),
given that types `T` and `U` have the same memory layout. So this is what
our function will look like:

```rust
fn map_in_place<T,U,F>(v: Vec<T>, f: F) -> Vec<U> 
    where F :FnMut(T) -> U {
    assert_eq!(std::alloc::Layout::<T>::new(), std::alloc::Layout::<U>::new());

    todo!()
}
```

# Unsafe Rust and Circumventing the Borrow Checker

From time to time I hear it said that unsafe Rust is not about circumventing
the Borrow Checker. I've found that sentiment more confusing than helpful,
let me explain why. It's not so much that the sentiment is not true,
for example take a look at this code:

```rust
// borrow checker will
// reject this
let x = 10;
let r1 = &mut x;
let r2 = &mut x;
...
```

The compiler will reject this code because we are violating one of Rust's
basic assumptions by trying to take two mutable references to one piece of 
data [^mutref]. It's also a well known fact that the compiler will
reject the code even if we write it like this:

```rust
unsafe {
  // still rejected
  let mut x = 10;
  let r1 = &mut x;
  let r2 = &mut x;
}
```

So in that sense we cannot simply use unsafe to circumvent fundamental language
rules. I think that's a well known fact and I believe The Book !!!!!!!!!! does mention it, too.
Now look at this example:

```rust
let mut x = 10;
let ptr: *mut i32 = &mut x;
unsafe {
  let r1 = &mut *ptr;
  let r2 = &mut *ptr;
...
}
```

This compiles, so we have just circumvented Rust's 
Borrow Checker using `unsafe`. Why is that a problem? Well, the problem here is 
that the compiler still assumes that the language rules (link !!!!ALIASING RULES!!!!)
apply and subsequently that two mutable references can never point to the same memory.
It will optimize our program as if that assumption is always true and that will,
in turn, result in the dreaded _undefined behavior_, meaning anything can happen.

One important thing that `unsafe` gives us is the ability to dereference pointers and
call unsafe pointer member functions. Pointers do not obey the same language rules
as references, so we can use them to compile valid programs that we cannot write
in only safe Rust. However, we must always uphold Rust's language rules, even in
unsafe blocks. It helps to see unsafe code as something a special toolset that
you can dip into to do things you could not do otherwise.

# Endnotes

[^mutref] As a matter of fact, even if `r2` had merely been an immutable reference, this code would have been rejected.
