---
layout: post
title: Static Variables and Methods in Python
tags: python
last_updated: 2020-03-25
---
## Static
Static means that the member is on the class level rather than on the instance level.

In the case of static variables, they only exist as a single instance per class and are not instantiated. If a static variable is changing in one instance of the class, the change will reflect in all other instances.
```python
class Person:
    species = 'human'

    def __init__(self, name):
        self.name = name
    ...
```

In the case of static methods, static methods don't refer to any instance of the class. You can call them without instantiating an instance. However, they can not access any non-static data members of the class since no actual instance has to exist.

```python
class Person:
    ...
    @staticmethod
    def is_adult(age):
        return age > 18
    ...
```
A topic of confusion is you can have a static variable and instance variable of the same name. Just avoid the situation altogether. You're welcome.
