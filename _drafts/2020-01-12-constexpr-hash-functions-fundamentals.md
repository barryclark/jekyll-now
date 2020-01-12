---
layout: post
tags: c++11 c++17 constexpr functional-programming
#categories: []
#date: 2019-06-25 13:14:15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'constexpr Hash Functions - Fundamentals'
---

# Motivation

My primary motivation is to learn more about template metaprogramming and programming at compile time in general. As a pet project I aim to implement hash functions that work at compile time as well as runtime which gives me the opportunity to explore ˋconstexprˋ in C++ 11 and beyond.

As the first hash function I chose the simple [djb2 hash function](http://www.cse.yorku.ca/~oz/hash.html) in the XOR variant. It is a very simple algorithm, nevertheless it has some [practical uses](https://github.com/hashcat/hashcat/issues/1925). Let us have a look at the C implementation and see how we can transform it into a ˋconstexprˋ function that we can execute at compile time or at runtime first in C++17 and later on in C++11.

ˋˋˋC
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
ˋˋˋ 

The function takes a C-style string, loops over all its elements until it reaches the zero-terminator, performes the hashing calculation and returns a hash. Nothing too crazy there except from some magical constants (5381 and 33). As a little sidenote: I have used the bitwise xor variant here and also written ˋhash=(33 * hash)^cˋ instead of the often cited ˋhash = ((hash << 5) + hash)ˋ which is just the same thing but less readable. I trust my compiler to optimize the expression.

Now let us get into transforming this piece of C code into a C++17 constant expression.

# Creating a C++ 17 constexpr djb2 hashing function

To create a ˋconstexprˋ equivalent of the function above we first need an argument type to capture the string. Since we are doing C++ I would like an argument of a string like type that can be used as a compile time constant expression. Unfortunately this excludes the ˋstd::stringˋ because [it does not have constexpr constructors](https://en.cppreference.com/w/cpp/string/basic_string/basic_string). At least not in C++ 17. No reason to worry, because we can just use the C++ 17 class [std::string_view](https://en.cppreference.com/w/cpp/string/basic_string_view) which can do all kinds of interesting things and compile time string expressions are one of them. Thus we have our signature:

ˋˋˋC++
unsigned long djb2_xor(const std::string_view &); 
ˋˋˋ 

We could also go one step further and make this a template function of ˋTˋ and use a ˋstd::basic_string_view<T>ˋ to bind to all kinds of strings. But I will not bother with that here just for clarity. Next, we have to transform the body of the function. Luckily ˋconstexprˋ since C++ 14 has way less limitations than it used to have in C++ 11. This means we can pretty much just copy and paste the body from the C code and be done with it:

ˋˋˋC++
unsigned long constexpr djb2_xor(const std::string_view & str)
{
	unsigned long hash = 5381;
	for(const auto & c : str)
	{
		hash = (33*hash) ^ c;
	}
	return hash; 
}
ˋˋˋ
I have replaced the while loop by a range-based for loop but in essence the function body is pretty much the C code from above. That's it. This function can now be used with compile time constant expressions or runtime expressions and will produce the exact same result.

And that's the story if you use C++ 17. If either you are interested in how this could work in C++ 11 or if you are a strict functional programmer that cannot stand for loops then keep reading.

