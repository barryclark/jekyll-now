---
layout: post
title: Final Project Update 2
author: kaminalu
published: true
---

To recap, as of my last post, my desire to learn more about how Twitter users post about art and what art means hit a snag.  My data fetch could only be performed once, and thus, all data that I currently have centers around a search for tweets using the hashtag #art on November 2nd.  

It is an interesting predicament, because my much of my hypothesis cannot be fully determined from this small data set (about 13000 tweets).  However, as I review and analyze what I have, I am attempting to recover and review any patterns that appear.
One thing I was interested in was what part of the world people are tweeting from and in what language.  I find it particularly interesting given that #art is considered English, but looking at my data, I have tweets from all over the world and in at least five different languages.

Analyzing this language and location data has proven exceptionally difficult.  There are a few formulas in Google Sheets that will automatically translate cells into another language, but unfortunately, Sheets freezes when I attempt to work with such a (relatively) large number of cells.  It also doesn’t help if I don’t know the language of the cell.  Meaning, I will have to use a DETECTLANGUAGE formula first, which is also giving me trouble.

As for location data, Twitter only provides the location that was inputted by the user, which could be anything.  And it is.  For example, if a user is from Chicago, Illinois, they can input “Chicago, Illinois, USA”, “Chicago, IL”, “Chicago”, “mi casa”, “wherever I am”, leave the field blank, or any other number of possible options.  This makes mapping users mostly impossible, if not completely frustrating and time-consuming.   And this still assumes they are writing in English.

Apart from this ambiguous data, I do have some numbers that may or may not be interesting.  For instance, out of about 13000 tweets, over 9100 are from unique users.  Additionally, 40 users have more than 100,000 followers, and 2 have more than 1 million.  There are also 32 users who registered in 2007 (the year Twitter gained popularity) and 1880 that have registered this year.

Over the weekend, I came across some previous studies looking at Twitter data, and may use some of them as inspiration for my own analysis.  The results of one such study by Pear Analytics in 2009 can be found here: https://web.archive.org/web/20110715062407/www.pearanalytics.com/blog/wp-content/uploads/2010/05/Twitter-Study-August-2009.pdf.
