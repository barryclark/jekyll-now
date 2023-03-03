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
In that video, the author shows how dynamic dispatch using vtables works in C++ and how we 
can break it in interesting ways. Don't 
worry if you've never heard of vtables, we'll learn about them in this post. At
the end of the post we're going to make this piece of code work:

```rust
let mut kitty: Box<dyn Pet> = Box::new(Cat::new("Kitty"));
// ... some dark magic ...
greet_pet(kitty);
```
and generate this output
```
You: Hello, Kitty!
Kitty: Woof!
```
which indicates that something is very peculiar is going on 
with our cat, because clearly it should go `"Meow!"` and not `"Woof!"`.


# Dynamic Polymorphism: Meowing Cats and Barking Dogs

What we saw at work in our listing above is dynamic polymorphism. Wikipedia has 
[the following](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
to say about polymorphism in general:

> In programming language theory and type theory, 
> polymorphism is the provision of a single interface to entities of different types

_Dynamic_ polymorphism is the kind of polymorphism that happens at runtime, in contrast
to e.g. static polymorphism with generics that happens at compile time. There are
different ways of achieving dynamic polymorphism, but for this article I am interested
in the kind of dynamic polymorphism that works with pointers.

In a more object-oriented language [^oo_lang] like C++ (or Java), arguably the most famous variant of dynamic 
dispatch let's us call the methods of a derived class via a pointer
(or reference) to base. Inheritance in C++ is one classic way of enabling dynamic 
dispatch in C++. In Rust we don't have inheritance but we have traits and 
[trait objects](https://doc.rust-lang.org/book/ch17-02-trait-objects.html).
Let's look at a silly example that will carry us through the rest of the post.
We have a `Pet` trait and implementors `Cat` and `Dog` like so. Feel free
to skim the next part, because it's all just boilerplate and none of that
will surprise you if you've ever implemented a trait.

```rust
trait Pet {
  fn name(&self) -> String;
  fn make_sound(&self) -> String;
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
  fn make_sound(&self) -> String {
    "Meow!".into()
  }
}

struct Dog {
  name : String,
  age : u8,
}

impl Dog {
  pub fn new(name : impl Into<String>) -> Self {
    Self {
      name: name.into(),
      age : 0,
    }
  }
}

impl Pet for Dog {
  fn name(&self) -> String {
    &self.name
  }
  fn make_sound(&self) -> String {
    "Woof!".into()
  }
}
```
Okay with this boilerplate out of the way we can 

# !!Bullet Points!!
- cpp stores vtable pointer in instance, that means taking another
pointer or ref to instance will point to changed pointer if vtable pointer was
changed
- 

For a very generic motivating example let's look at an `Animal` trait with two
actual animals `Cat` and `Dog` implementing it

# Endnotes
[^oo_lang]: I mean that C++ is a _more_ object-oriented (OO) language than Rust, not that C++ is a purely an OO language.
