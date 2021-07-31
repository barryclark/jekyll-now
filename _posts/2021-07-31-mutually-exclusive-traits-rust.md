---
layout: post
tags: rust
#categories: []
date: 2021-07-31
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Mutually Exclusive Traits in Rust'
comments_id: 27
---

In a recent attempt to write some clever code, I set out to implement mutually exclusive traits and some blanket implementations involving these. In doing so, I hit the limits of what the compiler can do for me, but after a lot of trial-and-error, researching, and flashing the bat signal to the Rust community I had something that worked. This is how to get mutually exclusive traits working in current Rust for Future Me&trade; and anyone else who might be interested.

# Groundwork
We'll have to lay some groundwork before we can look at a motivating example. Assume we have a trait `Task` that defines an abstraction for a task. Tasks can be handled by implementors of the trait `Executor`. Tasks describe some side effect that the handler must perform, such as printing something to console, or sending a network packet to someone. The executor trait is generic on the type of task it can handle. That means an implementor can be an executor to multiple types of tasks. Our traits look like so:
```rust
trait Task {}

trait Executor<T:Task>{
    fn handle (&mut self, task : T);
}
```
This example is very simple and a bit contrived, but we can see how this relates e.g. to an [actor system](https://en.wikipedia.org/wiki/Actor_model) such as [actix](https://actix.rs/). We'll use the traits to implement a simple logger like so:
```rust
struct PrintToConsole(String);
impl Task for PrintToConsole {
}

struct Logger;
impl Executor<PrintToConsole> for Logger {
    fn handle(&mut self, task : PrintToConsole) {
        println!("{}",task.0);
    }
}
```
Finally, we can instantiate and use our logging actor:
```rust
let mut logger = Logger{};
logger.handle(PrintToConsole("Hello".to_string()));
```
Again, this is a toy example but it provides a framework for the discussion to come. [Try it on the Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=3045450fe76bce27e7fa0b6561ca6998).

# Motivation
Let's say we want a more complicated logging logic that works differently for logging tasks of two different log levels (e.g. `Error` and `Info`). Today's goal is: find a way to create logging messages of different levels and generate different handler code _at compile time_ via blanket implementations of mutually exclusive traits[^silly]. Furthermore, we want to do that without touching the code for the `Task` and `Executor` traits because we assume they belong to an external dependency.

# Implementation
After trying a number of things with limited success, I found [this hint](https://stackoverflow.com/a/57749870) on SO that suggests using [associated types](https://doc.rust-lang.org/rust-by-example/generics/assoc_items/types.html) as a way to get mutually exclusive traits to work. This is a crutch that we can probably abandon once const generics become more powerful. But for now, off we go: first we create a special `LogTask` trait. It has `Task` as a supertrait and enumerates the log-level  as an associated type[^log_task_display].

```rust
trait LogTask : Task + Debug {
    type Level : LogLevel;
}
trait LogLevel {}
struct Error;
struct Info;
impl LogLevel for Error {}
impl LogLevel for Info {}
```
Before we play with this new trait, let's take a step back and understand why we have to use associated types in the context of mutually exclusive traits.

## Why Associated Types?
Take a look at the following blanket implementation for any kind of logging task that can be converted into an `i32` number:
```rust
impl<T> Executor<T> for Logger 
where T: Task + Into<i32> {
    fn handle (&mut self, task : T) {
        println!("Logging number {}", task.into());
    }
}
```
This works as expected and allows us to implement the special logging behavior for any kind of taks that can be converted into a number. Now let's add a blanket implementation for tasks that can be made into strings:
```rust
impl<T> Executor<T> for Logger 
where T: Task + AsRef<str> {
    fn handle (&mut self, task : T) {
        println!("Logging text '{}'", task.as_ref());
    }
}
```
On their own, both blanket implementations are fine, but together they produce a compile error.
```shell
| / impl<T> Executor<T> for Logger 
| | where T: Task + Into<i32> {
| |     fn handle(&mut self, task : T) {
| |         println!("Logging number {}", task.into());
| |     }
| | }
| |_- first implementation here
...
| / impl<T> Executor<T> for Logger 
| | where T: Task + AsRef<str> {
| |     fn handle(&mut self, task : T) {
| |         println!("Logging text '{}'", task.as_ref());
| |     }
| | }
| |_^ conflicting implementation for `Logger`
```
[Try it on the Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=dd1965399116f43381b0de420307ef44). Now why is that? The reason is that the trait bound `T: Task + Into<i32>` does not mean `T` _only_ implements `Task` and `Into<i32>`, but it means `T` implements _at least_ those traits. This is why this definition will conflict with `T: Task + AsRef<str>`, because there could be a type that implements both `AsRef<str>` _and_ `Into<i32>`. The compiler will complain even if there is no type in your codebase that _does_ implement both those traits, simply because there *could be* a type that does.

In this example, it may seem somewhat obvious, but there are cases where this is much less clear because a _human reader_ of our code understands that no type will implement two certain traits at the same time. However, human semantics don't matter to the compiler.

Adding associated types to a trait solves this problem. It is truly impossible that any one type implements both `LogTask<Level=Error>` and `LogTask<Level=Info>`. The compiler won't let us do that.

## An Implementation and a Bug
First, we implement two types of logging tasks corresponding to the different log levels. 
```rust
#[derive(Debug)]
pub struct ErrorMessage(String);

impl Task for ErrorMessage{}
impl LogTask for ErrorMessage {
    type Level = Error;
}

#[derive(Debug)]
pub struct InfoMessage(String);

impl Task for InfoMessage {}
impl LogTask for InfoMessage {
    type Level = Info;
}
```
And now let's get the mutually exclusive blanket implementations going. After understanding why we need associated types, the next implementation is straightforward:
```rust
impl<E> Executor<E> for Logger 
where E: LogTask<Level = Error> {
    fn handle(&mut self, task :E) {
        println!("Error: {:?}", task);
    }
}

impl<I> Executor<I> for Logger 
where I: LogTask<Level = Info> {
    fn handle(&mut self, task :I) {
        println!("Info: {:?}", task);
    }
}
```
We have already established that no type could implement both `LogTask<Level=Info>` *and* `LogTask<Level=Error>`, so this should do the trick, right?
```shell
| / impl<E> Executor<E> for Logger 
| | where E: LogTask<Level = Error> {
| |     fn handle(&mut self, task :E) {
| |         println!("Error: {:?}", task);
| |     }
| | }
| |_- first implementation here
| 
| / impl<I> Executor<I> for Logger 
| | where I: LogTask<Level = Info> {
| |     fn handle(&mut self, task :I) {
| |         println!("Info: {:?}", task);
| |     }
| | }
| |_^ conflicting implementation for `Logger`
```
Again, [we have upset the compiler](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=8ccbd4fbf6560b00d32483827baac176). After [asking on the forum](https://users.rust-lang.org/t/implementing-mutually-exclusive-traits-and-trait-bounds/62291/6), I learned that this is a long standing [compiler bug](https://github.com/rust-lang/rust/issues/20400). Forum user [RustyYato](https://users.rust-lang.org/u/RustyYato) suggested a solution to this problem, so full credit goes to this helpful and friendly human.

## Getting Mutually Exclusive Traits to Work
To help the compiler, we make use of the fact that two instances of a generic trait are different traits. We do that intuitively all the time, e.g. when implementing both `From<i32>` and `From<f32>` on the same item. Those are different traits[^rabbithole].

What we do is implement a wrapper trait for our `Executor` that is generic on the log level.
```rust
trait LogExecutor<T:LogTask,L = <T as LogTask>::Level> {
    fn log_handle(&mut self, task : T);
}
```
This new trait mirrors the functionality of the logging trait, i.e. it re-exports the same interface. This allows us to blanket implement the `Executor` functionality by using the wrapper trait like so:
```rust
impl<T> Executor<T> for Logger 
where   T : LogTask,
        Self : LogExecutor<T> {
        fn handle(&mut self, task : T) {
            self.log_handle(task);
        }
}
```
Now we can convince the compiler to accept the exclusive `LogTask` trait like so:
```rust
impl<T> LogExecutor<T,Error> for Logger 
where T: LogTask<Level=Error> {
    fn log_handle(&mut self, task : T ) {
        println!("Error: {:?}", task);
    }
}

impl<T> LogExecutor<T,Info> for Logger 
where T: LogTask<Level=Info> {
    fn log_handle(&mut self, task : T ) {
        println!("Info: {:?}", task);
    }
}
```
We can use now send log messages with different levels to the `Logger` instance by using the general `Executor` interface like so
```rust
logger.handle(ErrorMessage("this is bad".to_string()));
logger.handle(InfoMessage("fyi".to_string()));
```
[Try it on the Playround](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=501ceb37db04476813dd7499503f4d91) and be sure to check out RustyYato's [original answer](https://users.rust-lang.org/t/implementing-mutually-exclusive-traits-and-trait-bounds/62291/5).

# Conclusion
Getting mutually exclusive traits and blanket implementations working in Rust was a fun journey. We have to combine that fact that generic traits of different types are different traits *as well as* the fact that associated types can be used as mutually exclusive restrictions in trait bounds. Neither alone will do yet, but we can combine these facts to achieve the effect of mutually exclusive traits.

# Endnotes
[^silly]: Again, this is a silly example. But it is self-contained and we'll eventually get to sweet, sweet generic programming. So disregard for now that we could just add another field to our logging message and decide what to do at runtime.

[^log_task_display]: For an actual use case we would require `Display` rather than `Debug` as a supertrait of a log message. For this example, using `Debug` is easier because we can derive it without additional dependencies.

[^rabbithole]: If you are anything like me, you'll think: *well then let's exploit that fact to get mutually exclusive traits working*! Why can't we replace the associated type on the `LogTask` trait and make the trait generic? I'll quickly sketch why this fails: Assume that instead of using associated types we make the `LogTask` generic on the log level, i.e. `trait LogTask<L:LogLevel>{}`. Then we implement `LogTask<Error>` for `ErrorMessage` and `LogTask<Info>` for `InfoMessage`. When we create the blanket implementations, the compiler will get upset. This is due to the same reason as before, but it is much less obvious here. The reason is that there is nothing preventing a message type from implementing both `LogLevel<Error>` *and* `LogLevel<Info>`, even though we would never actually do that.