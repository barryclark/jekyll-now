var crypto = require('crypto'),
  util = require('util'),
  Buffer = require('buffer').Buffer,
  BinaryParser = require('./binary_parser').BinaryParser;

var RawObject = exports.RawObject = function(type, content) {
  var _type = type, _content = content;
  
  Object.defineProperty(this, "type", { get: function() { return _type; }, set: function(value) { _type = value; }, enumerable: true});    
  Object.defineProperty(this, "content", { get: function() { return _content; }, set: function(value) { _content = value; }, enumerable: true});      
}

RawObject.prototype.sha1 = function(encoding) {
  type = type ? type : 'binary';  
  // Create the basis for the digest
  var digest_content = this.type + " " + this.content.length + BinaryParser.fromByte(0) + this.content;
  // Use node crypto library to create sha1 hash
  var hash = crypto.createHash("sha1");
  hash.update(digest_content);
  // Return the hash digest
  return hash.digest('binary');
}

RawObject.prototype.sha1_hex = function() {
  this.sha1('hex');
}