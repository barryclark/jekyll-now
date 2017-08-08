var Commit = require('./commit').Commit;

var Tag = exports.Tag = function(name, commit) {
  var _name = name;
  var _commit = commit;  
  // Define the properties
  Object.defineProperty(this, "name", { get: function() { return _name; }, enumerable: true});
  Object.defineProperty(this, "commit", { get: function() { return _commit; }, enumerable: true});
}

var prefix = function(name) { 
    return "refs/" + name + "s"; 
  }

Tag.find_all = function(repo, options, callback) {
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  options = args.length ? args.shift() : {};
  
  // Let's fetch the references
  repo.git.refs({}, prefix('tag'), function(err, refs) {    
    if(err) return callback(err, refs);
    if(!refs) return callback(null, []);
    // Map the references
    var mapped_refs = refs.split(/\n/).map(function(ref) {
      // Fetch the name and id for the reference
      var split_reference = ref.split(/ /);
      var name = split_reference[0];
      var id = split_reference[1];
      // Ensure we have the right id (if it's a tag it's the actual commit of the tag not the tag id)
      var cid = repo.git.commit_from_sha(id)
      if(cid == '') throw "unknown object type";
      // Create a commit object wit the id
      var commit = new Commit(repo, cid);
      // Wrap the commit object in a head object and return mapped object
      return new Tag(name, commit);        
    })    
    
    callback(null, mapped_refs);
  })  
}
