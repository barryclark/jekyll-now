var util = require('util');

Actor = exports.Actor = function(name, email) {
  var _name = name, _email = email;  
  // Control access to internal variables
  Object.defineProperty(this, "name", { get: function() { return _name; }, set: function(value) { _name = value; }, enumerable: true});    
  Object.defineProperty(this, "email", { get: function() { return _email; }, set: function(value) { _email = value; }, enumerable: true});      
}

Actor.from_string = function(string) {
  if(string.match(/<.+>/)) {
    var results = string.match(/(.*) <(.+?)>/);
    return new Actor(results[1], results[2]);
  } else {
    return new Actor(string, null);
  }
}

Actor.prototype.toString = function() {
  return this.name;
}