$(function() {
    // This is the array of feeds that we're displaying.
  // More feeds can be added at the end.
  var feeds = [
    "http://feeds.feedburner.com/TerremotoCentroItalia-RaccoltaFeedRss",
  ];

  for	(index = 0; index < feeds.length; index++) {
    var div_id = 'feed_'+index;
    $("#feed_display").append('<div class="post sieve" id="'+div_id+'" style=""></div>');
    $("#"+div_id).FeedEk({
      FeedUrl:feeds[index],
      MaxCount : 100,
        ShowDesc : false,
        ShowPubDate:true,
      TitleLinkTarget:'_blank'
    });
  }
  var gutter = parseInt($('.post').css('marginBottom'));
  var $container = $('#feed_display');

  // Because we're getting remote data with AJAX, we need to wait until the page
  // is fully loaded, AJAX and all, to call the Masonry functions.
  // Otherwise, there's weird timer stuff or overlapping elements.

  window.addEventListener('load', function () {
    $container.masonry({
      gutter: gutter,
      columnWidth: '.post',
      itemSelector: '.post'
    });
  }, false);
});
