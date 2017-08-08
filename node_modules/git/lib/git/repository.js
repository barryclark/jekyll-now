var util = require('util'),
  GitObject = require('./git_object').GitObject,
  fs = require('fs'),
  LooseStorage = require('./loose_storage').LooseStorage,
  PackStorage = require('./pack_storage').PackStorage,
  BinaryParser = require('./binary_parser').BinaryParser;

Repository = exports.Repository = function(git_directory, options) {  
  var _git_directory = git_directory;
  var _options = options ? options : {};
  var _packs = [];
  var _loose = null;
  var _already_searched = {};
  var self = this;
  
  Object.defineProperty(this, "git_directory", { get: function() { return _git_directory; }, set: function(value) { _git_directory = value; }, enumerable: true});    
  Object.defineProperty(this, "options", { get: function() { return _options; }, set: function(value) { _options = value; }, enumerable: true});    
  Object.defineProperty(this, "already_searched", { get: function() { return _already_searched; }, set: function(value) { _already_searched = value; }, enumerable: true});      
  Object.defineProperty(this, "packs", { get: function() { return _packs; }, set: function(value) { _packs = value; }, enumerable: true});      
  Object.defineProperty(this, "loose", { get: function() { return _loose; }, set: function(value) { _loose = value; }, enumerable: true});      
}

// Chomp text removing end carriage returns
var chomp = function chomp(raw_text) {
  return raw_text.replace(/(\n|\r)+$/, '');
}

var truncate_array = function(array, sha) {
  
}

// takes the following options:
//  :since - Time object specifying that you don't want commits BEFORE this
//  :until - Time object specifying that you don't want commit AFTER this
//  :first_parent - tells log to only walk first parent
//  :path_limiter - string or array of strings to limit path
//  :max_count - number to limit the output
Repository.prototype.log = function(sha, options, callback) {
  this.already_searched = {}
  return walk_log(this, sha, options);
}

var close = function(repo) {
  if(repo.packs) {
    repo.packs.forEach(function(pack) { 
      pack.close(); 
    });
  }
}

var git_path = function(repo, path) { return repo.git_directory + "/" + path; }

var initloose = function(repo) {
  repo.loaded = [];
  repo.loose = [];
  load_loose(repo, git_path(repo, 'objects'));
  load_alternate_loose(repo, git_path(repo, 'objects'));
  return repo.loose;
}

var load_loose = function(repo, path) {
  repo.loaded.push(path);
  try {
    fs.statSync(path);
    repo.loose.push(new LooseStorage(path));    
  } catch (err) {
    return;    
  }
}

var load_alternate_loose = function(repo, path) {
  // load alternate loose too
  var alt = path + '/info/alternates';
  try {
    fs.statSync(alt);
    // Read and process all entries in the directory
    var lines = fs.readFileSync(alt, 'utf8').split('\n');
    lines.length > 0 && lines[lines.length - 1] == '' ? lines.pop() : null;
    // Iterate over alternate loose storage locations
    lines.forEach(function(line) {      
      // Only load the path once
      if(repo.loaded.indexOf(chomp(line)) == -1) {        
        if(line.substr(0, 2) == "..") {
          line = fs.realpathSync(repo.git_directory + "/" + line);
        }     

        load_loose(repo, chomp(line));
        load_alternate_loose(repo, chomp(line));        
      }
    });    
  } catch(err) {}
}

var initpacks = function(repo) {
  close(repo);
  repo.loaded_packs = [];
  repo.packs = [];
  load_packs(repo, git_path(repo, "objects/pack"));
  load_alternate_packs(repo, git_path(repo, "objects"));
  return repo.packs;
}

var load_packs = function(repo, path) {
  repo.loaded_packs.push(path);
  try {
    fs.statSync(path);
    // Read and process all entries in the directory
    fs.readdirSync(path).forEach(function(entry) {
      // If we have a pack file create a new storage object
      if(entry.match(/\.pack$/i)) {
        var pack = new PackStorage(path + "/" + entry);
        // If we have specified the map for the pack then load the entire object map
        if(repo.options["map_packfile"]) {
          pack.cache_objects();
        }
        // Add pack to list of packs in the repo
        repo.packs.push(pack)
      }
    });
  } catch (err) {    
  }
}

