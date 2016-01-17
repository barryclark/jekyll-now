// NOTE: If you run this file locally
// You will not get a server status and the example will fail
// Comment out lines 9 and 35 if you are working locally

var xhr = new XMLHttpRequest();        // Create XMLHttpRequest object

xhr.onload = function() {              // When response has loaded
 // The following conditional check will not work locally - only on a server
 // if (xhr.status === 200) {             // If server status was ok

  // THIS PART IS DIFFERENT BECAUSE IT IS PROCESSING XML NOT HTML
  var response = xhr.responseXML;                      // Get XML from the server
  var events = response.getElementsByTagName('event'); // Find <event> elements

  for (var i = 0; i < events.length; i++) {            // Loop through them
    var container, image, location, city, newline;      // Declare variables
    container = document.createElement('div');          // Create <div> container
    container.className = 'event';                      // Add class attribute

    image = document.createElement('img');              // Add map image
    image.setAttribute('src', getNodeValue(events[i], 'map'));
    image.setAttribute('alt', getNodeValue(events[i], 'location'));
    container.appendChild(image);

    location = document.createElement('p');             // Add location data
    city = document.createElement('b');
    newline = document.createElement('br');
    city.appendChild(document.createTextNode(getNodeValue(events[i], 'location')));
    location.appendChild(newline);
    location.insertBefore(city, newline);
    location.appendChild(document.createTextNode(getNodeValue(events[i], 'date')));
    container.appendChild(location);

    document.getElementById('content').appendChild(container);
  }
// }

  function getNodeValue(obj, tag) {                   // Gets content from XML
    return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
  }

 // THE FINAL PART IS THE SAME AS THE HTML EXAMPLE BUT IT REQUESTS AN XML FILE
};

xhr.open('GET', 'data/data.xml', true);             // Prepare the request
xhr.send(null);                                     // Send the request