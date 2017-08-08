var util = require('util'),
  Commit = require('./commit').Commit;

var Head = exports.Head = function(name, commit) {
  var _name = name;
  var _commit = commit;  
  // Define the properties
  Object.defineProperty(this, "name", { get: function() { return _name; }, enumerable: true});
  Object.defineProperty(this, "commit", { get: function() { return _commit; }, enumerable: true});
}

var prefix = function(name) { 
    return "refs/" + name + "s"; 
  }
  
Head.current = function(repo, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  options = args.length ? args.shift() : {};  
  // Let's read the the head
  repo.git.fs_read('HEAD', function(err, head) {
    if(err) return callback(err, head);
    var matches = head.toString().match(/ref: refs\/heads\/(.*)/);
    if(!matches) return callback(null, null);
    // we have a correct reference, create a new head reference
    repo.git.rev_parse(options, 'HEAD', 0, function(err, rev) {
      if(err) return callback(err, rev);
      return callback(null, new Head(matches[1], rev));
    });
  });
}

Head.find_all = function(repo, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  options = args.length ? args.shift() : {};
  // Let's fetch the references
  repo.git.refs({}, prefix('head'), function(err, refs) {    
    if(err) return callback(err, refs);
    // Map the references
    var mapped_refs = refs.split(/\n/).map(function(ref) {
      // Fetch the name and id for the reference
      var split_reference = ref.split(/ /);
      var name = split_reference[0];
      var id = split_reference[1];
      
      // Create a commit object wit the id
      var commit = new Commit(repo, id);
      // Wrap the commit object in a head object and return mapped object
      return new Head(name, commit);
    })    
    callback(null, mapped_refs);
  })
}