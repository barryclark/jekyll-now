---
layout: post
title: Feed one for a lifetime - Learn Bash '-man' Command
excerpt_separator: <!--more-->
img_file: man01.jpg
---
The oldest English-language use of the proverb has been found in Anne Isabella Thackeray Ritchie's (1837–1919) novel, Mrs. Dymond (1885), in a slightly different form:

<!--more-->

> "I don't suppose even Caron could tell you the difference between material and spiritual," said Max, shrugging his shoulders. "He certainly doesn't practise his precepts, but I suppose the Patron meant that <strong>if you give a man a fish he is hungry again in an hour. If you teach him to catch a fish you do him a good turn.</strong> But these very elementary principles are apt to clash with the leisure of the cultivated classes. Will Mr. Bagginal now produce his ticket—the result of favour and the unjust sub-division of spiritual environments?" said Du Parc, with a smile.

The proverb has been attributed to many others, but no good evidence has been produced.

And the most commonly used version is of course

<pre>give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime</pre>

If you don't have the time to practice unix terminal commands then I strongly suggest that you learn at least the "man" command...

````
man
````

The man command is used to format and display the manual pages. The man command itself is extremely easy to use. Its basic syntax is

````
man [option(s)] keyword(s)
````

man is most commonly used without any options and with only one keyword. The keyword is the exact name of the command or other item for which information is desired. For example, the following provides information about the ls command (which is used to list the contents of any specified directory):

````
man ls
````

As another example, the following displays the man page about the man pages:

````
man man
````

man automatically sends its output through a pager, usually the program less. A pager is a program that causes the output of any program to be displayed one screenful at a time, rather than having a large amount of text scroll down the screen at high (and generally unreadable) speed.

When you type 

````
man ls
````

You will be shown multiple pages of content. If you want to jump to a specific line, simply type

````
/LSCOLORS
````

Finally type "q" to quit...
