---
layout: post
title: Datamash
---

Hello everyone! Have you ever been on your command
line and had some data you wanted to know more about?

This happens to me all the time. Random datasets that
I've found (usually with pipes) and I want to know more
about that data. Here's a simple solution that I wish
I had known of before.

---

## Dataset

Just to have some data to work with I found some random
dataset on [data.gov](https://data.gov) to use. I chose
[this dataset](https://catalog.data.gov/dataset/crossing-inventory-data-current)
from the U.S. Department of Transportation.

This dataset has some latlong pairs in it that I fished
out with:

```sh
ag 'POINT \(-?\d+\.\d+ -?\d+\.\d+\)' data -o
```

---

## What I used to do

What I used to do when I had data on the command line
was to fire up python (usually in CLI mode) to analyze
the data.

This would look something like this:

Fetch the data for longs from the data set and save it
to a file:

```sh
ag 'POINT \(-?\d+\.\d+ -?\d+\.\d+\)' data -o | awk '{print $3}' | tr -d ')' > longs
```

Then fire up python on the command line:

```
$ python3
Python 3.7.3 (default, Jan 22 2021, 20:04:44)
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> with open('./longs') as f:
...     data = [float(line) for line in f]
...
>>> data.sort()
>>> import math
>>> print(data[math.floor(len(data)*.95)])
46.7739773
>>> print(data[math.floor(len(data)*.5)])
39.4253861
>>> print(data[math.floor(len(data)*.05)])
30.207205
>>> import statistics as stats
>>> print(stats.mean(data))
38.804030492206984
>>> print(stats.stdev(data))
4.946244285626927
>>>

```

Nice right? We got the 95th, 50th (median), and 5th percentile
values. We also got the mean and stddev. This method can be really
nice when you're doing analysis on a data set because you can
manipulate the data really easily.

---

## An alternative

The above strategy can sometimes be overkill though when you just want
a really speedy method to find some stats from a data set without diving in.

I've found a program called `datamash` that lets you pipe data right on in
and give you what you seek!

```sh
$ ag 'POINT \(-?\d+\.\d+ -?\d+\.\d+\)' data -o | awk '{print $3}' | tr -d ')' | datamash perc:95 1 perc:50 1 perc:5 1 mean 1 sstdev 1
46.77397656     39.4253861      30.20723544     38.804030492207 4.9462442856269
```

If we want we can add `--headers-out` to give labels to all the things we requested

```sh
ag 'POINT \(-?\d+\.\d+ -?\d+\.\d+\)' data -o | awk '{print $3}' | tr -d ')' | datamash perc:95 1 perc:50 1 perc:5 1 mean 1 sstdev 1 --header-out
perc:95(field-1)        perc:50(field-1)        perc:5(field-1) mean(field-1)   sstdev(field-1)
46.77397656     39.4253861      30.20723544     38.804030492207 4.9462442856269
```

`datamash` has a nice man page that explains a lot of information
related to the tool. I'd definitely recommend checking it out if
you need to find stats quickly like this. The syntax for
requesting different pieces of information is similar to using
`sort` to sort a data set in different ways. (Meaning the `1`s
are above are the column number.)

Happy `datamash`ing!

---
Thanks for your time,
Tyler Sean Rau
