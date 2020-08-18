---
layout: post
tags: c++17 variadic-templates template-metaprogramming coding-kata
#categories: []
date: 2020-09-15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'A Compile Time Implementation of FizzBuzz using Template Metaprogramming in C++17'
comments_id: 16
---

I recently got it into my head to write a compile time version of the [FizzBuzz Coding Kata](https://codingdojo.org/kata/FizzBuzz/). Coding Katas are a great way of improving our programing skills, so why not use them to improve our *metaprogramming* skills as well? Here's what I came up with.

# Introduction
Let's first look at the kata and set the goals I aim to accomplish.

## The FizzBuzz Kata
The kata poses the following problem:

> Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz “.
>
>  &mdash; [codingdojo.org](https://codingdojo.org/kata/FizzBuzz/)

Simple enough, but since we are doing metaprogramming we have to say what we mean by "printing". Printing the result at runtime is fine by me, but the result itself has to be generated at compile time. This can be verified by putting the result itself into a compile time constant expression.

## My Goals
I want to keep the program conceptually simple, because metaprogramming adds a great deal of complexity anyways. But I don't want a dumb solution either. The stated goals of the kata are teaching the [Baby Steps](https://codingdojo.org/BabySteps/) approach and [Test Driven Development](https://codingdojo.org/TestDrivenDevelopment/). I'll keep the first, but skip the latter for today's exercise. So Baby Steps is my zeroth goal when implementing the program and it will also dictate the structure of this post.

I have two more goals: Firstly, the program should be able to accept arbitrary lists of numbers to which to apply the FizzBuzz algorithm. Secondly, to make it a little harder and practice my Clean Code skills, the program should adhere to the [Open Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). That means I want a somewhat general way of replacing numbers with words according to certain rules. For example, I want to be able to add a rule where every number greater than 10 also gets appended a "Boo", without the need to modify existing functionality. Let's begin our baby steps with that principle, but first we must briefly look at an important prerequisite.

## Preliminaries: Compile Time Constant Strings with `StrLit`
The core task of the program is to replace numbers with strings. Since we are doing compile time programming, we need compile time strings. Those strings must also allow for concatenation. Even C++17 doesn't have something that meets our requirements, but luckily there is a brilliant post on [Andrzej's C++ blog ](https://akrzemi1.wordpress.com/2017/06/28/compile-time-string-concatenation/) covering exactly that topic. I have used his ideas to implement [a template class `StrLit` in C++17](https://github.com/geo-ant/CompileTimeKatas/blob/master/include/util/strlit.hpp). The class owns the character array used to represent the string, and it is fully `constexpr` capable. The class is templated on a `size_t N` so that it's full type is `StrLit<N>`, where `N` is the number of characters (excluding the final zero terminator). Thanks to C++17 deduction guides we can write:

```c++
//type: StrLit<5>
constexpr StrLit str1("Hello");
//type: StrLit<7>
constexpr StrLit str2(", World");
```
Furthermore we can concatenate the strings using the `operator+` to produce a new `StrLit` like so:

```c++
//equivalent to: StrLit<12>("Hello, World")
constexpr StrLit concat = str1+str2;
```
And finally, I have also overloaded the `operator<<` so we can print it (at runtime) using `cout`. There are a few other methods which we will understand in context. All relevant methods are `constexpr` qualified. So much for this class, but now let's dive into the kata itself.

# The Rules of The Game

## The Concept of a Rule
For me, a FizzBuzz Rule is a metafunction that takes a number and returns a compile time constant `StrLit` as a result[^optional]. If a rule returns an empty string, then the number is not meant to be replaced. Otherwise the number is meant to be replaced by that string. Later, all given rules in a list are evaluated in order and the resulting strings are appended to each other. If the final concatenated string is still empty, just the number itself meant to be returned as a result.

By the way: in C++17 there is no way to formalize the concept of a rule other than in the documentation. This is one of the things about template metaprogramming where C++20 concepts could really come in handy.


## Implementing a Rule
In normal C++ programming, a rule would be some kind of callable that accepts a number as an argument and returns a string. Metaprogramming means programming with types and compile time constant values. That means our metafunctions are mostly templated types and their arguments commonly move to the template argument list. These are the Fizz and Buzz rule types:

```c++
template<size_t number>
struct fizz_rule_t {
    static constexpr auto get_replacement_word() {
        if constexpr(number % 3==0 && number != 0) {
            return StrLit("Fizz");
        } else {
            return StrLit("");
        }
    }
};

template<size_t number>
struct buzz_rule_t {
    static constexpr auto get_replacement_word() {
        if constexpr(number % 5==0 && number!=0) {
            return StrLit("Buzz");
        } else {
            return StrLit("");
        }
    }
};
```
You can see that I implemented the rules in such a way that you call them as `rule_t<number>::get_replacement_word()` where `number` is a compile time constant integer[^rules_alternatives]. Note that the functions return different types[^diff_types], depending on the template parameter `number`. We use conditional compilation with `if constexpr` to return the appropriate result at compile time. Furthermore the `auto` keyword deduces the correct type depending on the branch of the `if constexpr`.

Now we can invoke the result of a rule like so:

```c++
constexpr size_t three = 3;
constexpr size_t four = 4;

//contains StrLit("Fizz")
constexpr StrLit s3 = fizz_rule_t<three>::get_replacement_word();
//contains StrLit("")
constexpr StrLit s4 = fizz_rule_t<four>::get_replacement_word();
```

# Applying a List of Rules to a Single Number
For the next step I want to apply a given list of rules to one single number. The result is the concatenated replacement words for all rules in order. It might still be an empty string. A way of doing that is to create a type that takes a number `num` of type `size_t`, and list of rules `Rules` as variadic template arguments. A member field `replacement_word` of type `StrLit<N>` then contains the concatenated string. This field is calculated recursively.


```c++
template<size_t num, template<size_t> typename Rule, template<size_t...> typename ...Rules>
struct apply_rules_to_number {
    constexpr static StrLit replacement_word = Rule<num>::get_replacement_word() + apply_rules_to_number<num, Rules...>::replacement_word;
};

///specialization of for the end of the recursion (single rule)
template<size_t num, template<size_t> typename Rule>
struct apply_rules_to_number<num,Rule> {
    constexpr static StrLit replacement_word = Rule<num>::get_replacement_word();
};
```
Let's look at the second struct first, which specializes the general case for just one rule. We can see that the replacement word gets chosen according to the rule. What makes the template parameter list complicated is that the `Rule` template parameter is in fact a *template template* parameter. This is a construct that is [not commonly used](https://stackoverflow.com/questions/213761/what-are-some-uses-of-template-template-parameters) in regular C++. Here we need it to specialize the rule according to the given number.

Now lets look at the recursion case above, which has a lot going on. Firstly, we have to specify a `Rule` and a variadic pack of `Rules`. It is a common pattern in TMP to split the head of a list of items from its tail. What makes it complicated, again, is that both items are template template parameters. The list of Rules is a pack of template template parameters. Honestly, I was pretty amazed that this works [^template_template_variadic]. The member `replacement_word` of the struct (which is a compile time constant) is assigned to with a recursive call. The recursive call just uses the remaining tail of the rules. This is how the the type can be used to get the concatenated result of two rules:

```c++
//contains StrLit("FizzBuzz")
constexpr StrLit replacement = apply_rules_to_number<15, fizz_rule_t, buzz_rule_t>::replacement_word;
```

# Counting a Single Number Aloud
The next step is to get the result of counting aloud for a single number, given the rules of the game. The beauty with template metaprogramming is that our result type can vary depending on the number. That means we can really return an integer if none of the rules apply, or otherwise return the concatenated replacement word as a `StrLit`. Let that sink in: we don't need to represent the numbers as `StrLit` types but we can really return the numbers themselves *as integers*. I find that beautiful.

```c++
template<size_t number, template<size_t> typename ...Rules>
struct count_aloud_with_rules {
    constexpr static auto result() {
        constexpr StrLit replacement_word = apply_rules_to_number<number, Rules...>::replacement_word;
        if constexpr (replacement_word.is_empty()) {
            return number;
        } else {
            return replacement_word;
        }
    }
};
```

We have again used the techiques described above: compile time branching, variadic template template arguments, and  `auto` return type deduction. Here's how we can use it:

```c++
//equivalent to size_t two = 2;
constexpr auto two = count_aloud_with_rules<2,fizz_rule_t, buzz_rule_t>:::result();
//equivalent to StrLit three = StrLit("Fizz");
constexpr auto three = count_aloud_with_rules<3,fizz_rule_t, buzz_rule_t>:::result();
//equivalent to StrLit fifteen = StrLit("FizzBuzz");
constexpr auto fifteen = count_aloud_with_rules<15,fizz_rule_t, buzz_rule_t>:::result();
```
Note that *all* variables above have different types: `two` is of type `size_t`, while `three` and `fifteen` are of type `StrLit<4>` and `StrLit<8>`, respectively.

# Counting a List of Numbers
Now for the final piece of the puzzle, which is counting a list of numbers aloud according to a list of rules. We pass the list of numbers as an `std::index_list` and produce a `std::tuple` as a result that corresponds to the results of counting these numbers aloud. I have talked about [index lists and how to use them](/blog/2020/stream-insertion-for-tuples/) in a different post in more detail, so I'll just present the result here[^caveat]:

```c++
template<template<size_t...> typename ...Rules,size_t... numbers>
constexpr auto fizzbuzz_count_numbers(std::index_sequence<numbers...>)
{
    static_assert(sizeof...(numbers)>0, "Numbers must not be empty!");
    return std::tuple{count_aloud_with_rules<numbers,Rules...>::result()... };
}
```

# Obtaining and Printing the Result
Now in our `main` function we can calculate the resulting tuple as a compile time constant expression. Using our `operator<<` for tuples from [here](/blog/2020/stream-insertion-for-tuples/), we can also print it (at runtime).

```c++
int main() {
  //calculate at compile time
  constexpr auto fizzbuzz_result = fizzbuzz_count_numbers<fizz_rule_t,buzz_rule_t>(std::make_index_sequence<100>{});
  //print at runtime
  std::cout << fizzbuzz_result << std::endl;
}
```

# Conclusion and Code
That's it. A FizzBuzz implementation at compile time with expandable rules and arbitrary lists of numbers. There's surely ways to make this more elegant, but I was pretty happy that I got it working at all. Finally, the astute reader will have noticed that the sequence of numbers goes from 0-99 instead of 1-100. Consider this homework ;)

You can find the code in my [GitHub repository](https://github.com/geo-ant/CompileTimeKatas).

# Endnotes
[^optional]: If I had wanted to be more in line with Functional Programming idioms (or Rust) I could have made the return type an `std::optional`. I decided against it, because any string type has a reasonably good representation for a `null` or `None` value. It's just the empty string `""`.
[^rules_alternatives]: An alternative idiom is to implement a constexpr call operator with the same functionality. The result would then be invoked by default constructing a value of that type and using it's call operator, e.g. `buzz_rule_t<5>()()`.
[^diff_types]: Yes, `StrLit<0>` and `StrLit<N>` are different types! Do not be fooled that they are based on the same class template.
[^template_template_variadic]: The pack of rules can also be passed as `template<size_t> typename ...Rules` but I'll leave it like that to remind myself of how to pass variadic template variadic templates. Inception...
[^caveat]: I first accidentally used `{(count_aloud_with_rules<numbers,Rules...>::result(),...)}` in the initialization of the tuple. This will always leave the tuple with one element because the [comma operator](https://en.cppreference.com/w/cpp/language/operator_other) discards the rest of the expression. This kind of expression has other use cases, see e.g. [there](/blog/2020/stream-insertion-for-tuples/), but it's not what we want here.
