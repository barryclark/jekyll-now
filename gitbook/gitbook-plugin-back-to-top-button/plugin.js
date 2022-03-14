require([
    'gitbook',
    'jquery'
], function(gitbook, $) {
    gitbook.events.on('page.change', function() {
        var back_to_top_button = ['<div class="back-to-top"><i class="fa fa-arrow-up"></i></div>'].join("");
        $(".page-wrapper").append(back_to_top_button)
    
        $(".back-to-top").hide();

        $(".back-to-top").hover(function() {
            $(this).css('cursor', 'pointer').attr('title', 'Back to top');
        }, function() {
            $(this).css('cursor', 'auto');
        });
    
        $('.book-body,.body-inner').on('scroll', function () {
            if ($(this).scrollTop() > 100) { 
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });
    
        $('.back-to-top').on('click', function () { 
            $('.book-body,.body-inner').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});
