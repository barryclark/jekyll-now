var CommitStats = exports.CommitStats = function(repo, id, files) {
  var _repo = repo, _id = id, _files = files, _additions = 0, _deletions = 0, _total = 0;
  
  // Build the stats based on the files
  _additions = files.reduce(function(previousValue, currentValue, index, array) { return previousValue + currentValue[1]; }, 0);
  _deletions = files.reduce(function(previousValue, currentValue, index, array) { return previousValue + currentValue[2]; }, 0);
  _total = files.reduce(function(previousValue, currentValue, index, array) { return previousValue + currentValue[3]; }, 0);
  
  // Internal properties
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: false});    
  Object.defineProperty(this, "id", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true});    
  Object.defineProperty(this, "files", { get: function() { return _files; }, set: function(value) { _files = value; }, enumerable: true});    
  Object.defineProperty(this, "additions", { get: function() { return _additions; }, set: function(value) { _additions = value; }, enumerable: true});    
  Object.defineProperty(this, "deletions", { get: function() { return _deletions; }, set: function(value) { _deletions = value; }, enumerable: true});    
  Object.defineProperty(this, "total", { get: function() { return _total; }, set: function(value) { _total = value; }, enumerable: true});      
}

// Find all commit stats matching the given criteria
//  repo: the repo
//  ref: the ref from which to begin (SHA1 or name) or nil for all
//  options: hash of optional arguments to git
//    max_count: maximum number of commits to fetch
//    skip: number of commits to skip
//
// Returns assoc array (all values are lazy loading)
CommitStats.find_all = function(repo, reference, options, callback) {
  var args = Array.prototype.slice.call(arguments, 2);
  callback = args.pop();  
  var self = this;
  // Unpack variables
  options = args.length ? args.shift() : {};
  // Set up options
  options['numstat'] = true;

  // Check if we have a reference
  if(reference) {
    // Execute log function
    repo.git.log(options, reference, function(err, output) {
      if(err) return callback(err, output);
      callback(null, CommitStats.list_from_string(repo, output));
    });
  } else {
    // Add all options
    options['all'] = true;
    // Execute log function
    repo.git.log(options, function(err, output) {
      if(err) return callback(err, output);
      callback(null, CommitStats.list_from_string(repo, output));      
    });
  }  
}

// Parse out commit information into an array of baked Commit objects
//  repo: the repo
//  text: the text output from the git command (raw format)
//
// Returns assoc array of baked commits
CommitStats.list_from_string = function(repo, text) {
  var lines = text.trim().split('\n');
  var commits = {};
  
  while(lines.length > 0) {
    // Fetch the commit id
    var id = lines.shift().replace(/\ +/g, ' ').split(" ").pop();
    // Remove some rows
    lines.shift();
    lines.shift();
    lines.shift();
    
    // Process message lines
    var message_lines = [];
    // Process out the messages
    while(lines.length > 0 && lines[0].match(/^ {4}/) || lines[0] == '') {
      var string = lines.shift().substr(4);
      message_lines.push(string);
    }
    
    // Skip all empty lines
    while(lines.length > 0 && lines[0] != null && lines[0] == '') lines.shift();
    
    var files = [];
    // Process all the files
    while(lines.length > 0 && lines[0].match(/^([-\d]+)\s+([-\d]+)\s+(.+)/)) {
      var parts = lines.shift().replace(/\ +/g, ' ').split(" ");
      var additions = parseInt(parts[0]);
      var deletions = parseInt(parts[1]);
      var filename = parts[2];
      var total = additions + deletions;
      files.push([filename, additions, deletions, total]);
    }

    // Skip all empty lines
    while(lines.length > 0 && lines[0] != null && lines[0] == '') lines.shift();
    // Add the commit to the list
    commits[id] = new CommitStats(repo, id, files);
  }
  
  // Return the commits
  return commits;
}















