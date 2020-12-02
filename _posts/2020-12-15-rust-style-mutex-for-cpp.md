---
layout: post
tags: c++17 c++20 rust concurrency
#categories: []
date: 2020-12-01
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Rust-style mutexes for C++'
comments_id:
---

In the [previous post](/blog/2020/mutexes-rust-vs-cpp/) on concurrency we have explored the different paradigms for protecting shared data with mutexes in Rust versus C++. Here we will look at emulating a Rust `Arc<Mutex<T>>` type to protect concurrent access to a shared variable of type `T` in C++.

# Goals
We want to emulate the nested Rust type `Arc<Mutex<T>>`. This is an atomically reference counted shared pointer holding a mutex-protected resource of type `T`. It can be used like so:

```rust
let protected_counter : Arc<Mutex<T>> = Arc::new(Mutex::new(10));
{
  let counter = protected_counter.lock().unwrap();
  counter +=1;
}
```
This is the bare essentials with any multi-threading code stripped for clarity. The protected counter can be copied (or *cloned* in Rust lingo) and shared between threads. It exposes a [lock method](https://doc.rust-lang.org/std/sync/struct.Mutex.html) that returns a guardian structure that locks the underlying mutex until it goes out of scope[^unwrap]. This guardian is of type `MutexGuard<T>` and allows us to use it much like the underlying type `T` due to a nifty language feature called [Deref Coercion](https://doc.rust-lang.org/book/ch15-02-deref.html). In essence this allows us to access member fields, functions and operators of `T` when dealing with `MutexGuard<T>`.

The whole construct has the advantage that it is impossible to forget to lock the corresponding mutex before manipulating the data. The mutex really protects data instead of sections of code. This is the behavior we want to emulate.

# First Steps
To emulate the combined behavior of `Arc<Mutex<T>>` we want one C++ type. Let's call it `mutex_protected<T>` and let us call the guardian returned by the lock method `mutex_guarded<T>`. So let's take a look at the interface our `mutex_protected<T>` class could have:


```c++
template<typename T>
class mutex_protected {
private:
  std::shared_ptr<std::mutex> pmutex_;
  std::shared_ptr<T> pvalue_;
public:
  explicit mutex_protected(T &&value);
  mutex_guarded<T> lock();
}
```
The private members of the class are a mutex and a value of type `T` which are both packaged inside shared pointers to make them transferable between threads without having to worry about lifetimes. The constructor takes an r-value reference to a value of type `T` and generates the internal value from it by move-constructing it into the shared pointer. The lock method returns the guardian of interest.

# Endnotes
[^unwrap]: More precisely calling `lock` followed by `unwrap` gives us the mutex guard, but this is not important here. The `unwrap` method has something to do with error handling in Rust and is beside the point here.
