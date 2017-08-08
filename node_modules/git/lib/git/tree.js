var util = require('util'),
  Submodule = require('./sub_module').Submodule,
  Blob = require('./blob').Blob;

var Tree = exports.Tree = function(repo, id, mode, name, contents) {
  var _repo = repo, _id = id, _contents = contents, _mode = mode, _name = name;

  // Internal properties
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: true});    
  Object.defineProperty(this, "id", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true});    
  Object.defineProperty(this, "mode", { get: function() { return _mode; }, set: function(value) { _mode = value; }, enumerable: true});    
  Object.defineProperty(this, "name", { get: function() { return _name; }, set: function(value) { _name = value; }, enumerable: true});    
  Object.defineProperty(this, "contents", { get: function() { 
      _contents = lazy_reader(_repo, _id, 'contents', _contents); 
      return _contents;
    }, set: function(value) { _contents = value; }, enumerable: true});
    
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

var lazy_reader = function(repo, id, type, variable) {
  if(variable != null) return variable;
  // Control the flow
  var done = false;
  var value = [];
  
  // Fetch the content
  repo.git.ls_tree(id, [], {}, function(err, text) {
    if(err) return done = true;
    // Split the output
    var lines = text.split("\n");
    // Create objects for all the entries
    for(var i = 0; i < lines.length; i++) {
      Tree.content_from_string(repo, lines[i], function(err, entry) {
        value.push(entry);
      });        
    }  
        
    done = true;
  })
  
  while(!done) {};
  return value ? value : '';  
}

// Construct the contents of the tree
// repo: the current rep
// treeish: the reference
// paths: optional array of directory paths to restrict the tree
Tree.construct = function(repo, treeish, paths, callback) {
  // Set the path to the default if it's null
  paths = paths ? paths : [];  
  // Run the ls_tree command
  repo.git.ls_tree(treeish, paths, function(err, output) {    
    if(err) return callback(err, output);
    construct_initialize(repo, treeish, output, callback);
  });  
}

// Create a new instance of the tree class
var construct_initialize = function(repo, id, text, callback) {
  // Create a tree object
  var tree = new Tree(repo, id, null, null, []);  
  var lines = text.trim().split("\n");
  if(lines.length == 1 && lines[0] == '') lines = [];  
  // Fetch all the lines
  for(var i = 0; i < lines.length; i++) {
    Tree.content_from_string(repo, lines[i], function(err, entry) {
      if(err) return callback(err, entry);
      tree.contents.push(entry);      
    });        
  }

  // Remove all the null entries
  tree.contents = tree.contents.filter(function(entry) { return entry ? true : false; });  
  // Return the object
  callback(null, tree);
}

Tree.content_from_string = function(repo, text, callback) {
  // Split the text into parts and extract the variables
  var parts = text.replace(/\t/, ' ').split(" ");
  var mode = parts[0];
  var type = parts[1];
  var id = parts[2];
  var name = parts[3];
  
  if(type == "tree") {
    callback(null, new Tree(repo, id, mode, name));
  } else if(type == "blob") {
    callback(null, new Blob(repo, id, mode, name));
  } else if(type == "link") {
    callback(null, new Blob(repo, id, mode, name));
  } else if(type == "commit") {
    callback(null, new Submodule(repo, id, mode, name));
  } else {
    callback("invalid type: " + type, null);
  } 
}

// Find the named object in this tree's contents
//
// Examples
//   Repo.new('/path/to/grit').tree/'lib'
//   // => //<Grit::Tree "6cc23ee138be09ff8c28b07162720018b244e95e">
//   Repo.new('/path/to/grit').tree/'README.txt'
//   // => //<Grit::Blob "8b1e02c0fb554eed2ce2ef737a68bb369d7527df">
//
// Returns Grit::Blob or Grit::Tree or nil if not found
Tree.prototype.find = function(file) {
  var self = this;
  
  if(file.match(/\//)) {
    var paths = file.split('/');
    paths.length > 0 && paths[paths.length - 1] == '' ? paths.pop() : null;
    return paths.map(function(x) {
      return self && (self = self.find(x));
    });
  } else {
    var results = self.contents.filter(function(c) {
      return c.name == file;
    })   
    
    return results.length == 1 ? results[0] : null;
  }
}

Tree.create = function(repo, attributes, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  attributes = args.length ? args.shift() : {};
  
  var tree = new Tree(repo);
  for(var name in attributes) {
    tree[name] = attributes[name];
  }
  
  callback(null, tree);
}












