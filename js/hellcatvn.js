var NexT = window.NexT || {};
// Search Menu
$('.search-form').submit(function (e) {
  e.preventDefault();
  window.open(`https://www.google.com/search?&q=site%3A${window.location.host}+${encodeURIComponent($('.search-form input[name="keyword"]').val())}`);
});
//Site Title
  var OriginTitile = document.title;
  var titleTime;
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == "hidden") {
      $('[rel="icon"]').attr("href", "images/failure.ico");
      document.title = "(●—●)Pls,Back！";
      clearTimeout(titleTime);
    } else {
      $('[rel="icon"]').attr("href", "images/failure.ico");
      document.title = "(/≧▽≦/)Welcome Back！" + OriginTitile;
      titleTime = setTimeout(function() {
        document.title = OriginTitile;
      }, 2000);
    }
  });


NexT.utils = NexT.$u = {
  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function () {
    $('.content img')
      .not('[hidden]')
      .not('.no-fancybox')
      .not('.group-picture img, .post-gallery img')
      .not('#QR img')
      .not('.post-share img')
      .each(function () {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.size() < 1) {
	        var imageLink = ($image.attr('data-original')) ? this.getAttribute('data-original') : this.getAttribute('src');
          $imageWrapLink = $image.wrap('<a href="' + imageLink + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          $imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });

    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  lazyLoadPostsImages: function () {
    $('#posts').find('img').lazyload({
      //placeholder: '/images/loading.gif',
      effect: 'fadeIn',
      threshold : 0
    });
  },

  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag: function () {
    var tNav = '.tabs ul.nav-tabs ';

    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    $(function() {
      $(window).bind('hashchange', function() {
        var tHash = location.hash;
        if (tHash !== '') {
          $(tNav + 'li:has(a[href="' + tHash + '"])').addClass('active').siblings().removeClass('active');
          $(tHash).addClass('active').siblings().removeClass('active');
        }
      }).trigger('hashchange');
    });

    $(tNav + '.tab').on('click', function (href) {
      href.preventDefault();
      // Prevent selected tab to select again.
      if(!$(this).hasClass('active')){

        // Add & Remove active class on `nav-tabs` & `tab-content`.
        $(this).addClass('active').siblings().removeClass('active');
        var tActive = $(this).find('a').attr('href');
        $(tActive).addClass('active').siblings().removeClass('active');

        // Clear location hash in browser if #permalink exists.
        if (location.hash !== '') {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      }
    });

  },

  registerESCKeyEvent: function () {
    $(document).on('keyup', function (event) {
      var shouldDismissSearchPopup = event.which === 27 &&
        $('.search-popup').is(':visible');
      if (shouldDismissSearchPopup) {
        $('.search-popup').hide();
        $('.search-popup-overlay').remove();
        $('body').css('overflow', '');
      }
    });
  },

  embeddedVideoTransformer: function () {
    var $iframes = $('iframe');

    // Supported Players. Extend this if you need more players.
    var SUPPORTED_PLAYERS = [
      'www.youtube.com',
      'player.vimeo.com',
      'player.youku.com',
      'music.163.com',
      'www.tudou.com'
    ];
    var pattern = new RegExp( SUPPORTED_PLAYERS.join('|') );

    $iframes.each(function () {
      var iframe = this;
      var $iframe = $(this);
      var oldDimension = getDimension($iframe);
      var newDimension;

      if (this.src.search(pattern) > 0) {

        // Calculate the video ratio based on the iframe's w/h dimensions
        var videoRatio = getAspectRadio(oldDimension.width, oldDimension.height);

        // Replace the iframe's dimensions and position the iframe absolute
        // This is the trick to emulate the video ratio
        $iframe.width('100%').height('100%')
          .css({
            position: 'absolute',
            top: '0',
            left: '0'
          });


        // Wrap the iframe in a new <div> which uses a dynamically fetched padding-top property
        // based on the video's w/h dimensions
        var wrap = document.createElement('div');
        wrap.className = 'fluid-vids';
        wrap.style.position = 'relative';
        wrap.style.marginBottom = '20px';
        wrap.style.width = '100%';
        wrap.style.paddingTop = videoRatio + '%';
        // Fix for appear inside tabs tag.
        (wrap.style.paddingTop === '') && (wrap.style.paddingTop = '50%');

        // Add the iframe inside our newly created <div>
        var iframeParent = iframe.parentNode;
        iframeParent.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);

        // Additional adjustments for 163 Music
        if (this.src.search('music.163.com') > 0) {
          newDimension = getDimension($iframe);
          var shouldRecalculateAspect = newDimension.width > oldDimension.width ||
                                        newDimension.height < oldDimension.height;

          // 163 Music Player has a fixed height, so we need to reset the aspect radio
          if (shouldRecalculateAspect) {
            wrap.style.paddingTop = getAspectRadio(newDimension.width, oldDimension.height) + '%';
          }
        }
      }
    });

    function getDimension($element) {
      return {
        width: $element.width(),
        height: $element.height()
      };
    }

    function getAspectRadio(width, height) {
      return height / width * 100;
    }
  },

  /**
   * Add `menu-item-active` class name to menu item
   * via comparing location.path with menu item's href.
   */
  addActiveClassToMenuItem: function () {
    var path = window.location.pathname;
    path = path === '/' ? path : path.substring(0, path.length - 1);
    $('.menu-item a[href^="' + path + '"]:first').parent().addClass('menu-item-active');
  },

  hasMobileUA: function () {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function () {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function () {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function () {
    return !this.isTablet() && !this.isMobile();
  },

  /**
   * Escape meta symbols in jQuery selectors.
   *
   * @param selector
   * @returns {string|void|XML|*}
   */
  escapeSelector: function (selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  },

  displaySidebar: function () {
    $('.sidebar-toggle').trigger('click');
  },

  getScrollbarWidth: function () {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
  },

  getContentVisibilityHeight: function () {
    var docHeight = $('#content').height(),
        winHeight = $(window).height(),
        contentVisibilityHeight = (docHeight > winHeight) ? (docHeight - winHeight) : ($(document).height() - winHeight);
    return contentVisibilityHeight;
  },

  getSidebarb2tHeight: function () {
    //var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? document.getElementsByClassName('back-to-top')[0].clientHeight : 0;
    var sidebarb2tHeight = (false) ? $('.back-to-top').height() : 0;
    //var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? 24 : 0;
    return sidebarb2tHeight;
  },

  getSidebarSchemePadding: function () {
    var sidebarNavHeight = ($('.sidebar-nav').css('display') == 'block') ? $('.sidebar-nav').outerHeight(true) : 0,
        sidebarInner = $('.sidebar-inner'),
        sidebarPadding = sidebarInner.innerWidth() - sidebarInner.width(),
        sidebarSchemePadding = ((sidebarPadding * 2) + (sidebarNavHeight / 2));
    return sidebarSchemePadding;
  }

  /**
   * Affix behaviour for Sidebar.
   *
   * @returns {Boolean}
   */
//  needAffix: function () {
//    return this.isPisces() || this.isGemini();
//  }
};

$(document).ready(function () {

  initSidebarDimension();

  /**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
  function initSidebarDimension () {
    var updateSidebarHeightTimer;

    $(window).on('resize', function () {
      updateSidebarHeightTimer && clearTimeout(updateSidebarHeightTimer);

      updateSidebarHeightTimer = setTimeout(function () {
        var sidebarWrapperHeight = document.body.clientHeight - NexT.utils.getSidebarSchemePadding();

        updateSidebarHeight(sidebarWrapperHeight);
      }, 0);
    });

    // Initialize Sidebar & TOC Width.
    var scrollbarWidth = NexT.utils.getScrollbarWidth();
      if ($('.sidebar-panel').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
        $('.site-overview').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
      }
    $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');

    // Initialize Sidebar & TOC Height.
    updateSidebarHeight(document.body.clientHeight - NexT.utils.getSidebarSchemePadding());
  }

  function updateSidebarHeight (height) {
    height = height || 'auto';
    $('.site-overview, .post-toc').css('max-height', height);
  }

});


if (!NexT.utils.isMobile()) {
    var headroom = new Headroom($(".site-nav")[0], {
      offset: 205,
      tolerance: 5,
      classes: {
        initial: "head-animated",
        pinned: "slideDown",
        unpinned: "slideUp"
      }
    });
    headroom.init();
  $.scrollto = function(scrolldom, scrolltime) {
    $(scrolldom).click(function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $("html, body").animate(
        {
          scrollTop: $("body").offset().top
        },
        scrolltime
      );
      return false;
    });
  };

  var backTo = $(".back-to-top");
  var sidebarAffix = $(".sidebar-inner");
  var backHeight = $(window).height() - 980 + "px";
  $(window).scroll(function() {
    if ($(window).scrollTop() > 700 && backTo.css("top") === "-900px") {
      backTo.css("top", backHeight);
      sidebarAffix.attr("class", "sidebar-inner affix");
    } else if ($(window).scrollTop() <= 700 && backTo.css("top") !== "-900px") {
      backTo.css("top", "-900px");
      sidebarAffix.attr("class", "sidebar-inner affix-top");
    }
  });

  $.scrollto(".back-to-top", 800);
}
// Avatar Effect
$(".site-master-avatar").on("mouseover", function() {
  this.classList.add("animated", "tada");
});
$(".site-master-avatar").on("mouseout", function() {
  this.classList.remove("animated", "tada");
});


// import Typed from 'typed.js';

// var typed = new Typed('.site-title', {
//   strings: [window.CONFIG.site.title],
//   typeSpeed: 70
// });

const animatedText = document.getElementById('animate');
const guideText = document.getElementById('guide');


// select the spans in in the guide
const guideSpans = guideText.getElementsByTagName('span');
// select the spans in in the guide
const animatedSpans = animatedText.getElementsByTagName('span');

const textLength = guideSpans.length;

const placeSpans = () => {
  // for each span in the guide
  for (var i = 0; i < textLength; i++) {
    let guide = guideSpans[i];
    let animated = animatedSpans[i];
    // get the guide client rect
    let rect = guide.getBoundingClientRect();
    // set the left property of the animate
    // span to rect.left
    animated.style.left = rect.left + 'px';
  }
}


const animateLetterIn = (i) => {
  setTimeout(() => {
    TweenLite.fromTo(animatedSpans[i], 0.4, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: Power3.easeOut });
    TweenLite.fromTo(animatedSpans[i], 0.4, { scale: 0 }, { scale: 1, ease: Back.easeOut });
  }, i * 200);
}

const animateLetterOut = (i) => {
  setTimeout(() => {
    TweenLite.to(animatedSpans[i], 0.4, { opacity: 0, y: 40, scale: 0, ease: Power3.easeIn });
  }, i * 200);

  if (i === textLength - 1) {
    setTimeout(() => {
      animateIn();
    }, (textLength + 3) * 200);
  }
  
}

const animateIn = () => {
  for (var i = 0; i < textLength; i++) {
    animateLetterIn(i);
  }
}

const animateOut = () => {
  for (var i = 0; i < textLength; i++) {
    animateLetterOut(i);
  }
}

// just to make sure the text will fit the window width
const resizeText = (text, fontSize) => {
  text.style.fontSize = fontSize + 'px';
  text.style.height = fontSize + 'px';
  text.style.lineHeight = fontSize + 'px';
}

const resize = () => {
  let fontSize = window.innerWidth / 9;
  if (fontSize > 100) fontSize = 100;
  resizeText(animatedText, fontSize);
  resizeText(guideText, fontSize);
  placeSpans();
}

setTimeout(() => {
  resize();
  animateIn();
  window.addEventListener('resize', resize);
}, 500);

var a = moment("2014-02-12");
var today = moment().format("YYYY-MM-DD");
var b =moment(today);
ms=b.diff(a);
res= moment.duration(ms).as("days");
since = res + " Days"
$("#since").text(since);
