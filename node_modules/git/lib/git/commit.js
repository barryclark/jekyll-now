var util = require('util'),
  Actor = require('./actor').Actor,
  Diff = require('./diff').Diff;
  Tree = require('./tree').Tree;

// Create a commit object
var Commit = exports.Commit = function(repo, id, parents, tree, author, authored_date, committer, committed_date, message, filechanges) {
  var _repo = repo, _id = id, _parents = parents, _tree = tree, _author = author, _authored_date = authored_date;
  var _committer = committer, _committed_date = committed_date, _id_abbrev = null, _filechanges = filechanges;
  // Ensure we have an empty message at least
  message = message ? message : [];
  message = Array.isArray(message) ? message : [message];
  var _message = message.join("\n");
  // Extract short message
  var message_lines_filtered = message.filter(function(line) {
    return line.trim() == '' ? false : true;
  })
  var _short_message = message_lines_filtered.length > 0 ? message_lines_filtered[0] : '';
  // Internal properties
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "id", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "sha", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "parents", { get: function() {
      _parents = lazy_reader(_repo, _id, 'parents', _parents);
      return _parents;
    }, set: function(value) { _parents = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "tree", { get: function() {
      _tree = lazy_reader(_repo, _id, 'tree', _tree);
      return _tree;
    }, set: function(value) { _tree = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "author", { get: function() {
      _author = lazy_reader(_repo, _id, 'author', _author);
      return _author;
    }, set: function(value) { _author = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "authored_date", { get: function() {
      _authored_date = lazy_reader(_repo, _id, 'authored_date', _authored_date);
      return _authored_date;
    }, set: function(value) { _authored_date = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "committer", { get: function() {
      _committer = lazy_reader(_repo, _id, 'comitter', _committer);
      return _committer;
    }, set: function(value) { _comitter = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "committed_date", { get: function() {
      _committed_date = lazy_reader(_repo, _id, 'committed_date', _committed_date);
      return _committed_date;
    }, set: function(value) { _committed_date = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "message", { get: function() {
      _message = lazy_reader(_repo, _id, 'message', _message);
      return _message;
    }, set: function(value) { _message = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "short_message", { get: function() {
      _short_message = lazy_reader(_repo, _id, 'short_message', _short_message);
      return _short_message;
    }, set: function(value) { _short_message = value; }, enumerable: true, configurable:true});
  Object.defineProperty(this, "filechanges", { get: function() {
      _filechanges = lazy_reader(_repo, _id, 'filechanges', _filechanges);
      return _filechanges;
    }, set: function(value) { _filechanges = value; }, enumerable: true, configurable:true});

  Object.defineProperty(this, "_id_abbrev", { get: function() { return _id_abbrev; }, set: function(value) { _id_abbrev = value; }, enumerable: true, configurable:true});
}

var lazy_reader = function(repo, id, name, variable) {
  if(variable != null) return variable;
  // Control the flow
  var done = false;
  var value = null;
  // Fetch all the commits
  Commit.find_all(repo, id, {max_count:1}, function(err, commits) {
    if(err) return done = true;
    value = commits[0][name];
    done = true;
  })

  while(!done) {};
  return value ? value : '';
}

// Load a commit
Commit.prototype.load = function(callback) {
  var self = this;

  Commit.find_all(this.repo, this.id, {max_count:1}, function(err, commits) {
    if(err) return callback(err, commits);
    var commit = commits[0];
    Object.keys(commit).forEach(function(key) {
      self[key] = commit[key];
    });
    callback(null, self);
  });
}

// Chomp text removing end carriage returns
var chomp = function chomp(raw_text) {
  return raw_text.replace(/(\n|\r)+$/, '');
}

// Fetch the short form of an id
Commit.prototype.id_abbrev = function(callback) {
  var self = this;

  if(this._id_abbrev) return callback(null, this._id_abbrev);
  this.repo.git.rev_parse({}, this.id, 0, function(err, id) {
    if(err) return callback(err, id);
    self._id_abbrev = chomp(id).substr(0, 7);
    callback(null, self._id_abbrev);
  })
}

// Parse the actor and create the object
var actor = function(line) {
  var results = line.match(/^.+? (.*) (\d+) .*$/);
  var actor = results[1];
  var epoch = results[2];
  // Return the objects
  return [Actor.from_string(actor), new Date(parseInt(epoch) * 1000)]
}

// Convert commit text to list of commits
Commit.list_from_string = function(repo, text) {  
  // Split up the result
  var lines = text.split("\n");
  
  // require('util').debug("-------------------------------------------------- lines")
  // require('util').debug(require('util').inspect(lines))
  // require('util').debug("-------------------------------------------------- text end")
  
  var linesshift = function() {
    return lines.shift();
  };
  var commits = [];
  // Parse all commit messages
  while(lines.length > 0) {
    var id = linesshift().split(/ /).pop();
    if(lines.length == 0) break;
    var tree = new Tree(repo, linesshift().split(/ /).pop());

    // Let's get the parents
    var parents = [];
    while(lines[0].match(/^parent/)) {
      parents.push(new Commit(repo, linesshift().split(/ /).pop()))
    }
    // Let's get the author and committer
    var actor_info = actor(linesshift());
    var author = actor_info[0];
    var authored_date = actor_info[1]
    var committer_info = actor(linesshift());
    var comitter = committer_info[0];
    var committed_date = committer_info[1];
    // Unpack encoding
    var encoding = lines[0].match(/^encoding/) ? linesshift().split().pop() : '';
    // Jump empty space
    linesshift();
    // Unpack message lines
    var message_lines = [];
    while(lines.length > 0 && lines[0].match(/^ {4}/)) {
      var message_line = linesshift();
      message_lines.push(message_line.substring(4, message_line.length)) ;
    }

    linesshift();
    // Parse --raw lines
    var filechanges = {};
    var fcre = /:(\d+) (\d+) ([a-z0-9]+) ([a-z0-9]+) (\S+)\s+(.+)/;
    var numre = /(\S+)\s+(\S+)\s+(.+)/;
    var line;
    var matched;
    while (lines.length > 0) {
        line = linesshift();
        matched = line.match(fcre);
        if (!matched) break;
        var o = {};
        var xs = ['a_mode', 'b_mode', 'a_blob', 'b_blob', 'what', 'path'];
        for(var i = 0; i < xs.length; i++) {
            o[xs[i]] = matched[i+1];
        }
        filechanges[o.path] = o;
    }
    while (line) {
        matched = line.match(numre);
        if (!matched) break;
        var o = {};
        var xs = ['plus', 'minus', 'path'];
        for(var i = 0; i < xs.length; i++) {
            o[xs[i]] = matched[i+1];
        }
        filechanges[o.path].plus = o.plus;
        filechanges[o.path].minus = o.minus;
        if (lines.length == 0) break;
        line = linesshift();
    }

    if (!matched && line) lines = [line].concat(lines);
    // Move and point to next message
    while(lines[0] != null && lines[0] == '') linesshift();
    // Create commit object
    commits.push(new Commit(repo, id, parents, tree, author, authored_date, comitter, committed_date, message_lines, filechanges));
  }
  // Return all the commits
  return commits;
}

// Locate all commits for a give set of parameters
Commit.find_all = function(repo, reference, options, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  callback = args.pop();
  reference = args.length ? args.shift() : null;
  options = args.length ? args.shift() : {};

  // Merge the options with the default_options
  if(!options.pretty) options['pretty'] = 'raw';
  // If we have a reference use that for the lookup
  if(!reference) options['all'] = true;

  // Locate revisions
  if(reference) {
    repo.git.rev_list(options, reference, function(err, revision_output) {
      if(err) return callback(err, []);
      // Turn string into a list of revisions
      callback(null, Commit.list_from_string(repo, revision_output));
    });
  } else {
    repo.git.rev_list(options, function(err, revision_output) {
      if(err) return callback(err, []);
      // Turn string into a list of revisions
      callback(null, Commit.list_from_string(repo, revision_output));
    });
  }
}

// Return the count of committs for a given start
Commit.count = function(repo, ref, callback) {
  repo.git.rev_list({}, ref, function(err, revision_output) {
    if(err) return callback(err, revision_output);
    callback(null, parseInt((revision_output.length/41)));
  })
}

// Show diffs between two trees
//  repo: the repo object
//  a: named commit
//  b: optional named commit, passing an array assumes you wish to omit the second
//     named commit and limit the diff to the given paths
//  paths: an array of paths to limit the diff.
//
// Returns array of diffs (baked)
Commit.diff = function(repo, a, b, paths, callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 2);
  callback = args.pop();
  b = args.length ? args.shift() : null;
  paths = args.length ? args.shift() : [];

  // If b is an array we skipped the b parameter
  if(Array.isArray(b)) {
    paths = b;
    b = null;
  }

  // Set up parameters correctly
  if(paths.length > 0) {
    if(paths.length > 0) paths.unshift("--");
    if(b) paths.unshift(b);
    paths.unshift(a);
    // Let's execute the native git function
    repo.git.call_git('', 'diff', '', {full_index:true}, paths, function(err, text) {
      // Create a list of diffs from the string
      if(text) {
        Diff.list_from_string(repo, text, callback);
      } else {
        callback(null, []);
      }
    });
  } else {
    repo.git.diff(a, b, {full_index:true}, function(err, text) {
      // Create a list of diffs from the string
      if(text) {
        Diff.list_from_string(repo, text, callback);
      } else {
        callback(null, []);
      }
    });
  }
}

var process_diff = function(repo, diff, callback) {
  if(diff.match(/diff --git a/)) {
    diff = diff.substring(diff.match(/diff --git a/).index, diff.length);
  } else {
    diff = '';
  }
  // Return the diffs
  Diff.list_from_string(repo, diff, callback);
}

// Show the commits
Commit.prototype.show = function(callback) {
  var parents = this.parents;
  var diff = null
  var self = this;

  if(parents.length > 1) {
    this.repo.git.native_call("diff " + parents[0].id + "..." + parents[1].id, {full_index:true}, function(err, diff) {
      if(err) return callback(err, diff);
      process_diff(this.repo, diff, callback);
    });
  } else {
    this.repo.git.show({full_index:true, pretty:'raw'}, this.id, function(err, diff) {
      if(err) return callback(err, diff);
      process_diff(this.repo, diff, callback);
    });
  }
}

// Return the diffs for a commit
Commit.prototype.diffs = function(callback) {
  var parents = this.parents;
  // If we have no parents
  if(parents.length == 0) {
    this.show(callback);
  } else {
    Commit.diff(this.repo, parents[0].id, this.id, callback)
  }
}

// To String method
Commit.prototype.toString = function() {
  return this.id;
}

// Convert commit into patch
Commit.prototype.toPatch = function(callback) {
  this.repo.git.format_patch({'1':true, stdout:true}, this.id, callback);
}

