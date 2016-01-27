$('document').ready(function(){
    $('.fa-navicon').click(function(e) {
        e.preventDefault();

        $('.navbar').slideToggle('fast');
    });
});