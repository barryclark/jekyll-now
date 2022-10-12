$(document).ready(function(){

    $('.button-submenu').on('click', function(event){
        if(event.target === this){
            $(event.target).parent().parent().toggleClass('open');
            $(event.target).toggleClass('open');
        }
    });

    $('#menuToggle').on('click', function(event){
        $('.menu').toggleClass('open');
        $(event.target).toggleClass('open');
    });
});