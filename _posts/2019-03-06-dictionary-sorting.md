---
layout: post
title: Dictionary Sorting
---

This will be a short one, and it's just based on something I stumbled on and never thought to look for.

Whenever I have a list of dictionaries I always end up searching for the cleanest way to sort them or find an object based on some value it contains. This usually involves defining a function to iterate or creating a reverse dictionary where the values are now the keys.

Somehow, I never noticed the 'key' parameter in the built-ins ```min()```, ```max()```, and ```sorted()```, and have ended up typing out way too much code to find the min and max based on a key value pair.

Initially, I thought this would slightly easier than it is, since 'key' sounds like the keys in a dict. So take something like:

```python
dog_one = {
    'name': 'Bear',
    'age': 13,
    'breed': 'Golden Lab'
}

dog_two = {
    'name': 'Jane',
    'age': 6,
    'breed': 'Boxer'
}

dog_three = {
    'name': 'Spot',
    'age': 4,
    'breed': 'Westie'
}

dogs = [dog_one, dog_two, dog_three]
```

If I wanted to grab the oldest dog, you may think I could do something like:

```python
print(max(dogs, key='age'))
```

Unforunately it's sliiightly more complicated than that. The key argument isn't the key of the dict or whatever object you have in your iterable. It's actually the key *function* that will sort the list, so just pop a lambda expression in there:

```python
print(max(dogs, key=lambda x: x['age']))
```

And that's all there is to it. It seems like everyday I run into some silly functionality in a Python built-in that saves me time, and that's why I love this langauge so much.
