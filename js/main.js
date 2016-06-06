var homeUrl = "http://dawitelias.github.io/";
var homeLinkElement = document.querySelectorAll("nav a")[0];

(function swapTopSectionClass() {
  var top_container = document.querySelector(".top");
  var nav_a = document.querySelectorAll(".navbar a");
  var node;
  var i = 0;
  var blogEntries = document.querySelectorAll(".container.posts");

  if (window.location.pathname.indexOf("/blog/") === 0) {
    top_container.classList.remove("top-home", "top-work", "top-dailyui");
    top_container.classList.add("top-blog");

    for (i=0; i < nav_a.length; i++) {
      node = nav_a[i];
    }

    for (i=0; i < blogEntries.length; i++) {
      node = blogEntries[i];

      if (window.location.pathname.length > 6) {
        node.classList.remove("blog");
      } else {
        node.classList.add("blog");
      }
    }
  }

  else if (window.location.pathname.indexOf("/work/") === 0) {
    top_container.classList.remove("top-home", "top-blog", "top-dailyui");
    top_container.classList.add("top-work");

    for (i=0; i < nav_a.length; i++) {
      node = nav_a[i];
    }

    $(window).scroll(function() {
      var scroll = $(this).scrollTop();
      if (scroll > $(window).height() ) {
        $('.elevator').show(300);
      } else {
        $('.elevator').hide(300);
      }
    });

  }

  else if (window.location.pathname.indexOf("/dailyui/") === 0) {
    top_container.classList.remove("top-home", "top-blog", "top-work")
    top_container.classList.add("top-dailyui")

    for (i=0; i < nav_a.length; i++) {
      node = nav_a[i];
    }
  }

  else if (window.location.href == homeUrl) {
    top_container.classList.remove("top-blog", "top-work", "top-dailyui");
    top_container.classList.add("top-home");
    homeLinkElement.classList.add("current");
  }

  // this is a blog post
  else {
    console.log(window.location.pathname);
    top_container.classList.remove("top-home", "top-work", "top-dailyui");
    top_container.classList.add("top-blog");
    homeLinkElement.classList.remove("current");

    for (i=0; i < nav_a.length; i++) {
      node = nav_a[i];
    }
  }

  if (window.location.pathname == "/") {
    $('body').css('display', 'block');
  } else {
    $('body').css({
      'display': '-webkit-flex'
    });
  }

})();

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

window.onload = function() {
  var elementButton = document.querySelector('.elevator');
  var elevator = new Elevator({
      element: elementButton,
      duration: 500
  });
  elevator.elevate();
};

var blogGif = $('.blog-gif');

// if hovering over image, swap file extension to from jpg to gif or vice versa
$(blogGif).hover(
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
