var callback = function(){
	$('.item-conhecimento').each(function(){
		newWidth = $(this).parent().width() * $(this).data('percent');
		$(this).width(0);
    $(this).animate({
        width: newWidth,
    }, 1000);
	});
	$('.icones-vermelho').each(function(){
		height = $(this).height();
    $(this).animate({
        height: 14,
    }, 2000);
	});
};
$(document).ready(callback);

var resize;
window.onresize = function() {
	clearTimeout(resize);
	resize = setTimeout(function(){
		callback();
	}, 100);
};

$('.phone').text(function(i, text) {
	return text.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
});