---
layout: post
title: Beat Adobe Reader black and red
permalink: /general/beat-adobe-reader-black-and-red
post_id: 12
categories:
- Adobe Reader
- General
- How to
- Howto
- kb401732
---

On a Terminal Server today some users were experiencing red and black patches appearing when they opened PDF files.

A
[Knowledge Base article at Adobe](http://kb.adobe.com/selfservice/viewContent.do?externalId=kb401732&sliceId=2) indicates a similar, but evidently not the same, issue having been rectified in Adobe Reader 8.1 - that of the color not being rendered correctly for the first rectangle object in a section of a PDF document. Evidently not the same because it didn't work for me. What did work however was disabling Text Smoothing.

Here is how to do it:**Open Adobe Reader**
 |
**Document**
|
**Accessibility Setup Assistant**
 |
**Set all accessibility options**
 |
**Next**

TICK THE BOX to
**DISABLE TEXT SMOOTHING**

**Next**
|
**Next**
|
**Next**
|
**Done**

And bingo, no more red and black patches appearing.
