$(function() {

	// add meta tags
	// var metas = `
	// <meta charset="utf-8" />
	// <meta name="description" content="The official website for the Barlow Programming team" />
	// <meta name="keywords" content="joel barlow, barlow, jbhs, programming, coding" />
	// <meta name="author" content="Jonathan Lam <jlam55555@gmail.com>" />
	// <link rel="icon" type="img/x-icon" href="/favicon.ico" />
	// <link rel="stylesheet" type="text/css" href="/style.css" />
	// <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />
	// `;
	// $("head").append(metas);
	//
	// // add header
	// var links = `
	// 	<a class="noSelect" href="/">Home</a>
	// 	<a class="noSelect" href="/projects/">Projects</a>
	// 	<a class="noSelect" href="/team/">Team</a>
	// 	<a class="noSelect" href="/contact/">Contact</a>
	// `;
	// var header = `
	// <div id="header">
	// 	<div id="title" class="noSelect" >JBHS Programming Club</div>
	// 	<nav id="links">
	// ` + links + `
	// 	</nav>
	// </div>
	// `;
	// $("body").prepend(header);

	// title animation (only if cookie has not been set)
	if(!/visited=1/.test(document.cookie)) {
		var titleElem = $("div#title");
		var title = titleElem.text();
		var titleIndex = 0;
		titleElem.empty();
		var t = setInterval(function() {
			titleElem.append(title.charAt(titleIndex++));
			if(titleIndex == title.length)
				clearInterval(t);
		}, 100);
		document.cookie = "visited=1";
	} else {
		$("div#title").addClass("noDelay");
	}

	// get mouse position (for special animations -- see below)
	var mouseX = 0, mouseY = 0;
	$(document).on("mousemove", function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	// make the active tab highlighted for emphasis
	var highlightCurrent = function() {
		var current = $("nav#links > a[href='" + window.location.pathname + "']");
		setTimeout(function() {current.addClass("currentPage")}, 1);
		current.removeAttr("href");
		// Google-Material-ripple-effect-like animation
		var currentMouseY = mouseY, currentMouseX = mouseX;
		var ripple = $("<div>");
		var toRadius = current.width();
		ripple.addClass("ripple");
		ripple.css({
			top: currentMouseY - current.offset().top,
			left: currentMouseX - current.offset().left,
			height: 0,
			width: 0
		});
		current.append(ripple);
		ripple.animate({
			height: toRadius*2,
			width: toRadius*2,
			opacity: 0,
			top: "-=" + toRadius,
			left: "-=" + toRadius
		}, 1000, function() {
			ripple.remove();
		});
	};
	highlightCurrent();

	// change page contents without load if pointing to own website
	$(document).on("click", "nav#links > a:not(.currentPage)", function(e) {
		var href = $(this).attr("href");
		$("div#container").load(href + " div#container > *", function() {
			// call resizeFunction() just in case formatting needs to happen
			resizeFunction();
		});
		// GET request for title because load() cannot do it (why?)
		$.get(href, function(data) {
			$("title").text(/<title>(.+?)<\/title>/.exec(data)[1]);
		});
		// change URL without refresh
		window.history.pushState("", "", href);
		$("nav#links").html(links);
		highlightCurrent();
		e.preventDefault();
	});

	var $window = $(window);
	// functions to do on resize (and load)
	var resizeFunction = function() {
		var winHeight = $window.height();
		var winWidth = $window.width();
		// auto-set height of introduction piece in index.html
		// window.innerHeight is necessary here, instead of $(window).height
		// because it doesn't factor in scrollbars, which may mess with it on the initial load
		$("div#introduction").css({height: window.innerHeight-150});
	};
	$window.resize(resizeFunction).resize();

	// shorten header after scroll
	var $navLinks = $("nav#links");
	$window.scroll(function() {
		$window.scrollTop() > 100 ?
			$navLinks.addClass("fixed") :
			$navLinks.removeClass("fixed");
	});

});
