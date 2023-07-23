---
layout: post
tags: rust unsafe
#categories: []
date: 2023-07-20
last_updated:
#excerpt: ''
#description:
#permalink:
title: 'Learn Unsafe Rust From My Mistakes'
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
been using it already, maybe unknowingly.

If you spot errors in this article please do reach out either via the
commentary function on this page or shoot me a mail using the link at
the bottom of this page.

# The Task At Hand: In Place Mapping

The task we're trying to tackle here is to transform a `Vec<T>` into a `Vec<U>` 
in place, given that types `T` and `U` have the same memory layout, i.e. size and 
alignment. Transforming _in place_ means we are reusing the storage of the
initial vector. Our mapping function will look something like this:

```rust
fn map_in_place<T,U,F>(v: Vec<T>, mut f: F) -> Vec<U> 
    where F: FnMut(T) -> U {
    assert_eq!(std::alloc::Layout::<T>::new(), std::alloc::Layout::<U>::new());

    todo!()
}
```

`Vec<T>` does not expose an obvious, high level, and safe API to accomplish what
we want [^safeapi], so we have to dive into unsafe. The rest of this article is 
concerned with replacing the `todo!()`, but let's take a step back first.

# Unsafe Rust Confusion

I've struggled a lot with understanding when and how to use unsafe Rust. Part
of the reason is that there is a (very justified) hesitation to use unsafe code
within the Rust ecosystem and it's a clear plus when a crate advertises
itself as _written in 100% safe Rust_ [^safe-rust]. Then add to that some overly
simplistic semtiments I've come across such as _unsafe Rust is not about circumventing the borrow checker_.
I think this implanted the idea in my head that I could spot incorrect
usage of unsafe code by the mere fact that it was "circumventing the borrow
checker", whatever that meant. That didn't help me to accomplish
that and I needed a better mental model.

## Unsafe Is Not About Circumventing Anything

