---
layout: post
title: PDF Breaker
---

How often do you have an encrypted PDF file that you need to get into, but don't remember the password?

Hopefully occasionally, but not too often. This guide won't break any speed records for cracking into PDFs, but it can definitely help if there are no other options.

We'll do this in Python for readability and speed in writing, not speed in execution.

## Planning the Script

Before you get to coding, think about what you want to do. 

First we'll generate a list of possible characters to test, then generate each combination of those characters. Two functions should do the trick.

Eventually we could add command line arguments but I just needed this for one file, so feel free to extend this as you see fit.

## Generating the Characters 

For this first function we'll take a list of parameters and return the list of characters they represent. We could just take a master list and loop through all of the possible characters but if you have an idea of what the password is you can knock a couple loops off the process.

I want to have a simple way to add different types of characters by adding a parameters code to the PDF breaker function. Something like:

* 'a' - Lowercase alphabetical characters
* 'A' - Uppercase alphabetical characters
* '1' - Numbers
* '!' - Special characters

This way passing in something like 'aA!' would result in looping through lower and upper case letters, plus special characters.

Here's a quick and dirty implementation:

```python
def get_char_list(params):
    letters = 'abcdefghijklmnopqrstuvwxyz'
    nums = '01234567890'
    special_chars = '`~!@#$%^&*()-_=+[{]}\\|;:"/?.>,<' + "'"
    chars = ''

    if 'a' in params:
        chars += letters
    if 'A' in params:
        chars += letters.upper()
    if '1' in params:
        chars += nums
    if '!' in params:
        chars += special_chars

    return chars
```

Nothing fancy, probably easier ways to do this. Oh well.

## Break the PDF

Time to break the PDF. Now you need to import itertools and pikepdf. We're using pikepdf instead of PyPDF2 as it handles more types of PDF encryption.

I've included some datetime.datetime calls as well to check times for later on.

This function just requires a filename and a list of characters, collected from the previous function.

```python
import pikepdf
from datetime import datetime
import itertools

def break_pdf(fname, chars):
    print(f'Starting at {datetime.now()}')
    for size in itertools.count(1):
        for s in itertools.product(chars, repeat=size):
            test_case = ''.join(s)
            try:
                pdf = pikepdf.open(fname, password=str(test_case))
                print(f'Password: {test_case}')
                print(f'Finished at {datetime.now()}')
                return pdf
            except:
                pass
        print(f'Done with {size} length strings...')
```

It's a bit verbose with some status output that isn't that important, but I like keep tabs on where things are at.

Now it's just a matter of getting a filename, some character parameters, and a whole bunch of time! This does takes quite a while testing the log in for each password combination.

Have fun! And use *responsibly*.
