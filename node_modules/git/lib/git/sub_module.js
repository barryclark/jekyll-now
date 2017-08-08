var util = require('util');

var Submodule = exports.Submodule = function(repo, id, mode, name) {
  var _repo = repo, _id = id, _mode = mode, _name = name;
  
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: true});    
  Object.defineProperty(this, "id", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true});    
  Object.defineProperty(this, "mode", { get: function() { return _mode; }, set: function(value) { _mode = value; }, enumerable: true});      
  Object.defineProperty(this, "name", { get: function() { return _name; }, set: function(value) { _name = value; }, enumerable: true});    
  
  // Return the base name
  Object.defineProperty(this, "basename", { get: function() { 
      if(_name) {
        var parts = _name.split("/");
        return parts[parts.length - 1];
      } else {
        return null;
      }
    }, enumerable: false});  
}

// Create a Submodule containing just the specified attributes
//   +repo+ is the Repo
//   +atts+ is a Hash of instance variable data
//
// Returns Grit::Submodule (unbaked)
Submodule.create = function(repo, attributes, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  attributes = args.length ? args.shift() : {};
  
  var submodule = new Submodule(repo);
  for(var name in attributes) {
    submodule[name] = attributes[name];
  }
  
  callback(null, submodule);
}

// The configuration information for the given +repo+
//   +repo+ is the Repo
//   +ref+ is the committish (defaults to 'master')
//
// Returns a Hash of { <path:String> => { 'url' => <url:String>, 'id' => <id:String> } }
// Returns {} if no .gitmodules file was found
Submodule.config = function(repo, ref, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  ref = args.length ? args.shift() : 'master';

  // Fetch code
  repo.commit(ref, function(err, commit) {
    if(err) return callback(err, commit);
    // Fetch the blob
    var blob = commit.tree.find('.gitmodules');
    // If there is no blob return an empty object
    if(blob == null) return callback(null, {});
    // Parse all the lines
    var lines = blob.data.trim().replace(/\r\n?/g, "\n").split("\n");
    var config = {};
    var current = null;
    
    lines.forEach(function(line) {
      if(line.match(/^\[submodule "(.+)"\]$/)) {
        var parts = line.match(/^\[submodule "(.+)"\]$/);
        current = parts[1];
        config[current] = {};
        config[current]['id'] = commit.tree.find(current).id;
      } else if(line.match(/^\t(\w+) = (.+)$/)) {
        var parts = line.match(/^\t(\w+) = (.+)$/);
        config[current][parts[1]] = parts[2];
        if(parts[1] == 'path') {
          config[current]['id'] = commit.tree.find(parts[2]).id;          
        }
      } else {}      
    });
    // Return the config
    callback(null, config);    
  });
}