A very important realization for me was to get rid of the notion of 
circumventing the borrow checker with unsafe Rust. I'll try to reframe it
in this section. The first thing to realize is that the interaction between
the borrow checker and `unsafe` is too narrow of a view. It's about the interaction
of the fundamental language Rules of Rust with unsafe code. The borrow checker
is a well known part of the Rust language because it enforces the [aliasing rules](https://doc.rust-lang.org/rust-by-example/scope/borrow/alias.html). It's an
important part of what makes safe Rust memory safe, but it's only a part of 
what gives the language its safety guarantees.

The second thing to realize is that `unsafe` does not change any fundamental
rules of the language and so it also does not, for example,
turn off the borrow checker. Take a look at this invalid Rust code:

```rust
// does not compile
let x = 10;
let r1 = &mut x;
let r2 = &mut x;
// ...
```

The compiler will reject this code because we are violating one of Rust's
basic assumptions by trying to take two mutable references to one piece of 
data [^mutref]. Merely placing the same code into an `unsafe` block does not
make it valid Rust code. The aliasing rules for references apply everywhere,
so the compiler will _always_ assume they are true and optimize accordingly.
It will stop you from violating them wherever it can.

```rust
unsafe {
  // still rejected
  let mut x = 10;
  let r1 = &mut x;
  let r2 = &mut x;
  // ...
}
```

Now let's look at this example, where we use unsafe to eventually obtain
two mutable references:

```rust
let mut x = 10;
let ptr: *mut i32 = &mut x;
unsafe {
  let r1 = &mut *ptr;
  let r2 = &mut *ptr;
  // ...
}
```

This code compiles, so we have just circumvented Rust's Borrow Checker using `unsafe`,
haven't we? In a way yes, but that is not a helpful way to think about it. The 
problem is not that we have done something that the borrow checker would
The problem is that we have broken a promise to the compiler when we used the 
powers bestowed upon us via the `unsafe` keyword. The compiler lets us work
with raw pointers (which do not have aliasing rules) but it expects us
to still obey the rules of the language. In this case we have created two 
mutable references to one piece of data, which breaks a rule of the language. 

The compiler always assumes that the language rules 
apply and subsequently that two mutable references can never point to the same memory.
It is allowed to optimize our program as if that assumption is always true and that will,
in turn, result in the dreaded _undefined behavior_... even in an unsafe block because
--and I know I am belaboring this point-- unsafe Rust still assume the Rules of safe Rust are
unbroken.


### Detecting Rule Violations

At this point you might be wondering if there is any tools to help you detect rule
violations and the answer is [Miri](https://github.com/rust-lang/miri). It is an
analysis tool that can run your program or test suite and detect [certain kinds](https://github.com/rust-lang/miri#miri)
of undefined behavior by using an interpreter for Rust's [mid-level IR](https://github.com/rust-lang/rfcs/blob/master/text/1211-mir.md).
You can use it as a cargo plugin with `cargo miri run` or `cargo miri test`. 

This is immensely helpful for finding some classes of undefined behavior, but
there are some caveats. Because Miri is an interpreter it is much slower than
the compiled binary, so running your whole test suite or program might not be 
feasible. Furthermore it works by _running_ your code through the interpreter 
and in this sense it works _at runtime_. That means even if it is theoretically
able to detect a source of undefined behavior (UB), you must actually hit the source
of UB during a run. This is all the more reason to have a very exhaustive test
suite for your unsafe code and keep in mind that are certain classes of UB that Miri
does not detect, regardless.

## Unsafe as a Gateway

Among other things, `unsafe` gives us the power to dereference raw pointers and to
call unsafe functions [^unsafe-powers]. The language rules that apply to references
are not enforced on raw pointers. That is not an accident but one of the defining
_features_ of pointers. We are able to use them to write correct programs that the borrow
checker would reject because it errs on the side of caution. A famous example
is implementing [doubly linked lists](https://rust-unofficial.github.io/too-many-lists/).

In unsafe Rust it is now our responsibility to enforce the language rules.
It is especially easy to make mistakes when transitioning from unsafe
constructs to safe constructs, like we did above transitioning from pointers to
references [^unsafe-constructs]. In unsafe land we are able to express things that we cannot in safe Rust, such
as _I need multiple mutable references to one piece of data_. You must never actually
use two mutable references (even if you trick the compiler) but it is perfectly
fine to use two pointers to the same data. In fact, pointers are exactly the
language construct we should use for that particular problem, because there
is no way to express the same intent in safe Rust [^no-way-arc-mutex].

```rust
let mut x = 10;
let p1: *mut i32 = &mut x;
let p2: *mut i32 = &mut x;
unsafe {
  // ...
}
```

This is perfectly fine Rust code and the compiler will not break our code by making
assumptions about what the pointers can or can't point to. Again, it would not
be very helpful to frame this as circumventing the borrow checker, because the same
thing could be said about the broken code futher above. We have now stepped into unsafe land
and there is things we can do in unsafe land that we cannot simply do in safe
land. If you only think of the part where we are "circumventing" the borrow 
checker both code snippets would be equivalent, but they are not. Using unsafe
code to express things we cannot express in safe Rust is one of the major
usecases of unsafe. Using unsafe code to make safe language constructs behave
in ways that they are not allowed to is an abuse.

So one of the lessons for me was to learn to use unsafe constructs more comfortably
and not try to weasel my way back into safe constructs as soon as possible.
However, I've found the ergonomics of using unsafe constructs (such as pointers)
much more cumbersome than using safe language constructs (such as references)
and that makes it very tempting to cross the border prematurely and write
broken code. Let's take a look how all of this applies to our in place
mapping problem.

# The Transformative Unsafe Journey

Armed with the understanding above I set out on my journey of implementing  
the in-place mapping function. I was not going to make the rookie mistake of using
pointers to get me some illegal references, no siree. I was going to stay in
pointer-land as long as I needed to and everything would be fine... so I thought.

## A Clear, Simple (and Wrong) Solution

So let's have a look at a first solution that avoids the obvious error of 
violating Rust's aliasing rules and does quite a few things correctly.

```rust
fn map_in_place<T,U,F>(v: Vec<T>, mut f: F) -> Vec<U> 
where F: FnMut(T) -> U{
    assert_eq!(Layout::new::<T>(), Layout::new::<U>());
    unsafe {
        // (1)
        let (pstart, len, cap) = v.into_raw_parts();
        // (2)
        for pt in (0..len).map(|j| pstart.add(j)) {
            // (3)
            let t = pt.read();
            let u = f(t);
            // (4)
            let pu: *mut U = pt.cast();
            pu.write(u);
        }
        // (5)
        Vec::from_raw_parts(pstart.cast(), len, cap)
    }
}
```
I should mention that the latest stable Rust version at the time of writing is
Rust 1.17.0, which is probably not terribly important. The code above
uses the unstable [Vec::into_raw_parts](https://github.com/rust-lang/rust/issues/65816) API
just for clarity, because the effect can be very easily replicated in stable Rust.

Let's pretend that this was my first draft of the code [^it-wasnt]. Before we go
into the problems with this function let's look at the code line by line. After making
sure the memory layout of the types `T` and `U` have the same memory layout, 
&#9312; we consume the vector and obtain its raw parts: The pointer `pstart` to the
first element, the number of elements `len`, and the capacity `cap`. 
&#9313; Then we iterate through the elements of the vector via the pointer `pt`
of type `T`. &#9314; Now we read the element into our stack variable `t` and
transform it into an element `u` of type `U`. Using `pt.read()` makes this work 
even for non-`Copy` elements because it will just perform a simple memory copy.
&#9315; Then we obtain a second pointer to the element that we are iterating over.
This pointer `pu` is a of type `*mut U`. We are using `cast` rather than `as` to
cast the pointer, which is a good practice because it will catch changes in
mutability at compile time [^cast-mutability]. Then we write the transformed
value to the memory location using `pu`. Note that we are using `pu.write(u)` 
instead of `*pu = u` because the latter
must drop the value behind the pointer before assigning to it to avoid possible
memory leaks [^drop-leak]. This would be a giant problem because the contained
value would be dropped as if it was of type `U`, but is actually of type `T` [^drop-T].
If we use `write` the pointed-to value does intentionally not get dropped. &#9316;
Finally we piece a new vector of type `U` together from the transformed storage.

You can see that we already took care of a lot of details that are easy to miss
and yet the logic is still broken. Let's see why.

## Panic Safety

Yes, panic safety. Coming from a C++ background it's something that I should
be much more mindful of but I usually forget to take it into account. The reason
is that panics in Rust semantically are [very different](https://doc.rust-lang.org/std/panic/fn.catch_unwind.html)
from exceptions and the general advice is not to just catch them as you would
catch exceptions in C++. And while by default a panic will unwind the stack and
call destructors in an orderly fashion, that behavior can be changed to 
[just abort](https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html).
In essence, this is what makes it easy (at least for me) to  forget that code should
behave correctly even in case of a panic, whether or not a user relies on it or not.

When the function `f` panics at some point during the loop there are three things
we need to make sure [^forum-drop]: Firstly, need to call the destructors of all elements 
that have been transformed to type `U`. Secondly, we need to call the destructors
of all the remaining elements of type `T` and thirdly we need to deallocate the
storage of the vector to prevent a memory leak [^memleak]. One solution to do 
this is to implement a helper structure that keeps track of the elements while
they are transitioning from `T` to `U` and take care that they are appropriately
dropped in case of a panic. First we create an _untagged_ union and the helper 
structure like so:

```rust
union Union<T, U> {
    pub first: ManuallyDrop<T>,
    pub second: ManuallyDrop<U>,
}

struct TransitioningVec<T, U> {
    vector: Vec<Union<T, U>>,
    u_len: usize,
}
```

The union type is so that we can refer to an element as either of type `T` or
`U`, but since we can't know which type it is we have to keep track of the number
of elements `u_len` that have been transformed from `T` to `U`. The reason that
we enclosed the types of the union fields in a `ManuallyDrop` is that the compiler
cannot know which variant a union holds (since they are not tagged, like enums),
so it cannot call the appropriate destructors. Hence we are not allowed to use types that
have nontrivial destructors as union fields. To create this helper structure
from our initial `Vec<T>` instance we write this constructor:

```rust
impl<T, U> TransitioningVec<T, U> {
    pub fn new(v: Vec<T>) -> Self {
        assert_eq!(Layout::new::<T>(), Layout::new::<U>());
        let (ptr,len,cap) = v.into_raw_parts();
        let data = unsafe { Vec::from_raw_parts(ptr.cast(), len, cap) };
        Self {
            vector: data,
            u_len: 0,
        }
    }
}
```

We set the number of transformed elements to zero and we change the data type
of the vector, so that we can store both `T`s and `U`s in it but we leave the
actual data untouched. Before we get to the implementation of the mapping 
functionality, we need to implement `Drop` for our helper structure so
it can act appropriately when it is dropped while the elements are still
transitioning:

```rust
impl<T, U> Drop for TransitioningVec<T, U> {
    fn drop(&mut self) {
        let start = self.vector.as_mut_ptr();
        unsafe {
            let u_slice :&mut [U] = std::slice::from_raw_parts_mut(
                start.cast(),
                self.u_len);
            let t_slice :&mut [T] = std::slice::from_raw_parts_mut(
                start.add(self.u_len).cast(),
                self.vector.len() - self.u_len,
            );
            std::ptr::drop_in_place(u_slice);
            std::ptr::drop_in_place(t_slice);
        }
    }
}
```

We will transform elements from "left to right" and we keep track of the number
`u_len` of transformed elements. This allows us to split the memory into two slices
of elements, first of type `U` and the second of type `T`. We then drop those
slices individually, making sure that the appropriate destructors are called. If 
you are like me, then you might be tempted to loop over the elements individually
and drop them. Don't do that, the Rust typesystem is your friend and it will 
understand that you are dropping slices and it will do the correct thing for you
[^drop-slices].

Finally we can implement the actual functionality in an
associated function like so:

```rust
impl<T, U> TransitioningVec<T, U> {
    #[inline]
    pub fn map_in_place<F: FnMut(T) -> U>(mut self, mut f: F) -> Vec<U> {
        // (1)
        let start_ptr: *mut T = self.vector.as_mut_ptr().cast();
        while self.u_len < self.vector.len() {
            unsafe {
                let t_ptr = start_ptr.add(self.u_len);
                let u_ptr: *mut U = t_ptr.cast();
                let t = t_ptr.read();
                u_ptr.write(f(t));
            }
            self.u_len += 1;
        }
        // (2)
        let mut me = ManuallyDrop::new(self);
        unsafe {
            Vec::from_raw_parts(
                me.vector.as_mut_ptr().cast(),
                me.vector.len(),
                me.vector.capacity(),
            )
        }
    }
}
```
&#9312; This loop is the same as the one we had previously with the addition
that we now keep track of the number of elements we have transformed. If 
the function `f` panics at any point, the destructor of our `TransitioningVec`
instance will get invoked and destroy the elements appropriately and free
the allocated storage allocated by the vector. &#9313; Here all elements
have completed their transformation, so we
are making sure that the destructor of our instance does not get called anymore
and we return a `Vec<U>` that is now the sole owner of the transformed elements
and the allocated storage.

Since we don't want to expose this helper vector publicly, we hide it in the
`map_in_place` free function like so:

```rust
fn map_in_place<T, U, F>(v: Vec<T>, f: F) -> Vec<U>
where
    F: FnMut(T) -> U,
{
    TransitioningVec::new(v).map_in_place(f)
}
```

And voilà we're done... or are we?

## Is That It? All Good Now?

No. For example, we haven't handled [zero sized types](https://doc.rust-lang.org/beta/nomicon/exotic-sizes.html#zero-sized-types-zsts)
yet. The code above implicitly assumes that the elements of the vector have a 
nonzero size in memory. Read till the very end for a solution. And please 
do reach out if there is more unsound code in my examples or mistakes in 
my explanations. 

# Further Reading

Before we come to the long overdue end of this long winded article, let
me give you some reading recommendations if you want to dive deaper. 
If you've been following along with the endnotes you've already seen the 
[forum post](https://users.rust-lang.org/t/is-my-highly-unsafe-code-correct-in-place-mapping-a-vector/96078)
I made in which many helpful individuals were kind enough to point out mistakes
and give helpful suggestions. And if you want to dive more into unsafe Rust
there is [this brilliant series](https://rust-unofficial.github.io/too-many-lists/)
and of course [the Rustonomicon](https://doc.rust-lang.org/nomicon/) which provides
a thorough treatise of unsafe Rust. Also a long time ago there used to exist 
an unstable standard library API with the exact same purpose. You can look
at it's long removed implementation
[here](https://github.com/rust-lang/rust/blob/9a92aaf19a64603b02b4130fe52958cc12488900/src/libcollections/vec.rs#L787).

# How To Do It Safely

Okay. In the introduction I did mention that there was a better way of doing
all this. One that does not require us to deal with the unsafe details first hand.
But didn't I say that functionality was never stabilized and removed? Not quite,
it just got subsumed somewhere else. So the way to do the in-place transformation
of a vector in today's Rust (1.71 at the time of writing) is:

```rust
v.into_iter().map(f).collect()
```

Don't take my word for it, [try it on godbolt](https://rust.godbolt.org/z/KEGrT1Tjb).
And yes, I know: you're not getting the 15 minutes of your life back (unless you
scrolled ahead in which case shame on you). 

The iterator implementations are smart enough below the hood to specialize 
implementations in case the types `T` and `U` have the same
memory layout and so they will perform the transformation without reallocating.
This fact is not explicitly guaranteed or documented but I was pretty mind
blown [when I learned this](https://users.rust-lang.org/t/current-meta-converting-vec-u-vec-t-where/86603).
This is truly a zero cost abstraction if I ever saw one.

# Endnotes

[^mutref]: As a matter of fact, even if `r2` had merely been an immutable reference, this code would have been rejected by the compiler.
[^safeapi]: It will turn out that there is, in fact, a high-level API to achieve this. It'll even turn out that the API itself is pretty obvious but the fact that it does the transformation in place is not.
[^unsafe-powers]: There's a couple more things that `unsafe` lets us do, the Rust Book lovingly calls them _unsafe  superpowers_.
[^ub-unsafe]: To be clear, we can still introduce all kinds of UB ourselves by not being careful.
[^no-way-arc-mutex]: Of course there are safe wrappers, like `Arc<Mutex<T>>` that serve a conceptually similar, but very different use case. If we want to manipulate data on a low level, pointers are what we want.
[^safe-rust]: I also see this as an advantage because it means I can trust that someone else's code is free of many classes of bugs. That's great.
[^unsafe-constructs]: Yes, I am referring to pointers as unsafe constructs. Yes, I know that you can _create_ them in safe code but you can't _use_ them so for all intents and purposes they are a language construct in unsafe land.
[^it-wasnt]: It was not. I'll link the full story further below.
[^cast-mutability]: As pointed out by Rust forum member `H2CO3` [here](https://users.rust-lang.org/t/is-my-highly-unsafe-code-correct-in-place-mapping-a-vector/96078/9).
[^drop-leak]: As pointed out by forum members `H2CO3` and `kpreid` independently [here](https://users.rust-lang.org/t/is-my-highly-unsafe-code-correct-in-place-mapping-a-vector/96078/5).
[^drop-T]: If you are wondering who drops the value pointed to by `pt`: Since we assigned that value to `t` by memcopying it, its `Drop` logic will be executed when `t` is dropped.
[^memleak]: If nobody catches the panic and the program terminates, an operating system (if present) will take care of freeing the allocated storage, but it won't call the destructors. The destructors might perform important logic like communicating with external processes or hardware.
[^forum-drop]: All of this was pointed out to me by forum user `scottmcm` [here](https://users.rust-lang.org/t/is-my-highly-unsafe-code-correct-in-place-mapping-a-vector/96078/10).
[^drop-slices]: This was pointed out to me by forum users `H2CO3` and `steffahn` [here](https://users.rust-lang.org/t/is-my-highly-unsafe-code-correct-in-place-mapping-a-vector/96078/19)
