---
layout: post
title: Canonical stats with classes
---


```python
from urllib import request
import nltk
import os
import re
#import os.path
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.ticker import FuncFormatter
#import matplotlib
#matplotlib.style.use('ggplot')
```


```python
class Book(object):
    all_books = []
    def __init__(self, title, url, start=0, end=-1):
        # start is the location of where the book actually begins in the text file (skips headers, publisher info, etc.)
        # Let's create an end text so we can just grab a small amount for testing
        self.title = title
        self.url = url
        self.start = start
        self.end = end
        self.raw_ = None
        self.tokens_ = None
        # self.words = None
        # self.words2tokens = None
        self.pos_ = None

    def __str__(self):
        return self.title

    @property
    def raw(self):
        if self.raw_ is None:
            #First check if the file is stored locally
            fname = 'corpora/canon_texts/' + self.title
            if os.path.isfile(fname):
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
        self.raw_ = raw[self.start:self.end]
        return self.raw_
    
    @property
    def tokens(self):
        if self.tokens_ is None:
            self.tokens_ = nltk.word_tokenize(self.raw)
        return self.tokens_


    @property
    def pos(self):
        if self.pos_ == None:
            
            def mytagger(tokens):
                '''This function inputs tokens'''
                tags = nltk.pos_tag(tokens)
                return tags

            tagged = mytagger(self.tokens)

            # Note that IN can be either a preposition or a conjunction, for now we're going to list it with the prepositions
            common_noun_pos = ['NN', 'NNS']
            common_nouns = []
            verb_pos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
            verbs=[]
            adjective_pos = ['JJ', 'JJR', 'JJS']
            adjectives = []
            pronoun_pos = ['PRP', 'PRP$', 'WP', 'WP$']
            pronouns = []
            adverb_pos = ['RB', 'RBR', 'RBS', 'WRB']
            adverbs = []
            proper_noun_pos = ['NNP', 'NNPS']
            proper_nouns = []
            conjunction_pos = ['CC']
            conjunctions = []
            preposition_pos = ['IN', 'TO']
            prepositions = []
            interjection_pos = ['UH']
            interjections = []
            modal_pos = ['MD'] # But these are also verbs, so let's make sure they show up as such
            modals = []
            tagged_other_pos = ['CD', 'DT', 'EX', 'FW', 'LS', 'PDT', 'POS', 'RP', 'SYM', 'WDT']
            tagged_others = []
            other = []

            for idx, token in enumerate(tagged):
                if token[1] in common_noun_pos:
                    common_nouns.append(token)
                elif token[1] in verb_pos:
                    verbs.append(token)
                elif token[1] in adjective_pos:
                    adjectives.append(token)
                elif token[1] in pronoun_pos:
                    pronouns.append(token)
                elif token[1] in adverb_pos:
                    adverbs.append(token)
                elif token[1] in proper_noun_pos:
                    proper_nouns.append(token)
                elif token[1] in conjunction_pos:
                    conjunctions.append(token)
                elif token[1] in preposition_pos:
                    prepositions.append(token)
                elif token[1] in interjection_pos:
                    interjections.append(token)
                elif token[1] in modal_pos:
                    modals.append(token)
                elif token[1] in tagged_other_pos:
                    tagged_others.append(token)
                else:
                    other.append(token)


            self.pos_ = [common_nouns, verbs, adjectives, pronouns, adverbs, proper_nouns, conjunctions, prepositions, interjections, modals]
        return self.pos_
        # Append modals to verbs
        # Create nouns that is both proper nouns and common nouns
```


```python
books = [Book('Frankenstein', 'http://www.gutenberg.org/cache/epub/84/pg84.txt', 500),
        Book('Great Expectations', 'http://www.gutenberg.org/files/1400/1400-0.txt', 885),
        Book('A Tale of Two Cities', 'https://www.gutenberg.org/files/98/98-0.txt', 2400),
        Book('Pride and Prejudice', 'https://www.gutenberg.org/files/1342/1342-0.txt', 1200),
        Book("Alice's Adventures in Wonderland", 'https://www.gutenberg.org/files/11/11-0.txt', 1200),
        Book('Oliver Twist', 'http://www.gutenberg.org/cache/epub/730/pg730.txt', 500)]
```


