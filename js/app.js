$(function(){
  // show footnotes
  $('.footNoteToggle').click(function(){
    $(this).parent('p').next('p').children('.footNote').toggleClass('active');
  });
});
