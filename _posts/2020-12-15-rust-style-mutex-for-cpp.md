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
comments_id: 18
---

In the [previous post](/blog/2020/mutexes-rust-vs-cpp/) on concurrency we have explored the different paradigms for protecting shared data with mutexes in Rust versus C++. Here we will look at emulating a Rust `Arc<Mutex<T>>` type to protect concurrent access to a shared resource of type `T` in C++.

# Goals
We want to emulate the nested Rust type `Arc<Mutex<T>>`. This is an atomically reference counted shared pointer holding a mutex-protected resource of type `T`. It can be used like so:

```rust
let protected_text : Arc<Mutex<String>>
 = Arc::new(Mutex::new(String::from("Hello")));
{ // separate scope for mutex guarded type
    let mut text = text.lock().unwrap();
    text.push_str(", World");
}
```
This is the bare essentials with any multi-threading code stripped for clarity. The protected counter can be copied (or *cloned* in Rust jargon) and shared between threads. It exposes a [lock method](https://doc.rust-lang.org/std/sync/struct.Mutex.html) that returns a guardian structure that locks the underlying mutex until it goes out of scope[^unwrap]. This guardian is of type `MutexGuard<T>` and allows us to use it much like the underlying type `T` due to a nifty language feature called [Deref Coercion](https://doc.rust-lang.org/book/ch15-02-deref.html). In essence this allows us to access member fields, functions and operators of `T` when dealing with `MutexGuard<T>`.

The whole construct has the advantage that it is impossible to forget to lock the corresponding mutex before manipulating the data. The mutex truly protects data, as opposed to merely sections of code. This is the behavior we want to emulate.

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
};

template<typename T>
mutex_protected<T>::mutex_protected(T &&value)
:pvalue_(new T(std::move(value)))
,pmutex_(new std::mutex())
{}

template<typename T>
mutex_guarded<T> mutex_protected<T>::lock() {
    return mutex_guarded<T>(pvalue_,pmutex_);
}
```
The private members of the class are a mutex and a value of type `T` which are both packaged inside shared pointers. The constructor takes an rvalue reference to a resource an moves it into the internal shared pointer[^copy_move_constructible]. Furthermore, a new mutex is constructed inside a shared pointer. The reason for having both value and mutex behind a shared pointer is to make them transferable between threads without having to worry about lifetimes. The lock method returns a guardian that owns shared pointers to both the mutex and the value of interest. Let's look at the guardian next.

## The Guardian
Our guardian has to lock the mutex on construction and unlock it on destruction. Also it needs to provide a safe way of handling the value, similar to how Rust allows transparent access to members of the underlying type. Since we are talking C++, there is no entirely safe way. However, overloading the `->` operator on the guardian type is as close as we can get to the comfort and safety of Rust.

C++ has a somewhat unusual behavior when the arrow operator is overloaded[^operator_arrow]: if we use operator `->` to return a pointer from our guardian, then calling `guardian->foo()` is equivalent to calling `(guardian->())->foo()`, which is exactly what we are going to use it for[^operator_arrow_problem]. Now we are ready to take a look at a guardian implementation:

```c++
template<typename T>
class mutex_guarded {
private:
  std::lock_guard<std::mutex> lock_;
  std::shared_ptr<T> pvalue_;
  std::shared_ptr<std::mutex> pmutex_;
public:
  explicit mutex_guarded(std::shared_ptr<T> value,
     std::shared_ptr<std::mutex> mutex);
  T* operator->();
  T value() const;
};

