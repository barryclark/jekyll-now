---
layout: post
status: publish
published: true
title: How to send Unicode Characters, such as German Umlauts, through JQuery AJAX
author:
  display_name: Gunith
  login: admin
  email: gunith@gmail.com
  url: ''
author_login: admin
author_email: gunith@gmail.com
excerpt: "JQuery gives nonsense when Umlauts are entered.\r\n\r\n2 Important things
  to fix this\r\n\r\n   1. Set the content type to: \"application/x-www-form-urlencoded;
  charset=UTF-8\"\r\n   2. Use POST"
wordpress_id: 50
wordpress_url: http://www.beta.gunith.com/?p=50
date: '2010-11-21 14:41:44 +0530'
date_gmt: '2010-11-21 09:11:44 +0530'
categories:
- JavaScript
tags:
- programming
- code
- javascript
- jquery
- coding
- german
- umlauts
- unicode
- utf8
- i18n
comments:
- id: 629
  author: jcw
  author_email: jcwcreation.it@gmail.com
  author_url: ''
  date: '2011-08-11 17:51:40 +0530'
  date_gmt: '2011-08-11 12:21:40 +0530'
  content: "thank you very much,i have been struggling with this all the day long\r\nperfect
    answer"
- id: 741
  author: Phil Wasson
  author_email: pwasson@maned.com
  author_url: ''
  date: '2011-10-05 21:52:28 +0530'
  date_gmt: '2011-10-05 16:22:28 +0530'
  content: Thanks. Short and sweet, just what I needed to know.
- id: 742
  author: Gunith
  author_email: gunith@gmail.com
  author_url: ''
  date: '2011-10-06 22:01:31 +0530'
  date_gmt: '2011-10-06 16:31:31 +0530'
  content: You're welcome :) .. 'Short and sweet' is kinda the speciality here
- id: 743
  author: Gunith
  author_email: gunith@gmail.com
  author_url: ''
  date: '2011-10-06 22:02:33 +0530'
  date_gmt: '2011-10-06 16:32:33 +0530'
  content: Most welcome :)
---
JQuery gives nonsense when Umlauts are entered.

2 Important things to fix here

* Set the content type to: `application/x-www-form-urlencoded; charset=UTF-8`
* Use POST

Code below to fix this:

```javascript
$.ajax({
      url:url,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data:({
            //Parameters
      }),
      type: 'POST',
      success: function(data) {
           //Success code
      },
      error: function(transport) {
            alert('AJAX ERROR: ' + eval(transport));
      }
});
```
