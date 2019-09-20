---
layout: post
title: Learning Journal for September 19th
---
### Homework: Find out why  the following  is a bad example

                          --- | --- 
                              | Quadralateral
                              | Rectangle
                              | Square
In Geometry, this relationship works. The definition of Quadralateral is ***a four-side figure*** that apply to rectangle and square. the definition of rectangle is "a plane figure with four straight sides and four right angles, especially one with ***unequal adjacent sides***, in contrast to a square."  If we think rectangle and square in a venn diagram, Quadralateral contains rectangle, and then rectangle contains square. 

In object-oriented language, however, the base class objects have their own properties, and the extended class objects that were derived from the base objects need to follow the Liskov Substitution Principle: the extended classes ***CANNOT*** change the behavior (or properties in this case) of the base case. Based on the relationship, Quadralateral is the base class for rectangle and square, and rectangle is the base case for square. The following is the properties:

1. class Quadralateral {
  * int height
  * int width
  * return height * width (set the return value)
}

2. class Rectangle {
int height;***independent from width***  

int width; ***independent from height***  

return height * width;  

}

3. class Square {
int height;
ini width; ***width and height cannot be adjusted***
return height * width;
}

Since in square height also decides width, it violates the independent relationship between height and width in class Rectangle. That is why the relationship between rectangle and square does not work in the object-oriented language world. In this class, both Rectangle and Square classes can use class Quadralateral as a base class, but class Rectangle cannot be the base class for class Square.

Reference:
*[class and object](https://www.geeksforgeeks.org/classes-objects-java/#targetText=Classes%20and%20Objects%20in%20Java,around%20the%20real%20life%20entities.&targetText=A%20class%20is%20a%20user,all%20objects%20of%20one%20type.)
*[Liskov square](https://www.infoworld.com/article/2971271/exploring-the-liskov-substitution-principle.html#targetText=A%20classic%20example%20of%20violation,width%20and%20height%20are%20equal.&targetText=The%20Rectangle%20class%20contains%20two%20data%20members%20%2D%2D%20width%20and%20height.)

### Git
Today we learned how to check the content with commit and branches. Check 20190919.txt in source to review.

### Java
We practiced using instances and methods for our ***tag*** project. 
