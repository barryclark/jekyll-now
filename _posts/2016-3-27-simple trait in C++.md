---
layout: post
title: Using templates to refactor code in C++
---

Instead of inheritence, templates are a wonderful generic programming features to refactor code. Sometimes, we can be in the situation where two classes are totally different, but share a tiny common behavior. Using inheritance is not a solution. Let's imagine we have two classes : FirstType and SecondType. The two classes have no parent in common. They only have one behavior in common : print the content of one class attribute.

FirstType.hpp:
```c++
#ifndef DEF_FIRST_TYPE
#define DEF_FIRST_TYPE

class FirstType
{
    public:
        FirstType();

        void firstTypeFunction();

        int commonValue;
};

#endif
```

SecondType.hpp:
```c++
#ifndef DEF_SECOND_TYPE
#define DEF_SECOND_TYPE

class SecondType
{
    public:
        SecondType();

        void secondTypeFunction();

        int commonValue;
};

#endif
```

FirstType.cpp:
```c++
#include "FirstType.hpp"

#include "HasCommonFunctionPolicy.hpp"

FirstType::FirstType()
{
    commonValue = 10; 
}

void FirstType::firstTypeFunction()
{
    HasCommonFunctionPolicy::commonFunction(this);
}
```

SecondType.cpp:
```c++
#include "SecondType.hpp"

#include "HasCommonFunctionPolicy.hpp"

SecondType::SecondType()
{
    commonValue = 20; 
}

void SecondType::secondTypeFunction()
{
    HasCommonFunctionPolicy::commonFunction(this);
}
```

The common behavior of each class is inside the separated method HasCommonFunctionPolicy::commonFunction(this). In C++, the keyword "this" returns a pointer to the current object. We can know write the common code between the two classes.

HasCommonFunctionPolicy.hpp:
```c++
#ifndef DEF_HAS_COMMON_FUNCTION_POLICY
#define DEF_HAS_COMMON_FUNCTION_POLICY

#include "FirstType.hpp"
#include "SecondType.hpp"

class HasCommonFunctionPolicy
{
    public:
        template<typename T>
        static void commonFunction(T* pObject);
};

#endif
```

Here, we create a template for the common method. This method can accept FirstType and SecondType object pointers.

HasCommonFunctionPolicy.hpp:
```c++
#ifndef DEF_HAS_COMMON_FUNCTION_POLICY
#define DEF_HAS_COMMON_FUNCTION_POLICY

#include "FirstType.hpp"
#include "SecondType.hpp"

class HasCommonFunctionPolicy
{
    public:
        template<typename T>
        static void commonFunction(T* pObject);
};

#endif
```

HasCommonFunctionPolicy.cpp:
```c++
#include "HasCommonFunctionPolicy.hpp"

#include <iostream>

template<typename T>
void HasCommonFunctionPolicy::commonFunction(T* pObject)
{
    std::cout << pObject->commonValue << std::endl;
}

template void HasCommonFunctionPolicy::commonFunction<FirstType>(FirstType* pObject);
template void HasCommonFunctionPolicy::commonFunction<SecondType>(SecondType* pObject);
```

The template has to be specified in both of the definition and the declaration. We have to write each function declaration we need to let the compiler creates them during the compilation time. Let's write a simple program for testing:

main.cpp:
```
#include "FirstType.hpp"
#include "SecondType.hpp"
#include "HasCommonFunctionPolicy.hpp"

int main()
{
    FirstType objectFirstType;
    SecondType objectSecondType;

    objectFirstType.firstTypeFunction();
    objectSecondType.secondTypeFunction();

    return 0;
}
```

We can compile the program using clang++ :

```
clang++ -I . -c -o HasCommonFunctionPolicy.o HasCommonFunctionPolicy.cpp
clang++ -I . -c -o FirstType.o FirstType.cpp
clang++ -I . -c -o SecondType.o SecondType.cpp
clang++ -I . -c -o main.o main.cpp
clang++ main.o HasCommonFunctionPolicy.o FirstType.o SecondType.o -o Program
```

Execute the program will give the following output :
```
10
20
```

Two different objects from two different classes with nothing in common are now using the same method.
