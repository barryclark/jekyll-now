---
layout: post
title: "Light Verbs 1"
date: 2017-08-05
tags: [python, nlp]
---
Light verbs are verbs that have little meaning on their own, almost like filler verbs. While light verbs are certainly not wrong, writers need to be careful about using them too often.<!--more--> It can fill writting with fluff. Sentences with light verbs often contain nouns that could replace the light verb. For example:

"I did the review of your text"

This could become:

"I reviewed your text"

How many [light verbs](https://jss367.github.io/light_verbs/) are too many? How common are light verbs in famous texts? We'll try to answer this by looking at light verb usage in Moby Dick by Herman Melville.


```python
from urllib import request
import nltk
import os
```

We'll gather the text using the methods we did in the [post on getting text from Project Gutenberg](https://jss367.github.io/Getting-text-from-Project-Gutenberg/).


```python
url = 'http://www.gutenberg.org/files/2701/2701-0.txt'
beginning = 28876 # where the actual text of Moby Dick starts
response = request.urlopen(url)
raw = response.read().decode('utf8')
text = raw[beginning:] # Jump to the beginning
```

Now that we have the text, let's tokenize it.


```python
# Find the tokens
tokens = nltk.word_tokenize(text)
print(tokens[:50])
```

    ['Call', 'me', 'Ishmael', '.', 'Some', 'years', 'ago—never', 'mind', 'how', 'long', 'precisely—having', 'little', 'or', 'no', 'money', 'in', 'my', 'purse', ',', 'and', 'nothing', 'particular', 'to', 'interest', 'me', 'on', 'shore', ',', 'I', 'thought', 'I', 'would', 'sail', 'about', 'a', 'little', 'and', 'see', 'the', 'watery', 'part', 'of', 'the', 'world', '.', 'It', 'is', 'a', 'way', 'I']
    

Looking good. Now that we have our tokenized text, we need a list of light verbs to compare against. Determining what exactly constitutes a light verb is a bit arbitrary but I have a text file of all the words that I consider to be light verbs. Let's open it and look at it.


```python
# Let's grab our list of all the light verbs
file = 'corpora/light_verbs.txt'
with open(file, 'r') as f:
    light_verbs = f.read().splitlines()
print(light_verbs)
```

    ['be', 'am', "'m", 'is', 'are', "'re", 'wa', 'were', 'been', 'have', 'ha', 'had', "'ve", 'do', 'doe', 'did', 'done', 'go', 'goe', 'went', 'gone', 'give', 'gave', 'given', 'put', 'take', 'took', 'taken', 'feel', 'felt', 'begin', 'began', 'begun', 'get', 'got', 'make', 'put', '']
    

Notice that there are actually STEMS of light verbs, and not the light verbs themselves (although in many cases the word is the same as the stem). So before we do any comparisons, we'll have the stem the text first.

Before we do any stemming, we'll have to extract just the words from the tokens, ignoring punctuation. Note that this will result in lists of different sizes, so we'll have to create a mapping between the two lists. For example, the tenth element in the `words` list may be the eleventh element in the `tokens` list because the `tokens` list contains a period that the `words` list does not. So we'll make two lists - one with all the words in it and the other with the position of the words. We're also going to make everything in our `words` list lowercase to make it easier to analyze.


```python
words = []
word_mapper = []
for idx, token in enumerate(tokens):
    # Use "isalnum" to check if character is alphanumberic (decimal or letter, aka not punctuation)
    if token[0].isalnum() or (token in ["'m", "'re", "'ve", "'d", "'ll"]):
        # Force lower case
        words.append(token.lower())
        word_mapper.append(idx)
```

Now let's stem all of the words using the Porter Stemmer Algorithm. It doesn't catch the irregular cases but it still does a good job.


```python
stemmer = nltk.PorterStemmer()
stems = [stemmer.stem(word) for word in words]
```

OK, now we have a list of stemmed light verbs and a list of all the stemmed words in our text. The next thing to do is go through the text and tag every word using NLTK's part of speech (pos) tagger.


```python
tags = nltk.pos_tag(tokens)
print(tags[:50])
```

    [('Call', 'VB'), ('me', 'PRP'), ('Ishmael', 'NNP'), ('.', '.'), ('Some', 'DT'), ('years', 'NNS'), ('ago—never', 'RB'), ('mind', 'VB'), ('how', 'WRB'), ('long', 'JJ'), ('precisely—having', 'JJ'), ('little', 'JJ'), ('or', 'CC'), ('no', 'DT'), ('money', 'NN'), ('in', 'IN'), ('my', 'PRP$'), ('purse', 'NN'), (',', ','), ('and', 'CC'), ('nothing', 'NN'), ('particular', 'JJ'), ('to', 'TO'), ('interest', 'NN'), ('me', 'PRP'), ('on', 'IN'), ('shore', 'NN'), (',', ','), ('I', 'PRP'), ('thought', 'VBD'), ('I', 'PRP'), ('would', 'MD'), ('sail', 'VB'), ('about', 'IN'), ('a', 'DT'), ('little', 'JJ'), ('and', 'CC'), ('see', 'VB'), ('the', 'DT'), ('watery', 'JJ'), ('part', 'NN'), ('of', 'IN'), ('the', 'DT'), ('world', 'NN'), ('.', '.'), ('It', 'PRP'), ('is', 'VBZ'), ('a', 'DT'), ('way', 'NN'), ('I', 'PRP')]
    

Note that we ran the tagger directly on the tokens. This gives us two lists of one size (`tokens` and `tags`) and two smaller lists (`stems` and `words`). We can use the `word_mapper` we created to map between the two. Let's take a look at how to do that.


```python
print("The tokens list has {} elements".format(len(tokens)))
print("The tags list has {} elements".format(len(tags)))
print("The stems list has {} elements".format(len(stems)))
print("The words list has {} elements".format(len(words)))
```

    The tokens list has 253657 elements
    The tags list has 253657 elements
    The stems list has 213864 elements
    The words list has 213864 elements
    

Now let's test out the mapper. If we want to pull up both the stemmed and tagged entries for a word, we'll have to run the tagged index through `word_mapper` first. Here's an exmaple:


```python
word_location = 79
print("The word is " + words[word_location])
print("The stem is " + stems[word_location])
print("The token is " + tokens[word_mapper[word_location]])
print("The tag is " + str(tags[word_mapper[word_location]]))
```

    The word is involuntarily
    The stem is involuntarili
    The token is involuntarily
    The tag is ('involuntarily', 'RB')
    

Now we'll enumerate through the word stems and find the light verbs. First we'll check if it is a word then, if so, we'll compare it to the `light_verbs` list.


```python
# If there is a lot of text this may take a little while
# Make list of all verbs and list of only light verbs
all_verbs = [None] * len(stems)
light = [None] * len(stems)
verb_pos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
for idx, word in enumerate(stems):
    all_verbs[idx] = tags[word_mapper[idx]][1] in verb_pos
    light[idx] = all_verbs[idx] and stems[idx] in light_verbs
```


```python
# Now let's print all the light verbs
from itertools import compress
light_verbs_in_text = list(compress(words, light))
print("Here are first 100 light verbs found:")
print(light_verbs_in_text[:100])
# Now let's look where they are in the text
light_verbs_posi = [i for i, x in enumerate(light) if x]
print("And here is the location of those light verbs:")
print(light_verbs_posi[:100])
```

    Here are first 100 light verbs found:
    ['is', 'have', 'is', 'get', 'get', 'is', 'take', 'is', 'is', 'take', 'is', 'is', 'were', 'go', 'do', 'get', 'are', 'is', 'are', 'gone', 'do', 'get', 'does', 'are', 'take', 'is', 'be', 'be', 'be', 'be', 'are', 'is', 'is', 'were', 'goes', 'were', 'were', 'go', 'is', 'is', 'did', 'is', 'go', 'did', 'feel', 'were', 'did', 'did', 'give', 'is', 'was', 'is', 'is', 'am', 'going', 'begin', 'begin', 'be', 'do', 'have', 'go', 'go', 'have', 'is', 'have', 'get', 'go', 'am', 'do', 'go', 'is', 'do', 'take', 'taking', 'going', 'is', 'being', 'is', 'is', 'go', 'go', 'make', 'is', 'putting', 'have', 'been', 'making', 'is', 'get', 'does', 'do', 'have', 'is', 'is', 'is', 'is', 'be', 'go', 'make', 'is']
    And here is the location of those light verbs:
    [42, 46, 67, 99, 135, 144, 163, 168, 201, 228, 234, 241, 254, 275, 289, 339, 347, 369, 371, 375, 377, 423, 464, 485, 495, 523, 533, 559, 567, 582, 596, 602, 628, 650, 667, 714, 721, 729, 747, 752, 776, 812, 832, 843, 846, 859, 867, 876, 879, 892, 925, 940, 951, 963, 968, 973, 981, 983, 990, 994, 1000, 1008, 1015, 1021, 1027, 1033, 1050, 1057, 1062, 1065, 1108, 1115, 1117, 1122, 1135, 1141, 1148, 1171, 1191, 1225, 1229, 1257, 1278, 1315, 1322, 1323, 1330, 1341, 1392, 1401, 1416, 1467, 1474, 1480, 1500, 1506, 1519, 1524, 1532, 1563]
    

We'll make a function out of what we've done so that we can reuse it quickly.


```python
def find_light_verbs(tokens):
    '''
    This function accepts tokens as an input and returns:
    light_verbs_in_text - a list of all the light verbs in the text
    light_verb_posi - a list of Booleans for each element in words of whether it is a light verb or not
    num_verbs - the total number of verbs in the text
    '''
    # Start by taking all the text using NLTK's default tagger
    tags = nltk.pos_tag(tokens)
    
    words = []
    word_mapper = []
    for idx, token in enumerate(tokens):
        # Use "isalnum" to check if character is alphanumberic (decimal or letter, aka not punctuation)
        if token[0].isalnum() or (token in ["'m", "'re", "'ve", "'d", "'ll"]):
            words.append(token.lower())
            word_mapper.append(idx)
    # Now let's create a stemmer and stem the words
    stemmer = nltk.PorterStemmer()
    stems = [stemmer.stem(word) for word in words]
    all_verbs = [None] * len(stems)
    light_verb_posi = [None] * len(stems)
    verb_pos = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
    for idx, word in enumerate(stems):
        all_verbs[idx] = tags[word_mapper[idx]][1] in verb_pos
        light_verb_posi[idx] = all_verbs[idx] and stems[idx] in light_verbs
    num_verbs = sum(all_verbs)
    light_verbs_in_text = list(compress(words, light_verb_posi))
    return light_verbs_in_text, light_verb_posi, num_verbs
```


```python
light_verbs_in_text, light_verb_posi, num_verbs = find_light_verbs(tokens)
```


```python
print("There are {} light verbs in this text".format(len(light_verbs_in_text)))
print("That is {:.2%} of all verbs in this text".format(len(light_verbs_in_text)/num_verbs))
```

    There are 10506 light verbs in this text
    That is 31.60% of all verbs in this text
    

In [Part 2](https://jss367.github.io/Light-verbs-2/), we'll compare several texts from the literary canon and visualize it.
