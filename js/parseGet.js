var isGetPresent = function() {
	return location.search.length > 0;
}

var getArray = function() {
	return location.search.substr(1).split('&');
}

var getKeyValuePairs = function() {
	var array = getArray();

	var pairs = new Array();

	for(var i = 0; i < array.length; i++) {
		pairs.push(array[i].split('='));
	}

	return pairs;
}

var getObjectArray = function() {
	var array = getArray();

	var objects = new Array();

	var object = {};

	for(var i = 0; i < array.length; i++) {
		var split = array[i].split('=');

		if (typeof object[split[0]] !== 'undefined') {
			objects.push(object);
			object = {};
		}

		object[split[0]] = split[1];
	}

	objects.push(object);

	return objects;
}

var getObject = function() {
	var array = getArray();

	var object = {};

	for(var i = 0; i < array.length; i++) {
		var split = array[i].split('=');

		object[split[0]] = split[1];
	}

	return object;
}


var getValueOfFirstKey = function(key) {
	if(key !== null || key.length > 0) {
		var array = getArray();

		for(var i = 0; i < array.length; i++) {
			var keyValue = array[i].split('=');

			if(keyValue[0] === key) {
				return keyValue[1];
			}
		}
	}
}

var getValueOfLastKey = function(key) {
	if(key !== null || key.length > 0) {
		var array = getArray();

		for(var i = array.length - 1; i >= 0; i--) {
			var keyValue = array[i].split('=');

			if(keyValue[0] === key) {
				return keyValue[1];
			}
		}
	}
}

var hasKey = function(key) {
	if(isGetPresent()) {
		var array = getArray();

		for(var i = 0; i < array.length; i++) {
			var keyValue = array[i].split('=');

			if(keyValue[0] === key) {
				return true;
			}
		}

		return false;

	} else {
		return false;
	}
}
