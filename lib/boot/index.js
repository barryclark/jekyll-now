var $ = require('jquery'),
    Filter = require('filter');

// Collapsible articles
$('article').each(function () {
    var that = $(this);
    var header = that.children('a');
    var body = that.children('.body');
    body.hide();
    header.toggle(
        function () { body.slideDown('fast'); that.addClass('active'); },
        function () { body.slideUp('fast'); that.removeClass('active'); }
    );
});

var anchor = window.location.hash.substring(1);
if (anchor) $('article a[name=' + anchor + ']').trigger('click');

// Expanding the article on link click and scrolling down to it
$('#sidebar a').each(function () {
    var that = $(this);
    var id = that.attr('href').substring(1);
    that.click(function (e) {
        var header = $('article a[name="'+ id +'"]')
        if (!header.parent().hasClass('active')) header.trigger('click');
        $('html, body').animate({ scrollTop: header.offset().top }, 'fast');
    });

    // If we find a link in the body with similar anchor, add the same behavior
    $('.body a[href=#'+ id +']').click(function (e) {
        $('#sidebar a[href=#'+ id +']').trigger('click');
    });
});

// Hide all/Show all links
var show = $('<a class=\'control show\'>Show all</a>');
show.click(function () {
  $('#content article:not(".active") > a').trigger('click');    
});
$('#content').prepend(show);

var hide = $('<a class=\'control hide\'>Hide all</a>');
hide.click(function () {
  $('#content article.active > a').trigger('click');    
});
$('#content').prepend(hide);

// Making our navigation sticky
new Filter($('#sidebar > ul'));