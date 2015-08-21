(function swapTopSectionClass() {
  var top_container = document.querySelector(".top");
  var nav_a = document.querySelectorAll(".navbar a");
  var node;
  var i;
  var blogEntries = document.querySelectorAll(".container.posts");

  switch (window.location.pathname) {

    case "/blog/":
      top_container.classList.remove("top-home", "top-work");
      top_container.classList.add("top-blog");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      for (i=0; i < blogEntries.length; i++) {
        node = blogEntries[i];
        node.classList.add("blog");
      }

      break;

    case "/work/":
      top_container.classList.remove("top-home", "top-blog");
      top_container.classList.add("top-work");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      break;

    case "/":
      top_container.classList.remove("top-blog", "top-work");
      top_container.classList.add("top-home");

      break;

    // this this a blog post
    default:
      console.log(window.location.pathname);
      top_container.classList.remove("top-home", "top-work");
      top_container.classList.add("top-blog");

      for (i=0; i < nav_a.length; i++) {
        node = nav_a[i];
        node.style.color = "rgba(0,0,0,0.5)";
      }

      break;
  } // end switch

  if (window.location.pathname == "/") {
    $('body').css('display', 'block');
  } else {
    $('body').css({
      'display': '-webkit-flex'
    });
  }

})();

window.onload = function() {
  var elementButton = document.querySelector('.elevator');
  var elevator = new Elevator({
      element: elementButton,
      duration: 500
  });
};

elevator.elevate();

/**
 * for GT Case Study
 */
// ol no. 0 #logo
$(".card ol a:first-child").click(function(){$("html,body")
  .animate({scrollTop:$("#logo").offset().top},"500");return false;});
// ol no. 1 #typography
$(".card ol a:first-child + 1").click(function(){$("html,body")
  .animate({scrollTop:$("#typography").offset().top},"500");return false;});
// ol no. 2 #usability
$(".card ol a:first-child + 2").click(function(){$("html,body")
  .animate({scrollTop:$("#usability").offset().top},"500");return false;});
// ol no. 3 #advertising
$(".card ol a:first-child + 3").click(function(){$("html,body")
  .animate({scrollTop:$("#advertising").offset().top},"500");return false;});
