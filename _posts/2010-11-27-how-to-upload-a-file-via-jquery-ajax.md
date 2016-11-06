---
layout: post
status: publish
published: true
title: How to Upload a File via JQuery AJAX
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
We had a problem where we needed to upload File to the web based system (JSP) using Ajax Upload. My friend, Jayasanka found this JQuery fix to this problem to get this to the Server and then using Commons Upload we access the uploaded file from Java .

Anyhow, here's the code used for Client side. There's another post for the server side code, using Apache Commons.

The JQuery plugin that he used is called `AjaxFileUpload`, which is pretty neat! But a huge flaw in that plugin that we found was that you cannot send other form attributes with that server call, such as a File Description, unless we hack the server URL and append to it and this works!

Apparently this plugin is a Hack of the Ajax Upload.  This I haven't tried. Maybe this solves this problem and it has the  other cool options like drag and drop, but thats to be checked out later  :)

```javascript
function ajaxFileUpload(){
  $("#loading")
    .ajaxStart(function(){
        $(this).show();
      })

    .ajaxComplete(function(){
        $(this).hide();
      });

    $.ajaxFileUpload({
      url:'&desc='$(desc).val(),
      secureuri:false,
      fileElementId:'fileToUpload',
      dataType: 'json',

      success: function (data, status){
        if(typeof(data.error) != 'undefined'){
          if(data.error != ''){
            alert(data.error);
          }
          else{
            alert(data.msg);
          }
        }
      },

      error: function (data, status, e){
          alert(e);
        }
      })
    return false;
}
