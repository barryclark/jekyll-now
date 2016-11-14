---
layout: post
title: November 14th Project Update
author: rbrooks6
---

This past week, I have been researching more on text analysis in python in order to successfully process the star wars scripts, 
using word count as a basis for how much interaction each of the characters has. 


The first step to processing the scripts is to import them. For this I will probably need to use with open to open the file.


Next, I will need to find a way to automate Python reading the script in order to identify the characters. In Evelina Gabasova’s 
blog post, she was able to figure out that each script identifies the characters in capital letters, so I would need to figure out 
how to get Python to identify the difference in order to store the characters in a dictionary. If I use the python isupper() method 
(outlined here: https://www.tutorialspoint.com/python/string_isupper.htm),then I could pass the script and for the words that are 
uppercase, I will then check to see if they are already in the dictionary, if not I wil add them to the dictionary, and count all the 
words after the uppercase letter up until another capitalized word or until a number(which symbolizes a scene change).
An edgecase: sometimes words will be parenthesized, and that can throw off this method, I will need to figure out how to handle that.


Below, I have some psuedocode for my potential program. PLEASE NOTE THAT THIS CODE IS NOT WORKING AND IS RIDDLED WITH ERRORS I NEED TO TAKE CARE OF.

Pseudocode:

	#empty dictionary for character to go into
	char_dict = {}
	script = With open(script, x)
	#splits the script into words
	Words = script.split( )
	For word in words:
		#some edge cases for symbols and numbers here
		xxxxxxxxxxxxx
		#if the word is uppercase 
		if word isupper():
			if word is in char_dict:
				#somehow add the following words up until next character to dictionary word count
				Continue
			Else:
				#add word as a new entry in the dictionary
				#somehow count the next few words until the next uppercase towards the dictionary


Clearly there is a lot to still be done, some edge cases to take into account, ect, but at least I have a general idea or skeleton 
of what this code will look like. If necessary, I will come to my CS 331 professor with this and get help (because the man is a python
genius).


That is about it for now.
Thanks for reading! I will update on more later!
	
*Sources*

https://www.tutorialspoint.com/python/string_isupper.htm

Gabasova, Evelina. 2015. “The Star Wars Social Network”. http://evelinag.com/blog/2015/12-15-star-wars-social-network/#.WBd0dforK00
