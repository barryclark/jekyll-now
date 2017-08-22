---
layout: post
title: Working with text from Project Gutenberg2
---

Let's make a function to gather text from Project Gutenberg. We'll first check if the text is already stored locally then, if not, download it from Project Gutenberg and store it locally.

```python
# We'll need to import os and nltk for this
import os
import nltk
```

```python
def gutenberg(title, url, start=0, end=-1):
    """This function takes the book title, the url, and, optionally, the start and end positions"""
    #First check if the file is stored locally
    fname = 'corpora/canon_texts/' + title
    if os.path.isfile(fname) and os.stat(fname).st_size != 0:
        print("File already exists")
        print("Extracting text from file")
        with open(fname, 'r') as f:
            raw = f.read()
    else:
        print("{title} does not already exist. Grabbing from project Gutenberg".format(title=self.title))
        response = request.urlopen(self.url)
        raw = response.read().decode('utf-8-sig')
        print("Now let's save it")
        with open(fname, 'w') as outfile:
            outfile.write(raw)
    raw_ = raw[start:end]
    return raw_
```

Let's test this out with Great Expectations

```python
book = ('Great Expectations', 'http://www.gutenberg.org/files/1400/1400-0.txt', 885)
```

```python
text = gutenberg(book[0], book[1], book[2])
```

```
File already exists
Extracting text from file
```

```python
# Now we can tokenize it with nltk
tokens = nltk.word_tokenize(text)
```

```python
print(tokens[:45])
```
```
['My', 'father', '’', 's', 'family', 'name', 'being', 'Pirrip', ',', 'and', 'my', 'Christian', 'name', 'Philip', ',', 'my', 'infant', 'tongue', 'could', 'make', 'of', 'both', 'names', 'nothing', 'longer', 'or', 'more', 'explicit', 'than', 'Pip', '.', 'So', ',', 'I', 'called', 'myself', 'Pip', ',', 'and', 'came', 'to', 'be', 'called', 'Pip', '.']
```


Putting everything together, we get:
```python
import os
import nltk

def gutenberg(title, url, start=0, end=-1):
    """This function takes the book title, the url, and, optionally, the start position"""
    #First check if the file is stored locally
    fname = 'corpora/canon_texts/' + title
    if os.path.isfile(fname) and os.stat(fname).st_size != 0:
        print("File already exists")
        print("Extracting text from file")
        with open(fname, 'r') as f:
            raw = f.read()
    else:
        print("{title} does not already exist. Grabbing from project Gutenberg".format(title=self.title))
        response = request.urlopen(self.url)
        raw = response.read().decode('utf-8-sig')
        print("Now let's save it")
        with open(fname, 'w') as outfile:
            outfile.write(raw)
    raw_ = raw[start:end]
    return raw_

book = ('Great Expectations', 'http://www.gutenberg.org/files/1400/1400-0.txt', 885)

text = gutenberg(book[0], book[1], book[2])

# From there we can tokenize it with nltk
tokens = nltk.word_tokenize(text)

print(tokens[:45])
```

