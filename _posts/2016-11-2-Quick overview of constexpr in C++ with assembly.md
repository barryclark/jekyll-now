---
layout: post
title: Quick overview of constexpr in C++ with assembly
---

In this tutorial, I explain the main purpose of "constexpr" in C++. In order to understand easily, I use assembly code, generated during the C++ program compilation.

According to the C++ 11 specifications, the "constexpr" specifier means : declares that it's possible to evaluate the value of the function ( returned value ) or the value of the variable at the compilation time.

To understand, let's create a simple program in C++ :
```
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
