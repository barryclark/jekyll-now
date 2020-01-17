---
layout: post
title: SugarCRM how to calculate a persons age
permalink: /how-to/sugarcrm-how-to-calculate-a-persons-age
post_id: 892
categories:
- How to
- SugarCRM
- SugarLogic
---

In SugarCRM we oft record a persons birth date (in the field
birthdate). Sometimes it's useful to know how old this person is. So we create a new field
age_c (note: this can be of field type Integer or Decimal) and then using this formula we can see how old they are:


floor(divide(subtract(daysUntil(today()),daysUntil($birthdate)),365.242))


[![small_4956707000](/images/small_4956707000.jpg)](http://www.flickr.com/photos/fouquier/4956707000/)If you use a Decimal field type you can remove the 
floor() portion of the formula so that it doesn't round it down. This means you will see just how old they are to a decimal point. Personally I tend to prefer just knowing that they are 21 or 42 rather than 21.45 or 42.01.

photo credit:
[Fouquier ॐ](http://www.flickr.com/photos/fouquier/4956707000/) via
[photopin](http://photopin.com)
[cc](http://creativecommons.org/licenses/by-nc/2.0/)
