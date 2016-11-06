---
layout: post
status: publish
published: true
title: How to Safely Enter Single/Double Quotes in HTML inputs from JavaScript
author:
  display_name: Gunith
  login: admin
  email: gunith@gmail.com
  url: ''
author_login: admin
author_email: gunith@gmail.com
wordpress_id: 83
wordpress_url: http://www.gunith.com/?p=83
date: '2010-12-18 09:48:26 +0530'
date_gmt: '2010-12-18 04:18:26 +0530'
categories:
- JavaScript
tags:
- programming
- code
- javascript
- coding
- validation
- single quotes
- double quotes
- character codes
comments:
- id: 962
  author: programming quotes
  author_email: ''
  author_url: http://sammiehorton116.soup.io/post/232070681/WordPress-CMS-Development
  date: '2012-02-28 09:14:56 +0530'
  date_gmt: '2012-02-28 03:44:56 +0530'
  content: |-
    <strong>programming quotes...</strong>

    [...]How to Safely Enter Single/Double Quotes in HTML inputs from JavaScript | Coder&#039;s Block[...]...
---
Imagine a scenario where you're dealing with an HTML form with text boxes where you are passing the data to the back end by using JavaScript methods. If a user enters a single quote or a double quote in the textbox, the JavaScript could go bonkers having not being properly validated.

There is a simple fix for that: Replace the quotes with Character codes.

The double quote (") has a Character code `\x27` and for the single quote (') `\x22`. So to fix this, you add this code.

```javascript
var txt = f.txt.value.replace(/\'/,'\x27').replace(/\"/,'\x22');
```

This replaces the characters with char codes in the textbox called `txt` in the form named `f` and assigns to the var `txt`. (I used JQuery to get values of the `txt`.. That's JQuery notation. But you can also use vanilla JS for this)
You can find another use/example  [here]("http://stackoverflow.com/questions/1372492/assign-javascript-string-without-escaping")
