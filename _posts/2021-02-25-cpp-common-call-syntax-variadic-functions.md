---
layout: post
tags: rust template-metaprogramming generic-programming c++ c++17
#categories: []
date: 2021-02-25
last_updated:
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'C++: A Common Interface for Functions Taking Different Numbers of Arguments'
comments_id: 23
---

Inspired by the previous article on creating a common interface to call and pass functions of different numbers of arguments in Rust, I wanted to see if and how I could make this work in C++. I was able to get a very similar thing working in C++ at the expense of some of my sanity. Here we go.

# Our Goals
Our goals for this article are very similar to the goals of the [previous article](/blog/2021/rust-traits-and-variadic-functions/), where we wrote a common interface to call and pass functions with different numbers of arguments. In this post, I want to explore whether I can achieve a similar effect in Modern C++. Given two callables, each taking one and two arguments, respectively. For example these two callables:

```c++
float f1(double x) {return 2*x;}
auto f2 = [](double x, double y){return x+y;};
```
Now, I want to be able to call them using a common syntax. Specifically, I want to pass them to an `evaluate` function that takes the callable and a vector of parameters (in this case `std::vector<double>`) and evaluates the functions so that the following assertions hold.

```c++
assert(evaluate(f1,{1.})==f(1.));
assert(evaluate(f2,{1.,2.})== f(1.,2.));
```
As for the previous article, I am not concerned with any error handling, including checking whether the vector has the correct number of elements to supply the function arguments.

Up to now, this article is pretty much just a 1-to-1 translation of the Rust goals into C++, but now things get interesting and different. Unfortunately I could not come up with an idea to make the exact syntax above workable [^losing_genericity]. Alas, as the famous philosopher Jagger once said *you can't always get what you want; but if you try sometime, you find you get what you need*.

# An Implementation using C++20 Concepts
We'll use C++20 concepts to get our implementation working, for the sole reason of making the code more readable. We'll get back to C++17 and C++14 implementations later.

In the Rust version, we were able to implement a common calling interface for callable traits taking different numbers of arguments, i.e. `Fn(T)->R`, and `Fn(T,T)->R` and so on. C++20 does not have traits, but it has concepts. The ones that express the analogous callables in C++ are `std::invocable<F,T>`, `std::invocable<F,T,T>` and so on [^traits_concepts]<sup>,</sup>[^invocable_return]. Just as in the Rust version, we'll have to do some manual labor to get our `evaluate` function working for callables of different arguments sizes [^rust_vs_cpp].

## A Common Evaluation Interface
A way to implement an evaluation function (almost) like we specified above, is like this:

```c++
// for functions f(T)
template<typename T, typename F>
requires std::invocable<F,T>
auto evaluate(F&& f, std::vector<T> args) {
  return std::forward<F>(f)(args[0]);
}

// for functions f(T,T)
template<typename T, typename F>
requires std::invocable<F,T,T>
auto evaluate(F&& f, std::vector<T> args) {
  return std::forward<F>(f)(args[0],args[1]);
}
```
Here we manually overload the `evaluate` function for callables of one and two arguments. By restricting on the appropriate concept, we remove the unfitting overloads for a given callable argument from the overload set. We extend this for functions of multiple arguments and I'm pretty sure we can also write a macro that will alleviate us of some of the manual labor, but that is beside the point here.

We can use the `evaluate` function like so:

