// $(window).scroll(function() {
//   var scroll = $(this).scrollTop();
//   if (scroll > $(window).height() ) {
//     $('.elevator').show(300);
//   } else {
//     $('.elevator').hide(300);
//   }
// });


$(".card ol a:eq(0)").click(function(){$("html,body")
  .animate({scrollTop:$("#logo")
  .offset().top},"500");
  return false;
});

// ol no. 0 #logo
$(".card ol a:eq(0)").click(function(){$("html,body")
  .animate({scrollTop:$("#logo").offset().top},"500");return false;});
// ol no. 1 #typography
$(".card ol a:eq(1)").click(function(){$("html,body")
  .animate({scrollTop:$("#typography").offset().top},"500");return false;});
// ol no. 2 #usability
$(".card ol a:eq(2)").click(function(){$("html,body")
  .animate({scrollTop:$("#usability").offset().top},"500");return false;});
  // ol no. 2 #content-storytelling
$(".card ol a:eq(6)").click(function(){$("html,body")
  .animate({scrollTop:$("#content-storytelling").offset().top},"500");return false;});
// ol no. 2 #tech-challenges-solutions
$(".card ol a:eq(7)").click(function(){$("html,body")
  .animate({scrollTop:$("#tech-challenges-solutions").offset().top},"500");return false;});
// ol no. 2 #workflow-optimization
$(".card ol a:eq(8)").click(function(){$("html,body")
  .animate({scrollTop:$("#workflow-optimization").offset().top},"500");return false;});

// window.onload = function() {
//   var elementButton = document.querySelector('.elevator');
//   var elevator = new Elevator({
//       element: elementButton,
//       duration: 500
//   });
//   elevator.elevate();
// };

var blogGif = $('.blog-gif');

// if hovering over image, swap file extension to from jpg to gif or vice versa
blogGif.hover(
  function() {
    var blogGifSrc_gif = $(this).attr('src').substr(0,$(this).attr('src').indexOf('.')) + '.gif';
    $(this).attr('src', blogGifSrc_gif);
  },
  function() {
    var blogGifSrc_jpg = $(this).attr('src').substr(0,$(this).attr('src').indexOf('.')) + '.jpg';
    $(this).attr('src', blogGifSrc_jpg);
});

if (blogGif) {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
      if (scroll > ($(blogGif).offset().top -  $(window).height() / 1.3) ) {
        $(blogGif).css({'opacity' : '1'});
      }
  });
}
