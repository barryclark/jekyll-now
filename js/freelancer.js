/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin

// Navbar height on desktop is 80 px
let navbarOffset = 80;
let isMobileInitialized = false;

function reinitializeOffset() {
  // 768 px is the breakpoint where navbar height changes to 60 px
  // Therefore updating both offset and scrollspy to work correctly
  if ($(window).width() < 768 && !isMobileInitialized) {
      navbarOffset = 60;
      initScrollSpy();
      isMobileInitialized = true;
  } else {
      isMobileInitialized = false;
  }
}

$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        // Fixing this on click of the menu item
        // where it is expected to work.
        reinitializeOffset();
        
        // actually scrolling to the position
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - navbarOffset
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

let initScrollSpy = function(){
  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: navbarOffset + 0.5
  })
}
initScrollSpy();

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