```python
# We'll grab this function from the Part of Speech notebook
import matplotlib.pyplot as plt
def pos_plotter(parts_of_speech):
    '''This function inputs a specific list of lists that is shown in the Part of Speech notebook'''
    all_labels = ['common_nouns', 'verbs', 'adjectives', 'pronouns', 'adverbs', 'proper_nouns', 'conjunctions', 'prepositions', 'interjections', 'modals']
    pos_dict = dict(zip(all_labels, parts_of_speech))
    labels=[]
    data=[]
    for pos, lst in pos_dict.items():
        if lst:
            data.append(len(lst))
            labels.append(pos)
    fig1, ax1 = plt.subplots()
    ax1.pie(data, labels=labels)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.show()
```


```python
# def find_pos(tokens):
#     # Let's make a single function to determine the parts of speech
#     # We'll use this to copy and paste from other notebooks

#     import re
#     import os

#     def mytagger(tokens):
#         '''This function inputs tokens'''
#         tags = nltk.pos_tag(tokens)
#         return tags

#     tagged = mytagger(tokens)

#     # Note that IN can be either a preposition or a conjunction, for now we're going to list it with the prepositions
#     common_noun_pos = ['NN', 'NNS']
#     common_nouns = []
#     verb_pos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
#     verbs=[]
#     adjective_pos = ['JJ', 'JJR', 'JJS']
#     adjectives = []
#     pronoun_pos = ['PRP', 'PRP$', 'WP', 'WP$']
#     pronouns = []
#     adverb_pos = ['RB', 'RBR', 'RBS', 'WRB']
#     adverbs = []
#     proper_noun_pos = ['NNP', 'NNPS']
#     proper_nouns = []
#     conjunction_pos = ['CC']
#     conjunctions = []
#     preposition_pos = ['IN', 'TO']
#     prepositions = []
#     interjection_pos = ['UH']
#     interjections = []
#     modal_pos = ['MD'] # But these are also verbs, so let's make sure they show up as such
#     modals = []
#     tagged_other_pos = ['CD', 'DT', 'EX', 'FW', 'LS', 'PDT', 'POS', 'RP', 'SYM', 'WDT']
#     tagged_others = []
#     other = []

#     for idx, token in enumerate(tagged):
#         if token[1] in common_noun_pos:
#             common_nouns.append(token)
#         elif token[1] in verb_pos:
#             verbs.append(token)
#         elif token[1] in adjective_pos:
#             adjectives.append(token)
#         elif token[1] in pronoun_pos:
#             pronouns.append(token)
#         elif token[1] in adverb_pos:
#             adverbs.append(token)
#         elif token[1] in proper_noun_pos:
#             proper_nouns.append(token)
#         elif token[1] in conjunction_pos:
#             conjunctions.append(token)
#         elif token[1] in preposition_pos:
#             prepositions.append(token)
#         elif token[1] in interjection_pos:
#             interjections.append(token)
#         elif token[1] in modal_pos:
#             modals.append(token)
#         elif token[1] in tagged_other_pos:
#             tagged_others.append(token)
#         else:
#             other.append(token)


#     parts_of_speech = [common_nouns, verbs, adjectives, pronouns, adverbs, proper_nouns, conjunctions, prepositions, interjections, modals]
#     return parts_of_speech
#     # Append modals to verbs
#     # Create nouns that is both proper nouns and common nouns
```


```python
for book in books:
    print(book.url)
```

    http://www.gutenberg.org/cache/epub/84/pg84.txt
    http://www.gutenberg.org/files/1400/1400-0.txt
    https://www.gutenberg.org/files/98/98-0.txt
    https://www.gutenberg.org/files/1342/1342-0.txt
    https://www.gutenberg.org/files/11/11-0.txt
    http://www.gutenberg.org/cache/epub/730/pg730.txt
    


```python
for book in books:
    pos_plotter(book.pos)
```

    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_1.png)


    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_3.png)


    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_5.png)


    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_7.png)


    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_9.png)


    File already exists
    Extracting text from file
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_7_11.png)



```python
# We'll grab this function from the Part of Speech notebook
import matplotlib.pyplot as plt
def pos_plotter2(parts_of_speech):
    '''This function inputs a specific list of lists that is shown in the Part of Speech notebook'''
    all_labels = ['common_nouns', 'verbs', 'adjectives', 'pronouns', 'adverbs', 'proper_nouns', 'conjunctions', 'prepositions', 'interjections', 'modals']
    pos_dict = dict(zip(all_labels, parts_of_speech))
    labels=[]
    data=[]
    for pos, lst in pos_dict.items():
        if lst:
            data.append(len(lst))
            labels.append(pos)
    fig1, ax1 = plt.subplots()
    ax1.bar(data, labels=labels)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.show()
```


