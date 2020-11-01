---
layout: post
tags: c++17 variadic-templates template-metaprogramming
#categories: []
date: 2020-08-18
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'How Do I `cout` my `tuple` in C++17 ?'
comments_id: 15
---

I came across the problem of printing a tuple of different types to `cout` and thought I would jot down my solution. This isn't an original solution of mine, but I wanted to remember the ideas behind it, so I am writing it down for Future Me&trade; and anyone else who's interested.

# The Problem
The problem is this: we have a tuple of values of different types and want to print it using an `std::ostream`. For example, we want to be able to write:

```c++
std::tuple mytuple(1,std::string("Hello"),12.5);
std::cout<< mytuple;
```
Note that `mytuple` is of type `std::tuple<int,std::string,double>`. C++17 class template argument deduction makes this code way nicer to read than a C++11 equivalent. Let's say our desired output is
```
1
Hello
12.5
```
How can we do that? As so often, [Stackoverflow](https://stackoverflow.com/questions/6245735/pretty-print-stdtuple) comes to the rescue. This is what I based my solution on, with the difference that I made the code a tiny bit more readable by using C++17 syntax[^cppref_prettyprint].

# The Solution
The key idea is to find a way to index the elements of the tuple programatically, and then have the compiler insert them to the ostream one after the other. Let's write down the signature of the `operator<<` we would like to have.

```c++
template<typename ...Ts>
std::ostream & operator<<(std::ostream& os, const std::tuple<Ts...> & tuple);
```
This gives us the types of the tuple in the pack `Ts`, but we also need a running sequence of indices to go along with the tuple. This will enable us to access the elements in sequence. Here, the C++14 type [`std::index_sequence`](https://en.cppreference.com/w/cpp/utility/integer_sequence) comes in very handy. It provides us with a way to create a pack of compile time constant integers[^integers] that indexes the elements of the tuple. The helper metafunction `std::index_sequence_for<Ts...>` can create a value that corresponds to an index sequence of `0,1,...,N-1` where `N` is the number of elements in the tuple. This pack of integers (call it `Is` for indices), along with the pack of types is what we'll pass into a helper function that does the actual work for us.

## A Helper To Print an Indexed Tuple

Let's look at the helper function before we go back to completing our `operator<<`. Our helper function expects an `ostream`, a tuple with a pack of types `Ts`, and a pack of indices `Is` with the same length as the tuple. Let's look at the code:

```c++
namespace detail
{
  template<typename ...Ts, size_t ...Is>
  std::ostream & println_tuple_impl(std::ostream& os, std::tuple<Ts...> tuple, std::index_sequence<Is...>)
  {
      static_assert(sizeof...(Is)==sizeof...(Ts),"Indices must have same number of elements as tuple types!");
      static_assert(sizeof...(Ts)>0, "Cannot insert empty tuple into stream.");
      auto last = sizeof...(Ts); // assuming index sequence 0,...,N-1

      
      return ((os << std::get<Is>(tuple) << (Is != last ? "\r\n" : "")),...);
  }
}
```
The signature is almost the same as above but this function also has two parameter packs[^multiple_packs]. The indices `Is...` are part of an unnamed argument of type `std::index_sequence<Is...>`. Again, this *type* is our way of passing the index sequence. We don't care about its actual *value* which is why we don't have to name it. Remember, that in the magical world of C++ Template Metaprogramming we care about types and compile time constant values only. We merely use values as a way of passing their types to template parameter lists, as we'll see in the implementation of the `operator<<`.

Apart from two `static_assert` statements to prevent accidental misuse[^misuse], the body of the function consists of one expression. The packs of indices are expanded together and we use the [comma operator](https://en.cppreference.com/w/cpp/language/operator_other) to return the final result of the `ostream` after inserting each element from the tuple into it. Note that all the types inside the tuple must have the appropriate `operator<<` overloaded. Otherwise this will result in a nasty compiler error. C++20 concepts will make things a little nicer to handle.

## Putting It Together
Finally we have to call this helper function from our `operator<<`. Using all we know now this is easy enough:

```c++
template<typename ...Ts>
std::ostream & operator<<(std::ostream& os, const std::tuple<Ts...> & tuple) {
    return detail::println_tuple_impl(os, tuple, std::index_sequence_for<Ts...>{});
}
```
Note that we pass the helper function a (default constructed) value of helper type `std::index_sequence_for<Ts...>{}`. This is the idiom I mentioned above. We pass the value to let the compiler deduce the underlying type, which is what we are actually interested in. Now the operator does what we want it to do.

# Endnotes

[^cppref_prettyprint]: The [cppreference](https://en.cppreference.com/w/cpp/utility/integer_sequence) has pretty much the same implementation as an example use case for `std::integer_sequence`

[^integers]: Integers of type `size_t` to be precise.

[^multiple_packs]: If you are confused why it is ok to have two parameter packs in a variadic template type list, don't be. It's perfectly fine to have multiple packs as long as the pack expansions inside the function signatures are parts of other types (in this case: the tuple and the index sequence). That means the expansions are sandwiched inside `<...>`. The compiler can then safely deduce the parameter packs. The one thing we cannot have is two pack expansions in the parameter list of function. For example this function signature `template<typename...Ts, size_t ...Is> do_something(Ts... ts, Is... is)` is illegal. There is no unique way to deduce the packs.

[^misuse]: This helper function is not intended as part of a public API, which is why it's placed it's own namespace. However, it makes a lot of sense to guard it against accidental misuse by the implementor, too.
