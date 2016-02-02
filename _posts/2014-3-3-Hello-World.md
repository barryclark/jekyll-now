---
layout: post
title: Basic reminders about C pointers
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

This code will display the address of the variable. Here, the explicit cast is mandatory because &variable type is int*, according to the specifications, the second argument type of the printf method must be void* if the expected format is %p ( p for pointer ).
