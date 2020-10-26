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

An Implementation using **Tag Dispatching**:

```cpp

```

# Resources

[cppreference](https://en.cppreference.com/w/cpp/language/constraints)
[modernescpp](https://www.modernescpp.com/index.php/defintion-of-concepts)




The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
