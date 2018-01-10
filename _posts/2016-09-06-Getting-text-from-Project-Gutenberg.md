---
layout: post
title: "Getting Text from Project Gutenberg"
date: 2016-10-20 08:26:28 -0400
tags: [nltk, nlp]
---

Project Gutenberg is an effort to make digital copies of books available to everyone. They have books that are now in the public domain, which means that the copyright has expired from them. Because of this, their collection is mainly comprised of older texts, and they have over 50,000 books in total.

This notebook demonstrates how to extract text from Project Gutenberg. This is particularly useful for text analysis such as Natural Language Processing (NLP).<!--more-->


```python
import os
from urllib import request
import nltk
import re
```

We'll use the urllib.request module to access the Project Gutenberg website. This does all the work to grab the webpage and return it to us. We will also save a copy offline so that we don't have to query the website each time. This will speed up the process significantly. Let's try this out with Great Expectations by Charles Dickens. We'll provide the title, the URL to find it, and a folder to store it in. The program will do the rest.


```python
title = 'Ulysses'
author = 'James Joyce'
url = 'https://www.gutenberg.org/files/4300/4300-0.txt'
path = 'corpora/canon_texts/'
```


```python
# Check if the file is stored locally
filename = 'corpora/canon_texts/' + title
if os.path.isfile(filename) and os.stat(filename).st_size != 0:
        print("{title} file already exists".format(title=title))
        with open(filename, 'r') as f:
            raw = f.read()

else:
    print("{title} file does not already exist. Grabbing from Project Gutenberg".format(title=title))
    response = request.urlopen(url)
    raw = response.read().decode('utf-8-sig')
    print("Saving {title} file".format(title=title))
    with open(filename, 'w') as outfile:
        outfile.write(raw)
```

    Ulysses file already exists
    

We grabbed the text, now let's take a look at it.


```python
raw[:1000]
```




    '\n\nThe Project Gutenberg EBook of Ulysses, by James Joyce\n\n\n\nThis eBook is for the use of anyone anywhere at no cost and with almost\n\nno restrictions whatsoever. You may copy it, give it away or re-use\n\nit under the terms of the Project Gutenberg License included with this\n\neBook or online at www.gutenberg.org\n\n\n\n\n\nTitle: Ulysses\n\n\n\nAuthor: James Joyce\n\n\n\nRelease Date: August 1, 2008 [EBook #4300]\n\nLast Updated: August 17, 2017\n\n\n\nLanguage: English\n\n\n\nCharacter set encoding: UTF-8\n\n\n\n*** START OF THIS PROJECT GUTENBERG EBOOK ULYSSES ***\n\n\n\n\n\n\n\n\n\nProduced by Col Choat, and David Widger.\n\n\n\n\n\n\n\n\n\n\n\nUlysses\n\n\n\nby James Joyce\n\n\n\n\n\n\n\n\n\n— I —\n\n\n\n\n\n\n\n\n\n[ 1 ]\n\n\n\nStately, plump Buck Mulligan came from the stairhead, bearing a bowl of\n\nlather on which a mirror and a razor lay crossed. A yellow dressinggown,\n\nungirdled, was sustained gently behind him on the mild morning air. He\n\nheld the bowl aloft and intoned:\n\n\n\n—Introibo ad altare Dei.\n\n\n\nHalted, he peered down the dark winding stairs and call'




```python
raw[-1000:]
```




    'n 5. General Information About Project Gutenberg-tm electronic\n\nworks.\n\n\n\nProfessor Michael S. Hart is the originator of the Project Gutenberg-tm\n\nconcept of a library of electronic works that could be freely shared\n\nwith anyone. For thirty years, he produced and distributed Project\n\nGutenberg-tm eBooks with only a loose network of volunteer support.\n\n\n\n\n\nProject Gutenberg-tm eBooks are often created from several printed\n\neditions, all of which are confirmed as Public Domain in the U.S. unless\n\na copyright notice is included. Thus, we do not necessarily keep eBooks\n\nin compliance with any particular paper edition.\n\n\n\n\n\nMost people start at our Web site which has the main PG search facility:\n\n\n\n     http://www.gutenberg.org\n\n\n\nThis Web site includes information about Project Gutenberg-tm, including\n\nhow to make donations to the Project Gutenberg Literary Archive\n\nFoundation, how to help produce our new eBooks, and how to subscribe to\n\nour email newsletter to hear about new eBooks.\n\n\n\n\n\n'



It contains both a preamble and postamble from Project Gutenberg. This will get in the way if we want to do any NLP with it (e.g. every book will contain the word "Gutenberg" multiple times, making it look like a common word). We will need to automatically find and skip them. 

From looking at several books on their website, it looks like they most contain `***START OF THIS PROJECT GUTENBERG EBOOK [TITLE]***`. However, some say "**THE** PROJECT GUTENBERG" instead of "**THIS** PROJECT GUTENBERG". Then there's usually a part where they say "Produced by..." or "E-text prepared by...". After this they usually say the title of the book one more time and usually but not every time, say the author's name. There's also a lot of variation in white space usage, so we'll have to account for that.
So our strategy will be to find the `***START OF THIS PROJECT GUTENBERG EBOOK [TITLE]***` section, then find the next usage of the title following that. If there's an author's name afterwards we'll use it. If not, we'll just go from the title.
All the books appear to end with `end of this project gutenberg ebook`, but the capitalization varies. To account for this, we'll convert all the text to lowercase when we search for the end string.


```python
start_regex = '\*\*\*\s?START OF TH(IS|E) PROJECT GUTENBERG EBOOK.*\*\*\*'
draft_start_position = re.search(start_regex, raw)
print(draft_start_position.end())
```

    541
    

