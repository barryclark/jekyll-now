// Animation on scroll

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);


	var win = $(window);
	var din1 = $('.din-flash');
	var din2 = $('.din-shake');
	var din3 = $('.din-bounce');
	var din4 = $('.din-tada');
	var din5 = $('.din-wobble');
	var din6 = $('.din-pulse');
	var din7 = $('.din-fall');
	var din8 = $('.din-fadeIn');
	var din9 = $('.din-scaleUp');
	var din10 = $('.din-scaleUpDown');
	var din11 = $('.din-moveFromLeft');
	var din12 = $('.din-moveFromRight');
	var din13 = $('.din-moveFromTop');
	var din14 = $('.din-moveFromBottom');
	var din15 = $('.din-moveFromLeftFade');
	var din16 = $('.din-moveFromRightFade');
	var din17 = $('.din-moveFromTopFade');
	var din18 = $('.din-moveFromBottomFade');
	var din19 = $('.din-zoomIn');
	var din20 = $('.din-zoomInLeft');
	var din21 = $('.din-zoomInRight');
	var din22 = $('.din-zoomInUp');
	var din23 = $('.din-zoomInDown');
	var din24 = $('.din-rotateIn');
	var din25 = $('.din-rotateInDownLeft');
	var din26 = $('.din-rotateInDownRight');
	var din27 = $('.din-rotateInUpLeft');
	var din28 = $('.din-rotateInUpRight');
	var din29 = $('.din-rotatePullLeft');
	var din30 = $('.din-rotatePullRight');
	var din31 = $('.din-rotatePullTop');
	var din32 = $('.din-rotatePullBottom');
	var din33 = $('.din-flip');
	var din34 = $('.din-flipInLeft');
	var din35 = $('.din-flipInRight');
	var din36 = $('.din-flipInTop');
	var din37 = $('.din-flipInBottom');
	var din38 = $('.din-rotateInNewspaper');

	win.scroll(function(event) {
	  din1.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flash slow'); } else { el.removeClass('anm-flash slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din2.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-shake slow'); } else { el.removeClass('anm-shake slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din3.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-bounce slow'); } else { el.removeClass('anm-bounce slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din4.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-tada slow'); } else { el.removeClass('anm-tada slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din5.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-wobble slow'); } else { el.removeClass('anm-wobble slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din6.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-pulse slow'); } else { el.removeClass('anm-pulse slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din7.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-fall slow'); } else { el.removeClass('anm-fall slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din8.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-fadeIn slow'); } else { el.removeClass('anm-fadeIn slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din9.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-scaleUp slow'); } else { el.removeClass('anm-scaleUp slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din10.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-scaleUpDown slow'); } else { el.removeClass('anm-scaleUpDown slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din11.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromLeft slow'); } else { el.removeClass('anm-moveFromLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din12.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromRight slow'); } else { el.removeClass('anm-moveFromRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din13.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromTop slow'); } else { el.removeClass('anm-moveFromTop slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din14.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromDown slow'); } else { el.removeClass('anm-moveFromDown slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din15.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromLeftFade slow'); } else { el.removeClass('anm-moveFromLeftFade slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din16.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromRightFade slow'); } else { el.removeClass('anm-moveFromRightFade slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din17.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromTopFade slow'); } else { el.removeClass('anm-moveFromTopFade slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din18.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-moveFromBottomFade slow'); } else { el.removeClass('anm-moveFromBottomFade slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din19.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-zoomIn slow'); } else { el.removeClass('anm-zoomIn slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din20.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-zoomInLeft slow'); } else { el.removeClass('anm-zoomInLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din21.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-zoomInRight slow'); } else { el.removeClass('anm-zoomInRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din22.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-zoomInUp slow'); } else { el.removeClass('anm-zoomInUp slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din23.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-zoomInDown slow'); } else { el.removeClass('anm-zoomInDown slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din24.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateIn slow'); } else { el.removeClass('anm-rotateIn slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din25.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateInDownLeft slow'); } else { el.removeClass('anm-rotateInDownLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din26.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateInDownRight slow'); } else { el.removeClass('anm-rotateInDownRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din27.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateInUpLeft slow'); } else { el.removeClass('anm-rotateInUpLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din28.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateInUpRight slow'); } else { el.removeClass('anm-rotateInUpRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din29.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotatePullLeft slow'); } else { el.removeClass('anm-rotatePullLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din30.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotatePullRight slow'); } else { el.removeClass('anm-rotatePullRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din31.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotatePullTop slow'); } else { el.removeClass('anm-rotatePullTop slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din32.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotatePullBottom slow'); } else { el.removeClass('anm-rotatePullBottom slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din33.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flip slow'); } else { el.removeClass('anm-flip slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din34.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flipInLeft slow'); } else { el.removeClass('anm-flipInLeft slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din35.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flipInRight slow'); } else { el.removeClass('anm-flipInRight slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din36.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flipInTop slow'); } else { el.removeClass('anm-flipInTop slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din37.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-flipInBottom slow'); } else { el.removeClass('anm-flipInBottom slow'); } 
	  });
	});
	win.scroll(function(event) {
	  din38.each(function(i, el) {
		var el = $(el);
		if (el.visible(true)) { el.addClass('anm-rotateInNewspaper slow'); } else { el.removeClass('anm-rotateInNewspaper slow'); } 
	  });
	});

	
	
