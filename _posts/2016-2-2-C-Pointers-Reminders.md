---
layout: post
title: Basic reminders about C pointers ( in progress )
---

A pointer is a variable. This variable contains the address of another one. This other one can be a primitive type, a structure, an object ( in C++ ) but also another pointer.

A simple example of what a pointer is can be discovered using this simple code :

```c
int variable = 5;
printf("%d", variable);
```

This code will display the value 5.

We now wants to know the address of this variable. This can be done using the following code :

```c
int variable = 5;
printf("%p", (void*)&variable);
```

This code will display the address of the variable. Here, the explicit cast is mandatory because &variable type is int\*, according to the specifications, the second argument type of the printf method must be void\* if the expected format is %p ( p for pointer ).

Pointers can be declared. To declare a pointer, we can simply do :

```c
int* pVariable = NULL;
int variable = 10;
pVariable = &variable;
printf("%p", (void*)pVariable);
```

In the previous example, we first declare a NULL pointer. That means the pointer points on nothing for now. NULL is a define set in stdio.h, and represents a null pointer ( we couldn't directly set a pointer to 0, as 0 is an integer ). At this moment, a new area in memory is allocated to contain an address.

The second line is the declaration of an integer value. At the third line, the address of the variable is used as a value for the pointer.

As we already know, send a variable to a function in C makes a copy of the variable. The new copied variable is then accessible from the function only :

```c
void increment(int var)
{
    var++;
}

void main()
{
    int variable = 5;
    increment(variable);
    printf("%d", variable);
    return 0;
}
```

By running this short code, the digit 5 will be displayed on the screen. 

Now, we do not send the variable itself to the function, but the pointer. Once again, the pointer is copied for the new called function.

```c
void increment(int* var)
{
    *var =+ 1;
}

void main()
{
    int variable = 5;
    increment(&variable);
    printf("%d", variable);
    return 0;
}
```
