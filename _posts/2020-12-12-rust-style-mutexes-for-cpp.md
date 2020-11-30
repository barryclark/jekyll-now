---
layout: post
tags: c++17 c++20 rust concurrency
#categories: []
date: 2020-12-12
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Mutexes in Rust versus C++'
comments_id:
---

I have been using Rust productively for a couple of months now and there is lots about it that I like and some that I don't. One neat thing is that Rust's compile time guarantees make memory and thread safety much harder to mess up from the get go. This allows Rust users to confidently use some paradigms that are harder to use correctly in C++. One such example are mutexes, which are very different in Rust than in C++. This post is about exploring those fundamental differences.

# Mutexes By Example
Let's take a look at a silly example where we use several threads to increase a counter and display the counter at the end of the program. This example is cribbed directly from the section on shared-state concurrency from the [Rust Book](https://doc.rust-lang.org/book/ch16-03-shared-state.html).

## Implementation in Rust

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter : Arc<Mutex<i32>> = Arc::new(Mutex::new(0));
    let mut handles = vec![]; //create an empty vector

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```
A C++ programmer can easily understand what is going on in this program, although a couple of things might seem peculiar. The variable we are interested in is `counter`, which is of type `Arc<Mutex<i32>>`. An `Arc` is the Rust equivalent to a `std::shared_ptr`, which is a thread-safe[^thread_safe_arc] reference counted pointer. The type `i32` is the 

The neat thing about Rust is that thread-safety is baked into the type system in multiple ways.

## Implementation in C++
[^thread_safe_arc]: [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html) stands for Atomically Reference Counted [Pointer]. It is only the reference counting part that is thread-safe, but more on that later.
