// jQuery & CSS basic components

// by Acozar [www.hipertextos.net]

$(function() {
	
	// Collapse dropmenu, accordion and tabs
	$('.jcollapser .jcollapsed').toggleClass('closed');
	$('.jcollapser .jtrigger').click(function(e){
		$(this).next('.jcollapsed').toggleClass('closed anime anm-fadeIn').siblings('.jcollapsed:visible').toggleClass('closed anime anm-fadeIn');
	});
	
	// Multiple collapse by ID
	
	$('.idpanel').toggleClass('closed');
	$('.idtrigger').click(function(e){
		var currentPanel = $(this).attr('href');
		$(currentPanel).toggleClass('closed anime anm-fadeIn').siblings('.idpanel:visible').toggleClass('closed anime anm-fadeIn');
		if ($('.idpanel:visible').length) {
		} else {
		}
	});
	
	// Tabs with data-tab

	$('.tabs section').toggleClass('closed');
    $('.tabs nav a').click(function(){
        var tab_id = $(this).attr('data-tab');
        $(this).toggleClass('current').siblings('.tabs nav a').removeClass('current');
        $('.tabs .'+tab_id).toggleClass('closed anime anm-fadeIn').siblings('section:visible').toggleClass('closed anime anm-fadeIn');
    });
    
	// Menu with data-tab
    
	$('.menu section').toggleClass('closed');
    $('.menu nav a').click(function(){
        var tab_id = $(this).attr('data-tab');
        $(this).toggleClass('current').siblings('.menu nav a').removeClass('current');
        $('.menu .'+tab_id).toggleClass('closed anime anm-fadeIn').siblings('section:visible').toggleClass('closed anime anm-fadeIn');
       if($('.menu section').is(':visible')){
           $("#page").addClass('page-side');
       } else if ($('.menu section').is(':hidden')) {
           $("#page").removeClass('page-side');
       }; 
    });
	
	// Dialogs
	
	$('body').prepend('<div class="overlay closed"></div>');

	$('.dialog').toggleClass('closed');
	$('.button-modal, .dialog .button-close').click(function(){
		var currentDialog = $(this).attr('href');
		$('.overlay').toggleClass('closed anime anm-fadeIn');
		$(currentDialog).toggleClass('closed anime anm-moveFromTop');
	});

	//Add class 'link-internal' to links to current domain
	
	var siteURL = "http://" + top.location.host.toString();
	var $internalLinks = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']");
	$($internalLinks).addClass('link-internal');

    // Reload button
    
	$('.button-reload').click(function() {
    	location.reload();
	});
	
	// Link to top
	
	$('#page').prepend('<a href="#page" class="button-icon l circled unify symbol-top to-top" id="to-top"></a>');
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#to-top').fadeIn();	
		} else {
			$('#to-top').fadeOut();
		}
	});
	
	// Smooth scroll 
	
	$('a[href*=#]').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		&& location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[id=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
	});
	
	// Collapse horizontal nav in small devices
	
	$('#nav-collapse').toggleClass('nav-collapsed');
	$('nav .toggle').click(function(){
		$('#nav-collapse').toggleClass('nav-collapsed');
	});
	
	// Simple alerts (close on click)
	
	$('.alert').click(function(){
		$(this).toggleClass('closed');
	});
	
	// Focusable elements
	
	$('.focusable').click(function(){
		$(this).toggleClass('focused anime anm-fadeIn');
	});
	
	// Working buttons
	
	$('.prework').click(function (e) {
		e.preventDefault(); 
		var goTo = this.getAttribute("href");
		$(this).toggleClass('working');
		setTimeout(function(){
			 window.location = goTo;
		},3000);       
	}); 
	
	// Dropmenu
	
	$(".button-group .droptrigger").click(function(e) {
		var others = $(".dropmenu").not($(this).next('.dropmenu'));
		$(this).next('.dropmenu').toggleClass('opened anime anm-fadeIn');
		$(others).removeClass('opened anime anm-fadeIn');
		e.stopPropagation(); //stops click event from reaching document
	});
	$(document).click(function() {
	  $(".dropmenu").removeClass('opened anime anm-fadeIn');
	});
	
	// Popmenu
	
	$(".button-group .poptrigger").click(function(e) {
		var others = $(".popmenu").not($(this).next('.popmenu'));
		$(this).next('.popmenu').toggleClass('opened anime anm-fadeIn');
		$(others).removeClass('opened anime anm-fadeIn');
		e.stopPropagation(); //stops click event from reaching document
	});
	$(document).click(function() {
	  $(".popmenu").removeClass('opened anime anm-fadeIn');
	});
	
	// Tooltip
	
	$('.tip').hover(function(){
		var title = $(this).attr('title');
		$(this).data('tipText', title).removeAttr('title');
		$('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
	}, function() {
		$(this).attr('title', $(this).data('tipText'));
		$('.tooltip').remove();
	}).mousemove(function(e) {
		var mousex = e.pageX + 4; //Get X coordinates
		var mousey = e.pageY - 24; //Get Y coordinates
		$('.tooltip').css({ top: mousey, left: mousex })
	});
	
	// Side Menu
	
	$(".open-side-menu").click(function(e) {
		$("#side-menu").toggleClass('closed left anm-moveFromLeft delay-500');
    	$("#page").toggleClass('page-side toright anm-fadeIn delay-500');
    	$(".open-side-menu").toggleClass('symbol-iching-heaven symbol-remove');
	});
	
	// Alert on end scroll
	
	var lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
		   // downscroll code
		   $('#footer').addClass('line-top red anm-bounce');
	   } else {
		  // upscroll code
		   $('#footer').removeClass('line-top red anm-bounce');
	   }
	   lastScrollTop = st;
	});
	
});