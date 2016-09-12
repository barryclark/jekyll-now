---
layout: post
title: The TLDR on tf-idf and Shipping
author: TGlavan
publish: true
---

Previously on this blog I have covered my goals and intent and made an attempt to describe what the blog would cover and provide  a definition of digital humanities research. 
  
For this weeks discussion I will address the process of how we attain digital information.  When you type a key word or phrase in to the Google - or Bing if you are some kind of weirdo but to each their own -  search box it returns several million relevant hits but this number is significantly less than the total number of different URL's that exist on the internet.  This brings us to the question of "How does google pair down the results to get us to what we actually want"
  
Enter text frequency - inverse document frequency (tf-idf).  In layman's terms this is an algorithm that takes a phrase and then tries to match the significant parts of that phrase with other data points, in the case of web browsing these would be your search results.  Now, I bet you are wondering how it determines what part of a phrase is significant.  For this we will break down tf-idf into its component parts.  The first part of this algorithm searches your phrase for repeating words and sorts them by highest to lowest occurrence. Following this the idf part kicks in and removes any extremely common words such as "the", "a", "in", and other prepositions and verbs and words that do not appear with a high enough frequency to be considered important.  This then allows the search engine try to match the adjectives and nouns used in your search with data points that share these word in common.
  
This process allows us to search the internet and other vast databanks with relative ease and have the desired information appear within the first couple results.  However, looking up data points is not the only purpose tf-idf serves.  This program can be used to analyze text in a similar fashion by grouping words based on their usage.  For instance, you could search for a name of a character in a text and then locate and sort the adjectives used within 5-10 words of that character's name.  Using the compiled list of adjectives that this would return we can get an idea about the personality of this character based on the word choices the author made when writing about them.
  
Taking the idea of word grouping to the next level is the combinations of character names in which two potentially unrelated data points become connected.  The fandom phenomenon has taken of Tumblr by storm resulting in "ships", non-cannon relationships usually of a sexual nature between two characters, and  ship names.  Ship names are generally a combination of both characters names into a fluid sounding pronoun used to describe the couple.  This new thing soon becomes widely accepted by a portion of the fan base and then becomes a permanent fixture as fan-fics surrounding the ship are generated.  This process of data generation around the ship name now makes it a search-able datapoint in broader databanks such as google and yield related results where they may no have existed before.
  
Well that about wraps it up for this week and as an added bonus I have included some entertaining tid bits for those of you who stuck it through to the end that are slightly related to the topic.

The Shipton ship that never set sail:
https://www.pinterest.com/pin/117445502759958311/

If google was a guy:
https://www.youtube.com/playlist?list=PLuKg-Whduhklge1dMCGsemN1Qr_ODqjtZ

References:

"Algorythmic Criticism, A Companion to Digital Literary Studies" Schreibman and Siemens; 10 Sept. 2016, http://www.digitalhumanities.org/companion/view?docId=blackwell/9781405148641/9781405148641.xml&chunk.id=ss1-6-7&toc.depth=1&toc.id=ss1-6-7&brand=9781405148641_brand

"A Linguist Explains the Grammar of Shipping" McCulloch, Gretchen; 10 Sept. 2016, http://the-toast.net/2015/09/30/a-linguist-explains-the-grammar-of-shipping/
