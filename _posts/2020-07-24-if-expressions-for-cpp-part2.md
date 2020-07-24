---
layout: post
tags: constexpr c++11 c++17 if-expression rust
#categories: []
date: 2020-07-24
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Replacing the Ternary Operator with Rust-style If Expressions in C++11 - Part 2'
comments_id: 14
---
In this part we will complete the implementation of the `if` expression to replace the ternary operator. Furthermore, we will look into limitations and extensions of the implementation.

In the [previous part](/blog/2020/if-expressions-for-cpp-part1/) we have looked at implementing an `if...else...` expression which effectively replaces the ternary operator. To make it really useful we have to implement `else if...` branches as well and we will start with that.

# Additional Branches with `ElseIf`
Following the logic of the previous article, we create new methods and types for the `else...if` branch to implement that part of the logic. We obviously need an `ElseIf` method on the `If_Then` type. This method returns another type (call it `If_Then_Else_If`) containing all the necessary information of the chain up to that point. It is composed of a `bool` condition value, a value of type `T` in case the `bool` is `true`, and another `bool` value for the `ElseIf` condition. However, this is where the necessity of creating new expression helper types stops. Because as soon as we call the `Then` method of this type, we only need to remember the first value whose condition is true (if any). We then package the result as a call to an `If(...).Then(...)`. Let's first look at the `If_Then_Else_If` type:

```c++
template<typename T>
class If_Then_Else_If
{
public:
    constexpr If_Then<T> Then(T t_now) const &&  {
        return (previous_condition)? If(true).Then(previous_t) : If(condition_now).Then(t_now);
    }
private:
    constexpr If_Then_Else_If(bool _previous_condition, T  _previous_t, bool _condition_now)
    : previous_condition(_previous_condition), previous_t(_previous_t),
    condition_now(_condition_now)
    {}

    bool previous_condition;
    T previous_t;
    bool condition_now;
    friend class If_Then<T>;
};
```
Now we can add an `ElseIf` method to our `If_Then` type:

```c++
template<typename T>
class If_Then
{
public:
    //-- see previous implementation --

    //this is new:
    constexpr If_Then_Else_If<T> ElseIf(bool condition_elseif) const && {
        return If_Then_Else_If<T>(condition,t,condition_elseif);
    }
private:
    // -- see previos implementation --
};
```

And that is how we can stick an `ElseIf` in there. Once the `Else` method on a chain of conditions is called, the first value whose condition evaluates to true is returned. If no such value exists, the value given to `Else` is returned.

# `constexpr` All The Things
You might have already noticed that I snuck a `constexpr` in every constructor and method. So if all conditions and values are `constexpr`, the whole expression can be evaluated at compile time. We can use the result in all places that require a compile time constant expression. In this case, we don't pay at runtime and we have an expressive syntax for evaluating compile time constants.
```c++
//planar_coordinates is a compile time bool
//maybe it came from a class template argument list
using coordinates = std::array<double,If(planar_coordinates).Then(2).Else(3)>;
```
In the example above example, we use the if expression to fix the size of an array at compile time.

# Problems, Limitations and Improvements
Finally, I want to go over some limitations and improvements of my implementation. This list is not complete, and there are probably many more things that could be done to improve the implementation even more.

## Fixing the Desired Return Type for Different Arguments
Say we wanted to initialize a string depending on some condition like so:
```c++
//this will produce a compiler error:
std::string str = If(is_french).Then("Bon Jour").Else("Hello");
```
This will give us a compiler error[^char_ternary]. The way to make this compile is to be explicit about the type in the first `Then` method. We do this by writing
```c++
std::string str2 = If(is_french).Then(std::string("Bon Jour")).Else("Hello");
//or equivalent:
std::string str  = If(is_french).Then<std::string>("Bon Jour").Else("Hello");
```
We just have to be explicit in the first `Then` method. This is because that method is templated and it passes the deduced type to all other expression helper types down the line. Those can take advantage of converting constructors.

## Eager Evaluation in Then Clauses
A problem of my implementation is that every temporary passed to a `Then` method is constructed *eagerly*. That means it is *always* constructed and not only when its corresponding condition is actually `true`. I have experimented with implementing a `Then_Lazy` method taking a type `std::function<T(void)>`, which produces the type only when it is necessary. Thinking about lazy evaluation too much made me lazy myself and I ended up not implementing it. After all, I didn't feel it would be a giant improvement for common use cases. However, it is something to keep in mind for types that drain a lot of resources upon construction.

## Taking Advantage of Move Semantics
In the implementations given in these posts, I have taken all arguments of type `T` by value. I did not perform any calls to `std::move` for clarity. In my repository I made the effort to overload all methods and constructors for `const` lvalue references as well as rvalue references to `T`. Furthermore I have made use of `std::move` and `std::forward` to avoid copies wherever possible. This leads to more efficient code for movable types[^move_and_const].

I have chosen move semantics over making the class members themselves references, because that would send me to the [C++ lifetime purgatory](https://stackoverflow.com/questions/2784262/does-a-const-reference-class-member-prolong-the-life-of-a-temporary). I experimented with using reference members and it seemed to work (when it probably shouldn't have), but also I feel as though it is very thin ice. So I kept away from that for now.

# Code and Conclusion
This was my shot at mimicking Rust-style `if` expressions in C++. These expressions are way more powerful in Rust because expressions are a more natural part of the language than in C++. This is why I only targeted the niche case of conditional initialization. I wonder how useful my implementation is at the end of the day, but the journey was fun for sure. The code is available as part of my [func++ repository](https://github.com/geo-ant/funcpp) on Github.

# Endnotes

[^move_and_const]: Note that the member functions of the expression helper classes cannot be `const` when we want to move out of the expression objects. This oversight caused me more headache than it should have.
[^char_ternary]: If we tried to write `std::string str = (is_french)?"Bon Jour":"Hello";` we would also get a compiler error, albeit for a slightly different reason.