```c++
auto func1 = [](double x){return x+1;};
auto func2 = [](double x, double y){return x+y;};

auto result1 = evaluate<double>(func1, {1.});
auto result2 = evaluate<double>(func2, {1.,2.});
```
[Try it here](https://wandbox.org/permlink/kTJZ9pf83vbFGdVm). Note that we have to specify the function argument type `T` in our call to evaluate because the compiler is unable to figure it out otherwise. This is a little less elegant than the Rust solution, where the compiler offers much more powerful type inference. However, for my intended use this is completely fine.

## Generating A Wrapper Type
The Rust implementation allowed us more than just calling the functions using a common `evaluate` function. It effectively provided a an interface that let us call the functions using the vector of parameters only. I want to emulate this behavior and create a proxy type in C++ that dispatches elements from a vector to the individual arguments of the underlying functions. So for the two objects `func1` and `func2` from above I want to be able to write:

```c++
auto proxy1 = create_proxy<double>(func1);
auto proxy2 = create_proxy<double>(func2);

auto params = std::vector{1.,2.};

assert(proxy1(params)==func1(1.));
assert(proxy2(params)==func2(1.,2.));
```

To implement the `create_proxy` function we'll manually create function overloads for callables of different arguments. This is analogous to what we did with `evaluate`. These overloads make sure we are truly dealing with functions $$f(T)$$, $$f(T,T)$$ by removing unfitting overloads from the set.


```c++
// create a proxy for functions f(T)
template<typename T, typename F>
requires std::invocable<F,T>
auto create_proxy(F&& f) {
  return create_proxy_impl<F,T>(std::forward<F>(f),
   std::make_index_sequence<1>{});
}

template<typename T, typename F>
requires std::invocable<F,T,T>
auto create_proxy(F&& f) {
  return create_proxy_impl<F,T,T>(std::forward<F>(f),
   std::make_index_sequence<2>{});
}
```
If we want to support functions of 3,4,5,... arguments we have to manually implement the appropriate overloads. Note that we have delegated the actual implementation of creating a proxy to a truly variadic function template `create_proxy_impl`. We are also passing an index sequence to `create_proxy_impl` to help dispatch the elements of the vector to the arguments of the callable.  Note further, that the `create_proxy` methods take the argument type `T` as their first template parameter and `F` as the second. This is so that the user can specify `T`, but can let the compiler deduce the type of the callable `F`. For the `create_proxy_impl` function template, `F` has to go first so we can have the variadic argument type list last. But in this case it doesn't hurt, because both `F` and `T` are known types when calling `create_proxy_impl` from the `create_proxy` overloads. The user does not have to bother with finding out the type of the callable.

Now for the implementation of the `create_proxy_impl` helper. Since we want to dispatch the parameters to the function from a vector of `T`s , we have to make sure that all types are the same. We'll do that by implementing a helper structure that checks for that and extracts the type of argument.

```c++
template<typename T, typename ...Ts>
struct arg_type {
  static_assert( (true &&...&& std::is_same_v<T,Ts>),
    "All argument types must be the same!");
    using type = T;
};

template<typename ...Ts>
using arg_type_t = arg_type<Ts...>::type;
```

Finally we can write the meat of the implementation as

```c++
template<typename F, typename ...Ts, size_t ...Is>
auto create_proxy_impl(F&& f, std::integer_sequence<size_t, Is...>) {
  return [f=std::forward<F>(f)]
  (const std::vector<arg_type_t<Ts...>> & params)
  {return f(params[Is]...);};
}
```
[Try it here](https://wandbox.org/permlink/2aDf7XpvibPXHxOa) to see the full implementation working together. I have focussed on numeric parameters here, but the parameters are free to be of any type. Also the return type does not have to be the same as the function argument type. So all in all, we could reproduce something very close to what we were able to do in Rust. Let's now take a look at making it work for versions less than C++20.

## Making it Work for C++17
Making the `evaluate` implementation work for C++17 is pretty straightforward because we only have to substitute our use of concepts with some good ol' [SFINAE](https://en.cppreference.com/w/cpp/language/sfinae).

```c++
// C++17: for functions f(T)
// C++17: for functions f(T)
template<typename T, typename F>
std::invoke_result_t<F,T> evaluate(F&& f, std::vector<T> args) {
  return std::forward<F>(f)(args[0]);
}
// C++17: for functions f(T,T)
template<typename T, typename F>
std::invoke_result_t<F,T,T> evaluate(F&& f, std::vector<T> args) {
  return std::forward<F>(f)(args[0],args[1]);
}
```
[Try it here](https://wandbox.org/permlink/SQo1zNCIarBx1VpR).

One problem is that we cannot simply put the `std::invoke_result_t` expression into a default template type parameter, see e.g. [here](https://wandbox.org/permlink/kK3jH2304C6ez0Ki). The problem is that default template type parameters [do participate in SFINAE](https://stackoverflow.com/questions/16302977/static-assertions-and-sfinae/16304778#16304778), but they [do not participate in overload resolution](https://stackoverflow.com/questions/50392652/sfinae-not-working-with-a-very-simple-example). We work around that by making `std::invoke_result_t` part of the return type.

While this behavior does not bother us that much for the `evaluate` implementation, it becomes more annoying when we try to implement `create_proxy`. *Iff* we are willing to sacrifice the `auto` return type from the `create_proxy_impl` for an appropriate `std::function` specialization, then the implementation is pretty straightforward. [Try it here](https://wandbox.org/permlink/3XY2SOxZ2dKv6dWS).

However, since we are C++ developers we want to be comforted by the knowledge that we squeezed every bit of performance out of our code, even at the expense of our sanity. So here goes nothing:

```c++
template<typename F, typename ...Ts, size_t ...Is>
auto create_proxy_impl(F &&f, std::integer_sequence<size_t, Is...>, std::enable_if_t<std::is_invocable_v<F,Ts...>,int>  =0) {
    return [f = std::forward<F>(f)](const std::vector<arg_type_t<Ts...>> &params) { return f(params[Is]...); };
}

template<typename T, typename F>
decltype(create_proxy_impl<F, T>(std::declval<F>(), std::make_index_sequence<1>{})) create_proxy(F &&f) {
    return create_proxy_impl<F, T>(std::forward<F>(f),
                                   std::make_index_sequence<1>{});
}

template<typename T, typename F>
decltype(create_proxy_impl<F, T, T>(std::declval<F>(), std::make_index_sequence<2>{})) create_proxy(F &&f) {
    return create_proxy_impl<F, T, T>(std::forward<F>(f),
                                      std::make_index_sequence<2>{});
}
```
Well, such is the beautiful mess that is C++. [Try it here](https://wandbox.org/permlink/gH4SyI5ulVDGJAGD). This might not look that complicated at first, but it took me quite a while to figure this out (for a less elegant solution see [here](https://wandbox.org/permlink/K6YrdocresQAQEcb)). Note that we cannot use the `auto` return
type in both `create_proxy_impl` overloads and that we had to stick a  default `int` argument (guarded by a `std::enable_if_t`) into the argument list of `create_proxy_impl`.

### C++14 and Below
Everything so far has been long and rambling, so I'll keep this section brief-ish. C++14 has no fold expressions, which we used in the `static_assert` of our `arg_type` helper struct template. Those must be replaced by a recursive metafunction call from our standard template metaprogramming bag of tricks. Furthermore, C++14 does not have `std::is_invocable` but is has `std::result_of`, which [is a little more dicey](https://en.cppreference.com/w/cpp/types/result_of) but should do what we want. In C++11, `std::result_of` is even more iffy and I'm not completely sure it will do what we want. Also, in C++11 we don't have the [generalized lambda capture](https://isocpp.org/wiki/faq/cpp14-language#lambda-captures) used to forward the callable into the closure, so we'll have to work around that as well.

# Limitations and Caveats

We have already seen that the C++ compiler cannot infer the function argument type `T` the way the Rust compiler can. But there are other limitations and caveats.

## Passing Generic Functions
Our implementation does not allows us to pass a function template (without explicitly instantiating it) to either `evaluate` or `create_proxy`. This makes sense, since a function template is not a type. There [might be a way](https://stackoverflow.com/questions/64278705/template-parameter-deduction-problem-with-c-concepts-and-stdis-same) to go about this using template template parameters, but I am not sure about that and it is going to induce a slew of other complications. However, we can pass a generic lambda to both `evaluate` and `create_proxy`. Why? Because a generic lambda is not a function template at all, but an instance of a closure class with a templated call operator. So the type of this instance is clear to the compiler.

## Passing Variadic Functions
We cannot pass truly variadic functions to our `evaluate` or `create_proxy` function templates for the same reason as before. Furthermore, we cannot pass variadic lambdas, because the compiler cannot pick a correct overload, since the variadic lambdas are callable with any number of arguments. The number of function arguments must be known at compile time and we must manually implement the appropriate overload of `evaluate` and `create_proxy`. We had to do that in Rust as well, albeit for completely different reasons.

## Type Safety and Implicit Conversions
C++ allows us to write the following:
```c++
auto func = [](double x){return x+1;};
auto result1 = evaluate<int>(func, {1});
```
So we can call our evaluate function with an `int` template argument although our function takes `double`. In fact, we can use `evaluate<T>` with any type of template type as long as our `func` can be called with this argument type. So if `T` is convertible to the argument type of the function, we're fine. I actually like this property when dealing with numeric functions. However, it might also produce unexpected results when dealing with type arguments which aren't numeric.

# Conclusion
What a ride this has been. Kudos to whoever made it this far. We have seen that we can produce a very similar interface for calling and passing functions with different argument lengths in C++ and Rust. And while the under the hood implementation for C++17 and below does get somewhat hairy, we *were* able to do it. And at the end of the day, if the API is simple then it does not really matter that the underlying implementation is hard and complex.

# Endnotes
[^losing_genericity]: At least not if I want some amount of generality (and templates) left in my code.
[^traits_concepts]: C++20 concepts are only superficially equivalent to Rust traits in the sense that they allow us to restrict generic functions to certain classes of types. However, Rust traits are much more powerful in assisting with type inference.
[^invocable_return]: Note that the `std::invocable` concept does not restrict the return type. There's other ways of doing that in C++, but we'll not bother with this for now.
[^rust_vs_cpp]: In my last post on the Rust side of things, I assumed that C++'s variadic templates would help me avoid the manual labour. However, I did not find a way to make this work. While variadic generics are more powerful in C++, the problem I ran into is that concepts don't really help in template argument deduction the way Rust's traits do. At least I didn't find a way to make it work.