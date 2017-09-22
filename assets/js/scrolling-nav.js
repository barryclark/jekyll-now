$(document).ready(function() {

    $('.gallery-item').hover( function() {
        $(this).find('.img-title').fadeIn(300);
    }, function() {
        $(this).find('.img-title').fadeOut(100);
    });
    
    //scrollspy
    //smooth scrolling
    $("#toTop").hide();

            // fade in & out
            $(window).scroll(function () {
                if ($(this).scrollTop() > 400) {
                    $('#toTop').fadeIn();
                } else {
                    $('#toTop').fadeOut();
                }
            });
            $('a[href*=#]').each(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                    && location.hostname == this.hostname
                    && this.hash.replace(/#/,'') ) {
                  var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
              var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
              if ($target) {
                 var targetOffset = $target.offset().top;
                 $(this).click(function() {
                   $('html, body').animate({scrollTop: targetOffset}, 400);
                   return false;
               });
             }
         }
     });

    // Activate scrollspy
    $('body').scrollspy({
        target: '.navbar',
        offset: 54
    });
});
