// hipertextos scripts: jQuery & CSS basics

// jQuery Cookie Plugin v1.3.1 (https://github.com/carhartl/jquery-cookie)
// Copyright 2013 Klaus Hartl. Released under the MIT license

(function(a,b,c){function e(a){return a}function f(a){return g(decodeURIComponent(a.replace(d," ")))}function g(a){return 0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),a}function h(a){return i.json?JSON.parse(a):a}var d=/\+/g,i=a.cookie=function(d,g,j){if(g!==c){if(j=a.extend({},i.defaults,j),null===g&&(j.expires=-1),"number"==typeof j.expires){var k=j.expires,l=j.expires=new Date;l.setDate(l.getDate()+k)}return g=i.json?JSON.stringify(g):g+"",b.cookie=[encodeURIComponent(d),"=",i.raw?g:encodeURIComponent(g),j.expires?"; expires="+j.expires.toUTCString():"",j.path?"; path="+j.path:"",j.domain?"; domain="+j.domain:"",j.secure?"; secure":""].join("")}for(var m=i.raw?e:f,n=b.cookie.split("; "),o=d?null:{},p=0,q=n.length;q>p;p++){var r=n[p].split("="),s=m(r.shift()),t=m(r.join("="));if(d&&d===s){o=h(t);break}d||(o[s]=h(t))}return o};i.defaults={},a.removeCookie=function(b,c){return null!==a.cookie(b)?(a.cookie(b,null,c),!0):!1}})(jQuery,document);

// TOC [Table of Content Generator]

(function($) {
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);

  var container = $(opts.container);
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
  var activeClassName = opts.prefix+'-active';

  var scrollTo = function(e) {
    if (opts.smoothScrolling) {
      e.preventDefault();
      var elScrollTo = $(e.target).attr('href');
      var $el = $(elScrollTo);

      $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
        location.hash = elScrollTo;
      });
    }
    $('li', self).removeClass(activeClassName);
    $(e.target).parent().addClass(activeClassName);
  };

  //highlight on scroll
  var timeout;
  var highlightOnScroll = function(e) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      var top = $(window).scrollTop(),
        highlighted;
      for (var i = 0, c = headingOffsets.length; i < c; i++) {
        if (headingOffsets[i] >= top) {
          $('li', self).removeClass(activeClassName);
          highlighted = $('li:eq('+(i-1)+')', self).addClass(activeClassName);
          opts.onHighlight(highlighted);
          break;
        }
      }
    }, 50);
  };
  if (opts.highlightOnScroll) {
    $(window).bind('scroll', highlightOnScroll);
    highlightOnScroll();
  }

  return this.each(function() {
    //build TOC
    var el = $(this);
    var ul = $('<ul/>');
    headings.each(function(i, heading) {
      var $h = $(heading);
      headingOffsets.push($h.offset().top - opts.highlightOffset);

      //add anchor
      var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h);

      //build TOC item
      var a = $('<a/>')
        .text(opts.headerText(i, heading, $h))
        .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
        .bind('click', function(e) { 
          scrollTo(e);
          el.trigger('selected', $(this).attr('href'));
        });

      var li = $('<li/>')
        .addClass(opts.itemClass(i, heading, $h, opts.prefix))
        .append(a);

      ul.append(li);
    });
    el.html(ul);
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  prefix: 'toc',
  onHighlight: function() {},
  highlightOnScroll: true,
  highlightOffset: 100,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  },
  headerText: function(i, heading, $heading) {
    return $heading.text();
  },
  itemClass: function(i, heading, $heading, prefix) {
    return prefix + '-' + $heading[0].tagName.toLowerCase();
  }

};

})(jQuery);

