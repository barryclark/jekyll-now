var util = require('util'),
  BinaryParser = require('../binary_parser').BinaryParser,
  DirectoryEntry = require('../internal/directory_entry').DirectoryEntry;

var GitTree = exports.GitTree = function(entries, repository) {  
  var _entries = entries ? entries : [], _repository = repository;
  
  // Internal properties
  Object.defineProperty(this, "entries", { get: function() { return _entries; }, set: function(value) { _entries = value; }, enumerable: true});
  Object.defineProperty(this, "repository", { get: function() { return _repository; }, set: function(value) { _repository = value; }, enumerable: true});
  Object.defineProperty(this, "type", { get: function() { return "tree"; }, enumerable: true});      

  // Raw content of commit
  Object.defineProperty(this, "raw_content", { get: function() {
    return _entries.map(function(e) {
      return [[e.format_mode, e.format_type, e.sha1].join(' '), e.name].join('\t')
    }).join('\n');    
  }, enumerable: true});        
}

var read_until_chr = function(index, content, char) {
  var found = false;
  var content_length = content.length;
  var chr_code = char.charCodeAt(0);
  var offset = 0;
  
  // Search until we locate the content
  while(!found && (index + offset) < content_length) {
    if(content.charCodeAt(index + offset) == chr_code) found = true;
    offset = offset + 1;
  }  
    
  // Extract content and return
  return content.substr(index, offset - 1);
}

var to_hex_string = function(string) {
  var hexString = '';
  for(var index = 0; index < string.length; index++) {
    var value = BinaryParser.toByte(string.substr(index, 1));
    var number = value <= 15 ? "0" + value.toString(16) : value.toString(16);
    hexString = hexString + number;
  }
  return hexString;
};

// Create Tree Object from Raw stream
GitTree.from_raw = function(raw_object, repository) {
  var entries = [];
  var index = 0;
  var content_length = raw_object.content.length;
  var content = raw_object.content;
  
  // Parse the content
  while(index < content_length) {
    var mode = read_until_chr(index, content, ' ');
    index = index + mode.length + 1;
    var file_name = read_until_chr(index, content, '\0');
    index = index + file_name.length + 1;
    var raw_sha = content.substr(index, 20);
    index = index + raw_sha.length;
    var sha = to_hex_string(raw_sha);
    
    // Add the Entry to the directory list
    entries.push(new DirectoryEntry(mode, file_name, sha));
  }
  
  // Return a tree with all the entries
  return new GitTree(entries, repository);
}
