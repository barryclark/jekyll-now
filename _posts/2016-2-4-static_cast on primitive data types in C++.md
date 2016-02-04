---
layout: post
title: static_cast on primitive data types in C++ ( in progress )
---

##Reminders about types conversions

###Implicit conversions

In C/C++, some types conversions are implicit, also called standard conversion. When a small type is converted to a bigger type, we call the action a "promotion" and we are sure the value of the variable won't be modified by the conversion. For example : unsigned char into int, float into double. These seconds data types have more space than the first ones to store the variable.

Note : a conversion from a float to an integer is always a truncated result value ( for example, 3,89 becomes 3 ), a conversion from a true boolean to a numeric value is always 1, a conversion from a false boolean to a numeric value is always 0.

###Type casting

```c
int myInteger = 2000;
char myCharacter = 0;
myCharacter = (char) myInteger;
```

By executing the code above, put the value 2000 inside a "char" variable succeeds but as 2000 is larger than the maximum char type value, the value will be modified. Use the "(cast)" directive makes the conversion explicit ( and also the potential loss of data ).

##static_cast in C++

There are four different types of conversions in C++ : static_cast, const_cast, dynamic_cast and reinterpret_cast. These four types conversions have been added as C++ also introduce inheritance and templates. These two last features make types conversions complex.

static_cast is used for ordinary type conversions in C++. Actually, the code above could be written like this in C++ :

```c
myCharacter = static_cast<char>(myInteger);
```
