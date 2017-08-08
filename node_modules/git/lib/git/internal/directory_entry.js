var StringUtil = require('../../sprintf/sprintf').StringUtil;

var S_IFMT = parseInt('00170000', 8);
var S_IFLNK = parseInt('0120000', 8);
var S_IFREG = parseInt('0100000', 8);
var S_IFDIR = parseInt('0040000', 8);
var S_IFGITLINK = parseInt('0160000', 8);

var DirectoryEntry = exports.DirectoryEntry = function(mode, file_name, sha1) {
  var _mode = 0, _name = file_name, _sha1 = sha1;
  var self = this;
  
  // Process the mode to correctly get the right value
  for(var i = 0; i < mode.length; i++) {
    _mode = (_mode << 3) | (mode.charCodeAt(i) - '0'.charCodeAt(0));
  }
  
  // Internal properties
  Object.defineProperty(this, "mode", { get: function() { return _mode; }, set: function(value) { _mode = value; }, enumerable: true});
  Object.defineProperty(this, "name", { get: function() { return _name; }, set: function(value) { _name = value; }, enumerable: true});
  Object.defineProperty(this, "sha1", { get: function() { return _sha1; }, set: function(value) { _sha1 = value; }, enumerable: true});
  // Return the type of entry
  Object.defineProperty(this, "type", { get: function() { 
      var type = self.mode & S_IFMT;
      if(type == S_IFGITLINK) {
        return 'submodule';
      } else if(type == S_IFLNK) {
        return 'link';
      } else if(type == S_IFDIR) {
        return 'directory';
      } else if(type == S_IFREG) {
        return 'file';
      } else {
        return null;
      }    
    }, enumerable: true});

  Object.defineProperty(this, "format_type", { get:function() {
    var type = this.type;
    if(type == 'link') {
      return 'link';
    } else if(type == 'directory') {
      return 'tree';
    } else if(type == 'file') {
      return 'blob';
    } else if(type == 'submodule') {
      return 'commit';
    }
  }, enumerable: false});

  Object.defineProperty(this, "format_mode", { get:function() {
    return StringUtil.sprintf("%06o", _mode);
  }, enumerable: false});  
  
  // Ensure we don't have an illegal type of directory
  if([S_IFLNK, S_IFDIR, S_IFREG, S_IFGITLINK].indexOf(_mode & S_IFMT) == -1) {
    throw "unknown type for directory entry";
  }   
}

