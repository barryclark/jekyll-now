---
layout: post
title: File decoding
---



Different operating systems use different file encodings, so this is for Microsoft Windows.


Let's talk about how download a book from project Gutenberg, view it, and save it to disk.


But if you get hung up in the encoding, you'll have to do a little more:




Another option is to get the text directly from the internet:

However, if you don't decode it

from urllib import request
# Find the url to the Gutenberg .txt file
url = 'http://www.gutenberg.org/files/1400/1400-0.txt'
# Get the text
response = request.urlopen(url)
# Don't decode it
raw = response.read()

It will start like this:

b'\xef\xbb\xbfThe Project Gutenberg EBook of Great Expectations, by Charles Dickens\r\n\r\nThis eBook 

\xef\xbb\xbf is the UTF-8 representation of the BOM. That tells your text editor that it's encoded with UTF-8.





It's a bit of a mess at the beginning, so you should decode it:

url = 'http://www.gutenberg.org/files/1400/1400-0.txt'
response = request.urlopen(url)
canon_text_draft = response.read().decode('utf8')

canon_text_draft is then a single string of the entire text

Here is what it will look like:

'\ufeffThe Project Gutenberg EBook of Great Expectations, by Charles Dickens\r\n\r\nThis eBook

\ufeff is a Byte Order Mark (BOM). It tells you how the rest of the text is encoded.

You've read the UTF-8 BOM and decoded it based on that representation, but now you've got \ufeff, which is the BOM for UTF-16. Why is that?



OK, but we don't want any BOM remaining in our text. Here's how you get rid of the remaining one:
from urllib import request
# Find the url to the Gutenberg .txt file
url = 'https://www.gutenberg.org/files/98/98-0.txt'
# Get the text
response = request.urlopen(url)
# Don't decode it
raw = response.read().decode('utf-8-sig')



Great, now let's save the file:

One way to save the file is by never decoding it. You can do that like this:

fname = 'corpora/canon_texts/' + 'test'
with open(fname, 'w') as outfile:
    outfile.write(raw)


Now you just have to open it again. Here is how you do that


with open(fname, 'r') as f:
    text = f.read(100)




This you can then easily tokenize:

tokenize_text(text)

Fortunately, the tokenizer will recognize all the \n and \r marks, so it will ignore those.




OK, so let's say you've saved it using utf-8-sig. Let's open it

with open('corpora/canon_texts/' + 'test2', 'r') as f:
    my_text3 = f.read()

This gives you the entire text as a string, which is exactly what you need to tokenize. Yay!





The good news is that it works with that URL, the bad news is that it doesn't work with url = 'http://www.gutenberg.org/files/2701/2701-0.txt'




Errata:


One method is:

# Specify the filename and encoding. If the file is in a folder you will need to do open('folder/myfile', 'r')
f = open('myfile', 'r')

If you type f, you see will the file characteristics, but not the actual text. Here's an example of what you will see:
<_io.TextIOWrapper name='corpora/canon_texts/test' mode='r' encoding='cp1252'>

To see it, use f.read:
f.read()

In this case, it give sus a UnicodeDecodeError where a character maps to <undefined>

cp1252 is the default character encoding used by Windows for English characters.


If you just want a portion of the file, you can use:
f.read(1000)
This will only give you the first 1000 characters


To read a single line:
f.readline()








There are still some texts, like Moby Dick and The Great Gatsby, that I'm still having file encoding errors with. Also: To the lighthouse by Virginia Woolf