---
---

$( document ).ready(function() {
  if(tag !== undefined){
    // color selected tags
    $('.post-tag-selected').toggleClass('post-tag-selected');
    $('.label.' + tag).addClass('post-tag-selected');
    // filter articles by tag
    $('article').each(function(){
        $(this).fadeOut("slow");
    });

    $('article').each(function(){
      if ( tagPresent(tag, this) ){
        $(this).fadeIn("slow");
      }
    });
  }
});

// adapted from  https://github.com/youbastard/jquery.getQueryParameters
var getParams = function() {
  return (document.location.search).replace(/(^\?)/,'').split("&").map(function(n){
    return n = n.split("="),this[n[0]] = n[1],this;
  }.bind({}))[0];
};

var tag = getParams().tag;

// check if tag in the url is present in the article class
var tagPresent = function(param_tag, article){
 if ($.inArray(param_tag, $(article).attr('class').split(' ')) > -1){
   return true;
 }
};
