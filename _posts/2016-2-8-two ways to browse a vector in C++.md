---
layout: post
title: Two ways to browse vector in C++
---

##Range-based for loop

This is a new feature of C++ 11. It is now possible to browse an array using a short "for loop" as :

```
int myArray[5] = {1,2,3,4,5};
for (int value : myArray) {
    std::cout << value;
}

std::vector<int> myOtherArray {1,2,3};
for (int value : myOtherArray) {
    std::cout << value;
}
```

You could want update the values of your array. It is possible to make the loop variable a reference :

```
std::vector myArray {1,2,3};
for (int& ref : myArray) {
    ref++;
}
```
