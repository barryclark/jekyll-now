---
layout: post
tags: rust errors c++ bugs safety
#categories: []
date: 2023-03-02
last_updated: 
#excerpt: ''
#description:
#permalink:
title: Trait Objects Are A Dirty, Rotten, Low-Down Trick
#
#
# Make sure this image is correct !!!
og_image: 
#
#
# Make sure comments are enabled !!!	
comments_id: 
---

No, this post does not contain any spicy takes but we will have a look at one
particular aspect of how Rusts trait objects work behind the scenes. Sometimes it's nice to be reminded that
all the nice things we have are just sugar on top of ones and zeroes in the imagination
of some sand that we tricked into thinking.

# Inspiration and Motivation

This post was inspired by the [similarly titled video](https://www.youtube.com/watch?v=HClSfuT2bFA) on
the always entertaining and instructive [Creel](https://www.youtube.com/@WhatsACreel) YouTube channel.
In that video, the author shows how dynamic dispatch with inheritance works in C++ and how we 
can break it in interesting ways. We are going to take a look at how a similar 
thing can be achieved in Rust with trait objects. At
the end of the post we're going to make this piece of code work:

```rust
let mut kitty: Box<dyn Pet> = Box::new(Cat::new("Kitty"));
// ... some dark magic ...
greet_pet(kitty);
```
and generate this output
```
You: Hello Kitty!
Kitty: Woof!
```
which indicates that something is very peculiar is going on 
with our cat, because clearly it should go `"Meow!"` and not `"Woof!"`. The
reason we snuck a `mut` in front of the kitty will become apparent when
we work our black magic. But first let's take a step back.


# Dynamic Polymorphism: Meowing Cats and Barking Dogs

What we saw at work in our listing above is dynamic polymorphism. Wikipedia has 
[the following](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
to say about polymorphism in general:

> In programming language theory and type theory, 
> polymorphism is the provision of a single interface to entities of different types

_Dynamic_ polymorphism is the kind of polymorphism that happens at runtime, in contrast
to e.g. static polymorphism with generics that happens at compile time. There are
different incarnations of dynamic polymorphism, but for this article I am interested
in the kind of dynamic polymorphism in Rust that works with trait objects and pointers to them.
In a more object-oriented language [^oo_lang] like C++ (or Java) the equivalent
is dynamic dispatch through inheritance hierarchies. There we can call
the methods of a derived class via a pointer
(or reference) to its base class. Inheritance is the classic object oriented
way of enabling dynamic polymorphism.

In Rust we don't have inheritance but we have traits and 
[trait objects](https://doc.rust-lang.org/book/ch17-02-trait-objects.html).
Let's look at a silly example that will accompany us through the rest of the post.
We have a `Pet` trait and an implementor `Cat` like so. Feel free
to skim the next part, because it's all just boilerplate and none of it
will surprise you if you've ever implemented a trait.

```rust
trait Pet {
  fn name(&self) -> String;
  fn sound(&self) -> String;
}

struct Cat {
  life : u8, //keeping track of the 9 lives
  age : u8,
  name : String,
}

impl Cat {
  pub fn new(name : impl Into<String>) -> Self {
    Self {
      name: name.into(),
      age : 0,
      life : 0,
    }
  }
}

impl Pet for Cat {
  fn name(&self) -> String {
    &self.name
  }
  fn sound(&self) -> String {
    "Meow!".into()
  }
}
```
We could also implement all kinds of other pet types, like `Dog`, `Bird`, and
so on. But you get the idea. Finally, with this boilerplate out
of the way we can implement a function to greet a `Pet`-trait object like so:

```rust
fn greet_pet(pet : Box<dyn Pet>) {
  println!("You: Hello {}", pet.name());
  println!("{}: {}", pet.name(), pet.sound());
}
```

This way we can pass in the `kitty` instance from above and get a completely
expected output:

```
You: Hello Kitty!
Kitty: Meow!
```

Dynamic polymorphism using trait objects is what makes this code work. If we passed
in a dog instance (assuming we have coded a `Dog` type), we would get an output
such as `Woof!` upon greeting a `Dog` instance. 
The `greet_pet` function calls the correct `sound(...)` member function of
either the cat or the dog or any other type for which we chose to implement
the `Pet` trait.

How does it know which `sound(...)` member function
to call _at runtime_? Because remember, this will even work for a vector of 
random instances of trait objects [^object-safety] implementing the `Pet` trait. So the compiler has no
way to use compile time code generation to call the correct 
method as would be the case when if we had used generics. So what's the magic here?

# A Peek Behind the Curtain: Vtables

A _vtable_, or virtual function table [^vtables-names], is what makes the magic above work.
We'll take a step by step look at what they are and how they help to accomplish
this [^vtable-cpp], bear with me.

## Hidden Vtables

When we implement the `Pet` trait for `Cat`, the
compiler generates a vtable, which is a hidden data structure that it puts into our
program's binary. This is our `Pet`-vtable for `Cat`. There is also going to be a vtable for
every other item that implements the `Pet` trait, meaning a `Pet`-vtable for `Dog`, for 
`Bird` and so on. Before we go any further let me emphasize that we are
entering territory that is dangerous, evolving and not intended to be messed
with. The specifics of how all the things described in this post
are implemented in the rust compiler [^rust-compiler] might change at any point in time.

We'll get to the specific layout of a vtable below, but for now suffice it 
to say that a vtable is a contiguous piece of storage in memory that is (mostly)
an array of function pointers. The `Pet`-vtable for `Cat` contains function pointers to
the implementations of the trait methods for `Cat`, while the `Pet`-vtable for
`Dog` contains pointers to the implementations for `Dog`, and so on. And this 
helps us solve dynamic dispatch at runtime if for every trait object `Box<dyn Pet>` we keep
track which vtable is associated with a particular instance of a trait object. Let's now look 
at how that association is made.

## Hidden Pointers to Vtables

A naive approach would be to store the whole vtable as part of a trait object. But
that would be wasteful for multiple reasons: First of all this approach would add
a number of pointer members to each instance, which will waste precious
memory. Secondly, not every instance of a cat requires
its own vtable. All trait related functions pointers of one type would point to the same functions anyways.
Specifically, for our cat example the function pointer for `sound` will always
point to the code for the `<Cat as Pet>::sound` function. That is true for all instances
of `Cat`. Thus, we only need one vtable _per type_, so it makes sense to create one global instance
of this vtable and refer to it through pointers. Both the Rust compiler and the commonly used
C++ compilers do it like that, but there is a crucial difference in how they
keep track of the _pointer_ to the vtable. In C++, [it is common](https://en.wikipedia.org/wiki/Virtual_method_table)
to make the pointer to the vtable a hidden member of each instance of a class or struct
[^cpp-first-member]. Rust goes a different route and uses so called _fat pointers_ [^why-fat-ptr].

## Fat Pointers

Maybe you've heard of fat pointers in the context of [slices](https://doc.rust-lang.org/book/ch04-03-slices.html),
where a slice is really just a tuple of two elements [^twople]: the first element is 
the pointer to the beginning of the data and the second element is the length of the slice.
But if you're like me you will be (or already were) surprised to
learn that the pointer types `Box<T>`, `&T`, and `&mut T` are different
from from the pointer types `Box<dyn Trait>`, `&dyn Trait`, and `&mut dyn Trait`. While
the former are really just pointers [^just-pointers], the latter are also fat
pointers. They, again, consist of two elements: their first element is the pointer
to the actual data (the `T` instance) and the second is the pointer to the
vtable (the `Trait`-vtable for type `T`).

## (Fat) Pointer and Vtable Memory Layout
We now have all the pieces together to understand how pointers to trait
objects work and how to mess with them. Before we start doing that though, let
me summarize what we saw so far in a figure:

<figure>
 <img src="/blog/images/trait-objects/trait-vtable.svg" alt="Visualization of the FT and DTFT" style="width:100%">
 <figcaption>Figure 1. TODO RUST VTABLE AND REFERENCE LEVIEN</figcaption>
</figure>

TODO 


IMPORTANT LINK
https://rust-lang.github.io/dyn-upcasting-coercion-initiative/design-discussions/vtable-layout.html

*decaying from normal pointers to fait pointers etc

# Endnotes
[^oo_lang]: I mean that C++ is a _more_ object-oriented (OO) language than Rust, not that C++ is a purely an OO language. Further, I don't want to imply that Rust is an OO language _at all_.
[^vtables-names]: Or virtual _method_ tables, but they also go by [many other names](https://en.wikipedia.org/wiki/Virtual_method_table). Pronounced "veeh-table".
[^vtable-cpp]: Vtables are commonly used in C++ compilers for dispatching to the method of a derived class via a pointer to its base class. The `virtual` keyword plays an important role in dynamic dispatch via inheritance in C++, hence the V in vtable. Our animal example in C++ would be calling the `Cat::sound` member function via a pointer to super class `Pet`, where the `Cat` class derives from `Pet`, which has a `virtual` member function `sound()`.  I'll leave it at that for now and I urge anyone interested in the C++ aspects to check out the aforementioned video on the Creel YouTube channel. 
[^object-safety]: Not every trait in Rust can be made into a trait object. The key concept here is [object safety](https://doc.rust-lang.org/reference/items/traits.html#object-safety). In this article, we are only concerned with object safe traits.
[^rust-compiler]: It's also important that vtables aren't really a _language feature_ but an _implementation detail_ of the compiler, as reddit user [u/myrrlyn](https://www.reddit.com/user/myrrlyn/) pointed out [here](https://www.reddit.com/r/rust/comments/11okz75/vtable_layout_documentation/). It might change in future versions of rustc and might be even different in other rust compilers, once they become available. 
[^cpp-first-member]: The vtable pointer in C++ may e.g. be placed at the beginning of an object. This is why you [must not rely](http://www.catb.org/esr/structure-packing/#C-like) on the fact that the address of an object is also the address of its first member in C++.
[^why-fat-ptr]: I'm not going to pretend to understand _why_ Rust chose fat pointers over thin ones, but if you are interested, [here](https://www.reddit.com/r/rust/comments/8ckfdb/were_fat_pointers_a_good_idea/) and [here](https://tratt.net/laurie/blog/2019/a_quick_look_at_trait_objects_in_rust.html) are some insightful discussions on the topic.
[^just-pointers]: It's true, those things really are just pointers, albeit with a hefty amount of compile time enforced rules and guarantees.
[^twople]: A _twople_,... get it? Sorry about that...
