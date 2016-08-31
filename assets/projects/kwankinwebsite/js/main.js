;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
	      (navigator.platform.indexOf("iPhone") != -1) || 
	      (navigator.platform.indexOf("iPod") != -1)
	    );
	};

	
	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	var menuAnimate = function(o, mleft, duration, mul) {
		var navLi = $('#kkwp-nav > ul > li');
		navLi.each( function(k){
			var el = $(this);
			setTimeout(function() {
				el.velocity(
					{ opacity: o, marginLeft: mleft }, 
					{ duration: duration }
				);
			},  k * mul );
		});
		
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-kkwp-nav-toggle', function(){
			$('#kkwp-nav > ul > li').css({ marginLeft: -50, opacity: 0 });
			$(this).toggleClass('active');
			
			var mainNav = $('#kkwp-main-nav');
			mainNav.slideToggle(400).toggleClass('active');
			

			if ( mainNav.hasClass('active') ) {
				menuAnimate(1, 0, 400, 200);	
			} else {
				menuAnimate(0, -50, 1, 0);	
			}

		});
	};

	var mobileMenuState = function() {
		if ( $(window).width() > 768 ) {
			$('#kkwp-main-nav').removeClass('active').show();
			$('#kkwp-nav > ul > li').css({
				opacity: 1,
				marginLeft: 0
			})
		} else {
			$('.js-kkwp-nav-toggle').removeClass('active');
			$('#kkwp-main-nav').hide();
		}
	};

	var wResize = function() {
		mobileMenuState();
		$(window).resize(function(){
			mobileMenuState();
		});
	};


	// Easy Repsonsive Tabs
	var responsiveTabs = function(){
		$('#kkwp-tab-feature').easyResponsiveTabs({
	      type: 'default',
	      width: 'auto', 
	      fit: true, 
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion',
	      tabidentify: 'hor_1'
	            
	    });
	    $('#kkwp-tab-feature-center').easyResponsiveTabs({
	      type: 'default',
	      width: 'auto',
	      fit: true, 
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion', 
	      tabidentify: 'hor_1' 
	      
	    });
	    $('#kkwp-tab-feature-vertical').easyResponsiveTabs({
	      type: 'vertical',
	      width: 'auto',
	      fit: true,
	      inactive_bg: '',
	      active_border_color: '',
	      active_content_border_color: '',
	      closed: 'accordion',
	      tabidentify: 'hor_1'
	    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items: 1,
		    loop: true,
		    margin: 0,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-down owl-direction'></i>",
		      "<i class='ti-arrow-up owl-direction'></i>"
	     	]
		});
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			autoPlay: 3000,
			items: 5,
		    loop: false,
		    margin: 0,
		    responsiveClass: true,
		    nav: false,
		    dots: true,
		    smartSpeed: 200,
		    autoHeight: true
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	// Smooth Scroll Top
	var sScrollTop = function () {

		$(window).scroll(function(){
			if ($(window).scrollTop() > 100 ) {
				$('.kkwp-gotop').show();
			} else {
				$('.kkwp-gotop').hide();
			}
		});
		$('.kkwp-gotop').click(function(event){

		    $('html, body').animate({
		        scrollTop: 0
		    }, 500);

		    event.preventDefault();
		    return false;
		});
	};

	// Contact click to form
	var scrollToContactStart = function () {

		$('#contactStartButton').click(function(event){

		    $('html, body').animate({
	        scrollTop: $("#contactFormMargin").offset().top
		    }, 500);

		    event.preventDefault();
		    return false;
		});
	};
	
	// Contact click to Info Tab
	var scrollToOfficeInfo = function () {

		$('#officeInfoButton').click(function(event){

		    $('html, body').animate({
	        scrollTop: $("#officeInfoMargin").offset().top
		    }, 500);

		    event.preventDefault();
		    return false;
		});
	};



	var emailContactForm = function () { 
		
	  $('#contact-form').on('submit', function(event) {
			event.preventDefault();
			var $form = $('#contact-form')
			var $formMessages = $('#form-messages')
			var url = $form.attr('action')
			console.log(url)
			var formData = $form.serialize()
			console.log(formData)

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				beforeSend: function (request) {
	        request.setRequestHeader("Access-Control-Allow-Origin", "*");
	        request.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

        },
				url: url,
				data: formData
			}).done(function(response) {
				$formMessages.removeClass('error')
				$formMessages.addClass('success')

				$formMessages.text(response)

				// Clear the form
				$('#name').val('')
				$('#email').val('')
				$('#message').val('')
				// $('#questionType').val('')
			}).fail(function(data) {
				$formMessages.removeClass('success')
				$formMessages.addClass('error')

				if (data.responseText !== '') {
					$formMessages.text(data.responseText)
				} else {
					$formMessages.text("Failed! Message cannot be sent")
				}
			})
		})
	};


	$(function(){
		burgerMenu();
		mobileFastClick();
		responsiveTabs();
		magnifPopup();
		owlCrouselFeatureSlide();
		testimonialCarousel();
		sScrollTop();
		wResize();
		scrollToContactStart();
		scrollToOfficeInfo();
		emailContactForm();

	})
}());