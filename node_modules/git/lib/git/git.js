var util = require('util'),
    fs = require('fs'),
    GitFileOperations = require('./git_file_operations').GitFileOperations,
    exec = require('child_process').exec,
    FileIndex = require('./file_index').FileIndex,
    Repository = require('./repository').Repository,
    Difference = require('../diff/diff').Difference;

var Git = exports.Git = function(git_directory) {
  var _git_diretory = git_directory, _git_file_index;
  var _repository = new Repository(_git_diretory, {});
  // Control access to internal variables
  Object.defineProperty(this, "git_directory", { get: function() { return _git_diretory; }, set: function(value) { _git_diretory = value; }, enumerable: true});
  Object.defineProperty(this, "git_file_index", { get: function() { return _git_file_index; }, set: function(value) { _git_file_index = value; }, enumerable: true});
  Object.defineProperty(this, "repository", { get: function() { return _repository; }, set: function(value) { _repository = value; }, enumerable: true});
}

// Set up the gitbinary
if(process.platform.toLowerCase().match(/mswin(?!ce)|mingw|bccwin|win32/)) {
  Git.git_binary = "git";
} else {
  Git.git_binary = "/usr/bin/env git";
}

// Chomp text removing end carriage returns
var chomp = function chomp(raw_text) {
  return raw_text ? raw_text.replace(/(\n|\r)+$/, '') : '';
}

var read_file = function(path, callback) {
  fs.stat(path, function(err, stat) {
    if(err) return callback(err, null);
    fs.readFile(path, 'ascii', callback);
  })
}

// Retrieve references
Git.prototype.refs = function(options, prefix, callback) {
  var refs = [];
  var already = {};
  var self = this;

  // Locate all files in underlying directories
  var stream = GitFileOperations.glob_streaming(this.git_directory + "/" + prefix);
  // Triggers on each entry in the directory
  stream.addListener("data", function(result) {
    // If we have a directory check if we have a reference file
    if(result.stat.isFile()) {
      // Read the file content
      try {
        var id = chomp(fs.readFileSync(result.path, 'ascii'));
        var name = result.path.replace(self.git_directory + "/" + prefix + "/", '');

        if(!already[name]) {
          refs.push(name + " " + id);
          already[name] = true;
        }
      } catch(err) {
        // Seems to be some instances where it's not able to tell that a directory is not a file ?
      }
    }
  });

  // Triggers at the end of the call
  stream.addListener("end", function(err, result) {
    fs.stat(self.git_directory + "/packed-refs", function(err, stat) {
      if(err || !stat.isFile()) return callback(null, refs.join("\n"));

      read_file(self.git_directory + "/packed-refs", function(err, data) {
        var parts = data.split(/\n/);
        // Scan all lines
        for(var i = 0; i < parts.length; i++) {
          var match = parts[i].match(/^(\w{40}) (.*?)$/)
          if(match) {
            if(match[2].match("^" + prefix)) {
              var id = chomp(match[1]);
              var name = match[2].replace(prefix + "/", '');

              if(!already[name]) {
                refs.push(name + " " + id);
                already[name] = true;
              }
            }
          }
        }
        // Return all the references
        callback(null, refs.join("\n"));
      });
    })
  })
}

// Read a specific file
Git.prototype.fs_read = function(file, callback) {
  GitFileOperations.fs_read(this.git_directory, file, callback);
}

