// Off Canvas Sliding

$(document).ready(function(){
	$('.js-menu-trigger').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu').toggleClass('is-visible');
		$('.js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead').toggleClass('slide');
		$('#page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
	$('.js-menu-screen').on('click touchstart', function(e){
		$('body').toggleClass('no-scroll');
		$('.js-menu').toggleClass('is-visible');
		$('.js-menu-screen').toggleClass('is-visible');
		$('.sliding-menu-button').toggleClass('slide close');
		$('#masthead').toggleClass('slide');
		$('#page-wrapper').toggleClass('slide');
		e.preventDefault();
	});
});

// FitVids
$(document).ready(function(){
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();
});