// jQuery Cookie Plugin v1.3.1 (https://github.com/carhartl/jquery-cookie)
// Copyright 2013 Klaus Hartl. Released under the MIT license

(function(a,b,c){function e(a){return a}function f(a){return g(decodeURIComponent(a.replace(d," ")))}function g(a){return 0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),a}function h(a){return i.json?JSON.parse(a):a}var d=/\+/g,i=a.cookie=function(d,g,j){if(g!==c){if(j=a.extend({},i.defaults,j),null===g&&(j.expires=-1),"number"==typeof j.expires){var k=j.expires,l=j.expires=new Date;l.setDate(l.getDate()+k)}return g=i.json?JSON.stringify(g):g+"",b.cookie=[encodeURIComponent(d),"=",i.raw?g:encodeURIComponent(g),j.expires?"; expires="+j.expires.toUTCString():"",j.path?"; path="+j.path:"",j.domain?"; domain="+j.domain:"",j.secure?"; secure":""].join("")}for(var m=i.raw?e:f,n=b.cookie.split("; "),o=d?null:{},p=0,q=n.length;q>p;p++){var r=n[p].split("="),s=m(r.shift()),t=m(r.join("="));if(d&&d===s){o=h(t);break}d||(o[s]=h(t))}return o};i.defaults={},a.removeCookie=function(b,c){return null!==a.cookie(b)?(a.cookie(b,null,c),!0):!1}})(jQuery,document);


// Hipertextos views

$(function() {
	
	// dropmenu
	
	$(".button-group .droptrigger").click(function(e) {
		var others = $(".dropmenu").not($(this).next('.dropmenu'));
		$(this).next('.dropmenu').toggleClass('opened anime anm-fadeIn');
		$(others).removeClass('opened anime anm-fadeIn');
		e.stopPropagation(); //stops click event from reaching document
	});
	$(document).click(function() {
	  $(".dropmenu").removeClass('opened anime anm-fadeIn');
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
});