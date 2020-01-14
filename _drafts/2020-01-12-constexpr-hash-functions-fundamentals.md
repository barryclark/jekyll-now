---
layout: post
tags: c++11 c++17 constexpr functional-programming
#categories: []
#date: 2019-06-25 13:14:15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'constexpr Functions: Fundamentals and Application to Hashing'
---

# Motivation

My primary motivation is to learn more about template metaprogramming and programming at compile time in general. As a pet project I aim to implement hash functions that work at compile time as well as runtime which gives me the opportunity to explore `constexpr` in C++ 11 and beyond.

As the first hash function I chose the simple [djb2 hash function](http://www.cse.yorku.ca/~oz/hash.html) in the XOR variant. It is a very simple algorithm, which nevertheless has some [practical uses](https://github.com/hashcat/hashcat/issues/1925). Let us have a look at the C implementation:



```C
unsigned long hash(unsigned char *str)
{
unsigned long hash = 5381;
int c;
while (c = *str++)
{
hash = (33*hash) ^ c; 
}

return hash; 
}
```

The function takes a C-style string, loops over all its elements until it reaches the zero-terminator, performes the hashing calculation and returns a hash. Nothing too crazy there except from some magical constants (5381 and 33). As a little sidenote: I have used the bitwise xor variant here and also written `hash=(33 * hash)^c` instead of the often cited `hash = ((hash << 5) + hash)` which is just the same thing but less readable. I trust my compiler to optimize the expression.

Let us see how we can transform it into a `constexpr` function that we can execute at compile time or at runtime first in C++ 17 and later on in C++ 11.

# Creating a C++ 17 constexpr djb2 Hash Function

To create a `constexpr` equivalent of the function above we first need an argument type to capture the string. Since we are doing C++ and not C, I would like an argument of a string like type that can be used as a compile time constant expression. Unfortunately this excludes the `std::string` because [it does not have constexpr constructors](https://en.cppreference.com/w/cpp/string/basic_string/basic_string). At least not in C++ 17. No reason to worry, because we can just use the C++ 17 class [std::string_view](https://en.cppreference.com/w/cpp/string/basic_string_view) which can do all kinds of interesting things and compile time string expressions is one of them. Thus we have our signature:

```C++
unsigned long djb2_xor(const std::string_view &); 
```

We could also go one step further and make this a function template of `T` and use a `std::basic_string_view<T>` to bind to all kinds of strings. But I will not bother with that here just for clarity. Next, we have to transform the body of the function. Luckily `constexpr` since C++ 14 has way less limitations than it used to have in C++ 11. This means we can pretty much just copy and paste the body from the C code and be done with it:

```C++
unsigned long constexpr djb2_xor(const std::string_view & str)
{
	unsigned long hash = 5381;
	for(const auto & c : str)
	{
		hash = (33*hash) ^ c;
	}
	return hash; 
}
```
I have replaced the while loop by a range-based for loop but in essence the function body is the original C code. This function can now be used with compile time constant expressions or runtime expressions and will produce the exact same result.

And that's the story if you use C++ 17. If either you are interested in how this could work in C++ 11 or if you are into functional programming then keep reading.

# Going Functional and Making It Work for C++ 11

To make the code from above work for C++ 11 we have to do two things: 

1. We must find an alternative to `std:string_view` because it is only available from C++ 17 onwards.
2. We have to work around the limitations of `constexpr` in C++ 11 compared to C++ 17.

The first problem is easily solved by using `boost::string_view` from the boost/utility library. So the function signature becomes:

```C++
unsigned long constexpr djb2_xor(const std::string_view & str);
```

The second problem is more interesting, because the thibgs a `constexpr` function body is allowed to contain is so limited that I can [cite](https://en.cppreference.com/w/cpp/language/constexpr) it here in its entirety:

> the function body must be either deleted or defaulted or contain only the following: 
> * null statements (plain semicolons)
> * static_assert declarations 
> * typedef declarations and alias declarations that do not define classes or enumerations 
> * using declarations 
> * using directives 
> * exactly one return statement

That is not a lot we can do. But we will see that restrictions can also be a good thing. They force us to program in a way that e.g. functional programming enthusiasts will consider superior.

So with all those restrictions we can see that `for` loops are out of the question. That means we have to implement the function recursively. Looking at the way the function works it is not hard to see how to implement it recursively. There is, however, one thing that we should always try to do: implementing functions as *tail-recursive*. This gives any decent compiler the chance to [optimize](https://en.m.wikipedia.org/wiki/Tail_call) the code and avoid the dreaded stack overflow. For this we have to have the function call itself (or return a value) as the last piece action of the function. If we tried to multiply to return value of the recursively called function by a factor that would not be tail-recursive because that multiplication would be the last operation in the function.

## Tail-Recursive Implementation
We first need to create a helper implementation that loops through the characters of the string. So we need at least the string and the current position as function arguments. This would be enough if we did not want the function to be tail-recursive. But to make it tail-recursive we need one more argument and that is the hash value from the previous iteration. So the signature for the helper function is:

```C++
unsigned long constexpr djb2_xor_impl(const boost::string_view & strview, size_t idx, unsigned long hash);
```

All we need to do is to calculate the new hash from the previous value `hash` and the character at the given index `idx`. Then we feed this hash into the next call with the same string argument and the position argument `idx+1`. The recursion terminates when the index is outside the boundaries of the string. There is only one more thing we have to account for. We cannot have an if statement in a C++ 11 `constexpr` function. We can solve this problem using the ternary operator `? :` and finally we have:

```C++
unsigned long constexpr djb2_xor_impl(const boost::string_view & strview, size_t idx, unsigned long hash);
{
	return (idx>=strview.length()) ? hash : djb2_xor_impl(strview,idx+1,(33*hash)^strview[idx]); 
}	
```
As a nice and clean interface we provide a function for the user that initializes the recursion with the start index of zero and the initial magical hash value of 5381:

```C++
unsigned long constexpr djb2_xor(const boost::string_view & strview);
{
	return djb2_xor_impl(strview, 0, 5381); 
}	
```
That is it. We have written a *pure function* that can calculate the djb2 hash of a string from C++ 11 onwards at compile time or at runtime.

# Code
The code in this article can be found in my [cotiha](https://github.com/geo-ant/cotiha) repository on github.
