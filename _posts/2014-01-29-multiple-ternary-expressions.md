---
layout: post
title: Multiple ternary expressions
permalink: /how-to/multiple-ternary-expressions
post_id: 1068
categories:
- Data
- How to
- Talend
- Ternary
---

This is how to use Talend to concatenate multiple columns (fields) into one field neatly.

Say we have three fields, row1.field1, row1.field2, row1.field3 that we want to insert into a output.notes column.

In the tMap component, use the following expression:


(StringHandling.LEN(row1.field1) > 0 ? "Field 1: "+row1.field1+" " : "")+(StringHandling.LEN(row1.field2) > 0 ? "Field 2 "+row1.field2+" " : "" )+(StringHandling.LEN(row1.field3) > 0 ? "Field 3 Address: "+row1.Address+", "+row1.Suburb+", "+row1.State+", "+row1.Pcode+" " : "")

What this does is check to see if field1 has anything in it (i.e. has a length longer than 0), if it does, it adds the field and a space after it to buffer it against the next field. If it doesn't, then it doesn't insert anything. It then does the same for fields 2 and 3.

Updated 2014-01-30 12h49m to put the code in a html code block and fix the double quotes which had been 'smartly' but wrongly changed.
