var xhr = new XMLHttpRequest();

xhr.open('GET', 'data/data.json', true);
xhr.send(null);

xhr.onload = function() {
  responseObj = JSON.parse(xhr.responseText);
  console.log(responseObj.events.length);
}