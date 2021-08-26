---
layout: post
author: Levi Blinder
excerpt_separator: <!--more-->
title: Images in Japanese Art
---

### What are your chosen sources and where are they located?

The sources that I am considering using are:
* First, a collection of Japanese Board Games dating from the 19th century and first half of the 20th century that can be found in the PUL [Japanese Game Boards](https://dpul.princeton.edu/cotsen/browse/japanese-game-boards)

* Secondly, I am also considering using Japanese Portraits from the 18th and 19th century that can be found in the PUL [Japanese and Chinese Prints and Drawings Collection](https://dpul.princeton.edu/ga_treasures/browse/japanese-and-chinese-prints-and-drawings-donated-by-gillett-g-griffin)

### What would you like your readers/viewers to know about the sources?

I would like readers to see the similarities differences in color usage between Japanese game boards and portraits and understand what such comparisons could tell us about the role and status of these items in Japanese society.

I was personally struck by the chaos and clutter present in Japanese Game Boards as it contrasted with the monotony and simplicity (or at least some sort of clearness/ lack of clutter) of the Japanese portraits. This difference can be seen in the following example pictures: 


<!--more-->

![Portrait](https://iiif-cloud.princeton.edu/iiif/2/f1%2F92%2Fb3%2Ff192b37b93094021805bbd68ec2cc95a%2Fintermediate_file/full/879,/0/default.jpg "Portrait"){: height="500px"} 
![Board Game](https://iiif-cloud.princeton.edu/iiif/2/04%2F84%2Fbf%2F0484bf8a5e184c18be03149f1e2cf217%2Fintermediate_file/full/2000,/0/default.jpg "Board Game"){: height="500px"}

I think that this aesthetic difference is likely the result of a difference in intended message between the two mediums. For example, the simplicity of the portrait may be meant to convey the elegance of its subject. On the other hand, perhaps the clutter of the board game may be indicative of an attempt to cram many aspects of a political ideology into one board, and demonstrate its complexity and intricacy.

### What kinds of digital tools might you be interested in using to analyze these sources?

The project I am currently envisioning seems to break down into two major parts:

* First, there is the task of identifying systematic differences and similarities between the artistic style used in portraits versus in board games.
  * One relatively simple method for accomplishing this would be to analyze the color composition, which could be used to get some sense of cluttering/complexity. Some naive approaches to this would involve:
    * Finding the average change in color along an average path across the picture.
    * Grouping pixels into colors by a probably naive RGB classification (this is prerequisite to the below methods)
    * Counting unique colors
    * Finding the sizes of geographically contiguous groups of colors.
  * There may also be online tools that take a more general approach to art analysis/classification using machine learning that I could use as part of my analysis of these pictures.


* Additionally, there is the task of looking into the significance of these artistic styles. Unfortunately, I don't see any way to get that from just graphic sources, but perhaps I could find a large collection of Japanese texts and plausibly use some basic text scraping to look for connections between words such as 'portrait' and 'status' or 'elegance' (or words related to some other hypothesis for the difference between artistic styles; or perhaps a sorted list of all words based on their proximity to 'portrait'-like words) -- and doing the same thing for 'board games'.

### What are some of the challenges you foresee in working with your chosen sources?

As mentioned in the previous section, I have not yet found sources for all of the information I want to use (specifically, I don't have a set of writings that I can textually analyze). Additionally, it seems hard to implement thorough analysis methods that would directly and accurately answer the question I am posing, so the current analysis that seems plausible to conduct given the scale of the project is fairly naive and might return misleading results because it is not really analyzing art styles and textual connections in a nuanced and/or human manner.
