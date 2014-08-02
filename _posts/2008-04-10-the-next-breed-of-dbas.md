---
title: 'The next breed of DBA&#8217;s?'
author: kgorman
layout: post
permalink: the-next-breed-of-dbas
fave-post_views:
  - 38
categories:
  - PostgreSQL
tags:
  - Database Engineering
  - postgresql
---
University of California, Berkeley and Carnegie Mellon University students now have what appears to be a <a href=http://www.sigmod.org/record/issues/0309/4.JHdbcourseS03.pdf>first rate course</a> on database internals. What I like about this course is not only is it very practical experience, but also, that it teaches internals. So much of how a database works has to do with how it&#8217;s built, and the syllabus shows that this course should turn out excellent talent ready to develop on any database platform. However, how many of these students will go on to become DBA&#8217;s? I hope many, but it&#8217;s not likely I am afraid. It&#8217;s too bad, because this is the kind of knowledge that makes excellent DBA&#8217;s.

In the non-open source world, Oracle DBA&#8217;s are plentiful, and rightly so because of the scale and complication of the software itself. However, many DBA&#8217;s coming from this side of the fence are more &#8216;operators&#8217; in my opinion. They know how to manipulate the software to achieve a result, but do they really understand deep deep down? In my experience at <a href=www.paypal.com>Paypal</a> and <a href=www.ebay.com>Ebay</a> I was lucky enough to get good experience with internals because at our transaction rate, you simply had to understand internals. I remember re-reading James Morles book; <a href=http://www.amazon.com/Scaling-Oracle8i-TM-Building-Architectures/dp/0201325748/ref=sr\_1\_2?ie=UTF8&#038;s=books&#038;qid=1207710869&#038;sr=1-2>Scaling Oracle 8i</a> and having a lightbulb moment about latches &#8211; Ah! I get why something so seemly small as latches mean so much when you scale a really busy system.

It&#8217;s great to see that students are now getting good hands on expertise in these internals right from the start of their careers. Here is to hoping some of these students take this excellent and practical knowledge and decide to be DBA&#8217;s.
