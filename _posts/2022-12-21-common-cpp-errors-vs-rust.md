---
layout: post
tags: rust errors c++ bugs safety
#categories: []
date: 2022-12-21
last_updated:
#excerpt: ''
#description:
#permalink:
title: Rust vs Common C++ Bugs
#
#
# Make sure this image is correct !!!
og_image: rust-vs-cpp-bugs.png 
#
#
# Make sure comments are enabled !!!	
comments_id: 41
---

I used to like C++. I still do, but I used to, too. Joking aside, I am not one
to tell any C++ programmer to just use Rust. There are a ton 
of valid reasons why companies or individuals decide to use C++ and I don't 
wish to deter anyone from doing so. What I am trying
to do in this article is to see how Rust stacks up against a handful of 
very common (and severe) bugs that are easy to produce in C++. I tried to make 
this article worthwile for both Rust and C++ programmers.

I'll use Louis Brandy's excellent CppCon 2017 talk [Curiously Recurring C++ Bugs at Facebook](https://youtu.be/lkgszkPnV8g)
as the basis for what constitutes a common and scary bug easily produced in C++.
Louis draws his experience from working on the C++ codebase at 
facebook (now Meta). I am aware that facebook does not represent every C++ use case, but my personal
experience is very much compatible with the given list. I'll try to not repeat the talk
too much because it is an excellent presentation that I urge you to watch yourself.
In the talk, Louis gives mitigations against many of the bugs, mostly involving
Sanitizers. I won't go into those kind of mitigations here because I want
to explore how Rust stacks up on a more fundamental level.

# Bug \#1: Vector Out of Bounds Access Using `[]`

We probably all know how array or vector access using operator `[]` can cause out of
bounds access in C++. For example, for `std::vector` it does [not perform bounds checking](https://en.cppreference.com/w/cpp/container/vector/operator_at),
so an illegal memory access can occurr unnoticed[^arrays]. The problem is not that this
is possible at all, since a systems language that cares about performance
_must_ offer these kinds of unchecked accesses. The problem is that 
this most fundamental way to access a vector element, deep in every programmers DNA, is
inherently unsafe.

There is, of course a bounds-checked API for element access using
`std::vector::at`, but few people seem to use it. Rust does the trade-off
differently. On slices, arrays, vectors and the like operator `[]` is bounds-checked
and will panic[^panic] for out of bounds access.
There is a method [`get_unchecked`](https://doc.rust-lang.org/std/primitive.slice.html#method.get_unchecked)
that allows unchecked access to the elements if you tell the compiler _trust me,
I know what I am doing_ using the `unsafe` keyword. I personally think this is 
the right default to have, since the other way leads to the number one bug
contained in Louis' presentation.

# Bug \#2: `std::map` Acccess using `[]`

This one is a pretty well known confusing API: on a `std::map` in C++ the operator
`[]` actually means _get me a reference to the element or insert the default value
and then get me a reference to that_. There are cases where this is a useful
API to have. Imbuing the operator `[]` with that behavior seems problematic 
because it violates the [principle of least surprise](https://en.m.wikipedia.org/wiki/Principle_of_least_astonishment).
Louis Brandy has an excellent example of how that becomes a serious problem.
Take a look at this constructor for a `Widget` class that performs some logging:

```c++
Widget::Widget(
  const std::map<std::string, int>& settings) :
    m_settings(settings) {
      std::cout << "Widget initialized..."
                << "timeout is:"
                << m_settings["timeout"]
                << "\n";
}
```

Here the programmer's mindset is _let me just log the timeout real quick_, but it 
is easy to forget that this operation inserts a timeout of `0` (which in often
means infinite wait) if no such key was already present.
Rust's [BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#)
exposes a much less surprising API, which makes this kind of error arguably 
impossible to make[^mutability].

Let's have a quick look at the API for accessing entries in Rust's `BTreeMap`.
We can use the [`[]` operator](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#impl-Index%3C%26Q%3E-for-BTreeMap%3CK%2C%20V%2C%20A%3E)
for accessing an (immutable) reference to an element in the map via its key. This operator
panics if the key is not present in the map. That might seem peculiar at first, 
but is consistent with how a vector or array behaves when using the `[]` operator,
where it means bounds-checked access to the element or panic.
We can also use the [`get`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#method.get)
or [`get_mut`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#method.get_mut)
methods for immutable or mutable access respectively if we are not sure the key
exists in the map. Rather than throw an exception they return an optional reference
to the element if it exists. Optional references are safe in Rust. 

But is there a way to have the behavior of `operator[]` as in C++ in a clearer 
manner? Turns out there is, using the [`entry`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#method.entry)
method. Say we have a `BTreeMap` named `map`: then we can write
`map.entry(key).or_default()` to get the equivalent
behavior to C++'s `map[key]`. The expression returns a mutable reference that can be manipulated,
just as the C++ operator would. I would argue that this is a much cleaner API.

# Bug \#3: References to Temporaries

While the bugs described above might theoretically be fixed by an API redesign in
the standard library[^backwards], the next one is inherent in the language. It 
has to do with the lifetime of temporaries. I assume that many of us know about [lifetime](https://en.cppreference.com/w/cpp/language/lifetime)
in C++ and also know that lifetimes of temporaries _may_ be extended
under certain circumstances. However, I personally would be hard-pressed to recount
all of those rules and exceptions to them. Louis gives a very cool motivating
example.

Building on the discussion about maps above, let's write a function that 
gets an element from a map or returns a given default value.
He presents us with the following function:

```c++
std::string get_or_default(
  const std::map<std::string,std:string>& map,
  const std::string& key,
  const std::string& default_value) {
    auto it = map.find(key);
    return (it != map.end()) ?
            it->second : default_value;
}
```
This function works perfectly fine and it is commonly used like so:

```c++
get_or_default(people_map,"name","John Doe");
```

The important thing here is that giving the character literal `"John Doe"`
as the default parameter implies the construction of a temporary string.
There is nothing wrong with that. The problem arises only when we try
to optimize the `get_or_default` function implementation. The function always returns
a copy of the value it chooses to return. Being good C++ programmers, we might 
want to get rid of that extra copy-construction and change the return value to a
_constant reference_ to string instead of the by-value return that causes the copy.
Let me quote Louis Brandy: "this code \[would be\] _hopelessly broken_". The 
problem does not manifest if we return a reference to an element inside the map.
This is of course fine, but if the map does not contain the given key, we return a reference to the
temporary. This is a dangling reference and thus undefined behavior.

As mentioned above, there are rules for [lifetime extension](https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary),
which make it defined behavior to bind a temporary value to a reference to `const`.
However, we find this exception to the rules:

> a temporary bound to a return value of a function in a `return` statement is not 
> extended: it is destroyed immediately at the end of the `return` expression.
> Such `return` statement always returns a dangling reference. 

References to temporaries in C++ are hard, [even in 2022](https://pvs-studio.com/en/blog/posts/cpp/1006/) and
address sanitizer and static analyzers can be used as mitigations to some degree.
Still, it would surely be nice not to have that problem at all. This is where
one of Rust's most well-known features comes in: the [Borrow Checker](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html).
This is such an integral and well-documented part of the Rust language
that I'll keep the example brief. We can write the `get_or_default` function in Rust like so:

```rust
fn get_or_default<'a,'b,'c>(
  map : &'a BTreeMap<String,String>,
  key : &String,
  default_val : &'b String) -> &'c String 
where 'a : 'c,
      'b : 'c {
    match map.get(key) {
        Some(val) => val,
        None => default_val,
    }
}
```
This is not idiomatic Rust since there are much cleaner ways to achieve this 
logic by using the `BTreeMap` API, but it's a straightforward translation of the 
C++ code.

The interesting thing is that the `get_or_default` function takes references to _all_
of it's parameters (even the default value) and returns a reference, which will
point to either the default value or the entry in the map. Those weird `'a`,
`'b`, and `'c` parameters that look like generics are actually named lifetimes
that are enforced _completely at compile time_ to check that references can never
be dangling. What we have told the compiler here is that the map has a lifetime of `'a`.
References to the elements inside the map will also have this lifetime. For the `key`
we don't have to specify an explicit lifetime, because the
lifetime of the reference returned from the function is completely independent from it.
The compiler can take care of that on its own. The lifetime
of the default value is `'b` and finally the lifetime of the returned reference is 
`'c`. The real magic happens in the `where` clause, where we indicate the relationship
between the lifetimes. We tell the compiler that the lifetime `'a` and `'b` must 
be _at least_ as long as `'c`. Thus, at the callsite, the compiler will check that the 
returned reference is only used as long as the map and the default value are still 
alive. Again, this is enforced at compile time without any runtime overhead. 
For any program that compiles, we can be sure that the `get_or_default` function
never returns a dangling reference. 

If that syntax seems weird and complicated to you, don't panic because there 
is such a thing as [lifetime elision](https://doc.rust-lang.org/reference/lifetime-elision.html)
which makes those explicit lifetime annotations unneccessary in many common 
usecases. Still, sometimes we have to help the compiler by annotating the lifetimes
which is the price we have to pay in Rust (at compile time) for the absence of 
dangling references[^unsafe].

# Bug \#4: Volatile for Atomic

Louis Brandy tells a success story here. Years ago, the `volatile` keyword was 
commonly misused to enforce synchronization across threads. With the advent of 
`std::atomic`, and more generally the addition of library and language facilities
for concurrent programming in C++11, programmers stopped misusing `volatile`. We 
started using the newly available language and library facilities, since
they were simple to use and simple to teach.

Let's enjoy this success story, before we get back to the broader topic of 
thread safety in the next section. Harking back to the first two sections,
this success story shows that good API design does go a long way in preventing bugs.

# Bug \#5: Is `shared_ptr` Thread Safe?

In a very fun section of this great talk, Louis shows that developers seem 
to forget that a `shared_ptr` does not enforce any synchronization for its 
pointed to element, yet the _reference count_ is synchronized
across threads[^shared_ptr]. This distinction seems to be sufficiently confusing
so that bugs are regularly produced by sharing `shared_ptr` instances across threads. 
Rather than blaming the developers, it seems to me that this is a systemic 
issue that should be addressed.

This is where Rusts notion of [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
kicks in. It's a topic too broad to discuss in depth, because a lot of language facilities
work together to create it. It's instructive to look how
Rust deals with the equivalent problem of shared pointers. Let's look at this
program, where we'll try to use a reference counted shared pointer `Rc<T>`
to share an integer value across threads:

```rust
use std::sync::Arc;
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
and share a copy of that shared pointer across different threads (using a method
called `clone` because otherwise Rust would move the value out of our scope). 
All threads including `main` just print the value of the shared integer. One problem:
this program does not compile. The compiler will complain that `Rc` does not
implement the [`Send`](https://doc.rust-lang.org/nomicon/send-and-sync.html) trait.

The `Send` trait is Rust's way, via the _type system_, to indicate whether it is safe to 
_send_ a value to a different thread. This is important for types that carry 
shared ownership semantics, like [`Rc<T>`](https://doc.rust-lang.org/std/rc/struct.Rc.html).
It turns out that `Rc<T>` is not safe to send across different threads because
the reference counting is not atomic as it would be in `std::shared_ptr<T>`. The 
correct equivalent for an atomically reference counted shared pointer would be 
the Rust type [`Arc`](https://doc.rust-lang.org/std/sync/struct.Arc.html). This
type does indeed implement `Send` and thus using `type SharedPtr = Arc` makes this 
code compile.

If we now tried to mutate the value from two different threads,
we would find out that we cannot simply do that. We'll eventually hit an error 
telling us we need a second fundamental trait for concurrency, called [`Sync`](https://doc.rust-lang.org/nomicon/send-and-sync.html).
This trait, again via the typesystem, indicates whether a value is safe to access
from multiple threads at the same time. The short story is that we have to 
explicitly use a synchronization mechanism for the data that makes it safe to 
access from different threads, such as a mutex. I won't go into detail here, because
I have written a two part series comparing mutexes in Rust and C++ ([part 1](/blog/2020/mutexes-rust-vs-cpp/),
[part 2](/blog/2020/rust-style-mutex-for-cpp/)).

The takeaway here is that Rust does indeed prevent this type of thread-safety problem
(and many more) by making thread safety part of the type system. So thread-safety
is checked at compile time. This even presents
an opportunity for optimization by giving us non-atomically reference counted pointers
that are only safe to use from one thread. We only pay for atomic counting if 
we need it and we cannot forget to use it during a refactor because the compiler
will tell us.

However, it's only fair to note that the thread-safety guarantees aren't all sunshine and
rainbows in Rust and truly getting into the specifics of what thread-safety guarantees
Rust actually gives is [complicated](https://github.com/rust-lang/rust/issues/26215).
The term is just  so loosely defined. For one, Rust does prevent data races
and on the other hand you can still deadlock all you want. Also, at the time of writing,
Rust does not have a defined [memory model](https://doc.rust-lang.org/reference/memory-model.html), 
[unlike C++](https://en.cppreference.com/w/cpp/language/memory_model).

# Bug \#6: A Vexing Parse that Only Pretends To Lock A Mutex

This bug is a really curious one. Did you know that `std::string(foo);` is valid C++
and is parsed as `std::string foo;`? Both produce a default constructed instance
of a string named `foo`. This can lead to an interesting problem, when trying
to lock a mutex using the RAII guards in the standard library. Take a look at 
this deceptive example:

```c++
void Widget::update_state() {
  std::unique_lock<std::mutex>(m_mutex);
  do_some_update(m_state);
}
```

The first line of the function does not actually lock the mutex `m_mutex`, but
instead defines a default constructed instance of a `std::unique_lock` called
`m_mutex`. A correction would just require two more characters like so:
`std::unique_lock<std::mutex> g(m_mutex)`. The difference is not easy to spot.
Louis shows that despite a running linter, he found 
two instances that made it into the production codebase with exactly that mistake[^lock_warnings].

Evaluating whether this mistake is easy to make in Rust is interesting. Rust's 
[`Mutex`](https://docs.rust-lang.org/std/sync/struct.Mutex.html) works very 
differently than in C++. In Rust a mutex is a class template[^rust_template]
where the instance of a mutex is the sole owner of the contained data. When we lock this mutex
we get a pointer-like guard that can be dereferenced to access the underlying value.
Once the guard goes out of scope, the mutex is locked again. This data-oriented
approach to mutexes makes it impossible to forget to lock a mutex that protects data, because
we cannot otherwise access the data. I have written about this paradigm in 
[an article](/blog/2020/mutexes-rust-vs-cpp/) and also explored [data-oriented mutexes for C++](/blog/2020/rust-style-mutex-for-cpp/).
Spoiler: there's no way to have data-oriented mutexes in C++ without the risk of running
into trouble with lifetimes.

While using mutexes to protect data as described above is surely a very common (maybe
_the_ most common) use case, there are valid reasons to use a mutex to protect
sections of code rather than data. We can achieve this in Rust with the `Mutex<()>`
specialization, where `()` in Rust is (in this case) equivalent to `void`. To 
lock this mutex we can just call 

```rust
{
  let _ = my_mutex.lock();
  // ... code in section
}
```
...and _that_ would produce the same problem as the C++ code above! Question to 
Rust developers: did you spot the problem?

It turns out that `let _ =...` is not actually binding the mutex guard to a named
variable. This means the created temporary is immediately destructed, rather
than at the end of the scope, unlike a named entity. In fact, `let _ = expr`
is semantically equivalent to `(void)(expr)` in C++ and serves to e.g. suppress
compiler warnings about unused return values. On the other hand `let _g = expr`
is somewhat like `auto _g = expr` in C++ and binds to a named entity whose destructor
is invoked at the end of its scope. At the time of writing the code shown above
compiles without warnings in Rust. The mutex will not be locked until 
the end of the scope.

I really think the semantic 
difference between `let _ = expr` and `let _g = expr` is a confusing design choice,
as evidenced e.g. by the discussions [here](https://internals.rust-lang.org/t/confusing-behaviour-of-let/13435)
and [here](https://internals.rust-lang.org/t/pre-rfc-must-bind/12658/25). There is a [clippy lint](https://rust-lang.github.io/rust-clippy/master/#let_underscore_lock)
[^clippy_lint] that will catch the mistake in the code using mutexes above, but it cannot prevent
deeper underlying problem for other types of RAII guards. We could, of course,
argue that using `Mutex<()>` is an indication of bad design, but that would
be unfair to C++. Then we could always say producing bugs is bad design.
If `Mutex<()>` exists, people will eventually use it. Furthermore, the problem with
`let _ = ...` goes beyond just mutexes.

# Summary
We looked at six common errors in C++ in the facebook codebase and we saw that Rust enables us to catch
most of the bugs at compile time and also emphasizes memory safety and simplicity
in its API design. But we also discovered a thread safety bug caused by a syntax quirk in C++ that 
exists in Rust as well, albeit through a completely different syntax quirk. We also
learned that thread safety is a very underspecified aspect of the Rust language
despite some amazing compile time guarantees.

I don't want to pass judgement on Rust vs C++ as languages in general, but it is nice
to see that a language which is often taunted as a safe successor to C++ does indeed
help to prevent many of the bugs common in C++. And yet we saw that Rust is not without
its flaws.

# Endnotes

[^arrays]: This is true for other array like containers in the STL as well as C-style arrays.
[^panic]: A panic is an early, but orderly termination of the program with stack unwinding.
[^backwards]: However, I'd be surprised if they are ever fixed, because of backwards compatibility.
[^shared_ptr]: Part of this confusion surely stems from the fact that the [control block](https://en.cppreference.com/w/cpp/memory/shared_ptr) of a shared pointer is synchronized. This implies that the reference count is actually thread-safe, but this does not mean that the pointed-to instance is safe to access across threads. It's as safe as sharing a raw pointer would be, i.e. read-only sharing would be safe while any form of mutation could incur a data race.
[^rust_template]: "Templates" in Rust are not called templates and also work rather differently than templates in C++. But in very broad strokes, Rust _generics_ are somewhat like C++ templates.
[^clippy_lint]: Clippy is the static analyzer that ships with the rust toolchain Rust and many projects use it to run extra analyses on their code. However, the compiler does not complain and so I feel it would be unfair to C++ to disregard that problem in the Rust language.
[^mutability]: Half of the reason this operation is so problematic in C++ is that it does not work with `const`-correctness in an intuitive way. It will not work on a `const` map, but Louis shows that this does not deter programmers from using the operator. We just get rid of the `const`.
[^unsafe]: There is such a thing as [`unsafe` Rust](https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html) which can cause all kinds of UB, including dangling references. Unsafe Rust is _not_ disabling the Borrow Checker. It can introduce [legitimate safety problems](https://shnatsel.medium.com/auditing-popular-rust-crates-how-a-one-line-unsafe-has-nearly-ruined-everything-fab2d837ebb1), but since it's _opt-in_ we can decide not to use the unsafe subset of Rust and loads of libraries and applications can be _and are_ written without it.