```python

```


```python
nouns = []
verbs = []
adjectives = []
pronouns = []
adverbs = []
conjunctions = []
prepositions = []
interjections = []
modals = []
for book in books:
    nouns.append(len(book.pos[0]) + len(book.pos[5])) # common + proper
    verbs.append(len(book.pos[1]) + len(book.pos[9])) # verbs + modals
    adjectives.append(len(book.pos[2]))
    pronouns.append(len(book.pos[3]))
    adverbs.append(len(book.pos[4]))
    conjunctions.append(len(book.pos[6]))
    prepositions.append(len(book.pos[7]))
    interjections.append(len(book.pos[8]))
```


```python
# Now let's put everything in a pandas dataframe
df = pd.DataFrame({'nouns': nouns, 'verbs': verbs, 'adjectives': adjectives, 'pronouns': pronouns, 'adverbs': adverbs,
                   'conjunctions': conjunctions, 'prepositions': prepositions, 'interjections': interjections})
```


```python
df_norm = df.div(df.sum(axis=1), axis='index')
df_norm.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>adjectives</th>
      <th>adverbs</th>
      <th>conjunctions</th>
      <th>interjections</th>
      <th>nouns</th>
      <th>prepositions</th>
      <th>pronouns</th>
      <th>verbs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.075583</td>
      <td>0.065945</td>
      <td>0.059307</td>
      <td>0.000812</td>
      <td>0.246895</td>
      <td>0.173428</td>
      <td>0.153978</td>
      <td>0.224053</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.072607</td>
      <td>0.072278</td>
      <td>0.052102</td>
      <td>0.000909</td>
      <td>0.243068</td>
      <td>0.175146</td>
      <td>0.152889</td>
      <td>0.231001</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.083588</td>
      <td>0.067760</td>
      <td>0.050441</td>
      <td>0.000810</td>
      <td>0.277370</td>
      <td>0.176949</td>
      <td>0.125536</td>
      <td>0.217545</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.075654</td>
      <td>0.085813</td>
      <td>0.044377</td>
      <td>0.000755</td>
      <td>0.236682</td>
      <td>0.172048</td>
      <td>0.144968</td>
      <td>0.239703</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.073732</td>
      <td>0.079253</td>
      <td>0.046357</td>
      <td>0.001323</td>
      <td>0.289258</td>
      <td>0.151511</td>
      <td>0.112640</td>
      <td>0.245926</td>
    </tr>
  </tbody>
</table>
</div>




```python


```


```python
# Let's build a function that will help convert the axes to percentages
def to_percent(y, position):
    # Ignore the passed in position. This has the effect of scaling the default
    # tick locations.
    s = str(100 * y)

    # The percent symbol needs escaping in latex
    if matplotlib.rcParams['text.usetex'] is True:
        return s + r'$\%$'
    else:
        return s + '%'
```


      File "<ipython-input-24-dbcdd021fd72>", line 4
        plt.xticks([50%])
                       ^
    SyntaxError: invalid syntax
    



```python
df_norm.plot.barh(stacked=True);

fig = plt.figure()
ax = plt.subplot(111)

# Create the formatter using the function to_percent. This multiplies all the
# default labels by 100, making them all percentages
formatter = FuncFormatter(to_percent)

plt.title("Parts of speech used in famous texts")

fig.set_size_inches(3,3)

ax.legend(loc='upper center')
# Set the formatter
plt.gca().xaxis.set_major_formatter(formatter)

# Shrink current axis by 20%
box = ax.get_position()
ax.set_position([box.x0, box.y0, box.width * 0.8, box.height])

# Put a legend to the right of the current axis
ax.legend(loc='center left', bbox_to_anchor=(1, 0.5))

plt.show()
```

    C:\Users\HMGSYS\Anaconda3\lib\site-packages\matplotlib\axes\_axes.py:545: UserWarning: No labelled objects found. Use label='...' kwarg on individual plots.
      warnings.warn("No labelled objects found. "
    


![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_15_1.png)



![png](Canonical%20stats%20with%20classes_files/Canonical%20stats%20with%20classes_15_2.png)

