var util = require('util');

var StatusFile = exports.StatusFile = function(repo , hash) {
  var _repo = repo;
  var _path = hash.path, _type = hash.type, _stage = hash.stage, _mode_index = hash.mode_index;
  var _mode_repo = hash.mode_repo, _sha_index = hash.sha_index, _sha_repo = hash.sha_repo, _untracked = hash.untracked;

  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: false});

  Object.defineProperty(this, "path", { get: function() { return _path; }, set: function(value) { _path = value; }, enumerable: true});
  Object.defineProperty(this, "type", { get: function() { return _type; }, set: function(value) { _type = value; }, enumerable: true});
  Object.defineProperty(this, "stage", { get: function() { return _stage; }, set: function(value) { _stage = value; }, enumerable: true});
  Object.defineProperty(this, "mode_index", { get: function() { return _mode_index; }, set: function(value) { _mode_index = value; }, enumerable: true});
  Object.defineProperty(this, "mode_repo", { get: function() { return _mode_repo; }, set: function(value) { _mode_repo = value; }, enumerable: true});
  Object.defineProperty(this, "sha_index", { get: function() { return _sha_index; }, set: function(value) { _sha_index = value; }, enumerable: true});
  Object.defineProperty(this, "sha_repo", { get: function() { return _sha_repo; }, set: function(value) { _sha_repo = value; }, enumerable: true});
  Object.defineProperty(this, "untracked", { get: function() { return _untracked; }, set: function(value) { _untracked = value; }, enumerable: true});  
}