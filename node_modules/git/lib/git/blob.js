var mime = require('mime'),
  Actor = require('./actor').Actor;  

var Blob = exports.Blob = function(repo, id, mode, name) {
  var _repo = repo, _id = id, _mode = mode, _name = name, _content = null, _data = null, _size = 0;
  
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _repo = value; }, enumerable: true});
  Object.defineProperty(this, "id", { get: function() { return _id; }, set: function(value) { _id = value; }, enumerable: true});
  Object.defineProperty(this, "mode", { get: function() { return _mode; }, set: function(value) { _mode = value; }, enumerable: true});
  Object.defineProperty(this, "name", { get: function() { return _name; }, set: function(value) { _name = value; }, enumerable: true});
  Object.defineProperty(this, "content", { get: function() { return _content; }, set: function(value) { _content = value; }, enumerable: true});

  // Data of the blob
  Object.defineProperty(this, "data", { get: function() { 
      _data = lazy_reader(_repo, _id, 'p', _data); 
      return _data;
    }, enumerable: false});

  // Size of the blob
  Object.defineProperty(this, "size", { get: function() { 
      _size = lazy_reader(_repo, _id, 's', _size); 
      return _size;
    }, enumerable: false});

  // Size of the blob
  Object.defineProperty(this, "mime_type", { get: function() {
      return mime.lookup(_name || '', 'text/plain')
    }, enumerable: false});
  
  // Return the base name
  Object.defineProperty(this, "basename", { get: function() { 
      if(_name) {
        var parts = _name.split("/");
        return parts[parts.length - 1];
      } else {
        return null;
      }
    }, enumerable: false});
}

var lazy_reader = function(repo, id, type, variable) {
  if(variable) return variable;
  // Control the flow
  var done = false;
  var value = null;
  
  // Fetch the content
  repo.git.cat_file(type, id, function(err, content) {
    if(err) return done = true;
    value = content;
    done = true;
  })
  
  while(!done) {};
  return value;  
}

// The blame information for the given file at the given commit
//
// Returns array of commit and array of lines
Blob.blame = function(repo, commit, file, callback) {
  var Commit = require('./commit').Commit;
  
  repo.git.blame({'p':true}, commit, '--', file, function(err, data) {
    if(err) return callback(err, data);
    
    // Variables stored
    var commits = {};
    var blames = [];
    var info = null;
    
    // Split up and parse the output
    var lines = data.split("\n");
    lines.forEach(function(line) {
      var parts = line.split(/\s+/);
      if(parts.length > 0) {
        var part = parts[0];

        // Process the part
        if(part.match(/^[0-9A-Fa-f]{40}$/)) {
          // Parse references to SHA keys
          if(line.match(/^([0-9A-Fa-f]{40}) (\d+) (\d+) (\d+)$/)) {
            var matches = line.match(/^([0-9A-Fa-f]{40}) (\d+) (\d+) (\d+)$/);
            var id = matches[1];
            var origin_line = matches[2];
            var final_line = matches[3];
            var group_lines = matches[4];
            // Set if of the current reference
            info = {id:id};
            blames.push([null, []]);
          } else if(line.match(/^([0-9A-Fa-f]{40}) (\d+) (\d+)$/)) {
            var matches = line.match(/^([0-9A-Fa-f]{40}) (\d+) (\d+)$/);
            var id = matches[1];
            var origin_line = matches[2];
            var final_line = matches[3];            
            // Set if of the current reference
            info = {id:id};
          }          
        } else if(part.match(/^(author|committer)/)) {
          if(part.match(/^(.+)-mail$/)) {
            info[part.match(/^(.+)-mail$/)[1] + "_email"] = parts[parts.length - 1];
          } else if(part.match(/^(.+)-time$/)) {            
            info[part.match(/^(.+)-time$/)[1] + "_date"] = new Date(parseInt(parts[parts.length - 1]) * 1000);
          } else if(part.match(/^(author|committer)$/)) {
            info[part.match(/^(author|committer)$/)[1]] = parts.slice(1).join(" ");
          }          
        } else if(part.match(/^filename/)) {
          info['filename'] = parts[parts.length - 1];
        } else if(part.match(/^summary/)) {          
          info['summary'] = parts.slice(1).join(" ").replace('\n', '');
        } else if(part == '') {
          var commit = commits[info["id"]];
          // Create new commit
          if(!commit) {
            // commit = new Commit(repo, )
            var id = info['id'];
            var author = Actor.from_string(info['author'] + ' ' + info['author_email']);
            var authored_date = info['author_date'];
            var committer = Actor.from_string(info['committer'] + ' ' + info['committer_email']);
            var committed_date = info['committer_date'];
            var message = info['summary'];            
            // Create a new commit
            commit = new Commit(repo, id, null, null, author, authored_date, committer, committed_date, message);
            commits[info['id']] = commit;
          }
          
          // Break up the parts
          parts = line.match(/^\t(.*)$/);
          blames[blames.length - 1][0] = commit;
          blames[blames.length - 1][1].push(parts[1]);
          info = null;
        }
      }
    });    
    // Call back with the list of blames
    callback(null, blames);
  });
}







