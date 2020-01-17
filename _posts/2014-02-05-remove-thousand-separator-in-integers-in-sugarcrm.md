---
layout: post
title: Remove thousand separator in Integers in SugarCRM
permalink: /how-to/remove-thousand-separator-in-integers-in-sugarcrm
post_id: 1103
categories:
- Date
- How to
- Integer
- SugarCRM
---

We want to record a `Year` value on a record in SugarCRM, but we don't have a day and month to do with it, you can't use a field that is of a 'date' type as that requires a full date (year, month, day).

You can use an `Integer` field type tho. The downside is that it displays a thousands separator. i.e. it'll show **2,014** instead of **2014**.

To fix this, tick the Disable Format check box in Studio. This will remove the thousand separator.

[![Screenshot 2014-02-05 13.05.04](/images/Screenshot-2014-02-05-13.05.04-223x300.png)](/images/Screenshot-2014-02-05-13.05.04.png)
