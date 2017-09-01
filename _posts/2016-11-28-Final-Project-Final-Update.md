---
layout: post
title: Final Project Final Update
author: rbrooks6
---

This week’s update on the progress of my final project includes: my character list and my thoughts on what I’m seeing so far with it and an update on how my text analysis program is going.

**Character List Progress:**

WOW, so I was HONESTLY surprised to find that there are NO CREDITED PEOPLE OF COLOR IN STAR WARS EPISODE IV. Don’t ask me why I was surprised, but I was. EVEN JAMES EARL JONES, the voice of Darth Vader went uncredited in this film. That being said, so far, the data that I’ve collected is that 100% of the credited lines in Star Wars Episode IV are of white actors! Although, collecting data like this is easy, it is still frustrating. (http://www.imdb.com/title/tt0076759/fullcredits?ref_=tt_cl_sm#cast)

**Program Progress:**

This week, I worked extensively on my program, specifically on reading in the text file and then creating a list of character names. I had a lot of struggle with figuring out how to get Python to read in a file, but I had a lot of help from Professor Hemphill, which got me on the right path. Essentially, my issue was that I wasn’t using my own local Jupyter Notebook, so the program had access to my own documents. When I switched to my local notebook, I was able to get the document to read in without error, but I quickly ran into the issue that I was treating a file as a string. Now this is where I am stuck. After converting the file to a string and then trying to convert it as a list, extract the uppercase words and put them in a list, I soon realized that something was wrong. My program won’t print anything. Not a single thing. I’m going to have to do more testing and figure out more about read files vs. list files. Based off of the code I got from Prof Hemphill,and some research online (insert link to resource) I hypothesize that the read in file does not necessarily have spaces, but new-line characters, but I am not entirely sure.

**The Section of my Code that Reads in the Text File and Attempts to Turn it Into Words:**

    def create_upper_list(textfile, remove_stop_words="true"):
    with open(textfile, 'r') as textfile:
        word_list = list(textfile)
        word_list = [line.rstrip('\n') for line in textfile]
        
    for word in word_list:
        if word.isupper():
            print(word)