// // Parse revisions
// Git.prototype.rev_parse = function(options, string, callback) {
//  if(string == null || string.constructor != String) return callback("invalid string: " + string);
//  var self = this;
//
//  // Make sure we don't have a directory up ..
//  if(string.match(/\.\./)) {
//    var shas = string.split(/\.\./);
//    var sha1 = shas[0], sha2 = shas[1];
//    // Need to rev_parse the two keys and return the data
//    new Simplifier().execute(new ParallelFlow(
//       function(callback) { self.rev_parse({}, sha1, callback); },
//       function(callback) { self.rev_parse({}, sha2, callback); }
//      ), function(sha1_results, sha2_results) {
//      // Return the collected files
//      return callback(null, [sha1_results[1], sha2_results[1]]);
//    });
//  }
//
//  // If we have a sha being returned nop it
//  if(string.match(/^[0-9a-f]{40}$/)) {
//    return callback(null, chomp(string));
//  }
//
//  // Check in heads directory
//  read_file(self.git_directory + "/refs/heads/" + string, function(err, data) {
//    if(!err) return fs.readFile(self.git_directory + "/refs/heads/" + string, function(err, data) { callback(err, chomp(data)); });
//    // If not in heads then check in remotes
//    read_file(self.git_directory + "/refs/remotes/" + string, function(err, data) {
//      if(!err) return fs.readFile(self.git_directory + "/refs/remotes/" + string, function(err, data) { callback(err, chomp(data)); });
//      // If not in remotes check in tags
//      read_file(self.git_directory + "/refs/tags/" + string, function(err, data) {
//        if(!err) return fs.readFile(self.git_directory + "/refs/tags/" + string, function(err, data) { callback(err, chomp(data)); });
//
//        // Not pin any of the main refs, look in packed packed-refs
//        read_file(self.git_directory + "/packed-refs", function(err, data) {
//          if(err) return callback(err, data);
//          // Split the data on new line
//          var ref = null;
//          var parts = data.split(/\n/);
//          // Locate head
//          for(var i = 0; i < parts.length; i++) {
//            var match_parts = parts[i].match(/^(\w{40}) refs\/.+?\/(.*?)$/);
//            if(match_parts) {
//              ref = match_parts[1];
//              // If we have a match fetch reference and return
//              if(new RegExp(string + '$').test(match_parts[3])) {
//                break;
//              }
//            }
//          }
//
//          // If we have a reference lets terminate
//          if(ref) return callback(null, ref);
//
//          // !! more partials and such !!
//
//
//          // revert to calling git
//          self.call_git('', 'rev-parse', '', options, string, function(err, result) {
//            result = result ? chomp(result) : result;
//            callback(err, result);
//          })
//        });
//      });
//    });
//  });
// }

Git.prototype.transform_options = function(options) {
  var args = [];
  var keys = Object.keys(options);

  // Process all entries
  Object.keys(options).forEach(function(key) {
    if(key.length == 1) {
      if(options[key] == true && options[key].constructor == Boolean) { args.push('-' + key);
      } else if(options[key] == false && options[key].constructor == Boolean) {
      } else { args.push('-' + key + ' "' + options[key].toString().replace('"', "\\\"") + '"'); }
    } else {
      if(options[key] == true && options[key].constructor == Boolean) { args.push("--" + key.toString().replace(/_/, '-'));
      } else if(options[key] == false && options[key].constructor == Boolean) {
      } else { args.push('--' + key.toString().replace(/_/, '-') + '="' + options[key].toString().replace('"', "\\\"") + '"'); }
    }
  });

  // Return formated parametes
  return args;
}

Git.prototype.git = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  // Unpack the variables
  var function_name = args.length ? args.shift() : null;
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', function_name, '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

var shell_escape = function(str) {
  return str.toString().replace('"', "\\\"").replace(/\;/g, "\\;");
}

// Call the native git binary
Git.prototype.call_git = function(prefix, command, postfix, options, args, callback) {
  // Do we have a timeout
  var timeout = options['timeout'] ? timeout : 1000 * 60;
  var call_string = '';
  // Remove the timeout property if we have one
  if(options['timeout']) delete options['timeout'];
  var option_arguments = this.transform_options(options);

  if(process.platform.toLowerCase().match(/mswin(?!ce)|mingw|bccwin/)) {
  } else {
    // Map the extra parameters
    var ext_args = args.map(function(arg) { return (arg == '--' || arg.substr(0, 1) == '|' ? arg : ('"' + shell_escape(arg) + '"'))})
                    .filter(function(arg) { return arg == null || arg == '' ? false : true});
    // Join the arguments
    var final_arguments = option_arguments.concat(ext_args);
    // Build a call
    call_string = prefix + Git.git_binary + ' --git-dir="'+ this.git_directory + '" ' + command.toString().replace(/_/, '-') + ' ' + final_arguments.join(" ") + postfix;
  }
  // Execute the function
  execute_git_call(call_string, { encoding: 'utf8', timeout: timeout, killSignal: 'SIGKILL'}, callback);
}

var execute_git_call = function(call_string, options, callback) {
  // Execute the git command
  options.maxBuffer = 1024 * 1024;
  exec(call_string, options,
    function (error, stdout, stderr) {
      if (error != null) {
        var result = error.toString();
        callback(result != null ? result.trim() : result, null);
      } else {
        var result = stdout.toString();
        callback(null, result != null ? result.trim() : result)
      }
  });
}

