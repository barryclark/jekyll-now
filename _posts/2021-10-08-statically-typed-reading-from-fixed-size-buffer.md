---
layout: post
tags: rust
#categories: []
date: 2021-10-08
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'C++ Metaprogramming: Statically Typed Reading from a Fixed Size Buffer'
comments_id: 
---

At work I am currently getting into embedded programming with C. And while there are some things I learned to appreciate about the simplicity of C, two of the things I really miss are templates and serious type safety. The constant need for fiddling with arrays of bytes and reinterpreting their contents made me wonder if there is a neat way of doing it in C++. This, of course, gives me an excuse to work out my C++ template metaprogramming muscles, which have atrophied somewhat.

# API Goal
Let's say I have fixed size array of 8 bytes, and I want to read the first two bytes as a `int16_t`, the next four bytes a an `int32_t` and the next two bytes as `uint16_t` again. How can I express this intuitively in C++17? Here's what I came up with:

```c++
uint8_t buf[] = /* an array with compile-time known size*/
auto [i16, i32, u16] = copy_from_buffer<int16_t,uint32_t,uint16_t>(buf);
```

This feels reasonably intuitive to me. Since we know the size of the buffer at compile time and we know the size of the types we want to read, we can make sure _at compile time_ that the buffer contains enough elements to read the desired types. If it does not, we produce a compile error. On the other hand, it's fine to read less elements from the buffer than it could potentially produce. So let's get going.

# Pseudocode
Let's use a little bit of (C++ _inspired_, but definitely not C++) pseudocode:
```rust
fn copy_from_buffer<Ts..., size_t N>(bytes[N]) -> tuple<Ts...> {
    size_t offset = 0;
    tuple<Ts...> copied_values{};
    foreach T in Ts... {
        copied_values (for type T) = *(reinterpret_cast<T*>( (&bytes[0]) + offset));
        offset += sizeof(T);
    }
    return copied_values;
}
```
Obviously, we want to return a tuple of the desired types. To assign each element of the tuple, we iterate over the types and reinterpret cast the associated memory to a pointer of that type. Then, we dereference the pointer to copy it into our tuple. While doing so, we keep track of the sizes of the types and accumulate them in an `offset` variable that we use to find the beginning of the next type in memory. So much for the theory. The problem is that the pseudocode given above is imperative, but C++ template metaprogramming (TMP) isn't [^cpptmp].

# Implementation
We'll start by collecting the puzzle pieces we need and plug them together at the end of this section.

## Calculating the Offsets
If we can't solve the problem imperatively, let's do it functionally. We begin with the series of types `<int16_t,uint32_t,uint16_t>` and the first step is to apply `sizeof` to every type. This gives us `<2,4,2>`, which we need to transform into the offset sequence `<0,2,6>`. We can see that the latter is obtained by applying a _partial sum_ to the size-sequence (with the first element being zero). So let's see how to implement a partial sum first.

```c++
template <std::size_t Nelem, typename T, typename... Ts>
constexpr T partial_sum(T const t, Ts const... ts) {
  static_assert(Nelem < 1 + sizeof...(Ts), "Not enough elements to sum");
  static_assert((std::is_same_v<T, Ts> && ...),"All types must be the same");
  if constexpr (Nelem == 0) {
    return 0;
  } else {
    return t + partial_sum<Nelem - 1>(ts...);
  }
}
```
Here, we have a `constexpr` function that sums `Nelem` elements of a given list of numbers. So `partial_sum<3>(1,1,1,1)` is `3`, while `partial_sum<1>(1,1,1,1)` is `1` and `partial_sum<0>(1,1,1,1)` is `0`. This is the building block we need to transform the sequence of types into the sequence of offsets.

