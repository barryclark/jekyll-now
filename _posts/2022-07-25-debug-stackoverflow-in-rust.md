---
layout: post
tags: rust stackoverflow debug 
#categories: []
date: 2022-07-25
last_updated:
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Debugging A Stack Overflow In Rust'
comments_id: 35
---

Recently I hit a stack overflow error in Rust and I found a helpful quick and dirty way of debugging it using a tool that a friendly
member of the community hacked. If you hit a stack overflow and are too lazy to fire up your debugger, this article is for you.

# The Quick Fix
Rust panic messages on stack overflows are not very helpful for figuring out what is actually causing the stack to overflow. There's
actually an (as of the time of this writing) [open issue](https://github.com/rust-lang/rust/issues/51405) for better stack overflow messages.
It is this open issue where community member [matklad](https://github.com/matklad) has posted their hack for better stack overflow messages.
We can find the crate [here](https://crates.io/crates/backtrace-on-stack-overflow).

The crate is conveniently named `backtrace-on-stack-overflow` and consists of only one public function `enable`. To use it just make that
function call the first thing in your main function like so:

```rust
fn main() {
    unsafe { backtrace_on_stack_overflow::enable() };
    // ... your code ...
}
```

And that's it. This crate provides us a backtrace that gives us a hint as to what the last function calls where before the stack overflow
occurred, which is very helpful during debugging. The crate is advertised as a quick and dirty _works on my machine_ type of thing, so it might
not work for everyone. Don't forget to remove that code and the dependency after the debugging is done.

# My Stack Overflow Story
It was recursion. It's always recursion[^always]. But truly, it was me being too clever for my own good. I obscured my code so much 
that I did not catch an infinite recursion when I created it.

So I had this structure, let's call it `Widget`, with a lot of member fields and wanted to add an implementation of the `Default` trait.

```rust
struct Widget {
    some_field   : SomeThing,
    other_field1 : OtherThing1,
    other_field2 : OtherThing2,
    // ... and many other fields
}
```
All of the fields except for `some_field` had a `Default` implementation. What I wanted to do was manually set the value for `some_field`, but
have all the other fields initialized with the default values of their respective types. What I ended up writing was:

```rust
impl Default for Widget {
    fn default() -> Self {
        Self {
            some_field : some_complicated_initializer(),
            ..Default::default()
        }
    }
}
```
Using the [struct update syntax](https://doc.rust-lang.org/book/ch05-01-defining-structs.html#creating-instances-from-other-instances-with-struct-update-syntax) and writing
`Default::default()` instead of `Self::default()` or even simpler `Widget::default()` obscured the obvious problem to me. Because this associated function obviously calls
itself infinitely often and will of course overflow any callstack.

Looking at this, this might seem obvious to you, but this code was something I wrote in a couple of seconds and buried in a big codebase. Maybe
there's an argument in here for being less fancy, maybe there's an argument for only offering one way of doing things as a language principle. I'll leave
that decision to you, dear reader, as I leave the question: how do we actually achieve what I was trying out to do in an elegant manner?


# Endnotes


[^always]: Full disclosure, it's not _always_ recursion.