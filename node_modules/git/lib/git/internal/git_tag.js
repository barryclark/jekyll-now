var util = require('util'),
  UserInfo = require('../user_info').UserInfo;

var GitTag = exports.GitTag = function(object, type, tag, tagger, message, repository) {
  var _object = object, _type = type, _tag = tag, _tagger = tagger, _message = message, _repository = repository;
  
  Object.defineProperty(this, "repository", { get: function() { return _repository; }, set: function(value) { _repository = value; }, enumerable: true});    
  Object.defineProperty(this, "object", { get: function() { return _object; }, set: function(value) { _object = value; }, enumerable: true});    
  // Object.defineProperty(this, "type", { get: function() { return _type; }, set: function(value) { _type = value; }, enumerable: true});    
  Object.defineProperty(this, "tag", { get: function() { return _tag; }, set: function(value) { _tag = value; }, enumerable: true});    
  Object.defineProperty(this, "tagger", { get: function() { return _tagger; }, set: function(value) { _tagger = value; }, enumerable: true});    
  Object.defineProperty(this, "message", { get: function() { return _message; }, set: function(value) { _message = value; }, enumerable: true});    
  Object.defineProperty(this, "type", { get: function() { return "tag"; }, enumerable: true});
  
  Object.defineProperty(this, "raw_content", { get: function() { 
      return "object " + _object + "\ntype " + _type + "\ntag " + _tag + "\ntagger " + _tagger + " " + _message + "\n\n";
    }, enumerable: false});
}

GitTag.from_raw = function(raw_object, repository) {
  var parts = raw_object.content.split("\n\n");
  var headers = parts.shift();
  var message = parts.join(/\n\n/);
  
  // Further split the headers
  headers = headers.split(/\n/).map(function(header) { 
    var parts = header.split(/ /);
    return [parts.shift(), parts.join(" ")];
  })

  // Initialize base variables
  var object = '', type = '', tag = '', tagger = '';
  
  headers.forEach(function(header) {
    var key = header[0];
    var value = header[1];
    
    if(key == 'object') {
      object = value;
    } else if (key == 'type') {
      if(['blob', 'tree', 'commit', 'tag'].indexOf(value) == -1) {
        throw "invalid type in tag";
      }
      // Set the type
      type = value;
    } else if(key == 'tag') {
      tag = value;
    } else if(key == 'tagger') {
      tagger = new UserInfo(value);
    } else {
      util.puts("unknown header '" + key);
    }
  });
  
  // If we have an illegal tag object
  if(object == null || type == null || tag == null || tagger == null) {
    throw "incomplete raw tag object";
  }
  // Return the tag
  return new GitTag(object, type, tag, tagger, message, repository);
}