var load_alternate_packs = function(repo, path) {
  var alt = path + "/info/alternates";
  
  try {
    fs.statSync(alt);
    // Read and process all entries in the directory
    var lines = fs.readFileSync(alt, 'utf8').split('\n');
    lines.length > 0 && lines[lines.length - 1] == '' ? lines.pop() : null;

    lines.forEach(function(line) {
      if(line.substr(0, 2) == "..") {
        line = fs.realpathSync(repo.git_directory + "/" + line);
      }
      
      // Get pack file name
      var full_pack = chomp(line) + "/pack";
      if(repo.loaded_packs.indexOf(full_pack) == -1) {
        load_packs(repo, full_pack);
        load_alternate_packs(repo, chomp(line));
      }
    })
  } catch(err) {    
  }
}

var get_raw_object_by_sha1 = function(repo, sha1o) {
  if(!sha1o || sha1o == "" || sha1o.constructor != String) throw "no such sha found";
  
  var sha1 = '';
  for(var i = 0; i < sha1o.length; i = i + 2) {
    sha1 = sha1 + String.fromCharCode(parseInt(sha1o.substr(i, 2), 16));
  }
  // Init packs if we have none set yet
  if(!repo.packs) initpacks(repo);
  // Try packs
  var packs = repo.packs;
  for(var i = 0; i < packs.length; i++) {
    var o = packs[i].find(sha1);    
    if(o != null) return o;
  }

  if(!repo.loose) initloose(repo);
  // Try loose storage
  var looses = repo.loose;  
  for(var i = 0; i < looses.length; i++) {
    var o  = looses[i].find(sha1);
    if(o) return o;
  }

  // try packs again maybe the object got packed in the meantime
  initpacks(repo);
  // Try packs
  var packs = repo.packs;  
  for(var i = 0; i < packs.length; i++) {
    var o = packs[i].find(sha1);
    if(o != null) return o;
  }
  
  // No results throw an error that no sha pack object was found
  throw "no such sha found";
}

Repository.prototype.get_object_by_sha1 = function(sha1) {
  var r = get_raw_object_by_sha1(this, sha1);
  if(!r) return null;
  return GitObject.from_raw(r, this);
}

// returns true if the files in the path_limiter were changed or no path limiter
// used by the log() function when passed with a path_limiter
Repository.prototype.files_changed = function(tree_sha1, tree_sha2, path_limiter) {
  if(path_limiter == null) return true;
  // We got a path limiter, let's perform the diff to check for changes
  var mod = this.quick_diff(tree_sha1, tree_sha2);
  var files = mod.map(function(c) { return c[0]; });
  path_limiter = Array.isArray(path_limiter) ? path_limiter : path_limiter != null ? [path_limiter] : [];
  
  for(var i = 0; i < path_limiter.length; i++) {
    if(files.indexOf(path_limiter[i]) != -1) return true;
  }
  return false;
}

// Returns the raw file contents of this sha
Repository.prototype.cat_file = function(sha) {
  return this.get_object_by_sha1(sha).raw_content;
}

// Returns the file size (as an int) of this sha
Repository.prototype.cat_file_size = function(sha) {
  return get_raw_object_by_sha1(this, sha).content.length;
}

// Returns the file type as string of this sha
Repository.prototype.cat_file_type = function(sha) {
  return get_raw_object_by_sha1(this, sha).type;  
}

// returns the raw (cat-file) output for a tree
// if given a commit sha, it will print the tree of that commit
// if given a path limiter array, it will limit the output to those
// if asked for recursive trees, will traverse trees
Repository.prototype.ls_tree = function(sha, paths, recursive) {
  var self = this;
  paths = paths ? paths : [];
  recursive = recursive ? recursive : false;

  try {
    if(paths.length > 0) {
      // pathing
      var part = [];
      paths.forEach(function(path) {
        part = part.concat(self.ls_tree_path(sha, path));
      })
      // Return the parts
      return part.join("\n");
    } else {
      return this.get_raw_tree(sha, recursive);
    }    
  } catch (err) {
    return '';
  }
}

