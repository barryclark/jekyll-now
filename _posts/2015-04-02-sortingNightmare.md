---
published: false
---

## A Sorting Nightmare

I was just watching the animation tutorial of insertion sort which is provided in this link [Insertion Sort Animation](http://courses.cs.vt.edu/csonline/Algorithms/Lessons/InsertionCardSort/insertioncardsort.swf)

Almost at the end of the animation, a strange thought occurred to my mind.
There are lots of comparisons happening at each iteration and we are moving the marker such that the elements visited until now are in sorted order. But what if there is a kind of virus such that each "accidentally" modifies an element on the fly, when sorting is being performed.

This kind of scenario can be avoided, if we obtain a lock on the entire set of elements on which we may perform sorting. Obtaining a lock on the entire set might be costly. But, imagine what is possible, the sorting algorithm is fundamentally based on the assumption that the elements are not modifiable while in consideration. If there is any modifying event occuring, then sorting procedure should terminate, otherwise, sorting algorithm would have gone to a nightmare. It would never stop sorting and the caller function would never get the chance to execute the logic on the sorted data.