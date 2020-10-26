---
layout: post
title: Exploring C++20 Concepts!
tags: c++20, c++, concepts
---

Lets see what we can do with C++20's Concepts feature. It is one of the big 4 as I see them

* **Concepts**
* Ranges
* Coroutines
* Modules

So, what is a Concept? Well in C++20's terms it is a **Set of Constraints** to which we gave a specific name, for example `std::is_integral`. Sounds restrictive? Yes thats the point, instead of taking everything and printing out cryptic error messages with lots of template instantiations when something goes wrong, you can now without much Fuss define what your requirements are and constrain your functions to them. This will lead to a lot cleaner error messages and easier code.

A Concept can be used instead of a regular template Parameter, a function argument or even as a return type. 

An example is worth more than a thousand words (or at least the few above). 

# Implementing a function that computes the length of a range for arbitrary STL Containers (using Concepts)

Lets recap quickly on how we would do it using templates

```cpp

// Templates, ala compile time duck typing...
template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept
{
    int result = 0;
    for(;begin != end; ++begin, ++result);
    return result;
}

int main()
{
    std::vector<int> vec = {3,4,5};
    std::list<int> list = {3,4,5};

    auto vec_length = length(std::begin(vec), std::end(vec));
    auto list_length = length(std::begin(list), std::end(list));

    // What happens if I make a mistake?
    auto mistake = length(std::begin(vec), std::end(list));

    // What happens if i input some random types?
    auto wrong_types = length(3,-4);

    // Using some other types
    auto same_types = length("string2", "string");
}

```

This is more or less the way we could implement it using templates. When you try the above code you will already get a compiler error for the line `auto mistake = length(std::begin(vec), std::end(list));` because we give the the function parameters of different types (list::iterator and vector::iterator), so here templates got us covered! And actually the error message is quite short and informative for that(using clang, gcc is a bit longer but similar information):

```
<source>:87:20: error: no matching function for call to 'length'

    auto mistake = length(std::begin(vec), std::end(list));

                   ^~~~~~

<source>:16:19: note: candidate template ignored: deduced conflicting types for parameter 'Iterator' ('__gnu_cxx::__normal_iterator<int *, std::vector<int, std::allocator<int>>>' vs. 'std::_List_iterator<int>')

[[nodiscard]] int length(Iterator begin, Iterator end) noexcept

                  ^

1 error generated.

Compiler returned: 1
```

So where and why should we use concepts? Well ... did you take a look at the line `auto wrong_types = length(3,-4);`? That does not make any sense, however it compiles completely fine, since all the operations that are required for the computation can be done on integers, meaning we will not even get a compiler error.

This is where concepts can save us! We can now retrict our template Function to anything that counts as a `forward_iterator` for example. Just replace `typename` or `class` with the Name of a Concept.

```cpp
template<std::forward_iterator Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept
{
    int result = 0;
    for(;begin != end; ++begin, ++result);
    return result;
}
```

If we compile said line `` now, we will get the following error message:

```
<source>:90:24: error: no matching function for call to 'length'

    auto wrong_types = length(3,-4);

                       ^~~~~~

<source>:25:19: note: candidate template ignored: constraints not satisfied [with Iterator = int]

[[nodiscard]] int length(Iterator begin, Iterator end) noexcept

                  ^

<source>:24:15: note: because 'int' does not satisfy 'forward_iterator'

template<std::forward_iterator Iterator>
```

Aaaand we are saved! Clear error message caught at compile time, could it be better? Well... sadly concepts (or at least the forward_iterator concept) cannot save us from everything. Remember the line `auto same_types = length("string2", "string");` that will compile even with the Concept, even though it makes no sense whatsoever. This is because `const char*` satisfies all Constraints of the `std::forward_iterator` Concept (just like probably any pointer, but lets take a look at that further down).

You can check the Code live [here]()

# But apart from catching Errors at Compile Time and Giving clear Error Messages, what have Concepts ever done for us?

Glad you asked. Well remember **Tag Dispatching**? Or even better **SFINAE** all that stuff you had to do in order to specifically select an overload for a specific function. Lets do something about that!

