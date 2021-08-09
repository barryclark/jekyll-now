---
layout: post
title: More const voodoo
---

Hello everyone! I'm back with another post about
`const`. Recently, I've learned of a strange behavior
when it comes to `const` qualified member functions.

---

Consider the program:

```cpp
#include <cstdio>
#include <memory>

class Foo
{
  private:
    int * x;
  public:
    Foo(int * x):x(x){}
    void bar(void) const
    {
      *x = 1;
      std::printf("%d\n", *x);
    }
};

int main(void)
{
  int x = 5;
  const Foo foo(std::addressof(x));
  foo.bar();
}
```

Do you think this program will compile?

Lets find out, g++ 8.3.0 tells me:

```
$ g++ k.cpp
$ ./a.out
1
$
```

I certainly did not think it would compile. `Foo::bar()`
is `const` qualified and since `x` is modified I thought
for sure this would fail to compile.

If I change this to:

```cpp
#include <cstdio>
#include <memory>

class Foo
{
  private:
    int * x;
  public:
    Foo(int * x):x(x){}
    void bar(int * a) const
    {
      x = a;
      std::printf("%d\n", *x);
    }
};

int main(void)
{
  int x = 5;
  const Foo foo(std::addressof(x));
  int b = 10;
  foo.bar(std::addressof(b));
}
```

Rightly so, g++ 8.3.0 tells me:

```
$ g++ k.cpp
k.cpp: In member function ‘void Foo::bar(int*) const’:
k.cpp:12:11: error: assignment of member ‘Foo::x’ in read-only object
       x = a;
           ^
```

This to me indicates that within `const` qualified
member functions member variables that are pointer
types are considered `T * const` rather than `const T *`
(or `T const * ` if you're an east-`const`er)

What??? Why is it this way???

This extends out to references also:

```cpp
#include <cstdio>

class Foo
{
  private:
    int & x;
  public:
    Foo(int & x):x(x){}
    void bar(void) const
    {
      x = 1;
      std::printf("%d\n", x);
    }
};

int main(void)
{
  int x = 5;
  const Foo foo(x);
  foo.bar();
}
```

The above example will compile and give the same
result as the first.

---

Let's try to explain this behavior. I know that `const`
qualifying a member function makes it so that the implicit
`this` pointer is `const` qualified. Lets change our example
to make this more obvious.

```cpp
#include <cstdio>
#include <memory>

struct Foo
{
  int * x;
};

void bar(const Foo * this_)
{
  *this_->x = 1;
  std::printf("%d\n", *this_->x);
}

int main(void)
{
  int x = 5;
  const Foo foo{std::addressof(x)};
  bar(std::addressof(foo));
}
```

This makes it clearer why the original code is working, but
it's still not clear to me why when we reach through a `const Foo *`
the `int * x` isn't also `const`.

---

If the code is changed to something like:

```cpp
#include <cstdio>
#include <memory>

struct Foo
{
  int * x;
};

void bar(const Foo * this_)
{
  static int a = 5;
  this_->x = &a;
  std::printf("%d\n", *this_->x);
}

int main(void)
{
  int x = 5;
  const Foo foo{std::addressof(x)};
  bar(std::addressof(foo));
}
```

Then g++ 8.3.0 tells me:

```
$ g++ k.cpp
k.cpp: In function ‘void bar(const Foo*)’:
k.cpp:12:15: error: assignment of member ‘Foo::x’ in read-only object
   this_->x = &a;
               ^
```

So it does seem like it's treated as `int * const`.

---

I change the code once more to use a reference:

```cpp
#include <cstdio>
#include <memory>

struct Foo
{
  int & x;
};

void bar(const Foo * this_)
{
  this_->x = 1;
  std::printf("%d\n", this_->x);
}

int main(void)
{
  int x = 5;
  const Foo foo{x};
  bar(std::addressof(foo));
}
```

then this works fine, but this time I can't explain
where the `const` has gone. I assume this works
because the machine code under the hood works the
same way as before. Disecting the mess that is
[Built-in member access operators](https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_member_access_operators)
leaves me with more questions than answers.

---

If we rewrite the example using strict C

```cpp
#include <stdio.h>

struct Foo
{
  int * x;
};

void bar(const struct Foo * this_)
{
  *this_->x = 1;
  printf("%d\n", *this_->x);
}

int main(void)
{
  int x = 5;
  struct Foo foo;
  foo.x = &x;
  bar(&foo);
}
```

then I can get some clarity from
[C member access through pointer](https://en.cppreference.com/w/c/language/operator_member_access#Member_access_through_pointer)
which clearly says

```
If the type pointed to by the left operand is const or volatile qualified, the result is also qualified.
```

One day I'll get the motivation to clarify that the C++
definition has equivalent language to mean the same thing.

So all in all with these examples we've come to learn of
a, at least in my opinion, strange quark in C++ and C.

---

In regards to C++ there is one additional that can help
remove this weirdness. [`std::experimental::propagate_const`](https://en.cppreference.com/w/cpp/experimental/propagate_const)
makes it so that pointers and references give access to
const objects when acted on in const methods.

If we look back on the original code we started with:

```cpp
#include <cstdio>
#include <memory>

class Foo
{
  private:
    int * x;
  public:
    Foo(int * x):x(x){}
    void bar(void) const
    {
      *x = 1;
      std::printf("%d\n", *x);
    }
};

int main(void)
{
  int x = 5;
  const Foo foo(std::addressof(x));
  foo.bar();
}
```

We can change it to the following:

```cpp
#include <cstdio>
#include <memory>
#include <experimental/propagate_const>

class Foo
{
  private:
    std::experimental::propagate_const<int *> x;
  public:
    Foo(int * x):x(x){}
    void bar(void) const
    {
      *x = 1;
      std::printf("%d\n", *x);
    }
};

int main(void)
{
  int x = 5;
  const Foo foo(std::addressof(x));
  foo.bar();
}
```

Now g++ 8.3.0 tells me:

```
$ g++ k.cpp
k.cpp: In member function ‘void Foo::bar() const’:
k.cpp:13:12: error: assignment of read-only location ‘((const Foo*)this)->Foo::x.std::experimental::fundamentals_v2::propagate_const<int*>::operator*()’
       *x = 1;
            ^
```

Which makes all well in the world for me. :) <3
