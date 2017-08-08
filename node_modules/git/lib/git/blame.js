var BlameLine = require('./blame_line').BlameLine;

var Blame = exports.Blame = function(repo, file, commit, callback) {  
  var _repo = repo, _file = file, _commit = commit, _lines = [];
  
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 2);
  callback = args.pop();
  var _commit = args.length ? args.shift() : null;      
  
  // Control access to internal variables
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: false});    
  Object.defineProperty(this, "file", { get: function() { return _file; }, set: function(value) { _file = value; }, enumerable: true});      
  Object.defineProperty(this, "commit", { get: function() { return _commit; }, set: function(value) { _commit = value; }, enumerable: true});      
  Object.defineProperty(this, "lines", { get: function() { return _lines; }, set: function(value) { _lines = value; }, enumerable: true});      
  
  // Load the blame object
  load_blame(this, _repo, _file, _commit, callback);
}

// Load and parse the blame
var load_blame = function(blame, repo, file, commit, callback) {
  repo.git.blame({p:true}, commit, '--', file, function(err, blame_output) {
    process_raw_blame(blame, blame_output, repo, callback)
  });
}

// Parse the output and set all parameters on the current blame object
var process_raw_blame = function(blame, output, repo, callback) {
  // Cleanup the output (removing whitespace at the start and end)
  output = output ? output.trim() : '';
  // Set up variables
  var lines = [], final = [];
  var info = {}, commits = [];
  
  var output_lines = output.split("\n");
  for(var i = 0; i < output_lines.length; i++) {
    var line = output_lines[i];
    var match = line.match(/^(\w{40}) (\d+) (\d+)/);
    
    // If we have a tab character at the start skip it
    if(line.substr(0, 1) == "\t") {
      lines.push(line.substring(1, line.length));
    } else if(match) {
      if(!commits[match[1]]) {
        repo.commit(match[1], function(err, commit) {
          commits[match[1]] = commit;          
        });
      }
      // Add the info for this line
      info[parseInt(match[3])] = [commits[match[1]], parseInt(match[2])];
    }
  }

  // Let's sort the content
  var sorted_keys = Object.keys(info).sort(function(a, b) { return parseInt(a) - parseInt(b); });
  sorted_keys.forEach(function(key) {
    var info_object = info[key];
    final.push(new BlameLine(key, info_object[1], info_object[0], lines[key - 1]));
  });
  // Assign the blame lines to the blame object and return
  blame.lines = final;
  callback(null, blame);
}