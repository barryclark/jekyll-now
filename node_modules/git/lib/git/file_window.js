var util = require('util'),
  fs = require('fs'),
  Buffer = require('buffer').Buffer;

var FileWindow = exports.FileWindow = function(idxfile, version) {
  var _idxfile = idxfile, _version = version, _global_offset, _offset = null, _seek_offset = 0;
  // Set file global offset
  _global_offset = _version == 2 ? 8 : 0;
  //Internal properties
  Object.defineProperty(this, "idxfile", { get: function() { return _idxfile; }, set: function(value) { _idxfile = value; }, enumerable: true});
  Object.defineProperty(this, "version", { get: function() { return _version; }, enumerable: true});
  Object.defineProperty(this, "global_offset", { get: function() { return _global_offset; }, enumerable: true});
  Object.defineProperty(this, "offset", { get: function() { return _offset; }, set: function(value) { _offset = value; }, enumerable: true});
  Object.defineProperty(this, "seek_offset", { get: function() { return _seek_offset; }, set: function(value) { _seek_offset = value; }, enumerable: true});
}

FileWindow.prototype.unmap = function() {
  this.idxfile = null;
}

FileWindow.prototype.index = function(idx) {
  var offset = null, len = null, seek_offset = null;
  // open the file
  var idx_handle = fs.openSync(this.idxfile, "r");
  
  if(idx.length == 1) idx = idx[0];
  // Number support
  if(idx.constructor == Number && idx === parseInt(value, 10)) {
    offset = idx;
    len = null;
  } else if(Array.isArray(idx)) {
    offset = idx[0];
    len = idx[1]
  } else {
    throw "invalid index param: " + util.inspect(idx);
  }
  
  // Seek position equivalent using a position in the read
  if(this.offset != offset) {
    this.seek_offset = offset + this.global_offset;
  }
  
  // Adjust the stored offset
  this.offset = (offset + len) ? len : 1;  
  if(!len) len = 1;    

  // Read the offset value
  var buffer = new Buffer(len);
    
  if(len) {
    fs.readSync(idx_handle, buffer, 0, len, this.seek_offset);
  } else {
    fs.readSync(idx_handle, buffer, 0, 1, this.seek_offset);    
  }
  // Update seek_offset
  this.seek_offset = this.seek_offset + len;
  
  // Close the file don't keep file handles around
  fs.closeSync(idx_handle);
  return buffer;
} 

FileWindow.prototype.close = function() {
  // fs.closeSync(this.idxfile);
  this.unmap();
}