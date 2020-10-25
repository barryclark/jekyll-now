---
layout: post
title: A Polar Visualisation of Prime Numbers
comments: True
share: True
---

Blabla bla

```python
import matplotlib.pyplot as plt
import numpy as np

def primes(n):
    """ Returns  a list of primes < n """
    sieve = [True] * n
    for i in range(3,int(n**0.5)+1,2):
        if sieve[i]:
            sieve[i*i::2*i]=[False]*((n-i*i-1)//(2*i)+1)
    return [2] + [i for i in range(3,n,2) if sieve[i]]

p = primes(5000000)
x = p * np.cos(p)
y = p * np.sin(p)

colors_possible = [[239, 192, 80], [221, 65, 36], [69, 181, 170]]
indices = np.random.randint(0,len(colors_possible),size=len(p))
colors = np.array([colors_possible[index] for index in indices])

plt.figure(figsize=(7,7))
axes = plt.gca()
axes.set_xlim([-100000,100000])
axes.set_ylim([-100000,100000])
plt.scatter(x,y, c=colors/255., s=1)
plt.show()
```


another example 

```python
from tensorflow.examples.tutorials.mnist import input_data

def load(config):

  # The `config` argument is here unused, but you can treat it
  # as a dict of keys and values accessible as attributes - it acts
  # like an AttrDict

  dataset = input_data.read_data_sets('.')  # download MNIST
  # to the current working dir and load it
  return dataset
```

a figure 

<figure id='pp_numbers'>
  <img style="display: box; margin: auto" src="{{site.url}}/images/posts/pp_numbers/pp.png" alt="pp numbers"/>
  <figcaption align='center'>
  <b>Fig 1:</b> The Stacked Capsule Autoencoder (SCAE) is composed of a Part Capsule Autoencoder (PCAE) followed by an Object Capsule Autoencoder (OCAE). It can decompose an image into its parts and group parts into objects.
  </figcaption>
</figure>

A math example

$$
y_{n} = \sum_{n=1}^{N} x_{n}
$$
