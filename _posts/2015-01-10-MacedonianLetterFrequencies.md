---
layout: post
categories: [letter, frequencies, macedonian, фреквенција, букви, македонски, scrabble]
title: Scrabble and Macedonian Letter Frequencies
author: emir_osmanoski
comments: true
---

So, this article is going to be a little different. There will be very little
code, a small discussion on site scrapping. The goal is to present an
interesting problem, some data and maybe some conclusions about the data.

Recently I ran across a discussion on Twitter about building a Scrabble board
using the letters in the Macedonian Language. Scrabble is a basically a word
game, where points are won by placing tiles with letters on them, on a game
board of 15x15 tiles. The goal is for the tiles to make actual existing words.
The points awarded for a word depend on the letters of the word; more frequent
letters award less points and less frequent, more. I won’t go into the details
of the rules or how it’s played.

The interesting thing here is that Scrabble boards/games come with 100 tiles,
so that is ~100 letters, as usually there are 2 blank tiles to consider when
building a Macedonian version Scrabble. The real problem starts when you think
about how to distribute these 98 remaining tiles. Which letter is going to be
most represented to which letter the least.

## English Scrabble

The current distribution of letters and scores in the English version is given
in the image bellow taken from this Wikipedia article.

This distribution of counts and scores, as mentioned in the article, has had a
tendency of changing through history. The thing that stands out is that the
initial distribution was derived from letter frequencies in the text in the
front page of the New York Times.

The original designer, Alfred Mosher Butts, manually counted the letter
appearances in the magazine and from those numbers decided on the initial
distribution of tiles.

## Building a Dictionary and Frequency Count

I got very interested in the Scrabble subject when I saw that there was no
easily findable equivalent data about letter frequencies in Macedonian.
Something akin to the English letter frequencies seen here.

The frequencies can be used as a starting point to build the letter
distributions for a Scrabble tile set.

So! How to build these frequencies? Well, recently I’ve been working on site
scraping and was very excited to get to do something along those lines to
collect a robust enough collection of words on which I would then run a count
for each letter. I would then have a total letter count in all the words and
individual letter count which is all that is needed to calculate a percentage.

## Dictionary Scrapper and Parser

I implemented a little scrapper using simple WebRequests in C# and ran it
against an online Macedonian dictionary. I was very lucky that the returned
raw HTML contained all the necessary information to get both the words and the
parameters for the paging structure used in the dictionary site. The approach
was, once all the words on a given page were scrapped I built the URL for the
next page and continued the process for all letters.

The parsing code was straightforward using the HtmlAgilityPack and xPath to
get the nodes containing words. One easy way to determine the xPath string, if
like me you have not have had the chance to get into xPath in detail, is to
use the Chrome Dev tools and copy the xPath for the given node, and then with
small modifications you can arrive to strings that select multiple nodes.

For example given the HTML in the image below the copied xPath is

* //*[@id="lexems"]/select/option[8]

![xPath HTML]({{ site.baseurl }}/images/2015-01-10-Macedonian-Letter-Frequencies/01_xPathCopy.png)

If we remove the node order “[8]” parameter we can get all the option nodes,
and from there on all the words for the given page.

**IMPORTANT!** One thing that can cause trouble here is that the HTML seen in the
developer tool window might be different than the HTML that is returned when
making requests using a C# WebRequest. The thing is, the browser loads and
executes JavaScript that might modify the DOM from a starting HTML structure
to what we see in the developer tools. Using a WebRequest we get this original
unmodified HTML.

The original HTML for the page and the words specifically can be seen bellow:

![Original HTML]({{ site.baseurl }}/images/2015-01-10-Macedonian-Letter-Frequencies/02_rawHtml.png)

So we can modify the xPath further to work with this unmodified (no JavaScript
ran) HTML to get

* "//*[@id='lexems']/a"

Which selects all the anchor links. 

Using HTML Agility Pack we load the raw HTML, select the anchor nodes using
the xPath and then can easily get the anchor text. Using simple string parsing
we can get the word and the word type.

I won’t cover the paging details but it boils down to figuring out how the
page handles getting next word sets and what elements in the raw HMTL can be
used to create the new request for the new set. For the given online
dictionary I was able to page by iterating over all the Macedonian lowercase
letters and then site specific word ranges for each letter.

## Saving the Dictionary and Scrapping Considerations

One thing I wanted to do was run the scrapper as little as possible and bring
the request count down as much as possible. I ran initial single tests for
only one letter to make sure the paging for individual letters worked, as I
was sure the letter (switching from а to б) paging itself was going to work.

After all words for each letter were parsed I saved them in a database for
latter processing. The database was simple with one table containing columns
for id, word and word type.

I setup delays between each request made to the site. Mainly because I thought
it would reduce the load on the site (not crash it – even though I don’t know
if its possible to do so with the requests I was making) and possibly prevent
any measures they might have against scrapping.

 It took I think about an hour to an hour and a half with the delays I setup
to get the total ~54.000 words. The counts for words can be seen in the table
bellow:

|First Letter   | Word Count    |
|---|---|
|[п] | 7889 |
|[с] | 6886  |
|[р] | 4212  |
|[к] | 3545  |
|[н] | 3192  |
|[з] | 2409  |
|[д] | 2406  |
|[о] | 2337  |
|[и] | 2202  |
|[м] | 2028  |
|[б] | 1982  |
|[т] | 1956  |
|[в] | 1748  |
|[а] | 1276  |
|[у] | 1151  |
|[г] | 1133  |
|[ш] | 1068  |
|[л] | 1002  |
|[ф] | 912  |
|[ч] | 817  |
|[е] | 817  |
|[ц] | 657  |
|[х] | 530  |
|[ж] | 412  |
|[ј] | 366  |
|[џ] | 184  |
|[ќ] | 134  |
|[ѓ] | 91  |
|[ѕ] | 78  |
|[љ] | 30  |
|[њ] | 3  |