var file_index = function(git, callback) {
  // If we have a file index object return it otherwise create a new one
  if(!git.git_file_index) {
    new FileIndex(git.git_directory, function(err, _file_index) {
      git.git_file_index = _file_index;
      callback(null, _file_index);
    });
  } else {
    callback(null, git.git_file_index);
  }
}

// Fetch a revision list
Git.prototype.rev_list = function(options, reference, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  options = args.length ? args.shift() : {};
  reference = args.length ? args.shift() : 'master';

  // Remove skip option if it's set to 0
  if(options['skip'] != null && parseInt(options['skip']) == 0) delete options['skip'];
  var allowed_options = {"max_count":1, "since":1, "until":1, "pretty":1};
  var establish_keys = Object.keys(options).filter(function(key) {
      return allowed_options[key] ? false : true;
    });

  // If we have commands we don't support call through to native git
  if(establish_keys.length > 0) {
    self.call_git('', 'rev_list', '', options, [reference], function(err, result) {
      callback(err, result);
    })
  } else if(Object.keys(options).length == 0){
    // Fetch the file index (will create a file index on the first call)
    file_index(self, function(err, _file_index) {
      if(err) return callback(err, _file_index);
      // Parse the revision
      self.rev_parse({}, reference, 0, function(err, ref) {
        if(err) return callback(err, ref);
        // Fetch the commits from the revision passed in
        _file_index.commits_from(ref, function(err, commits) {
          if(err) {
            self.call_git('', 'rev_list', '', options, [reference], function(err, result) {
              callback(err, result);
            })
          } else {
            callback(null, commits.join("\n") + "\n");
          }
        })
      });
    })
  } else {
    self.rev_parse({}, reference, 0, function(err, ref) {
      if(err) return callback(err, ref);

      if(Array.isArray(ref)) {
        self.call_git('', 'rev_list', '', options, [reference], function(err, result) {
          callback(err, result);
        })
      } else {
        try {
          // Try to execute revision fetch
          self.repository.rev_list(ref, options, function(err, result) {
            callback(err, result);
          })
        } catch(err) {
          callback(err, null);
        }
      }
    });
  }
}

// Chomp text removing end carriage returns
var chomp = function chomp(raw_text) {
  return raw_text.replace(/(\n|\r)+$/, '');
}

Git.prototype.rev_parse = function(options, string, level, callback) {
  if(string != null && string.constructor != String) return callback('only supports single sha reference');
  var self = this;

  // Allow leaving of level
  var args = Array.prototype.slice.call(arguments, 2);
  var callback = args.pop();
  level = args.length ? args.shift() : 0;

  if(string.match(/\.\./)) {
    var parts = string.split("..");
    var sha1 = parts[0], sha2 = parts[1];
    var value = [this.rev_parse({}, sha1, level + 1, callback), this.rev_parse({}, sha2, level + 1, callback)];
    if(level == 0) return callback(null, value);
  }

  // a sha is being passed in, chomp and return
  if(string.match(/^[0-9a-f]{40}$/)) {
    var value = chomp(string);
    if(level == 0) {
      return callback(null, value);
    } else {
      return value;
    }
  }

  // Check all the references
  var head = this.git_directory + "/refs/heads/" + string;
  try {
    if(level == 0) {
      return callback(null, chomp(fs.readFileSync(head, 'utf8')));
    } else {
      return chomp(fs.readFileSync(head, 'utf8'));
    }
  } catch(err) {}

  var head = this.git_directory + "/refs/remotes/" + string;
  try {
    if(level == 0) {
      return callback(null, chomp(fs.readFileSync(head, 'utf8')));
    } else {
      return chomp(fs.readFileSync(head, 'utf8'));
    }
  } catch(err) {}

  var head = this.git_directory + "/refs/tags/" + string;
  try {
    if(level == 0) {
      return callback(null, chomp(fs.readFileSync(head, 'utf8')));
    } else {
      return chomp(fs.readFileSync(head, 'utf8'));
    }
  } catch(err) {}

  // Check packed-refs file, too
  var packref = this.git_directory + "/packed-refs";
  try {
    // Read the file
    var parts = data.split(/\n/);
    // Locate head
    for(var i = 0; i < parts.length; i++) {
     var match_parts = parts[i].match(/^(\w{40}) refs\/.+?\/(.*?)$/);
     if(match_parts) {
       ref = match_parts[1];
       // If we have a match fetch reference and return
       if(new RegExp(string + '$').test(match_parts[3])) {
         if(level == 0) {
           return callback(null, chomp(ref));
         } else {
           return chomp(ref);
         }
       }
     }
    }
  } catch(err) {}

  // Wait until we got the git call
  self.call_git('', 'rev-parse', '', options, [string], function(err, result) {
    callback(null, result ? chomp(result) : result);
  })
}

