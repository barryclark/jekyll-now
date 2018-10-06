---
layout: page
title: Competitions
permalink: /competitions/
---
<link rel='stylesheet' href='../fullcalendar/fullcalendar.min.css' />
<link href='../fullcalendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<script src='../assets/lib/moment.min.js'></script>
<script src='../assets/lib/jquery.min.js'></script>
<script src='../fullcalendar/fullcalendar.min.js'></script>
<script src='../fullcalendar/gcal.min.js'></script>

<script>
  
  $(document).ready(function() {

    $('#calendar').fullCalendar({
	  themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listYear'
      },

      displayEventTime: false, // don't show the time column in list view

      // THIS KEY WON'T WORK IN PRODUCTION!!!
      // To make your own Google API key, follow the directions here:
      // http://fullcalendar.io/docs/google_calendar/
      googleCalendarApiKey: 'AIzaSyBVX6S_oqxfH142jtY4dKoX2lNpB1oc9ew',

      // US Holidays
      events: 'en.usa#holiday@group.v.calendar.google.com',

      eventClick: function(event) {
        // opens events in a popup window
        window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },

      loading: function(bool) {
        $('#loading').toggle(bool);
      }

    });

  });
  
</script>

We run competitions!

### More Information

More coming soon!