Repository.prototype.get_raw_tree = function(sha, recursive) {
  var self = this;
  recursive = recursive ? recursive : false;
  var tree = null;
  
  var o = get_raw_object_by_sha1(this, sha);
  if(o.type == 'commit') {
    tree = this.get_object_by_sha1(sha).tree;
  } else if(o.type == 'tag') {
    var commit_sha = this.get_object_by_sha1(sha).object;
    tree = this.get_object_by_sha1(commit_sha).tree;
  } else if(o.type == 'tree') {
    tree = sha;
  } else {
    return null;
  }
  
  // If recursive execute next level of trees otherwise return the raw file
  return recursive ? this.get_raw_trees(tree) : this.cat_file(tree);
}

// Grabs tree contents recursively,
//  e.g. `git ls-tree -r sha`
Repository.prototype.get_raw_trees = function(sha, path) {
  var self = this;
  path = path ? path : '';
  var out = '';
  
  this.cat_file(sha).split('\n').forEach(function(line) {
    var parts = line.split(/\s/);
    var mode = parts[0], type = parts[1], sha = parts[2], name = parts[3];    
    
    if(type == 'tree') {
      var full_name = path.length == 0 ? name : (path + '/' + name);
      out = out + self.get_raw_trees(sha, full_name);
    } else if(path.length == 0) {
      out = out + line + '\n';
    } else {
      out = out + line.replace(new RegExp(name, 'g'), (path + '/' + name)) + '\n';
    }
  });  
  // Return the out
  return out;
}

