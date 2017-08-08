var Config = exports.Config = function(repo) {
  var _repo = repo, _data = null;
  
  Object.defineProperty(this, "repo", { get: function() { return _repo; }, set: function(value) { _id = value; }, enumerable: false});    
  Object.defineProperty(this, "data", { get: function() { 
      _data = lazy_reader(_repo, 'data', _data);
      return _data; 
    }, set: function(value) { _data = value; }, enumerable: true});      
}

var lazy_reader = function(repo, name, variable) {
  if(variable) return variable;
  // Control the flow
  var done = false;
  var hash = {};
  // Load the config and parse it
  repo.git.config({list:true}, function(err, output) {
    var lines = output.split("\n");
    
    lines.forEach(function(line) {
      var parts = line.split(/=/);
      var key = parts.shift();
      hash[key] = parts.join("=");
    })
    done = true;
  })

  while(!done) {};
  return hash;  
}

Config.prototype.fetch = function(key, default_value) {
  var value = this.data[key];
  if(!value) return default_value;
  return this.data[key];
}

Config.prototype.set = function(key, value, callback) {
  var self = this;
  
  this.repo.git.config({}, key, value, function(err, output) {
    if(err) return callback(err, output);
    // Reset data variable
    self.data = null;
    // Return
    callback(null, output);
  });
}