// NOTE: This example will only work if you run it on a web server (it will not work locally)

// This first variable creates the t-shirt options, the HTML for it is shown on p395
var vote = '<div id="vote"><div class="third"><a href="http://example.org?tshirt=gray"><img src="img/t-gray.png" id="gray" alt="gray" /></a></div><div class="third"><a href="http://example.org?tshirt=yellow" id="yellow"><img src="img/t-yellow.png" id="yellow" alt="yellow" /></a></div><div class="third"><a href="http://example.org?tshirt=green"><img src="img/t-green.png" id="green" alt="green" /></a></div></div>';
$('#selector').append(vote);

// This adds ratings to the side bar
$('#selector a').on('click', function(e) {
  e.preventDefault();
  var queryString = 'vote=' + $(e.target).attr('id');
  $.get('/php/votes.php', queryString, function(data) {
    $('#selector').html(data);
  });
});