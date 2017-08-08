var Merge = exports.Merge = function(str) {
  var _conflicts = 0, _text = {}, _sections = null;
  var section = 0;
  var status = Merge.STATUS_BOTH;
  
  Object.defineProperty(this, "conflicts", { get: function() { return _conflicts; }, set: function(value) { _conflicts = value; }, enumerable: true});    
  Object.defineProperty(this, "text", { get: function() { return _text; }, set: function(value) { _text = value; }, enumerable: true});    
  Object.defineProperty(this, "sections", { get: function() { return _sections; }, set: function(value) { _sections = value; }, enumerable: true});    

  var lines = str.split("\n");
  lines.forEach(function(line) {
    if(line.match(/^<<<<<<< (.*?)/)) {
      status = Merge.STATUS_OURS;
      _conflicts = _conflicts + 1;
      section = section + 1;
    } else if(line == '=======') {
      status = Merge.STATUS_THEIRS;
    } else if(line.match(/^>>>>>>> (.*?)/)) {
      status = Merge.STATUS_BOTH;
      section = section + 1;
    } else {
      _text[section] = _text[section] == null ? {} : _text[section];
      _text[section][status] = _text[section][status] == null ? [] : _text[section][status];
      _text[section][status].push(line);
    }    
  });
  
  // Let's set the values
  _text = Object.keys(_text).map(function(key) {
    return _text[key];
  });
  // Set the number of sections
  _sections = _text.length;
}

// Static function
Merge.STATUS_BOTH = 'both';
Merge.STATUS_OURS = 'ours';
Merge.STATUS_THEIRS = 'theirs';
