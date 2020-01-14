---
layout: post
title: Excel DATEVALUE Function
permalink: /excel-datevalue-function
post_id: 1491
categories:
- Excel
- General
---

When a Microsoft Excel spread sheet has a column of date data in this format: `Nov 24 1995` Then the Excel function you’ll find useful is the [DATEVALUE](https://support.office.com/en-us/article/DATEVALUE-function-DF8B07D4-7761-4A93-BC33-B7471BBFF252) function.
<!--more-->
This formula here:

`=DATEVALUE((TRIM(MID(R2,5,2))&"-"&TRIM(LEFT(R2,3))&"-"&TRIM(RIGHT(R2,4)))`

Basically grabs the Day, then the Month, then the Year from the column, then converts it to a serial number that Excel recognises as a date. Then format this to display however you want it to.
