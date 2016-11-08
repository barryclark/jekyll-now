---
layout: post
title: Good functions step down the stairs of abstraction
---

![](/content/images/2016/01/cleancode.jpg)

I've been reading [Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) by Robert C. Martin lately, otherwise known as [Uncle Bob](http://blog.cleancoder.com/), and it's really helped me think about how to better organize my code. I could gush on half a dozen topics from the book, and hope to in future blog posts, but one that immediately stood out was in his chapter on functions. Like many books, Bob says that you should keep your functions small, which then leads to needing to break up functions that do a lot of things into many sub-functions (many of which may be grouped into dependencies), but how do you know what functionality to place in those separate functions?

An idea that I first heard in this book was "The Stepdown Rule": A function should only deal with one level of abstraction. Your function should not be calling into a business logic component, then hit up the database, and then go back to another business logic component. Instead, there should be intermediate objects that aid in a conceptual understanding that is consistent at each step, with no jarring mismatch within a single function.

When drawn out visually, this leads to call chain tree that should be relatively balanced. It also leads to much better readability, where for any particular function you can look at the function names and easily get an idea of what actions are performed in that function. This leads to a movement away from the great, sprawling functions into a proliferation of smaller components and files containing much more compact functions.