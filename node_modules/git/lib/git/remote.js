var Commit = require('./commit').Commit;

var Remote = exports.Remote = function(name, commit) {
  var _name = name;
  var _commit = commit;  
  // Define the properties
  Object.defineProperty(this, "name", { get: function() { return _name; }, enumerable: true});
  Object.defineProperty(this, "commit", { get: function() { return _commit; }, enumerable: true});
}

var prefix = function(name) { 
    return "refs/" + name + "s"; 
  }

Remote.find_all = function(repo, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  options = args.length ? args.shift() : {};
  
  // Let's fetch the references
  repo.git.refs({}, prefix('remote'), function(err, refs) {    
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
      return new Remote(name, commit);
    })    
    callback(null, mapped_refs);
  })  
}