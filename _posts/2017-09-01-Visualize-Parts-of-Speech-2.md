
This notebook takes off from [Visualize Parts of Speech 1](https://jss367.github.io/Visualize-Parts-of-Speech-1/), which ended with a visualization from a single text. In this notebook we look at how to visually compare the part of speech usage in many texts.


```python
from urllib import request
import nltk
import os
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
```

We're going to use the [Book class](https://jss367.github.io/Class-for-Gathering-Text/) we made previously.


```python
%run "Class for gathering text.ipynb"
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
titles = []
for book in books:
    titles.append(book.title)
print(titles)
```

    ['Frankenstein', 'Great Expectations', 'A Tale of Two Cities', 'Pride and Prejudice', "Alice's Adventures in Wonderland", 'Oliver Twist']



```python
for book in books:
    pos_plotter(book.pos)
```

    Frankenstein file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_1.png)


    Great Expectations file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_3.png)


    A Tale of Two Cities file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_5.png)


    Pride and Prejudice file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_7.png)


    Alice's Adventures in Wonderland file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_9.png)


    Oliver Twist file already exists
    Extracting text from file



![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_7_11.png)


It is not easy to compare the relative part of speech usage using pie charts. A better way would be to make a horizontal bar chart for each book and then stack them vertically to compare. Let's try that.


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
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
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
      <td>0.075306</td>
      <td>0.070654</td>
      <td>0.051152</td>
      <td>0.000970</td>
      <td>0.253452</td>
      <td>0.167824</td>
      <td>0.152590</td>
      <td>0.228051</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.084404</td>
      <td>0.065936</td>
      <td>0.049740</td>
      <td>0.001059</td>
      <td>0.286252</td>
      <td>0.171419</td>
      <td>0.126895</td>
      <td>0.214297</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.075008</td>
      <td>0.083417</td>
      <td>0.044391</td>
      <td>0.000983</td>
      <td>0.248063</td>
      <td>0.167859</td>
      <td>0.144574</td>
      <td>0.235704</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.080615</td>
      <td>0.076214</td>
      <td>0.046409</td>
      <td>0.001547</td>
      <td>0.289938</td>
      <td>0.141806</td>
      <td>0.121420</td>
      <td>0.242050</td>
    </tr>
  </tbody>
</table>
</div>



We'll need a function that will help convert the axes to percentages. Let's make that now.


```python
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


```python
fig, ax = plt.subplots()
fig.set_size_inches(12,12)
matplotlib.rcParams.update({'font.size': 18})

df_norm.plot.barh(stacked=True, ax=ax);

ax.set_title("Parts of speech usage in famous novels")
#ax.legend(loc='upper left')


# Shrink current axis by 20%
box = ax.get_position()
ax.set_position([box.x0, box.y0, box.width * 0.8, box.height])

# Add book titles
ax.set_yticklabels(titles, minor=False)
# Put a legend to the right of the current axis
ax.legend(loc='center left', bbox_to_anchor=(1, 0.5))

plt.show()
```


![png](2017-09-01-Visualize-Parts-of-Speech-2_files/2017-09-01-Visualize-Parts-of-Speech-2_15_0.png)


It looks like there's a fair amount of consistency among famous authors in their part of speech distribution. This means it could be an effective tool for determining poor writing - if some text is significantly different in part of speech distribution, this could be a sign of poor writing.
