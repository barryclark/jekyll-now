// A block is an operation removing, adding, or changing a group of items.
// Basically, this is just a list of changes, where each change adds or
// deletes a single item. Used by bin/ldiff.
var Block = exports.Block = function(chunk) {
  this.changes = [];
  this.insert = [];
  this.remove = [];
  var self = this;
  
  chunk.forEach(function(item) {
    self.changes.push(item);
    if(item.is_deleting()) self.remove.push(item);
    if(item.is_adding()) self.insert.push(item);
  })  
  
  Object.defineProperty(this, "diff_size", { get: function() { return self.insert.length - self.remove.length; }, enumerable: true});      
  Object.defineProperty(this, "op", { get: function() { 
    var result = [self.remove.length == 0, self.insert.length == 0];

    if(!result[0] && !result[1]) {
      return "!";
    } else if(!result[0] && result[1]) {
      return "-";
    } else if(result[0] && result[1]) {
      return "+";
    } else {
      return "^";
    }
  }, enumerable: true});      
}

Block.prototype.op = function() {
}