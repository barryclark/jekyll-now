var util = require('util'),
  fs = require('fs');

var FileIndex = exports.FileIndex = function(repo_path, callback) {
  var _repo_path = repo_path;
  var _index_file = repo_path + "/file-index";
  var self = this;  
  // Set up internal index info
  var _sha_count = 0, _commit_index = {}, _commit_order = {}, _all_files = {};
  
  // Set up properites for instance
  Object.defineProperty(this, "repo_path", { get: function() { return _repo_path; }, enumerable: true});      
  Object.defineProperty(this, "index_file", { get: function() { return _index_file; }, enumerable: true});        
  // Other values that allow setting
  Object.defineProperty(this, "sha_count", { get: function() { return _sha_count; }, set: function(value) { _sha_count = value; }, enumerable: true});        
  Object.defineProperty(this, "commit_index", { get: function() { return _commit_index; }, set: function(value) { _commit_index = value; }, enumerable: true});        
  Object.defineProperty(this, "commit_order", { get: function() { return _commit_order; }, set: function(value) { _commit_order = value; }, enumerable: true});        
  Object.defineProperty(this, "all_files", { get: function() { return _all_files; }, set: function(value) { _all_files = value; }, enumerable: true});        
  
  fs.stat(_index_file, function(err, stat) {
    if(err) return callback(err, stat);
    
    if(stat.isFile() && stat.size < FileIndex.max_file_size) {
      read_index(self, _index_file, function(err, _index) {
        if(err) return callback(err, _index);
        callback(null, _index);
      })
    } else {
      callback("index file not found", null);
    }
  });
}

// Max size for file index
FileIndex.max_file_size = 10000000;

// Chomp text removing end carriage returns
var chomp = function chomp(raw_text) {
  return raw_text.replace(/(\n|\r)+$/, '');
}

var dirname = function(file_name) {
  var elements = file_name.split('/');
  elements.pop();  
  if(elements.length == 0) return ".";
  return elements.join("/");
}

// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
// TODO Needs to be async reading files in pieces and parsing them
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
// Read and parse the file index for git
var read_index = function(file_index, _index_file, callback) {
  var current_sha = null;

  fs.readFile(_index_file, 'ascii', function(err, data) {
    if(err) return callback(err, data);
    // Split the text into lines
    var lines = data.split("\n");
    // Iterate over all the lines
    for(var i = 0; i < lines.length; i++) {
      var line = lines[i];  
      
      // Ensure it's a line with a starting sha
      if(line.match(/^(\w{40})/)) {
        // Unpack all the sha values (first one being the current_sha and the rest the parents)
        var shas = line.match(/(\w{40})/g);
        current_sha = shas.shift();    
        // The rest of the sha's are the parents
        file_index.commit_index[current_sha] = {files:[], parents:shas}
        file_index.commit_order[current_sha] = file_index.sha_count;
        file_index.sha_count = file_index.sha_count + 1;
      } else {
        var file_name = chomp(line);
        var tree = '';
        // Retrieve the directory name for the file passed in
        var dir = dirname(file_name);
        // Ensure it's not an empty line        
        if(line.length > 0) {
          // Split up the directory
          var dir_parts = dir.split("/");
          for(var j = 0; j < dir_parts.length; j++) {
            var part = dir_parts[j];
            
            if(dir_parts[j] != '.') {
              tree = tree + part + '/'
              if(file_index.all_files[tree] == null) file_index.all_files[tree]  = [];
              if(file_index.all_files[tree].indexOf(current_sha) == -1)
                file_index.all_files[tree].unshift(current_sha);
            }
          }
          
          // Finish up
          if(!file_index.all_files[file_name]) file_index.all_files[file_name] = [];
          file_index.all_files[file_name].unshift(current_sha);
          file_index.commit_index[current_sha].files.push(file_name);
        }                
      }
    }    
    // Return the parsed index
    callback(null, file_index);
  });  
}

// Builds a list of all commits reachable from a single commit
FileIndex.prototype.commits_from = function(commit_sha, callback) {
  if(Array.isArray(commit_sha)) return callback("unsuported reference", null);
  // Define some holding structures
  var already = {};
  var final = [];
  var left_to_do = [commit_sha];
  var self = this;
  
  while(left_to_do.length > 0) {
    commit_sha = left_to_do.shift();
        
    if(!already[commit_sha]) {
      // Add commit to list of final commits
      final.push(commit_sha);
      already[commit_sha] = true;
            
      // Get parents of the commit and add them to the list
      var commit = self.commit_index[commit_sha];
      if(commit) {
        commit.parents.forEach(function(sha) {
          left_to_do.push(sha);
        });        
      }
    }
  }  
  // Sort the commits
  final = this.sort_commits(final);
  // Callback
  callback(null, final);
}

FileIndex.prototype.sort_commits = function(sha_array) {
  var self = this;
  
  return sha_array.sort(function(a, b) {
    return compare(parseInt(self.commit_order[b]), parseInt(self.commit_order[a]));
  })
}

var convert = function(d) {
  return (
    d.constructor === Date ? d :
    d.constructor === Array ? new Date(d[0],d[1],d[2]) :
    d.constructor === Number ? new Date(d) :
    d.constructor === String ? new Date(d) :
    typeof d === "object" ? new Date(d.year,d.month,d.date) :
    NaN
  );
}

var compare = function(a,b) {
  return (
    isFinite(a=convert(a).valueOf()) &&
    isFinite(b=convert(b).valueOf()) ?
    (a>b)-(a<b) :
    NaN
  );
}

// Returns files changed at commit sha
FileIndex.prototype.files = function(commit_sha, callback) {
  if(!this.commit_index[commit_sha]) return callback("no files found for sha: " + commit_sha, null);  
  callback(null, this.commit_index[commit_sha].files);
}

// Returns count of all commits
FileIndex.prototype.count_all = function(callback) {
  callback(null, this.sha_count);
}

// returns count of all commits reachable from SHA
FileIndex.prototype.count = function(commit_sha, callback) {
  this.commits_from(commit_sha, function(err, commits) {
    if(err) return callback(err, commits);
    callback(null, commits.length);
  })
}

// returns all commits for a provided file
FileIndex.prototype.commits_for = function(file, callback) {
  if(!this.all_files[file]) return callback("could not locate any commits for file: " + file, null);
  callback(null, this.all_files[file])
}

// returns the shas of the last commits for all
// the files in [] from commit_sha
// files_matcher can be a regexp or an array
FileIndex.prototype.last_commits = function(commit_sha, files_matcher, callback) {
  var self = this;
  
  this.commits_from(commit_sha, function(err, acceptable) {
    if(err) return callback(err, acceptable);    
    var matches = {};
    
    if(files_matcher.constructor == RegExp) {
      // Filter all the files by the matching regular expression
      files_matcher = Object.keys(self.all_files).filter(function(file) {        
        return file.match(files_matcher);
      });
    }
    
    if(Array.isArray(files_matcher)) {
      // Locate the last commit for each file in the files_matcher array
      for(var files_matcher_index = 0; files_matcher_index < files_matcher.length; files_matcher_index++) {
        var files = self.all_files[files_matcher[files_matcher_index]];
        
        for(var files_index = 0; files_index < files.length; files_index++) {
          // If the file is included in the list of commits_from then add it to the matches
          if(acceptable.indexOf(files[files_index]) != -1) {
            matches[files_matcher[files_matcher_index]] = files[files_index];
            break;
          }          
        }
      }
    }
    
    // Return matches
    callback(null, matches);
  });
}
















