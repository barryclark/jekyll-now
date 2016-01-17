// NOTE: This example will not work locally in Chrome / IE because of cross-domain restrictions.
// You can try it out on the website for the book http://javascriptbook.com/code
// or run it on your own server.

$('#exchangerates').append('<div id="rates"></div><div id="reload"></div>');

function loadRates() {
  $.getJSON('data/rates.json')
  .done( function(data){                                 // SERVER RETURNS DATA
    var d = new Date();                                  // Create date object
    var hrs = d.getHours();                              // Get hours
    var mins = d.getMinutes();                           // Get mins
    var msg = '<h2>Exchange Rates</h2>';                 // Start message
    $.each(data, function(key, val) {                    // Add each rate
      msg += '<div class="' + key + '">' + key + ': ' + val + '</div>';
    });
    msg += '<br>Last update: ' + hrs + ':' + mins + '<br>'; // Show update time
    $('#rates').html(msg);                               // Add rates to page
  }).fail( function() {                                  // THERE IS AN ERROR
    $('#rates').text('Sorry, we cannot load rates.');   // Show error message 
  }).always( function() {                                // ALWAYS RUNS
     var reload = '<a id="refresh" href="#">';           // Add refresh link
     reload += '<img src="img/refresh.png" alt="refresh" /></a>';
     $('#reload').html(reload);                          // Add refresh link
     $('#refresh').on('click', function(e) {             // Add click handler
       e.preventDefault();                               // Stop link
       loadRates();                                      // Call loadRates()
     });
  }); 
}

loadRates();                                             // Call loadRates()

// When working locally in Firefox, you may see an error saying that the JSON is not well-formed.
// This is because Firefox is not reading the correct MIME type (and it can safely be ignored).
// If you get it on a server, you may need to se the MIME type for JSON on the server (application/JSON).