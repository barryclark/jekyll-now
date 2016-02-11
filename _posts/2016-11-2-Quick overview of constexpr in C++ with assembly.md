---
layout: post
title: Quick overview of constexpr in C++ with assembly ( in progress )
---

In this tutorial, I explain the main purpose of "constexpr" in C++. In order to understand easily, I use assembly code, generated during the C++ program compilation.

According to the C++ 11 specifications, the "constexpr" specifier means : declares that it's possible to evaluate the value of the function ( returned value ) or the value of the variable at the compilation time.

To understand, let's create a simple program in C++ :
```c++
const int function(const int var)
{
    return var*5;
}

int main() 
{
    const int myConstant = 10;
    const int otherConstant = function(myConstant);
}
```

In this simple code, we declare a first constant with the value 10. We use the constant in a function to generate a second constant.

We can now compile the C++ code by generating the assembly code in a separated file :

```
clang++ -S -mllvm --x86-asm-syntax=intel -std=c++11 main.cpp
```
