var util = require('util'), 
  UserInfo = require('../user_info').UserInfo;

var GitCommit = exports.GitCommit = function(tree, parent, author, committer, message, headers, repository) {
  var _tree = tree, _parent = parent, _author = author, _committer = committer, _message = message, _headers = headers, _repository = repository;

  Object.defineProperty(this, "tree", { get: function() { return _tree; }, enumerable: true});    
  Object.defineProperty(this, "parent", { get: function() { return _parent; }, enumerable: true});    
  Object.defineProperty(this, "author", { get: function() { return _author; }, enumerable: true});    
  Object.defineProperty(this, "committer", { get: function() { return _committer; }, enumerable: true});    
  Object.defineProperty(this, "message", { get: function() { return _message; }, enumerable: true});    
  Object.defineProperty(this, "headers", { get: function() { return _headers; }, enumerable: true});    
  Object.defineProperty(this, "repository", { get: function() { return _repository; }, enumerable: true});      
  Object.defineProperty(this, "type", { get: function() { return "commit"; }, enumerable: true});     
  
  // Raw content of commit
  Object.defineProperty(this, "raw_content", { get: function() {
    return "tree " + _tree + "\n" 
      + _parent.map(function(i) { return "parent " + i +"\n"; }).join('') 
      + "author " + _author + "\ncommitter " + _committer + "\n\n" + _message;
  }, enumerable: true});        
}

// Create a commit from a raw object
GitCommit.from_raw = function(raw_object, repository) {
  var parent = [];
  var tree = null, author = null, committer = null;
  
  // Split the text but only grab the 2 first blocks
  var split_result = raw_object.content.split(/\n\n/);  
  var headers = split_result.shift();  
  var message = split_result.join("\n\n");
  
  // get all the headers
  var all_headers = headers.split(/\n/).map(function(header) { 
    var parts = header.split(/ /);
    return [parts.shift(), parts.join(" ")];
  })
  // Iterate over all the headers
  all_headers.forEach(function(header) {
    var key = header[0];
    var value = header[1];
    
    if(key == "tree") {
      tree = value;
    } else if(key == "parent") {
      parent.push(value);
    } else if(key == "author") {
      author = new UserInfo(value);
    } else if(key == "committer") {
      committer = new UserInfo(value);
    } else {
      // Unknow header
      util.puts("unknow header '" + key + "' in commit " + raw_object.sha_hex())
    }
  })
  
  if(!tree && !author && !committer) {
    throw "incomplete raw commit object";
  }  
  // Return the git commit object
  return new GitCommit(tree, parent, author, committer, message, headers, repository);
}

GitCommit.prototype.raw_log = function(sha1) {
  var output = "commit " + sha1 + "\n";
  output = output + this.headers + "\n\n";
  var lines = this.message.split("\n");    
  // Remove the last line which will be empty
  for(var i = 0; i < (lines.length > 1 ? lines.length - 1 : lines.length); i++) {
    output = output + '    ' + lines[i] + '\n';
  }
  // Return the output
  return output + '\n';
}












