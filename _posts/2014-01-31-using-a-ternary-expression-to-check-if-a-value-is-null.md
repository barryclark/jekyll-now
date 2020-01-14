---
layout: post
title: Using a ternary expression to check if a value is null
permalink: /how-to/using-a-ternary-expression-to-check-if-a-value-is-null
post_id: 1086
categories:
- Data
- How to
- SugarCRM
- Talend
---

Simple test to see if a field is null. I'm using this in Talend to determine if I copy the value into a new note field.
[You could use a length test](http://ben.hamilton.id.au/how-to/multiple-ternary-expressions), but if the field is a date, then you need to do it this way.

**row1.field1 != null**
 ? do_this_if_true : do_this_if_false
