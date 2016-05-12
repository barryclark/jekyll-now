$(function(){
  // show & hide footnotes
  $('.footNoteToggle').click(function(){
    $(this).parent('p').next('p').children('.footNote').toggleClass('active');
    $(this).toggleClass('active');
  });
});
