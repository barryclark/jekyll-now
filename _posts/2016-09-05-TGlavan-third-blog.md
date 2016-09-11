---
layout: post
title: The TLDR on tf-idf and Shipping
author: TGlavan
publish: true
---

  Previously on this blog I have covered my goals and intent and made an attempt to describe what the blog would cover and provide  a definition of digital humanities research. 
  
  For this weeks discussion I will address the process of how we attain digital information.  When you type a key word or phrase in to the Google - or Bing if you are some kindo of weirdo but to each their own -  search box it returns several million relevant hits but this number is significatly less than the total number of different URL's that exist on the internet.  This brings us to the question of "How does google pair down the results to get us to what we acctually want"
  
  Enter text frequency - inverse document frequency (tf-idf).  In laymans terms this is an algorythm that takes a phrase and then tries to match the significant parts of that phrase with other data points, in the case of web browsing these would be yor search results.  Now, I bet you are wondering how it determines what part of a phrase is significant.  For this we will break down tf-idf into its comopnent parts.  The first part of this algorythm searches your phrase for repeating words and sorts them by highest to lowest occurence. Following this the idf part kicks in and removes any extremely common words such as "the", "a", "in", and other prepositions and verbs and words that do not appear with a high enough frequency to be considered important.  This then allows the search engine try to match the adjectives and nouns used in your search with data points that share these word in common.
  
  This process allows us to search the internet and other vast databanks with relative ease and have the desired information appear within the first couple results.  However, looking up data points is not the only purspose tf-idf serves.  This program can be used to analyze text in a similar fashion by grouping words based on their usage.  Forinstance, you could search for a name of a character in a text and then locate and sort the adjectives used within 5-10 words of that charcter's name.  Using the compiled list of adjectives that this would return we can get an idea about the personality of this charater based on the word choices the author made when writing about them.
  
  Taking the idea of word grouping to the next level is the combinations of character names in which two potentially unrelated data points become connected.  The fandom phenomenon has taken of Tumblr by storm resulting in "ships", non-cannon relationships usually of a sexual nature between two charaters, and  ship names.  Ship names are genrally a combination of both characters names into a fluid sounding pronoun used to describe the couple.  This new thing soon becomes widely accepted by a portion of the fanbase and then becomes a permanent fixture as fanfics surrounding the ship ar generated.  This process of data generation around the ship name now makes it a searchable datapoint in something such as google, where the searching 
