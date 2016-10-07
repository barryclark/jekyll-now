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