---
layout: post
title: Excel Formulas
---

Finally uploaded my first package to PyPi.

There's something special about being able to ```pip install``` your own scripts.

If you're interested, you can find the 0.0.1 release at:

```pip install xl-formulas```

It's a helper class to use with Pandas, specifically when saving to an Excel Worksheet.

I have a couple cases at work where I generate reports that fit nicely into dataframes, but while reviewing them we want the ability to change values and see how it changes the results (mainly statistics fun).

This allows you to pass in a string of dataframe column names with some operators and generate the Excel-style formula string.

As a bonus I started to implement something to handle the Excel built-ins like SUM() where you have a set of comma separated arguments. Super buggy but that's half the fun of 'owning' a package I think.

Anywho, check it out!

[GitHub Repo](https://github.com/joetats/xlFormulas)

[PyPi Project Page](https://pypi.org/project/xl-formulas/)

