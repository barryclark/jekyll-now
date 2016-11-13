---
layout: post
title: Why Use Comprehensions?
---

Comprehension makes code more compact and shifts our focus from the
“how” to the “what.” A comprehension is an expression that uses the
same keywords as loop and conditional blocks, but focuses on the data
rather than on the procedure. For example :

{% gist pranav93/385c7a6e258434ddc0f90b9e773a403e.js" %}

Somewhat more compactly we could write this as:

```python
collection = [d if check_type(d) else process(d) for d in product_list]
```

We don't have to worry about state of collection in above line of code. So,
deugging is easy as compared imperative approach. There are many types of 
comprehensions namely set comprehensions, list comprehensions and dict 
comprehensions etc.