To express a sequence of types in C++ TMP we use `std::tuple<Ts...>`, but how do we express a sequence of integer numbers? Well, [`std::integer_sequence`](https://en.cppreference.com/w/cpp/utility/integer_sequence) of course. It takes the type of the number and a variadic list of compile time constants of that type. Thus, to pass the sequence `<0,2,6>` we create an instance of type `std::integer_sequence<size_t,0,2,6>`. Now we know how to write a metafunction `make_offset_sequence` that transforms a sequence of types into a sequence of offsets. 

```c++ 
// a helper function
template <typename... Ts, size_t... Is>
constexpr auto make_offset_sequence_impl(std::integer_sequence<std::size_t, Is...>) {
  return std::integer_sequence<size_t, (partial_sum<Is>(sizeof(Ts)...))...>();
}
// the actual metafunction with a slim interface
template <typename... Ts>
constexpr auto make_offset_sequence() {
  return make_offset_sequence_impl<Ts...>(std::index_sequence_for<Ts...>());
}
``` 
In the helper function we have made use of the fact that we can expand packs in a nested fashion, which is really neat.

## Copying the Types
The previous work was most of the heavy lifting, but it's not quite over. Next, we need a function that extracts an element at a given offset in bytes from a buffer. At this point we pass the buffer as a pointer to bytes and disregard its fixed size. We'll get back to that later.

```c++
template <typename T, size_t OffsetBytes>
constexpr T elem_from_buffer_impl(std::uint8_t const *const buffer) {
  return *(reinterpret_cast<const T *>(buffer + OffsetBytes));
}
```
This function extracts one element of type `T` at offset `OffsetBytes` from a buffer. With this, we have the building block to create our tuple elements:

```c++ 
template <typename... Ts, size_t... Offsets>
constexpr std::tuple<Ts...> from_buffer_impl(uint8_t const *const buffer,
                                             std::index_sequence<Offsets...>) {
  std::tuple<Ts...> tup = {elem_from_buffer_impl<Ts, Offsets>(buffer)...};

  return tup;
}

template <typename... Ts, size_t N, typename BufType>
constexpr std::tuple<Ts...> copy_from_buffer(BufType const (&buffer)[N]) {
  static_assert(N > 0, "Cannot read from empty buffer");
  static_assert(sizeof...(Ts) > 0,
                "Must read at least one element from the buffer");
  static_assert((sizeof(Ts) + ...) <= N * sizeof(buffer[0]),
                "Not enough elements to read from in fixed size buffer");
  return detail::from_buffer_impl<Ts...>(
      reinterpret_cast<uint8_t const *>(&buffer[0]),
      detail::make_offset_sequence<Ts...>());
}
```
The latter function is the one we are interested in, but we need a helper function again to pass an index sequence that enumerates the types. The final `copy_from_buffer` function provides compile time safety with regards to the size of the buffer. It also works with other buffer types than bytes and provides the intuitive interface we were looking for.

# Conclusion
So this is it. A safer way of reinterpreting elements from a buffer that provides compile time bounds checking and as much type safety as possible. We might ask if it was really necessary do complicated metaprogramming just to achieve this simple effect [^heresy]. Couldn't we have used a memory copy into `struct`s? Yes and no. As far as I know, a `struct` can have padding bytes inserted by the compiler and I would not bet on the memory layout being portable across compilers. There are ways to pack structures, but they are not standardized as far as I am aware [^packing]. So, as always, metaprogramming is best ;)

Feel free to check out the code in [this github repo](https://github.com/geo-ant/MetaProgrammingShenanigans/).

# Endnotes

[^cpptmp]: From C++11 onwards, the increasing power of `constexpr`, `consteval`, and other language facilities made imperative metaprogramming easier in C++. Still, metaprogramming in C++ is not imperative. If you are interested in imperative C++ metaprogramming (and so much more), check out Sean Baxters [Circle](https://www.circle-lang.org/) language.
[^packing]: For further reference see e.g. [this post on packing structures](https://www.joshcaratelli.com/blog/struct-packing), this discussion on [struct memory layout](http://www.cplusplus.com/forum/general/19661/), or this one [on Stackoverflow](https://stackoverflow.com/questions/7793820/struct-members-memory-layout).
[^heresy]: That would of course be heresy, since it is _always_ necessary to metaprogram!