For our use case we want to optimize our `length` function for containers that are continously stored in memory and whose length can be computed simply by subtracting `begin` from `end`.

So here's an Implementation using **Tag Dispatching**:

```cpp
template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept 
{
    return _length(begin, end, Iterator::iterator_category);
}

template<class Iterator>
[[nodiscard]] int _length(Iterator begin, Iterator end, std::random_access_iterator_tag) noexcept
{
    return end - begin;
}

template<class Iterator>
[[nodiscard]] int _length(Iterator begin, Iterator end, std::forward_iterator_tag) noexcept
{
       int result = 0;
       for(;begin != end; ++begin, ++result);
       return result;
}
```

I think thats how most STL containers do such optimizations. It works because each iterator has a typedef called `iterator::category`. For the vector it is of type `std::random_access_iterator_tag` for the list it is of type `std::forward_iterator_tag`. Looks quite verbose doesn't it?

Well since this is C++ we can make it even more complicated. Lets try using **SFINAE**:

```cpp
template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end, 
    std::enable_if_t<std::is_same<Iterator::iterator_category,
         std::random_access_iterator_tag>::value, void_t>* = nullptr)noexcept 
{
    return end - begin;
}

template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end, 
    std::enable_if_t<std::is_same<Iterator::iterator_category,
            std::forward_iterator_tag>::value, void_t>* = nullptr ) noexcept 
{
    int result = 0;
    for(;begin != end; ++begin, ++result);
    return result;
}
```
Whenever I see `enable_if` I have to resist the urge of skipping the code with the attitude "Its probably not that important to understand this, I probably don't need to know this to solve my current problem"...


Now the same thing using Concepts, we just add a second overload using the Concept `std::random_access_iterator`:

```cpp
// This we had before for any iterator
template<std::forward_iterator Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept
{
    int result = 0;
    for(;begin != end; ++begin, ++result);
    return result;
}

// This is our newly added Concept that optimizes for random access iterators
template<std::random_access_iterator Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept
{
    return end - begin;
};
```

**Nice**, we got rid of a lot of boiler plate and complicated language mechanics! The overload resolution takes the Concepts into account and does all the work for us.

This of course has the same advantage of clearer Error Messages, just compare when we put in something that does no have the `typedef iterator_category` into the templates

```
//TODO
```

against what happens with the overloads using Concepts

```
//TODO
```

You can check and experiment with the Code [here](TODO).

## So how does the overload resolution work for Concepts?

Well, according to the standard the more constrained Concept wins.
//TODO

# Creating your own Concepts

Finally the good stuff, eh? Well depends, actually the stl provides a lot of things that you can use and combine in order to create new Concepts and I really recommend to do so. If you know the [type_traits](TODO) library you should already be familiar with most of them since for every `type_trait` there is now also a corresponding Concept based on said `type_trait`.

Okay so lets put some **"Butter by die Fische"** here is a self defined Concept:
```cpp
template<typename T>
concept A_Number = std::is_integral<T>::value || sd::is_floating_point<T>::value;
```

So when we take a look at the previously used `std::forward_iterator` Concept we can see its defined exactly in that way (a little bit more verbose but still quite easy to read):

```cpp
template<class I>
  concept forward_iterator =
    std::input_iterator<I> && 
    std::derived_from</ITER_CONCEPT*/<I>, std::forward_iterator_tag> &&
    std::incrementable<I> &&
    std::sentinel_for<I, I>;
```

And of course since this is C++ there is more than one way to define a Concept. The above one is called **function concept** the below one **variable concept**:
```cpp
template<typename T>
concept Equal(){
  return requires(T a, T b) {
    { a == b } -> bool;
    { a != b } -> bool;
  };
}
```
Lets translate what the above means: Th

# What else could there be?

* Well the require clause pretty much can go wherever you like
* Concept as return type
* conept for function parameters

# TLDR

Use Concepts to define your Function Interfaces!

# Resources

[cppreference](https://en.cppreference.com/w/cpp/language/constraints)
[modernescpp](https://www.modernescpp.com/index.php/defintion-of-concepts)