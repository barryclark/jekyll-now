$(document).ready(function() {
    $(function(){
        $(".typed").typed({
            strings: ["build websites.", "solve problems.", "work collaboratively."],
        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
        stringsElement: null,
        // typing speed
        typeSpeed: 100,
        // time before typing starts
        startDelay: 1200,
        // backspacing speed
        backSpeed: 20,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: true,
        // false = infinite
        loopCount: 3,
        // show cursor
        showCursor: false,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    });
    });

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