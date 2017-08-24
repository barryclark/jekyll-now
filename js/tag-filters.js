$( document ).ready(function() {
  // call the tag related functions only if tag is present and tag is not "all"
  if(tag !== undefined && tag !== "all"){
    // color selected tags
    $('.post-tag-selected').toggleClass('post-tag-selected');
    $('.label.' + tag).addClass('post-tag-selected');
    // filter articles by tag
    $('article').each(function(){
        $(this).hide();
    });
    $('article').each(function(){
      if ( tagPresent(tag, this) ){
        $(this).show();
      }
    });
  }
});

// get the tag from url
var tag = document.location.search.split("=")[1];

// check if tag in the url is present in the article class
var tagPresent = function(param_tag, article){
  if ($.inArray(param_tag, $(article).attr('class').split(' ')) > -1){
    return true;
  }
};