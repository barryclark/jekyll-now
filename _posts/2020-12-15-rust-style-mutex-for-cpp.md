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

In the [previous post](/blog/2020/mutexes-rust-vs-cpp/) on concurrency we have explored the different paradigms for protecting shared data with mutexes in Rust versus C++. Here we will look at emulating a Rust `Arc<Mutex<T>>` type to protect concurrent access to a shared resource of type `T` in C++.

# Goals
We want to emulate the nested Rust type `Arc<Mutex<T>>`. This is an atomically reference counted shared pointer holding a mutex-protected resource of type `T`. It can be used like so:

```rust
let protected_text : Arc<Mutex<String>> = Arc::new(Mutex::new(String::from("Hello, ")));

{
    let mut text = text.lock().unwrap();
    text.push_str("World");
}
```
This is the bare essentials with any multi-threading code stripped for clarity. The protected counter can be copied (or *cloned* in Rust lingo) and shared between threads. It exposes a [lock method](https://doc.rust-lang.org/std/sync/struct.Mutex.html) that returns a guardian structure that locks the underlying mutex until it goes out of scope[^unwrap]. This guardian is of type `MutexGuard<T>` and allows us to use it much like the underlying type `T` due to a nifty language feature called [Deref Coercion](https://doc.rust-lang.org/book/ch15-02-deref.html). In essence this allows us to access member fields, functions and operators of `T` when dealing with `MutexGuard<T>`.

The whole construct has the advantage that it is impossible to forget to lock the corresponding mutex before manipulating the data. The mutex really protects data instead of sections of code. This is the behavior we want to emulate.

# First Steps
To achieve the combined behavior of `Arc<Mutex<T>>` we'll implement one single C++ type. Let's call it `mutex_protected<T>` and let us call the guardian returned by the lock method `mutex_guarded<T>`. So let's take a look at a possible implementation:

## The mutex-protected Value

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

template<typename T>
mutex_protected<T>::mutex_protected(T &&value)
: pvalue_(new T(std::move(value))),
pmutex_(new std::mutex())
{}

template<typename T>
mutex_protected<T>::mutex_protected(T &&value)
: pvalue_(new T(std::move(value))),
pmutex_(new std::mutex())
{
  return mutex_protected<T>(pvalue_,pmutex_);
}
```
The private members of the class are a mutex and a value of type `T` which are both packaged inside shared pointers. The constructor takes a rvalue reference to a resource an moves it into the shared pointer[^copy_move_constructible]. A new mutex is constructed inside its shared pointer. The reason for having both value and mutex behind a shared pointer is to make them transferable between threads without having to worry about lifetimes. The lock method returns a the guardian that has shared pointers to both the mutex and the value of interest. Let's look at the guardian next.

## The Guardian
Our guardian has to lock the mutex on construction and unlock it on destruction. Also it needs to provide a safe way of handling the value, similar to how Rust allows transparent access to members of the underlying type. Since this is C++ there is no entirely safe way. However, overloading the `->` operator on the guardian type is as close as we can get to the comfort and safety of Rust[^operator_arrow].!!!!!!!!! TODO MAKE FOOTNOTE!!!!!!!!!!! violate one of the principles of concurrent access in A Williams book, to never provide pointer or reference access to shared data


# Endnotes
[^unwrap]: More precisely calling `lock` followed by `unwrap` gives us the mutex guard, but this is not important here. The `unwrap` method has something to do with error handling in Rust and is beside the point here.
[^copy_move_constructible]: For that the type must be either copy constructible or move construcible. Both work, because a const lvalue reference [can bind](https://www.fluentcpp.com/2018/02/06/understanding-lvalues-rvalues-and-their-references/) to an rvalue reference.
[^operator_arrow]:
