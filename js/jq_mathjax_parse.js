$(document).ready(function(){
  $(".inlinecode").map(function(){
    match = /^\$(.*)\$$/.exec($(this).html());
    if (match){
      $(this).replaceWith("\\(" + match[1] + "\\)");
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,$(this).get(0)]);
    }
  });
});
