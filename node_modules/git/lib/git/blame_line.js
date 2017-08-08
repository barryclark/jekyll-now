var BlameLine = exports.BlameLine = function(lineno, oldlineno, commit, line) {
  var _lineno = lineno, _oldlineno = oldlineno, _commit = commit, _line = line;
  
  
  // Control access to internal variables
  Object.defineProperty(this, "lineno", { get: function() { return _lineno; }, set: function(value) { _lineno = value; }, enumerable: true});    
  Object.defineProperty(this, "oldlineno", { get: function() { return _oldlineno; }, set: function(value) { _oldlineno = value; }, enumerable: true});    
  Object.defineProperty(this, "commit", { get: function() { return _commit; }, set: function(value) { _commit = value; }, enumerable: true});    
  Object.defineProperty(this, "line", { get: function() { return _line; }, set: function(value) { _line = value; }, enumerable: true});      
}