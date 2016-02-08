---
layout: post
title: Two ways to browse vector in C++
---

##Range-based for loop

This is a new feature of C++ 11. It is now possible to browse an array using a short "for loop" as :

```c++
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

```c++
std::vector myArray {1,2,3};
for (int& ref : myArray) {
    ref++;
}
```

It is also possible to browse objects lists :

```c++
std::vector<MyClass> myArray;
myArray.resize(2);

for (MyClass myObject : myArray) {
}
```

## For loop with iterators

```c++
for (std::vector<int>::iterator i = tab.begin(); i != tab.end(); ++i) {
    cout << "Current item : " << (*i);
    cout << "Current iteration :" << std::distance(tab.begin(), i);
}
```

In the above example, i is an iterator object pointing to the current item of the loop. The method begin() of the vector class returns an iterator to the first item of the given array, the method end() of the vector class returns an iterator to the past-the-end item of the array ( that means the iterator points on nothing, but is used in loops to know when the full list has been browsed ). The distance() function takes two iterators as parameters and returns the distance between them ( useful to know the current iteration ).
