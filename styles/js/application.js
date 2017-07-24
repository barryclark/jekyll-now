/*!
 * Adapted from Bootstrap docs JavaScript
 */


!function ($) {

  $(function () {

    // IE10 viewport hack for Surface/desktop Windows 8 bug
    //
    // See Getting Started docs for more information
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }

    var $window = $(window)
    var $body   = $(document.body)

    $body.scrollspy({
      target: '.sidebar',
      offset: 20 // required to select the right thing. if this is smaller then you are at the top of one section
                 // but the next section is highlighted
    });

    $window.on('load', function () {
      $body.scrollspy('refresh')
    });

    $('.docs-container [href=#]').click(function (e) {
      e.preventDefault()
    });


    $('.source-link').each(function () {
      var id = $(this).data('content');
      var content = $('<span>').append($('#' + id)).html();
      $(this).attr('data-content', content);

      // Keep popovers open when hovered
      $(this).popover({
        trigger: 'manual',
        container: 'body',
        placement: 'left',
        template: '<div class="popover popover-source"> <div class="arrow"></div> <div class="popover-inner"> <h3 class="popover-title"></h3> <div class="popover-content"> <p></p> </div> </div> </div>',
        html: true,
        delay: {show: 50, hide: 750}
      }).on('mouseenter', function () {
        var self = this;
        $(this).popover('show');
        $(this).addClass('active');
        $(this).addClass('popover-source');

        $('.popover').on('mouseleave', function () {
          $(self).popover('hide');
          $(self).removeClass('active');
        });

      }).on('mouseleave', function () {
        var self = this;
        setTimeout(function () {
          if (!$('.popover:hover').length) {
            $(self).popover('hide');
            $(self).removeClass('active');
          }
        }, 100);
      });
    });


    // back to top
    setTimeout(function () {
      var $sideBar = $('.sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop      = $sideBar.offset().top
            var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
            var navOuterHeight = $('.docs-nav').height()

            return (this.top = offsetTop - navOuterHeight - sideBarMargin)
          },
          bottom: function () {
            return (this.bottom = $('.footer').outerHeight(true))
          }
        }
      })
    }, 100);

    setTimeout(function () {
      $('.top').affix()
    }, 100);

  })

}(jQuery)
