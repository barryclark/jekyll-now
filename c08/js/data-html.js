var xhr = new XMLHttpRequest();

xhr.open('GET', 'data/data.html', true);
xhr.send(null);

xhr.onload = function() {
	document.getElementById('content').innerHTML = xhr.responseText;
};