// List tree content
Git.prototype.ls_tree = function(treeish, paths, options, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var callback = args.pop();
  paths = args.length ? args.shift() : [];
  paths = paths ? paths : [];
  options = args.length ? args.shift() : {};

  try {
    // Reverse parse the tree sha
    this.rev_parse({}, treeish, function(err, sha) {
      if(err) return callback(err, sha);
      var tree = self.repository.ls_tree(sha, flatten(paths), options['r']);
      if(tree == '') return callback('no such sha found', null);
      // Ls_tree
      callback(null, tree);
    })
  } catch(err) {
    callback(err, null);
  }
}

// Cat a file
Git.prototype.cat_file = function(type, ref, callback) {
  if(type == "t") {
    this.file_type(ref, callback);
  } else if(type == "s") {
    this.file_size(ref, callback);
  } else if(type == "p") {
    callback(null, this.repository.cat_file(ref));
  }
}

Git.prototype.file_size = function(ref, callback) {
  callback(null, this.repository.cat_file_size(ref));
}

// Make a directory
//  dir: is the relative path to the directory to create
//
// Return nothing
Git.prototype.fs_mkdir = function(dir, callback) {
  var path = this.git_directory + "/" + dir;
  GitFileOperations.fs_mkdir(path, callback);
}

// Initialize a new git repository (create physical setup)
Git.prototype.init = function(options, callback) {
  var self = this;
  var arguments = Array.prototype.slice(arguments);

  if(Object.keys(options).length == 0) {
    Repository.init(this.git_directory, callback);
  } else {
    // Execute init with call git and return the object
    this.call_git('', 'init', '', options, arguments, function(err, result) {
      if(err) return callback(err, result);
      callback(null, self);
    });
  }
}

// Clone a directory
Git.prototype.clone = function(options, original_path, target_path, callback) {
}

// Generate diff from the changes between two shas
// Git.prototype.diff = function(options, sha1, sha2, callback) {
// }
//
// var simple_diff = function(repo, options, sha1, sha2, callback) {
//
// }
//
// var native_diff = function(repo, options, sha1, sha2, base, paths, callback) {
//
// }

// Gotten from
var flatten = function(array) {
  return array.reduce(function(a,b) {
    return a.concat(b);
  }, []);
}

