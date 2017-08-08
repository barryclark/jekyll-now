var util = require('util');

var GitBlob = exports.GitBlob = function(content, repository) {
  var _content = content, _repository = repository;

  Object.defineProperty(this, "content", { get: function() { return _content; }, set: function(value) { _content = value; }, enumerable: true});
  Object.defineProperty(this, "repository", { get: function() { return _repository; }, set: function(value) { _repository = value; }, enumerable: false});
  Object.defineProperty(this, "type", { get: function() { return "blob"; }, enumerable: true});      
  Object.defineProperty(this, "raw_content", { get: function() { return _content; }, set: function(value) { _content = value; }, enumerable: true});
}

GitBlob.from_raw = function(raw_object, repository) {
  return new GitBlob(raw_object.content);
}