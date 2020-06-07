---
layout: post
tags: c++ c++17 null-conditional template-metaprogramming functional-programming sfinae
#categories: []
date: 2020-06-07
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Implementing a Pipe Syntax for `std::optional` - Part 3: Conditional Compilation'
comments_id: 12
---

This is the last part of my series on a pipe syntax for operations on `std::optional` types. We will look at switching between function overloads at compile time using `std::enable_if` to implement the last puzzle piece we were missing before. I will also show some limitations of my implementation and describe how my pipe operator fits in to the overarching idea of functional programming.

# Implementing an overload for `void` "Transformations"
In a nutshell in the [previous part](blog/2020/optional-pipe-syntax-part-2-template-metaprogramming/) we have developed an operator `|` that takes a transformation $$f:$$`T`$$\rightarrow$$`U`, applies it to a value of type `std::optional<T>`, and returns a value of type `optional<U>`. The result is an empty optional if the argument was empty or else a new optional containing the transformed value. We have explicitly excluded functions returning `void` in our implementation because *transforming* a type to `void` is meaningless.

However, we might want to apply a `void` function to an optional purely for the side effects, e.g. to print the value to screen. In that case we would want to apply the given effectful function only if the given optional is not empty. To make it chainable we return the original optional value. Let's look at the implementation:

```c++
//helper bool that checks whether a callable returns void when invoked with one argument
template<typename F, typename T>
constexpr bool invoke_result_is_void_v = std::is_same_v<void, std::invoke_result_t<F,T>>;

//the pipe operator for optionals taking effectful functions
template<typename T, typename F>
auto operator|(const std::optional<T> & arg, F&& func)
-> std::enable_if_t<detail::invoke_result_is_void_v<F,T>, const std::optional<T>&>
{
	if(arg.has_value())
	{
		std::invoke(std::forward<F>(func), arg.value());
	}
	return arg;
}
```

In the last post I've already gone into some detail about SFINAE, so this implementation does not contain any new concepts. Instead of implementing a struct that will result in SFINAE, I have used the standard library feature [`std::enable_if`](https://en.cppreference.com/w/cpp/types/enable_if). The helper type `std::enable_if_t<condition,T>` compiles to type `T` iff the condition is true. Otherwise it will remove the implementation from the overload set using SFINAE. Let's see what we can do with the complete operator now.

# Applications of the Pipe operator
Let's look at some example code and expand on the example in the previous post. There, I wanted to calculate the square length of an optional string. Now let us stick some console output in there using the newly expanded operator:

```c++
std::optional<std::string> optstr = std::string("Hello Optional World");

auto print_to_console = [](const auto & something)
                        {
                          cout << something<< endl;
                        };

auto square = [](const auto & val){return val*val;};

auto length = optstr
             | print_to_console
             | &std::string::size
             | print_to_console
             | square
             | print_to_console;

cout << "Length is " << length.value_or(0) << endl;
```
We have calculated the size of the string by passing a *member function* to the operator and the squared it using a *generic* lambda. In between we have stuck some console output also using a generic lambda. The result is stored in the variable `length` of type `std::optional<size_t>` which contains the value 400 in this case. The output looks like this:

```
Hello Optional World
20
400
Length is 400
```
Had we applied the same operations to an empty optional, the result would have been an empty optional of type `std::optional<size_t>`. The only console output would have been `Length is 0`.

# Pitfalls and Limitations
Above I have made a fuss about the fact that we can pass all types of functions to the pipe operator. I mean member functions *and* generic lambdas... this all looks pretty neat, right? It is, but there are limitations. So let's have a look.

## Passing Function Templates and Overloads
There is a reason I chose a generic lambda when I wanted to output a value to the console. Could I also have used a function template for `print_to_console` instead of a generic lambda? Let's see. The function template can be implemented as

```c++
template<typename T>
void print_to_console(const T & something)
{
  cout << something<< endl;
}
```
When we try to compile the code from before, we get a whole slew of errors. The crucial one is an error like this:

```
note:   template argument deduction/substitution failed:
23: note:   couldn’t deduce template parameter ‘F’
auto val = optstr1 | print_to_console | &std::string::size | print_to_console | square | print_to_console;
                    ^~~~~~~~~~~~~~~~~
```
The compiler tells us it cannot deduce the type of the callable `F`. This, by the way, has nothing with the `void` overload. We simply [cannot pass a template function](https://stackoverflow.com/questions/15651488/how-to-pass-a-template-function-in-a-template-argument-list) as a template parameter! The compiler has no way of knowing at this point which function template instantiation to pick. Why are we allowed to pass a generic lambda, then? Because [the generic lambda is not a function template](https://en.cppreference.com/w/cpp/language/lambda) but an instance of a Closure Type with a *templated call operator*. The call operator is only invoked inside the operator body and can be correctly instantiated.

A similar problem occurs in case of function overloads. Say we had a function `void print_to_console(std::string)` and one `print_to_console(size_t)`. Again, at the time the function is passed to the operator it is impossible for the compiler to choose the correct overload. Both situations can be remedied by wrapping the function in a generic lambda. This is especially useful for problems with overloaded functions.

## The Price of Chaining Side Effects
In order to avoid making copies of the arguments in the `void` overload, I have chosen to return the initial argument by const reference. Now lets make a minor modification to the code above and make `length` a const refernce.

```c++
const auto & length = optstr
             | print_to_console
             | &std::string::size
             | print_to_console
             | square
             | print_to_console;
```
Then the output might look like this:
```
Hello Optional World
20
400
Length is 4294967295
```
The last line should be `Length is 400` but `length` captures a reference to a temporary that goes out of scope. I don't think this is a very common mistake, but it could happen when passing the result of a pipe operation that is ended with a side effect to a function.

# Relation to Functional Programming
The idea for this operator was inspired by the null conditional operator of C#. Furthermore I was interested in template metaprogramming and functional programming. I have gotten more proficient in both of those disciplines since I had the initial idea, but I am still learning a lot. The other day, I reached Chapter 10 in the excellent [Functional Programming in C++](https://www.manning.com/books/functional-programming-in-c-plus-plus) book by Ivan Čukić. Then I saw that my operator had a close relationship to the concept of a monad, which is often mentionned in the functional programming context. I pretty much implemented a combination of what the author calls the *transform* and *bind* functions for monads. I have just started with monads and I am excited to see how getting deeper into functional programming will shape my understanding of C++ in the future.