Now we've got the position of the end of the `***START OF THIS PROJECT GUTENBERG EBOOK [TITLE]***` section. Let's find the next instance of the title


```python
start_regex = '\*\*\*\s?START OF TH(IS|E) PROJECT GUTENBERG EBOOK.*\*\*\*'
draft_start_position = re.search(start_regex, raw)
begining = draft_start_position.end()

if re.search(title.lower(), raw[draft_start_position.end():].lower()):
    title_position = re.search(title.lower(), raw[draft_start_position.end():].lower())
    begining += title_position.end()
    # If the title is present, check for the author's name as well
    if re.search(author.lower(), raw[draft_start_position.end() + title_position.end():].lower()):
        author_position = re.search(author.lower(), raw[draft_start_position.end() + title_position.end():].lower())
        begining += author_position.end()
print(begining)
```

    628
    

We found the beginning, now let's find the end.


```python
end_regex = 'end of th(is|e) project gutenberg ebook'
end_position = re.search(end_regex, raw.lower())
end_position.start()
```




    1547809



Now we'll grab the raw text from the end of the title to the beginning of the postamble.


```python
text = raw[begining:end_position.start()]
```

Now the text is ready for NLP. Let's tokenize it just to see.


```python
tokens = nltk.word_tokenize(text)
```


```python
print(tokens[:50])
```

    ['—', 'I', '—', '[', '1', ']', 'Stately', ',', 'plump', 'Buck', 'Mulligan', 'came', 'from', 'the', 'stairhead', ',', 'bearing', 'a', 'bowl', 'of', 'lather', 'on', 'which', 'a', 'mirror', 'and', 'a', 'razor', 'lay', 'crossed', '.', 'A', 'yellow', 'dressinggown', ',', 'ungirdled', ',', 'was', 'sustained', 'gently', 'behind', 'him', 'on', 'the', 'mild', 'morning', 'air', '.', 'He', 'held']
    

It worked in this case, but we should try it in many cases. To make it easier to use repeatedly, let's make a function out of this.


```python
def text_from_gutenberg(title, author, url, path = 'corpora/canon_texts/', return_raw = False, return_tokens = False):
    # Convert inputs to lowercase
    title = title.lower()
    author = title.lower()
   
    # Check if the file is stored locally
    filename = 'corpora/canon_texts/' + title
    if os.path.isfile(filename) and os.stat(filename).st_size != 0:
        print("{title} file already exists".format(title=title))
        print(filename)
        with open(filename, 'r') as f:
            raw = f.read()

    else:
        print("{title} file does not already exist. Grabbing from Project Gutenberg".format(title=title))
        response = request.urlopen(url)
        raw = response.read().decode('utf-8-sig')
        print("Saving {title} file".format(title=title))
        with open(filename, 'w') as outfile:
            outfile.write(raw)
            
    if return_raw:
        return raw
    
    # Option to return tokens
    if return_tokens:
        return nltk.word_tokenize(find_text(raw))
    
    else:
        return find_beginning_and_end(raw)
```

We'll make another function that finds the beginning and end of the text and extracts it to remove the Project Gutenberg preamble and postamble.


```python
def find_beginning_and_end(raw):
    '''
    This function serves to find the text within the raw data provided by Project Gutenberg
    '''
    
    start_regex = '\*\*\*\s?START OF TH(IS|E) PROJECT GUTENBERG EBOOK.*\*\*\*'
    draft_start_position = re.search(start_regex, raw)
    begining = draft_start_position.end()

    if re.search(title.lower(), raw[draft_start_position.end():].lower()):
        title_position = re.search(title.lower(), raw[draft_start_position.end():].lower())
        begining += title_position.end()
        # If the title is present, check for the author's name as well
        if re.search(author.lower(), raw[draft_start_position.end() + title_position.end():].lower()):
            author_position = re.search(author.lower(), raw[draft_start_position.end() + title_position.end():].lower())
            begining += author_position.end()
    
    end_regex = 'end of th(is|e) project gutenberg ebook'
    end_position = re.search(end_regex, raw.lower())

    text = raw[begining:end_position.start()]
    
    return text
```


```python
title = 'Wuthering Heights'
author = 'Emily Bronte'
url = 'http://www.gutenberg.org/cache/epub/768/pg768.txt'
path = 'corpora/canon_texts/'
heights_text = text_from_gutenberg(title, author, url)
print(heights_text[:200])
```

    wuthering heights file already exists
    corpora/canon_texts/wuthering heights
    
    
    
    
    
    
    CHAPTER I
    
    
    
    
    
    1801.--I have just returned from a visit to my landlord--the solitary
    
    neighbour that I shall be troubled with.  This is certainly a beautiful
    
    country!  In all England, I do not 
    


```python
title = 'Pride and Prejudice'
author = 'Jane Austen'
url = 'https://www.gutenberg.org/files/1342/1342-0.txt'
pride = text_from_gutenberg(title, author, url, return_tokens=True)
print(pride[:50])
```

    pride and prejudice file already exists
    corpora/canon_texts/pride and prejudice
    ['Chapter', '1', 'It', 'is', 'a', 'truth', 'universally', 'acknowledged', ',', 'that', 'a', 'single', 'man', 'in', 'possession', 'of', 'a', 'good', 'fortune', ',', 'must', 'be', 'in', 'want', 'of', 'a', 'wife', '.', 'However', 'little', 'known', 'the', 'feelings', 'or', 'views', 'of', 'such', 'a', 'man', 'may', 'be', 'on', 'his', 'first', 'entering', 'a', 'neighbourhood', ',', 'this', 'truth']
    
