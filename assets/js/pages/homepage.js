$(document).ready(function(){
    $('html').addClass('js');
    $('.scrollLink').on('click', function(e){
        e.preventDefault();

        if (COM && COM.SiteHeader) {
            COM.SiteHeader.showSiteHeader();
        }

        var selector = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(selector).offset().top - 74
        }, 2000);
    });

});