// return array of tree entries
// TODO : refactor this to remove the fugly
Repository.prototype.ls_tree_path = function(sha, path, append) {
  var self = this;
  var tree = this.get_raw_tree(sha);
  
  if(path.match(/\//)) {
    var paths = path.split('/');
    paths.length > 0 && paths[paths.length - 1] == '' ? paths.pop() : null;
    var last = path.substr(path.length - 1, 1);

    if((last == '/') && (paths.length == 1)) {
      var append = append ? (append + "/" + paths[0]) : paths[0];
      var dir_name = tree.split('\n').filter(function(p) { return p.split('\t')[1] == paths[0]; })[0];
      
      if(dir_name == null) throw "no such path";
      var next_sha = dir_name.split(/ |\t/)[2];
      var tree = self.get_raw_tree(next_sha);
      
      tree = tree.split('\n');
      
      if(append) {
        var mod_tree = [];
        tree.forEach(function(ent) {
          var parts = ent.split('\t');
          var info = parts[0], fpath = parts[1];
          mod_tree.push([info, (append + "/" + fpath)].join('\t'));
        });
        return mod_tree;
      } else {
        return tree;
      }
    } else {
      if(tree == null) throw "no such path";
      var next_path = paths.shift();
      var dir_name = tree.split('\n').filter(function(p) { return p.split('\t')[1] == next_path; })[0];
      if(dir_name == null) throw "no such path";
      var next_sha = dir_name.split(/ |\t/)[2];
      next_path = append ? (append + "/" + next_path) : next_path;
      
      if(last == '/') {
        return self.ls_tree_path(next_sha, (paths.join('/') + '/'), next_path);
      } else {
        return self.ls_tree_path(next_sha, paths.join('/'), next_path);
      }      
    }    
  } else {
    if(tree == null) throw "no such path";
    var tree = tree.split('\n');
    tree = tree.filter(function(p) { return p.split('\t')[1] == path; });
    
    if(append) {
      var mod_tree = [];
      tree.forEach(function(ent) {
        var parts = ent.split('\t');
        var info = parts[0], fpath = parts[1];
        mod_tree.push([info, (append + '/' + fpath)].join('\t'));
      });
      return mod_tree;
    } else {
      return tree;
    }
  }
}

// takes 2 tree shas and recursively walks them to find out what
// files or directories have been modified in them and returns on
// array of changes
//  [ [full_path, 'added', tree1_hash, nil],
//   [full_path, 'removed', nil, tree2_hash],
//   [full_path, 'modified', tree1_hash, tree2_hash]
//  ]
Repository.prototype.quick_diff = function(tree1, tree2, path, recurse) {
  var self = this;
  path = path ? path : '.';
  recurse = recurse ? recurse : true;
  // Handle empty trees
  var changed = [];  
  if(tree1 == tree2) return changed;
  
  var t1 = tree1 ? this.list_tree(tree1) : null;
  var t2 = tree2 ? this.list_tree(tree2) : null;
  
  // Check that we have tree 1 blob differences
  if(t1) {
    Object.keys(t1['blob']).forEach(function(file) {
      var hsh = t1['blob'][file];
      // Fetch the same file in tree 2
      var t2_file = t2 ? t2['blob'][file] : null;
      var full = path + "/" + file;
      if(!t2_file) {
        changed.push([full, 'added', hsh['sha'], null]);  // not in parent
      } else if(hsh['sha'] != t2_file['sha']) {
        changed.push([full, 'modified', hsh['sha'], t2_file['sha']]); // file changed
      }
    });
  }
    
  
  // Check tree 2 blobs
  if(t2) {
    Object.keys(t2['blob']).forEach(function(file) {
      var hsh = t2 ? t2['blob'][file] : null;
      if(t1 == null || t1['blob'][file] == null) {
        changed.push([path + "/" + file, 'removed', null, hsh['sha']]);
      }
    });
  }
  
  // Check for all the tree objects
  if(t1) {
    Object.keys(t1['tree']).forEach(function(dir) {
      var hsh = t1['tree'][dir];
      var t2_tree = t2 ? t2['tree'][dir] : null;
      var full = path + "/" + dir;      
      
      if(!t2_tree) {
        if(recurse) {
          changed = changed.concat(self.quick_diff(hsh['sha'], null, full, true));
        } else {
          changed.push([full, 'added', hsh['sha', null]]);
        }
      } else if(hsh['sha'] != t2_tree['sha']) {
        if(recurse) {
          changed = changed.concat(self.quick_diff(hsh['sha'], t2_tree['sha'], full, true));
        } else {
          changed.push([full, 'modified', hsh['sha'], t2_tree['sha']]);
        }
      }
    });    
  }
  
  if(t2) {
    Object.keys(t2['tree']).forEach(function(dir) {
      var hsh = t2['tree'][dir];
      var t1_tree = t1 ? t1['tree'][dir] : null;
      
      if(!t1_tree) {
        if(recurse) {
          changed = changed.concat(self.quick_diff(null, hsh['sha'], full, true));
        } else {
          changed.push([full, 'removed', null, hsh['sha']]);
        }
      }
    });    
  }
  // Return all the changed files
  return changed;
}

// returna 2-d hash of the tree
// ['blob']['FILENAME'] = {:mode => '100644', :sha => SHA}
// ['tree']['DIRNAME'] = {:mode => '040000', :sha => SHA}
Repository.prototype.list_tree = function(sha) {
  var data = {blob:{}, tree:{}, link:{}, commit:{}};
  var object = this.get_object_by_sha1(sha);
  object.entries.forEach(function(entry) {
    data[entry.format_type][entry.name] = {mode:entry.format_type, sha:entry.sha1};
  });
  
  return data;
}

var walk_log = function(repo, sha, options, total_size) {
  if(total_size == null) total_size = 0;  
  if(repo.already_searched[sha]) return [];
  // Add the sha to the list of allready searched for sha's
  repo.already_searched[sha] = true;
  // Empty array
  var array = [];
  var o = null, commit_sha = null, c = null, output = null;

  if(sha) {
    // Get the raw object
    o = get_raw_object_by_sha1(repo, sha);

    // Create a git object from the raw object
    if(o.type == "tag") {
      commit_sha = repo.get_object_by_sha1(sha).object;
      c = repo.get_object_by_sha1(commit_sha);
    } else {      
      c = GitObject.from_raw(o, repo);
    }
    
    // If it is not a commit
    if(c.type != "commit") return [];  

    // Add sha
    var add_sha = true;    
    // Check if the commit should be in the results
    if(options["since"] && (options["since"] && options["since"].constructor == Date) && (options["since"] > c.committer.date)) {
      add_sha = false;
    }    
    if(options["until"] && (options["until"] && options["until"].constructor == Date) && (options["until"] < c.committer.date)) {
      add_sha = false;
    }
                
    // Follow all parents unless --first-parent is specified
    var subarray = [];
    
    if(c.parent.length == 0 && options["path_limiter"]) {
      add_sha = false;
    }
    
    if(options["max_count"] == null || ((array.length + total_size) < options["max_count"])) {      
      if(options["path_limiter"] == null) {
        output = c.raw_log(sha);
        array.push([sha, output, c.committer.date]);
      }

      if(options["max_count"] != null && (array.length + total_size) >= options["max_count"]) {
        return array;
      }
      
      for(var i = 0; i < c.parent.length; i++) {
        var psha = c.parent[i];
        var tree = repo.get_object_by_sha1(psha).tree;
        
        if(psha && !repo.files_changed(c.tree, tree, options["path_limiter"])) {
          add_sha = false;
        }
        
        // Walk the next level of the tree
        var results = walk_log(repo, psha, options, (array.length + total_size));
        subarray = subarray.concat(results); 
        if(options["first_parent"]) break;
      }
      
      if(options["path_limiter"] != null && add_sha) {
        output = c.raw_log(sha);
        array.push([sha, output, c.comitter.date]);        
      }
      
      if(add_sha) {
        array = array.concat(subarray);
      }
    }
  }
  // Return all the commits
  return array;
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

Repository.prototype.rev_list = function(sha, options, callback) {
  try {
    var end_sha = null;

    if(Array.isArray(sha)) {
      end_sha = sha[0], sha = sha[1];
    }

    // Walk the log
    var log = this.log(sha, options);    
    // Sort the log
    log = log.sort(function(a, b) {
      return compare(a[2], b[2])
    }).reverse();
    
    // Truncate array
    if(end_sha) {
      log = truncate_arr(log, end_sha);
    }

    // Shorten the list if it's longer than max_count
    if(options['max_count']) {      
      var opt_len = parseInt(options['max_count']);
      // If the length is less than the total log
      if(opt_len < log.length) {
        log = log.slice(0, opt_len);
      }
    }
    
    // Pretty print the result if option is specified
    if(options['pretty'] == 'raw') {      
      log = log.map(function(log_entry) { return log_entry[1]; }).join("");
    } else {
      log = log.map(function(log_entry) { return log_entry[0]; }).join("\n");
    }

    // Return the log
    callback(null, log);    
  } catch (err) {
    callback(err, null);
  }
}

// Cut off the array at a specific point
var truncate_arr = function(arr, end_sha) {
  var new_arr = [];
  
  for(var i = 0; i < arr.length; i++) {
    var a = arr[i];
    if(a[0] == sha) {
      return new_arr;
    }
    new_arr.push(a);
  }
  return new_arr;
}

// Returns true/false if that sha exists in the db
Repository.prototype.object_exists = function(sha1, callback) {
  var self = this;
  var sha_hex = '';
  for(var i = 0; i < sha1.length; i = i + 2) {
    sha_hex = sha_hex + String.fromCharCode(parseInt(sha1.substr(i, 2), 16));
  }
  
  // Search in the packs
  self.in_packs(sha_hex, function(err, result) {
    if(err) return callback(err, result);
    if(result) return callback(null, result);
    
    // Search in loose
    self.in_loose(sha_hex, function(err, result) {
      if(err) return callback(err, result);
      if(result) return callback(null, result);
      
      // Search again in the packs after an init in case it appeared in the meantime
      initpacks(self);
      // Search in the packs
      self.in_packs(sha_hex, function(err, result) {
        if(err) return callback(err, result);
        callback(null, result);
      });
    });
  })
}

// Returns true if the hex-packed sha is in the packfile
Repository.prototype.in_packs = function(sha_hex, callback) {
  // Try packs
  var packs = this.packs;
  for(var i = 0; i < packs.length; i++) {
    var o = packs[i].find(sha_hex);    
    if(o != null) return callback(null, true);
  }  
  callback(null, false);
}

// Returns true if the hex-packed sha is in the loose objects
Repository.prototype.in_loose = function(sha_hex, callback) {
  if(!this.loose) initloose(this);  
  // Try loose storage
  var looses = this.loose;
  for(var i = 0; i < looses.length; i++) {
    var o  = looses[i].find(sha_hex);
    if(o) return callback(null, true);
  }
  callback(null, false);  
}

// Get a subtree
Repository.prototype.get_subtree = function(commit_sha, path, callback) {
  var self = this;
  // Fetch tree sha
  var tree_sha = this.get_object_by_sha1(commit_sha).tree;
  // Ensure we have a valid path
  if(path && !(path == '' || path == '.' || path == './')) {
    var paths = path.split('/');
    
    for(var i = 0; i < paths.length; i++) {
      // Get the path element
      path = paths[i];
      // Ignore empty paths
      if(paths[i] != '') {
        var tree = this.get_object_by_sha1(tree_sha);
        var entry = tree.entries.filter(function(e) { return e.name == path; }).shift();
        
        if(entry) {
          tree_sha = entry.sha1;
        } else {
          return callback('no subtree located for ' + commit_sha, null);
        }        
      }
    }
  }
  // Return the tree_sha
  callback(null, tree_sha);
}

Repository.init = function(dir, bare, callback) {
  try {    
    var args = Array.prototype.slice.call(arguments, 0);
    callback = args.pop();
    dir = args.length ? args.shift() : true;
    bare = args.length ? args.shift() : true;

    // Create the directory if it does not exist
    try { fs.statSync(dir); } catch(err) { fs.mkdirSync(dir, 16877); }
    // Check if we are allready initialized
    try { fs.statSync(dir + "/objects"); return callback(null, false) } catch(err) {};
    // The directory does not exist so let's create it
    create_initial_config(dir, bare);
    // Create all the directories
    fs.mkdirSync(dir + "/refs", 16877);
    fs.mkdirSync(dir + "/refs/heads", 16877);
    fs.mkdirSync(dir + "/refs/tags", 16877);
    fs.mkdirSync(dir + "/refs/info", 16877);
    fs.mkdirSync(dir + "/refs/pack", 16877);
    fs.mkdirSync(dir + "/branches", 16877);
    // Add basic files
    add_file(dir, 'description', 'Unnamed repository; edit this file to name it for gitweb.');
    add_file(dir, 'HEAD', 'ref: refs/heads/master\n');
    // Create hooks directory
    fs.mkdirSync(dir + "/hooks", 16877);
    // Add empty shell scripts
    add_file(dir + "/hooks", 'applypatch-msg', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'post-commit', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'post-receive', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'post-update', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'pre-applypatch', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'pre-commit', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'pre-rebase', '# add shell script and make executable to enable');
    add_file(dir + "/hooks", 'update', '# add shell script and make executable to enable');
    // Create info directory
    fs.mkdirSync(dir + "/info", 16877);
    add_file(dir, 'info/exclude', "# *.[oa]\n# *~");
    callback(null, self);
  } catch(err) {
    callback(err, null);
  }
}

var create_initial_config = function(dir, bare) {
  var bare_status = bare ? 'true' : 'false';
  var config = "[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = " + bare_status + "\n\tlogallrefupdates = true";
  add_file(dir, 'config', config);
}

var add_file = function(dir, name, content) {
  fs.writeFileSync(dir + "/" + name, content);
}

// writes a raw object into the git repo
Repository.prototype.put_raw_object = function(content, type, callback) {
  return this.loose[0].put_raw_object(content, type, callback);
}















