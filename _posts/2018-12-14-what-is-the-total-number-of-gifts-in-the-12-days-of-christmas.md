---
layout: post
title: What is the Total Number of Gifts in the 12 Days of Christmas?
tags: [math]
keywords: [christmas, twelve days of christmas, 12 days of christmas, gifts]
hashtags: [christmas]
image: /images/the-twelve-days-of-christmas.jpg
---

The other night I attended an event with my wife's mom group for their annual Christmas event. During the course of the evening, there was a bit of a Christmas trivia event where we had to answer various holiday-themed questions.

One of the questions was: "What is the total number of gifts in the 12 days of Christmas?"

![The Twelve Days of Christmas](/images/the-twelve-days-of-christmas.jpg)
*image from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:XRF_12days.jpg) and compressed using [TinyPNG](https://tinypng.com/)*

Being a bit of a math nerd, I wanted to not only figure out the answer but figure out if there was an easy way to figure out the answer.

There are two possible ways to interpret the question: each verse is a separate set of gifts, or each verse is not a separate set of gifts.

## Case 1: Each Verse is Not a Separate Set of Gifts

If you assume that each verse is *NOT* a separate set of gifts, then the answer is trivially &Sigma;1:12 (the sum of the numbers one through twelve). You can answer this by either summing the numbers:

    1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 = 78

Twelve numbers are not that difficult to sum, even on paper (maybe hard in your head, though). There's another approach that can easily be done in the head. It begins with a story about a young math prodigy:

> Little Johnny was in math class when his teacher decided to give the students a bit of busywork: sum the numbers one through one hundred. Maybe she was tired and wanted a break; who knows. Little Johnny knew the answer almost instantly, much to the teacher's chagrin. Little Johnny, without writing anything down, raised his hand, and when called on by the teacher, quickly gave her the answer of 5,050.
>
> How did Little Johnny figure out the answer so quickly?

One possibility is that Little Johnny had already done this exercise - perhaps in a previous year in school by an equally tired teacher - and simply remembered the answer. Or perhaps he's some sort of savant.

The real answer (well, it's a fictional tale) is that Little Johnny noticed a pattern:

    1 + 100 = 101
    2 + 99 = 101
    3 + 98 = 101
    &vellip;
    48 + 53 = 101
    49 + 52 = 101
    50 + 51 = 101

Little Johnny realized that this pattern meant that 101 was added to itself 50 times, meaning the solution was simply:

    101 &times; 50 = 5050

We can generalize this to the sum of any set of counting numbers [min&hellip;max]:

    (min + max) × max / 2

Apply this to the presents given during the Twelve Days of Christmas:

    (1 + 12) &times; 12 / 2 = 13 * 6 = 78

But what if each verse is a separate set of gifts?

## Case 2: Each Verse is a Separate Set of Gifts

One way to approach this is to add each number to the next and record the result along the way. Once this is complete, sum the resulting numbers:

    1    
    1 + 2 = 3
    3 + 3 = 6
    6 + 4 = 10
    10 + 5 = 15
    15 + 6 = 21
    21 + 7 = 28
    28 + 8 = 36
    36 + 9 = 45
    45 + 10 = 55
    55 + 11 = 66
    66 + 12 = 78
    
    1 + 3 + 6 + 10 + 15 + 21 + 28 + 36 + 45 + 55 + 66 + 78 = 364

That seems like a lot of work - is there something easier, something along the lines of how Little Johnny might solve the problem?

Let's think how often each gift (or number) gets repeated. There are twelve verses, and the first gift is in all twelve verses. The second gift is in the final eleven verses. Continuing to the end, the twelfth gift only appears once in the final verse. So we only need to multiply each gift by the number of times that gift is given, then sum the results:

     (1 &times; 12) + (2 &times; 11) + (3 &times; 10) + (4 &times; 9) + (5 &times; 8) + (6 &times; 7) + (7 &times; 6) + (8 &times; 5) + (9 &times; 4) + (10 &times; 3) + (11 &times; 2) + (12 &times; 1)

...Except this looks worse than before! (Well, maybe depending on who you are). There's another pattern emerging, though - due to the fact that **x &times; y** is the same as **y &times; x** (known as [the commutative property](https://en.wikipedia.org/wiki/Commutative_property)), the pattern repeats half way through. We only need to figure out half of the above formula, and then double the result:

    [(1 &times; 12) + (2 &times; 11) + (3 &times; 10) + (4 &times; 9) + (5 &times; 8) + (6 &times; 7)] &times; 2

You can generalize this in a similar fashion when assuming that each verse is not a separate set of gifts. I'll leave that solution as an exercise for the reader.

Here is some further reading on the question of the number of gifts in the Twelve Days of Christmas:

* [The Twelve Days of Christmas - How Many Presents?](https://www.intmath.com/blog/mathematics/the-twelve-days-of-christmas-how-many-presents-1686)
* [The Maths Inside the Twelve Days of Christmas](http://www.mathscareers.org.uk/article/the-maths-inside-the-twelve-days-of-christmas/)
* [How Many Gifts Are in the 12 Days of Christmas?](https://www.quickanddirtytips.com/education/math/how-many-gifts-are-in-the-12-days-of-christmas)

## The Twelve Days of Christmas Song

{% include youtube.html param="oyEyMjdD2uk" %}

> Twelve drummers drumming,
>
> Eleven pipers piping,
>
> Ten lords a-leaping,
>
> Nine ladies dancing,
>
> Eight maids a-milking,
>
> Seven swans a-swimming,
>
> Six geese a-laying,
>
> Five gold rings,
>
> Four calling birds,
>
> Three French hens,
>
> Two turtle doves,
>
> And a partridge in a pear tree.
