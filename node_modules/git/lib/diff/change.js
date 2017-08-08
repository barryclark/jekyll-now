// Represents a simplistic (non-contextual) change. Represents the removal or
// addition of an element from either the old or the new sequenced enumerable.
var Change = exports.Change = function(action, position, element) {
  this.action = action;
  this.position = position;
  this.element = element;  
}

Change.from_a = function(arr) {
  return new Change(arr[0], arr[1], arr[2]);
}

Change.prototype.to_a = function() {
  return [this.action, this.position, this.element];
}

Change.prototype.is_deleting = function() {
  return this.action == '-';
}

Change.prototype.is_adding = function() {
  return this.action == '+';
}

Change.prototype.is_unchanged = function() {
  return this.action == '=';
}

Change.prototype.is_changed = function() {
  return this.changed == '!';
}

Change.prototype.is_finished_a = function() {
  return this.changed == '>';
}

Change.prototype.is_finished_b = function() {
  return this.changed == '<';
}

var ContextChange = exports.ContextChange = function(action, old_position, old_element, new_position, new_element) {
  this.action = action;
  this.old_position = old_position;
  this.old_element = old_element;
  this.new_position = new_position;
  this.new_element = new_element;
}

// Creates a ContextChange from an array produced by ContextChange#to_a.
ContextChange.from_a = function(arr) {
  if(arr.length == 5) {
    return new ContextChange(arr[0], arr[1], arr[2], arr[3], arr[4]);
  } else {
    return new ContextChange(arr[0], arr[1][0], arr[1][1], arr[2][0], arr[2][1]);
  }
}

// Simplifies a context change for use in some diff callbacks. '<' actions
// are converted to '-' and '>' actions are converted to '+'. 
ContextChange.simplify = function(event) {
  var ea = event.to_a();
  
  if(ea[0] == '-') {
    ea[2][1] = null;
  } else if(ea[0] == '<') {
    ea[0] = '-';
    ea[2][1] = null;
  } else if(ea[0] == '+') {
    ea[1][1] = null;
  } else if(ea[0] == '>') {
    ea[0] = '+';
    ea[1][1] = null;
  }
  
  // Return a Context Change object
  return ContextChange.from_a(ea);
}

ContextChange.prototype.to_a = function() {
  return [this.action, [this.old_position, this.old_element], [this.new_position, this.new_element]];
}

ContextChange.prototype.is_deleting = function() {
  return this.action == '-';
}

ContextChange.prototype.is_adding = function() {
  return this.action == '+';
}

ContextChange.prototype.is_unchanged = function() {
  return this.action == '=';
}

ContextChange.prototype.is_changed = function() {
  return this.changed == '!';
}

ContextChange.prototype.is_finished_a = function() {
  return this.changed == '>';
}

ContextChange.prototype.is_finished_b = function() {
  return this.changed == '<';
}
