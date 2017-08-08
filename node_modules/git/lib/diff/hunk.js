var Block = require('./block').Block;

// A Hunk is a group of Blocks which overlap because of the context
// surrounding each block. (So if we're not using context, every hunk will
// contain one block.) Used in the diff program (bin/diff).
var Hunk = exports.Hunk = function(data_old, data_new, piece, context, file_length_difference) {  
  // Internal variables
  var _flag_context = null;
  var self = this;
  
  // At first, a hunk will have just one Block in it
  this.blocks = [new Block(piece)];
  this.data_old = data_old;
  this.data_new = data_new;
  
  var before = file_length_difference, after = file_length_difference;
  after = after + this.blocks[0].diff_size;
  this.file_length_difference = after; // The caller must get this manually
  // Other parameters
  var a1 = null, a2 = null;
  var b1 = null, b2 = null;
  
  // Save the start & end of each array. If the array doesn't exist
  // (e.g., we're only adding items in this block), then figure out the
  // line number based on the line number of the other file and the
  // current difference in file lengths.
  if(this.blocks[0].remove.length > 0) {
    a1 = this.blocks[0].remove[0].position;
    a2 = this.blocks[0].remove[this.blocks[0].remove.length - 1].position;
  }
  
  if(this.blocks[0].insert.length > 0) {
    b1 = this.blocks[0].insert[0].position;
    b2 = this.blocks[0].insert[this.blocks[0].insert.length - 1].position;
  }
    
  this.start_old = a1 || (b1 - before);
  this.start_new = b1 || (a1 + before);
  this.end_old = a2 || (b2 - after);
  this.end_new = b2 || (a2 + after);    
  
  // Change the "start" and "end" fields to note that context should be added
  // to this hunk
  Object.defineProperty(this, "flag_context", { get: function() { return _flag_context; }, set: function(context) { 
      if(context == null || context == 0) return null;
      
      var add_start = (context > self.start_old) ? self.start_old : context;
      var add_end = null;
      
      self.start_old = self.start_old - add_start;
      self.start_new = self.start_new - add_start;
      
      if((self.end_old + context) > self.data_old.length) {
        add_end = self.data_old.length - self.end_old;
      } else {
        add_end = context;
      }
      
      self.end_old = self.end_old + add_end;
      self.end_new = self.end_new + add_end;
      _flag_context = context;
    }, enumerable: true});   
    
  // Set the flag_context
  this.flag_context = context;     
}

Hunk.prototype.unshift = function(hunk) {
  this.start_old = hunk.start_old;
  this.start_new = hunk.start_new;
  this.blocks = hunk.blocks.concat(this.blocks);
}

// Is there an overlap between hunk arg0 and old hunk arg1? Note: if end
// of old hunk is one less than beginning of second, they overlap
Hunk.prototype.overlaps = function(hunk) {
  if(hunk == null) return null;
  
  var a = (this.start_old - hunk.end_old) <= 1;
  var b = (this.start_new - hunk.end_new) <= 1;
  return (a || b);
}

Hunk.prototype.diff = function(format) {
  if(format == "old") {
    return old_diff(this);    
  } else if(format == 'unified') {
    return unified_diff(this);
  } else if(format == 'context') {
    return context_diff(this);
  } else if(format == 'ed') {
    return this;
  } else if(format == 'reverse_ed' || format == 'ed_finish') {
    return ed_diff(this, format);
  } else {
    throw "unknown diff format " + format;
  }
}

Hunk.prototype.each_old = function(block) {
  var entries = this.data_old.slice(this.start_old, this.end_old);
  entries.forEach(function(e) {
    block(e);
  });
}

// Note that an old diff can't have any context. Therefore, we know that
// there's only one block in the hunk.
var old_diff = function(hunk) {
  if(hunk.blocks.length > 1) sys.puts("expecting only one block in an old diff hunk!");
  // Set up operation actions
  var opt_act = {'+':'a', '-':'d', '!':'c'};
  var block = hunk.blocks[0];
  
  // Calculate item number range. Old diff range is just like a context
  // diff range, except the ranges are on one line with the action between
  // them.
  var s = "" + context_rang("old") + opt_act[block.op] + context_rang("new") + "\n";
  // If removing anything, just print out all the remove lines in the hunk
  // which is just all the remove lines in the block.
  if(block.remove.length > 0) {
    hunk.data_old.slice(hunk.start_old, hunk.end_old).forEach(function(e) {
      s = s + "< " + e + "\n";
    });    
  }
  
  if(block.insert.length > 0) {
    hunk.data_new.slice(hunk.start_new, hunk.end_new).forEach(function(e) {
      s = s + "> " + e + "\n;"
    });
  }
  // Return the diff string
  return s;
}

