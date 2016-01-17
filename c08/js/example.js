// NOTE: This example will not work locally in all browsers. 
// Please try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.

$(function() {                                    // When the DOM is ready

  var times;                                      // Declare global variable
  $.ajax({
    beforeSend: function(xhr) {                   // Before requesting data
      if (xhr.overrideMimeType) {                 // If supported
        xhr.overrideMimeType("application/json"); // set MIME to prevent errors
      }
    }
  });

  // FUNCTION THAT COLLECTS DATA FROM THE JSON FILE
  function loadTimetable() {                    // Declare function
    $.getJSON('data/example.json')              // Try to collect JSON data
    .done( function(data){                      // If successful
      times = data;                             // Store it in a variable
    }).fail( function() {                       // If a problem: show message
      $('#event').html('Sorry! We could not load the timetable at the moment');
    });
  }

  loadTimetable();                              // Call the function


  // CLICK ON THE EVENT TO LOAD A TIMETABLE 
  $('#content').on('click', '#event a', function(e) {  // User clicks on event

    e.preventDefault();                                // Prevent loading page
    var loc = this.id.toUpperCase();                   // Get value of id attr

    var newContent = '';                               // Build up timetable by
    for (var i = 0; i < times[loc].length; i++) {      // looping through events
      newContent += '<li><span class="time">' + times[loc][i].time + '</span>';
      newContent += '<a href="descriptions.html#';
      newContent += times[loc][i].title.replace(/ /g, '-') + '">';
      newContent += times[loc][i].title + '</a></li>';
    }

    $('#sessions').html('<ul>' + newContent + '</ul>'); // Display times on page

    $('#event a.current').removeClass('current');       // Update selected item
    $(this).addClass('current');

    $('#details').text('');                             // Clear third column
  });

  // CLICK ON A SESSION TO LOAD THE DESCRIPTION
  $('#content').on('click', '#sessions li a', function(e) { // Click on session
    e.preventDefault();                                     // Prevent loading
    var fragment = this.href;                               // Title is in href

    fragment = fragment.replace('#', ' #');                 // Add space after#
    $('#details').load(fragment);                           // To load info

    $('#sessions a.current').removeClass('current');        // Update selected
    $(this).addClass('current');
  });


  // CLICK ON PRIMARY NAVIGATION
  $('nav a').on('click', function(e) {                       // Click on nav
    e.preventDefault();                                      // Prevent loading
    var url = this.href;                                     // Get URL to load

    $('nav a.current').removeClass('current');               // Update nav
    $(this).addClass('current');

    $('#container').remove();                                // Remove old part
    $('#content').load(url + ' #container').hide().fadeIn('slow'); // Add new
  });

});