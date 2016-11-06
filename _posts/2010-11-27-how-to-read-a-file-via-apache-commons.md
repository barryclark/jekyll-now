---
layout: post
status: publish
published: true
title: How to Read a File using Apache Commons
author:
  display_name: Gunith
  login: admin
  email: gunith@gmail.com
  url: ''
author_login: admin
author_email: gunith@gmail.com
excerpt: We had a problem where we needed to upload File to the web based system (JSP)
  using Ajax Upload. My friend, Jayasanka found this JQuery fix to this problem to
  get this to the Server and then using Commons Upload we access the uploaded file
  from Java .
wordpress_id: 66
wordpress_url: http://www.gunith.com/?p=66
date: '2010-11-27 10:41:45 +0530'
date_gmt: '2010-11-27 05:11:45 +0530'
categories:
- Java
- JavaScript
- JQuery
- Apache Commons
tags:
- programming
- Java
- code
- jee
- javascript
- jquery
- coding
- struts
- commons
- fileupload
comments: []
---
We had a problem where we needed to upload File to the web based system (JSP) using Ajax Upload. My friend, Jayasanka found this JQuery fix to this problem to get this to the Server and then using Commons Upload we access the uploaded file from Java.

Anyhow, here's the code for the Java backend using Apache Commons. There's another article for the front end code which uses JQuery file uploading

The code of the Current Apache Commons FileUpload which was used in the time of posting (quoting from the documentation) is as follows,

```java
// Create a factory for disk-based file items
FileItemFactory factory = new DiskFileItemFactory();
// Create a new file upload handler
ServletFileUpload upload = new ServletFileUpload(factory);
// Parse the request
List  = upload.parseRequest(request);
```

We had an Older Version of  package where the above classes wasn't available. This is the code we used:

```java
FileItemFactory itemFactory = new DefaultFileItemFactory();
FileUpload fileUpload = new FileUpload(itemFactory);
List files = fileUpload.parseRequest(req.request);
```

Both of the versions returns FileItems. The first one returns the newer DiskFileItem and the older returns DefaultFileItems, which both has neat methods with mucking around with files :)
