var util = require('util'),
  GitFileOperations = require('./git_file_operations').GitFileOperations,
  StatusFile = require('./status_file').StatusFile;

var Status = exports.Status = function(repo, callback) {
  var _repo = repo, _files = [];
  
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: false});
  Object.defineProperty(this, "files", { get: function() { return _files; }, set: function(value) { _files = value; }, enumerable: true});
  
  construct_status(_repo, this, callback);
}

Status.prototype.index = function(file) {
  return this.files[file];
}

// Construct the status object
var construct_status = function(repo, status, callback) {
  // Let's get the files list
  ls_files(repo, function(err, repo_files) {
    if(err) return callback(err, repo_files);
    // Set the basic list of files
    status.files = repo_files;
    // Fetch all the untracked files in working directory and add them to the list of files
    locate_untracked_files(repo.working_directory, status, function(err, untracked_files) {
      if(err) return callback(err, untracked_files);
      
      // Find modified files in tree
      diff_files(repo, function(err, diff_files) {
        if(err) return callback(err, diff_files);
        
        // Process all the files, merging in any extra information where needed
        Object.keys(diff_files).forEach(function(key) {
          if(status.files[key]) {
            for(var attrname in diff_files[key]) { status.files[key][attrname] = diff_files[key][attrname]; }
          } else {
            status.files[key] = diff_files[key];
          }
        })
        
        // Find added but not commited -- new files
        diff_index(repo, 'HEAD', function(err, added_files) {
          if(err) return callback(err, added_files);

          // Process all the files, merging in any extra information where needed
          Object.keys(added_files).forEach(function(key) {
            if(status.files[key]) {
              for(var attrname in added_files[key]) { status.files[key][attrname] = added_files[key][attrname]; }
            } else {
              status.files[key] = added_files[key];
            }
          })
          
          // Now process all the file objects and replace them with real status file objects
          Object.keys(status.files).forEach(function(key) {
            status.files[key] = new StatusFile(repo, status.files[key]);
          })
          
          // Return the populated status object
          callback(null, status);
        });
      });
    })
  })
}

// Locate all the diff files in the repo
var diff_files = function(repo, callback) {
  var hsh = {};
  
  repo.git.diff_files(function(err, lines_output) {
    var lines = lines_output.split("\n");

    lines.forEach(function(line) {
      var parts = line.split("\t");
      // Unpack the line
      var info = parts[0], file = parts[1];
      parts = info.trim().replace(/ +/g, ' ').split(" ");
      // Unpack the parts from the info
      var mode_src = parts[0], mode_dest = parts[1], sha_src = parts[2], sha_dest = parts[3], type = parts[4]
      hsh[file] = {path:file, mode_file:mode_src.toString().substr(1, 7), mode_index:mode_dest,
                    sha_file:sha_src, sha_index:sha_dest, type:type};      
    });

    callback(null, hsh);
  });  
}

// Compares the index and the repository
var diff_index = function(repo, tree_sha, callback) {  
  var hsh = {};

  repo.git.diff_index({}, tree_sha, function(err, lines_output) {
    var lines = lines_output.split("\n");

    lines.forEach(function(line) {
      var parts = line.split("\t");
      // Unpack the line
      var info = parts[0], file = parts[1];
      parts = info.trim().replace(/ +/g, ' ').split(" ");
      // Unpack the parts from the info
      var mode_src = parts[0], mode_dest = parts[1], sha_src = parts[2], sha_dest = parts[3], type = parts[4];
      hsh[file] = {path:file, mode_repo:mode_src.toString().substr(1, 7), mode_index:mode_dest,
                    sha_repo:sha_src, sha_index:sha_dest, type:type};      
    });

    callback(null, hsh);
  });    
}

// Get the list of all files that are tracked in the repo
var ls_files = function(repo, callback) {
  var hsh = {};

  repo.git.ls_files({stage:true}, function(err, lines_output) {
    var lines = lines_output.split("\n");

    lines.forEach(function(line) {
      var parts = line.split("\t");
      // Unpack the line
      var info = parts[0], file = parts[1];
      parts = info.trim().replace(/ +/g, ' ').split(" ");
      // Unpack the parts from the info
      var mode = parts[0], sha = parts[1], stage = parts[2];
      hsh[file] = {path:file, mode_index:mode, sha_index:sha, stage:stage};      
    });

    callback(null, hsh);
  })
}

// Locates all the untracked files in the repo
var locate_untracked_files = function(directory, status, callback) {
  var files = status.files;
  // Locate all files in underlying directories
  var stream = GitFileOperations.glob_streaming(directory);  
  // Triggers on each entry in the directory
  stream.addListener("data", function(result) {
    if(files[result.path] == null && result.stat.isFile()) {
      var file = result.path.replace(directory + "/", '');
      files[file] = {path:file, untracked:true};
    }
  });
  
  // Triggers at the end of the call
  stream.addListener("end", function(err, result) {
    callback(null, files);
  })  
}