---
layout: post
title: Add 2 Years to Date in Excel
permalink: /how-to/add-2-years-to-date-in-excel
post_id: 1495
categories:
- Excel
- How to
---

I wanted to add two years to a date in Excel. This is the formula you need




Hat tip to
[www.mrexcel.com](http://www.mrexcel.com/forum/excel-questions/43063-how-do-i-add-2-years-date-field.html), assuming your original date is in column A.


=DATE(YEAR(A1)+2,MONTH(A1),DAY(A1))