Git.prototype.diff = function(commit1, commit2, options, callback) {
  try {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 2);
    // Pop the callback
    var callback = args.pop();
    options = args.length ? args.shift() : {};

    // Initialize patch variable
    var patch = '', commit_obj1 = null, tree1 = null, tree2 = null;
    // Retrieve the first commit object
    var commit_obj1 = self.repository.get_object_by_sha1(commit1);
    var tree1 = commit_obj1.tree;

    if(commit2) {
      tree2 = self.repository.get_object_by_sha1(commit2).tree;
    } else {
      tree2 = self.repository.get_object_by_sha1(commit_obj1.parent[0]).tree;
    }

    var qdiff = self.repository.quick_diff(tree1, tree2).sort();
    qdiff.forEach(function(diff_arr) {
      // Set up all the variables
      var path = diff_arr[0];
      var status = diff_arr[1];
      var treeSHA1 = diff_arr[2];
      var treeSHA2 = diff_arr[3];
      var format = 'unified';
      var lines = 3;
      var output = '';
      var file_length_difference = 0;

      // Fetch the files
      var fileA = treeSHA1 ? self.repository.cat_file(treeSHA1) : '';
      var fileB = treeSHA2 ? self.repository.cat_file(treeSHA2) : '';

      // Get the sha's or set empty shas
      var sha1 = treeSHA1 || '0000000000000000000000000000000000000000';
      var sha2 = treeSHA2 || '0000000000000000000000000000000000000000';

      // Split up data
      var data_old = fileA.trim().split(/\n/).map(function(e) { return chomp(e); });
      var data_new = fileB.trim().split(/\n/).map(function(e) { return chomp(e); });
      // Javascript split's a file into [''] if it's an empty file
      if(data_old.length == 1 && data_old[0] == '') data_old = [];
      if(data_new.length == 1 && data_new[0] == '') data_new = [];

      // Get diffs
      var diffs = Difference.LCS.diff(data_old, data_new);
      if(diffs.length > 0) {
        // Create paths
        var a_path = "a/" + path.replace(/\.\//g, '');
        var b_path = "b/" + path.replace(/\.\//g, '');
        // Let's create the header
        var header = "diff --git " + a_path + " " + b_path;
        if(options['full_index']) {
          header = header + '\n' + 'index ' + sha1 + '..' + sha2;
          if(treeSHA2) header = header + "' 100644";
        } else {
          header = header + '\n' + 'index ' + sha1.substr(0, 7) + '..' + sha2.substr(0, 7);
          if(treeSHA2) header = header + ' 100644';
        }

        header = header + '\n--- ' + (treeSHA1 ? a_path : '/dev/null');
        header = header + '\n+++ ' + (treeSHA2 ? b_path : '/dev/null');
        header = header + '\n';

        // standard hunk
        var old_hunk = null, hunk = null;
        // Process all the diff changes
        diffs.forEach(function(piece) {

          try {
            hunk = new Difference.LCS.Hunk(data_old, data_new, piece, lines, file_length_difference);
            file_length_difference = hunk.file_length_difference;

            if(old_hunk) {
              if(lines > 0 && hunk.overlaps(old_hunk)) {
                hunk.unshift(old_hunk);
              } else {
                output = output + old_hunk.diff(format);
              }
            }
          } catch(err) {}

          old_hunk = hunk;
          output = output + '\n';
        });

        // Prepare next
        output = output + old_hunk.diff(format);
        output = output + '\n';
        patch = patch + header + output.trimLeft();
      }
    });

    // Return the patch
    callback(null, patch);
  } catch(err) {
    callback('tree was bad or lcs is not working', null);
  }
}

// Check if a file exists
Git.prototype.fs_exist = function(path, callback) {
  GitFileOperations.fs_exist(this.git_directory, path, callback);
}

// Write a normal file to the filesystem
//  file: relative path from the Git dir
//  contents: String content to be written
//
// Return nothing
Git.prototype.fs_write = function(file, content, callback) {
  GitFileOperations.fs_write(this.git_directory, file, content, callback);
}

// Log function, returns the number of logs
Git.prototype.log = function(commit, path, options, callback) {
  args = ['--raw', '--no-abbrev', '--numstat'];
  if (path) {
    args.push('--');
    args.push(path);
  }
  options.color = 'never';
  this.call_git('', 'log', '', options, args, callback);
}

// Select the objects that exists
//  object_ids: array of object sha's
//
// Returns array of ids's that exist
Git.prototype.select_existing_objects = function(object_ids, callback) {
  var existing_object_ids = [];
  // Process all the object ids
  for(var i = 0; i < object_ids.length; i++) {
    // Check if the object_id exists in the db
    this.repository.object_exists(object_ids[i], function(err, result)  {
      if(err) return callback(err, result);
      if(result) existing_object_ids.push(object_ids[i]);
    });
  }
  // Return all the existing objects
  callback(null, existing_object_ids);
}

// Format the patch
Git.prototype.format_patch = function(options, reference, callback) {
  this.call_git('', 'format_patch', '', options, [reference], function(err, result) {
    callback(err, result);
  })
}

// Fetch the blame
Git.prototype.blame = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;

  // Execute blame command
  this.call_git('', 'blame', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

var clean_paths = function(commits) {
  var new_commits = {};
  // Iterate over all the commit hash entries and clean the directory names
  Object.keys(commits).forEach(function(file) {
    var sha = commits[file];
    file = file.substr(file.length - 1, 1) == '/' ? file.substr(0, file.length - 1) : file;
    new_commits[file] = sha;
  })
  // Return all the cleaned commits
  return new_commits;
}

// Fetch blame tree
Git.prototype.blame_tree = function(commit, path, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var callback = args.pop();
  path = args.length ? args.shift() : null;

  // Create path
  path = path != null && path != '' ? [path].join("/").toString() + '/' : path;
  path = !path || path.constructor != String ? '' : path;

  // Fetch the file_index
  file_index(this, function(err, file_index_instance) {
    if(err) return callback(err, file_index_instance);

    self.rev_parse({}, commit, 0, function(err, rev_parse_output) {
      if(err) return callback(err, rev_parse_output);

      self.looking_for(commit, path, function(err, looking_for) {
        if(err) return callback(err, looking_for);

        file_index_instance.last_commits(rev_parse_output, looking_for, function(err, commits) {
          if(err) return callback(err, commits);

          callback(null, clean_paths(commits));
        });
      });
    });
  });
}

// Looking for
Git.prototype.looking_for = function(commit, path, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var callback = args.pop();
  path = args.length ? args.shift() : null;
  var file = null;

  // Fetch the commit sha
  self.rev_parse({}, commit, 0, function(err, rev_parse_output) {
    if(err) return callback(err, rev_parse_output);

    // Fetch the sub tree
    self.repository.get_subtree(rev_parse_output, path, function(err, tree_sha) {
      if(err) return callback(err, tree_sha);

      // Contains the files
      var looking_for = [];
      // Fetch and return the object by the tree sha
      var object = self.repository.get_object_by_sha1(tree_sha);
      // Process all the entries for the object
      object.entries.forEach(function(entry) {
        file = path && !(path == '' || path == '.' || path == './') ?  path + "/" + entry.name : entry.name;
        // Ensure no double path characters
        file = file.replace('//', '/');
        // Add a slash if it's a directory
        if(entry.type == 'directory') file = file + "/";
        // Add to list of looking_for entries
        looking_for.push(file);
      });

      // Return the entries
      return callback(null, looking_for);
    });
  });
}

// Peform commit
Git.prototype.commit = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;

  // Execute blame command
  this.call_git('', 'commit', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Fetch config
Git.prototype.config = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'config', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Execute add command
Git.prototype.add = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'add', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Execute remove command
Git.prototype.remove = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'rm', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Execute ls-files
Git.prototype.ls_files = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'ls-files', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Execute diff-files
Git.prototype.diff_files = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'diff-files', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

// Execute diff-index
Git.prototype.diff_index = function() {
  // Unpack parameters as commit might be null
  var args = Array.prototype.slice.call(arguments, 0);
  var callback = args.pop();
  var options = args.length ? args.shift() : {};
  var arguments = args;
  // Execute blame command
  this.call_git('', 'diff-index', '', options, arguments, function(err, result) {
    callback(err, result);
  });
}

Git.prototype.file_type = function(ref, callback) {
  return callback(null, this.repository.cat_file_type(ref));
}

Git.prototype.put_raw_object = function(content, type, callback) {
  return this.repository.put_raw_object(content, type, callback);
}

Git.prototype.commit_from_sha = function(id) {
  var repository = new Repository(this.git_directory);
  var object = repository.get_object_by_sha1(id);

  if(object.type == "commit") {
    return id;
  } else if(object.type == "tag") {
    return object.object;
  } else {
    return '';
  }
}


// // ===================================================================================================
// //
// //  Decorates the Class prototype with functions wrapping git native functions (if not defined already)
// //
// // ===================================================================================================
// Git.prototype.call_git('', 'help', '', {}, ['--all'], function(err, result) {
//   var index = result.indexOf("-----------");
//   result = result.substr(index);
//   var lines = result.trim().split("\n");
//   // Ship the first line
//   lines.shift();
//   // Process all the lines
//   while(lines.length > 0 && lines[0] != '') {
//     var line = lines.shift().trim().replace(/ +/g, ' ');
//     var parts = line.split(" ");
//
//     parts.forEach(function(command) {
//       var function_name = command.replace(/\-/g, '_');
//       // For each entry create a new function if it does not exist on the prototype
//       if(Git.prototype[function_name] == null) {
//         Git.prototype[function_name] = function() {
//           // Unpack parameters as commit might be null
//           var args = Array.prototype.slice.call(arguments, 0);
//           callback = args.pop();
//           var options = args.length ? args.shift() : {};
//           var arguments = args;
//           // Execute blame command
//           this.call_git('', command, '', options, arguments, function(err, result) {
//             callback(err, result);
//           });
//         }
//       }
//     });
//
//   }
//
//   // callback(null, null);
//   pre_loading_done = true
//   // var g = new Git("..../")
// });

