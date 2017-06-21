$(function(){
  // show & hide footnotes
  $('.footNoteToggle').click(function(){
    $(this).parent('p').next('p').children('.footNote').toggleClass('active');
    $(this).toggleClass('active');
  });

  $('.read-more').hover(function(){
    $('i.fa-plus', this).toggleClass('fa-spin');
  });
});

var feed = new Instafeed({
  get: 'user',
  resolution: 'standard_resolution',
  userId: '23503',
  clientId: '9986ee88c1954d768989ac497ddb5c7a',
  accessToken: '23503.9986ee8.9342a7e129604e42a65755bb584443bd',
  template: '<a class="slide" href="{{link}}"><span>{{caption}} // <i class="fa fa-heart" aria-hidden="true"></i> {{likes}}</span><img src="{{image}}" /></a>'
});
feed.run();

jQuery(window).on('load', function() {
  $('#instafeed').bxSlider({
    minSlides: 1,
    maxSlides: 1,
    mode: 'horizontal',
    preventDefaultSwipeY: false,
    slideMargin: 0,
    pager: false,
    infiniteLoop: false
  });
});
