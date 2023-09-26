---
layout: post
title: Go learn about std::span
---

Hello everyone! Today I'd like to highlight something
magical: `std::span`.

---

# What is `std::span` ?

Simply put `std::span` is a pointer and a size.

Another way to think about is `std::span` is to
`std::vector` the same way as `std::string_view`
is to `std::string`.

Any time you need to observe/view some contigious
data it's preferable to use an `std::span` over
something like `std::vector &` or
`const std::vector &`.

This gives you nice copy properties and abstracts
away the containing object.

I love using const to improve the reliability
of code. span is a natural extention of that
because now the entire containing object is
considered constant because users of the span
have no indication of what the containing object
is.

In theory span should also help with better cache
locality also since you're only loading the data
and entirely avoiding the container's data.

Ownership also plays a part here, say you want
the user to pass in a set of elements and you're
going to modify them but want to make it clear
you won't add or delete any. `std::span<int>`
retains the ability to modify the elements but
not the surrounding structure.

---

## How do you use it?

A simple example of how to use this code is say
you'd like to find the minimum of an unsorted
array.  You might write that code in the following
way:

```cpp
#include <iostream>
#include <vector>

template<typename T>
T min(const std::vector<T> & data)
{
  T ret = data.front();
  for(int i = 1; i < data.size(); i++)
  {
    if(data[i] < ret)
      ret = data[i];
  }
  return ret;
}

int main(void)
{
  const std::vector<int> data{64, 89, 21, 64, 98, 03, 26, 90, 48, 30, 92, 14, 98, 32, 17};
  std::cout << min(data) << std::endl;
  return 0;
}
```

Instead you'd write:
	
```cpp
#include <iostream>
#include <span>
#include <vector>

template<typename T>
T min(std::span<const T> data)
{
  T ret = data.front();
  for(int i = 1; i < data.size(); i++)
  {
    if(data[i] < ret)
      ret = data[i];
  }
  return ret;
}

int main(void)
{
  const std::vector<int> data{64, 89, 21, 64, 98, 03, 26, 90, 48, 30, 92, 14, 98, 32, 17};
  std::cout << min(std::span{data}) << std::endl;
  return 0;
}
```

---

## When should you use it?

There's a nice [stackoverfow](https://stackoverflow.com/questions/45723819/what-is-a-span-and-when-should-i-use-one)
post that talks about when _not_ to use a std::span.
One of those cases is in cases where begin and end iterators
would be better. You could definitely argue in my above 
example it would be better off using `begin` and `end`
iterators.

That same stackoverflow post also mentions many reasons
why `std::span` is awesome. I strongly recommend you check
it out.

I'll be honest I'm personally looking for more cases of when
to use `std::span` instead of begin/end iterators; however
I'll definitely say that `std::span` seems to be much better
than `std::vector &`

---

In conclusion I hope this gets you curious about `std::span`.
With the advent of C++20 `std::span` will be come much more
common in C++ code and I'm definitely excited about that.

Thanks for your time,
Tyler Sean Rau