var unified_diff = function(hunk) {
  // Calculate item number range.
  var s = "@@ -" + unified_range(hunk, 'old') + " +" + unified_range(hunk, 'new') + " @@\n";

  // Outlist starts containing the hunk of the old file. Removing an item
  // just means putting a '-' in front of it. Inserting an item requires
  // getting it from the new file and splicing it in. We splice in
  // +num_added+ items. Remove blocks use +num_added+ because splicing
  // changed the length of outlist.
  //
  // We remove +num_removed+ items. Insert blocks use +num_removed+
  // because their item numbers -- corresponding to positions in the NEW
  // file -- don't take removed items into account.
  var lo = hunk.start_old;
  var hi = hunk.end_old;
  var num_added = 0;
  var num_removed = 0;
  
  // Create list of stripped entries
  var outlist = hunk.data_old.slice(lo, hi + 1).map(function(e) { return e.replace(/^/g, ' '); });
  // Process all the blocks
  hunk.blocks.forEach(function(block) {
    block.remove.forEach(function(item) {
      var op = item.action.toString();  // -
      var offset = item.position - lo + num_added;
      outlist[offset] = outlist[offset].replace(/^ /g, op.toString());
      num_removed = num_removed + 1;
    })
    
    block.insert.forEach(function(item) {
      var op = item.action.toString(); // +
      var offset = item.position - hunk.start_new + num_removed;
      outlist.splice(offset, 0, ("" + op + hunk.data_new[item.position]));
      num_added = num_added + 1;
    });
  });
  
  // Return the list
  return s + outlist.join('\n');
}

var context_diff = function(hunk) {
  var s = '***************\n';
  s = s + '*** ' + context_range(hunk, 'old') + ' ****\n';
  // Retrieve the context
  var r = context_range(hunk, 'new');
  var outlist = null;
  
  // Print out file 1 part for each block in context diff format if there
  // are any blocks that remove items
  var lo = hunk.start_old;
  var hi = hunk.end_old;
  var removes = hunk.blocks.filter(function(e) { return !(e.remove.length == 0); });
  
  if(removes) {
    outlist = hunk.data_old.slice(lo, hi).map(function(e) { return e.replace(/^/g, '  '); });
    removes.forEach(function(block) {
      block.remove.forEach(function(item) {
        outlist[item.position - lo] = outlist[item.position - lo].replace(/^ /g, block.op); // - or !
      });
    });
    // Add to diff string
    s = s + outlist.join('\n');
  }
  
  s = s + '\n-- ' + r + ' ----\n';
  lo = hunk.start_new;
  hi = hunk.end_new;
  var inserts = hunk.blocks.filter(function(e) { return !(e.insert.length == 0); });

  if(inserts) {
    outlist = hunk.data_new.slice(lo, hi).map(function(e) { return e.replace(/^/g, '  '); });
    inserts.forEach(function(block) {
      block.insert.forEach(function(item) {
        outlist[item.position - lo] = outlist[item.position - lo].replace(/^ /g, block.op); // + or !
      });
    });
    // Add to diff string
    s = s + outlist.join('\n');    
  }
  // Return the diff string
  return s;
}

var ed_diff = function(hunk, format) {
  var opt_act = {'+':'a', '-':'d', '!':'c'};
  if(hunk.blocks.length > 1) sys.puts("expecting only one block in an old diff hunk!");
  var s = null;
  
  if(format == 'reverse_ed') {
    s = "" + op_act[hunk.blocks[0].op] + context_range(hunk, 'old') + '\n';
  } else {
    s = "" + context_range(hunk, 'old').replace(/,/g, ' ') + op_act[hunk.blocks[0].op] + '\n';
  }
  
  if(hunk.blocks[0].insert.length > 0) {
    hunk.data_new.slice(hunk.start_new, hunk.end_new).forEach(function(e) {
      s = s + '' + e + '\n';
    });
    // Add final marker
    s = s + '.\n';
  }
  // Return diff string
  return s;
}

// Generate a range of item numbers to print. Only print 1 number if the
// range has only one item in it. Otherwise, it's 'start,end'
var context_range = function(hunk, mode) {
  var s = null, e = null;
  
  if(mode == 'old') {
    s = (hunk.start_old + 1);
    e = (hunk.end_old + 1);
  } else if(mode == 'new') {
    s = (hunk.start_new + 1);
    e = (hunk.end_new + 1);    
  }
  
  return (s < e) ? ("" + s + "," + e) : ("" + e);
}

// Generate a range of item numbers to print for unified diff. Print
// number where block starts, followed by number of lines in the block
// (don't print number of lines if it's 1)
var unified_range = function(hunk, mode) {
  var s = null, e = null;
  
  if(mode == 'old') {
    s = (hunk.start_old + 1);
    e = (hunk.end_old + 1);
  } else if(mode == 'new') {
    s = (hunk.start_new + 1);
    e = (hunk.end_new + 1);
  }
  
  var length = e - s + 1;
  var first = (length < 2) ? e : s;   // something weird   
  return (length == 1) ? ("" + first) : (first + "," + length);
}
















