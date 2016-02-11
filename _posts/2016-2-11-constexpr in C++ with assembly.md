---
layout: post
title: constexpr in C++ with assembly
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

If we open the assembly code file, we can find the two functions we declared :

```asm
...
_Z4calci:                               # @_Z4calci
...
main:                                   # @main
...
```

Inside the assembly version of function(), we can see the operation that multiplies the given balue by 5 :

```asm
 imul    eax, dword ptr [rbp - 4], 5
```

Let's now modify the C++ code and compile again :

```c++
constexpr int function(const int var)
{
    return var*5;
}

int main() 
{
    const int myConstant = 10;
    constexpr int otherConstant = function(myConstant);
}
```

In the code above, function() returns a constant expression. That means the result of the function "may" be calculated at the compilation time ( and not at the running time ), if the expected value during the call is also a constant expression. That's why we also declare otherConstant as a constant expression.

After compilation, we can open again the generated assembly code :
- the function() body disappeared,
- the main() function directly set the otherConstant variable with the value 50

```asm
mov dword ptr [rbp - 12], 50
```

The calculation of the otherConstant constant expression is done at the compilation time.