template<typename T>
mutex_guarded<T>::mutex_guarded(
std::shared_ptr<T> pvalue,
std::shared_ptr<std::mutex> pmutex)
:lock_(*pmutex), pmutex_(pmutex) {
  pvalue_ = pvalue;
}
template<typename T>
T *mutex_guarded<T>::operator->() {
  return pvalue_.get();
}
template<typename T>
T mutex_guarded<T>::value() const {
    return *pvalue_;
}
```

The guardian class locks the mutex on construction and unlocks it on destruction. The mutex guard holds on to the shared pointers as long as it is alive, so that it is certain that both the value and the mutex are valid for the lifetime of the guardian. As previously discussed we have overloaded the arrow operator, which allows us to transparently access member functions and methods on the underlying guarded value. Furthermore we have a `value()` method which returns a copy of the current value[^value_access]. We now have mutex protected values like so, stripping all multithreading code just for clarity[^cpp17]:

```c++
mutex_protected protected_text(std::string("Hello"));
{ // scope in which the mutex is locked
  auto text = protected_text.lock();
  text->append(", World");
}
```
This accomplishes the same thing as the Rust example at the beginning.

# Increasing Convenience (and Performance)
To append a string in C++ we can either use the append function or the add-assignment operator `+=`. Our class does not allow this yet but we can implement those operators for increased convenience and --as we'll see later-- performance. We'll take add-assignment as an example implementation here.

## Simple Add-Assignment
Let's use some C++20 concepts to generate better compile time error messages and express our intentions clearly. Two types are add-assignable if this concept is valid:

```c++
template<typename T, typename U>
concept AddAssignable = requires(T& t, const U& u) {t+=u;};
```
We can implement the add-assignment operator for the `mutex_guarded` class like so:

```c++
template<typename U>
requires AddAssignable<T, U>
mutex_guarded<T>& operator+=(const U& rhs) {
    *pvalue_ += rhs;
    return *this;
}
```
This allows us to write `text += ", World"` in our example above, which is neat. Notice that the right hand side is not necessarily of type `std::string`, but something which is add-assignable to it. However, if we wanted to add-assign another `mutex_guarded<std::string>` to it, we could not do that without first calling `value()` on that string, which introduces an unnecessary copy construction. Let's see how to avoid it.

## Add-Assigning other Mutex Guarded Types
There is a simple fix to applying the generic add assignment above to the underlying mutex guarded values. First we must introduce a `friend` declaration that covers [all other template instances](https://en.cppreference.com/w/cpp/language/friend#Template_friends) to our class template:
```c++
template <typename U> class mutex_guarded;
```
Now we can just modify the add-assignment above:
```c++
template <typename U>
requires AddAssignable<T,U>
mutex_guarded<T> & operator+=(const mutex_guarded<U> & rhs) {
  *pvalue_ += *other.pvalue_;
  return *this;
}
```
This implementation can skip the `value()` induced copy of the right hand side and can thus bring a performance benefit. Sadly, I don't see a way of applying a similar trick to member function calls that take other types by constant reference, without adding an API that exposes the underlying value by reference. This is dangerous because it can easily introduce all kinds of lifetime issues.

## Other Operators
The same logic can be applied to the other compound assignment operators, and overloading the comparison operators straightforward as well. Overloading arithmetic operators like `+`,`-`,`*`,`/` is a little trickier semantically, because the return value could not be another mutex-guarded type. Furthermore the operators could potentially mutate the contents of the left hand side argument[^arithmetic_operators].

# Conclusion
This Rust-inspired journey has been fun for me. We saw a possible, but very bare bones, implementation of an `Arc<Mutex<T>>` in C++ which can emulate some of the data protection behavior that the Rust types exhibits. However, there are limitations to what can be achieved with this implementation. For example, I did not provide an API to access the underlying value by reference. Being able to access the value by reference might increase performance but it potentially exposes the user to lifetime issues. Furthermore, the `->` operator can be misused in obvious or non-obvious ways which can again introduce all kinds of nasty lifetime issues[^vector]. Lastly, I would strongly discourage the use of this class template for types `T` where `T` is a reference, pointer, or array[^static_assert]. Finally, there is also a [boost implementation](https://www.boost.org/doc/libs/1_74_0/doc/html/thread/sds.html) which accomplishes a similar goal, but it is --at the time of writing-- labeled experimental (and probably for good reason).

# Endnotes
[^unwrap]: More precisely calling `lock` followed by `unwrap` gives us the mutex guard, but this is not important here. The `unwrap` method has something to do with error handling in Rust, which is beside the point here.
[^copy_move_constructible]: For that the type must be either copy constructible or move construcible. Both work, because a const lvalue reference [can bind](https://www.fluentcpp.com/2018/02/06/understanding-lvalues-rvalues-and-their-references/) to an rvalue reference.
[^operator_arrow]: It actually is applied *recursively* until such time an element returns a pointer, see [here](https://stackoverflow.com/questions/10460662/recursive-application-of-operator) and [here](https://stackoverflow.com/questions/8777845/overloading-member-access-operators). This is similar to a chain of Deref Coercions in Rust.
[^operator_arrow_problem]: There is a massive drawback to implementing the arrow operator. The problem is that it can be used as `guardian->operator()`, which returns a pointer type. Directly exposing a pointer to data makes it possible to use the data without the protection of the mutex. However, I feel that this direct access is almost impossible to happen by accident and it's not worth abandoning the comfort that it allows us, just to stop intentional misuse. There are, however, less obvious ways in which we can misuse the operator. See endnote [^vector].
[^value_access]: The `value()` method returns by value on purpose. Returning `T&` or even `const T&` would make it easy to store a reference to the underlying value accidentally. This would expose the user to all kinds of nontrivial lifetime issues. This is why this class does not have a dereference operator `*`, where it would feel unnatural to return by value.
[^cpp17]: The example requires C++17 because it relies on class template argument deduction.
[^arithmetic_operators]: We could find a remedy for both issues, but the question is which solution would feel natural to a user.
[^vector]: For example, think of a `mutex_protected<std::vector> vec` instance where we accidentally pass `vec->begin()` to external code, without making sure that the iterator will always be valid.
[^static_assert]: We can easily make the compiler forbid the user from doing so by inserting strategically placed `static_assert` statements.
