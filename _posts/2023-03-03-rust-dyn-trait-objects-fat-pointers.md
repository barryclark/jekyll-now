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
different ways of achieving dynamic polymorphism, but for this article I am interested
in the kind of dynamic polymorphism that works with pointers.
In a more object-oriented language [^oo_lang] like C++ (or Java), arguably the most famous variant of dynamic 
dispatch let's us call the methods of a derived class via a pointer
(or reference) to base. Inheritance in C++ is one classic way of enabling dynamic 
dispatch in C++.

In Rust we don't have inheritance but we have traits and 
[trait objects](https://doc.rust-lang.org/book/ch17-02-trait-objects.html).
Let's look at a silly example that will carry us through the rest of the post.
We have a `Pet` trait and an implementor `Cat` like so. Feel free
to skim the next part, because it's all just boilerplate and none of that
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
so on, but you get the idea. Finally, with this boilerplate out
of the way we can implement a function to greet a `Pet`-trait object of like so:

```rust
fn greet_pet(pet : Box<dyn Pet>) {
  println!("You: Hello {}", pet.name());
  println!("{}: {}", pet.name(), pet.sound());
```

This way we can pass in the `kitty` instance from above and get a completely
expected output:

```
You: Hello Kitty!
Kitty: Meow!
```

Dynamic polymorphism using trait objects is what makes this code work. If we passed
in a dog instance (assuming we have coded a `Dog` type), we would get an output
such as `Woof!` upon greeting a the dog or any other implementor of `Pet`.
The `greet_pet` function calls the correct `sound(...)` member function of
either the cat or the dog.

How does it know which `sound(...)` member function
to call _at runtime_? Because remember, this will even work for a vector of 
random instances of types implementing the `Pet` trait. So the compiler has no
way using compile time code generation for dispatching to the correct 
method calls as would be the case when using generics. So what's the magic here?

## A Peek Behind the Curtain: vtables


# !!Bullet Points!!
- cpp stores vtable pointer in instance, that means taking another
pointer or ref to instance will point to changed pointer if vtable pointer was
changed
- 


# Endnotes
[^oo_lang]: I mean that C++ is a _more_ object-oriented (OO) language than Rust, not that C++ is a purely an OO language.
