var util = require('util'),
  StringUtil = require('../sprintf/sprintf').StringUtil;

var UserInfo = exports.UserInfo = function(string) {
  var _email = '', _date = new Date(), _offset = 0, _name = '';
   
  // Parse the content
  var match_results = string.match(/^(.*?) <(.*)> (\d+) ([+-])0*(\d+?)$/);
  // If we don't have a correct match set parse it partially
  if(!match_results) {
    if(string.match(/<.+>/)) {
      var sub_match = string.match(/(.*) <(.+?)>/);
      _name = sub_match[1];
      _email = sub_match[2];
    } else {
      _name = string;
    }
  } else {
    _name = match_results[1];
    _email = match_results[2];
    _date = new Date(parseInt(match_results[3] * 1000));
    _offset = (match_results[4] == "-" ? -1 : 1) * parseInt(match_results[5]);
  }

  // Define properties
  Object.defineProperty(this, "name", { get: function() { return _name; }, enumerable: true});    
  Object.defineProperty(this, "email", { get: function() { return _email; }, enumerable: true});    
  Object.defineProperty(this, "date", { get: function() { return _date; }, enumerable: true});  
  Object.defineProperty(this, "offset", { get: function() { return _offset; }, enumerable: true});  
}

UserInfo.prototype.toString = function() {
  // Ensure correct formating for the offset
  var offset_str = this.offset.toString();
  var add_string = '';
  if(offset_str.length < 5) {
    for(var i = 0; i < (5 - offset_str.length); i++) { add_string += '0'; }
    offset_str = offset_str.substr(0, 1) + add_string + offset_str.substr(1);
  }  
  // Return the userinfo as a string
  return "" + this.name + " <" + this.email + "> " + (this.date.getTime()/1000) + " " + offset_str;
}