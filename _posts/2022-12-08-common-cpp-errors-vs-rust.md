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
those people that tells any c++ dev to just use rust. There are a ton 
of valid reasons why companies or individuals decide to use C++. What i am trying
to do in this article is to see how Rust stacks up against a handful of 
very common (and severe) bugs that are easy to produce in C++.

I'll use Louis Brandy's excellent CppCon 2017 Talk [Curiously Recurring C++ Bugs at Facebook](https://youtu.be/lkgszkPnV8g)
as the basis for what constitutes a common and scary bug that is easy to produce
in C++. I am aware that facebook does not represent every C++ use case, but my 
experience is very compatible with the given list. I'll try to not repeat the talk
too much --because it is an excellent talk that I urge you to wath yourself-- 
and I'll take some liberties in ordering and enumerating the bugs.

# Bug \#1: Vector Out of Bounds Access Using `[]`

We all know array or vector access using operator `[]` runs the danger of out of
bounds access. On `std::vector`[^arrays] it does [not perform bounds checking](https://en.cppreference.com/w/cpp/container/vector/operator_at),
so an illegal memory access can occurr unnoticed. The problem is not that this
is possible at all, since a low level language that cares about performance
must offer these kinds of unchecked accesses. My problem is that this is 
the simplest way to access a vector element, deep in every programmers DNA, that is
inherently unsafe.

There is, of course a bounds-checked API for element access using
`std::vector::at`, but few people seem to use it. Rust does the trade-off
differently. On slices, arrays, vectors and such the `[]` operator is bounds-checked
and will panic [^panic] for out of bounds access.
There also is a method [`get_unchecked`](https://doc.rust-lang.org/std/primitive.slice.html#method.get_unchecked)
that allows unchecked access to the elements if you tell the compiler _trust me,
I know what I am doing_ using the `unsafe` keyword. I personally think this is 
the right default to have, since the other way leads to the most common bug 
contained in this presentation.

# Bug \#2: `std::map` Acccess using `[]`

This one is a pretty well known confusing API, because on a map in C++ the operator
`[]` actually means _get me a reference to the element or insert the default value
and then get me a reference to that_. There are cases where this is a useful
API to have, but it seems that it should, again, not use the simplest operator 
because it violates the [principle of least surprise](https://en.m.wikipedia.org/wiki/Principle_of_least_astonishment).
Louis Brandy has an excellent example of why that can be a problem:

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
is easy to forget that this operation inserts a timeout of `0` (which in often
means _infinite wait_), if no such key was already present.
Rust's [BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#)
exposes a much less surprising API, which makes this kind of error hard to make.

# Bug \#3: References to Temporaries

While the bugs described above might, in theory, be fixed by an API redesign in
the standard library [^backwards], the next one is inherent in the language. It 
has to do with the lifetime of temporaries. Now I assume that many of us know about [lifetime](https://en.cppreference.com/w/cpp/language/lifetime)
in the C++ standard and also know that lifetimes of temporaries _may_ be extended
under certain circumstances. However, I personally would be hard-pressed to recount
all of those rules and exceptions to them. Louis Brandy gives a very cool motivating
example.

Building on the discussion about maps above, let's write a function that 
gets an element from a map with string values or returns a default value that we explicitly
specify. He presents us with the following function:

```c++
std::string get_or_default(
  const std::map<std::string,std:string> & map,
  const std::string & key,
  const std::string & default_value) {
    auto it = map.find(key);
    return (it != map.end()) ?
            it->second : default_value;
}
```
This function works perfectly fine. It is commonly used like so:

```c++
get_or_default(people_map,key,"John Doe");

```

There is nothing wrong with that usage. The problem arises only when we try
to optimize the `get_or_default` function above, because it always returns
a copy of the value chooses to return. Being good C++ programmers, we now 
want to get rid of that extra copy-construction and change the return value to 
_constant reference_ to string instead of the by value return that implies a copy.
Let me quote Louis Brandy: "this code is _hopelessly broken_". The problem manifests
not if we return a reference to an element in the map, this is of course fine.
But if the map does not contain the given key, we return a reference to a temporarily
created string that is dangling[^string].

I know there are rules such as [lifetime extension](https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary),
which make it defined behavior to bind temporary values to references to const.
However, we find also find this exception to the rules on cpprefernce:

> a temporary bound to a return value of a function in a `return` statement is not 
> extended: it is destroyed immediately at the end of the `return` expression.
> Such `return` statement always returns a dangling reference. 

Dangling references in C++ are hard, [even in 2022](https://pvs-studio.com/en/blog/posts/cpp/1006/).
Address Sanitizer and static analyzers can be used as mitigations to some degree.
However, it would surely be nice to not have that problem at all. This is where
on of Rusts most well-known features comes in, the [Borrow Checker](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html).
This is such an integral (and well-documented) part of the Rust language that I won't
go into detail here. Suffice it to say that dangling references are a 
_compile time error_ in Rust at the expense of a slightly more complicated 
syntax that allows us to annotate reference lifetimes.

# Bug \#4: Volatile for Atomic

Louis Brandy tells a success story here. Years ago, the `volatile` keyword was 
commonly misused to enforce synchronization across threads. With the advent of 
`std::atomic`, and more generally the addition library and language facilities
for concurrent programming in C++11, people stopped misusing volatile. We 
started using the used the newly available language and library facilities, since
they were simple to use and simple to teach.

Let's enjoy this success story, before we get back to the broader topic of 
thread safety in the next section.

# Bug \#5: Is `shared_ptr` Thread Safe?

In a very fun section of this great talk, Louis Brandy shows that devs seem 
to forget that a `shared_ptr` does not enforce any synchronization for it's 
pointed to element[^shared_ptr], while the _reference count_ is synchronized
across threads. This distinction apparently confuses people enough that 
bugs are regularly produced by sharing `shared_ptr` instances across threads. 
Rather than blaming the developers, it seems to me that this is a systemic 
issue that should be addressed by the language.

This is where Rusts notion of [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
kicks in. It's a topic to broad to discuss, because a number of language facilities
work together to create this, but it's instructive to look how
Rust deals with the equivalent problem of shared pointers. Let's look at this
program, where we'll try to use a reference counted shared pointer `Rc<T>`
to share an integer value across threads:

```rust
std::sync::Arc;
use std::rc::Rc;

type SharedPtr<T>= Rc<T>;

fn main() {

    let val = SharedPtr::new(10);

    let shared1 = SharedPtr::clone(&val);
    let handle1 = std::thread::spawn(move || {
        println!("thread1: {}",shared1);
    });

    let shared2 = SharedPtr::clone(&val);
    let handle2 = std::thread::spawn(move || {
        println!("thread2: {}",shared2);
    });

    println!("main: {}", val);
    let _ = handle1.join();
    let _ = handle2.join();
}
```
We have typedef'd `SharedPtr<T>` to the standard library type `Rc<T>`. Then we 
created a new instance via `Rc::new` (think of this somewhat like `std::make_shared`)
and share a copy of that shared pointer to different threads (using a method
called clone because otherwise Rust would move the type out of our scope). 
All threads (including) main, just print the value of the shared integer. One problem:
this program does not compile. The compiler will tell us that `Rc` does not
implement the [`Send`](https://doc.rust-lang.org/nomicon/send-and-sync.html) trait.
This is Rusts way, via the _type system_, to indicate whether it is safe to 
_send_ a value to a different thread. This is important for types that carry 
shared ownership semantics, like [`Rc<T>`](https://doc.rust-lang.org/std/rc/struct.Rc.html).
It turns out that `Rc<T>` is not safe to send across different threads because
the reference counting is not atomic as it would be in `std::shared_ptr<T>`. The 
correct equivalent for an atomically reference counted shared pointer would be 
the Rust type [`Arc`]()


# Endnotes

[^arrays]: This is true for other array like containers in the STL as well as C-style arrays.
[^panic]: A panic is an early, but orderly termination of the program with stack unwinding.
[^backwards]: However, I'd be surprised if they are ever fixed, because of backwards compatibility.
[^shared_ptr]: Part of this confusion surely stems from the fact that the [control
block](https://en.cppreference.com/w/cpp/memory/shared_ptr) of a shared pointer
is synchronized. This implies that the reference count is actually thread-safe, but
this does not mean that the pointed-to instance is safe to access across threads.
It's as safe as sharing a raw pointer would be, i.e. read-only sharing would 
be safe while any form of mutation could incur a data race.
