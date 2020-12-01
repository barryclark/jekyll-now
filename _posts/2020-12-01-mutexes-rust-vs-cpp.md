---
layout: post
tags: c++17 c++20 rust concurrency
#categories: []
date: 2020-12-01
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Mutexes in Rust and C++: Protecting Data versus Protecting Code'
comments_id: 17
---

I have been using Rust in production for a couple of months now and there is lots about it that I like. One neat thing is that Rust's compile time guarantees make memory and thread safety much harder to mess up from the get go. This allows Rust programmers to confidently use some paradigms that are harder to use correctly in C++. One such example is protecting shared data with mutexes, which works very differently in Rust than in C++. This post is about exploring those fundamental differences.

# Mutexes By Example
Let's take a look at a silly example where we use several threads to increase a counter and display the counter after all threads are finished. This example is taken directly from the section on shared-state concurrency from the [Rust Book](https://doc.rust-lang.org/book/ch16-03-shared-state.html).

## Implementation in Rust
A code snippet in Rust that performs the multithreaded counting task looks like this:
```rust
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
```
A C++ programmer can understand what is going on in this code, although a couple of things might seem peculiar. The variable we are interested in is `counter`, which is of type `Arc<Mutex<i32>>`. An `Arc` is an atomically reference counted pointer[^thread_safe_arc]. So `Arc<T>` is similar to `std::shared_ptr<T>`, and `i32` is a 32-bit integer type. The main difference is that the value we want to protect is literally inside the mutex. Thus mutex type `Mutex<T>` depends on the type `T` of the value we want to protect. Before we take a deeper dive let's take a look at a C++ implementation for reference.

## Implementation in C++
Implementing the same program in C++ is rather straightforward. The following implementation uses some C++17 features just to make it easier to read [^cpp17_features]:

```c++
int counter = 0;
std::mutex mtx;
std::vector<std::thread> handles;

for(int j=0; j < 10; ++j) {
  handles.push_back(std::thread([&mtx,&counter]() {
    std::scoped_lock lk(mtx);
    counter += 1;
  }));
}

for (auto & handle : handles) {
  handle.join();
}

std::cout << "Result: " << counter;
```
The code looks very similar to the Rust code at first glance. There are two main differences between the codes: the first is how the mutex is used to protect access to the shared data and the second is how the lambda captures access to the shared state.

# Exploring the differences
Let's explore the differences separately as this will reveal some important lessons on how Rust and C++ treat object lifetimes and thread safety.

## Capturing State
In the C++ lambdas we have captured the mutex as well as the counter by reference. This is fine here because the code is structured such that the referred-to objects do not outlive the running threads. However, if we [moved the threads](https://en.cppreference.com/w/cpp/thread/thread/thread) out of the scope of `mtx` and `counter` we could get ourselves in trouble. We would have to make absolutely sure that both objects do not get destroyed before all threads finish.

This is where Rust's compile time enforcement of its safety guarantees shines. Rust would not let us capture a reference to an `i32` counter. It would not even let us capture a `Mutex<i32>` instance by reference, because the thread could outlive the referenced object. It would, however, allow us to *move* the variable into *exactly one* thread, but we want to access it from multiple threads. This is the reason why we have to package the mutex-protected value into an `Arc` pointer structure. This allows us to create copies of the pointer structure and move an individual copy into each thread. We can see that the lifetime enforcement behavior of Rust already prevents us from even being able to shoot ourselves in the foot [^rust_thread]. Thread safety in Rust is baked into the type system.

If we wanted to avoid the lifetime issues in C++, we could store both the mutex and the counter inside their own `std::shared_ptr` instances.

## Protecting Data versus Protecting Code

Rust makes it possible to move a resource into a mutex [^rust_move]. Only if we lock the `Mutex<T>` instance (by calling`lock().unwrap()`) we get a [mutex guarded structure](https://doc.rust-lang.org/std/sync/struct.Mutex.html#method.lock) which we we can treat mostly like the resource itself [^rust_deref]. This is why we can call the add-assignment operator `+=` on it. Once the mutex guarded structure goes out of scope the mutex gets unlocked.

Compare this behavior with the C++ mutex: We are locking the mutex before accessing the counter. However, nothing is forcing us to do that because the mutex and the counter are distinct resources. The mutex thus protects *pieces of code* inside the scope of the `std::scoped_lock` but *it does not protect data*. This makes the C++ mutex harder to use correctly to protect shared state.

# What's Next?
The different paradigms, i.e. protecting pieces of code versus protecting data, are rooted in the differences concerning lifetime and thread-safety guarantees inside the languages. I wonder if it is possible to create an equivalent of the `Arc<Mutex<T>>` structure in C++ which can be used to protect data and can safely be passed to different threads. I'll play with the implementation and write up what I learned in a future post [^boost_sync].


# Endnotes
[^thread_safe_arc]: [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html) stands for Atomically Reference Counted [Pointer]. It is only the reference counting part that is thread-safe. `Arc` does not provide mutually exclusive access to different threads. To this end we have to stick the `Mutex` insite the `Arc`.
[^cpp17_features]: Namely class template argument deducation ([CTAD](https://en.cppreference.com/w/cpp/language/class_template_argument_deduction)) and `std::scoped_lock` instead of `std::lock_guard`.
[^rust_thread]: There is even more neat things that Rust does for us at compile time. For example, it would not allow us to use a different smart-pointer type `Rc<T>` that cannot be safely accessed by multiple threads.
[^rust_move]: Moving a variable is very different in Rust than in C++. The Rust compiler enforces [strict ownership semantics](https://doc.rust-lang.org/beta/rust-by-example/scope/move.html) that prevent programmers from accessing moved-from resources.
[^rust_deref]: The feature that allows this behavior is called [deref coercions](https://doc.rust-lang.org/1.29.2/book/2018-edition/ch15-02-deref.html).
[^boost_sync]: Of course there is already a [boost implementation](https://www.boost.org/doc/libs/1_74_0/doc/html/thread/sds.html) of something like that, which is probably better than what I will come up with. As of the time of writing it is still labelled experimental.
