---
layout: post
title: Working with text from Project Gutenberg
---

Let's make a function to gather text from Project Gutenberg.

First, we'll check if the text is already stored locally then, if not, download it from Project Gutenberg and store it locally.

```python
# We'll need to import os and nltk for this
import os
import nltk
```

Now we'll build our function. A lot of the Project Gutenberg raw texts start with a preamble, so we'll include an option location to start pulling the text from so the preamble doesn't interfere with any statistics we want to do.

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

Let's test this out with Great Expectations. The actual text of Great Expectations starts at position 885, so we'll cut out the text before that.

```python
book = ('Great Expectations', 'http://www.gutenberg.org/files/1400/1400-0.txt', 885)
```

Let's put it in the function:

```python
text = gutenberg(book[0], book[1], book[2])
```
Depending on whether you already have the text or not, you may get this output:
```
File already exists
Extracting text from file
```

```python
# Now we can tokenize it with nltk
tokens = nltk.word_tokenize(text)
```

Now we've broken it into tokens. Let's take a look at what we've got.

```python
print(tokens[:45])
```
Here's the resulting output:
```
['My', 'father', '’', 's', 'family', 'name', 'being', 'Pirrip', ',', 'and', 'my', 'Christian', 'name', 'Philip', ',', 'my', 'infant', 'tongue', 'could', 'make', 'of', 'both', 'names', 'nothing', 'longer', 'or', 'more', 'explicit', 'than', 'Pip', '.', 'So', ',', 'I', 'called', 'myself', 'Pip', ',', 'and', 'came', 'to', 'be', 'called', 'Pip', '.']
```


Looks good! Putting everything together, we get:
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

