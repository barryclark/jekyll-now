$(document).ready(function() {
    $('#calendar').fullCalendar({
      themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listYear'
      },
      displayEventTime: true,
      navLinks: true,    
      googleCalendarApiKey: 'AIzaSyBNH5_OOTcrJwRP8INNcx98RlalqGLuGR4',
    	
      eventSources: [
      	{
        	googleCalendarId: 'h74gapvve945n7sg8msl7s1pc4@group.calendar.google.com'
	},
      	{
        	googleCalendarId: 'a96mtimev43ka8trvs50cib22k@group.calendar.google.com'
      	}
    	],
	    
      eventClick: function(event) {
        // opens events in a popup window
        window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },
      loading: function(bool) {
        $('#loading').toggle(bool);
      },
	    
      eventMouseover: function(event) {
	$(this).addClass('fc-event-hover'); 
    },
				
      eventMouseout: function(event) {
	$(this).removeClass('fc-event-hover');    
    }
    });
      
  });
  
