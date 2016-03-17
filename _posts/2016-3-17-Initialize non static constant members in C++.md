---
layout: post
title: Use initialization list to set non-static constants
---

In C++, the non static constant class members have to be set using initialization list.

```c++
class A
{
public:
    const int MY_CONSTANT;
    
    A(int myConstant) : MY_CONSTANT(myConstant) 
    {
    }
};

int main() {
    
    A obj(10);    // MY_CONSTANT = 10

    return 0;
}
```

This won't work if MY_CONSTANT is static.

Initialization lists can be used with inheritance:

```c++
class A
{
public:
    const int MY_CONSTANT;
    
    A(int myConstant) : MY_CONSTANT(myConstant) 
    {
    }
};

class B : public A
{
public:
    
    B(int myConstant) : A(myConstant)
    {
    }
};

int main() {
    
    A obj(10);    // MY_CONSTANT = 10
    B obj(20);    // MY_CONSTANT = 20

    return 0;
}
```
