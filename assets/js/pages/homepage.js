$(document).ready(function(){
    $('html').addClass('js');
    $('.scrollLink').on('click', function(e){
        e.preventDefault();
        var selector = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, 2000);
    });

});
