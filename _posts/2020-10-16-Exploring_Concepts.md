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

You can check the Code live [here](https://godbolt.org/z/bvG8e9)

# But apart from catching Errors at Compile Time and giving clear Error Messages, what have Concepts ever done for us?

Glad you asked. Well remember **Tag Dispatching**? Or even better **SFINAE** all that stuff you had to do in order to specifically select an overload for a specific function. Lets do something about that!

For our use case we want to optimize our `length` function for containers that are continously stored in memory and whose length can be computed simply by subtracting `begin` from `end`.

So here's an Implementation using **Tag Dispatching**:

```cpp
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

template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end) noexcept 
{
    return _length(begin, end, typename Iterator::iterator_category{});
}
```

I think thats how most STL containers do such optimizations. It works because every iterator has a typedef called `iterator::category`. For the vector it is of type `std::random_access_iterator_tag` for the list it is of type `std::forward_iterator_tag`. Looks quite verbose doesn't it?

Well since this is C++ we can make it even more complicated. Lets try the same using **SFINAE**:

```cpp
template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end, 
    std::enable_if_t<std::is_same<typename Iterator::iterator_category,
         std::random_access_iterator_tag>::value, void>* = nullptr)noexcept 
{
    return end - begin;
}

// We could be better here by checking for the actual iterator type but this is easier ;)
template<class Iterator>
[[nodiscard]] int length(Iterator begin, Iterator end, 
    std::enable_if_t<std::negation_v<std::is_same<typename Iterator::iterator_category,
            std::random_access_iterator_tag>>, void>* = nullptr ) noexcept 
{
    int result = 0;
    for(;begin != end; ++begin, ++result);
    return result;
}
```
Easy, right? ...


Now the same thing using Concepts, we just add a second overload using the Concept `std::random_access_iterator`:

```cpp
// This we had before for any forward iterator
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

When we put in something that does no have the `typedef iterator_category` (like `int`) into the templates we actually get quite a good error message with Clang, so not much difference to Concepts from this perspective (I was positively surprised by this).

```
<source>:78:24: error: no matching function for call to 'length'

    auto wrong_types = length(3,-4);

                       ^~~~~~

<source>:31:19: note: candidate template ignored: substitution failure [with Iterator = int]: type 'int' cannot be used prior to '::' because it has no members

[[nodiscard]] int length(Iterator begin, Iterator end, 

                  ^

<source>:40:19: note: candidate template ignored: substitution failure [with Iterator = int]: type 'int' cannot be used prior to '::' because it has no members

[[nodiscard]] int length(Iterator begin, Iterator end, 

                  ^
```
You can check and experiment with the Code [here](https://godbolt.org/z/Ge3b4d).

# Creating your own Concepts

Finally the good stuff, eh? Well depends, actually the stl provides a lot of things that you can use and combine in order to create new Concepts and I really recommend to do so. If you know the [type_traits](https://en.cppreference.com/w/cpp/header/type_traits) library you should already be familiar with most of them since for every `type_trait` there is now also a corresponding Concept based on said `type_trait`.

Okay so lets put some **"Butter bei die Fische"** here is a self defined Concept:
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
template<typename T, typename U>
concept OurFirstConcept
  = requires(T&& a, U&& b) 
  {
    swap(std::forward<T>(a), std::forward<U>(b));
    typename T::membertype;     
    { a == b } noexcept -> std::same_as<bool>;
    requires std::same_as<T*, decltype(new T)>;
  };
```

Looking weird? Well thats a bit of everything that can be in the requires expression (the `{}` following `requires(...)`), namely:
* simple requirement
* type requirement
* compound requirement
* nested requirement

So lets translate what the above means and how we would use it.

### How to use it

Well we need a template function or a template class that makes use of our concept. Lets stick to the function and leave the class as an exercise to the reader. First thing that grabs your eye should be that this weird concept actually requires two template paramters so our function also needs two. Oherwise the compiler will complain. This is how I would use it.

```cpp
template<typename T, typename U>
void func(T&&) requires OurFirstConcept<T,U>
{};
```

Since we now have a concept using two parameters we actually need the requires clause, at least I could not find a way to do it without, if somebody has one please let me know.

### Simple requirement

Back to our `OurFirstConcept` the first line in the requires expression is called a **Simple Requirement**:

```cpp
= requires(T&& a, U&& b) 
  {
    swap(std::forward<T>(a), std::forward<U>(b));
   ...
  }
```

The first line with `swap` is a simple requirement it just requires that the exression `swap(std::forward<T>(a), std::forward<U>(b))` is valid and does compile, it does not evaluate it. Here is just means there is a function `swap` that can be used to on arguments of type `T` and `U`.  

It could as well be something like `a + b` meaning you defined the `operator+` for the types `T` and `U`.

### Type requirement

```cpp
  = requires(T&& a, U&& b) 
  {
    ...
    typename T::membertype;
    ...
  };
```

Thats quite simple it means what you probably thought: `membertype` is available as a nested **type** within `T`. Notice that membertype must be a **type**, **not a member!** We could use this to make sure that each iterator we pass to a our length function actually defines a type `iterator_category` leading to a clean error message if we pass in integers.

Additionally to requiring nested types you can also require that a template specialization or an alias for a template exists like this

```cpp
  = requires(T&& a, U&& b) 
  {
    typename S<T>; // Requires class S to specialize for the type T.
  };
```

### Compound Requirement

Thats what the 3rd line in the requires expression is called:

```cpp
  = requires(T&& a, U&& b) 
  {
    ...
    { a == b } noexcept -> std::same_as<bool>;
    ...
  };
```

This is kind of an extension of the simple requirement. In addition to the expression `a == b` being valid (it must compile), this also requires a specific return type `bool` as well as that the `operator==` is noexcept, only then this **Compound Requirement** will be fulfilled.

### Nested Requirement

Thats what the last line of our concept declaration is called:

```cpp
  = requires(T&& a, U&& b) 
  {
    ...
    requires std::same_as<T*, decltype(new T)>;
  };
```

I don't know exactly why this is required but I see the `requires` keyword here a little bit like `noexcept` it kinda works by evaluating to a boolean expression similar to `noexcept( noexcept(...))` doubling as a specifier and keyword.

## Putting it all together

So lets finally translate what this means, can you explain what exactly this concept is constrained to?

```cpp
template<typename T, typename U>
concept OurFirstConcept
  = requires(T&& a, U&& b) 
  {
    swap(std::forward<T>(a), std::forward<U>(b));
    typename T::membertype;     
    { a == b } noexcept -> std::same_as<bool>;
    requires std::same_as<T*, decltype(new T)>;
  };
```

The Concept is fulfilled for the types `T` and `U` when all of the following are fulfilled:

* There is a function `swap` that compiles for arguments of type `T` and `U`
* `T::membertype` is an actual type
* The expression `a == b` compiles, is noexcept and returns a boolean
* Allocating `T` with new returns a pointer to `T` 

Granted yup this is pretty arbitrary (and useless) concept, however it serves as an example of all the different ways you can introduce constraints. For a more real worldish example carry on reading.

## A more practical example!

Lets use concepts for something actually useful and make our own observer system. We explore how we can use concepts in a real world use case.

//TODO

# What happens if I have Concepts, Templates and Regular Function Overloads?

Short Answer: **Overload Resolution**

Long Answer: I am not actually sure myself how this works but according to the standard the most constrained/specialized Thing wins. Lets try with an example:

```cpp

//TODO

```


# Trivia

Again C++, so lots of ways to do things. Applying a Concept can be done in one of the following ways, which are all equal...

```cpp
template<typename T>
requires variable_concept<T>
void with_requires_clause(T vc){};

template<variable_concept T>
void replacing_typename(T vc){};

void implicit_template(variable_concept auto vc){}
```

Personally I like the second one best but we will see what will over time become the canonical way to do things. The advantage with the requires clause is that you can use conjunctions and disjunctions within it so you can combine some concepts without the need to create a new one.

```cpp
template<typename T>
requires std::is_integral<T>::value || std::is_floating_point<T>::value
void with_requires_clause(T vc){};
```



* You cannot constrain a concept with a new concept, however you can redeclare the same concept with exactly the same order or constraints.

* Concept as return type
* conept for function parameters
* Requires outside of Concepts

ell other developers what your function expects

# TLDR

Use Concepts to define your Function Interfaces! They provide clearer error messages, earlier error detection and help make your intention clear to other decelopers (This is in my humble opinion the biggest advantage).

# Resources

* [cppreference](https://en.cppreference.com/w/cpp/language/constraints)
* [some basics](https://www.modernescpp.com/index.php/defintion-of-concepts)
* [some more basics](https://studiofreya.com/cpp/concepts/function-and-variable-concepts/)
* [What concepts cannot do](https://brevzin.github.io/c++/2018/10/20/concepts-declarations/)
* [How to test concepts](https://andreasfertig.blog/2020/08/cpp20-concepts-testing-constrained-functions/)
* [A little more about the requires keyword](https://akrzemi1.wordpress.com/2020/01/29/requires-expression/)