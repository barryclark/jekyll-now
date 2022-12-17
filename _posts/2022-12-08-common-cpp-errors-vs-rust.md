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
of valid reasons why companies or individuals decide to use C++. What I am trying
to do in this article is to see how Rust stacks up against a handful of 
very common (and severe) bugs that are easy to produce in C++.

I'll use Louis Brandy's (who works at facebook, now Meta) excellent CppCon 2017 Talk [Curiously Recurring C++ Bugs at Facebook](https://youtu.be/lkgszkPnV8g)
as the basis for what constitutes a common and scary bug that is easy to produce
in C++. I am aware that facebook does not represent every C++ use case, but my personal
experience is very compatible with the given list. I'll try to not repeat the talk
too much because it is an excellent talk that I urge you to watch yourself.

In the talk, Louis gives mitigations against many of the bugs, mostly involving
Sanitizers. I won't go into those kind of runtime mitigations here because I want
to explore how Rust stacks up on a more fundamental level.

# Bug \#1: Vector Out of Bounds Access Using `[]`

We all know array or vector access using operator `[]` runs the danger of out of
bounds access. For example, for `std::vector`[^arrays] it does [not perform bounds checking](https://en.cppreference.com/w/cpp/container/vector/operator_at),
so an illegal memory access can occurr unnoticed. The problem is not that this
is possible at all, since a low level language that cares about performance
must offer these kinds of unchecked accesses. The problem is that this is 
the simplest way to access a vector element, deep in every programmers DNA, that is
inherently unsafe.

There is, of course a bounds-checked API for element access using
`std::vector::at`, but few people seem to use it. Rust does the trade-off
differently. On slices, arrays, vectors and such the `[]` operator is bounds-checked
and will panic[^panic] for out of bounds access.
There also is a method [`get_unchecked`](https://doc.rust-lang.org/std/primitive.slice.html#method.get_unchecked)
that allows unchecked access to the elements if you tell the compiler _trust me,
I know what I am doing_ using the `unsafe` keyword. I personally think this is 
the right default to have, since the other way leads to the most common bug 
contained in Louis's presentation.

# Bug \#2: `std::map` Acccess using `[]`

This one is a pretty well known confusing API, because on a map in C++ the operator
`[]` actually means _get me a reference to the element or insert the default value
and then get me a reference to that_. There are cases where this is a useful
API to have. However, it seems that it should be the `[]` operator 
because it violates the [principle of least surprise](https://en.m.wikipedia.org/wiki/Principle_of_least_astonishment).
Louis Brandy has an excellent example of how that becomes a serious problem:

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
means _infinite wait_) in case no such key was already present.
Rust's [BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html#)
exposes a much less surprising API, which makes this kind of error hard to make.

# Bug \#3: References to Temporaries

While the bugs described above might in theory be fixed by an API redesign in
the standard library [^backwards], the next one is inherent in the language. It 
has to do with the lifetime of temporaries. I assume that many of us know about [lifetime](https://en.cppreference.com/w/cpp/language/lifetime)
in the C++ standard and also know that lifetimes of temporaries _may_ be extended
under certain circumstances. However, I personally would be hard-pressed to recount
all of those rules and exceptions to them. Louis gives a very cool motivating
example.

Building on the discussion about maps above, let's write a function that 
gets an element from a map with string pairs or returns a default value that we explicitly
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
get_or_default(people_map,"name","John Doe");
```

There is nothing wrong with that usage. The problem arises only when we try
to optimize the `get_or_default` function implementation. The function always returns
a copy of the value it chooses to return. Being good C++ programmers, we might 
want to get rid of that extra copy-construction and change the return value to a
_constant reference_ to string instead of the by value return that causes the copy.
Let me quote Louis Brandy: "this code is _hopelessly broken_". The problem manifests
not if we return a reference to an element in the map. This is of course fine,
but if the map does not contain the given key, we return a reference to a the
temporary for the default vaule. This is a dangling reference.

There are rules such as [lifetime extension](https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary),
which make it defined behavior to bind a temporary value to a references to `const`.
However, we find also this exception to the rules on cpprefernce:

> a temporary bound to a return value of a function in a `return` statement is not 
> extended: it is destroyed immediately at the end of the `return` expression.
> Such `return` statement always returns a dangling reference. 

Dangling references in C++ are hard, [even in 2022](https://pvs-studio.com/en/blog/posts/cpp/1006/) and
address sanitizer and static analyzers can be used as mitigations to some degree.
Still, it would surely be nice to not have that problem at all. This is where
one of Rust's most well-known features comes in, the [Borrow Checker](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html).
This is such an integral (and well-documented) part of the Rust language that I won't
go into detail here. Suffice it to say that dangling references are a 
_compile time error_ in Rust at the expense of a slightly more complex 
syntax that allows us to annotate lifetimes.

# Bug \#4: Volatile for Atomic

Louis Brandy tells a success story here. Years ago, the `volatile` keyword was 
commonly misused to enforce synchronization across threads. With the advent of 
`std::atomic`, and more generally the addition library and language facilities
for concurrent programming in C++11, us programmers stopped misusing `volatile`. We 
started using the used the newly available language and library facilities, since
they were simple to use and simple to teach.

Let's enjoy this success story, before we get back to the broader topic of 
thread safety in the next section.

# Bug \#5: Is `shared_ptr` Thread Safe?

In a very fun section of this great talk, Louis shows that developers seem 
to forget that a `shared_ptr` does not enforce any synchronization for its 
pointed to element [^shared_ptr], yet the _reference count_ is synchronized
across threads. This distinction apparently confuses people enough that 
bugs are regularly produced by sharing `shared_ptr` instances across threads. 
Rather than blaming the developers, it seems to me that this is a systemic 
issue that should be addressed.

This is where Rusts notion of [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
kicks in. It's a topic too broad to discuss in depth, because a lot of language facilities
work together to create it. It's instructive to look how
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
and share a copy of that shared pointer across different threads (using a method
called `clone` because otherwise Rust would move the value out of our scope). 
All threads including `main`, just print the value of the shared integer. One problem:
this program does not compile. The compiler will complain that `Rc` does not
implement the [`Send`](https://doc.rust-lang.org/nomicon/send-and-sync.html) trait.

The `Send` trait is Rust's way, via the _type system_, to indicate whether it is safe to 
_send_ a value to a different thread. This is important for types that carry 
shared ownership semantics, like [`Rc<T>`](https://doc.rust-lang.org/std/rc/struct.Rc.html).
It turns out that `Rc<T>` is not safe to send across different threads because
the reference counting is not atomic as it would be in `std::shared_ptr<T>`. The 
correct equivalent for an atomically reference counted shared pointer would be 
the Rust type [`Arc`](https://doc.rust-lang.org/std/sync/struct.Arc.html). This
type does implement `Send` and thus using `type SharedPtr = Arc` makes this 
code compile.

Now if we tried to mutate the value from two different threads,
we would find out that we cannot simply do that. We are missing a second
fundamental trait for concurrency, called [`Sync`](https://doc.rust-lang.org/nomicon/send-and-sync.html).
This trait, again via the typesystem, indicates whether a value is safe to access
from multiple threads at the same time. The short story is that we have to 
explicitly use a synchronization mechanism for the data that makes it safe to 
access from different threads, such as a mutex. I won't go into detail here, because
I have written a two part series comparing mutexes in Rust and C++ ([part 1](/blog/2020/mutexes-rust-vs-cpp/),
[part 2](/blog/2020/rust-style-mutex-for-cpp/).

The takeaway here is that Rust does indeed prevent this type of thread-safety problem
(and many more) by making thread safety part of the type system. This even presents
an opportunity for optimization by giving us non-atomically reference counted pointers
that are only safe to use from one thread. We only pay for atomic counting if 
we need it and we cannot forget to use it during a refactor because the compiler
will tell us.

# Bug \#6: A Vexing Parse that Only Pretends To Lock A Mutex

This bug is a really curious one. Did you know that `std::string(foo);` is valid code
and is parsed as `std::string foo;`? Both produce a default constructed instance
of a string named `foo`. This can lead to an interesting problem, when trying
to lock a mutex using the RAII guards in the standard library. Take a look at 
this common example:

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
two instances in the production codebase making exactly that mistake[^lock_warnings].

Evaluating whether this mistake is easy to make in Rust is interesting. Rust's 
[`Mutex`](https://docs.rust-lang.org/std/sync/struct.Mutex.html) work very differently than in C++ because a mutex is a class template[^rust_template]
where the instance of a mutex owns the contained data. When we lock this mutex
we get a pointer like guard that can be dereferenced to access the underlying value.
Once the guard goes out of scope, the mutex is locked again. This data-oriented
approach to mutexes makes it impossible to lock a mutex that protects data, because
we cannot otherwise access the data. I have written about this paradigm in 
[an article](/blog/2020/mutexes-rust-vs-cpp/) and also explored [data-oriented mutexes for C++](/blog/2020/rust-style-mutex-for-cpp/).
Spoiler: there's no way to have data-oriented mutexes in C++ without the risk of running
into trouble with lifetimes of references.

While using mutexes to protect data like above is surely a very common (maybe
the most common) use case, there are valid reasons to use a mutex to protect
sections of code rather than data. We can achieve this in rust with the `Mutex<()>`
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

It turns out that `let _ =` is not actually binding the mutex guard to a named
variable, which means the created temporary is immediately destructed, rather
than at the end of the scope, like a named entity would. In fact, `let _ = expr`
semantically equivalent to `(void)(expr);` in C++ and serves only to e.g. suppress
compiler warnings about unused return values. On the other hand `let _g = expr`
is something like `auto _g = expr` in C++ and binds to a named entity whose destructor
is invoked at the end of the scope in which it is declared.

At the time of writing this code compiles without warnings in Rust 1.65. However, 
the mutex will not be locked inside the scope. I really think the semantic 
difference between `let _ = expr` and `let _g = expr` are a confusing and bad design,
as evidenced e.g. by the discussions [here]() and [here](). There is a [clippy lint]()
[^clippy-lint] that will catch the mistake in the code using mutexes above, but it cannot prevent
general underlying problem for other types of RAII guards. We could, of course,
argue that using `Mutex<()>` is an indication of bad design, but that would
be unfair to C++, because then we could always say producing bugs is bad design.
If `Mutex<()>` exists, people will eventually use it.

# Summary
We looked at six common errors in C++ in the facebook codebase and we saw that Rust enables us to catch
most of the bugs at compile time and also emphasises memory safety in its
API. For one thread safety bug  caused by a syntax quirk in C++, we saw
that Rust's data-oriented mutex design makes the bug much more improbable to write. However,
through a syntax quirk of its own, Rust leaves the door open to produce the
same bug as in C++, where it looks like we are locking a mutex but aren't.

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
[^lock_warnings]: The problem here is that warnings for unused locals will probably not help because
all we need that lock to do is invoke its destructor once it goes out of scope.
In the talk he gives a mitigation using special compiler warnings
that might or might not be available on the particular compiler you are using.
[^rust_template]: "Templates" in Rust are not called templates and also work rather 
differently than templates in C++. But in very broad strokes, Rust _generics_
are somewhat like C++ templates.
[^clippy_lint]: Clippy is the static analyzer that ships with the rust toolchain
Rust and many projects use it to run extra analyses on their code. However,
the compiler does not complain and so I feel it would be unfair to C++
to disregard that problem in the Rust language.
