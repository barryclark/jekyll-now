---
layout: post
title: Sugar Logic bug with a workaround for date fields
permalink: /how-to/sugar-logic-bug-with-a-workaround-for-date-fields
post_id: 1223
categories:
- Date
- How to
- SugarCRM
- SugarLogic
---

A client is recording the expiry dates of staff
[blue cards](http://www.ccypcg.qld.gov.au/bluecard/about.html) in their SugarCRM database.

So I used the following sugar logic to show if the blue card has expired or not: <!--more-->

`ifElse(isBefore(today(),$bluecard_expiry_c),"Current","EXPIRED")`

However, the problem here is that when a user of SugarCRM is editing the record, there is a known bug that means it will display "EXPIRED" regardless of if the date is in the past or future.

The workaround for this bug (thanks Anthony) is to wrap the date field in a `date(toString($datefield))` bit of code, this transform the original sugar logic into this:

`ifElse(isBefore(today(),date(toString($bluecard_expiry_c))),"Current","EXPIRED")`

It is essentially force-casting the field to a date field for the javascript-side while passing the formula validator in Studio by first casting the date-type field to a string type.

Which works a treat.