// Hipertextos UI components

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

	//Add class to links to current page
	
	$("a").each(function(){
		if ($(this).attr("href") == window.location.pathname){
			$(this).addClass("current");
		}
	});
       
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
	
	// Social links
	
	var url = document.URL;
	$('.buttons-share').html('<ul>'+
		'<li><a href="http://www.facebook.com/sharer.php?u='+ url +'&t=title" title="Share now">Share on Facebook</a></li>'+
		'<li><a href="https://plusone.google.com/_/+1/confirm?hl=en&url='+ url +'" title="Share now">Share on Google +</a></li>'+
		'<li><a href="http://twitter.com/?status='+ url +'" title="Tweet now">Share on Twitter</a></li>'+
	'</ul>');
	
	// Translate links

	$('.buttons-translate').html('<ul>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=ca&u='+ url +'" title="Translate with Google Translate">Catalan</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=de&u='+ url +'" title="Translate with Google Translate">Deutsch</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=en&u='+ url +'" title="Translate with Google Translate">English</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=fr&u='+ url +'" title="Translate with Google Translate">French</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=it&u='+ url +'" title="Translate with Google Translate">Italian</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=pt&u='+ url +'" title="Translate with Google Translate">Portuguese</a></li>'+
		'<li><a href="http://translate.google.es/translate?hl=es&sl=auto&tl=es&u='+ url +'" title="Translate with Google Translate">Spanish</a></li>'+
	'</ul>');

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
	
	// Custom menu
	
	// Opening the menu
	$("#menu .brand").click(function(){
		$("#menu").toggleClass('light');
		$("#menu .nav-content").toggleClass('closed');
		return false;
	});
	// Custom menu cookies
	$("#page").addClass('toright');
	var menu_position = $.cookie('htmenuposition');
	if( typeof menu_position !== "undefined" && menu_position == "htmenuleft" ) {
		$("#menu").removeClass('top right bottom');
    	$("#menu").addClass('left');
		$("#page").removeClass('totop toleft tobottom');
    	$("#page").addClass('toright');
	} else {
	}
	if( typeof menu_position !== "htmenuleft" && menu_position == "htmenuleft" ) {
		$("#menu").removeClass('top right bottom');
    	$("#menu").addClass('left');
		$("#page").removeClass('totop toleft tobottom');
    	$("#page").addClass('toright');
	} else {
	}
	if( typeof menu_position !== "htmenutop" && menu_position == "htmenutop" ) {
		$("#menu").removeClass('left right bottom');
    	$("#menu").addClass('top');
		$("#page").removeClass('totop toleft toright');
    	$("#page").addClass('tobottom');
	} else {
	}
	if( typeof menu_position !== "htmenuright" && menu_position == "htmenuright" ) {
		$("#menu").removeClass('top left bottom');
    	$("#menu").addClass('right');
		$("#page").removeClass('totop toright tobottom');
    	$("#page").addClass('toleft');
	} else {
	}
	if( typeof menu_position !== "htmenubottom" && menu_position == "htmenubottom" ) {
		$("#menu").removeClass('top left right');
    	$("#menu").addClass('bottom');
		$("#page").removeClass('toleft toright tobottom');
    	$("#page").addClass('totop');
	} else {
	}
	// Custom menu sets
	$("#view-menu-top").click(function(){
		$.cookie('htmenuposition', 'htmenutop');
		$("#menu").removeClass('left right bottom');
    	$("#menu").addClass('top');
		$("#page").removeClass('totop toleft toright');
    	$("#page").addClass('tobottom');
	});
	$("#view-menu-left").click(function(){
		$.cookie('htmenuposition', 'htmenuleft');
		$("#menu").removeClass('top right bottom');
    	$("#menu").addClass('left');
		$("#page").removeClass('totop toleft tobottom');
    	$("#page").addClass('toright');
	});
	$("#view-menu-right").click(function(){
		$.cookie('htmenuposition', 'htmenuright');
		$("#menu").removeClass('top left bottom');
    	$("#menu").addClass('right');
		$("#page").removeClass('totop toright tobottom');
    	$("#page").addClass('toleft');
	});
	$("#view-menu-bottom").click(function(){
		$.cookie('htmenuposition', 'htmenubottom');
		$("#menu").removeClass('top left right');
    	$("#menu").addClass('bottom');
		$("#page").removeClass('toleft toright tobottom');
    	$("#page").addClass('totop');
	});
		
	// Viewer

	// Viewers cookies
	var viewerstyle = $.cookie('htviewerstyle');
	if( typeof viewerstyle !== "undefined" && viewerstyle == "htviewerresume" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("resume");
	} else {
	}
	if( typeof viewerstyle !== "htviewerresume" && viewerstyle == "htviewerresume" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("resume");
	} else {
	}
	if( typeof viewerstyle !== "htviewerlisted" && viewerstyle == "htviewerlisted" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("listed");
	} else {
	}
	if( typeof viewerstyle !== "htviewergallery" && viewerstyle == "htviewergallery" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("gallery");
	} else {
	}
	if( typeof viewerstyle !== "htviewermosaic" && viewerstyle == "htviewermosaic" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("mosaic");
	} else {
	}
	if( typeof viewerstyle !== "htviewerfull" && viewerstyle == "htviewerfull" ) {
		$("#viewer").removeClass();
		$("#viewer").addClass("full");
	} else {
	}
	// Viewer sets
	$("#view-resume").click(function(){
		$.cookie('htviewerstyle', 'htviewerresume');
		$("#viewer").removeClass();
		$("#viewer").addClass("resume");
	});
	$("#view-listed").click(function(){
		$.cookie('htviewerstyle', 'htviewerlisted');
		$("#viewer").removeClass();
		$("#viewer").addClass("listed");
	});
	$("#view-gallery").click(function(){
		$.cookie('htviewerstyle', 'htviewergallery');
		$("#viewer").removeClass();
		$("#viewer").addClass("gallery");
	});
	$("#view-mosaic").click(function(){
		$.cookie('htviewerstyle', 'htviewermosaic');
		$("#viewer").removeClass();
		$("#viewer").addClass("mosaic");
	});
	$("#view-full").click(function(){
		$.cookie('htviewerstyle', 'htviewerfull');
		$("#viewer").removeClass();
		$("#viewer").addClass("full");
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
	
	// Toc launch
	
	$('#toc').toc();
	
});