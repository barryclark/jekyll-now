---
layout: post
title: Trying comment 2
tags: github, blog, comments, hosting
commentIssueId: 1
---
Just Testing. How fast is fast? hmmm!!!

{% highlight javascript %}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
  function loadComments(data) {
    for (var i=0; i<data.length; i++) {
      var cuser = data[i].user.login;
      var cuserlink = data[i].user.html_url;
      var clink = data[i].html_url;
      var cbody = data[i].body_html;
      var cavatarlink = data[i].user.avatar_url;      
      var cdate = new Date(data[i].created_at);
      $("#comments").append(
         "<div class='comment'>" + 
            "<div class='commentheader'>" + 
              "<div class='commentgravatar'>" + 
                '<img src="' + cavatarlink + '" alt="" width="30" height="30">' + 
              "</div>" + 
              "<a class='commentuser' href=\""+ cuserlink + "\">" + 
                cuser + 
              "</a>" + 
              "<a class='commentdate' href=\"" + clink + "\">" + 
                cdate.toLocaleDateString("en") +  
              "</a>" +
            "</div>" + 
            "<div class='commentbody'>" + 
              cbody + 
            "</div>" + 
          "</div>"
      );
    }
  }
  $.ajax("https://api.github.com/repos/subhadeep1024/Blogs/issues/{{page.commentIssueId}}/comments", {
    headers: {Accept: "application/vnd.github.v3.html+json"},
    dataType: "json",
    success: function(msg){
      loadComments(msg);
   }
  });
</script>
{% endhighlight %}
