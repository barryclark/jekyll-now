---
layout: post
title: Learning Journal for September 19th
---
### Homework: Find out why  the following  is a bad example
Reference:[Liskov square] (https://www.infoworld.com/article/2971271/exploring-the-liskov-substitution-principle.html#targetText=A%20classic%20example%20of%20violation,width%20and%20height%20are%20equal.&targetText=The%20Rectangle%20class%20contains%20two%20data%20members%20%2D%2D%20width%20and%20height.)

                          --- | --- 
                              | Quadralateral
                              | Rectangle
                              | Square
In Java, a class is a "prototype" or "blueprint" for the objects under it. A parent class should have some properties and methods ***that are common to all objects***, while objects have some behaviors. In this case, the definition of Quadralateral is ***a four-side figure***, and this definition seems to apply to rectangle and square. If we move down to rectangle, the definition of rectangle is "a plane figure with four straight sides and four right angles, especially one with unequal adjacent sides, in contrast to a square." The property ***with unequal adjacent sides*** does not apply to square. If we think rectangle and square in a venn diagram, rectangle includes square. However, if we think rectangle and square as class and object in Java, one property of rectangle does not apply to square.  

Reference:[class and object](https://www.geeksforgeeks.org/classes-objects-java/#targetText=Classes%20and%20Objects%20in%20Java,around%20the%20real%20life%20entities.&targetText=A%20class%20is%20a%20user,all%20objects%20of%20one%20type.)

### Git
Today we learned how to check the content with commit and branches. Check 20190919.txt in source to review.

### Java
We practiced using instances and methods for our ***tag*** project. 
