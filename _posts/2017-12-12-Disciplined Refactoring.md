---
layout: post
title: A definition of Disciplined Refactoring
---

My current understanding of *Disciplined Refactoring* is that it combines:

- Safe refactoring (types 3 and 4 [here](https://jbazuzicode.blogspot.com/2014/03/various-definitions-of-refactoring.html))
- Committing each refactoring separately, typically to a branch
- Identifying the refactoring in the commit description, e.g.:
  * `> git commit -am "REFACTOR: Extract Method Foo()"`

Working this way means that code reviews are super easy. The refactorings are obvious; if they're tool-executed, you usually don't need to read them; if they're manually executed they often need only light examination. The behavior-changing commits have simple diffs, because refactorings aren't mixed up in them.

It also means that if we get interrupted we can merge what we have to master and capture the value of our work so far.
