---
layout: post
title: Using a ternary operator in Talend Open Studio
permalink: /how-to/using-a-ternary-operator-in-talend-open-studio
post_id: 1065
categories:
- Data
- How to
- Talend
- Ternary
---

I’m currently preparing some data for import into SugarCRM for a client. The source data has a column that contains the given names (i.e. “Jane Mary”) and a second column containing the surname (i.e. “Doe”).

Using Talend Open Studio we want to separate the given names into first_name and middle_names columns. So, how do we split the first name and middle name?

By using in the tMap component an expression.

For the first name, we do this:


StringHandling.INDEX(row1.GivenNames," ") > 0 ? StringHandling.LEFT(row1.GivenNames,StringHandling.INDEX(row1.GivenNames," ")) : row1.GivenNames

And to extract the middle name/s we use this expression:


StringHandling.INDEX(row1.GivenNames," ") > 0 ? StringHandling.RIGHT(row1.GivenNames,StringHandling.LEN(row1.GivenNames)-StringHandling.INDEX(row1.GivenNames," ")–1) : ""

This type of expression are known as a
[ternary operation](http://en.wikipedia.org/wiki/Ternary_operation) -
[see examples](http://en.wikipedia.org/wiki/%3F:).

The basic format of a ternary operation is this:


test condition
**?**

do this if true
**:**

do this if false