// Animation on slides

var PageTransitions = (function($) {
  var startElement = 0,
  animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  }

  function getTransitionPrefix() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'animation';
    if(typeof s[p] == 'string')
      return 'animation';

    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for( var i=0; i<v.length; i++ ) {
      if(typeof s[v[i] + p] == 'string')
        return v[i] + p;
    }
    return false;
  }
  // animation end event name
  animEndEventName = animEndEventNames[getTransitionPrefix()];

  function init() {
    $(".slide-page").each(function() {
      $(this).data('originalClassList', $(this).attr('class'));
    });
    $(".slide-wrapper").each(function() {
      $(this).data('current', 0);
      $(this).data('isAnimating', false);
      $(this).children(".slide-page").eq(startElement).addClass('slide-page-current');
    });

    $(".slide-trigger").click(function() {
      animate($(this));
    });
  }

  function animate(block, callback) {
    nextPage($(block).closest('.slide-wrapper'), $(block).attr('slide-out'), $(block).attr('slide-in'),$(block).attr('slide-step'),callback);
  }

  function nextPage(block, outClass, inClass,step, callback) {
    if(step==undefined) step=1;
    block = $(block);
    inClass = formatClass(inClass);
    outClass = formatClass(outClass);
    var current = block.data('current'),
    	$pages = block.children('.slide-page'),
    	pagesCount = $pages.length,
    	endCurrPage = false,
    	endNextPage = false;

    if(block.data('isAnimating')) {
      return false;
    }

    block.data('isAnimating', true);

    var $currPage = $pages.eq(current);
    current=current*1 + step*1;
    if(current >= pagesCount  ) {
      current=0;
    }
    block.data('current', current);

    var $nextPage = $pages.eq(current).addClass('slide-page-current');

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if(endNextPage) {
        if(jQuery.isFunction(callback)) {
          callback(block, $nextPage, $currPage);
        }
        onEndAnimation($currPage, $nextPage, block);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if(endCurrPage) {
        onEndAnimation($currPage, $nextPage, block);
      }
    });
  }

  function onEndAnimation($outpage, $inpage, block) {
    resetPage($outpage, $inpage);
    $outpage.trigger("animation.out.complete");
    $inpage.trigger("animation.in.complete");
    block.data('isAnimating', false);
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data( 'originalClassList'));
    $inpage.attr('class', $inpage.data( 'originalClassList') + ' slide-page-current');
  }

  function formatClass(str) {
    classes = str.split(" ");
    output = "";
    for(var n=0; n<classes.length; n++){
      output += " anm-" + classes[n];
    }
    return output;
  }
  return {
    init : init,
    nextPage: nextPage,
    animate: animate
  };
})(jQuery);

jQuery(function($) {
  PageTransitions.init();
});