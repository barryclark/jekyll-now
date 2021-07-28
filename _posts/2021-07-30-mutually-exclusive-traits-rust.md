---
layout: post
tags: rust
#categories: []
date: 2021-07-30
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Mutually Exclusive Traits in Rust'
comments_id: 
---

In a recent attempt to write some clever code, I needed to implement mutually exclusive traits and some blanket implementations involving these. I did hit the limits of what the compiler can do for me, but after a lot of trial-and-error, reading, and a cry for help to the Rust community I had something that worked. This is how to get mutually exclusive traits working in Rust today for Future Me &trade; and anyone else who might be interested.

# Groundwork
We'll have to lay some groundwork before we can look at a motivating example. Assume we have a trait `Task` that defines some task that can be executed and a trait `Executor` that can execute these tasks. Tasks describe some side effect that the Executer must perform, such as print something to console, or wake up some PC on LAN. The executor trait is generic on the type of task it can execute. That means an implementor can be an executor to multiple types of tasks. Our traits look like so:
```rust
trait Task {}

trait Executor<T:Task>{
    fn execute(&mut self, task : T);
}
```
You can see how this is could be a much simplified version of an [actor system](https://en.wikipedia.org/wiki/Actor_model) such as [actix](https://actix.rs/). We can implement a simple task for addition and an executor that can handle these tasks like so:
```rust
struct PrintToConsole(String);
impl Task for PrintToConsole {
}

struct Logger;
impl Executor<IntAddTask> for Logger {
    fn execute(&mut self, task : PrintToConsole) {
        println!("{}",task.0);
    }
}
```
Finally, we can instantiate and use our calculation actor as such:
```rust
    let mut logger = Logger{};
    logger.execute(PrintToConsole("Hello".to_string()));
```
Again, this is a toy example but this will lay the groundwork for the discussion to come. [Try it on the Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=6a075bfe1afad3edce2e6737ac5b47e1).

# Motivation
Let's say we want a more complicated logging logic that works differently for logging tasks of two different log levels `Error` and `Info`. Today's goal is: find a way to create logging messages of different priority and execute different code _at compile time_ via blanket implementations of mutually exclusive traits[^silly].

# Implementation
After trying a number of things with limited success, I found [this answer](https://stackoverflow.com/a/57749870) on SO that suggests using associated types as a helper in trying to getting mutually exclusive traits to work. Once const generics become more powerful, we can abandon this crutch. But for now, off we go: first we create a special `LogTask` trait has `Task` as a supertrait and enumerates the priorities as an associated type.

```rust
trait LogTask : Task + Display {
    type Level : LogLevel;
}
trait LogLevel {}
struct Error;
struct Info;
impl LogLevel for Error {}
impl LogLevel for Info {}
```
Before we try to use this new trait let's take a step back and understand why we have to use associated types in the context of mutually exclusive traits.

## A Step Back: Why Associated Types?
Here is a blanket implementation for any kind of logging task that can be made into a number.
```rust
impl<T> Executor<T> for Logger 
where T: Task + Into<i32> {
    fn execute(&mut self, task : T) {
        println!("Logging number {}", task.into());
    }
}
```
This works as expected and allows us to implement the special logging behavior for any kind of taks that can be made into a number. Now let's add a blanket implementation for tasks that can be made into strings:
```rust
impl<T> Executor<T> for Logger 
where T: Task + AsRef<str> {
    fn execute(&mut self, task : T) {
        println!("Logging text '{}'", task.as_ref());
    }
}
```
On their own, both blanket implementations are fine, but together they produce a compile error.
```shell
21 | / impl<T> Executor<T> for Logger 
22 | | where T: Task + Into<i32> {
23 | |     fn execute(&mut self, task : T) {
24 | |         println!("Logging number {}", task.into());
25 | |     }
26 | | }
   | |_- first implementation here
...
29 | / impl<T> Executor<T> for Logger 
30 | | where T: Task + AsRef<str> {
31 | |     fn execute(&mut self, task : T) {
32 | |         println!("Logging text '{}'", task.as_ref());
33 | |     }
34 | | }
   | |_^ conflicting implementation for `Logger`
```
[Try it on the Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=bdaadaa37e88c770c417d5686096ab3a). Now why is that? The reason is that the trait bound `T: Task + Into<i32>` does not mean `T` _only_ implements `Task` and `Into<i32>`, but it means `T` implements _at least_ those traits. This is why this definition will conflict with `T: Task + AsRef<str>`, because there could be a type that implements both `AsRef<str>` _and_ `Into<i32>`. The compiler will complain even if there is no type in your codebase that _does_ implement both those traits, simply because there _could_ be a type that does.

In this example, it may seem somewhat obvious, but there are cases where this is much less clear because a _human reader_ of our code understands that no type will implement two certain traits at the same time.

Adding associated types to a trait solve this problem. It is truly impossible that one and the same type implements both `LogTask<Level=Error>` and `LogTask<Level=Info>`. The compiler won't let you do that.

## A Straightforward Implementation (That Doesn't Work)

TODO asdohifbsdfnasd

## A Workaround
+TODO ASDOHIASODBUASD

# Endnotes
[^silly]: Again, this is a silly example. But it is self-contained and we'll eventually get to sweet, sweet generic programming. So disregard for now that we could add a field `priority` to our logging message and decide what to do at runtime.
