---
layout: post
tags: c++ c++17 null-conditional template-metaprogramming functional-programming
#categories: []
date: 2020-06-01
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Implementing a Pipe Syntax for `std::optional` - Part 2: Applied Template Metaprogramming '
#comments_id: 
---

I've implemented a pipe syntax for optionals that allows applying callables to optional values in an expressive fashion (!!LINK HERE!!). However, I still needed a functionality to provide a useful return type if the callable itself returns an optional. In this article I am going to implement this functionality using Template Metaprogramming.

# Unraveling Optionals with Metafunctions
The puzzle piece I was missing in the last article was a [metafunction](https://akrzemi1.wordpress.com/2012/03/19/meta-functions-in-c11/) that takes a type `U` and returns a type depending on the given `U`. In the pipe operator `U` is the return type of the given callable. To prevent nesting of optional return types I need the metafunction to operate like this:

1. In case `U` is itself an optional, i.e. `U` is `std::optional<V>`, return the type `std::optional<V>`.
2. In case `U` is void, give the compiler an illegal type that leads to a [SFINAE](https://en.cppreference.com/w/cpp/language/sfinae) when used as the return type of our operator[^sfinae].
3. In all other cases: wrap the given type in a `std::optional` and return that type [^remove_references].

So in essence we have a switch case (or if-else) logic that we need to implement as a metafunction. This metafunction operates exclusively on types. That means that both the argument as well as the result of the function are *types* not values[^metafunc_return]. The way this is commonly implemented in C++ is to declare a `struct` template with a typedef'd `type` whose actual type depends on the template specialization. Let's see how exactly that works.

# Implementing a Metafunction that Acts on Types
Our goal is to implement a simple metafunctions whose return type depends on a given argument type as described above. 

## Implementing the Default Case
I find it best to start with the default case, i.e. option 3 from above and do the special cases later.

```c++
#include <optional>
#include <type_traits>

//helper type to remove cv and ref qualifiers:
template<typename T>
using remove_cvref_t = typename std::remove_cv_t<std::remove_reference_t<T>>;

//default case of metafunction:
template<typename U>
struct wrap_return_type
{
  typedef std::optional<remove_cvref_t<U>> type;
};
```
Our metafunction is implemented as a the structure `wrap_return_type`. I takes a type `U` and strips the cv and reference qualifiers[^remove_cvref_t] from the given type and then wraps it in a `std::optional`. If we want to access the type for a given argument `U` we have to write `typename wrap_return_type<U>::type`. This is uneccessarily wordy and we can shorten it using a [type alias](https://en.cppreference.com/w/cpp/language/type_alias):

```c++
template<typename U>
using wrap_return_type_t = typename wrap_return_type<U>::type;

``` 
I followed the naming convention of the standard by appending `_t` to the name of my structure. This can now be used as a type by writing `wrap_return_type_t<U>`, which is as legible as it gets for C++ Template Metaprogramming. At least as of right now.

## Implementing the Special Case for `std::optional<U>`
Let's tackle case 1 from above, i.e. the special case that the argument type is already wrapped in an optional. We tackle this by providing a template specialization that will be chosen in that case, because it is more specific than the general case:

```c++
template<typename V>
struct wrap_return_type<std::optional<V>>
{
  typedef std::optional<V> type;
};
```
Now we just return exactly the optional type that was passed in without wrapping it in another optional. Easy.

## Implementing the Sfinae Case
In the implementations above, we have used `wrap_return_type_t` to find the return type of the pipe operator function. Here we use it to remove a particular overload (when `U` is `void`) of the pipe operator from the overload set using SFINAE. !!HIER WEITER!! VIELLEICHT ZITAT ZUM SFINAE BEI DEN FUNKTIONEN AUS CPPREF HIER!!

```c++
template<>
struct wrap_return_type<void>
{
  //type is not defined!
};
```

# Endnotes

[^sfinae]: I want to handle functions returning `void` with a different overload of the operator. That is why I want to use SFINAE to remove the operator overload that I implemented last time from the overload set. [Here](https://www.bfilipek.com/2016/02/notes-on-c-sfinae.html) is a very thorough introduction to SFINAE in Modern C++.
[^metafunc_return]:In general, metafunctions can operate either on types or on compile time constant values (or both). The result of a metafunction, be it type or compile time constant, is computed at compile time.
[^remove_references]: In the actual implementation we do not simply retrun `std::optional<U>` but remove any reference or cv qualifiers from the type. We remove reference qualifiers because [optional references are not part of C++17](https://www.fluentcpp.com/2018/10/05/pros-cons-optional-references/). We remove [cv qualifiers](https://en.cppreference.com/w/cpp/language/cv) because they are of limited use for the optional value type. 
[^remove_cvref_t]: If I am usring C++17 and below I have to implement the type alias `remove_cvref_t` myself. [From C++20 onwards](https://en.cppreference.com/w/cpp/types/remove_cvref), this is part of the standard in the namespace `std`.