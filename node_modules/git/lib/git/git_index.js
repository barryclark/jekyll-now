var util = require('util'),
  Tree = require('./tree').Tree,
  Config = require('./config').Config;

var GitIndex = exports.GitIndex = function(repo) {  
  var _repo = repo, _tree = {}, _current_tree = null;
  
  Object.defineProperty(this, "tree", { get: function() { return _tree; }, set: function(value) { _tree = value; }, enumerable: true});    
  Object.defineProperty(this, "current_tree", { get: function() { return _current_tree; }, set: function(value) { _current_tree = value; }, enumerable: true});    
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: true});  
}

// Sets the current tree
//  +tree+ the branch/tag/sha... to use - a string
// 
// Returns index (self)
GitIndex.prototype.read_tree = function(tree, callback) {
  var self = this;
  // Load the tree
  this.repo.tree(tree, function(err, loaded_tree) {
    if(err) return callback(err, loaded_tree);
    self.current_tree = loaded_tree;
    callback(null, loaded_tree);
  })
}

// Add a file to the index
//   +path+ is the path (including filename)
//   +data+ is the binary contents of the file
//
// Returns nothing
GitIndex.prototype.add = function(file_path, data) {
  var path = file_path.split('/');
  var filename = path.pop();  
  var current = this.tree;
  
  path.forEach(function(dir) {
    current[dir] = current[dir] || {};
    var node = current[dir];
    current = node;
  });
    
  current[filename] = data;
}

// Commit the contents of the index
//   +message+ is the commit message [nil]
//   +parents+ is one or more commits to attach this commit to to form a new head [nil]
//   +actor+ is the details of the user making the commit [nil]
//   +last_tree+ is a tree to compare with - to avoid making empty commits [nil]
//   +head+ is the branch to write this head to [master]
//
// Returns a String of the SHA1 of the commit
GitIndex.prototype.commit = function(message, parents, actor, last_tree, head, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  // Set variables to default values
  parents = args.length ? args.shift() : null;  
  actor = args.length ? args.shift() : null;  
  last_tree = args.length ? args.shift() : null;  
  head = args.length ? args.shift() : 'master'; 
  
  this.write_tree(this.tree, this.current_tree, function(err, tree_sha1) {
    if(tree_sha1 == last_tree) return callback(null, false);  // Don't write identical commits
    var contents = [];
    // Add tree to contents
    contents.push(['tree', tree_sha1].join(' '));
    // Add all parents if they exist
    if(parents) {
      parents.forEach(function(p) {
        if(p) contents.push(['parent', p].join(' '));
      });
    }
    
    // Define name and email
    var name = null, email = null;
    
    if(actor) {
      name = actor.name;
      email = actor.email;
    } else {
      config = new Config(self.repo);
      name = config['user.name'];
      email = config['user.email'];      
    }
    
    var author_string = "" + name + " <" + email + "> " + parseInt(new Date().getTime()/1000) + " -0700";  // TODO must fix
    contents.push(['author', author_string].join(' '));
    contents.push(['committer', author_string].join(' '));
    contents.push('');
    contents.push(message);
    // Write commit and update reference tree
    self.repo.git.put_raw_object(contents.join("\n"), 'commit', function (commit_sha1) {
      self.repo.update_ref(head, commit_sha1, callback);
    });
  });
}

var to_bin = function(sha1o) {
  var sha1 = '';
  for(var i = 0; i < sha1o.length; i = i + 2) {
    sha1 = sha1 + String.fromCharCode(parseInt(sha1o.substr(i, 2), 16));
  }  
  return sha1;
}

// Recursively write a tree to the index
//   +tree+ is the tree
//
// Returns the SHA1 String of the tree
GitIndex.prototype.write_tree = function(tree, now_tree, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  // Set variables to default values
  now_tree = args.length ? args.shift() : null;  
  
  // Holds the tree content
  var tree_contents = {};
  
  // Fill in the original tree
  if(now_tree) {
    now_tree.contents.forEach(function(obj) {
      var sha = to_bin(obj.id);
      var k = obj.name;
      
      if(obj instanceof Tree) k = k + '/';
      tree_contents[k] = "" + obj.mode.toString() + " " + obj.name + "\0" + sha;
    });
  }
  
  // overwrite with the new tree contents
  Object.keys(tree).forEach(function(key) {
    var value = tree[key];
    
    if(value.constructor == String) {
      var sha = self.write_blob(value);      
      sha = to_bin(sha);
      tree_contents[key] = "" + '100644' + " " + key + '\0' + sha;
    } else if(Object.prototype.toString.call(value) === '[object Object]') {      
      var ctree = now_tree ? (now_tree.find(key)) : null;
      // Write the next level
      self.write_tree(value, ctree, function(err, sha) {
        var sha = to_bin(sha);
        tree_contents[key + '/'] = "" + '040000' + " " + key + '\0' + sha;        
      });      
    }
  })
  
  var tr = Object.keys(tree_contents).sort().map(function(key) {
    return tree_contents[key];
  }).join('');
  
  // Return the object sha
  this.repo.git.put_raw_object(tr, 'tree', function (sha1) {
    callback(null, sha1);
  })
}

// Write the blob to the index
//   +data+ is the data to write
//
// Returns the SHA1 String of the blob
GitIndex.prototype.write_blob = function(data) {  
  return this.repo.git.put_raw_object(data, 'blob');
}





















