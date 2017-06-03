$(function(){
  // show & hide footnotes
  $('.footNoteToggle').click(function(){
    $(this).parent('p').next('p').children('.footNote').toggleClass('active');
    $(this).toggleClass('active');
  });
});
var feed = new Instafeed({
  get: 'user',
  resolution: 'low_resolution',
  userId: '23503',
  clientId: '9986ee88c1954d768989ac497ddb5c7a',
  accessToken: '23503.9986ee8.9342a7e129604e42a65755bb584443bd',
  template: '<a class="slide" href="{{link}}"><span>{{caption}} // <i class="fa fa-heart" aria-hidden="true"></i> {{likes}}</span><img src="{{image}}" /></a>'
  // template: '<img src="{{image}}" />'
});
feed.run();

jQuery(window).on('load', function() {
  $('#instafeed').bxSlider({
    minSlides: 1,
    maxSlides: 1,
    mode: 'vertical',
    slideMargin: 0,
    pager: false,
    infiniteLoop: false
  });
  // jQuery('.owl-carousel').owlCarousel({
  //   loop:false,
  //   items: 1,
  //   nav: true
  // });
});
